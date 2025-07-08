const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("../models/User")
const Shelter = require("../models/Shelter")
const Pet = require("../models/Pet")
const ServiceProvider = require("../models/ServiceProvider")

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Shelter.deleteMany({})
    await Pet.deleteMany({})
    await ServiceProvider.deleteMany({})
    console.log("Cleared existing data")

    // Create sample users
    const users = await User.create([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "(555) 123-4567",
        password: "password123",
        userType: "adopter",
        isVerified: true,
      },
      {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@happypaws.org",
        phone: "(555) 234-5678",
        password: "password123",
        userType: "shelter",
        isVerified: true,
      },
      {
        firstName: "Dr. Michael",
        lastName: "Chen",
        email: "dr.chen@petvet.com",
        phone: "(555) 345-6789",
        password: "password123",
        userType: "veterinarian",
        isVerified: true,
      },
    ])

    console.log("Created sample users")

    // Create sample shelter
    const shelter = await Shelter.create({
      name: "Happy Paws Rescue",
      description: "Dedicated to finding loving homes for abandoned pets",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
      contact: {
        phone: "(555) 234-5678",
        email: "info@happypaws.org",
        website: "https://happypaws.org",
      },
      owner: users[1]._id,
      operatingHours: {
        monday: { open: "09:00", close: "17:00", closed: false },
        tuesday: { open: "09:00", close: "17:00", closed: false },
        wednesday: { open: "09:00", close: "17:00", closed: false },
        thursday: { open: "09:00", close: "17:00", closed: false },
        friday: { open: "09:00", close: "17:00", closed: false },
        saturday: { open: "10:00", close: "16:00", closed: false },
        sunday: { open: "12:00", close: "16:00", closed: false },
      },
    })

    console.log("Created sample shelter")

    // Create sample pets
    const pets = await Pet.create([
      {
        name: "Buddy",
        type: "dog",
        breed: "Golden Retriever",
        age: { years: 2, months: 0 },
        size: "large",
        weight: 65,
        gender: "male",
        color: "Golden",
        description: "Friendly and energetic dog looking for a loving family. Great with children and other dogs.",
        personality: ["Friendly", "Energetic", "Loyal", "Playful", "Good with kids"],
        images: [
          { url: "/placeholder.svg?height=400&width=600", isPrimary: true },
          { url: "/placeholder.svg?height=400&width=600", isPrimary: false },
        ],
        medicalInfo: {
          vaccinated: true,
          neutered: true,
          microchipped: true,
          healthIssues: "None known",
        },
        adoptionRequirements: [
          "Fenced yard preferred",
          "Daily exercise required",
          "Good with children over 5",
          "Previous dog experience helpful",
        ],
        adoptionFee: 250,
        shelter: shelter._id,
        location: {
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
      },
      {
        name: "Luna",
        type: "cat",
        breed: "Persian",
        age: { years: 1, months: 0 },
        size: "medium",
        weight: 8.5,
        gender: "female",
        color: "White",
        description: "Gentle and affectionate cat perfect for apartment living. Loves to cuddle and purr.",
        personality: ["Gentle", "Affectionate", "Quiet", "Indoor cat"],
        images: [{ url: "/placeholder.svg?height=400&width=600", isPrimary: true }],
        medicalInfo: {
          vaccinated: true,
          neutered: false,
          microchipped: true,
          healthIssues: "None known",
        },
        adoptionRequirements: ["Indoor only", "Quiet household preferred", "Regular grooming required"],
        adoptionFee: 150,
        shelter: shelter._id,
        location: {
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
      },
    ])

    console.log("Created sample pets")

    // Create sample service provider
    const serviceProvider = await ServiceProvider.create({
      name: "Pet Veterinary Clinic",
      serviceType: "veterinary",
      description: "Full-service veterinary clinic with experienced doctors",
      owner: users[2]._id,
      address: {
        street: "321 Health Street",
        city: "New York",
        state: "NY",
        zipCode: "10002",
      },
      contact: {
        phone: "(555) 345-6789",
        email: "info@petvetclinic.com",
        website: "https://petvetclinic.com",
      },
      services: [
        {
          name: "Health Checkup",
          description: "Comprehensive health examination",
          price: { amount: 75, unit: "per-visit" },
          duration: "30 minutes",
        },
        {
          name: "Vaccination",
          description: "Standard pet vaccinations",
          price: { amount: 45, unit: "per-visit" },
          duration: "15 minutes",
        },
      ],
      operatingHours: {
        monday: { open: "08:00", close: "18:00", closed: false },
        tuesday: { open: "08:00", close: "18:00", closed: false },
        wednesday: { open: "08:00", close: "18:00", closed: false },
        thursday: { open: "08:00", close: "18:00", closed: false },
        friday: { open: "08:00", close: "18:00", closed: false },
        saturday: { open: "09:00", close: "15:00", closed: false },
        sunday: { open: "10:00", close: "14:00", closed: false },
      },
    })

    console.log("Created sample service provider")

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
