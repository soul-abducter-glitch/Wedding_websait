import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    console.log('Health check endpoint called');
    return this.appService.getHealth();
  }

  @Get()
  getRoot() {
    return { message: 'Wedding API is running' };
  }
}
