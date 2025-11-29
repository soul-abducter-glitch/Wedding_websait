import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AdminJS, { CurrentAdmin } from 'adminjs';
import { bundle } from '@adminjs/bundler';
import fs from 'fs/promises';
import path from 'path';
import * as AdminJSPrisma from '@adminjs/prisma';
import bcrypt from 'bcryptjs';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import { LeadStatus, Prisma, UserRole } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersModule } from '../users/users.module.js';
import { UsersService } from '../users/users.service.js';
import { StorageModule } from '../storage/storage.module.js';
import { StorageProviderConfig, StorageService } from '../storage/storage.service.js';
import { componentLoader } from './component-loader.js';

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

const createUploadFeature = (
  uploadFeatureImpl: (options: any) => any,
  config: {
  key: string;
  folder: string;
  provider: StorageProviderConfig;
},
) =>
  uploadFeatureImpl({
    componentLoader,
    provider: config.provider,
    properties: {
      key: config.key,
      file: `${config.key}File`,
      filePath: `${config.key}Path`,
      filesToDelete: `${config.key}FilesToDelete`,
    },
    validation: IMAGE_VALIDATION,
    uploadPath: (record: any, filename: string) => {
      const recordId = record?.params?.id ?? record?.id?.() ?? 'new';
      return `${config.folder}/${recordId}/${Date.now()}-${safeFilename(filename)}`;
    },
  });

