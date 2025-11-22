import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_DEFAULT_EMAIL;
  const password = process.env.ADMIN_DEFAULT_PASSWORD;

  if (!email || !password) {
    // eslint-disable-next-line no-console
    console.warn('ADMIN_DEFAULT_EMAIL or ADMIN_DEFAULT_PASSWORD not set. Skipping admin seed.');
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // eslint-disable-next-line no-console
    console.log('Admin already exists, skipping seed.');
    return;
  }

  const password_hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password_hash,
    },
  });
  // eslint-disable-next-line no-console
  console.log(`Admin user created: ${email}`);
}

async function seedServices() {
  const count = await prisma.service.count();
  if (count > 0) {
    return;
  }

  await prisma.service.createMany({
    data: [
      {
        title_ru: 'Камерная свадьба',
        title_en: 'Intimate Wedding',
        price_ru: 'от 150 000 ₽',
        price_en: 'from $2000',
        features_ru: ['Съёмка до 6 часов', '300+ готовых фото', 'Онлайн-галерея', 'Авторская цветокоррекция'],
        features_en: ['Up to 6 hours of coverage', '300+ edited photos', 'Online gallery', 'Signature color grading'],
        is_popular: false,
      },
      {
        title_ru: 'Полный день',
        title_en: 'Full Day',
        price_ru: 'от 250 000 ₽',
        price_en: 'from $3500',
        features_ru: [
          'Съёмка до 10 часов',
          '500+ готовых фото',
          'Онлайн-галерея + фотокнига 30x30',
          'Цветокоррекция в фирменном стиле',
        ],
        features_en: [
          'Up to 10 hours of coverage',
          '500+ edited photos',
          'Online gallery + 30x30 photobook',
          'Signature color grading',
        ],
        is_popular: true,
      },
      {
        title_ru: 'Два дня / уикенд',
        title_en: 'Weekend',
        price_ru: 'от 400 000 ₽',
        price_en: 'from $5500',
        features_ru: [
          'Два дня съёмки (welcome + свадьба)',
          '800+ готовых фото',
          'Онлайн-галерея + принты',
          'Помощь с таймингом и локациями',
        ],
        features_en: [
          'Two days of coverage (welcome + wedding)',
          '800+ edited photos',
          'Online gallery + prints',
          'Timeline and location support',
        ],
        is_popular: false,
      },
    ],
  });
  // eslint-disable-next-line no-console
  console.log('Seeded services');
}

