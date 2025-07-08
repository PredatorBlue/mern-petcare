import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Phone, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for pets - in a real app, this would come from an API
const petsData = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    size: "Large",
    location: "New York, NY",
    image: "/images/pets/buddy.jpg",
    description: "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He&apos;s great with children and other dogs, and would make an excellent family companion. Buddy is house-trained and knows basic commands.",
    personality: ["Friendly", "Energetic", "Good with kids", "Good with other dogs"],
    health: ["Vaccinated", "Spayed/Neutered", "Microchipped", "Healthy"],
    needs: ["Regular exercise", "Grooming", "Training"],
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Persian",
    age: "1 year",
    gender: "Female",
    size: "Medium",
    location: "Los Angeles, CA",
    image: "/images/pets/luna.jpg",
    description: "Luna is a gentle and affectionate Persian cat who loves to cuddle and be pampered. She&apos;s perfect for apartment living and enjoys quiet environments. Luna is litter-trained and gets along well with other cats.",
    personality: ["Gentle", "Affectionate", "Quiet", "Independent"],
    health: ["Vaccinated", "Spayed/Neutered", "Microchipped", "Healthy"],
    needs: ["Regular grooming", "Quiet environment", "Litter box maintenance"],
  },
  {
    id: 3,
    name: "Charlie",
    type: "Dog",
    breed: "Labrador Mix",
    age: "3 years",
    gender: "Male",
    size: "Large",
    location: "Chicago, IL",
    image: "/images/pets/charlie.jpg",
    description: "Charlie is a playful and loyal Labrador mix who loves outdoor adventures. He&apos;s very intelligent and eager to please, making him great for training. Charlie would be perfect for an active family who enjoys hiking and outdoor activities.",
    personality: ["Playful", "Loyal", "Intelligent", "Active"],
    health: ["Vaccinated", "Spayed/Neutered", "Microchipped", "Healthy"],
    needs: ["Regular exercise", "Mental stimulation", "Training"],
  },
]

interface PetPageProps {
  params: {
    id: string
  }
}

export default function PetPage({ params }: PetPageProps) {
  const petId = parseInt(params.id)
  const pet = petsData.find(p => p.id === petId)

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pet Not Found</h1>
          <p className="text-gray-600 mb-6">The pet you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/adopt">Browse Available Pets</Link>
          </Button>
        </div>
      </div>
    )
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
            <Link href="/adopt" className="text-gray-600 hover:text-gray-900">
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
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild>
          <Link href="/adopt" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Pets
          </Link>
        </Button>
      </div>

      {/* Pet Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Pet Image */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={pet.image}
                alt={pet.name}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-green-500">Available</Badge>
            </div>
          </div>

          {/* Pet Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{pet.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{pet.breed} • {pet.age} • {pet.gender}</p>
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {pet.location}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">About {pet.name}</h2>
              <p className="text-gray-600 leading-relaxed">{pet.description}</p>
            </div>

            {/* Personality Traits */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Personality</h3>
              <div className="flex flex-wrap gap-2">
                {pet.personality.map((trait, index) => (
                  <Badge key={index} variant="secondary">{trait}</Badge>
                ))}
              </div>
            </div>

            {/* Health Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Health & Care</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Health Status</h4>
                  <ul className="space-y-1">
                    {pet.health.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Special Needs</h4>
                  <ul className="space-y-1">
                    {pet.needs.map((need, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Adoption Actions */}
            <div className="space-y-4">
              <Button size="lg" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                Adopt {pet.name}
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Shelter
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Process</CardTitle>
              <CardDescription>
                Here&apos;s what you need to know about adopting {pet.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Submit Application</h4>
                  <p className="text-sm text-gray-600">Fill out our adoption application form with your details and preferences.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Meet & Greet</h4>
                  <p className="text-sm text-gray-600">Schedule a meeting with {pet.name} to ensure it&apos;s a good match.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Finalize Adoption</h4>
                  <p className="text-sm text-gray-600">Complete the adoption paperwork and take {pet.name} home!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 