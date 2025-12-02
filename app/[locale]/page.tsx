import Image from "next/image"
import { Link } from "@/lib/navigation"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { Eyebrow } from "@/components/ui/eyebrow"
import { LeadText } from "@/components/ui/lead-text"
import { CustomButton } from "@/components/ui/custom-button"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Story, Testimonial } from "@/types/content"
import { API_BASE, getProjects, getReviews, type ApiProject, type ApiReview } from "@/lib/api"
import { formatDisplayDate } from "@/lib/date"
import { StoryCard } from "@/components/ui/story-card"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Hero } from "@/components/sections/hero"

export const revalidate = 600

const API_ORIGIN = API_BASE.replace(/\/api.*$/, "")
const FALLBACK_ABOUT_IMAGE = "/female-photographer.png"

async function resolveAboutImageUrl(raw?: string | null) {
  const normalized =
    raw?.startsWith("/uploads") ? `${API_ORIGIN}${raw}` : raw ?? FALLBACK_ABOUT_IMAGE
  if (normalized === FALLBACK_ABOUT_IMAGE) return normalized
  try {
    const head = await fetch(normalized, { method: "HEAD", cache: "no-store" })
    if (!head.ok) return FALLBACK_ABOUT_IMAGE
  } catch {
    return FALLBACK_ABOUT_IMAGE
  }
  return normalized
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const stories = t.raw("stories") as Story[]
  const staticTestimonials = t.raw("testimonials") as Testimonial[]

  const hero = t.raw("home.hero") as {
    eyebrow: string
    heading: string
    subheading?: string
    description: string
    stats: string
    primaryCta: string
    secondaryCta: string
    imageAlt: string
  }

  const homepageResponse = await fetch(`${API_BASE}/homepage`, {
    next: { revalidate: 600 },
  }).catch(() => null)
  const homepageData =
    homepageResponse && homepageResponse.ok ? await homepageResponse.json() : null
  const aboutImageUrlRaw = homepageData?.homepageContent?.aboutImageUrl
  const aboutImageUrl = await resolveAboutImageUrl(aboutImageUrlRaw)
  const aboutImageAlt =
    homepageData?.homepageContent?.aboutImageAlt ?? t("home.hero.imageAlt")

  const forWhom = t.raw("home.forWhom") as {
    title: string
    prosTitle: string
    consTitle: string
    pros: string[]
    cons: string[]
  }

  const aboutSnippet = t.raw("home.aboutSnippet") as any

  let apiStories: ApiProject[] = []
  try {
    const response = await getProjects(locale, { limit: 6, offset: 0 })
    apiStories = response.items
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    console.warn(`Projects API unavailable on home, using static stories. Reason: ${reason}`)
  }

  const featuredStories =
    apiStories.length > 0
      ? apiStories
          .filter((item) => item.isFeatured)
          .slice(0, 3)
          .map((project) => mapProjectToStory(project, locale))
      : stories.filter((story) => story.featured).slice(0, 3)

  let testimonials: Testimonial[] = staticTestimonials
  try {
    const apiReviews = await getReviews(locale)
    testimonials = apiReviews.map(mapReviewToTestimonial)
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    console.warn(`Reviews API unavailable on home, using static testimonials. Reason: ${reason}`)
  }

  return (
    <div className="flex flex-col">
      <Hero
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        subheading={hero.subheading}
        description={hero.description}
        stats={hero.stats}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        primaryHref="/contact"
        secondaryHref="/portfolio"
        background="/elegant-wedding-couple-walking.jpg"
        alt={hero.imageAlt}
        priority
      />

      <Section background="base">
        <Container>
          <AnimatedSection className="text-center mb-12" delay={0.05}>
            <Eyebrow className="mb-4">{forWhom.title}</Eyebrow>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <AnimatedSection delay={0.1} className="space-y-4">
              <Heading level={3} className="text-2xl md:text-3xl">
                {forWhom.prosTitle}
              </Heading>
              <ul className="space-y-3">
                {forWhom.pros.map((item, index) => (
                  <li key={index} className="flex gap-3 text-text-main">
                    <span className="text-accent mt-1">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.15} className="space-y-4">
              <Heading level={3} className="text-2xl md:text-3xl">
                {forWhom.consTitle}
              </Heading>
              <ul className="space-y-3">
                {forWhom.cons.map((item, index) => (
                  <li key={index} className="flex gap-3 text-text-muted">
                    <span className="mt-1">—</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

        <Section background="alt" className="pb-24 md:pb-28">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <Heading level={2}>{t("home.benefitsTitle")}</Heading>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(t.raw("home.benefits") as { title: string; text: string }[]).map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.05}>
                <div className="text-center">
                  <h3 className="font-display text-xl mb-3">{benefit.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{benefit.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <Heading level={2}>{t("home.featuredTitle")}</Heading>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featuredStories.map((story, index) => (
              <AnimatedSection key={story.slug} delay={index * 0.08}>
                <StoryCard story={story} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimatedSection>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={aboutImageUrl}
                  alt={aboutImageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.12} className="space-y-4">
              <Eyebrow className="mb-2">{aboutSnippet.eyebrow}</Eyebrow>
              <Heading level={2} className="mb-2">
                {aboutSnippet.heading}
              </Heading>
              {aboutSnippet.body.map((paragraph: string, index: number) => (
                <p key={index} className="text-text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {aboutSnippet.stats.map((stat: { label: string; value: string }) => (
                  <div key={stat.label}>
                    <p className="font-medium text-text-main">{stat.value}</p>
                    <p className="text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <CustomButton variant="secondary" withArrow>
                  {aboutSnippet.cta}
                </CustomButton>
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <Heading level={2}>{t("home.testimonialsTitle")}</Heading>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={`${testimonial.coupleNames}-${index}`} delay={index * 0.08}>
                <TestimonialCard
                  quote={testimonial.quote}
                  coupleNames={testimonial.coupleNames}
                  location={testimonial.location}
                />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedSection className="space-y-4">
              <Heading level={2}>{t("home.finalCta.heading")}</Heading>
              <LeadText className="text-text-muted">{t("home.finalCta.text")}</LeadText>
              <Link href="/contact">
                <CustomButton variant="primary" withArrow className="mx-auto">
                  {t("home.finalCta.button")}
                </CustomButton>
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </Section>
    </div>
  )
}

function mapProjectToStory(project: ApiProject, locale: string): Story {
  const preview = project.coverImageUrl || project.gallery?.[0]?.imageUrl || "/placeholder.jpg"
  const short =
    project.shortDescription.length > 180 ? `${project.shortDescription.slice(0, 180)}…` : project.shortDescription
  return {
    slug: project.slug,
    coupleNames: project.title,
    location: project.location,
    date: project.date ? formatDisplayDate(project.date, locale) : "",
    preview: normalizeImage(preview),
    gallery: project.gallery?.map((img) => normalizeImage(img.imageUrl)) ?? [],
    description: project.fullDescription,
    shortDescription: short,
    featured: project.isFeatured,
    coverImage: normalizeImage(project.coverImageUrl),
  }
}

function normalizeImage(url?: string | null) {
  if (!url) return "/placeholder.jpg"
  if (url.startsWith("/uploads")) return `${API_ORIGIN}${url}`
  return url
}

function mapReviewToTestimonial(review: ApiReview): Testimonial {
  return {
    coupleNames: review.coupleNames,
    location: review.location,
    quote: review.text,
    avatar: review.avatar ? normalizeImage(review.avatar) : "/placeholder-user.jpg",
  }
}
