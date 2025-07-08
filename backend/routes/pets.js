const express = require("express")
const Pet = require("../models/Pet")
const { auth, optionalAuth } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/pets
// @desc    Get all pets with filtering and pagination
// @access  Public
router.get("/", optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      type,
      breed,
      size,
      age,
      gender,
      location,
      search,
      shelter,
      available = true,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query

    // Build filter object
    const filter = {}

    if (available !== "all") {
      filter.isAvailable = available === "true"
    }

    if (type && type !== "all") {
      filter.type = type.toLowerCase()
    }

    if (breed) {
      filter.breed = new RegExp(breed, "i")
    }

    if (size && size !== "all") {
      filter.size = size.toLowerCase()
    }

    if (gender && gender !== "all") {
      filter.gender = gender.toLowerCase()
    }

    if (shelter) {
      filter.shelter = shelter
    }

    // Age filtering
    if (age && age !== "all") {
      switch (age) {
        case "young":
          filter.$or = [
            { "age.years": 0 },
            { "age.years": 1 },
            { $and: [{ "age.years": 2 }, { "age.months": { $lte: 6 } }] },
          ]
          break
        case "adult":
          filter.$and = [{ "age.years": { $gte: 2 } }, { "age.years": { $lte: 7 } }]
          break
        case "senior":
          filter["age.years"] = { $gt: 7 }
          break
      }
    }

    // Location filtering (basic city/state match)
    if (location) {
      filter.$or = [{ "location.city": new RegExp(location, "i") }, { "location.state": new RegExp(location, "i") }]
    }

    // Text search
    if (search) {
      filter.$text = { $search: search }
    }

    // Sort options
    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1

    // Execute query with pagination
    const pets = await Pet.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("shelter", "name address contact")

    // Get total count for pagination
    const total = await Pet.countDocuments(filter)

    // Update view counts if user is viewing
    if (req.user) {
      await Pet.updateMany({ _id: { $in: pets.map((pet) => pet._id) } }, { $inc: { views: 1 } })
    }

    res.json({
      pets,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
      filters: {
        type,
        breed,
        size,
        age,
        gender,
        location,
        search,
        available,
      },
    })
  } catch (error) {
    console.error("Get pets error:", error)
    res.status(500).json({ message: "Server error while fetching pets" })
  }
})

// @route   GET /api/pets/:id
// @desc    Get single pet by ID
// @access  Public
router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("shelter", "name description address contact operatingHours")

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" })
    }

    // Increment view count
    pet.views += 1
    await pet.save()

    res.json({ pet })
  } catch (error) {
    console.error("Get pet error:", error)

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Pet not found" })
    }

    res.status(500).json({ message: "Server error while fetching pet" })
  }
})

// @route   POST /api/pets/:id/save
// @desc    Save/unsave pet to favorites
// @access  Private
router.post("/:id/save", auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" })
    }

    const User = require("../models/User")
    const user = await User.findById(req.user._id)

    // Initialize savedPets array if it doesn't exist
    if (!user.savedPets) {
      user.savedPets = []
    }

    const petIndex = user.savedPets.indexOf(req.params.id)
    let action

    if (petIndex > -1) {
      // Pet is already saved, remove it
      user.savedPets.splice(petIndex, 1)
      pet.saves = Math.max(0, pet.saves - 1)
      action = "removed"
    } else {
      // Pet is not saved, add it
      user.savedPets.push(req.params.id)
      pet.saves += 1
      action = "added"
    }

    await user.save()
    await pet.save()

    res.json({
      message: `Pet ${action} ${action === "added" ? "to" : "from"} favorites`,
      saved: action === "added",
      totalSaves: pet.saves,
    })
  } catch (error) {
    console.error("Save pet error:", error)

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Pet not found" })
    }

    res.status(500).json({ message: "Server error while saving pet" })
  }
})

module.exports = router
