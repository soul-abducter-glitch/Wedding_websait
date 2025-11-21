import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { StoryCard } from "@/components/ui/story-card"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import type { Story } from "@/types/content"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "portfolio" })
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: buildAlternateLinks("/portfolio"),
  }
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const stories = t.raw("stories") as Story[]

  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <AnimatedSection>
            <Eyebrow className="mb-4">{t("portfolio.eyebrow")}</Eyebrow>
            <Heading level={1} className="text-balance mb-4">
              {t("portfolio.heading")}
            </Heading>
            <p className="text-lg text-text-muted text-pretty leading-relaxed">{t("portfolio.intro")}</p>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {stories.map((story, index) => (
            <AnimatedSection key={story.slug} delay={index * 0.05}>
              <StoryCard story={story} />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  )
}
