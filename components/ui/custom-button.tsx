"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  withArrow?: boolean
  href?: string
}

export function CustomButton({
  children,
  variant = "primary",
  withArrow = false,
  className,
  ...props
}: CustomButtonProps) {
  const variants = {
    primary: "bg-accent text-text-main hover:bg-accent/80 shadow-sm hover:shadow-md",
    secondary: "bg-transparent border border-border-subtle hover:bg-bg-alt",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium transition-all duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className="w-4 h-4" />}
    </motion.button>
  )
}