const buildResources = (
  prisma: PrismaService,
  provider: StorageProviderConfig,
  uploadFeatureImpl: (options: any) => any,
) => {
  const getModel = (name: Prisma.ModelName) => {
    const model = Prisma.dmmf.datamodel.models.find((m) => m.name === name);
    if (!model) throw new Error(`Prisma model not found: ${name}`);
    return model;
  };

  const userResource = {
    resource: { model: getModel('User'), client: prisma },
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
        new: { isAccessible: superAdminOnly, before: hashPassword },
        edit: { isAccessible: superAdminOnly, before: hashPassword },
        delete: { isAccessible: superAdminOnly },
        list: { isAccessible: superAdminOnly },
        show: { isAccessible: superAdminOnly },
      },
    },
  };

  const weddingStoryResource = {
    resource: { model: getModel('WeddingStory'), client: prisma },
    options: {
      navigation: { name: '╨Ъ╨╛╨╜╤В╨╡╨╜╤В', icon: 'Document' },
      resourceName: '╨Ш╤Б╤В╨╛╤А╨╕╨╕',
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
        title: { label: '╨Ч╨░╨│╨╛╨╗╨╛╨▓╨╛╨║' },
        location: { label: '╨Ы╨╛╨║╨░╤Ж╨╕╤П' },
        date: { label: '╨Ф╨░╤В╨░' },
        shortDescription: { label: '╨Ъ╨╛╤А╨╛╤В╨║╨╛╨╡ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡', type: 'textarea' },
        fullDescription: { type: 'richtext', label: '╨Я╨╛╨╗╨╜╨╛╨╡ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡' },
        coverImageUrl: { label: 'Обложка', isVisible: { list: false, filter: false, show: true, edit: true } },
        isFeatured: { label: '╨Т ╨╕╨╖╨▒╤А╨░╨╜╨╜╨╛╨╝' },
      },
    },
    features: [],
  };

  const weddingImageResource = {
    resource: { model: getModel('WeddingImage'), client: prisma },
    options: {
      navigation: { name: '╨Ъ╨╛╨╜╤В╨╡╨╜╤В', icon: 'Image' },
      resourceName: '╨У╨░╨╗╨╡╤А╨╡╤П',
      sort: { direction: 'asc', sortBy: 'sortOrder' },
      properties: {
        weddingStoryId: { position: 1, label: 'История' },
        imageUrl: { isVisible: { list: false, filter: false, show: true, edit: true }, label: 'Изображение' },
        alt: { label: 'ALT текст' },
        sortOrder: { label: 'Порядок' },
      },
      actions: {
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        new: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
        delete: { isAccessible: superAdminOnly },
      },
    },
    features: [],
  };

  const reviewResource = {
    resource: { model: getModel('Review'), client: prisma },
    options: {
      navigation: { name: '╨Ъ╨╛╨╜╤В╨╡╨╜╤В', icon: 'Chat' },
      resourceName: '╨Ю╤В╨╖╤Л╨▓╤Л',
      listProperties: ['names', 'location', 'isVisible', 'createdAt'],
      filterProperties: ['isVisible'],
      actions: {
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        new: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
        delete: { isAccessible: superAdminOnly },
      },
      properties: {
        names: { label: '╨Ш╨╝╨╡╨╜╨░ ╨┐╨░╤А╤Л' },
        location: { label: '╨Ы╨╛╨║╨░╤Ж╨╕╤П' },
        text: { label: '╨в╨╡╨║╤Б╤В ╨╛╤В╨╖╤Л╨▓╨░', type: 'textarea' },
        isVisible: { label: '╨Я╨╛╨║╨░╨╖╤Л╨▓╨░╤В╤М ╨╜╨░ ╤Б╨░╨╣╤В╨╡' },
        createdAt: { label: '╨б╨╛╨╖╨┤╨░╨╜' },
      },
    },
  };

  const homepageResource = {
    resource: { model: getModel('HomepageContent'), client: prisma },
    options: {
      navigation: { name: '╨Ъ╨╛╨╜╤В╨╡╨╜╤В', icon: 'Home' },
      resourceName: '╨У╨╗╨░╨▓╨╜╨░╤П',
      actions: {
        new: { isAccessible: false },
        delete: { isAccessible: false },
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
      },
      properties: {
        heroTagline: { label: '╨е╨╕╤А╨╛: ╤В╨╡╨│╨╗╨░╨╣╨╜' },
        heroTitle: { label: '╨е╨╕╤А╨╛: ╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║' },
        heroSubtitle: { label: '╨е╨╕╤А╨╛: ╨┐╨╛╨┤╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║' },
        heroStatsLine: { label: '╨е╨╕╤А╨╛: ╤Б╤В╨░╤В╨╕╤Б╤В╨╕╨║╨░' },
        aboutImageUrl: { isVisible: { list: false, filter: false, show: true, edit: true }, label: 'Фото об авторе' },
        aboutImageAlt: { label: 'ALT ╤Д╨╛╤В╨╛ ╨░╨▓╤В╨╛╤А╨░' },
        aboutTitle: { label: '╨С╨╗╨╛╨║ тАЬ╨Ю╨▒╨╛ ╨╝╨╜╨╡тАЭ: ╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║' },
        aboutTextShort: { label: '╨С╨╗╨╛╨║ тАЬ╨Ю╨▒╨╛ ╨╝╨╜╨╡тАЭ: ╤В╨╡╨║╤Б╤В' },
        ctaTitle: { label: 'CTA: ╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║' },
        ctaSubtitle: { label: 'CTA: ╨┐╨╛╨┤╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║' },
        ctaButtonText: { label: 'CTA: ╨║╨╜╨╛╨┐╨║╨░' },
      },
    },
    features: [],
  };

  const blogPostResource = {
    resource: { model: getModel('BlogPost'), client: prisma },
    options: {
      navigation: { name: '╨Ц╤Г╤А╨╜╨░╨╗', icon: 'Article' },
      id: '╨Ц╤Г╤А╨╜╨░╨╗╤Л',
      sort: { sortBy: 'publishedAt', direction: 'desc' },
      listProperties: ['title', 'slug', 'publishedAt', 'isPublished'],
      filterProperties: ['isPublished', 'publishedAt', 'slug'],
      actions: {
        list: { isAccessible: contentEditorAccess },
        show: { isAccessible: contentEditorAccess },
        new: { isAccessible: contentEditorAccess },
        edit: { isAccessible: contentEditorAccess },
        delete: { isAccessible: superAdminOnly },
      },
      properties: {
        title: { label: '╨Ч╨░╨│╨╛╨╗╨╛╨▓╨╛╨║' },
        slug: { label: '╨б╤Б╤Л╨╗╨║╨░ (slug)' },
        excerpt: { label: '╨Ъ╨╛╤А╨╛╤В╨║╨╛╨╡ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡', type: 'textarea' },
        coverImageUrl: {
          label: '╨Ю╨▒╨╗╨╛╨╢╨║╨░ (URL)',
          isVisible: { list: false, filter: false, show: true, edit: true },
        },
        content: { type: 'richtext', label: '╨в╨╡╨║╤Б╤В' },
        isPublished: { label: '╨Ю╨┐╤Г╨▒╨╗╨╕╨║╨╛╨▓╨░╨╜╨╛' },
        publishedAt: { label: '╨Ф╨░╤В╨░ ╨┐╤Г╨▒╨╗╨╕╨║╨░╤Ж╨╕╨╕' },
        seoTitle: { label: 'SEO ╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║' },
        seoDescription: { label: 'SEO ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡', type: 'textarea' },
      },
    },
    features: [],
  };

  const leadResource = {
    resource: { model: getModel('Lead'), client: prisma },
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
      useFactory: async (
        usersService: UsersService,
        prismaService: PrismaService,
        storageService: StorageService,
        configService: ConfigService,
      ) => {
        const nodeEnv = configService.get<string>('NODE_ENV') ?? process.env.NODE_ENV;
        const adminTmpDir =
          configService.get<string>('ADMIN_JS_TMP_DIR') ?? path.join(process.cwd(), '.adminjs');
        process.env.ADMIN_JS_TMP_DIR = adminTmpDir;
        await fs.mkdir(adminTmpDir, { recursive: true });
        const uploadModule: any = await import('@adminjs/upload');
        const uploadFeature = uploadModule.default ?? uploadModule;
        const providerConfig = storageService.getProviderConfig();
        const adminJsOptions = {
          rootPath: '/admin',
          branding: {
            companyName: configService.get('ADMIN_BRAND_NAME') ?? 'Wedding CMS',
            withMadeWithLove: false,
          },
          componentLoader,
          resources: buildResources(prismaService, providerConfig, uploadFeature),
        };
        if (nodeEnv === 'production') {
          await bundle({
            destinationDir: adminTmpDir,
            componentLoader,
          });
          process.env.ADMIN_JS_SKIP_BUNDLE = 'true';
        }
        return {
          adminJsOptions,
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
              secure: nodeEnv === 'production',
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








