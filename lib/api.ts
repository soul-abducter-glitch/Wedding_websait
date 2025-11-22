const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:4000/api';
const isServer = typeof window === 'undefined';

type FetchOptions = RequestInit & { revalidate?: number };

async function fetchJson<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const { revalidate, headers, ...rest } = options;

  const mergedHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(headers as any),
  };

  const init: RequestInit & { next?: { revalidate: number } } = {
    headers: mergedHeaders,
    ...rest,
  };

  if (rest.body && typeof rest.body !== 'string') {
    init.body = JSON.stringify(rest.body);
  }

  if (isServer && typeof revalidate === 'number') {
    init.next = { revalidate };
  }

  const res = await fetch(url, init as any);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export type ApiProject = {
  id: string;
  slug: string;
  coverImage: string;
  title: string;
  location: string;
  date: string;
  description: string;
  gallery: string[];
  isFeatured: boolean;
  sortOrder: number;
};

export type ApiProjectsResponse = {
  items: ApiProject[];
  total: number;
  limit: number;
  offset: number;
};

export type ApiService = {
  id: string;
  title: string;
  price: string;
  features: string[];
  isPopular: boolean;
};

export type ApiReview = {
  id: string;
  coupleNames: string;
  avatar: string;
  text: string;
  location: string;
  relatedProjectId?: string | null;
  createdAt: string;
};

export async function getProjects(lang: string, params?: { limit?: number; offset?: number }) {
  const qs = new URLSearchParams();
  if (lang) qs.set('lang', lang);
  if (params?.limit) qs.set('limit', String(params.limit));
  if (params?.offset) qs.set('offset', String(params.offset));

  const query = qs.toString();
  const suffix = query ? `?${query}` : '';
  return fetchJson<ApiProjectsResponse>(`/projects${suffix}`, { revalidate: 120 });
}

export async function getProject(slug: string, lang: string) {
  const qs = new URLSearchParams();
  if (lang) qs.set('lang', lang);
  const query = qs.toString();
  const suffix = query ? `?${query}` : '';
  return fetchJson<ApiProject>(`/projects/${slug}${suffix}`, { revalidate: 300 });
}

export async function getServices(lang: string) {
  const qs = lang ? `?lang=${lang}` : '';
  return fetchJson<ApiService[]>(`/services${qs}`, { revalidate: 300 });
}

export async function getReviews(lang: string) {
  const qs = lang ? `?lang=${lang}` : '';
  return fetchJson<ApiReview[]>(`/reviews${qs}`, { revalidate: 180 });
}

export { API_BASE, fetchJson };
