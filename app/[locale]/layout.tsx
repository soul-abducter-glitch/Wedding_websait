import type React from "react"
import { locales } from "@/i18n/config"
import { setRequestLocale } from "next-intl/server"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return children
}
