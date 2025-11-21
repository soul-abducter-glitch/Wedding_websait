"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next-intl/link"
import { useRef } from "react"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { LeadText } from "@/components/ui/lead-text"
import { CustomButton } from "@/components/ui/custom-button"
import { Container } from "@/components/ui/container"

type HeroProps = {
  eyebrow: string
  heading: string
  subheading: string
  stats: string
  primaryCta: string
  secondaryCta: string
  primaryHref: string
  secondaryHref: string
  background: string
  alt: string
}

export function Hero({
  eyebrow,
  heading,
  subheading,
  stats,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref,
  background,
  alt,
}: HeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image src={background} alt={alt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-bg-dark/20 to-transparent" />
      </motion.div>

      <Container className="relative z-10 text-white">
        <div className="max-w-3xl space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Eyebrow className="text-white/90">{eyebrow}</Eyebrow>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}>
            <Heading level={1} className="text-white text-balance mb-2">
              {heading}
            </Heading>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}>
            <LeadText className="text-white/90 text-pretty mb-2">{subheading}</LeadText>
          </motion.div>
          <motion.p
            className="text-sm uppercase tracking-wider text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.26 }}
          >
            {stats}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-2"
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
              <CustomButton variant="secondary">{secondaryCta}</CustomButton>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
