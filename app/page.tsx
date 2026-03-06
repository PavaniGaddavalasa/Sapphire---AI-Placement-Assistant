"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { TechStack } from "@/components/landing/tech-stack"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        <TechStack />
      </main>
      <Footer />
    </div>
  )
}
