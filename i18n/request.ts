import { defaultLocale, locales } from "./config"
import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as typeof locales[number])) {
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}`)).default,
    }
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}`)).default,
  }
})
