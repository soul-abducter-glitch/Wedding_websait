import Image from "next/image"
import Link from "next-intl/link"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { ContentBlock, JournalPost } from "@/types/content"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"
import ru from "@/i18n/messages/ru"

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  const base = (ru.journalPosts as JournalPost[]).map((post) => post.slug)
  return base.flatMap((slug) => [{ locale: "ru", slug }, { locale: "en", slug }])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const posts = t.raw("journalPosts") as JournalPost[]
  const post = posts.find((item) => item.slug === slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: buildAlternateLinks(`/journal/${slug}`),
  }
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={index} className="font-display text-3xl mt-10 mb-4">
          {block.text}
        </h2>
      )
    case "paragraph":
      return (
        <p key={index} className="text-text-muted leading-relaxed mb-4">
          {block.text}
        </p>
      )
    case "list":
      return (
        <ul key={index} className="list-disc pl-6 space-y-2 text-text-muted leading-relaxed mb-4">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default async function JournalPostPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const posts = t.raw("journalPosts") as JournalPost[]
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  const related =
    post!.relatedSlugs?.map((relatedSlug) => posts.find((item) => item.slug === relatedSlug)).filter(Boolean) ??
    posts.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <div className="flex flex-col">
      <Section background="base" className="pt-12 md:pt-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimatedSection className="space-y-4 mb-8">
              <Eyebrow className="text-text-muted">
                {post!.category} · {post!.date}
              </Eyebrow>
              <Heading level={1} className="text-balance">
                {post!.title}
              </Heading>
            </AnimatedSection>

            <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-sm">
              <Image src={post!.image} alt={post!.title} fill className="object-cover" />
            </div>

            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-text-main prose-p:text-text-muted prose-ul:text-text-muted">
              {post!.content.map(renderBlock)}
            </div>

            <div className="mt-12 pt-6 border-t border-border-subtle">
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors"
              >
                ← {t("journalPage.backLink")}
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <Heading level={2} className="text-center mb-8">
            {t("journalPage.relatedTitle")}
          </Heading>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((relatedPost, index) => (
              <AnimatedSection key={relatedPost!.slug} delay={index * 0.05}>
                <Link href={`/journal/${relatedPost!.slug}`} className="group block">
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-sm">
                    <Image
                      src={relatedPost!.image}
                      alt={relatedPost!.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-xl group-hover:text-text-muted transition-colors">
                    {relatedPost!.title}
                  </h3>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
