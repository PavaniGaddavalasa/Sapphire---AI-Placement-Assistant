"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, User } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">

      {/* Top Navbar */}
      <div className="flex justify-end p-6">
        <Button variant="outline" asChild className="flex items-center gap-2 font-bold">
          <Link href="/">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>

      {/* Profile Card Center */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-lg p-8 text-center">

          <div className="flex justify-center mb-4">
            <User className="h-16 w-16 text-primary" />
          </div>

          <h1 className="text-2xl font-bold mb-4">My Profile</h1>

          {user ? (
            <div className="space-y-3 text-left">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No user data found.</p>
          )}

        </div>
      </div>

    </div>
  )
}