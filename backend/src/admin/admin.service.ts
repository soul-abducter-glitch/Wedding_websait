import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import AdminJS from 'adminjs';
import * as AdminJSFastify from '@adminjs/fastify';
import * as AdminJSPrisma from '@adminjs/prisma';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
});

@Injectable()
export class AdminService implements OnModuleInit {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly adapterHost: HttpAdapterHost,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit() {
    await this.bootstrapAdmin();
  }

  private async bootstrapAdmin() {
    const fastifyInstance = this.adapterHost.httpAdapter.getInstance();

    const admin = new AdminJS({
      resources: [
        {
          resource: { model: this.prisma.user, client: this.prisma },
          options: {
            properties: {
              password_hash: { isVisible: false },
              created_at: { isVisible: { list: true, edit: false, show: true, filter: true } },
            },
          },
        },
        {
          resource: { model: this.prisma.project, client: this.prisma },
        },
        {
          resource: { model: this.prisma.service, client: this.prisma },
        },
        {
          resource: { model: this.prisma.review, client: this.prisma },
        },
        {
          resource: { model: this.prisma.journal, client: this.prisma },
        },
        {
          resource: { model: this.prisma.lead, client: this.prisma },
          options: {
            navigation: 'Leads',
          },
        },
      ],
      rootPath: '/admin',
      branding: {
        companyName: 'Wedding Admin',
        withMadeWithLove: false,
      },
    });

    const cookiePassword = this.configService.get<string>('ADMIN_COOKIE_SECRET') ?? 'super-secret-cookie';

    await AdminJSFastify.buildAuthenticatedRouter(
      admin,
      {
        authenticate: async (email: string, password: string) => {
          const user = await this.usersService.findByEmail(email);
          if (!user) return null;
          const valid = await bcrypt.compare(password, user.password_hash);
          if (!valid) return null;
          return user;
        },
        cookieName: 'adminjs',
        cookiePassword,
      },
      fastifyInstance,
    );

    this.logger.log(`AdminJS mounted at ${admin.options.rootPath}`);
  }
}
