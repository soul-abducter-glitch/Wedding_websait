import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { join } from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service.js';
import { AppModule } from './app.module.js';

const ensureAdminBundleDir = async (adminTmpDir: string) => {
  const bundlePath = join(adminTmpDir, 'bundle.js');
  await fs.mkdir(adminTmpDir, { recursive: true });
  try {
    await fs.access(bundlePath);
  } catch {
    await fs.writeFile(bundlePath, '// AdminJS components bundle placeholder');
  }
  return { adminTmpDir, bundlePath };
};

const ensureAdminOnBoot = async (
  app: NestExpressApplication,
  configService: ConfigService,
): Promise<void> => {
  const shouldSeed = configService.get<string>('ADMIN_SEED_ON_BOOT') === 'true';
  if (!shouldSeed) return;

  const email = configService.get<string>('ADMIN_DEFAULT_EMAIL');
  const password = configService.get<string>('ADMIN_DEFAULT_PASSWORD');
  if (!email || !password) {
    console.warn('ADMIN_SEED_ON_BOOT=true but ADMIN_DEFAULT_EMAIL or ADMIN_DEFAULT_PASSWORD is missing');
    return;
  }

  const prisma = app.get(PrismaService);
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user ${email} already exists, skipping auto-seed.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log(`Admin user created on boot: ${email}`);
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  const configService = app.get(ConfigService);

  const allowedOrigins = configService
    .get<string>('CORS_ALLOWED_ORIGINS')
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(cors({ origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : true }));
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(cookieParser());

  const windowMs = Number(configService.get<string>('RATE_LIMIT_WINDOW_MS')) || 60 * 1000;
  const max = Number(configService.get<string>('RATE_LIMIT_MAX')) || 100;
  app.use(
    rateLimit({
      windowMs,
      max,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  const adminTmpDir =
    configService.get<string>('ADMIN_JS_TMP_DIR') ?? join(process.cwd(), '.adminjs');
  await ensureAdminBundleDir(adminTmpDir);
  app.use('/admin/frontend/assets', express.static(adminTmpDir));

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  await ensureAdminOnBoot(app, configService);

  app.setGlobalPrefix('api/v1', {
    // exclude all AdminJS routes from the API prefix
    exclude: [{ path: 'admin/(.*)', method: RequestMethod.ALL }],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = Number(configService.get<string>('PORT')) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`API is running on http://0.0.0.0:${port}`);
}

bootstrap();
