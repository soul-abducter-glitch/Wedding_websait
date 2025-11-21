import type React from "react"

import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { defaultLocale, locales, type AppLocale } from "@/i18n/config"

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
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam as AppLocale) ?? defaultLocale

  if (!locales.includes(locale)) {
    return {
      title: "Wedding Photographer",
      description: "Modern editorial wedding photography",
    }
  }

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

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params
  const locale = (localeParam as AppLocale) ?? defaultLocale

  if (!locales.includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-bg-base text-text-main`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 mt-[72px] md:mt-[88px]">{children}</main>
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
