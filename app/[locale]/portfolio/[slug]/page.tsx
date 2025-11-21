import Image from "next/image"
import Link from "next-intl/link"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { Eyebrow } from "@/components/ui/eyebrow"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { StoryCard } from "@/components/ui/story-card"
import type { Story } from "@/types/content"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"
import ru from "@/i18n/messages/ru"

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  const baseStories = (ru.stories as Story[]).map((story) => story.slug)
  const localesWithSlugs = baseStories.flatMap((slug) => [{ locale: "ru", slug }, { locale: "en", slug }])
  return localesWithSlugs
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const stories = t.raw("stories") as Story[]
  const story = stories.find((item) => item.slug === slug)

  if (!story) return {}

  return {
    title: `${story.coupleNames} — ${story.location}`,
    description: story.shortDescription,
    alternates: buildAlternateLinks(`/portfolio/${slug}`),
  }
}

export default async function StoryPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const stories = t.raw("stories") as Story[]
  const story = stories.find((item) => item.slug === slug)

  if (!story) {
    notFound()
  }

  const otherStories = stories.filter((item) => item.slug !== slug).slice(0, 2)

  return (
    <div className="flex flex-col">
      <AnimatedSection as="section" className="relative h-[70vh] md:h-[80vh]">
        <Image src={story!.preview} alt={story!.coupleNames} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-bg-dark/30 to-transparent" />
        <Container className="relative z-10 flex h-full items-end pb-12">
          <div className="text-white space-y-3">
            <Eyebrow className="text-white/80">
              {story!.location}
              {story!.country ? `, ${story!.country}` : ""} · {story!.date}
            </Eyebrow>
            <Heading level={1} className="text-white text-balance">
              {story!.coupleNames}
            </Heading>
            <p className="text-white/90 max-w-2xl leading-relaxed">{story!.shortDescription}</p>
          </div>
        </Container>
      </AnimatedSection>

      <Section background="base">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <Heading level={2}>{story!.coupleNames}</Heading>
            <p className="text-text-muted text-lg leading-relaxed">{story!.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {story!.gallery.map((image, index) => (
              <AnimatedSection key={image} delay={index * 0.04} className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image src={image} alt={`${story!.coupleNames} ${index + 1}`} fill className="object-cover" />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {otherStories.length > 0 && (
        <Section background="alt">
          <Container>
            <AnimatedSection className="text-center mb-10">
              <Heading level={2}>{t("portfolio.otherStories")}</Heading>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              {otherStories.map((item, index) => (
                <AnimatedSection key={item.slug} delay={index * 0.05}>
                  <StoryCard story={item} />
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section background="base">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <Heading level={2}>{t("portfolio.ctaHeading")}</Heading>
            <p className="text-text-muted leading-relaxed">{t("portfolio.ctaText")}</p>
            <Link
              href="/contact"
              className="inline-block bg-text-main text-white px-8 py-3 text-sm tracking-wide hover:bg-text-muted transition-colors rounded-full"
            >
              {t("portfolio.ctaButton")}
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
