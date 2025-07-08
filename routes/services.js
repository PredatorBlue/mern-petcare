const express = require("express")
const ServiceProvider = require("../models/ServiceProvider")
const { auth, isServiceProvider } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/services
// @desc    Get all service providers
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      serviceType,
      city,
      state,
      search,
      sortBy = "rating.average",
      sortOrder = "desc",
    } = req.query

    const filter = { isActive: true }

    if (serviceType && serviceType !== "all") {
      filter.serviceType = serviceType.toLowerCase()
    }

    if (city) {
      filter["address.city"] = new RegExp(city, "i")
    }

    if (state) {
      filter["address.state"] = new RegExp(state, "i")
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { "services.name": new RegExp(search, "i") },
      ]
    }

    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1

    const serviceProviders = await ServiceProvider.find(filter)
      .populate("owner", "firstName lastName email")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await ServiceProvider.countDocuments(filter)

    res.json({
      serviceProviders,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get service providers error:", error)
    res.status(500).json({ message: "Server error while fetching service providers" })
  }
})

// @route   POST /api/services
// @desc    Create service provider profile
// @access  Private (Service providers only)
router.post("/", auth, isServiceProvider, async (req, res) => {
  try {
    // Check if user already has a service provider profile
    const existingProvider = await ServiceProvider.findOne({ owner: req.user._id })
    if (existingProvider) {
      return res.status(400).json({ message: "User already has a service provider profile" })
    }

    const providerData = {
      ...req.body,
      owner: req.user._id,
    }

    const serviceProvider = new ServiceProvider(providerData)
    await serviceProvider.save()

    await serviceProvider.populate("owner", "firstName lastName email")

    res.status(201).json({
      message: "Service provider profile created successfully",
      serviceProvider,
    })
  } catch (error) {
    console.error("Create service provider error:", error)

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({ message: "Validation error", errors })
    }

    res.status(500).json({ message: "Server error while creating service provider" })
  }
})

// @route   GET /api/services/:id
// @desc    Get service provider by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findById(req.params.id).populate("owner", "firstName lastName email")

    if (!serviceProvider) {
      return res.status(404).json({ message: "Service provider not found" })
    }

    res.json({ serviceProvider })
  } catch (error) {
    console.error("Get service provider error:", error)

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Service provider not found" })
    }

    res.status(500).json({ message: "Server error while fetching service provider" })
  }
})

module.exports = router
