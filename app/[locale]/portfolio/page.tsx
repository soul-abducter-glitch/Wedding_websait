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
import { getProjects, type ApiProject } from "@/lib/api"
import { formatDisplayDate } from "@/lib/date"

type PageProps = { params: Promise<{ locale: string }> }

export const revalidate = 0
export const dynamic = "force-dynamic"

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
  const fallbackStories = t.raw("stories") as Story[]

  let stories: Story[] = []
  try {
    const response = await getProjects(locale)
    stories = response.items.map((project) => mapProjectToStory(project, locale))
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    console.warn(`Projects API unavailable, using static stories. Reason: ${reason}`)
    stories = fallbackStories
  }

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

        {stories.length === 0 ? (
          <p className="text-center text-text-muted">Stories will appear soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {stories.map((story, index) => (
              <AnimatedSection key={story.slug} delay={index * 0.05}>
                <StoryCard story={story} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

function mapProjectToStory(project: ApiProject, locale: string): Story {
  const preview = project.coverImage || project.gallery?.[0] || "/placeholder.jpg"
  const short = project.description.length > 180 ? `${project.description.slice(0, 180)}…` : project.description
  return {
    slug: project.slug,
    coupleNames: project.title,
    location: project.location,
    date: formatDisplayDate(project.date, locale),
    preview,
    gallery: project.gallery ?? [],
    description: project.description,
    shortDescription: short,
    featured: project.isFeatured,
    coverImage: project.coverImage,
  }
}
