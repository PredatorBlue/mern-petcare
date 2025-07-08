const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: [true, "Pet is required"],
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Applicant is required"],
    },
    status: {
      type: String,
      enum: ["pending", "under-review", "approved", "rejected", "completed", "withdrawn"],
      default: "pending",
    },
    applicationData: {
      // Personal Information
      personalInfo: {
        occupation: String,
        employer: String,
        income: String,
        references: [
          {
            name: String,
            relationship: String,
            phone: String,
            email: String,
          },
        ],
      },

      // Housing Information
      housing: {
        type: {
          type: String,
          enum: ["house", "apartment", "condo", "townhouse", "other"],
          required: true,
        },
        ownership: {
          type: String,
          enum: ["own", "rent"],
          required: true,
        },
        landlordApproval: Boolean,
        hasYard: Boolean,
        yardFenced: Boolean,
        yardSize: String,
        householdSize: Number,
        childrenAges: [Number],
      },

      // Pet Experience
      petExperience: {
        hadPetsBefore: Boolean,
        currentPets: [
          {
            type: String,
            breed: String,
            age: String,
            vaccinated: Boolean,
            neutered: Boolean,
          },
        ],
        veterinarian: {
          name: String,
          clinic: String,
          phone: String,
        },
        petCareExperience: String,
      },

      // Lifestyle
      lifestyle: {
        hoursAloneDaily: String,
        exerciseCommitment: String,
        trainingExperience: String,
        reasonForAdoption: String,
        petPersonality: [String],
        dealBreakers: [String],
      },

      // Emergency Plan
      emergencyPlan: {
        vacationCare: String,
        emergencyContact: {
          name: String,
          phone: String,
          relationship: String,
        },
        financialPreparedness: String,
      },
    },

    // Application timeline
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: Date,
    approvedAt: Date,
    completedAt: Date,

    // Communication
    notes: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        isInternal: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Documents
    documents: [
      {
        name: String,
        url: String,
        type: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Meeting/Visit Information
    meetingScheduled: {
      date: Date,
      time: String,
      location: String,
      notes: String,
    },

    // Rejection reason (if applicable)
    rejectionReason: String,

    // Follow-up information
    followUp: {
      required: {
        type: Boolean,
        default: false,
      },
      date: Date,
      completed: {
        type: Boolean,
        default: false,
      },
      notes: String,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
applicationSchema.index({ applicant: 1, status: 1 })
applicationSchema.index({ pet: 1, status: 1 })
applicationSchema.index({ submittedAt: -1 })

// Populate pet and applicant info
applicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "pet",
    select: "name type breed images shelter",
    populate: {
      path: "shelter",
      select: "name contact",
    },
  }).populate({
    path: "applicant",
    select: "firstName lastName email phone",
  })
  next()
})

module.exports = mongoose.model("Application", applicationSchema)
