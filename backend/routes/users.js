const express = require("express")
const User = require("../models/User")
const Pet = require("../models/Pet")
const { auth } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/users/saved-pets
// @desc    Get user's saved pets
// @access  Private
router.get("/saved-pets", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "savedPets",
      populate: {
        path: "shelter",
        select: "name address contact",
      },
    })

    res.json({ savedPets: user.savedPets || [] })
  } catch (error) {
    console.error("Get saved pets error:", error)
    res.status(500).json({ message: "Server error while fetching saved pets" })
  }
})

// @route   POST /api/users/save-pet/:petId
// @desc    Save a pet to user's favorites
// @access  Private
router.post("/save-pet/:petId", auth, async (req, res) => {
  try {
    const { petId } = req.params
    const userId = req.user._id

    const user = await User.findById(userId)
    if (!user.savedPets.includes(petId)) {
      user.savedPets.push(petId)
      await user.save()
    }

    res.json({ message: "Pet saved successfully" })
  } catch (error) {
    console.error("Save pet error:", error)
    res.status(500).json({ message: "Server error while saving pet" })
  }
})

// @route   DELETE /api/users/save-pet/:petId
// @desc    Remove a pet from user's favorites
// @access  Private
router.delete("/save-pet/:petId", auth, async (req, res) => {
  try {
    const { petId } = req.params
    const userId = req.user._id

    const user = await User.findById(userId)
    user.savedPets = user.savedPets.filter((id) => id.toString() !== petId)
    await user.save()

    res.json({ message: "Pet removed from favorites" })
  } catch (error) {
    console.error("Remove saved pet error:", error)
    res.status(500).json({ message: "Server error while removing pet" })
  }
})

// @route   GET /api/users/dashboard-stats
// @desc    Get user dashboard statistics
// @access  Private
router.get("/dashboard-stats", auth, async (req, res) => {
  try {
    const userId = req.user._id

    // Get saved pets count
    const user = await User.findById(userId)
    const savedPetsCount = user.savedPets ? user.savedPets.length : 0

    // Get applications count (if Application model exists)
    let applicationsCount = 0
    let recentApplications = []
    try {
      const Application = require("../models/Application")
      applicationsCount = await Application.countDocuments({ applicant: userId })
      recentApplications = await Application.find({ applicant: userId })
        .sort({ submittedAt: -1 })
        .limit(3)
        .populate("pet", "name breed")
    } catch (err) {
      console.log("Application model not found, skipping applications")
    }

    // Get appointments count (if Appointment model exists)
    let appointmentsCount = 0
    let upcomingAppointments = []
    try {
      const Appointment = require("../models/Appointment")
      appointmentsCount = await Appointment.countDocuments({
        user: userId,
        appointmentDate: { $gte: new Date() },
      })
      upcomingAppointments = await Appointment.find({
        user: userId,
        appointmentDate: { $gte: new Date() },
        status: { $in: ["scheduled", "confirmed"] },
      })
        .sort({ appointmentDate: 1 })
        .limit(3)
    } catch (err) {
      console.log("Appointment model not found, skipping appointments")
    }

    res.json({
      stats: {
        savedPets: savedPetsCount,
        applications: applicationsCount,
        appointments: appointmentsCount,
        notifications: 0,
      },
      recentApplications,
      upcomingAppointments,
    })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    res.status(500).json({ message: "Server error while fetching dashboard stats" })
  }
})

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")
    res.json(user)
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ message: "Server error while fetching profile" })
  }
})

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body
    const userId = req.user._id

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.name = name || user.name
    user.email = email || user.email
    user.phone = phone || user.phone
    user.address = address || user.address

    await user.save()

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Server error while updating profile" })
  }
})

module.exports = router
