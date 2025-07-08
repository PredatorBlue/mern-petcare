const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface ApiResponse<T = any> {
  data?: T
  message?: string
  error?: string
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  removeToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return { data }
    } catch (error) {
      console.error("API request failed:", error)
      return {
        error: error instanceof Error ? error.message : "An unknown error occurred",
      }
    }
  }

  // Auth methods
  async register(userData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    userType: string
  }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.data && typeof response.data === "object" && "token" in response.data) {
      this.setToken((response.data as { token: string }).token)
    }

    return response
  }

  async logout() {
    this.removeToken()
    return { data: { message: "Logged out successfully" } }
  }

  async getCurrentUser() {
    return this.request("/auth/me")
  }

  // Pet methods
  async getPets(params?: {
    page?: number
    limit?: number
    type?: string
    breed?: string
    size?: string
    age?: string
    gender?: string
    location?: string
    search?: string
  }) {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== "") {
                acc[key] = value.toString()
              }
              return acc
            },
            {} as Record<string, string>,
          ),
        ).toString()
      : ""

    return this.request(`/pets${queryString}`)
  }

  async getPet(id: string) {
    return this.request(`/pets/${id}`)
  }

  async savePet(petId: string) {
    return this.request(`/pets/${petId}/save`, {
      method: "POST",
    })
  }

  // Application methods
  async submitApplication(applicationData: {
    petId: string
    applicationData: any
  }) {
    return this.request("/applications", {
      method: "POST",
      body: JSON.stringify(applicationData),
    })
  }

  async getApplications(params?: { status?: string; page?: number; limit?: number }) {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== "") {
                acc[key] = value.toString()
              }
              return acc
            },
            {} as Record<string, string>,
          ),
        ).toString()
      : ""

    return this.request(`/applications${queryString}`)
  }

  // Service methods
  async getServices(params?: {
    serviceType?: string
    city?: string
    state?: string
    search?: string
  }) {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== "") {
                acc[key] = value.toString()
              }
              return acc
            },
            {} as Record<string, string>,
          ),
        ).toString()
      : ""

    return this.request(`/services${queryString}`)
  }

  async bookAppointment(appointmentData: any) {
    return this.request("/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    })
  }

  async getAppointments() {
    return this.request("/appointments")
  }

  // User methods
  async getSavedPets() {
    return this.request("/users/saved-pets")
  }

  async getDashboardStats() {
    return this.request("/users/dashboard-stats")
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
