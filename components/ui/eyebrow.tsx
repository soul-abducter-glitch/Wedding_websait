import type React from "react"
import { cn } from "@/lib/utils"

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cn("text-xs tracking-[0.16em] uppercase text-text-muted", className)}>{children}</p>
}
