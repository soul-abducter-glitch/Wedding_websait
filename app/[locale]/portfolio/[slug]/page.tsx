import Image from "next/image"
import { Link } from "@/lib/navigation"
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
import { LightboxGallery } from "@/components/ui/lightbox-gallery"
import { buildAlternateLinks } from "@/lib/seo"
import { getProject, getProjects, type ApiProject } from "@/lib/api"
import { formatDisplayDate } from "@/lib/date"

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 120
export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  try {
    const project = await getProject(slug, locale)
    if (!project) return {}
    return {
      title: `${project.title} - ${project.location}`,
      description: project.description,
      alternates: buildAlternateLinks(`/portfolio/${slug}`),
    }
  } catch {
    return {}
  }
}

export default async function StoryPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  let project: ApiProject | null = null
  try {
    project = await getProject(slug, locale)
  } catch (error) {
    console.error("Failed to load project", error)
  }

  if (!project) {
    notFound()
  }

  let otherStories: Story[] = []
  try {
    const list = await getProjects(locale, { limit: 4, offset: 0 })
    otherStories = list.items
      .filter((p) => p.slug !== slug)
      .slice(0, 2)
      .map((p) => mapProjectToStory(p, locale))
  } catch (error) {
    console.error("Failed to load other stories", error)
  }

  const story = mapProjectToStory(project, locale)

  return (
    <div className="flex flex-col">
      <AnimatedSection as="section" className="relative h-[70vh] md:h-[80vh]">
        <Image
          src={story.preview}
          alt={story.previewAlt ?? story.coupleNames}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-bg-dark/30 to-transparent" />
        <Container className="relative z-10 flex h-full items-end pb-12">
          <div className="text-white space-y-3">
            <Eyebrow className="text-white/80">
              {story.location} - {story.date}
            </Eyebrow>
            <Heading level={1} className="text-white text-balance">
              {story.coupleNames}
            </Heading>
            {story.shortDescription && <p className="text-white/90 max-w-2xl leading-relaxed">{story.shortDescription}</p>}
          </div>
        </Container>
      </AnimatedSection>

      <Section background="base">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <Heading level={2}>{story.coupleNames}</Heading>
            <p className="text-text-muted text-lg leading-relaxed">{story.description}</p>
          </div>

          <LightboxGallery images={story.gallery} coupleName={story.coupleNames} />
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
