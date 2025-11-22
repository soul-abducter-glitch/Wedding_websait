import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { LeadText } from "@/components/ui/lead-text"
import { ContactForm } from "@/components/forms/contact-form"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"
import type { ContactChannel } from "@/types/content"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: buildAlternateLinks("/contact"),
  }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const channels = t.raw("contact.channels") as ContactChannel[]
  const process = t.raw("contact.process") as { title: string; text: string }[]

  return (
    <div className="flex flex-col">
      <Section background="base" className="pt-12 md:pt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <Eyebrow className="mb-2">{t("contact.eyebrow")}</Eyebrow>
            <Heading level={1}>{t("contact.heading")}</Heading>
            <LeadText className="text-text-muted">{t("contact.intro")}</LeadText>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <AnimatedSection delay={0}>
              <div className="space-y-4">
                <Heading level={3} className="text-2xl">
                  {t("contact.form.title")}
                </Heading>
                <p className="text-text-muted leading-relaxed">{t("contact.form.subtitle")}</p>
              </div>
              <div className="mt-6">
                <ContactForm />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <div className="space-y-8 rounded-sm border border-border-subtle bg-bg-alt p-8">
                <div className="space-y-4">
                  <Heading level={3} className="text-2xl">
                    {t("contact.processTitle")}
                  </Heading>
                  <div className="space-y-4">
                    {process.map((item) => (
                      <div key={item.title} className="space-y-1">
                        <p className="font-medium text-text-main">{item.title}</p>
                        <p className="text-sm text-text-muted">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {channels.map((channel) => (
                    <div key={channel.label} className="border border-border-subtle bg-white p-4">
                      <p className="text-sm uppercase tracking-widest text-text-muted mb-1">{channel.label}</p>
                      <a
                        href={channel.href}
                        className="font-medium text-text-main hover:text-text-muted transition-colors"
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {channel.value}
                      </a>
                      {channel.description && <p className="text-sm text-text-muted mt-1">{channel.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>
    </div>
  )
}
