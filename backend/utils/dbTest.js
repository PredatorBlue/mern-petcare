const mongoose = require("mongoose")
require("dotenv").config()

const testConnection = async () => {
  try {
    console.log("Testing MongoDB connection...")
    console.log("URI:", process.env.MONGODB_URI.replace(/\/\/.*@/, "//***:***@"))

    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connection successful!")

    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(
      "📋 Collections:",
      collections.map((c) => c.name),
    )

    process.exit(0)
  } catch (error) {
    console.error("❌ Connection failed:", error.message)
    process.exit(1)
  }
}

testConnection()
