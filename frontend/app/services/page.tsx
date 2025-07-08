import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Heart, MapPin, Clock, Star, Phone, Mail, Calendar } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Veterinary Care",
      description: "Comprehensive health care for your pets including checkups, vaccinations, and treatments",
      image: "/images/services/veterinary.jpg",
      price: "Starting at $75",
      duration: "30-60 minutes",
      rating: 4.9,
      features: ["Health Checkups", "Vaccinations", "Emergency Care", "Surgery", "Dental Care"],
    },
    {
      id: 2,
      title: "Pet Grooming",
      description: "Professional grooming services to keep your pets clean, healthy, and looking their best",
      image: "/images/services/grooming.jpg",
      price: "Starting at $45",
      duration: "1-2 hours",
      rating: 4.8,
      features: ["Bathing & Shampooing", "Hair Cutting", "Nail Trimming", "Ear Cleaning", "Teeth Brushing"],
    },
    {
      id: 3,
      title: "Pet Training",
      description: "Expert training programs to help your pet develop good behavior and social skills",
      image: "/images/services/training.jpg",
      price: "Starting at $60",
      duration: "45-90 minutes",
      rating: 4.7,
      features: ["Basic Obedience", "House Training", "Behavioral Issues", "Puppy Training", "Advanced Commands"],
    },
    {
      id: 4,
      title: "Pet Boarding",
      description: "Safe and comfortable boarding facilities for when you need to travel or be away",
      image: "/images/services/boarding.jpg",
      price: "Starting at $35/night",
      duration: "24 hours",
      rating: 4.6,
      features: ["24/7 Supervision", "Daily Exercise", "Feeding Service", "Medication Admin", "Playtime"],
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
          <h1 className="text-4xl font-bold mb-4">Professional Pet Care Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            From veterinary care to grooming and training, we provide comprehensive services to keep your pets healthy and happy
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={300}
                      height={200}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
                        </div>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration}
                        </div>
                        <div className="font-semibold text-green-600">{service.price}</div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Services Include:</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality care for your beloved pets
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experienced Professionals</h3>
              <p className="text-gray-600">Our team consists of certified veterinarians, groomers, and trainers with years of experience</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Book appointments that fit your schedule with our convenient online booking system</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">We stand behind our services with a satisfaction guarantee and follow-up care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book a Service?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to schedule an appointment or learn more about our services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="h-4 w-4 mr-2" />
              Call (555) 123-4567
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Mail className="h-4 w-4 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
