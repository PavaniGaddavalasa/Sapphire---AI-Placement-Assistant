"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  FileText,
  MessageSquare,
  Mic,
  BarChart3,
  Route,
  Home,
  Menu,
  X,
  LogIn,
  UserPlus,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/resume", label: "Resume ATS", icon: FileText },
  { href: "/interview-prep", label: "Interview Prep", icon: MessageSquare },
  { href: "/mock-interview", label: "Mock Interview", icon: Mic },
  { href: "/predictor", label: "Predictor", icon: BarChart3 },
  { href: "/career-path", label: "Career Path", icon: Route },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if user logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/auth/login")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-4"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <Image
            src="/images/logo.png"
            alt="Hire Hunt logo"
            width={56}
            height={56}
            className="rounded-xl transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-bold text-foreground tracking-tight">
            Hire<span className="text-primary font-bold"> Hunt</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-2 ml-auto lg:flex">

          {!user && (
            <>
              <Button variant="ghost" size="sm" asChild className="gap-2 font-semibold">
                <Link href="/auth/login">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>

              <Button size="sm" asChild className="gap-2 font-semibold shadow-sm">
                <Link href="/auth/sign-up">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}

          {user && (
            <>
              <Button variant="ghost" size="sm" asChild className="font-semibold">
                <Link href="/profile">
                  Profile
                </Link>
              </Button>

              <Button
                size="sm"
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold shadow-sm"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-secondary lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="glass animate-slide-up mt-2 mx-4 rounded-xl p-4 lg:hidden">
          <div className="flex flex-col gap-1">

            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}

            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">

              {!user && (
                <>
                  <Button variant="outline" asChild className="w-full gap-2 font-bold justify-start">
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>

                  <Button asChild className="w-full gap-2 font-bold justify-start">
                    <Link href="/auth/sign-up" onClick={() => setMobileOpen(false)}>
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}

              {user && (
                <>
                  <Button asChild className="w-full justify-start font-bold">
                    <Link href="/profile" onClick={() => setMobileOpen(false)}>
                      Profile
                    </Link>
                  </Button>

                  <Button
                    className="w-full bg-red-500 text-white font-bold"
                    onClick={() => {
                      logout()
                      setMobileOpen(false)
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </header>
  )
}