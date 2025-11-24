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
      heroStatsLine: '10+ years · 200+ weddings · Available worldwide',
      aboutTitle: 'About me',
      aboutTextShort: 'I capture emotions without staging—quiet moments, gentle glances, loud laughs.',
      ctaTitle: 'Let’s plan your day',
      ctaSubtitle: 'Share your details and I will reply with availability and packages',
      ctaButtonText: 'Check date',
    },
  });
  console.log('Seeded homepage content');
}

type StorySeed = {
  slug: string;
  title: string;
  location: string;
  date: Date;
  shortDescription: string;
  fullDescription: string;
  coverImageUrl: string;
  isFeatured: boolean;
  review?: {
    names: string;
    location: string;
    text: string;
    isVisible: boolean;
  };
  images: { imageUrl: string; alt: string; sortOrder: number }[];
};

const storiesData: StorySeed[] = [
  {
    slug: 'anna-dmitriy-saint-petersburg',
    title: 'Анна и Дмитрий',
    location: 'Санкт-Петербург, Россия',
    date: new Date('2024-08-15'),
    shortDescription: 'Классическая церемония в особняке с видом на Неву.',
    fullDescription:
      'Светлые интерьеры, пианино и большой зимний сад позволили сосредоточиться на чувствах — никакой постановки, только искренняя история.',
    coverImageUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    review: {
      names: 'Анна и Дмитрий',
      location: 'Санкт-Петербург, Россия',
      text: 'Это была наша история. В кадрах чувствуется и свет, и атмосфера, и каждое дыхание.',
      isVisible: true,
    },
    images: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
        alt: 'Анна и Дмитрий в колонном зале',
        sortOrder: 1,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        alt: 'Нежный портрет на лестнице',
        sortOrder: 2,
      },
    ],
  },
  {
    slug: 'maria-aleksandr-moscow',
    title: 'Мария и Александр',
    location: 'Москва, Россия',
    date: new Date('2024-07-22'),
    shortDescription: 'Современная городская свадьба в центре Москвы.',
    fullDescription:
      'Прогулка по булыжным улицам, ужин со стеклянными фасадами и вечер под светом витрин. Современные силуэты и искренние эмоции.',
    coverImageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    review: {
      names: 'Мария и Александр',
      location: 'Москва, Россия',
      text: 'Спасибо за честную историю про жемчужины города и наши непоставленные секунды.',
      isVisible: true,
    },
    images: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
        alt: 'Мария идёт по московской улице',
        sortOrder: 1,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80',
        alt: 'Пара держится за руки',
        sortOrder: 2,
      },
    ],
  },
  {
    slug: 'elena-sergey-tuscany',
    title: 'Елена и Сергей',
    location: 'Тоскана, Италия',
    date: new Date('2024-09-05'),
    shortDescription: 'Destination wedding среди виноградников.',
    fullDescription:
      'Тёплый день, холмы Тосканы, ужин на террасе и лёгкая итальянская музыка. История о спокойствии и солнце.',
    coverImageUrl: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    review: {
      names: 'Елена и Сергей',
      location: 'Тоскана, Италия',
      text: 'Пока мы наслаждались вином и разговором, вы ловили моменты так, будто фотографировали наше путешествие всей жизни.',
      isVisible: true,
    },
    images: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
        alt: 'Пара на фоне тосканских холмов',
        sortOrder: 1,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
        alt: 'Рука в руке на закате',
        sortOrder: 2,
      },
    ],
  },
];

async function seedWeddingStories() {
  for (const story of storiesData) {
    const createdStory = await prisma.weddingStory.upsert({
      where: { slug: story.slug },
      update: {
        title: story.title,
        location: story.location,
        date: story.date,
        shortDescription: story.shortDescription,
        fullDescription: story.fullDescription,
        coverImageUrl: story.coverImageUrl,
        isFeatured: story.isFeatured,
        images: {
          deleteMany: {},
          create: story.images,
        },
      },
      create: {
        slug: story.slug,
        title: story.title,
        location: story.location,
        date: story.date,
        shortDescription: story.shortDescription,
        fullDescription: story.fullDescription,
        coverImageUrl: story.coverImageUrl,
        isFeatured: story.isFeatured,
        images: {
          create: story.images,
        },
      },
    });

    await prisma.review.deleteMany({ where: { weddingStoryId: createdStory.id } });
    if (story.review) {
      await prisma.review.create({
        data: {
          ...story.review,
          weddingStoryId: createdStory.id,
        },
      });
    }
  }
  console.log('Seeded wedding stories');
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
