import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Users, Shield, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredPets = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      location: "New York, NY",
      image: "/images/pets/buddy.jpg",
      description: "Friendly and energetic dog looking for a loving family",
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Persian",
      age: "1 year",
      location: "Los Angeles, CA",
      image: "/images/pets/luna.jpg",
      description: "Gentle and affectionate cat perfect for apartment living",
    },
    {
      id: 3,
      name: "Charlie",
      type: "Dog",
      breed: "Labrador Mix",
      age: "3 years",
      location: "Chicago, IL",
      image: "/images/pets/charlie.jpg",
      description: "Playful and loyal companion ready for adventures",
    },
  ]

  const services = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Pet Adoption",
      description: "Find your perfect companion from our network of rescue organizations",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Veterinary Care",
      description: "Connect with certified veterinarians for health checkups and treatments",
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Pet Training",
      description: "Professional training services to help your pet become well-behaved",
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: "Pet Grooming",
      description: "Keep your pets looking and feeling their best with our grooming services",
    },
  ]

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

      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Happy pets and families"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">Find Your Perfect Pet Companion</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Connect with loving pets from shelters and rescue organizations. Give them a forever home and receive unconditional love in return.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/adopt">Browse Pets</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Pet Care</h2>
            <p className="text-gray-600">Everything you need to keep your pets healthy and happy</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Pets</h2>
            <p className="text-gray-600">Meet some of our adorable pets looking for their forever homes</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">Available</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pet.name}
                    <span className="text-sm font-normal text-gray-500">{pet.age}</span>
                  </CardTitle>
                  <CardDescription>{pet.breed}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{pet.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pet.location}
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/pet/${pet.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/adopt">View All Pets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-blue-100">Pets Adopted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Partner Shelters</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Veterinarians</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Families</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold">PetCare</span>
              </div>
              <p className="text-gray-400">
                Connecting loving pets with caring families since 2020.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/adopt" className="hover:text-white">Adopt a Pet</Link></li>
                <li><Link href="/services" className="hover:text-white">Our Services</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Pet Adoption</li>
                <li>Veterinary Care</li>
                <li>Pet Training</li>
                <li>Pet Grooming</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>info@petcare.com</li>
                <li>(555) 123-4567</li>
                <li>123 Pet Street</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PetCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
