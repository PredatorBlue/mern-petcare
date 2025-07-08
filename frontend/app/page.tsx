import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">PetCare</span>
          </div>
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
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Find Your Perfect Pet Companion</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with loving pets in need of homes and access comprehensive pet care services all in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/adopt">Browse Pets</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">Our Services</Link>
            </Button>
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
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/adopt">View All Pets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600">Comprehensive pet care solutions for every need</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Pets Adopted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Partner Shelters</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Veterinarians</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Families</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your New Best Friend?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have found their perfect pet companion through our platform
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/adopt">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">PetCare</span>
              </div>
              <p className="text-gray-400">
                Connecting pets with loving families and providing comprehensive pet care services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/adopt" className="hover:text-white">
                    Adopt a Pet
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/veterinary" className="hover:text-white">
                    Veterinary Care
                  </Link>
                </li>
                <li>
                  <Link href="/grooming" className="hover:text-white">
                    Pet Grooming
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:text-white">
                    Pet Training
                  </Link>
                </li>
                <li>
                  <Link href="/boarding" className="hover:text-white">
                    Pet Boarding
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>123 Pet Street</p>
                <p>New York, NY 10001</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@petcare.com</p>
              </div>
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
