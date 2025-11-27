"use client"

import { Link } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import { Container } from "@/components/ui/container"

type NavItem = { href: string; label: string }

export function SiteFooter() {
  const t = useTranslations()
  const navItems = t.raw("navigation.items") as NavItem[]
  const contacts = t.raw("footer.contacts") as { phone: string; email: string; telegram: string }
  const social = t.raw("footer.social") as { instagram: string; pinterest: string }

  return (
    <footer className="bg-bg-base border-t border-border-subtle/80 py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 mb-12">
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-display text-2xl">{t("brand")}</h3>
            <p className="text-sm text-text-muted leading-loose max-w-xs mt-6">{t("footer.tagline")}</p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">{t("footer.navigationTitle")}</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-text-main transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">{t("footer.contactTitle")}</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a href={`tel:${contacts.phone}`} className="hover:text-text-main transition-colors">
                  {contacts.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="hover:text-text-main transition-colors">
                  {contacts.email}
                </a>
              </li>
              <li>
                <a href="https://t.me/annapetrova" className="hover:text-text-main transition-colors">
                  {contacts.telegram}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">{t("footer.socialTitle")}</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a
                  href="https://instagram.com/annapetrova"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-text-main transition-colors"
                >
                  {social.instagram}
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com/annapetrova"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-text-main transition-colors"
                >
                  {social.pinterest}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border-subtle pt-8 text-sm text-text-muted">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-text-main transition-colors">
              {t("footer.legal.privacy")}
            </Link>
            <Link href="/offer" className="hover:text-text-main transition-colors">
              {t("footer.legal.offer")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
