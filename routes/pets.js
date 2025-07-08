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

// @route   POST /api/pets
// @desc    Create a new pet
// @access  Private (Shelter owners only)
router.post("/", auth, async (req, res) => {
  try {
    // Check if user is shelter owner
    if (req.user.userType !== "shelter") {
      return res.status(403).json({ message: "Only shelter accounts can add pets" })
    }

    // Find user's shelter
    const Shelter = require("../models/Shelter")
    const shelter = await Shelter.findOne({ owner: req.user._id })

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found for this user" })
    }

    const petData = {
      ...req.body,
      shelter: shelter._id,
    }

    const pet = new Pet(petData)
    await pet.save()

    // Populate shelter info before sending response
    await pet.populate("shelter", "name address contact")

    res.status(201).json({
      message: "Pet added successfully",
      pet,
    })
  } catch (error) {
    console.error("Create pet error:", error)

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({ message: "Validation error", errors })
    }

    res.status(500).json({ message: "Server error while creating pet" })
  }
})

// @route   PUT /api/pets/:id
// @desc    Update pet
// @access  Private (Shelter owners only)
router.put("/:id", auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("shelter")

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" })
    }

    // Check if user owns this pet's shelter
    if (pet.shelter.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this pet" })
    }

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("shelter", "name address contact")

    res.json({
      message: "Pet updated successfully",
      pet: updatedPet,
    })
  } catch (error) {
    console.error("Update pet error:", error)

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({ message: "Validation error", errors })
    }

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Pet not found" })
    }

    res.status(500).json({ message: "Server error while updating pet" })
  }
})

// @route   DELETE /api/pets/:id
// @desc    Delete pet
// @access  Private (Shelter owners only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("shelter")

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" })
    }

    // Check if user owns this pet's shelter
    if (pet.shelter.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this pet" })
    }

    await Pet.findByIdAndDelete(req.params.id)

    res.json({ message: "Pet deleted successfully" })
  } catch (error) {
    console.error("Delete pet error:", error)

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Pet not found" })
    }

    res.status(500).json({ message: "Server error while deleting pet" })
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

// @route   GET /api/pets/:id/similar
// @desc    Get similar pets
// @access  Public
router.get("/:id/similar", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" })
    }

    // Find similar pets based on type, size, and location
    const similarPets = await Pet.find({
      _id: { $ne: pet._id },
      type: pet.type,
      isAvailable: true,
      $or: [{ size: pet.size }, { "location.city": pet.location.city }, { breed: new RegExp(pet.breed, "i") }],
    })
      .limit(6)
      .populate("shelter", "name address contact")

    res.json({ pets: similarPets })
  } catch (error) {
    console.error("Get similar pets error:", error)
    res.status(500).json({ message: "Server error while fetching similar pets" })
  }
})

module.exports = router
