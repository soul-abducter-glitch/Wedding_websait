import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { WeddingsQueryDto } from './dto/weddings-query.dto';
import { PostsQueryDto } from './dto/posts-query.dto';

type StoryWithImages = Prisma.WeddingStoryGetPayload<{
  include: { images: { orderBy: { sortOrder: 'asc' } } };
}>;

@Injectable()
export class PublicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async getHomepage() {
    const homepageContent = await this.prisma.homepageContent.findFirst({
      orderBy: { updatedAt: 'desc' },
    });
    const featuredWeddings = await this.prisma.weddingStory.findMany({
      where: { isFeatured: true },
      orderBy: { updatedAt: 'desc' },
      take: 3,
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    const reviews = await this.prisma.review.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    return {
      homepageContent,
      featuredWeddings: featuredWeddings.map((story) => this.mapStoryListItem(story)),
      reviews: reviews.map(this.mapReview),
    };
  }

  async getWeddings(params: WeddingsQueryDto) {
    const take = params.limit ?? 10;
    const skip = params.offset ?? 0;
    const where: Prisma.WeddingStoryWhereInput = {};
    if (typeof params.featured === 'boolean') {
      where.isFeatured = params.featured;
    }

    const [items, total] = await Promise.all([
      this.prisma.weddingStory.findMany({
        where,
        take,
        skip,
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.weddingStory.count({ where }),
    ]);

    return {
      total,
      limit: take,
      offset: skip,
      items: items.map((story) => this.mapStoryListItem(story)),
    };
  }

  async getWeddingBySlug(slug: string) {
    const story = await this.prisma.weddingStory.findUnique({
      where: { slug },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!story) {
      return null;
    }
    return this.mapStoryDetail(story);
  }

  async getReviews() {
    const reviews = await this.prisma.review.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'desc' },
    });
    return reviews.map(this.mapReview);
  }

  async getPosts(params: PostsQueryDto) {
    const take = params.limit ?? 10;
    const skip = params.offset ?? 0;
    const [items, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        take,
        skip,
      }),
      this.prisma.blogPost.count({ where: { isPublished: true } }),
    ]);
    return {
      total,
      limit: take,
      offset: skip,
      items: items.map(this.mapPost),
    };
  }

  async getPostBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });
    if (!post) return null;
    return this.mapPost(post);
  }

  private mapStoryListItem(story: Prisma.WeddingStoryGetPayload<{}>) {
    return {
      id: story.id,
      slug: story.slug,
      title: story.title,
      location: story.location,
      date: story.date,
      shortDescription: story.shortDescription,
      coverImageUrl: this.storage.getPublicUrl(story.coverImageUrl),
      isFeatured: story.isFeatured,
    };
  }

  private mapStoryDetail(story: StoryWithImages) {
    return {
      id: story.id,
      slug: story.slug,
      title: story.title,
      location: story.location,
      date: story.date,
      shortDescription: story.shortDescription,
      fullDescription: story.fullDescription,
      coverImageUrl: this.storage.getPublicUrl(story.coverImageUrl),
      isFeatured: story.isFeatured,
      images: story.images.map((image) => ({
        id: image.id,
        imageUrl: this.storage.getPublicUrl(image.imageUrl),
        alt: image.alt,
        sortOrder: image.sortOrder,
      })),
    };
  }

  private mapReview(review: Prisma.ReviewGetPayload<{}>) {
    return {
      id: review.id,
      names: review.names,
      location: review.location,
      text: review.text,
      weddingStoryId: review.weddingStoryId,
      createdAt: review.createdAt,
    };
  }

  private mapPost(post: Prisma.BlogPostGetPayload<{}>) {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImageUrl: post.coverImageUrl,
      publishedAt: post.publishedAt,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      content: post.content,
    };
  }
}
