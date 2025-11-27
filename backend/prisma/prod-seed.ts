import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const passwordHash =
    '$2a$10$3huE4Bfyw9N5Qp4WnIdhQeqg54Z7EakUj99SuJh7lKKT64I0Q5DeO'; // bcrypt hash for Test1234!

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`Пользователь с email ${email} уже существует. Операция отменена.`);
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      passwordHash: passwordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });

  console.log(`Создан новый SUPER_ADMIN: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
