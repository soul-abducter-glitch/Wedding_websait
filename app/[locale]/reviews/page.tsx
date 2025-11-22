import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { cache } from "react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import type { Testimonial } from "@/types/content"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

export const revalidate = 60

const loadTranslations = cache(async (locale: string) => {
  return await getTranslations({ locale })
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "reviewsPage" })
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: buildAlternateLinks("/reviews"),
  }
}

export default async function ReviewsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await loadTranslations(locale)
  const testimonials = t.raw("testimonials") as Testimonial[]

  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <Eyebrow className="mb-2">{t("reviewsPage.eyebrow")}</Eyebrow>
          <Heading level={1}>{t("reviewsPage.heading")}</Heading>
          <p className="text-text-muted">{t("reviewsPage.intro")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <AnimatedSection key={item.coupleNames} delay={index * 0.08} className="h-full">
              <TestimonialCard quote={item.quote} coupleNames={item.coupleNames} location={item.location} />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  )
}
