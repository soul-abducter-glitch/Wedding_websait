import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.blogPost.update({
    where: { slug: 'intimate-city-nights' },
    data: {
      title: 'Интимные огни большого города',
      excerpt: 'Как поймать мягкий вечерний свет и сохранить атмосферу прогулки после церемонии.',
      content:
        'Вечер после церемонии — самое кинематографичное время. Мы начинаем съёмку за час до заката: делаем портреты в рассеянном свете, ловим блики в витринах и уличных фонарях. Если идёт дождь, уходим под аркады или в холл отеля — зеркала и тёплые лампы дают красивый объём. Когда темнеет, снимаем в движении: шаги по мостовой, огни в расфокусе, силуэты в окнах такси. Итог — серия без постановки, где видно ритм города и ваши эмоции.',
    },
  });
  console.log('Updated blog post: intimate-city-nights');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
