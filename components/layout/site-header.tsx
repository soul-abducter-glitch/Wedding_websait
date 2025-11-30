"use client"

import { useEffect, useState } from "react"
import { Link, usePathname } from "@/lib/navigation"
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
  const pathname = usePathname()

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = open ? "hidden" : original || ""
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-base/90 backdrop-blur transition-shadow shadow-sm">
      <Container>
        <div className="flex h-[80px] items-center justify-between gap-4">
          <Link href="/" className="font-display text-2xl text-text-main tracking-tight" onClick={() => setOpen(false)}>
            {t("brand")}
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-[44px] items-center whitespace-nowrap border-b border-transparent text-text-muted transition-colors hover:border-text-main hover:text-text-main"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border-subtle px-4 py-2 text-sm tracking-wide transition-colors hover:bg-bg-alt"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed inset-0 z-60 bg-bg-base/95 backdrop-blur overflow-y-auto"
          >
            <Container className="min-h-screen">
              <div className="flex min-h-screen flex-col pt-20 pb-12">
                <div className="px-4">
                  <div className="mb-6">
                    <LanguageSwitcher />
                  </div>
                  <nav className="flex flex-col gap-3 text-base">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-sm px-4 py-2.5 text-text-muted transition-colors hover:text-text-main hover:bg-bg-alt"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-border-subtle px-4 py-3 text-sm tracking-wide transition-colors hover:bg-bg-alt"
                    onClick={() => setOpen(false)}
                  >
                    {contactCta}
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
