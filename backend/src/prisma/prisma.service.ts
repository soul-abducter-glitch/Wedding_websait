import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const url = configService.get<string>('DATABASE_URL');
    super({
      datasources: url
        ? {
            db: { url },
          }
        : undefined,
    });

    if (!url) {
      this.logger.warn('DATABASE_URL is not set. Prisma will stay disconnected until a URL is provided.');
    }
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma connected to database');
    } catch (error) {
      this.logger.error('Prisma failed to connect. Check DATABASE_URL and database availability.', error as Error);
    }
  }
}
