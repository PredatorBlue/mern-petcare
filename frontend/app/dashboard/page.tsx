"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Heart, MapPin, Calendar, User, Bell, Settings, LogOut, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const userStats = {
    savedPets: 12,
    applications: 3,
    appointments: 2,
    notifications: 5,
  }

  const savedPets = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      location: "New York, NY",
      image: "/images/pets/buddy.jpg",
      dateSaved: "2024-01-15",
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Persian",
      age: "1 year",
      location: "Los Angeles, CA",
      image: "/images/pets/luna.jpg",
      dateSaved: "2024-01-10",
    },
  ]

  const applications = [
    {
      id: 1,
      petName: "Buddy",
      shelter: "Happy Paws Rescue",
      status: "Under Review",
      submittedDate: "2024-01-20",
      statusColor: "bg-yellow-500",
    },
    {
      id: 2,
      petName: "Charlie",
      shelter: "City Animal Shelter",
      status: "Approved",
      submittedDate: "2024-01-18",
      statusColor: "bg-green-500",
    },
    {
      id: 3,
      petName: "Max",
      shelter: "Rescue Friends",
      status: "Pending Documents",
      submittedDate: "2024-01-22",
      statusColor: "bg-orange-500",
    },
  ]

  const appointments = [
    {
      id: 1,
      type: "Veterinary Checkup",
      petName: "My Dog",
      date: "2024-02-15",
      time: "10:00 AM",
      provider: "Dr. Sarah Johnson",
      status: "Confirmed",
    },
    {
      id: 2,
      type: "Grooming",
      petName: "My Cat",
      date: "2024-02-18",
      time: "2:00 PM",
      provider: "Pet Spa Plus",
      status: "Pending",
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
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">{userStats.notifications}</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your pets.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Pets</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.savedPets}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.applications}</p>
                </div>
                <User className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.appointments}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Notifications</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.notifications}</p>
                </div>
                <Bell className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved">Saved Pets</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Your latest adoption applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{app.petName}</p>
                          <p className="text-sm text-gray-600">{app.shelter}</p>
                        </div>
                        <Badge className={`${app.statusColor} text-white`}>{app.status}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Applications
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <Badge variant="outline">{appointment.status}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Saved Pets</h2>
              <Button asChild>
                <Link href="/adopt">
                  <Plus className="h-4 w-4 mr-2" />
                  Find More Pets
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Button size="sm" variant="secondary" className="absolute top-2 right-2">
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {pet.name}
                      <span className="text-sm font-normal text-gray-500">{pet.age}</span>
                    </CardTitle>
                    <CardDescription>{pet.breed}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {pet.location}
                    </div>
                    <div className="text-xs text-gray-400 mb-4">
                      Saved on {new Date(pet.dateSaved).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" asChild>
                        <Link href={`/pet/${pet.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Adoption Applications</h2>
              <Button asChild>
                <Link href="/adopt">
                  <Plus className="h-4 w-4 mr-2" />
                  Apply for More Pets
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{app.petName}</h3>
                        <p className="text-gray-600">{app.shelter}</p>
                        <p className="text-sm text-gray-500">
                          Submitted on {new Date(app.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={`${app.statusColor} text-white`}>{app.status}</Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Appointments</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Book New Appointment
              </Button>
            </div>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{appointment.type}</h3>
                        <p className="text-gray-600">Pet: {appointment.petName}</p>
                        <p className="text-gray-600">Provider: {appointment.provider}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
