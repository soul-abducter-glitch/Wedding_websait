import { Link } from "@/lib/navigation"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { PackageCard } from "@/components/ui/package-card"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { AnimatedSection } from "@/components/ui/animated-section"
import { buildAlternateLinks } from "@/lib/seo"
import { getServices, type ApiService } from "@/lib/api"
import type { Package } from "@/types/content"

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
  const includes = t.raw("services.includes") as { title: string; text: string }[]
  const ctaLabel = t("services.contactCta")
  const packages = t.raw("packages") as Package[]

  let services: ApiService[] = []
  try {
    services = await getServices(locale)
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    console.warn(`Services API unavailable, using static packages. Reason: ${reason}`)
    services = packages.map((pkg) => ({
      id: pkg.id,
      title: pkg.name,
      price: pkg.price,
      features: pkg.features,
      isPopular: Boolean(pkg.popular),
    }))
  }

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

          {services.length === 0 ? (
            <p className="text-center text-text-muted">Пакеты пока не добавлены.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {services.map((pkg, index) => (
                <AnimatedSection key={pkg.id} delay={index * 0.05}>
                  <PackageCard
                    title={pkg.title}
                    description={pkg.features[0]}
                    features={pkg.features}
                    price={pkg.price}
                    highlighted={pkg.isPopular}
                    badge={pkg.isPopular ? "Popular" : undefined}
                    ctaLabel={ctaLabel}
                    ctaHref={`/contact?package=${encodeURIComponent(pkg.id)}#contact-form`}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}

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
