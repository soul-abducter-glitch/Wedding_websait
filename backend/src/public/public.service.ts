import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Lang, pickLocalized, resolveLang } from '../common/lang.util';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getHomepage(langInput?: string) {
    const lang = resolveLang(langInput);
    const featuredProjects = await this.prisma.project.findMany({
      where: { is_featured: true },
      orderBy: [{ sort_order: 'asc' }, { created_at: 'desc' }],
      take: 3,
    });
    const reviews = await this.prisma.review.findMany({
      orderBy: { created_at: 'desc' },
      take: 5,
    });
    return {
      featuredProjects: featuredProjects.map((p) => this.mapProject(p, lang)),
      reviews: reviews.map((r) => this.mapReview(r, lang)),
      author: {
        name: 'Wedding photographer',
        bio: 'Contact via form on the site.',
      },
    };
  }

  async getProjects(langInput?: string, params?: { limit?: number; offset?: number }) {
    const lang = resolveLang(langInput);
    const take = params?.limit ?? 20;
    const skip = params?.offset ?? 0;
    const [items, total] = await Promise.all([
      this.prisma.project.findMany({
        orderBy: [{ sort_order: 'asc' }, { created_at: 'desc' }],
        take,
        skip,
      }),
      this.prisma.project.count(),
    ]);
    return {
      total,
      limit: take,
      offset: skip,
      items: items.map((p) => this.mapProject(p, lang)),
    };
  }

  async getProjectBySlug(slug: string, langInput?: string) {
    const lang = resolveLang(langInput);
    const project = await this.prisma.project.findUnique({ where: { slug } });
    if (!project) return null;
    return this.mapProject(project, lang);
  }

  async getServices(langInput?: string) {
    const lang = resolveLang(langInput);
    const services = await this.prisma.service.findMany();
    return services.map((s) => this.mapService(s, lang));
  }

  async getReviews(langInput?: string) {
    const lang = resolveLang(langInput);
    const reviews = await this.prisma.review.findMany({
      orderBy: { created_at: 'desc' },
    });
    return reviews.map((r) => this.mapReview(r, lang));
  }

  async getJournal(langInput?: string, params?: { limit?: number; offset?: number }) {
    const lang = resolveLang(langInput);
    const take = params?.limit ?? 20;
    const skip = params?.offset ?? 0;
    const [items, total] = await Promise.all([
      this.prisma.journal.findMany({
        orderBy: { created_at: 'desc' },
        take,
        skip,
      }),
      this.prisma.journal.count(),
    ]);
    return {
      total,
      limit: take,
      offset: skip,
      items: items.map((j) => this.mapJournal(j, lang)),
    };
  }

  async getJournalBySlug(slug: string, langInput?: string) {
    const lang = resolveLang(langInput);
    const article = await this.prisma.journal.findUnique({ where: { slug } });
    if (!article) return null;
    return this.mapJournal(article, lang);
  }

  private mapProject(project: Prisma.ProjectGetPayload<{}>, lang: Lang) {
    const localized = pickLocalized(project, ['title', 'location', 'description'], lang);
    return {
      id: project.id,
      slug: project.slug,
      coverImage: project.cover_image,
      title: localized.title,
      location: localized.location,
      date: project.date,
      description: localized.description,
      gallery: project.gallery,
      isFeatured: project.is_featured,
      sortOrder: project.sort_order,
    };
  }

  private mapService(service: Prisma.ServiceGetPayload<{}>, lang: Lang) {
    const localized = pickLocalized(service, ['title', 'price', 'features'], lang);
    return {
      id: service.id,
      title: localized.title,
      price: localized.price,
      features: localized.features,
      isPopular: service.is_popular,
    };
  }

  private mapReview(review: Prisma.ReviewGetPayload<{}>, lang: Lang) {
    const localized = pickLocalized(review, ['text', 'location'], lang);
    return {
      id: review.id,
      coupleNames: review.couple_names,
      avatar: review.avatar,
      text: localized.text,
      location: localized.location,
      relatedProjectId: review.related_project_id,
      createdAt: review.created_at,
    };
  }

  private mapJournal(journal: Prisma.JournalGetPayload<{}>, lang: Lang) {
    const localized = pickLocalized(journal, ['title', 'content'], lang);
    return {
      id: journal.id,
      slug: journal.slug,
      title: localized.title,
      content: localized.content,
      coverImage: journal.cover_image,
      createdAt: journal.created_at,
    };
  }
}
