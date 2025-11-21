"use client"

import Image from "next/image"
import { Link } from "@/lib/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Story } from "@/types/content"

type StoryCardProps = {
  story: Story
  className?: string
}

export function StoryCard({ story, className }: StoryCardProps) {
  return (
    <motion.div whileHover={{ y: -6 }} className={cn("group cursor-pointer", className)}>
      <Link href={`/portfolio/${story.slug}`} className="block h-full">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Image src={story.preview} alt={story.coupleNames} fill className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-bg-dark/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-text-muted mb-2">
            {story.location}
            {story.country ? `, ${story.country}` : ""} · {story.date}
          </p>
          <h3 className="font-display text-2xl text-text-main group-hover:text-text-muted transition-colors">
            {story.coupleNames}
          </h3>
          <p className="text-sm text-text-muted mt-2 leading-relaxed">{story.shortDescription}</p>
        </div>
      </Link>
    </motion.div>
  )
}
