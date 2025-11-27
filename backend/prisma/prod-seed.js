import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_DEFAULT_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_DEFAULT_PASSWORD;

  if (!password) {
    console.warn('ADMIN_DEFAULT_PASSWORD is not set. Skipping admin seed.');
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user ${email} already exists, skipping.`);
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

main()
  .catch((error) => {
    console.error('Failed to seed admin user', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
