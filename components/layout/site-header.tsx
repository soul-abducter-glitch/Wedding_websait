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
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-[44px] items-center whitespace-nowrap border-b transition-colors hover:border-text-main hover:text-text-main ${
                    isActive ? "border-text-main text-text-main" : "border-transparent text-text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] h-screen w-full bg-[#FAF8F4] flex flex-col overflow-hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-transparent"
              aria-label={t("navigation.closeMenuLabel")}
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>

            <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-16">
              <nav className="flex flex-col items-center gap-4 text-center">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`font-display text-3xl leading-tight transition-colors hover:text-gray-600 ${
                        isActive ? "italic text-[#181818]" : "text-[#181818]/80"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="h-6" />

              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#181818] px-6 py-3 text-base font-medium tracking-wide text-[#FAF8F4] transition-colors hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                {contactCta}
              </Link>
            </div>

            <div className="mt-auto pb-10 pt-4 flex justify-center text-sm uppercase tracking-widest">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
