import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { locales, type AppLocale } from "@/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params
  if (!locales.includes(localeParam as AppLocale)) {
    notFound()
  }

  const locale = localeParam as AppLocale

  setRequestLocale(locale)
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 mt-[72px] md:mt-[88px]">{children}</main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  )
}
