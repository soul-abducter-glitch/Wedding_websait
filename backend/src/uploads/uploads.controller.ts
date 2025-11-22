import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadsService } from './uploads.service';

type MultipartFastifyRequest = FastifyRequest & {
  files: () => AsyncIterableIterator<MultipartFile>;
  parts: () => AsyncIterableIterator<MultipartFile>;
};

@Controller('admin/uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async upload(@Req() req: MultipartFastifyRequest) {
    const files: { filename: string; mimetype: string; buffer: Buffer }[] = [];
    const iterator = req.parts ? req.parts() : req.files();

    for await (const part of iterator) {
      if (part.type === 'file') {
        const buffer = await part.toBuffer();
        files.push({
          filename: part.filename,
          mimetype: part.mimetype,
          buffer,
        });
      }
    }

    return this.uploadsService.saveFiles(files);
  }
}
