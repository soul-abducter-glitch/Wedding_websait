"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { Link } from "@/lib/navigation"
import { CustomButton } from "./custom-button"

interface PackageCardProps {
  title: string
  description?: string
  features: string[]
  price?: string
  highlighted?: boolean
  badge?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function PackageCard({
  title,
  description,
  features,
  price,
  highlighted = false,
  badge,
  ctaLabel = "Choose",
  ctaHref,
  className,
}: PackageCardProps) {
  const button = (
    <CustomButton variant={highlighted ? "primary" : "secondary"} className="w-full justify-center">
      {ctaLabel}
    </CustomButton>
  )

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={cn(
        "relative flex h-full flex-col p-8 rounded-sm transition-shadow",
        highlighted ? "bg-bg-alt border-2 border-accent shadow-md" : "bg-white border border-border-subtle shadow-sm",
        className,
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-accent px-4 py-1 rounded-full text-xs uppercase tracking-wider text-text-main">
            {badge}
          </span>
        </div>
      )}

      <div className="flex-1 space-y-4">
        <h3 className="font-display text-2xl">{title}</h3>
        {description && <p className="text-text-muted">{description}</p>}

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {price && <p className="text-text-muted text-sm">{price}</p>}
      </div>

      {ctaHref ? (
        <Link href={ctaHref} className="mt-6 block">
          {button}
        </Link>
      ) : (
        <div className="mt-6">{button}</div>
      )}
    </motion.div>
  )
}
