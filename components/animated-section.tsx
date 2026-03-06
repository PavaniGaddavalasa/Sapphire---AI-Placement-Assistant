"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "slide-up" | "slide-in-left" | "slide-in-right" | "fade-in" | "scale-in"
  delay?: number
}

export function AnimatedSection({
  children,
  className,
  animation = "slide-up",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const animationClass = {
    "slide-up": "animate-slide-up",
    "slide-in-left": "animate-slide-in-left",
    "slide-in-right": "animate-slide-in-right",
    "fade-in": "animate-fade-in",
    "scale-in": "animate-scale-in",
  }[animation]

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? undefined : 0,
        animationDelay: `${delay}s`,
        animationFillMode: "forwards",
      }}
    >
      <div className={isVisible ? animationClass : ""} style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  )
}
