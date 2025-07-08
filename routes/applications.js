const express = require("express")
const Application = require("../models/Application")
const Pet = require("../models/Pet")
const { auth } = require("../middleware/auth")
const { sendEmail } = require("../utils/email")

const router = express.Router()

// @route   POST /api/applications
// @desc    Submit adoption application
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { petId, applicationData } = req.body

    // Check if pet exists and is available
    const pet = await Pet.findById(petId)
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" })
    }

    if (!pet.isAvailable) {
      return res.status(400).json({ message: "Pet is no longer available for adoption" })
    }

    // Check if user already has an active application for this pet
    const existingApplication = await Application.findOne({
      pet: petId,
      applicant: req.user._id,
      status: { $in: ["pending", "under-review", "approved"] },
    })

    if (existingApplication) {
      return res.status(400).json({
        message: "You already have an active application for this pet",
      })
    }

    // Create new application
    const application = new Application({
      pet: petId,
      applicant: req.user._id,
      applicationData,
      status: "pending",
    })

    await application.save()

    // Populate the application with pet and applicant info
    await application.populate([
      {
        path: "pet",
        select: "name type breed images shelter",
        populate: {
          path: "shelter",
          select: "name contact owner",
        },
      },
      {
        path: "applicant",
        select: "firstName lastName email phone",
      },
    ])

    // Send notification email to shelter
    try {
      await sendEmail({
        to: application.pet.shelter.contact.email,
        subject: `New Adoption Application for ${application.pet.name}`,
        template: "new-application",
        data: {
          petName: application.pet.name,
          applicantName: `${application.applicant.firstName} ${application.applicant.lastName}`,
          applicationId: application._id,
          dashboardLink: `${process.env.FRONTEND_URL}/dashboard/applications`,
        },
      })
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
    }

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    })
  } catch (error) {
    console.error("Submit application error:", error)

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({ message: "Validation error", errors })
    }

    res.status(500).json({ message: "Server error while submitting application" })
  }
})

// @route   GET /api/applications
// @desc    Get user's applications
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query

    const filter = { applicant: req.user._id }

    if (status && status !== "all") {
      filter.status = status
    }

    const applications = await Application.find(filter)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Application.countDocuments(filter)

    res.json({
      applications,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get applications error:", error)
    res.status(500).json({ message: "Server error while fetching applications" })
  }
})

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)

    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }

    // Check if user is the applicant or shelter owner
    const isApplicant = application.applicant.toString() === req.user._id.toString()
    const isShelterOwner = application.pet.shelter.owner.toString() === req.user._id.toString()

    if (!isApplicant && !isShelterOwner) {
      return res.status(403).json({ message: "Not authorized to view this application" })
    }

    res.json({ application })
  } catch (error) {
    console.error("Get application error:", error)

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Application not found" })
    }

    res.status(500).json({ message: "Server error while fetching application" })
  }
})

// @route   PUT /api/applications/:id/status
// @desc    Update application status (shelter owners only)
// @access  Private
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status, notes, rejectionReason } = req.body

    const application = await Application.findById(req.params.id)

    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }

    // Check if user is shelter owner
    if (application.pet.shelter.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this application" })
    }

    // Update application
    application.status = status

    if (notes) {
      application.notes.push({
        author: req.user._id,
        message: notes,
        isInternal: false,
      })
    }

    if (status === "rejected" && rejectionReason) {
      application.rejectionReason = rejectionReason
    }

    // Set timestamps based on status
    switch (status) {
      case "under-review":
        application.reviewedAt = new Date()
        break
      case "approved":
        application.approvedAt = new Date()
        break
      case "completed":
        application.completedAt = new Date()
        // Mark pet as no longer available
        await Pet.findByIdAndUpdate(application.pet._id, { isAvailable: false })
        break
    }

    await application.save()

    // Send notification email to applicant
    try {
      const emailData = {
        applicantName: `${application.applicant.firstName} ${application.applicant.lastName}`,
        petName: application.pet.name,
        status: status,
        shelterName: application.pet.shelter.name,
        applicationLink: `${process.env.FRONTEND_URL}/dashboard/applications/${application._id}`,
      }

      if (status === "rejected" && rejectionReason) {
        emailData.rejectionReason = rejectionReason
      }

      await sendEmail({
        to: application.applicant.email,
        subject: `Application Update for ${application.pet.name}`,
        template: "application-status-update",
        data: emailData,
      })
    } catch (emailError) {
      console.error("Failed to send status update email:", emailError)
    }

    res.json({
      message: "Application status updated successfully",
      application,
    })
  } catch (error) {
    console.error("Update application status error:", error)
    res.status(500).json({ message: "Server error while updating application" })
  }
})

// @route   POST /api/applications/:id/notes
// @desc    Add note to application
// @access  Private
router.post("/:id/notes", auth, async (req, res) => {
  try {
    const { message, isInternal = false } = req.body

    const application = await Application.findById(req.params.id)

    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }

    // Check authorization
    const isApplicant = application.applicant.toString() === req.user._id.toString()
    const isShelterOwner = application.pet.shelter.owner.toString() === req.user._id.toString()

    if (!isApplicant && !isShelterOwner) {
      return res.status(403).json({ message: "Not authorized to add notes to this application" })
    }

    // Only shelter owners can add internal notes
    if (isInternal && !isShelterOwner) {
      return res.status(403).json({ message: "Only shelter owners can add internal notes" })
    }

    application.notes.push({
      author: req.user._id,
      message,
      isInternal,
    })

    await application.save()

    res.json({
      message: "Note added successfully",
      application,
    })
  } catch (error) {
    console.error("Add note error:", error)
    res.status(500).json({ message: "Server error while adding note" })
  }
})

// @route   DELETE /api/applications/:id
// @desc    Withdraw application (applicants only)
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)

    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }

    // Check if user is the applicant
    if (application.applicant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to withdraw this application" })
    }

    // Can only withdraw pending or under-review applications
    if (!["pending", "under-review"].includes(application.status)) {
      return res.status(400).json({
        message: "Cannot withdraw application in current status",
      })
    }

    application.status = "withdrawn"
    await application.save()

    res.json({ message: "Application withdrawn successfully" })
  } catch (error) {
    console.error("Withdraw application error:", error)
    res.status(500).json({ message: "Server error while withdrawing application" })
  }
})

// @route   GET /api/applications/shelter/received
// @desc    Get applications received by shelter
// @access  Private (Shelter owners only)
router.get("/shelter/received", auth, async (req, res) => {
  try {
    if (req.user.userType !== "shelter") {
      return res.status(403).json({ message: "Only shelter accounts can access this endpoint" })
    }

    const { status, page = 1, limit = 10 } = req.query

    // Find shelter owned by user
    const Shelter = require("../models/Shelter")
    const shelter = await Shelter.findOne({ owner: req.user._id })

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" })
    }

    // Find pets belonging to this shelter
    const shelterPets = await Pet.find({ shelter: shelter._id }).select("_id")
    const petIds = shelterPets.map((pet) => pet._id)

    const filter = { pet: { $in: petIds } }

    if (status && status !== "all") {
      filter.status = status
    }

    const applications = await Application.find(filter)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Application.countDocuments(filter)

    res.json({
      applications,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get shelter applications error:", error)
    res.status(500).json({ message: "Server error while fetching applications" })
  }
})

module.exports = router
