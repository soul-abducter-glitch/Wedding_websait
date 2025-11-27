import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"
import { getReviews, type ApiReview } from "@/lib/api"
import type { Testimonial } from "@/types/content"
import { ReviewForm } from "@/components/forms/review-form"

type PageProps = { params: Promise<{ locale: string }> }

export const revalidate = 0
export const dynamic = "force-dynamic"

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
  const t = await getTranslations({ locale, namespace: "reviewsPage" })
  const staticTestimonials = (await getTranslations({ locale })).raw("testimonials") as Testimonial[]

  let testimonials: ApiReview[] = []
  try {
    testimonials = await getReviews(locale)
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    console.warn(`Reviews API unavailable, using static testimonials. Reason: ${reason}`)
    testimonials = staticTestimonials.map((item, index) => ({
      id: `static-${index}`,
      coupleNames: item.coupleNames,
      avatar: item.avatar ?? "/placeholder-user.jpg",
      text: item.quote,
      location: item.location,
      relatedProjectId: null,
      createdAt: new Date().toISOString(),
    }))
  }

  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <Eyebrow className="mb-2">{t("eyebrow")}</Eyebrow>
          <Heading level={1}>{t("heading")}</Heading>
          <p className="text-text-muted">{t("intro")}</p>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-text-muted">Отзывы появятся скоро.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <AnimatedSection key={item.id ?? `${item.coupleNames}-${index}`} delay={index * 0.08} className="h-full">
                <TestimonialCard
                  quote={item.text}
                  coupleNames={item.coupleNames}
                  location={item.location}
                  avatar={item.avatar || "/placeholder-user.jpg"}
                />
              </AnimatedSection>
            ))}
          </div>
        )}

        <div className="mt-16 max-w-3xl mx-auto">
          <AnimatedSection>
            <Heading level={2} className="text-center mb-4">
              {t("form.title")}
            </Heading>
            <p className="text-center text-text-muted mb-8">{t("form.subtitle")}</p>
            <ReviewForm />
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  )
}
