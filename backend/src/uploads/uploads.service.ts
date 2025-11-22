import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { mkdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { extension as mimeExtension } from 'mime-types';

type UploadFile = {
  filename: string;
  mimetype: string;
  buffer: Buffer;
};

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  private readonly bucket?: string;
  private readonly s3?: S3Client;
  private readonly endpoint?: string;
  private readonly region?: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = configService.get<string>('S3_BUCKET');
    this.endpoint = configService.get<string>('S3_ENDPOINT');
    this.region = configService.get<string>('S3_REGION');
    const accessKeyId = configService.get<string>('S3_ACCESS_KEY_ID');
    const secretAccessKey = configService.get<string>('S3_SECRET_ACCESS_KEY');
    if (this.bucket && accessKeyId && secretAccessKey) {
      this.s3 = new S3Client({
        region: this.region ?? 'us-east-1',
        endpoint: this.endpoint,
        forcePathStyle: true,
        credentials: { accessKeyId, secretAccessKey },
      });
    }
  }

  async saveFiles(files: UploadFile[]) {
    const results = [];
    for (const file of files) {
      const { originalUrl, webpUrl } = await this.processAndStore(file);
      results.push({ originalUrl, webpUrl });
    }
    return { files: results };
  }

  private async processAndStore(file: UploadFile) {
    const baseName = uuid();
    const ext = extname(file.filename) || this.guessExt(file.mimetype) || '.bin';
    const originalKey = `uploads/${baseName}${ext}`;
    const webpKey = `uploads/${baseName}.webp`;

    // Convert to WebP (quality 80)
    const webpBuffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer();

    let originalUrl: string;
    let webpUrl: string;

    if (this.s3 && this.bucket) {
      await Promise.all([
        this.s3.send(
          new PutObjectCommand({
            Bucket: this.bucket,
            Key: originalKey,
            Body: file.buffer,
            ContentType: file.mimetype,
          }),
        ),
        this.s3.send(
          new PutObjectCommand({
            Bucket: this.bucket,
            Key: webpKey,
            Body: webpBuffer,
            ContentType: 'image/webp',
          }),
        ),
      ]);
      const base = this.endpoint
        ? `${this.endpoint.replace(/\/$/, '')}/${this.bucket}`
        : `https://${this.bucket}.s3.${this.region ?? 'us-east-1'}.amazonaws.com`;
      originalUrl = `${base}/${originalKey}`;
      webpUrl = `${base}/${webpKey}`;
    } else {
      const uploadsDir = join(process.cwd(), 'uploads');
      await mkdir(uploadsDir, { recursive: true });
      await Promise.all([
        writeFile(join(uploadsDir, `${baseName}${ext}`), file.buffer),
        writeFile(join(uploadsDir, `${baseName}.webp`), webpBuffer),
      ]);
      originalUrl = `/uploads/${baseName}${ext}`;
      webpUrl = `/uploads/${baseName}.webp`;
    }

    return { originalUrl, webpUrl };
  }

  private guessExt(mimetype?: string | null) {
    if (!mimetype) return null;
    const ext = mimeExtension(mimetype);
    return ext ? `.${ext}` : null;
  }
}
