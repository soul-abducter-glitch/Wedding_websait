import { Module } from '@nestjs/common';
import { PublicService } from './public.service.js';
import { PublicController } from './public.controller.js';
import { StorageModule } from '../storage/storage.module.js';

@Module({
  imports: [StorageModule],
  providers: [PublicService],
  controllers: [PublicController],
})
export class PublicModule {}
