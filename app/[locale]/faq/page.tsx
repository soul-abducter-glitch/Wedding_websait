import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import type { FaqItem } from "@/types/content"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "faqPage" })
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: buildAlternateLinks("/faq"),
  }
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const items = t.raw("faq") as FaqItem[]

  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <Eyebrow className="mb-2">{t("faqPage.eyebrow")}</Eyebrow>
          <Heading level={1}>{t("faqPage.heading")}</Heading>
          <p className="text-text-muted">{t("faqPage.intro")}</p>
        </div>

        <AnimatedSection>
          <Accordion type="single" collapsible className="divide-y divide-border-subtle bg-white border border-border-subtle">
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-base text-text-main px-4 md:px-6">{item.question}</AccordionTrigger>
                <AccordionContent className="text-text-muted px-4 md:px-6">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto text-center mt-12 text-text-muted">
          {t("faqPage.moreQuestions")}
        </div>
      </Container>
    </Section>
  )
}
