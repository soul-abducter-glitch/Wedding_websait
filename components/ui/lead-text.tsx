import type React from "react"
import { cn } from "@/lib/utils"

interface LeadTextProps {
  children: React.ReactNode
  className?: string
}

export function LeadText({ children, className }: LeadTextProps) {
  return <p className={cn("text-lg md:text-xl leading-relaxed text-text-muted", className)}>{children}</p>
}
