import Image from "next/image"
import { Link } from "@/lib/navigation"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import type { JournalPost } from "@/types/content"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"
import { API_BASE, getJournalPosts, type ApiPost } from "@/lib/api"
import { formatDisplayDate } from "@/lib/date"
import { applyJournalOverride } from "@/lib/journal-overrides"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "journalPage" })
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: buildAlternateLinks("/journal"),
  }
}

export const revalidate = 0
export const dynamic = "force-dynamic"

const API_ORIGIN = API_BASE.replace(/\/api.*$/, "")

const resolveImage = (url?: string | null) => {
  if (!url) return "/placeholder.jpg"
  if (url.startsWith("/uploads/http")) return url.replace(/^\/uploads\//, "")
  if (url.startsWith("/uploads")) return `${API_ORIGIN}${url}`
  return url
}

const mapApiPostToJournal = (post: ApiPost, locale: string): JournalPost =>
  applyJournalOverride(
    {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? "",
      category: locale === "ru" ? "Журнал" : "Journal",
      date: post.publishedAt ? formatDisplayDate(post.publishedAt, locale) : "",
      image: resolveImage(post.coverImageUrl),
      content: [{ type: "paragraph", text: post.content ?? "" }],
    },
    locale,
  )

export default async function JournalPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  let posts: JournalPost[] = []
  try {
    const response = await getJournalPosts({ limit: 50, offset: 0 })
    posts = response.items.map((item) => mapApiPostToJournal(item, locale))
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    console.warn(`Journal API unavailable, using static translations. Reason: ${reason}`)
    posts = (t.raw("journalPosts") as JournalPost[]).map((post) => applyJournalOverride(post, locale))
  }

  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Eyebrow className="mb-2">{t("journalPage.eyebrow")}</Eyebrow>
          <Heading level={1}>{t("journalPage.heading")}</Heading>
          <p className="text-lg text-text-muted leading-relaxed">{t("journalPage.intro")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {posts.map((post, index) => (
            <AnimatedSection key={post.slug} delay={index * 0.05}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-sm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase text-text-muted mb-2">
                  {post.category} · {post.date}
                </p>
                <h2 className="font-display text-3xl mb-3 group-hover:text-text-muted transition-colors">{post.title}</h2>
                <p className="text-text-muted leading-relaxed">{post.excerpt}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  )
}