async function seedProjects() {
  const count = await prisma.project.count();
  if (count > 0) return;

  const baseProjects = [
    {
      slug: 'anna-dmitry',
      cover_image: '/romantic-wedding-ceremony.jpg',
      title_ru: 'Анна и Дмитрий',
      title_en: 'Anna & Dmitry',
      location_ru: 'Санкт-Петербург',
      location_en: 'Saint Petersburg',
      date: new Date('2024-08-15'),
      description_ru:
        'Классическая церемония в особняке на набережной. Светлая палитра, живые эмоции и заботливо продуманные детали.',
      description_en:
        'Classic ceremony in a riverside mansion. Soft palette, honest emotions, and thoughtfully curated details.',
      gallery: [
        '/romantic-wedding-ceremony.jpg',
        '/elegant-wedding-couple-walking.jpg',
        '/romantic-sunset-couple.jpg',
        '/emotional-ceremony-moment.jpg',
        '/couple-laughing-together.jpg',
        '/intimate-first-dance.jpg',
      ],
      is_featured: true,
      sort_order: 1,
    },
    {
      slug: 'maria-alexander',
      cover_image: '/bride-and-groom-in-city.jpg',
      title_ru: 'Мария и Александр',
      title_en: 'Maria & Alexander',
      location_ru: 'Москва',
      location_en: 'Moscow',
      date: new Date('2024-07-22'),
      description_ru:
        'Городская свадьба в центре Москвы. Стекло, свет, архитектура и искренние эмоции без постановки.',
      description_en:
        'Modern city wedding in downtown Moscow. Glass, light, architecture, and candid emotion without staging.',
      gallery: [
        '/bride-and-groom-in-city.jpg',
        '/elegant-wedding-couple-walking.jpg',
        '/couple-laughing-together.jpg',
        '/emotional-ceremony-moment.jpg',
      ],
      is_featured: true,
      sort_order: 2,
    },
    {
      slug: 'elena-sergey',
      cover_image: '/destination-wedding-tuscany.jpg',
      title_ru: 'Елена и Сергей',
      title_en: 'Elena & Sergey',
      location_ru: 'Тоскана, Италия',
      location_en: 'Tuscany, Italy',
      date: new Date('2024-09-05'),
      description_ru:
        'Загородная свадьба среди виноградников. Тёплый закатный свет и ужин на террасе под звёздами.',
      description_en:
        'Destination wedding among vineyards. Warm sunset light and a terrace dinner under the stars.',
      gallery: [
        '/destination-wedding-tuscany.jpg',
        '/tuscany-vineyard-wedding.jpg',
        '/romantic-sunset-couple.jpg',
        '/couple-in-nature.jpg',
        '/intimate-first-dance.jpg',
      ],
      is_featured: true,
      sort_order: 3,
    },
    {
      slug: 'victoria-maxim',
      cover_image: '/couple-in-nature.jpg',
      title_ru: 'Виктория и Максим',
      title_en: 'Victoria & Maxim',
      location_ru: 'Подмосковье',
      location_en: 'Near Moscow',
      date: new Date('2024-06-10'),
      description_ru:
        'Уютный день на природе: прогулка в саду, друзья, живая музыка и фейерверк после заката.',
      description_en:
        'Cozy outdoor day: garden portraits, friends, live music, and fireworks after dusk.',
      gallery: [
        '/couple-in-nature.jpg',
        '/couple-laughing-together.jpg',
        '/romantic-sunset-couple.jpg',
        '/emotional-ceremony-moment.jpg',
      ],
      is_featured: false,
      sort_order: 4,
    },
  ];

  for (const project of baseProjects) {
    await prisma.project.create({ data: project });
  }
  // eslint-disable-next-line no-console
  console.log('Seeded projects');
}

async function seedReviews() {
  const count = await prisma.review.count();
  if (count > 0) return;

  await prisma.review.createMany({
    data: [
      {
        couple_names: 'Мария и Алексей',
        avatar: '/placeholder-user.jpg',
        text_ru: 'Мы пересматриваем фотографии и каждый раз переживаем день заново. Очень естественно и тепло.',
        text_en: 'We relive the day every time we open the gallery. Natural and warm storytelling.',
        location_ru: 'Москва',
        location_en: 'Moscow',
      },
      {
        couple_names: 'Елена и Дмитрий',
        avatar: '/placeholder-user.jpg',
        text_ru: 'Боялись зажатости, но с Анной было спокойно. Получились живые кадры, без постановки.',
        text_en: 'We were afraid to feel stiff, but it was calm and easy. The photos are alive, not staged.',
        location_ru: 'Санкт-Петербург',
        location_en: 'Saint Petersburg',
      },
      {
        couple_names: 'Анна и Сергей',
        avatar: '/placeholder-user.jpg',
        text_ru: 'Ровно то, что мы мечтали: лёгкий свет, эмоции и внимание к деталям. Спасибо за историю!',
        text_en: 'Exactly what we dreamed of: light, emotion, and attention to details. Thank you for our story!',
        location_ru: 'Тоскана, Италия',
        location_en: 'Tuscany, Italy',
      },
    ],
  });
  // eslint-disable-next-line no-console
  console.log('Seeded reviews');
}

async function main() {
  await seedAdmin();
  await seedServices();
  await seedProjects();
  await seedReviews();
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
