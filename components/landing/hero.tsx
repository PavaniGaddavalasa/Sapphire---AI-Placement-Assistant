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
      {/* Soft Pastel Background Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[5%] h-[500px] w-[500px] rounded-full bg-sky-200/35 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-orange-200/30 blur-[100px] animate-pulse-glow animation-delay-1000" />
        <div className="absolute top-[50%] left-[40%] h-[300px] w-[300px] rounded-full bg-blue-100/25 blur-[100px] animate-pulse-glow animation-delay-600" />
      </div>

      {/* Subtle Floating Dots */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[15%] h-1.5 w-1.5 rounded-full bg-primary/30 animate-float" />
        <div className="absolute top-[30%] right-[20%] h-2 w-2 rounded-full bg-accent/25 animate-float animation-delay-200" />
        <div className="absolute bottom-[30%] left-[25%] h-1.5 w-1.5 rounded-full bg-primary/20 animate-float animation-delay-400" />
        <div className="absolute top-[60%] right-[15%] h-1 w-1 rounded-full bg-accent/20 animate-float animation-delay-600" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-left">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary animate-fade-in">
          <Sparkles className="h-4 w-4" />
          AI-Powered Placement Preparation
        </div>

        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl animate-slide-up text-balance leading-tight">
          Your AI Assistant for{" "}
          <span className="text-gradient">Campus Placements</span>
        </h1>

        <div className="mt-5 h-10 flex items-center animate-slide-up animation-delay-200">
          <span className="text-base text-muted-foreground sm:text-lg">
            {"Prepare for "}
            <span className="text-primary font-extrabold">{displayed}</span>
            <span className="animate-pulse text-primary">|</span>
          </span>
        </div>

        <p className="mt-5 text-base leading-relaxed text-muted-foreground max-w-xl animate-slide-up animation-delay-400 text-pretty font-medium">
          From resume analysis to mock interviews, placement prediction to
          career roadmaps. Everything you need to land your dream role.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row animate-slide-up animation-delay-600">
          <Button asChild size="lg" className="glow-primary rounded-xl px-8 text-base font-bold">
            <Link href="/resume">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl px-8 text-base border-border hover:bg-secondary font-bold">
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
              <div className="text-2xl font-black text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
