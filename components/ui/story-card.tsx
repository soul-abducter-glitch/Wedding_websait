"use client"

import Image from "next/image"
import { Link } from "@/lib/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import type { Story } from "@/types/content"

type StoryCardProps = {
  story: Story
  className?: string
}

export function StoryCard({ story, className }: StoryCardProps) {
  const t = useTranslations()
  const preview = story.preview || story.coverImage || "/placeholder.jpg"
  const description = story.shortDescription || story.description
  return (
    <motion.div whileHover={{ y: -6 }} className={cn("group cursor-pointer", className)}>
      <Link href={`/portfolio/${story.slug}`} className="block h-full">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Image
                src={preview}
                alt={story.previewAlt ?? story.coupleNames}
                fill
                className="object-cover"
              />
            </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-bg-dark/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full border border-white/60 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white">
              {t("portfolio.viewStory")}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.4em] text-text-muted">
            {story.location}
            {story.country ? `, ${story.country}` : ""}
          </p>
          <p className="text-xs uppercase tracking-[0.4em] text-text-muted">{story.date}</p>
          <h3 className="font-display text-3xl text-text-main group-hover:text-text-muted transition-colors">
            {story.coupleNames}
          </h3>
          {description && <p className="text-sm text-text-muted mt-2 leading-relaxed">{description}</p>}
        </div>
      </Link>
    </motion.div>
  )
}
