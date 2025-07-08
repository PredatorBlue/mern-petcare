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

// @route   GET /api/users/dashboard-stats
// @desc    Get user dashboard statistics
// @access  Private
router.get("/dashboard-stats", auth, async (req, res) => {
  try {
    const userId = req.user._id

    // Get saved pets count
    const user = await User.findById(userId)
    const savedPetsCount = user.savedPets ? user.savedPets.length : 0

    // Get applications count
    const Application = require("../models/Application")
    const applicationsCount = await Application.countDocuments({ applicant: userId })

    // Get appointments count
    const Appointment = require("../models/Appointment")
    const appointmentsCount = await Appointment.countDocuments({
      user: userId,
      appointmentDate: { $gte: new Date() },
    })

    // Get recent applications
    const recentApplications = await Application.find({ applicant: userId }).sort({ submittedAt: -1 }).limit(3)

    // Get upcoming appointments
    const upcomingAppointments = await Appointment.find({
      user: userId,
      appointmentDate: { $gte: new Date() },
      status: { $in: ["scheduled", "confirmed"] },
    })
      .sort({ appointmentDate: 1 })
      .limit(3)

    res.json({
      stats: {
        savedPets: savedPetsCount,
        applications: applicationsCount,
        appointments: appointmentsCount,
        notifications: 0, // Implement notification system as needed
      },
      recentApplications,
      upcomingAppointments,
    })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    res.status(500).json({ message: "Server error while fetching dashboard stats" })
  }
})

module.exports = router
