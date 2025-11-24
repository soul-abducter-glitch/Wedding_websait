import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { UploadOptions } from '@adminjs/upload';

export type StorageProviderConfig = UploadOptions['provider'];

@Injectable()
export class StorageService {
  private readonly bucket?: string;
  private readonly endpoint?: string;
  private readonly region?: string;
  private readonly accessKeyId?: string;
  private readonly secretAccessKey?: string;
  private readonly useS3: boolean;
  private readonly localFolder: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get<string>('S3_BUCKET');
    this.endpoint = this.configService.get<string>('S3_ENDPOINT');
    this.region = this.configService.get<string>('S3_REGION');
    this.accessKeyId = this.configService.get<string>('S3_ACCESS_KEY_ID');
    this.secretAccessKey = this.configService.get<string>('S3_SECRET_ACCESS_KEY');
    const looksLikePlaceholder = (value?: string | null) =>
      !value || value.startsWith('change-') || value === 'change-me' || value === 'change-me-too';

    const hasRealS3Creds =
      this.bucket && this.accessKeyId && this.secretAccessKey && !looksLikePlaceholder(this.accessKeyId) && !looksLikePlaceholder(this.secretAccessKey);

    this.useS3 = Boolean(hasRealS3Creds);
    this.localFolder = join(process.cwd(), 'uploads');
    if (!this.useS3 && !existsSync(this.localFolder)) {
      mkdirSync(this.localFolder, { recursive: true });
    }
  }

  getProviderConfig(): StorageProviderConfig {
    if (this.useS3 && this.bucket && this.accessKeyId && this.secretAccessKey) {
      return {
        aws: {
          bucket: this.bucket,
          region: this.region ?? 'us-east-1',
          accessKeyId: this.accessKeyId,
          secretAccessKey: this.secretAccessKey,
        },
      };
    }

    return {
      local: {
        bucket: this.localFolder,
        opts: { baseUrl: '/uploads' },
      },
    };
  }

  getPublicUrl(key?: string | null) {
    if (!key) return null;
    if (this.useS3 && this.bucket) {
      const base = this.endpoint
        ? `${this.endpoint.replace(/\/$/, '')}/${this.bucket}`
        : `https://${this.bucket}.s3.${this.region ?? 'us-east-1'}.amazonaws.com`;
      return `${base}/${key}`;
    }
    return `/uploads/${key}`;
  }

  isS3Enabled() {
    return this.useS3;
  }

  getBucketName() {
    return this.bucket;
  }

  getLocalPath() {
    return this.localFolder;
  }
}
