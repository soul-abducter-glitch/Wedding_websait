import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AdminJS, { CurrentAdmin } from 'adminjs';
import AdminJSPrisma from '@adminjs/prisma';
import uploadFeature from '@adminjs/upload';
import bcrypt from 'bcryptjs';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { StorageModule } from '../storage/storage.module';
import { StorageProviderConfig, StorageService } from '../storage/storage.service';
import { LeadStatus, UserRole } from '@prisma/client';

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
});

type AdminContext = { currentAdmin?: CurrentAdmin & { role?: string } };

const requireRole =
  (roles: string[]) =>
  ({ currentAdmin }: AdminContext) =>
    Boolean(currentAdmin?.role && roles.includes(currentAdmin.role));

const superAdminOnly = requireRole([UserRole.SUPER_ADMIN]);
const contentEditorAccess = requireRole([UserRole.SUPER_ADMIN, UserRole.CONTENT_EDITOR]);

const IMAGE_VALIDATION = {
  mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  maxSize: 25 * 1024 * 1024,
};

const hashPassword = async (request: Record<string, any>) => {
  if (!request.payload) return request;
  const { password, ...payload } = request.payload;
  if (!password) {
    request.payload = payload;
    return request;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  request.payload = { ...payload, passwordHash };
  return request;
};

const safeFilename = (filename?: string) =>
  filename?.replace(/[^a-z0-9._-]/gi, '_') ?? 'file';

const createUploadFeature = (config: {
  key: string;
  folder: string;
  provider: StorageProviderConfig;
}) =>
  uploadFeature({
    provider: config.provider,
    properties: {
      key: config.key,
      file: `${config.key}File`,
      filePath: `${config.key}Path`,
      filesToDelete: `${config.key}FilesToDelete`,
    },
    validation: IMAGE_VALIDATION,
    uploadPath: (record, filename) => {
      const recordId = record?.params?.id ?? record?.id?.() ?? 'new';
      return `${config.folder}/${recordId}/${Date.now()}-${safeFilename(filename)}`;
    },
  });

const buildResources = (prisma: PrismaService, provider: StorageProviderConfig) => {
  const userResource = {
    resource: { model: prisma.user, client: prisma },
    options: {
      navigation: { name: 'Administration', icon: 'Settings' },
      properties: {
        passwordHash: { isVisible: false },
        password: {
          type: 'password',
          isVisible: { list: false, filter: false, show: false, edit: true },
        },
        role: {
          availableValues: [
            { value: UserRole.SUPER_ADMIN, label: 'SUPER_ADMIN' },
            { value: UserRole.CONTENT_EDITOR, label: 'CONTENT_EDITOR' },
          ],
        },
      },
      actions: {
        new: {
          isAccessible: superAdminOnly,
          before: hashPassword,
        },
        edit: {
          isAccessible: superAdminOnly,
          before: hashPassword,
        },
        delete: {
          isAccessible: superAdminOnly,
        },
        list: {
          isAccessible: superAdminOnly,
        },
        show: {
          isAccessible: superAdminOnly,
        },
      },
    },
  };

  const weddingStoryResource = {
    resource: { model: prisma.weddingStory, client: prisma },
    options: {
      navigation: { name: 'Content', icon: 'Document' },
      listProperties: ['title', 'location', 'date', 'isFeatured'],
      filterProperties: ['location', 'isFeatured', 'date', 'title'],
      actions: {
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        new: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
        delete: { isAccessible: superAdminOnly },
      },
      properties: {
        coverImageUrl: { isVisible: false },
        fullDescription: { type: 'richtext' },
      },
    },
    features: [createUploadFeature({ key: 'coverImageUrl', folder: 'weddings/cover', provider })],
  };

  const weddingImageResource = {
    resource: { model: prisma.weddingImage, client: prisma },
    options: {
      navigation: { name: 'Content', icon: 'Image' },
      sort: { direction: 'asc', sortBy: 'sortOrder' },
      properties: {
        imageUrl: { isVisible: false },
        weddingStoryId: { position: 1 },
      },
      actions: {
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        new: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
        delete: { isAccessible: superAdminOnly },
      },
    },
    features: [createUploadFeature({ key: 'imageUrl', folder: 'weddings/gallery', provider })],
  };

  const reviewResource = {
    resource: { model: prisma.review, client: prisma },
    options: {
      navigation: { name: 'Content', icon: 'Chat' },
      listProperties: ['names', 'location', 'isVisible', 'createdAt'],
      filterProperties: ['isVisible'],
      actions: {
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        new: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
        delete: { isAccessible: superAdminOnly },
      },
    },
  };

  const homepageResource = {
    resource: { model: prisma.homepageContent, client: prisma },
    options: {
      navigation: { name: 'Content', icon: 'Home' },
      actions: {
        new: { isAccessible: false },
        delete: { isAccessible: false },
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
      },
    },
  };

  const blogPostResource = {
    resource: { model: prisma.blogPost, client: prisma },
    options: {
      navigation: { name: 'Content', icon: 'Article' },
      listProperties: ['title', 'isPublished', 'publishedAt'],
      filterProperties: ['isPublished', 'publishedAt'],
      actions: {
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        new: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
        delete: { isAccessible: superAdminOnly },
      },
      properties: {
        content: { type: 'richtext' },
      },
    },
  };

  const leadResource = {
    resource: { model: prisma.lead, client: prisma },
    options: {
      navigation: { name: 'Leads', icon: 'RequestChanges' },
      listProperties: ['name', 'email', 'location', 'status', 'createdAt'],
      filterProperties: ['status'],
      sort: { sortBy: 'createdAt', direction: 'desc' },
      actions: {
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
        delete: { isAccessible: superAdminOnly },
        new: { isAccessible: false },
      },
      properties: {
        status: {
          availableValues: Object.values(LeadStatus).map((value) => ({ value, label: value })),
        },
      },
    },
  };

  return [
    userResource,
    weddingStoryResource,
    weddingImageResource,
    reviewResource,
    homepageResource,
    blogPostResource,
    leadResource,
  ];
};

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    UsersModule,
    StorageModule,
    AdminJsModule.createAdminAsync({
      imports: [ConfigModule, PrismaModule, UsersModule, StorageModule],
      inject: [UsersService, PrismaService, StorageService, ConfigService],
      useFactory: (
        usersService: UsersService,
        prismaService: PrismaService,
        storageService: StorageService,
        configService: ConfigService,
      ) => {
        const providerConfig = storageService.getProviderConfig();
        return {
          adminJsOptions: {
            rootPath: '/admin',
            branding: {
              companyName: configService.get('ADMIN_BRAND_NAME') ?? 'Wedding CMS',
              withMadeWithLove: false,
            },
            resources: buildResources(prismaService, providerConfig),
          },
          auth: {
            authenticate: async (email: string, password: string) => {
              const user = await usersService.findByEmail(email);
              if (!user) return null;
              const isValid = await bcrypt.compare(password, user.passwordHash);
              if (!isValid) return null;
              return { email: user.email, role: user.role, id: user.id };
            },
            cookieName: 'adminjs',
            cookiePassword:
              configService.get<string>('ADMIN_COOKIE_SECRET') ?? 'change-me-adminjs-cookie',
          },
          sessionOptions: {
            resave: false,
            saveUninitialized: false,
            secret:
              configService.get<string>('ADMIN_COOKIE_SECRET') ?? 'change-me-adminjs-cookie',
            cookie: {
              secure: configService.get('NODE_ENV') === 'production',
              httpOnly: true,
              sameSite: 'lax',
            },
          },
        };
      },
    }),
  ],
})
export class AdminModule {}
