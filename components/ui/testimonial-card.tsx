"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  coupleNames: string
  location: string
  avatar?: string
  className?: string
}

export function TestimonialCard({ quote, coupleNames, location, avatar, className }: TestimonialCardProps) {
  const avatarSrc = avatar ?? "/placeholder-user.jpg"
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={cn(
        "flex h-full flex-col justify-between gap-6 rounded-sm bg-white p-6 md:p-8 shadow-sm transition-shadow",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-6">
        <div className="text-4xl text-accent font-display">&ldquo;</div>
        <p className="text-base md:text-lg leading-relaxed text-text-main">{quote}</p>
      </div>
      <div className="border-t border-border-subtle pt-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-bg-alt">
            <Image src={avatarSrc} alt={coupleNames} fill className="object-cover" sizes="48px" />
          </div>
          <div>
            <p className="font-medium text-text-main">{coupleNames}</p>
            <p className="text-sm text-text-muted">{location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
