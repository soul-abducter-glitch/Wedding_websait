import { Link } from "@/lib/navigation"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { PackageCard } from "@/components/ui/package-card"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Package } from "@/types/content"
import type { Metadata } from "next"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "services" })
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: buildAlternateLinks("/services"),
  }
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const packages = t.raw("packages") as Package[]
  const includes = t.raw("services.includes") as { title: string; text: string }[]

  return (
    <div className="flex flex-col">
      <Section background="base" className="pt-12 md:pt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <AnimatedSection>
              <Eyebrow className="mb-4">{t("services.eyebrow")}</Eyebrow>
              <Heading level={1} className="mb-4">
                {t("services.heading")}
              </Heading>
              <p className="text-lg text-text-muted leading-relaxed">{t("services.intro")}</p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, index) => (
              <AnimatedSection key={pkg.id} delay={index * 0.05}>
                <PackageCard
                  title={pkg.name}
                  description={pkg.description}
                  features={pkg.features}
                  price={pkg.price}
                  highlighted={pkg.popular}
                  badge={pkg.badge}
                  ctaLabel={pkg.ctaLabel}
                />
              </AnimatedSection>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection className="mb-10">
              <Heading level={2}>{t("services.includesTitle")}</Heading>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {includes.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.05}>
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">{item.text}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <Heading level={2}>{t("services.unsureTitle")}</Heading>
            <p className="text-text-muted leading-relaxed">{t("services.unsureText")}</p>
            <Link
              href="/contact"
              className="inline-block bg-text-main text-white px-8 py-3 text-sm tracking-wide hover:bg-text-muted transition-colors rounded-full"
            >
              {t("services.contactCta")}
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
