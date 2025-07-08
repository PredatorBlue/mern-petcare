"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Heart, MapPin, Search, Filter, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { apiClient } from "@/lib/api"

interface Pet {
  _id: string
  name: string
  type: string
  breed: string
  age: { years: number; months: number }
  size: string
  gender: string
  color: string
  location: { city: string; state: string }
  images: Array<{ url: string; isPrimary: boolean }>
  description: string
  medicalInfo: {
    vaccinated: boolean
    neutered: boolean
    microchipped: boolean
  }
  adoptionFee: number
  shelter: {
    name: string
    contact: { phone: string; email: string }
  }
}

export default function AdoptPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  })

  useEffect(() => {
    fetchPets()
  }, [searchTerm, selectedType, selectedAge])

  const fetchPets = async (page = 1) => {
    setLoading(true)
    setError("")

    try {
      const params: any = { page, limit: 12 }

      if (searchTerm) params.search = searchTerm
      if (selectedType !== "all") params.type = selectedType
      if (selectedAge !== "all") params.age = selectedAge

      const response = await apiClient.getPets(params)
      const pets = (response.data && (response.data as any).pets) || []
      const pagination = (response.data && (response.data as any).pagination) || {}
      setPets(pets)
      setPagination(pagination)
      if (!response.data) {
        setError(response.error || "Failed to fetch pets")
      }
    } catch (error) {
      setError("Failed to fetch pets")
      console.error("Fetch pets error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSavePet = async (petId: string) => {
    try {
      const response = await apiClient.savePet(petId)
      if (response.data) {
        console.log("Pet saved/unsaved:", (response.data as any).message)
      }
    } catch (error) {
      console.error("Save pet error:", error)
    }
  }

  const formatAge = (age: { years: number; months: number }) => {
    if (age.years === 0) {
      return `${age.months} month${age.months !== 1 ? "s" : ""}`
    } else if (age.months === 0) {
      return `${age.years} year${age.years !== 1 ? "s" : ""}`
    } else {
      return `${age.years}y ${age.months}m`
    }
  }

  const petImages: Record<string, string> = {
    buddy: "/images/pets/buddy.jpg",
    charlie: "/images/pets/charlie.jpg",
    luna: "/images/pets/luna.jpg",
    max: "/images/pets/max.jpg",
    mittens: "/images/pets/mittens.jpg",
    whiskers: "/images/pets/whiskers.jpg",
  }

  const getPrimaryImage = (images: Array<{ url: string; isPrimary: boolean }>, name?: string) => {
    // Try to match by pet name if available
    if (name) {
      const key = name.toLowerCase()
      if (petImages[key]) return petImages[key]
    }
    const primary = images.find((img) => img.isPrimary)
    return primary?.url || images[0]?.url || "/placeholder.svg?height=300&width=400"
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Pet</h1>
          <p className="text-xl text-blue-100">Browse through our available pets and find your new best friend</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or breed..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
                  <SelectItem value="bird">Birds</SelectItem>
                  <SelectItem value="rabbit">Rabbits</SelectItem>
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

      <section className="pb-16">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">{error}</div>
          )}

          <div className="mb-6">
            <p className="text-gray-600">
              {loading ? "Loading..." : `Showing ${pets.length} of ${pagination.total} pets`}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pets.map((pet) => (
                  <Card key={pet._id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    <div className="relative">
                      <Image
                        src={getPrimaryImage(pet.images, pet.name) || "/placeholder.svg"}
                        alt={pet.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500">Available</Badge>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 left-2"
                        onClick={() => handleSavePet(pet._id)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {pet.name}
                        <span className="text-sm font-normal text-gray-500">{formatAge(pet.age)}</span>
                      </CardTitle>
                      <CardDescription>
                        {pet.breed} • {pet.size}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-2">{pet.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {pet.location.city}, {pet.location.state}
                      </div>
                      <div className="flex gap-2 mb-4">
                        {pet.medicalInfo.vaccinated && (
                          <Badge variant="secondary" className="text-xs">
                            Vaccinated
                          </Badge>
                        )}
                        {pet.medicalInfo.neutered && (
                          <Badge variant="secondary" className="text-xs">
                            Neutered
                          </Badge>
                        )}
                        {pet.medicalInfo.microchipped && (
                          <Badge variant="secondary" className="text-xs">
                            Microchipped
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1" asChild>
                          <Link href={`/pet/${pet._id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSavePet(pet._id)}>
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {pets.length === 0 && !loading && (
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

              {pagination.pages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => fetchPets(pagination.current - 1)}
                    disabled={!pagination.hasPrev}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {pagination.current} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => fetchPets(pagination.current + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
