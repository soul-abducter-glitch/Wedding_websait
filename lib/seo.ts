import type { Metadata } from "next"

export function buildAlternateLinks(pathname: string): Metadata["alternates"] {
  return {
    languages: {
      ru: `/ru${pathname}`,
      en: `/en${pathname}`,
    },
  }
}
