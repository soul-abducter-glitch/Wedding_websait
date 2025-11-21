"use client"

import { useState } from "react"
import { Link } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/ui/container"
import { LanguageSwitcher } from "./language-switcher"
import { motion, AnimatePresence } from "framer-motion"

type NavItem = { href: string; label: string }

export function SiteHeader() {
  const t = useTranslations()
  const navItems = t.raw("navigation.items") as NavItem[]
  const contactCta = t("navigation.contactCta")
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border-subtle bg-bg-base/90 backdrop-blur">
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" className="font-display text-2xl text-text-main tracking-tight" onClick={() => setOpen(false)}>
            {t("brand")}
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-muted hover:text-text-main transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-border-subtle px-4 py-2 text-sm tracking-wide transition-colors hover:bg-bg-alt"
            >
              {contactCta}
            </Link>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle"
            aria-label={t("navigation.menuLabel")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden border-t border-border-subtle bg-bg-base/95 backdrop-blur"
          >
            <Container>
              <div className="py-4 flex flex-col gap-4">
                <LanguageSwitcher />
                <nav className="flex flex-col gap-2 text-base">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-sm px-2 py-2 text-text-muted hover:text-text-main hover:bg-bg-alt transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-border-subtle px-4 py-2 text-sm tracking-wide transition-colors hover:bg-bg-alt"
                  onClick={() => setOpen(false)}
                >
                  {contactCta}
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
