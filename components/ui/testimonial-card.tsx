"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  coupleNames: string
  location: string
  className?: string
}

export function TestimonialCard({ quote, coupleNames, location, className }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={cn("p-6 md:p-8 bg-white rounded-sm shadow-sm transition-shadow", className)}
    >
      <div className="mb-6 text-4xl text-accent font-display">&ldquo;</div>
      <p className="text-base md:text-lg leading-relaxed mb-6 text-text-main">{quote}</p>
      <div className="border-t border-border-subtle pt-4">
        <p className="font-medium text-text-main">{coupleNames}</p>
        <p className="text-sm text-text-muted">{location}</p>
      </div>
    </motion.div>
  )
}
