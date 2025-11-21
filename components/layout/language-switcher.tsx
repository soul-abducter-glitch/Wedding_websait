"use client"

import { useLocale } from "next-intl/client"
import Link from "next-intl/link"
import { usePathname } from "next/navigation"
import { locales } from "@/i18n/config"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname() || "/"

  // Убираем префикс локали из текущего пути, чтобы при переключении не получалось /en/ru/...
  const pathWithoutLocale = pathname.replace(/^\/(ru|en)(?=\/|$)/, "") || "/"

  return (
    <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
      {locales.map((targetLocale, index) => (
        <div key={targetLocale} className="flex items-center">
          <Link
            href={pathWithoutLocale}
            locale={targetLocale}
            className={cn(
              "px-2 py-1 rounded-sm transition-colors",
              locale === targetLocale ? "text-text-main bg-bg-alt" : "text-text-muted hover:text-text-main",
            )}
          >
            {targetLocale.toUpperCase()}
          </Link>
          {index < locales.length - 1 && <span className="text-text-muted">|</span>}
        </div>
      ))}
    </div>
  )
}
