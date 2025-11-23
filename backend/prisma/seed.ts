import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_DEFAULT_EMAIL;
  const password = process.env.ADMIN_DEFAULT_PASSWORD;

  if (!email || !password) {
    console.warn('ADMIN_DEFAULT_EMAIL or ADMIN_DEFAULT_PASSWORD not set. Skipping admin seed.');
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin already exists, skipping seed.');
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
  console.log(`Admin user created: ${email}`);
}

async function seedHomepageContent() {
  const count = await prisma.homepageContent.count();
  if (count > 0) return;

  await prisma.homepageContent.create({
    data: {
      heroTagline: 'Wedding storyteller & photographer',
      heroTitle: 'Honest light and timeless stories',
      heroSubtitle: 'Documentary-driven weddings across Europe and beyond.',
      heroStatsLine: '10+ years • 200+ weddings • Available worldwide',
      aboutTitle: 'About me',
      aboutTextShort: 'I capture emotions without staging—quiet moments, gentle glances, loud laughs.',
      ctaTitle: 'Let’s plan your day',
      ctaSubtitle: 'Share your details and I will reply with availability and packages',
      ctaButtonText: 'Check date',
    },
  });
  console.log('Seeded homepage content');
}

async function seedWeddingStories() {
  const count = await prisma.weddingStory.count();
  if (count > 0) return;

  const story = await prisma.weddingStory.create({
    data: {
      slug: 'roma-olya-moscow',
      title: 'Рома и Оля — Moscow',
      location: 'Moscow, Russia',
      date: new Date('2024-09-12'),
      shortDescription: 'Свадьба в московском дворце с классическим светом и живой музыкой.',
      fullDescription:
        'Двадцатилетняя история двух семей была рассказана через камерную церемонию и большой танцевальный вечер. Атмосфера была мягкой — много свечей и золотых свечей.',
      coverImageUrl: 'https://example.com/covers/roma-olya.jpg',
      isFeatured: true,
      images: {
        createMany: {
          data: [
            {
              imageUrl: 'https://example.com/gallery/roma-olya-1.jpg',
              alt: 'Будущие молодожены на террасе',
              sortOrder: 1,
            },
            {
              imageUrl: 'https://example.com/gallery/roma-olya-2.jpg',
              alt: 'Свадебная церемония у окна',
              sortOrder: 2,
            },
          ],
        },
      },
    },
  });

  await prisma.review.create({
    data: {
      names: 'Рома & Оля',
      location: 'Moscow, Russia',
      text: 'Свет, эмоции и внимание к деталям — команда создала историю, которую хочется пересматривать снова и снова.',
      weddingStoryId: story.id,
      isVisible: true,
    },
  });

  console.log('Seeded wedding story');
}

async function seedBlogPosts() {
  const count = await prisma.blogPost.count();
  if (count > 0) return;

  await prisma.blogPost.create({
    data: {
      slug: 'intimate-city-nights',
      title: 'Intimate city nights',
      coverImageUrl: 'https://example.com/blog/intimate-city.jpg',
      excerpt: 'Evenings in the city glow pale gold after the ceremony. Here is how we capture that light.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      publishedAt: new Date(),
      isPublished: true,
    },
  });

  console.log('Seeded blog posts');
}

async function main() {
  await seedAdmin();
  await seedHomepageContent();
  await seedWeddingStories();
  await seedBlogPosts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
