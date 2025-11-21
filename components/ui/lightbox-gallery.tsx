"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { AnimatedSection } from "@/components/ui/animated-section"
import { cn } from "@/lib/utils"

type LightboxGalleryProps = {
  images: string[]
  coupleName: string
  className?: string
}

export function LightboxGallery({ images, coupleName, className }: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const close = React.useCallback(() => setActiveIndex(null), [])
  const showNext = React.useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current
      return (current + 1) % images.length
    })
  }, [images.length])
  const showPrev = React.useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current
      return (current - 1 + images.length) % images.length
    })
  }, [images.length])

  React.useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
      if (event.key === "ArrowRight") showNext()
      if (event.key === "ArrowLeft") showPrev()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeIndex, close, showNext, showPrev])

  return (
    <>
      <div className={cn("grid md:grid-cols-2 gap-6", className)}>
        {images.map((image, index) => (
          <AnimatedSection
            key={image}
            delay={index * 0.04}
            className="relative aspect-[4/5] overflow-hidden rounded-sm cursor-zoom-in"
          >
            <Image
              src={image}
              alt={`${coupleName} ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              onClick={() => setActiveIndex(index)}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </AnimatedSection>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close gallery"
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              onClick={close}
            >
              <X className="h-5 w-5" />
            </button>

            <button
              aria-label="Previous image"
              className="absolute left-4 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              onClick={showPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              aria-label="Next image"
              className="absolute right-4 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              onClick={showNext}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl aspect-[3/2]"
            >
              <Image
                src={images[activeIndex]}
                alt={`${coupleName} ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
