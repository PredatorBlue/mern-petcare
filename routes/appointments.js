const express = require("express")
const Appointment = require("../models/Appointment")
const ServiceProvider = require("../models/ServiceProvider")
const { auth } = require("../middleware/auth")

const router = express.Router()

// @route   POST /api/appointments
// @desc    Book an appointment
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      user: req.user._id,
    }

    // Validate service provider exists
    const serviceProvider = await ServiceProvider.findById(req.body.serviceProvider)
    if (!serviceProvider) {
      return res.status(404).json({ message: "Service provider not found" })
    }

    // Check for conflicting appointments
    const conflictingAppointment = await Appointment.findOne({
      serviceProvider: req.body.serviceProvider,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      status: { $in: ["scheduled", "confirmed"] },
    })

    if (conflictingAppointment) {
      return res.status(400).json({ message: "Time slot is already booked" })
    }

    const appointment = new Appointment(appointmentData)
    await appointment.save()

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    })
  } catch (error) {
    console.error("Book appointment error:", error)

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({ message: "Validation error", errors })
    }

    res.status(500).json({ message: "Server error while booking appointment" })
  }
})

// @route   GET /api/appointments
// @desc    Get user's appointments
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query

    const filter = { user: req.user._id }

    if (status && status !== "all") {
      filter.status = status
    }

    const appointments = await Appointment.find(filter)
      .sort({ appointmentDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Appointment.countDocuments(filter)

    res.json({
      appointments,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get appointments error:", error)
    res.status(500).json({ message: "Server error while fetching appointments" })
  }
})

module.exports = router
