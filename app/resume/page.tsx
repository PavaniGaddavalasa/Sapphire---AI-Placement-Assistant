"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { ATSAnalyzer } from "@/components/resume/ats-analyzer"
import { Footer } from "@/components/footer"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        badge="AI Resume Intelligence"
        title="Analyze Your Resume with"
        titleHighlight="AI Precision"
        description="Our NLP engine parses your resume, extracts skills, builds a skill graph, and calculates ATS compatibility with semantic skill matching."
      />
      <ATSAnalyzer />
      <Footer />
    </div>
  )
}
