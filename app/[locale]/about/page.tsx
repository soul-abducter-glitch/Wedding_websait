import Image from "next/image"
import { Link } from "@/lib/navigation"
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
  const t = await getTranslations({ locale, namespace: "about" })
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: buildAlternateLinks("/about"),
  }
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const facts = t.raw("about.facts") as { label: string; value: string }[]
  const approach = t.raw("about.approach") as { title: string; text: string }[]

  return (
    <div className="flex flex-col">
      <Section background="base" className="pt-12 md:pt-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <AnimatedSection>
              <div className="relative aspect-[3/4]">
                <Image
                  src="/female-photographer.png"
                  alt="Женщина-фотограф с камерой"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08} className="space-y-4">
              <Eyebrow className="mb-2">{t("about.eyebrow")}</Eyebrow>
              <Heading level={1}>{t("about.heading")}</Heading>
              <p className="text-text-muted leading-relaxed">{t("about.intro")}</p>
              <p className="text-text-muted leading-relaxed">{t("about.introSecondary")}</p>
            </AnimatedSection>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <Heading level={2} className="mb-8">
              {t("about.factsTitle")}
            </Heading>
            <div className="grid md:grid-cols-3 gap-8">
              {facts.map((fact) => (
                <AnimatedSection key={fact.label} className="text-center">
                  <p className="font-display text-5xl mb-2">{fact.label}</p>
                  <p className="text-text-muted">{fact.value}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Heading level={2}>{t("about.approachTitle")}</Heading>
          </div>
          <div className="space-y-8">
            {approach.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.05} className="p-6 border border-border-subtle bg-white">
                <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                <p className="text-text-muted leading-relaxed">{item.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <Heading level={2}>{t("about.coffeeCtaHeading")}</Heading>
            <LeadText className="text-text-muted">{t("about.coffeeCtaText")}</LeadText>
            <Link
              href="/contact"
              className="inline-block bg-text-main text-white px-8 py-3 text-sm tracking-wide hover:bg-text-muted transition-colors rounded-full"
            >
              {t("about.coffeeCtaButton")}
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
