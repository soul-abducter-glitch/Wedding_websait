import type React from "react"
import { cn } from "@/lib/utils"

interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3
  className?: string
  as?: "h1" | "h2" | "h3" | "h4"
}

export function Heading({ children, level = 1, className, as }: HeadingProps) {
  const Component = as || (`h${level}` as "h1" | "h2" | "h3")

  const styles = {
    1: "text-4xl md:text-5xl lg:text-6xl font-display leading-tight",
    2: "text-3xl md:text-4xl lg:text-5xl font-display leading-tight",
    3: "text-2xl md:text-3xl font-display leading-tight",
  }

  return <Component className={cn(styles[level], className)}>{children}</Component>
}
