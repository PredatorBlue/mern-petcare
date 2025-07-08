const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: [true, "Service provider is required"],
    },
    service: {
      name: {
        type: String,
        required: [true, "Service name is required"],
      },
      type: {
        type: String,
        required: [true, "Service type is required"],
      },
      price: {
        amount: Number,
        currency: {
          type: String,
          default: "USD",
        },
      },
    },
    petInfo: {
      name: String,
      type: String,
      breed: String,
      age: String,
      weight: String,
      specialNeeds: String,
    },
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
    appointmentTime: {
      type: String,
      required: [true, "Appointment time is required"],
    },
    duration: {
      type: Number, // in minutes
      default: 60,
    },
    status: {
      type: String,
      enum: ["scheduled", "confirmed", "in-progress", "completed", "cancelled", "no-show"],
      default: "scheduled",
    },
    notes: {
      userNotes: String,
      providerNotes: String,
      internalNotes: String,
    },
    remindersSent: {
      email24h: {
        type: Boolean,
        default: false,
      },
      sms2h: {
        type: Boolean,
        default: false,
      },
    },
    payment: {
      status: {
        type: String,
        enum: ["pending", "paid", "refunded", "failed"],
        default: "pending",
      },
      method: String,
      transactionId: String,
      amount: Number,
      paidAt: Date,
    },
    cancellation: {
      cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reason: String,
      cancelledAt: Date,
      refundIssued: Boolean,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
appointmentSchema.index({ user: 1, appointmentDate: 1 })
appointmentSchema.index({ serviceProvider: 1, appointmentDate: 1 })
appointmentSchema.index({ appointmentDate: 1, status: 1 })

// Populate user and service provider info
appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstName lastName email phone",
  }).populate({
    path: "serviceProvider",
    select: "name serviceType contact address",
  })
  next()
})

module.exports = mongoose.model("Appointment", appointmentSchema)
