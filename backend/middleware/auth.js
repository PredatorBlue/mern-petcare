const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: "Invalid token. User not found." })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." })
    }
    res.status(500).json({ message: "Server error during authentication." })
  }
}

// Middleware to check if user is shelter owner
const isShelterOwner = async (req, res, next) => {
  try {
    if (req.user.userType !== "shelter") {
      return res.status(403).json({ message: "Access denied. Shelter account required." })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: "Server error during authorization." })
  }
}

// Middleware to check if user is service provider
const isServiceProvider = async (req, res, next) => {
  try {
    if (!["veterinarian", "service-provider"].includes(req.user.userType)) {
      return res.status(403).json({ message: "Access denied. Service provider account required." })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: "Server error during authorization." })
  }
}

// Optional auth middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)
      if (user) {
        req.user = user
      }
    }

    next()
  } catch (error) {
    // Continue without authentication
    next()
  }
}

module.exports = {
  auth,
  isShelterOwner,
  isServiceProvider,
  optionalAuth,
}
