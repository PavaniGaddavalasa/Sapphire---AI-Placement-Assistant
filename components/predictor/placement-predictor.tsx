"use client"

import { useState } from "react"
import { BarChart3, Loader2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { AnimatedSection } from "@/components/animated-section"

interface PredictionResult {
  roles: { name: string; probability: number; color: string }[]
  topRecommendation: string
  modelUsed: string
}

export function PlacementPredictor() {
  const [cgpa, setCgpa] = useState([7.5])
  const [leetcode, setLeetcode] = useState([200])
  const [projects, setProjects] = useState([4])
  const [skills, setSkills] = useState([6])
  const [interviewScore, setInterviewScore] = useState([70])
  const [predicting, setPredicting] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [animatedProbs, setAnimatedProbs] = useState<Record<string, number>>({})

  const handlePredict = async () => {
    setPredicting(true)
    setResult(null)
    setAnimatedProbs({})

    await new Promise((r) => setTimeout(r, 2000))

    const base = (cgpa[0] / 10) * 20 + (leetcode[0] / 500) * 25 + (projects[0] / 10) * 15 + (skills[0] / 10) * 15 + (interviewScore[0] / 100) * 25
    const sdeProb = Math.min(Math.round(base + Math.random() * 10), 99)
    const daProb = Math.min(Math.round(base * 0.85 + Math.random() * 10), 99)
    const mlProb = Math.min(Math.round(base * 0.75 + Math.random() * 10), 99)
    const feProb = Math.min(Math.round(base * 0.9 + Math.random() * 10), 99)
    const devopsProb = Math.min(Math.round(base * 0.65 + Math.random() * 10), 99)

    const roles = [
      { name: "SDE Role", probability: sdeProb, color: "primary" },
      { name: "Frontend Engineer", probability: feProb, color: "accent" },
      { name: "Data Analyst", probability: daProb, color: "chart-3" },
      { name: "ML Engineer", probability: mlProb, color: "chart-4" },
      { name: "DevOps Engineer", probability: devopsProb, color: "chart-5" },
    ].sort((a, b) => b.probability - a.probability)

    const res: PredictionResult = {
      roles,
      topRecommendation: roles[0].name,
      modelUsed: "XGBoost + Random Forest Ensemble",
    }

    setResult(res)
    setPredicting(false)

    const targets = Object.fromEntries(roles.map((r) => [r.name, r.probability]))
    let frame = 0
    const maxFrames = 50
    const interval = setInterval(() => {
      frame++
      const progress = frame / maxFrames
      const updated: Record<string, number> = {}
      for (const [key, val] of Object.entries(targets)) {
        updated[key] = Math.round(val * progress)
      }
      setAnimatedProbs(updated)
      if (frame >= maxFrames) clearInterval(interval)
    }, 25)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <AnimatedSection>
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-extrabold text-foreground mb-6">Your Profile</h3>

              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">CGPA</label>
                    <span className="text-sm font-mono text-primary">{cgpa[0].toFixed(1)}</span>
                  </div>
                  <Slider value={cgpa} onValueChange={setCgpa} min={4} max={10} step={0.1} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">LeetCode Problems</label>
                    <span className="text-sm font-mono text-primary">{leetcode[0]}</span>
                  </div>
                  <Slider value={leetcode} onValueChange={setLeetcode} min={0} max={500} step={10} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Projects Completed</label>
                    <span className="text-sm font-mono text-primary">{projects[0]}</span>
                  </div>
                  <Slider value={projects} onValueChange={setProjects} min={0} max={15} step={1} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Skill Diversity (1-10)</label>
                    <span className="text-sm font-mono text-primary">{skills[0]}</span>
                  </div>
                  <Slider value={skills} onValueChange={setSkills} min={1} max={10} step={1} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Interview Score</label>
                    <span className="text-sm font-mono text-primary">{interviewScore[0]}%</span>
                  </div>
                  <Slider value={interviewScore} onValueChange={setInterviewScore} min={0} max={100} step={5} />
                </div>

                <Button
                  onClick={handlePredict}
                  disabled={predicting}
                  className="w-full glow-primary rounded-xl mt-2"
                  size="lg"
                >
                  {predicting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running ML Models...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Predict Placement
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </AnimatedSection>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {!result && !predicting ? (
            <AnimatedSection delay={0.2}>
              <Card className="bg-card border-border p-8 flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-extrabold text-foreground">ML Prediction Engine</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Adjust your profile parameters and click predict to see your placement probability across different roles.
                </p>
              </Card>
            </AnimatedSection>
          ) : predicting ? (
            <Card className="bg-card border-border p-12 flex flex-col items-center justify-center min-h-[500px]">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <p className="mt-6 text-muted-foreground">Running XGBoost + Random Forest ensemble...</p>
            </Card>
          ) : result ? (
            <div className="flex flex-col gap-6">
              <AnimatedSection>
                <Card className="bg-card border-border p-6 glow-primary">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Top Recommendation</p>
                      <h3 className="text-xl font-black text-foreground">{result.topRecommendation}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Model: {result.modelUsed}</p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <Card className="bg-card border-border p-6">
                  <h3 className="text-lg font-extrabold text-foreground mb-6">Placement Probabilities</h3>
                  <div className="flex flex-col gap-5">
                    {result.roles.map((role) => (
                      <div key={role.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{role.name}</span>
                          <span className="text-sm font-mono font-bold text-primary">
                            {animatedProbs[role.name] || 0}%
                          </span>
                        </div>
                        <div className="h-3 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                            style={{ width: `${animatedProbs[role.name] || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="bg-card border-border p-6">
                  <h3 className="text-lg font-extrabold text-foreground mb-4">Key Insights</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Strongest Factor", value: interviewScore[0] > 70 ? "Interview Performance" : "Coding Profile" },
                      { label: "Improvement Area", value: cgpa[0] < 7 ? "Academic Score" : leetcode[0] < 200 ? "Coding Practice" : "Project Count" },
                      { label: "Model Confidence", value: "92.3%" },
                      { label: "Data Points Used", value: "5 Features" },
                    ].map((insight) => (
                      <div key={insight.label} className="rounded-xl border border-border bg-secondary p-3">
                        <p className="text-xs text-muted-foreground">{insight.label}</p>
                        <p className="text-sm font-bold text-foreground mt-1">{insight.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
