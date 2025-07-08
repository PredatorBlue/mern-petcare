"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiClient } from "@/lib/api"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  userType: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: any) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (token) {
        apiClient.setToken(token)
        const response = await apiClient.getCurrentUser()
        const data = response.data as { user?: any }
        if (data.user) {
          setUser(data.user)
        } else {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token")
          }
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password })
      const data = response.data as { user?: any }
      if (data.user) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: response.error || "Login failed" }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await apiClient.register(userData)
      const data = response.data as { user?: any }
      if (data.user) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: response.error || "Registration failed" }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      }
    }
  }

  const logout = () => {
    apiClient.logout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
