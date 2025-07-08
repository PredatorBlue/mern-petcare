const mongoose = require("mongoose")

const serviceProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service provider name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      enum: ["veterinary", "grooming", "training", "boarding", "walking", "sitting"],
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
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
      },
    },
    contact: {
      phone: {
        type: String,
        required: [true, "Phone number is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
      },
      website: String,
    },
    services: [
      {
        name: {
          type: String,
          required: true,
        },
        description: String,
        price: {
          amount: Number,
          unit: {
            type: String,
            enum: ["per-visit", "per-hour", "per-day", "per-week", "per-month", "flat-rate"],
          },
        },
        duration: String,
        availability: [String],
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
    credentials: [
      {
        name: String,
        issuedBy: String,
        issuedDate: Date,
        expiryDate: Date,
        certificateUrl: String,
      },
    ],
    images: [
      {
        url: String,
        caption: String,
        isPrimary: Boolean,
      },
    ],
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Virtual for full address
serviceProviderSchema.virtual("fullAddress").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`
})

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema)
