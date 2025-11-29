import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.blogPost.update({
    where: { slug: 'intimate-city-nights' },
    data: {
      title: 'Интимные огни большого города',
      excerpt:
        'Съёмка началась на закате: мягкий тёплый свет, отражения в витринах и редкие прохожие  всё, чтобы сохранить спокойствие после суматохи дня.',
      content:
        'Съёмка началась на закате: мягкий тёплый свет, отражения в витринах и редкие прохожие  всё, чтобы сохранить спокойствие после суматохи дня.\n\nМы прошли привычные места пары: любимая кофейня за углом, мост с видом на огни города и узкая улочка, где они познакомились. Без постановки  только живые жесты и диалоги.\n\nВместо длинного плейлиста  один трек в наушниках на двоих, чтобы поймать нужное настроение. Так появились кадры, где город растворяется, а остаются только двое.',
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
