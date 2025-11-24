import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service.js';
import { WeddingsQueryDto } from './dto/weddings-query.dto.js';
import { PostsQueryDto } from './dto/posts-query.dto.js';

@Controller()
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('homepage')
  getHomepage() {
    return this.publicService.getHomepage();
  }

  @Get('weddings')
  getWeddings(@Query() query: WeddingsQueryDto) {
    return this.publicService.getWeddings(query);
  }

  @Get('weddings/:slug')
  async getWedding(@Param('slug') slug: string) {
    const story = await this.publicService.getWeddingBySlug(slug);
    if (!story) {
      throw new NotFoundException('Wedding story not found');
    }
    return story;
  }

  @Get('reviews')
  getReviews() {
    return this.publicService.getReviews();
  }

  @Get('posts')
  getPosts(@Query() query: PostsQueryDto) {
    return this.publicService.getPosts(query);
  }

  @Get('posts/:slug')
  async getPost(@Param('slug') slug: string) {
    const post = await this.publicService.getPostBySlug(slug);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
