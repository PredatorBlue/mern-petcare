"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdoptPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")

  const pets = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      size: "Large",
      location: "New York, NY",
      image: "/images/pets/buddy.jpg",
      description: "Friendly and energetic dog looking for a loving family",
      vaccinated: true,
      neutered: true,
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Persian",
      age: "1 year",
      size: "Medium",
      location: "Los Angeles, CA",
      image: "/images/pets/luna.jpg",
      description: "Gentle and affectionate cat perfect for apartment living",
      vaccinated: true,
      neutered: false,
    },
    {
      id: 3,
      name: "Charlie",
      type: "Dog",
      breed: "Labrador Mix",
      age: "3 years",
      size: "Large",
      location: "Chicago, IL",
      image: "/images/pets/charlie.jpg",
      description: "Playful and loyal companion ready for adventures",
      vaccinated: true,
      neutered: true,
    },
    {
      id: 4,
      name: "Whiskers",
      type: "Cat",
      breed: "Tabby",
      age: "6 months",
      size: "Small",
      location: "Houston, TX",
      image: "/images/pets/whiskers.jpg",
      description: "Curious kitten who loves to play and explore",
      vaccinated: false,
      neutered: false,
    },
    {
      id: 5,
      name: "Max",
      type: "Dog",
      breed: "German Shepherd",
      age: "4 years",
      size: "Large",
      location: "Phoenix, AZ",
      image: "/images/pets/max.jpg",
      description: "Intelligent and protective dog great with children",
      vaccinated: true,
      neutered: true,
    },
    {
      id: 6,
      name: "Mittens",
      type: "Cat",
      breed: "Siamese",
      age: "2 years",
      size: "Medium",
      location: "Philadelphia, PA",
      image: "/images/pets/mittens.jpg",
      description: "Vocal and social cat who loves attention",
      vaccinated: true,
      neutered: true,
    },
  ]

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || pet.type.toLowerCase() === selectedType.toLowerCase()
    const matchesAge =
      selectedAge === "all" ||
      (selectedAge === "young" && Number.parseInt(pet.age) <= 2) ||
      (selectedAge === "adult" && Number.parseInt(pet.age) > 2 && Number.parseInt(pet.age) <= 7) ||
      (selectedAge === "senior" && Number.parseInt(pet.age) > 7)

    return matchesSearch && matchesType && matchesAge
  })

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

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Pet</h1>
          <p className="text-xl text-blue-100">Browse through our available pets and find your new best friend</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or breed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pet Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger>
                  <SelectValue placeholder="Age Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="young">Young (0-2 years)</SelectItem>
                  <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                  <SelectItem value="senior">Senior (8+ years)</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredPets.length} of {pets.length} pets
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="relative">
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">Available</Badge>
                  <Button size="sm" variant="secondary" className="absolute top-2 left-2">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pet.name}
                    <span className="text-sm font-normal text-gray-500">{pet.age}</span>
                  </CardTitle>
                  <CardDescription>
                    {pet.breed} • {pet.size}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{pet.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pet.location}
                  </div>
                  <div className="flex gap-2 mb-4">
                    {pet.vaccinated && (
                      <Badge variant="secondary" className="text-xs">
                        Vaccinated
                      </Badge>
                    )}
                    {pet.neutered && (
                      <Badge variant="secondary" className="text-xs">
                        Neutered
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/pet/${pet.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No pets found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedType("all")
                  setSelectedAge("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
