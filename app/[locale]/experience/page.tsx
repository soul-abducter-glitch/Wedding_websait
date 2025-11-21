import Link from "next-intl/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { LeadText } from "@/components/ui/lead-text"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "experience" })
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: buildAlternateLinks("/experience"),
  }
}

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  const steps = t.raw("experience.steps") as { number: string; title: string; description: string }[]
  const values = t.raw("experience.values") as { title: string; description: string }[]
  const philosophy = t.raw("experience.philosophy") as { title: string; bullets: string[] }

  return (
    <div className="flex flex-col">
      <Section background="base" className="pt-12 md:pt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <AnimatedSection>
              <Eyebrow className="mb-4">{t("experience.eyebrow")}</Eyebrow>
              <Heading level={1}>{t("experience.heading")}</Heading>
              <LeadText className="text-text-muted">{t("experience.intro")}</LeadText>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center bg-bg-alt p-6 md:p-10">
            <AnimatedSection>
              <div className="relative aspect-[3/4]">
                <Image src="/couple-laughing-together.jpg" alt="Couple laughing" fill className="object-cover rounded-sm" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="space-y-4">
              <Heading level={2} className="text-3xl md:text-4xl">
                {philosophy.title}
              </Heading>
              <ul className="space-y-3 text-text-muted leading-relaxed">
                {philosophy.bullets.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
            <Heading level={2}>{t("experience.processTitle")}</Heading>
            <p className="text-text-muted">{t("experience.processSubtitle")}</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-12">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.05} className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-10">
                <div className="font-display text-5xl text-accent">{step.number}</div>
                <div>
                  <h3 className="font-display text-2xl mb-2">{step.title}</h3>
                  <p className="text-text-muted leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Heading level={2}>{t("experience.valuesTitle")}</Heading>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.05} className="p-6 border border-border-subtle bg-white">
                <h3 className="font-display text-xl mb-2">{value.title}</h3>
                <p className="text-text-muted leading-relaxed">{value.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <Heading level={2}>{t("experience.ctaHeading")}</Heading>
            <p className="text-text-muted">{t("experience.ctaText")}</p>
            <Link
              href="/contact"
              className="inline-block bg-text-main text-white px-8 py-3 text-sm tracking-wide hover:bg-text-muted transition-colors rounded-full"
            >
              {t("experience.ctaButton")}
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
