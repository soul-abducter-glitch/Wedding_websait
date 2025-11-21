import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: "base" | "alt" | "dark"
}

export function Section({ children, className, background = "base" }: SectionProps) {
  const bgClasses = {
    base: "bg-bg-base",
    alt: "bg-bg-alt",
    dark: "bg-bg-dark text-white",
  }

  return <section className={cn("py-16 md:py-20 lg:py-24", bgClasses[background], className)}>{children}</section>
}
