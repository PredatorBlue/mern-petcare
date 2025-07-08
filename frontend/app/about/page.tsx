import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Heart, Users, Award, Shield, MapPin, Mail, Phone } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Veterinarian",
      image: "/placeholder.svg?height=300&width=300",
      description: "15+ years of experience in veterinary medicine with a specialization in small animal care.",
    },
    {
      name: "Mike Chen",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      description: "Former shelter manager with a passion for connecting pets with loving families.",
    },
    {
      name: "Emily Rodriguez",
      role: "Pet Training Specialist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Certified animal behaviorist helping pets and families build strong relationships.",
    },
    {
      name: "David Kim",
      role: "Technology Director",
      image: "/placeholder.svg?height=300&width=300",
      description: "Building innovative solutions to make pet adoption and care more accessible.",
    },
  ]

  const stats = [
    { number: "2,500+", label: "Pets Adopted", icon: Heart },
    { number: "150+", label: "Partner Shelters", icon: Shield },
    { number: "50+", label: "Veterinarians", icon: Users },
    { number: "10,000+", label: "Happy Families", icon: Award },
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
            <Link href="/about" className="text-blue-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
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
          <h1 className="text-4xl font-bold mb-4">About PetCare</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're dedicated to connecting loving pets with caring families and providing comprehensive pet care services
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At PetCare, we believe every pet deserves a loving home and every family deserves the joy of pet companionship. 
              Our mission is to bridge the gap between homeless pets and caring families while providing comprehensive support 
              throughout the pet ownership journey.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compassionate Care</h3>
                <p className="text-gray-600">Every pet receives the love and attention they deserve</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
                <p className="text-gray-600">Building stronger communities through pet adoption</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Excellence</h3>
                <p className="text-gray-600">Highest standards in pet care and adoption services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600">Making a difference in the lives of pets and families</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <IconComponent className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600">Passionate professionals dedicated to pet welfare</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                PetCare was founded in 2018 with a simple yet powerful vision: to create a world where no pet goes without a loving home. 
                What started as a small local initiative has grown into a comprehensive platform serving communities nationwide.
              </p>
              <p className="mb-6">
                Our founders, Dr. Sarah Johnson and Mike Chen, combined their expertise in veterinary medicine and animal welfare 
                to create a solution that addresses the challenges faced by both pet seekers and animal shelters. They recognized 
                that successful pet adoption goes beyond just matching pets with families—it requires ongoing support, education, 
                and access to quality care.
              </p>
              <p className="mb-6">
                Today, PetCare partners with over 150 shelters and rescue organizations, connecting thousands of pets with loving 
                families each year. We've expanded our services to include comprehensive pet care, from veterinary services to 
                training and grooming, ensuring that every adopted pet receives the best possible care throughout their life.
              </p>
              <p>
                As we continue to grow, our commitment remains unchanged: to be the bridge between pets in need and the families 
                who will love them, while providing the resources and support needed for successful, lifelong relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking to adopt a pet, volunteer, or partner with us, there are many ways to get involved
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/adopt">Adopt a Pet</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
