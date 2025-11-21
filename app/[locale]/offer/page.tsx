import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import type { LegalSection } from "@/types/content"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "legal.offer" })
  return {
    title: t("title"),
    description: t("title"),
    alternates: buildAlternateLinks("/offer"),
  }
}

export default async function OfferPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const sections = t.raw("legal.offer.sections") as LegalSection[]

  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto mb-10 text-center space-y-3">
          <Heading level={1}>{t("legal.offer.title")}</Heading>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <AnimatedSection key={section.title} delay={index * 0.04} className="space-y-3">
              <h2 className="font-display text-2xl text-text-main">{section.title}</h2>
              {section.body && <p className="text-text-muted leading-relaxed">{section.body}</p>}
              {section.items && (
                <ul className="list-disc pl-6 space-y-2 text-text-muted leading-relaxed">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  )
}
