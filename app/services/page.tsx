import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Stethoscope, Scissors, GraduationCap, Home, Clock, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      icon: <Stethoscope className="h-12 w-12 text-blue-500" />,
      title: "Veterinary Care",
      description: "Comprehensive health services for your pets",
      features: ["Health checkups", "Vaccinations", "Emergency care", "Surgery", "Dental care"],
      price: "Starting at $75",
      image: "/images/services/veterinary.jpg",
    },
    {
      id: 2,
      icon: <Scissors className="h-12 w-12 text-purple-500" />,
      title: "Pet Grooming",
      description: "Professional grooming to keep your pet looking their best",
      features: ["Bathing & brushing", "Nail trimming", "Ear cleaning", "Styling", "Flea treatment"],
      price: "Starting at $45",
      image: "/images/services/grooming.jpg",
    },
    {
      id: 3,
      icon: <GraduationCap className="h-12 w-12 text-green-500" />,
      title: "Pet Training",
      description: "Expert training programs for pets of all ages",
      features: ["Basic obedience", "Behavioral training", "Puppy classes", "Advanced training", "Private sessions"],
      price: "Starting at $60",
      image: "/images/services/training.jpg",
    },
    {
      id: 4,
      icon: <Home className="h-12 w-12 text-orange-500" />,
      title: "Pet Boarding",
      description: "Safe and comfortable boarding when you're away",
      features: ["24/7 supervision", "Daily exercise", "Feeding service", "Medication admin", "Playtime"],
      price: "Starting at $35/night",
      image: "/images/services/boarding.jpg",
    },
  ]

  const veterinarians = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "General Practice",
      experience: "8 years",
      rating: 4.9,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Surgery & Emergency",
      experience: "12 years",
      rating: 4.8,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Exotic Animals",
      experience: "6 years",
      rating: 4.9,
      image: "/placeholder.svg?height=150&width=150",
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
            <Link href="/services" className="text-blue-600 font-medium">
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
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Comprehensive Pet Care Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            From routine checkups to emergency care, we provide everything your pet needs to stay healthy and happy
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600">Professional pet care services you can trust</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex">
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        {service.icon}
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {service.price}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full">Book Appointment</Button>
                    </CardContent>
                  </div>
                  <div className="w-32 flex-shrink-0">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Veterinarians */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Veterinarians</h2>
            <p className="text-gray-600">Meet our experienced and caring veterinary team</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {veterinarians.map((vet, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <Image
                      src={vet.image || "/placeholder.svg"}
                      alt={vet.name}
                      width={150}
                      height={150}
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                  </div>
                  <CardTitle>{vet.name}</CardTitle>
                  <CardDescription>{vet.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {vet.experience} experience
                    </div>
                    <div className="flex items-center justify-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {vet.rating} rating
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Book with {vet.name.split(" ")[1]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services</h2>
            <p className="text-gray-600">We&apos;re committed to providing the best care for your pets</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Licensed & Insured</h3>
              <p className="text-gray-600 text-sm">All our professionals are fully licensed and insured</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">24/7 Emergency</h3>
              <p className="text-gray-600 text-sm">Emergency services available around the clock</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">5-Star Rated</h3>
              <p className="text-gray-600 text-sm">Highly rated by thousands of satisfied customers</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Compassionate Care</h3>
              <p className="text-gray-600 text-sm">We treat every pet with love and compassion</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book an Appointment?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Give your pet the care they deserve. Book an appointment with our experienced team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
