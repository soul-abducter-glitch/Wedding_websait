import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AdminModule } from './admin/admin.module.js';
import { PublicModule } from './public/public.module.js';
import { ContactModule } from './contact/contact.module.js';
import { UploadsModule } from './uploads/uploads.module.js';
import { StorageModule } from './storage/storage.module.js';

// Skip AdminJS during automated tests to avoid adapter/bootstrap issues when Prisma is not available.
const disableAdmin =
  process.env.ADMINJS_DISABLED === 'true' || process.env.JEST_WORKER_ID !== undefined;

const moduleImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env', '.env.local'],
  }),
  PrismaModule,
  AuthModule,
  PublicModule,
  ContactModule,
  UploadsModule,
  StorageModule,
];

if (!disableAdmin) {
  moduleImports.push(AdminModule);
}

@Module({
  imports: moduleImports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
