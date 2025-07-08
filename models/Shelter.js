const mongoose = require("mongoose")

const shelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Shelter name is required"],
      trim: true,
      maxlength: [100, "Shelter name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    address: {
      street: {
        type: String,
        required: [true, "Street address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      zipCode: {
        type: String,
        required: [true, "ZIP code is required"],
        match: [/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"],
      },
    },
    contact: {
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^$$\d{3}$$ \d{3}-\d{4}$/, "Please enter a valid phone number format: (555) 123-4567"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
      },
      website: {
        type: String,
        match: [/^https?:\/\/.+/, "Please enter a valid website URL"],
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Shelter owner is required"],
    },
    staff: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["admin", "volunteer", "veterinarian"],
          default: "volunteer",
        },
        joinedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    operatingHours: {
      monday: { open: String, close: String, closed: Boolean },
      tuesday: { open: String, close: String, closed: Boolean },
      wednesday: { open: String, close: String, closed: Boolean },
      thursday: { open: String, close: String, closed: Boolean },
      friday: { open: String, close: String, closed: Boolean },
      saturday: { open: String, close: String, closed: Boolean },
      sunday: { open: String, close: String, closed: Boolean },
    },
    capacity: {
      dogs: Number,
      cats: Number,
      other: Number,
    },
    currentCount: {
      dogs: { type: Number, default: 0 },
      cats: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Virtual for full address
shelterSchema.virtual("fullAddress").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`
})

// Virtual for pet count
shelterSchema.virtual("totalPets").get(function () {
  return this.currentCount.dogs + this.currentCount.cats + this.currentCount.other
})

module.exports = mongoose.model("Shelter", shelterSchema)
