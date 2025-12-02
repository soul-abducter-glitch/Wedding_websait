"use client"

import Link from "next/link"
import { Container } from "./container"
import { useEffect, useState } from "react"

export function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen)

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [mobileMenuOpen])

  const navItems = [
    { href: "/portfolio", label: "Портфолио" },
    { href: "/services", label: "Услуги" },
    { href: "/experience", label: "Подход" },
    { href: "/about", label: "Обо мне" },
    { href: "/reviews", label: "Отзывы" },
    { href: "/journal", label: "Журнал" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Контакты" },
  ]

  return (
    <header className="border-b border-border-subtle bg-bg-base/95 backdrop-blur-sm sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="font-display text-2xl text-text-main">
            Anna Petrova
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-text-muted hover:text-text-main transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
            aria-label="Toggle menu"
          >
            <span
              className={`w-full h-0.5 bg-text-main transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-text-main transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-full h-0.5 bg-text-main transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] h-screen w-screen bg-[#FAF8F4] flex flex-col items-center justify-center">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center"
            aria-label="Закрыть меню"
          >
            <span className="absolute h-0.5 w-6 rotate-45 bg-text-main" />
            <span className="absolute h-0.5 w-6 -rotate-45 bg-text-main" />
          </button>

          <nav className="flex flex-col items-center gap-8 text-4xl font-serif text-text-main">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="transition-opacity hover:opacity-80"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
