"use client"

import { useState } from "react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Separator } from "../../../../components/ui/separator"
import { Heart, MapPin, Calendar, User, Phone, Mail, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PetDetailPage({ params }: { params: { id: string } }) {
  const [showAdoptionForm, setShowAdoptionForm] = useState(false)

  // Mock pet data - in real app, fetch based on params.id
  const pet = {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    size: "Large",
    weight: "65 lbs",
    gender: "Male",
    color: "Golden",
    location: "New York, NY",
    shelter: "Happy Paws Rescue",
    images: [
      "/images/pets/buddy.jpg",
      "/images/pets/buddy.jpg",
      "/images/pets/buddy.jpg",
    ],
    description:
      "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He's great with children and other dogs, making him the perfect family companion. Buddy is house-trained and knows basic commands like sit, stay, and come.",
    personality: ["Friendly", "Energetic", "Loyal", "Playful", "Good with kids"],
    medicalInfo: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
      healthIssues: "None known",
    },
    requirements: [
      "Fenced yard preferred",
      "Daily exercise required",
      "Good with children over 5",
      "Previous dog experience helpful",
    ],
    adoptionFee: 250,
    dateAvailable: "Available now",
    contact: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah@happypaws.org",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">PetCare</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/adopt" className="text-blue-600 font-medium">
              Adopt
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/adopt">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pets
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={pet.images[0] || "/placeholder.svg"}
                    alt={pet.name}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-500">Available</Badge>
                  <Button size="sm" variant="secondary" className="absolute top-4 left-4">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2 p-4">
                  {pet.images.slice(1).map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${pet.name} ${index + 2}`}
                      width={200}
                      height={150}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pet Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl">{pet.name}</CardTitle>
                    <CardDescription className="text-lg">{pet.breed}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Age:</span>
                      <span>{pet.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Size:</span>
                      <span>{pet.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Weight:</span>
                      <span>{pet.weight}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Gender:</span>
                      <span>{pet.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Color:</span>
                      <span>{pet.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Location:</span>
                      <span>{pet.location}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">About {pet.name}</h3>
                  <p className="text-gray-600">{pet.description}</p>
                </div>

                {/* Personality */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Personality</h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.personality.map((trait, index) => (
                      <Badge key={index} variant="secondary">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Medical Info */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Medical Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Vaccinated:</span>
                        <Badge variant={pet.medicalInfo.vaccinated ? "default" : "secondary"}>
                          {pet.medicalInfo.vaccinated ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Neutered:</span>
                        <Badge variant={pet.medicalInfo.neutered ? "default" : "secondary"}>
                          {pet.medicalInfo.neutered ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Microchipped:</span>
                        <Badge variant={pet.medicalInfo.microchipped ? "default" : "secondary"}>
                          {pet.medicalInfo.microchipped ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Health Issues:</span>
                        <span>{pet.medicalInfo.healthIssues}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Adoption Requirements</h3>
                  <ul className="space-y-1">
                    {pet.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Adoption Card */}
            <Card>
              <CardHeader>
                <CardTitle>Adopt {pet.name}</CardTitle>
                <CardDescription>Ready to give {pet.name} a forever home?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">${pet.adoptionFee}</div>
                  <div className="text-sm text-gray-500">Adoption Fee</div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {pet.dateAvailable}
                </div>
                <Button className="w-full" size="lg" onClick={() => setShowAdoptionForm(true)}>
                  Apply to Adopt
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Favorites
                </Button>
              </CardContent>
            </Card>

            {/* Shelter Info */}
            <Card>
              <CardHeader>
                <CardTitle>Shelter Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">{pet.shelter}</div>
                  <div className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pet.location}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    {pet.contact.name}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {pet.contact.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {pet.contact.email}
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Shelter
                </Button>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle>Adoption Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Meet the pet in person before deciding</li>
                  <li>• Ask about the pet's history and behavior</li>
                  <li>• Prepare your home for a new pet</li>
                  <li>• Budget for ongoing pet care costs</li>
                  <li>• Consider pet insurance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Adoption Form Modal */}
      {showAdoptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Adoption Application</CardTitle>
              <CardDescription>Fill out this form to start the adoption process for {pet.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-gray-600">
                <p>Adoption application form would be implemented here with:</p>
                <ul className="text-left mt-2 space-y-1">
                  <li>• Personal information</li>
                  <li>• Housing situation</li>
                  <li>• Pet experience</li>
                  <li>• References</li>
                  <li>• Veterinarian contact</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Submit Application</Button>
                <Button variant="outline" onClick={() => setShowAdoptionForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
