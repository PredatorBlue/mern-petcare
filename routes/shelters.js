const express = require("express")
const Shelter = require("../models/Shelter")
const Pet = require("../models/Pet")
const { auth, isShelterOwner } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/shelters
// @desc    Get all shelters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, city, state, search } = req.query

    const filter = {}

    if (city) {
      filter["address.city"] = new RegExp(city, "i")
    }

    if (state) {
      filter["address.state"] = new RegExp(state, "i")
    }

    if (search) {
      filter.$or = [{ name: new RegExp(search, "i") }, { description: new RegExp(search, "i") }]
    }

    const shelters = await Shelter.find(filter)
      .populate("owner", "firstName lastName email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Shelter.countDocuments(filter)

    res.json({
      shelters,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get shelters error:", error)
    res.status(500).json({ message: "Server error while fetching shelters" })
  }
})

// @route   POST /api/shelters
// @desc    Create shelter profile
// @access  Private (Shelter users only)
router.post("/", auth, isShelterOwner, async (req, res) => {
  try {
    // Check if user already has a shelter
    const existingShelter = await Shelter.findOne({ owner: req.user._id })
    if (existingShelter) {
      return res.status(400).json({ message: "User already has a shelter profile" })
    }

    const shelterData = {
      ...req.body,
      owner: req.user._id,
    }

    const shelter = new Shelter(shelterData)
    await shelter.save()

    await shelter.populate("owner", "firstName lastName email")

    res.status(201).json({
      message: "Shelter profile created successfully",
      shelter,
    })
  } catch (error) {
    console.error("Create shelter error:", error)

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({ message: "Validation error", errors })
    }

    res.status(500).json({ message: "Server error while creating shelter" })
  }
})

// @route   GET /api/shelters/:id
// @desc    Get shelter by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id).populate("owner", "firstName lastName email")

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" })
    }

    // Get shelter's pets
    const pets = await Pet.find({ shelter: shelter._id, isAvailable: true }).limit(6).sort({ createdAt: -1 })

    res.json({
      shelter: {
        ...shelter.toObject(),
        pets,
      },
    })
  } catch (error) {
    console.error("Get shelter error:", error)

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Shelter not found" })
    }

    res.status(500).json({ message: "Server error while fetching shelter" })
  }
})

// @route   PUT /api/shelters/:id
// @desc    Update shelter
// @access  Private (Shelter owner only)
router.put("/:id", auth, async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id)

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" })
    }

    // Check if user owns this shelter
    if (shelter.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this shelter" })
    }

    const updatedShelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("owner", "firstName lastName email")

    res.json({
      message: "Shelter updated successfully",
      shelter: updatedShelter,
    })
  } catch (error) {
    console.error("Update shelter error:", error)

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({ message: "Validation error", errors })
    }

    res.status(500).json({ message: "Server error while updating shelter" })
  }
})

module.exports = router
