"use client"

import { useState } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"

interface AnalysisResult {
  atsScore: number
  skills: { name: string; level: number; category: string }[]
  suggestions: string[]
  matchedKeywords: string[]
  missingKeywords: string[]
}

const sampleResult: AnalysisResult = {
  atsScore: 0,
  skills: [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Language" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Python", level: 75, category: "Language" },
    { name: "SQL", level: 70, category: "Database" },
    { name: "Docker", level: 60, category: "DevOps" },
    { name: "AWS", level: 55, category: "Cloud" },
    { name: "Git", level: 85, category: "Tools" },
  ],
  suggestions: [
    "Add quantifiable achievements (e.g., 'Improved API response time by 40%')",
    "Include relevant certifications for target role",
    "Add system design experience for senior positions",
    "Include contributions to open source projects",
    "Add keywords: microservices, CI/CD, agile methodology",
  ],
  matchedKeywords: [
    "React", "TypeScript", "Node.js", "REST API", "Git", "Agile", "Python", "SQL",
  ],
  missingKeywords: [
    "System Design", "Microservices", "CI/CD", "Kubernetes", "Redis",
  ],
}

export function ATSAnalyzer() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [animatedScore, setAnimatedScore] = useState(0)

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return
    setAnalyzing(true)
    setResult(null)
    setAnimatedScore(0)

    // Simulate AI analysis
    await new Promise((r) => setTimeout(r, 2000))

    const score = 72 + Math.floor(Math.random() * 20)
    const res = { ...sampleResult, atsScore: score }
    setResult(res)
    setAnalyzing(false)

    // Animate score
    let current = 0
    const interval = setInterval(() => {
      current += 1
      setAnimatedScore(current)
      if (current >= score) clearInterval(interval)
    }, 20)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Section */}
        <AnimatedSection>
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-extrabold text-foreground mb-4">
              Paste Your Resume
            </h3>
            <Textarea
              placeholder="Paste your resume content here..."
              className="min-h-[200px] bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />

            <h3 className="text-lg font-extrabold text-foreground mt-6 mb-4">
              Job Description (Optional)
            </h3>
            <Textarea
              placeholder="Paste job description for targeted analysis..."
              className="min-h-[120px] bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <Button
              onClick={handleAnalyze}
              disabled={analyzing || !resumeText.trim()}
              className="mt-6 w-full glow-primary rounded-xl"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          </Card>
        </AnimatedSection>

        {/* Results Section */}
        <AnimatedSection delay={0.2}>
          {!result && !analyzing ? (
            <Card className="bg-card border-border p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-extrabold text-foreground">
                Ready to Analyze
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Paste your resume to get an AI-powered ATS score, skill analysis, and personalized suggestions.
              </p>
            </Card>
          ) : analyzing ? (
            <Card className="bg-card border-border p-6 flex flex-col items-center justify-center min-h-[400px]">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">AI is analyzing your resume...</p>
            </Card>
          ) : result ? (
            <div className="flex flex-col gap-6">
              {/* ATS Score */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-extrabold text-foreground mb-4">ATS Score</h3>
                <div className="flex items-center gap-6">
                  <div className="relative flex h-32 w-32 items-center justify-center">
                    <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" className="text-secondary" strokeWidth="8" />
                      <circle
                        cx="60" cy="60" r="54" fill="none"
                        stroke="currentColor"
                        className="text-primary transition-all duration-1000"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(animatedScore / 100) * 339.3} 339.3`}
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-3xl font-bold text-foreground">{animatedScore}</span>
                      <span className="text-sm text-muted-foreground block">/ 100</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {result.atsScore >= 80
                        ? "Excellent! Your resume is well-optimized for ATS systems."
                        : result.atsScore >= 60
                        ? "Good foundation, but there is room for improvement."
                        : "Your resume needs significant optimization for ATS."}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Skills */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-extrabold text-foreground mb-4">Skill Analysis</h3>
                <div className="flex flex-col gap-3">
                  {result.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3">
                      <span className="w-24 text-sm text-muted-foreground shrink-0">{skill.name}</span>
                      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : null}
        </AnimatedSection>
      </div>

      {/* Keywords and Suggestions */}
      {result && (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatedSection delay={0.1}>
            <Card className="bg-card border-border p-6 h-full">
              <h3 className="text-lg font-extrabold text-foreground mb-4">Matched Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.matchedKeywords.map((kw) => (
                  <span key={kw} className="rounded-md bg-accent/15 text-accent px-3 py-1 text-sm font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card className="bg-card border-border p-6 h-full">
              <h3 className="text-lg font-extrabold text-foreground mb-4">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw) => (
                  <span key={kw} className="rounded-md bg-destructive/15 text-destructive px-3 py-1 text-sm font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <Card className="bg-card border-border p-6 h-full">
              <h3 className="text-lg font-extrabold text-foreground mb-4">Suggestions</h3>
              <ul className="flex flex-col gap-3">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-primary shrink-0 mt-0.5">{">"}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedSection>
        </div>
      )}
    </div>
  )
}
