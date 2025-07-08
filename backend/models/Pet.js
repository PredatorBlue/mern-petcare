const mongoose = require("mongoose")

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet name is required"],
      trim: true,
      maxlength: [50, "Pet name cannot exceed 50 characters"],
    },
    type: {
      type: String,
      required: [true, "Pet type is required"],
      enum: ["dog", "cat", "bird", "rabbit", "other"],
      lowercase: true,
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
      trim: true,
      maxlength: [100, "Breed cannot exceed 100 characters"],
    },
    age: {
      years: {
        type: Number,
        min: 0,
        max: 30,
      },
      months: {
        type: Number,
        min: 0,
        max: 11,
      },
    },
    size: {
      type: String,
      required: [true, "Size is required"],
      enum: ["small", "medium", "large", "extra-large"],
      lowercase: true,
    },
    weight: {
      type: Number,
      min: 0,
      max: 200,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female"],
      lowercase: true,
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
      maxlength: [50, "Color cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    personality: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
        caption: String,
      },
    ],
    medicalInfo: {
      vaccinated: {
        type: Boolean,
        default: false,
      },
      neutered: {
        type: Boolean,
        default: false,
      },
      microchipped: {
        type: Boolean,
        default: false,
      },
      healthIssues: {
        type: String,
        default: "None known",
      },
      lastVetVisit: Date,
      medications: [String],
    },
    adoptionRequirements: [
      {
        type: String,
        trim: true,
      },
    ],
    adoptionFee: {
      type: Number,
      required: [true, "Adoption fee is required"],
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    shelter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
      required: [true, "Shelter is required"],
    },
    location: {
      city: String,
      state: String,
      zipCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    dateAvailable: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    saves: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
petSchema.index({
  name: "text",
  breed: "text",
  description: "text",
})

// Index for location-based queries
petSchema.index({ "location.coordinates": "2dsphere" })

// Virtual for age display
petSchema.virtual("ageDisplay").get(function () {
  if (this.age.years === 0) {
    return `${this.age.months} month${this.age.months !== 1 ? "s" : ""}`
  } else if (this.age.months === 0) {
    return `${this.age.years} year${this.age.years !== 1 ? "s" : ""}`
  } else {
    return `${this.age.years} year${this.age.years !== 1 ? "s" : ""}, ${this.age.months} month${this.age.months !== 1 ? "s" : ""}`
  }
})

// Get primary image
petSchema.virtual("primaryImage").get(function () {
  const primaryImg = this.images.find((img) => img.isPrimary)
  return primaryImg ? primaryImg.url : this.images.length > 0 ? this.images[0].url : null
})

// Populate shelter info by default
petSchema.pre(/^find/, function (next) {
  this.populate({
    path: "shelter",
    select: "name address city state phone email",
  })
  next()
})

module.exports = mongoose.model("Pet", petSchema)
