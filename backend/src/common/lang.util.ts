export type Lang = 'ru' | 'en';

export const resolveLang = (lang?: string): Lang => {
  if (lang === 'en') return 'en';
  return 'ru';
};

export function pickLocalized<T extends Record<string, any>>(record: T, fields: string[], lang: Lang): T & Record<string, any> {
  const fallback = lang === 'ru' ? 'en' : 'ru';
  const output: Record<string, any> = { ...record };

  for (const field of fields) {
    const primaryKey = `${field}_${lang}`;
    const fallbackKey = `${field}_${fallback}`;
    output[field] = record[primaryKey] ?? record[fallbackKey] ?? null;
  }

  return output as T;
}
