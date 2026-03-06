"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { MockInterview } from "@/components/interview/mock-interview"
import { Footer } from "@/components/footer"

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        badge="AI Mock Interview"
        title="Practice Interviews with"
        titleHighlight="Real-Time AI"
        description="Voice-based interview simulation with dynamic AI questions. Get evaluated on technical accuracy, communication skills, and confidence."
      />
      <MockInterview />
      <Footer />
    </div>
  )
}
