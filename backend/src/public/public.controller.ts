import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { LangPaginationDto, LangQueryDto } from '../common/dto/lang.dto';
import { PublicService } from './public.service';

@Controller()
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('homepage')
  async homepage(@Query() query: LangQueryDto) {
    return this.publicService.getHomepage(query.lang);
  }

  @Get('projects')
  async projects(@Query() query: LangPaginationDto) {
    return this.publicService.getProjects(query.lang, {
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get('projects/:slug')
  async projectDetail(@Param('slug') slug: string, @Query() query: LangQueryDto) {
    const project = await this.publicService.getProjectBySlug(slug, query.lang);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  @Get('services')
  async services(@Query() query: LangQueryDto) {
    return this.publicService.getServices(query.lang);
  }

  @Get('reviews')
  async reviews(@Query() query: LangQueryDto) {
    return this.publicService.getReviews(query.lang);
  }

  @Get('journal')
  async journal(@Query() query: LangPaginationDto) {
    return this.publicService.getJournal(query.lang, {
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get('journal/:slug')
  async journalDetail(@Param('slug') slug: string, @Query() query: LangQueryDto) {
    const article = await this.publicService.getJournalBySlug(slug, query.lang);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }
}
