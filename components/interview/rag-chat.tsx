"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Message {
  role: "user" | "assistant"
  content: string
  sources?: string[]
}

const sampleResponses: Record<string, { content: string; sources: string[] }> = {
  google: {
    content:
      "Google SDE interviews typically follow a structured format:\n\n**Round 1 - Phone Screen:** Usually 1 coding problem focusing on arrays, strings, or basic data structures. Duration: 45 minutes.\n\n**Round 2-5 - Onsite:**\n- 2 Coding rounds (Medium-Hard LeetCode style)\n- 1 System Design round (for L4+)\n- 1 Behavioral round (Googleyness & Leadership)\n\n**Common Topics:**\n- Graph algorithms (BFS/DFS)\n- Dynamic Programming\n- Binary Search variations\n- Tree traversals\n- Hash Maps for optimization\n\n**Tips:**\n- Practice on LeetCode (focus on Google-tagged problems)\n- Think out loud during coding\n- Always discuss time/space complexity",
    sources: [
      "Google Interview Experience 2025 - GeeksforGeeks",
      "Cracking the Google Interview - LeetCode Discuss",
      "Google SDE Interview Pattern Analysis",
    ],
  },
  default: {
    content:
      "Based on the interview data I have analyzed, here are the key preparation strategies:\n\n**Technical Preparation:**\n- Focus on Data Structures & Algorithms (60% of technical rounds)\n- Practice 2-3 problems daily on LeetCode/CodeForces\n- Study System Design fundamentals for senior roles\n\n**Behavioral Preparation:**\n- Use the STAR method for behavioral questions\n- Prepare 5-6 stories covering leadership, conflict, and teamwork\n- Research company culture and values\n\n**Common Patterns:**\n- Two pointers & Sliding window\n- Binary search on answer\n- DFS/BFS on graphs and trees\n- Dynamic programming (top-down and bottom-up)",
    sources: [
      "Interview Patterns Analysis - 500+ Companies",
      "Technical Interview Handbook 2025",
      "Company-specific Question Database",
    ],
  },
}

const suggestedQuestions = [
  "What questions does Google ask for SDE intern?",
  "How to prepare for Amazon system design?",
  "Top coding patterns for FAANG interviews",
  "Behavioral interview tips for Microsoft",
]

export function RAGChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (text?: string) => {
    const question = text || input
    if (!question.trim()) return

    const userMsg: Message = { role: "user", content: question }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000))

    const isGoogle = question.toLowerCase().includes("google")
    const response = isGoogle ? sampleResponses.google : sampleResponses.default

    const assistantMsg: Message = {
      role: "assistant",
      content: response.content,
      sources: response.sources,
    }
    setMessages((prev) => [...prev, assistantMsg])
    setIsTyping(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24">
      <Card className="bg-card border-border overflow-hidden">
        {/* Chat Header */}
        <div className="border-b border-border bg-secondary/50 px-6 py-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground">RAG Interview Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by vector retrieval + LLM</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-accent">Online</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex flex-col gap-4 p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-extrabold text-foreground">Ask About Interviews</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                I can retrieve past interview experiences, company patterns, and generate detailed preparation guides.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-secondary-foreground hover:bg-secondary/80 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 animate-slide-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    msg.role === "user" ? "bg-primary/15" : "bg-accent/15"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4 text-primary" />
                  ) : (
                    <Bot className="h-4 w-4 text-accent" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    msg.role === "user"
                      ? "bg-primary/15 text-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <div className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</div>
                  {msg.sources && (
                    <div className="mt-3 border-t border-border/50 pt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Sources:</p>
                      <div className="flex flex-col gap-1">
                        {msg.sources.map((s, j) => (
                          <span key={j} className="text-xs text-primary/80">
                            {j + 1}. {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                <Bot className="h-4 w-4 text-accent" />
              </div>
              <div className="rounded-xl bg-secondary p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Retrieving and generating...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about interview questions, patterns, or tips..."
              className="flex-1 rounded-xl bg-secondary border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="rounded-xl px-4"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
