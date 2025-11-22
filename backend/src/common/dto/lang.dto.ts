import { IsIn, IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class LangQueryDto {
  @IsOptional()
  @IsIn(['ru', 'en'])
  lang?: 'ru' | 'en';
}

export class LangPaginationDto extends PaginationDto {
  @IsOptional()
  @IsIn(['ru', 'en'])
  lang?: 'ru' | 'en';
}
