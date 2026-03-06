"use client"

import Link from "next/link"
import {
  FileText,
  MessageSquare,
  Mic,
  BarChart3,
  Route,
  ArrowRight,
} from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const features = [
  {
    icon: FileText,
    title: "AI Resume Intelligence",
    description:
      "NLP-powered resume parsing with semantic skill matching. Get ATS compatibility scores and a visual skill graph.",
    tech: ["NLP", "LLM", "Knowledge Graph"],
    href: "/resume",
    color: "primary" as const,
  },
  {
    icon: MessageSquare,
    title: "RAG Interview Prep",
    description:
      "Ask any interview question and get context-aware answers powered by RAG with vector database retrieval.",
    tech: ["RAG", "Vector DB", "LLM"],
    href: "/interview-prep",
    color: "accent" as const,
  },
  {
    icon: Mic,
    title: "AI Mock Interview",
    description:
      "Voice-based interview simulation with real-time AI evaluation of technical accuracy, communication, and confidence.",
    tech: ["Speech-to-Text", "LLM", "Sentiment"],
    href: "/mock-interview",
    color: "primary" as const,
  },
  {
    icon: BarChart3,
    title: "Placement Predictor",
    description:
      "ML model that predicts your placement probability across different roles based on your profile data.",
    tech: ["Random Forest", "XGBoost", "ML"],
    href: "/predictor",
    color: "accent" as const,
  },
  {
    icon: Route,
    title: "Career Path Analyzer",
    description:
      "Compares your current skills vs job requirements, detects gaps, and generates a personalized learning roadmap.",
    tech: ["Graph Mapping", "Recommendation", "AI"],
    href: "/career-path",
    color: "primary" as const,
  },
]

export function Features() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl text-balance">
            Five Powerful <span className="text-gradient">AI Features</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl text-pretty font-medium">
            A complete AI-powered toolkit designed to maximize your placement success.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            const isAccent = feature.color === "accent"
            return (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <Link
                  href={feature.href}
                  className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                      isAccent ? "bg-accent/15" : "bg-primary/15"
                    } transition-all group-hover:scale-110`}
                  >
                    <Icon
                      className={`h-6 w-6 ${isAccent ? "text-accent" : "text-primary"}`}
                    />
                  </div>

                  <h3 className="text-base font-extrabold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {feature.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-secondary px-2 py-1 text-xs font-bold text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
