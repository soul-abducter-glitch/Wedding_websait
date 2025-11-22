export interface Story {
  slug: string
  coupleNames: string
  location: string
  country?: string
  date: string
  preview: string
  previewAlt?: string
  shortDescription: string
  featured?: boolean
  gallery: string[]
  description: string
}

export interface Package {
  id: string
  name: string
  hours: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  badge?: string
  ctaLabel?: string
}

export interface Testimonial {
  coupleNames: string
  location: string
  quote: string
  avatar?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }

export interface JournalPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  content: ContentBlock[]
  relatedSlugs?: string[]
}

export interface LegalSection {
  title: string
  body?: string
  items?: string[]
}

export interface ContactChannel {
  label: string
  value: string
  href: string
  description?: string
}
