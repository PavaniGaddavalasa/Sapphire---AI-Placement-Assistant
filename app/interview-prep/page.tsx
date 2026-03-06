"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { RAGChat } from "@/components/interview/rag-chat"
import { Footer } from "@/components/footer"

export default function InterviewPrepPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        badge="RAG-Powered System"
        title="Interview Preparation with"
        titleHighlight="AI Retrieval"
        description="Ask any interview question. Our RAG system retrieves past experiences, company patterns, and coding questions, then generates context-aware answers."
      />
      <RAGChat />
      <Footer />
    </div>
  )
}
