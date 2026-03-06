"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const roles = ["Software Engineer", "Data Analyst", "ML Engineer", "Backend Developer", "Full Stack Developer"]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, displayed.length + 1))
      }, 80)
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1))
      }, 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      
      {/* Clean Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-left">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm animate-fade-in">
          <Sparkles className="h-4 w-4 text-primary" />
          AI-Powered Placement Preparation
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl animate-slide-up text-balance leading-tight">
          Your AI Assistant for{" "}
          <span className="text-gradient">Campus Placements</span>
        </h1>

        <div className="mt-5 h-10 flex items-center animate-slide-up animation-delay-200">
          <span className="text-base text-muted-foreground sm:text-lg">
            {"Prepare for "}
            <span className="text-foreground font-semibold">{displayed}</span>
            <span className="animate-pulse text-primary ms-1">|</span>
          </span>
        </div>

        <p className="mt-5 text-base leading-relaxed text-muted-foreground max-w-xl animate-slide-up animation-delay-400 text-pretty font-medium">
          From resume analysis to mock interviews, placement prediction to
          career roadmaps. Everything you need to land your dream role.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row animate-slide-up animation-delay-600">
          <Button asChild size="lg" className="rounded-md px-8 text-base font-semibold shadow-md hover:shadow-lg transition-all">
            <Link href="/resume">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-md px-8 text-base border-border hover:bg-secondary font-semibold transition-all shadow-sm">
            <Link href="/predictor">
              Check Placement Probability
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4 animate-slide-up animation-delay-800">
          {[
            { value: "5+", label: "AI Features" },
            { value: "95%", label: "ATS Accuracy" },
            { value: "10K+", label: "Questions DB" },
            { value: "24/7", label: "AI Available" },
          ].map((stat) => (
            <div key={stat.label} className="text-left">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
