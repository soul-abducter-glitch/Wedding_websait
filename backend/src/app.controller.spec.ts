import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: { get: () => undefined },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return health payload', () => {
      const response = appController.getHealth();
      expect(response.status).toBe('ok');
      expect(response.timestamp).toBeDefined();
    });
  });

  describe('root', () => {
    it('should return root message', () => {
      expect(appController.getRoot()).toEqual({ message: 'Wedding API is running' });
    });
  });
});
