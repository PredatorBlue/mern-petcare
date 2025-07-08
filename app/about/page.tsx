import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder-user.jpg",
      description: "Passionate about connecting pets with loving families",
    },
    {
      name: "Mike Chen",
      role: "Head of Operations",
      image: "/placeholder-user.jpg",
      description: "Ensuring smooth operations and excellent service delivery",
    },
    {
      name: "Emily Rodriguez",
      role: "Veterinary Director",
      image: "/placeholder-user.jpg",
      description: "Leading our veterinary care and health initiatives",
    },
  ]

  const stats = [
    { number: "2,500+", label: "Pets Adopted" },
    { number: "50+", label: "Partner Shelters" },
    { number: "15,000+", label: "Happy Families" },
    { number: "98%", label: "Success Rate" },
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
            <Link href="/about" className="text-gray-900 font-medium">
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
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About PetCare</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We&apos;re dedicated to connecting loving pets with caring families, providing comprehensive pet care services, and building a community of responsible pet owners.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At PetCare, we believe every pet deserves a loving home. Our mission is to facilitate meaningful connections between pets and families while providing the highest quality care services.
              </p>
              <p className="text-gray-600 mb-6">
                We work closely with shelters and rescue organizations to ensure that every pet finds their perfect match. Our comprehensive platform makes it easy for families to adopt, care for, and maintain the health of their beloved pets.
              </p>
              <Button size="lg" asChild>
                <Link href="/adopt">Start Your Adoption Journey</Link>
              </Button>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="/images/hero-bg.jpg"
                alt="Happy pets and families"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600">Meet the passionate people behind PetCare</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-gray-600">We treat every pet and family with care, understanding, and respect.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Trust</h3>
                <p className="text-gray-600">Building lasting relationships through transparency and reliability.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">Striving for the highest quality in all our services and partnerships.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community and help us connect more pets with loving families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/adopt">Adopt a Pet</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 