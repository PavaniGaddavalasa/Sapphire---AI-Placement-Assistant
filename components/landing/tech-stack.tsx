"use client"

import { AnimatedSection } from "@/components/animated-section"
import { BrainCircuit, Database, Cpu, Zap, Network, Shield } from "lucide-react"

const technologies = [
  { icon: BrainCircuit, label: "LLM / NLP", desc: "GPT-based language understanding" },
  { icon: Database, label: "Vector DB", desc: "FAISS / Pinecone retrieval" },
  { icon: Cpu, label: "ML Models", desc: "XGBoost & Random Forest" },
  { icon: Zap, label: "Speech AI", desc: "Real-time voice processing" },
  { icon: Network, label: "Knowledge Graph", desc: "Skill relationship mapping" },
  { icon: Shield, label: "RAG Pipeline", desc: "Context-aware generation" },
]

export function TechStack() {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-orange-200/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl text-balance">
            Powered by <span className="text-gradient">Advanced AI</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl text-pretty font-medium">
            Built on cutting-edge machine learning and natural language processing technologies.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, i) => {
            const Icon = tech.icon
            return (
              <AnimatedSection key={tech.label} delay={i * 0.1}>
                <div className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-foreground">{tech.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tech.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
