"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Link } from "@/lib/navigation"
import { useRef } from "react"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { LeadText } from "@/components/ui/lead-text"
import { CustomButton } from "@/components/ui/custom-button"
import { Container } from "@/components/ui/container"

type HeroProps = {
  eyebrow: string
  heading: string
  subheading?: string
  description?: string
  stats: string
  primaryCta: string
  secondaryCta: string
  primaryHref: string
  secondaryHref: string
  background: string
  alt: string
  priority?: boolean
}

export function Hero({
  eyebrow,
  heading,
  subheading,
  description,
  stats,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref,
  background,
  alt,
  priority = false,
}: HeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section
      ref={ref}
      className="relative min-h-screen -mt-[80px] flex items-center justify-center overflow-hidden pt-[80px] pb-24"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src={background}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-bg-dark/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
      </motion.div>

      <Container className="relative z-10 text-white px-5 md:px-0">
        <div className="mx-auto flex max-w-3xl flex-col space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Eyebrow className="text-white/80 font-medium text-[10px] tracking-normal uppercase">{eyebrow}</Eyebrow>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <Heading level={1} className="text-white text-balance text-3xl leading-tight mb-2">
              {heading}
            </Heading>
          </motion.div>
          {subheading ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              <LeadText className="text-white/90 text-pretty mb-2 text-sm sm:text-base">{subheading}</LeadText>
            </motion.div>
          ) : null}
          {description && (
            <motion.p
              className="text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl mb-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              {description}
            </motion.p>
          )}
          <motion.p
            className="text-sm uppercase tracking-wider text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.26 }}
          >
            {stats}
          </motion.p>
          <motion.div
            className="flex flex-col gap-4 pt-2 sm:flex-row sm:gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
          >
            <Link href={primaryHref}>
              <CustomButton variant="primary" withArrow>
                {primaryCta}
              </CustomButton>
            </Link>
            <Link href={secondaryHref}>
              <CustomButton
                variant="secondary"
                className="border-white/80 text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                {secondaryCta}
              </CustomButton>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
