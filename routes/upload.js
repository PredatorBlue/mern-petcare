const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { auth } = require("../middleware/auth")

const router = express.Router()

// Ensure upload directory exists
const uploadDir = "uploads"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(uploadDir, req.body.folder || "general")
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  // Allow only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: Number.parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
})

// @route   POST /api/upload/single
// @desc    Upload single file
// @access  Private
router.post("/single", auth, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const fileUrl = `/uploads/${req.body.folder || "general"}/${req.file.filename}`

    res.json({
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: fileUrl,
      },
    })
  } catch (error) {
    console.error("File upload error:", error)
    res.status(500).json({ message: "Server error during file upload" })
  }
})

// @route   POST /api/upload/multiple
// @desc    Upload multiple files
// @access  Private
router.post("/multiple", auth, upload.array("files", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" })
    }

    const files = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/uploads/${req.body.folder || "general"}/${file.filename}`,
    }))

    res.json({
      message: "Files uploaded successfully",
      files,
    })
  } catch (error) {
    console.error("Multiple file upload error:", error)
    res.status(500).json({ message: "Server error during file upload" })
  }
})

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large" })
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ message: "Too many files" })
    }
  }

  if (error.message === "Only image files are allowed") {
    return res.status(400).json({ message: error.message })
  }

  next(error)
})

module.exports = router
