import type React from "react"

import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import { getLocale, getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { locales, type AppLocale } from "@/i18n/config"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

type LayoutProps = {
  children: React.ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
  const localeFromRequest = await getLocale()
  if (!locales.includes(localeFromRequest as AppLocale)) {
    return {
      title: "Wedding Photographer",
      description: "Modern editorial wedding photography",
    }
  }
  const locale = localeFromRequest as AppLocale

  const t = await getTranslations({ locale, namespace: "meta" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        ru: "/ru",
        en: "/en",
      },
    },
  }
}

export default async function RootLayout({ children }: LayoutProps) {
  const localeFromRequest = await getLocale()
  if (!locales.includes(localeFromRequest as AppLocale)) {
    notFound()
  }
  const locale = localeFromRequest as AppLocale

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-bg-base text-text-main`}>
        {children}
      </body>
    </html>
  )
}
