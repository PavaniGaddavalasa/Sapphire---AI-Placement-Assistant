"use client"

import { useState } from "react"
import { Route, Loader2, CheckCircle2, XCircle, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"

const targetRoles = [
  "Backend Engineer",
  "Frontend Engineer",
  "Full Stack Developer",
  "Data Scientist",
  "ML Engineer",
  "DevOps Engineer",
  "Mobile Developer",
  "Cloud Architect",
]

const allSkills = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java",
  "SQL", "MongoDB", "Docker", "Kubernetes", "AWS", "GCP",
  "Git", "REST API", "GraphQL", "System Design", "Redis", "Kafka",
  "TensorFlow", "PyTorch", "Pandas", "NumPy", "Flutter", "Swift",
  "Go", "Rust", "C++", "Linux", "CI/CD", "Terraform",
]

interface AnalysisResult {
  targetRole: string
  matchPercentage: number
  currentSkills: string[]
  requiredSkills: string[]
  missingSkills: string[]
  roadmap: { week: string; topic: string; description: string }[]
}

const roadmapTemplates: Record<string, { topic: string; description: string }[]> = {
  "Backend Engineer": [
    { topic: "Advanced Java / Node.js", description: "Deep dive into backend language fundamentals, concurrency, and design patterns" },
    { topic: "Spring Boot / Express.js", description: "Build production-grade APIs with proper error handling and validation" },
    { topic: "Database Design", description: "SQL optimization, indexing strategies, and NoSQL patterns" },
    { topic: "System Design Fundamentals", description: "Load balancers, caching, message queues, and microservices" },
    { topic: "Docker & Containerization", description: "Containerize applications and understand orchestration basics" },
    { topic: "Redis & Caching", description: "Implement caching layers and understand cache invalidation strategies" },
    { topic: "CI/CD & Deployment", description: "Set up automated pipelines, testing, and deployment workflows" },
    { topic: "Project & Mock Interviews", description: "Build a complete microservice project and practice system design interviews" },
  ],
  "Frontend Engineer": [
    { topic: "Advanced React & TypeScript", description: "Master hooks, patterns, and TypeScript generics for type-safe components" },
    { topic: "State Management", description: "Redux Toolkit, Zustand, and server state management with React Query" },
    { topic: "Performance Optimization", description: "Code splitting, lazy loading, memoization, and Core Web Vitals" },
    { topic: "Testing Strategies", description: "Unit testing with Jest, integration testing, and E2E with Playwright" },
    { topic: "Design Systems", description: "Build accessible, reusable component libraries with proper theming" },
    { topic: "Next.js & SSR", description: "Server-side rendering, static generation, and app router patterns" },
    { topic: "GraphQL & API Layer", description: "GraphQL client setup, caching, and real-time subscriptions" },
    { topic: "Portfolio Project", description: "Build and deploy a production-quality web application" },
  ],
  default: [
    { topic: "Core Language Mastery", description: "Deep dive into primary programming language for target role" },
    { topic: "Framework Proficiency", description: "Master the key framework used in the target domain" },
    { topic: "Data & Storage", description: "Learn databases and data management relevant to the role" },
    { topic: "Architecture Patterns", description: "Study design patterns and architecture for the domain" },
    { topic: "Tools & DevOps", description: "Learn essential tools, CI/CD, and deployment for the role" },
    { topic: "Testing & Quality", description: "Implement testing strategies and code quality practices" },
    { topic: "Advanced Topics", description: "Explore specialized topics unique to the target role" },
    { topic: "Project & Interview Prep", description: "Build a capstone project and prepare for role-specific interviews" },
  ],
}

