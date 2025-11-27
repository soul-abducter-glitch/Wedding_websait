import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePublicReviewDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  names: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  location: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  text: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  contact?: string;
}
