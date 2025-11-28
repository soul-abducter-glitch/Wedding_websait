import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.review.findMany({
    select: { id: true, names: true, location: true, text: true, isVisible: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  console.table(
    rows.map((r) => ({
      id: r.id,
      names: r.names,
      location: r.location,
      isVisible: r.isVisible,
      created: r.createdAt.toISOString(),
      text: r.text.slice(0, 60) + (r.text.length > 60 ? '…' : ''),
    })),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