export function CareerAnalyzer() {
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleAnalyze = async () => {
    if (!selectedRole || selectedSkills.length === 0) return
    setAnalyzing(true)
    setResult(null)

    await new Promise((r) => setTimeout(r, 2000))

    const roleSkillMap: Record<string, string[]> = {
      "Backend Engineer": ["Java", "Node.js", "SQL", "Docker", "Redis", "System Design", "REST API", "CI/CD", "Linux", "Kafka"],
      "Frontend Engineer": ["JavaScript", "TypeScript", "React", "GraphQL", "REST API", "Git", "Node.js", "CSS", "Testing"],
      "Full Stack Developer": ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Docker", "REST API", "Git", "MongoDB"],
      "Data Scientist": ["Python", "Pandas", "NumPy", "SQL", "TensorFlow", "PyTorch", "Git", "Docker"],
      "ML Engineer": ["Python", "TensorFlow", "PyTorch", "Docker", "AWS", "Kubernetes", "SQL", "Git", "NumPy"],
      "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux", "Git", "Python", "Kafka"],
      "Mobile Developer": ["Flutter", "Swift", "JavaScript", "React", "Git", "REST API", "SQL", "Firebase"],
      "Cloud Architect": ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "System Design", "Linux", "CI/CD", "Python"],
    }

    const required = roleSkillMap[selectedRole] || roleSkillMap["Backend Engineer"]
    const missing = required.filter((s) => !selectedSkills.includes(s))
    const matched = required.filter((s) => selectedSkills.includes(s))
    const matchPct = Math.round((matched.length / required.length) * 100)

    const roadmapBase = roadmapTemplates[selectedRole] || roadmapTemplates.default
    const roadmap = roadmapBase.map((item, i) => ({
      week: `Week ${(i * 1) + 1}-${(i * 1) + 1}`,
      ...item,
    }))

    setResult({
      targetRole: selectedRole,
      matchPercentage: matchPct,
      currentSkills: matched,
      requiredSkills: required,
      missingSkills: missing,
      roadmap,
    })
    setAnalyzing(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      {/* Step 1: Select Role */}
      <AnimatedSection>
        <Card className="bg-card border-border p-6 mb-8">
          <h3 className="text-lg font-extrabold text-foreground mb-4">Target Role</h3>
          <div className="flex flex-wrap gap-2">
            {targetRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  selectedRole === role
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </Card>
      </AnimatedSection>

      {/* Step 2: Select Current Skills */}
      <AnimatedSection delay={0.1}>
        <Card className="bg-card border-border p-6 mb-8">
          <h3 className="text-lg font-extrabold text-foreground mb-2">Your Current Skills</h3>
          <p className="text-sm text-muted-foreground mb-4">Select all skills you currently have.</p>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  selectedSkills.includes(skill)
                    ? "bg-accent/20 text-accent border border-accent/40"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={analyzing || !selectedRole || selectedSkills.length === 0}
            className="mt-6 glow-primary rounded-xl"
            size="lg"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Skill Gap...
              </>
            ) : (
              <>
                <Route className="mr-2 h-4 w-4" />
                Analyze Career Path
              </>
            )}
          </Button>
        </Card>
      </AnimatedSection>

      {/* Results */}
      {analyzing && (
        <Card className="bg-card border-border p-12 text-center">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
          <p className="mt-6 text-muted-foreground">Analyzing skill gap with graph-based mapping...</p>
        </Card>
      )}

      {result && !analyzing && (
        <div className="flex flex-col gap-6">
          {/* Match Overview */}
          <AnimatedSection>
            <Card className="bg-card border-border p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
                <div className="relative flex h-28 w-28 items-center justify-center shrink-0">
                  <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" className="text-secondary" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="54" fill="none" stroke="currentColor"
                      className={result.matchPercentage >= 70 ? "text-accent" : result.matchPercentage >= 40 ? "text-chart-3" : "text-destructive"}
                      strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(result.matchPercentage / 100) * 339.3} 339.3`}
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-foreground">{result.matchPercentage}%</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground">
                    Skill Match for {result.targetRole}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You have {result.currentSkills.length} of {result.requiredSkills.length} required skills.
                    {result.missingSkills.length > 0 && ` Missing ${result.missingSkills.length} key skills.`}
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          {/* Skill Comparison */}
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <Card className="bg-card border-border p-6 h-full">
                <h3 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  Skills You Have
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.currentSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-accent/15 text-accent border-accent/30">
                      {skill}
                    </Badge>
                  ))}
                  {result.currentSkills.length === 0 && (
                    <p className="text-sm text-muted-foreground">None of the required skills matched.</p>
                  )}
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card className="bg-card border-border p-6 h-full">
                <h3 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-destructive/15 text-destructive border-destructive/30">
                      {skill}
                    </Badge>
                  ))}
                  {result.missingSkills.length === 0 && (
                    <p className="text-sm text-accent">You have all the required skills!</p>
                  )}
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Learning Roadmap */}
          <AnimatedSection delay={0.3}>
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-extrabold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Personalized Learning Roadmap
              </h3>

              <div className="relative">
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

                <div className="flex flex-col gap-6">
                  {result.roadmap.map((step, i) => (
                    <div key={i} className="relative flex gap-4 pl-2">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card border-2 border-primary text-xs font-bold text-primary">
                        {i + 1}
                      </div>
                      <div className="flex-1 rounded-xl border border-border bg-secondary/50 p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                            {step.week}
                          </span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-extrabold text-foreground">{step.topic}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      )}
    </div>
  )
}
