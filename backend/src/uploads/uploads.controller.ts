import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import type { Express } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UploadsService } from './uploads.service.js';

@Controller('admin/uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 20 }], {
      limits: {
        fileSize: 25 * 1024 * 1024,
      },
    }),
  )
  @Post()
  async upload(@UploadedFiles() files: { files?: Express.Multer.File[] }) {
    const payload = (files.files ?? []).map((file) => ({
      filename: file.originalname,
      mimetype: file.mimetype,
      buffer: file.buffer,
    }));
    return this.uploadsService.saveFiles(payload);
  }
}
