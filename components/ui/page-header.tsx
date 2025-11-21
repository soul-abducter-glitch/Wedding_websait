"use client"

import Link from "next/link"
import { Container } from "./container"
import { useState } from "react"

export function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden bg-bg-base border-b border-border-subtle transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container>
          <nav className="py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-text-muted hover:text-text-main transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  )
}
