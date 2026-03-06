"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { CareerAnalyzer } from "@/components/career/career-analyzer"
import { Footer } from "@/components/footer"

export default function CareerPathPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        badge="AI Career Analyzer"
        title="Discover Your"
        titleHighlight="Career Path"
        description="Compare your current skills vs job requirements. Our AI detects missing skills and generates a personalized preparation roadmap with weekly milestones."
      />
      <CareerAnalyzer />
      <Footer />
    </div>
  )
}
