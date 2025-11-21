"use client"

import type React from "react"
import type { HTMLAttributes } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  delay?: number
  stagger?: boolean
} & HTMLAttributes<HTMLElement>

export function AnimatedSection({
  children,
  className,
  as = "section",
  delay = 0,
  stagger = false,
  ...rest
}: AnimatedSectionProps) {
  const Component = motion[as] as typeof motion.section

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut", delay, staggerChildren: stagger ? 0.08 : undefined },
        },
      }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
