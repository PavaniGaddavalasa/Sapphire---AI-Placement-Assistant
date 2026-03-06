"use client"

import { useState, useCallback } from "react"
import { Mic, MicOff, Play, RotateCcw, ChevronRight, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatedSection } from "@/components/animated-section"

interface InterviewQuestion {
  question: string
  topic: string
  difficulty: "Easy" | "Medium" | "Hard"
}

interface EvaluationResult {
  technical: number
  communication: number
  confidence: number
  overall: number
  feedback: string[]
  strengths: string[]
  improvements: string[]
}

const questions: InterviewQuestion[] = [
  { question: "Explain the difference between a stack and a queue. When would you use each?", topic: "Data Structures", difficulty: "Easy" },
  { question: "How would you design a URL shortener service like bit.ly?", topic: "System Design", difficulty: "Medium" },
  { question: "What is the time complexity of searching in a balanced BST? Explain why.", topic: "Algorithms", difficulty: "Easy" },
  { question: "Describe the concept of virtual memory and how it works.", topic: "Operating Systems", difficulty: "Medium" },
  { question: "How does garbage collection work in Java? Compare with manual memory management.", topic: "Languages", difficulty: "Hard" },
]

const sampleEval: EvaluationResult = {
  technical: 0,
  communication: 0,
  confidence: 0,
  overall: 0,
  feedback: [
    "Good understanding of core concepts demonstrated.",
    "Could improve by providing concrete examples.",
    "Consider discussing edge cases and trade-offs.",
  ],
  strengths: [
    "Clear explanation of fundamentals",
    "Good use of technical terminology",
    "Logical flow of answers",
  ],
  improvements: [
    "Add more real-world examples",
    "Discuss time/space complexity proactively",
    "Practice articulating under time pressure",
  ],
}

type InterviewState = "setup" | "in-progress" | "answering" | "evaluation"

