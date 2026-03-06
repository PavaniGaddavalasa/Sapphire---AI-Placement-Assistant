"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  children?: ReactNode
  className?: string
}

export function PageHeader({
  badge,
  title,
  titleHighlight,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("relative pt-32 pb-16", className)}>
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-[350px] w-[500px] rounded-full bg-sky-200/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] h-[250px] w-[300px] rounded-full bg-orange-200/20 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {badge && (
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary animate-fade-in">
            {badge}
          </div>
        )}

        <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl animate-slide-up text-balance">
          {title}{" "}
          {titleHighlight && (
            <span className="text-gradient">{titleHighlight}</span>
          )}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-2xl animate-slide-up animation-delay-200 text-pretty">
          {description}
        </p>

        {children && (
          <div className="mt-8 animate-slide-up animation-delay-400">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
