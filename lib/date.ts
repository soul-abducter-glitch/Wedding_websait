export function formatDisplayDate(dateIso: string | Date, locale: string) {
  try {
    const date = typeof dateIso === 'string' ? new Date(dateIso) : dateIso;
    return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return typeof dateIso === 'string' ? dateIso : dateIso.toString();
  }
}