export function MockInterview() {
  const [state, setState] = useState<InterviewState>("setup")
  const [currentQ, setCurrentQ] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null)
  const [animatedScores, setAnimatedScores] = useState({ technical: 0, communication: 0, confidence: 0, overall: 0 })

  const startInterview = () => {
    setState("in-progress")
    setCurrentQ(0)
    setAnswers([])
    setEvaluation(null)
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      const simulatedAnswer = `The answer involves understanding the core principles of ${questions[currentQ].topic}. I would approach this by first breaking down the problem...`
      setCurrentAnswer(simulatedAnswer)
    } else {
      setIsRecording(true)
      setCurrentAnswer("")
    }
  }

  const submitAnswer = () => {
    const answer = currentAnswer || "Sample response provided during mock interview."
    setAnswers((prev) => [...prev, answer])
    setCurrentAnswer("")

    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1)
    } else {
      finishInterview()
    }
  }

  const finishInterview = useCallback(async () => {
  setState("evaluation")

  await new Promise((r) => setTimeout(r, 1500))

  let technical = 0
  let communication = 0
  let confidence = 0

  answers.forEach((ans) => {
    const length = ans.split(" ").length

    if (length > 40) technical += 20
    else if (length > 20) technical += 15
    else technical += 10

    if (ans.includes("example") || ans.includes("for example")) communication += 20
    else communication += 15

    if (ans.includes("I would") || ans.includes("we can")) confidence += 20
    else confidence += 15
  })

  technical = Math.min(technical, 95)
  communication = Math.min(communication, 95)
  confidence = Math.min(confidence, 95)

  const overall = Math.round((technical + communication + confidence) / 3)

  const evalResult = {
    technical,
    communication,
    confidence,
    overall,
    feedback: [
      "Your answers show understanding of concepts.",
      "Try giving structured explanations.",
      "Add real-world examples.",
    ],
    strengths: [
      "Clear explanation style",
      "Logical thinking",
      "Strong fundamentals",
    ],
    improvements: [
      "Add examples in answers",
      "Explain complexity when possible",
      "Speak with structured steps",
    ],
  }

  setEvaluation(evalResult)

  const targets = { ...evalResult }
  let frame = 0
  const maxFrames = 60

  const interval = setInterval(() => {
    frame++
    const progress = frame / maxFrames

    setAnimatedScores({
      technical: Math.round(targets.technical * progress),
      communication: Math.round(targets.communication * progress),
      confidence: Math.round(targets.confidence * progress),
      overall: Math.round(targets.overall * progress),
    })

    if (frame >= maxFrames) clearInterval(interval)
  }, 25)
}, [answers])

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      {/* Setup State */}
      {state === "setup" && (
        <AnimatedSection>
          <Card className="bg-card border-border p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-6">
              <Mic className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-black text-foreground">AI Mock Interview</h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Practice with our AI interviewer. You will be asked {questions.length} questions
              across various topics. Speak your answers or type them.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-lg mx-auto">
              {["Technical Accuracy", "Communication", "Confidence"].map((metric) => (
                <div key={metric} className="rounded-xl border border-border bg-secondary p-3 text-center">
                  <p className="text-sm font-bold text-foreground">{metric}</p>
                  <p className="text-xs text-muted-foreground mt-1">AI-evaluated</p>
                </div>
              ))}
            </div>

            <Button onClick={startInterview} size="lg" className="mt-8 glow-primary rounded-xl px-8">
              <Play className="mr-2 h-4 w-4" />
              Start Interview
            </Button>
          </Card>
        </AnimatedSection>
      )}

      {/* In Progress */}
      {state === "in-progress" && (
        <div className="flex flex-col gap-6">
          <AnimatedSection>
            <Card className="bg-card border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Question {currentQ + 1} of {questions.length}
                </span>
                <span className="text-xs text-muted-foreground">
                  {questions[currentQ].topic} - {questions[currentQ].difficulty}
                </span>
              </div>
              <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />
            </Card>
          </AnimatedSection>

          <AnimatedSection>
            <Card className="bg-card border-border p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary font-bold text-sm">
                  Q{currentQ + 1}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">
                    {questions[currentQ].question}
                  </h3>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                      {questions[currentQ].topic}
                    </span>
                    <span className={`rounded-md px-2 py-1 text-xs font-medium ${
                      questions[currentQ].difficulty === "Easy" ? "bg-accent/15 text-accent" :
                      questions[currentQ].difficulty === "Medium" ? "bg-chart-3/15 text-chart-3" :
                      "bg-destructive/15 text-destructive"
                    }`}>
                      {questions[currentQ].difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Card className="bg-card border-border p-6">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={toggleRecording}
                  className={`flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
                    isRecording
                      ? "bg-destructive/20 ring-4 ring-destructive/30 animate-pulse"
                      : "bg-primary/15 hover:bg-primary/25"
                  }`}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  {isRecording ? (
                    <MicOff className="h-8 w-8 text-destructive" />
                  ) : (
                    <Mic className="h-8 w-8 text-primary" />
                  )}
                </button>
                <p className="text-sm text-muted-foreground">
                  {isRecording ? "Recording... Click to stop" : "Click to start speaking"}
                </p>

                <div className="w-full mt-2">
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Or type your answer here..."
                    className="w-full min-h-[100px] rounded-xl bg-secondary border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={submitAnswer}
                    disabled={!currentAnswer.trim() && !isRecording}
                    className="rounded-xl"
                  >
                    {currentQ < questions.length - 1 ? (
                      <>
                        Next Question <ChevronRight className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      "Finish Interview"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => submitAnswer()}
                    className="rounded-xl border-border"
                  >
                    Skip
                  </Button>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      )}

      {/* Evaluation */}
      {state === "evaluation" && (
        <div className="flex flex-col gap-6">
          {!evaluation ? (
            <Card className="bg-card border-border p-12 text-center">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
              <p className="mt-6 text-muted-foreground">AI is evaluating your performance...</p>
            </Card>
          ) : (
            <>
              <AnimatedSection>
                <Card className="bg-card border-border p-8">
                  <h2 className="text-2xl font-black text-foreground text-center mb-8">Interview Evaluation</h2>
                  <div className="grid gap-6 sm:grid-cols-4">
                    {[
                      { label: "Technical", score: animatedScores.technical, color: "primary" },
                      { label: "Communication", score: animatedScores.communication, color: "accent" },
                      { label: "Confidence", score: animatedScores.confidence, color: "chart-3" },
                      { label: "Overall", score: animatedScores.overall, color: "primary" },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="relative flex h-24 w-24 items-center justify-center mx-auto">
                          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-secondary" strokeWidth="6" />
                            <circle
                              cx="50" cy="50" r="42" fill="none" stroke="currentColor"
                              className={`text-${item.color}`}
                              strokeWidth="6" strokeLinecap="round"
                              strokeDasharray={`${(item.score / 100) * 263.9} 263.9`}
                            />
                          </svg>
                          <span className="absolute text-xl font-bold text-foreground">{item.score}</span>
                        </div>
                        <p className="mt-2 text-sm font-medium text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>

              <div className="grid gap-6 md:grid-cols-2">
                <AnimatedSection delay={0.1}>
                  <Card className="bg-card border-border p-6 h-full">
                    <h3 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Strengths
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {evaluation.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent shrink-0 mt-0.5">+</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <Card className="bg-card border-border p-6 h-full">
                    <h3 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-chart-5" />
                      Areas to Improve
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {evaluation.improvements.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-chart-5 shrink-0 mt-0.5">-</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={0.3}>
                <Card className="bg-card border-border p-6">
                  <h3 className="text-lg font-extrabold text-foreground mb-4">Detailed Feedback</h3>
                  <ul className="flex flex-col gap-3">
                    {evaluation.feedback.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary shrink-0 mt-0.5">{">"}</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </AnimatedSection>

              <div className="text-center">
                <Button
                  onClick={() => {
                    setState("setup")
                    setCurrentQ(0)
                    setAnswers([])
                    setEvaluation(null)
                    setAnimatedScores({ technical: 0, communication: 0, confidence: 0, overall: 0 })
                  }}
                  variant="outline"
                  className="rounded-xl border-border"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Interview
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
