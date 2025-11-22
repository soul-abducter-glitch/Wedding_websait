# Wedding Backend (NestJS + Fastify + Prisma)

Стек: NestJS 11 (Fastify), Prisma ORM, PostgreSQL, AdminJS, S3-хранилище (конвертация в WebP).

## Быстрый старт (локально)
1) Скопируйте `.env.example` в `.env` и подставьте значения (JWT, S3, SMTP, Telegram, ADMIN_*).  
2) (Опционально) Поднимите Postgres: `docker compose up -d db` или используйте свой.  
3) Установите зависимости: `npm install`.  
4) Сгенерируйте Prisma client: `npm run prisma:generate`.  
5) Создайте миграции (SQL уже в `prisma/migrations/000_init/migration.sql`): `npm run prisma:migrate` или примените SQL вручную.  
6) Засидьте админа: `npm run prisma:seed` (берёт ADMIN_DEFAULT_EMAIL/PASSWORD).  
7) Старт dev: `npm run start:dev` (по умолчанию http://localhost:4000/api/health, админка http://localhost:4000/admin).

## Основные возможности
- AdminJS на `/admin` с аутентификацией (email/password из таблицы users).
- Публичные GET API с `?lang=ru|en`: `/api/homepage`, `/api/projects`, `/api/projects/:slug`, `/api/services`, `/api/reviews`, `/api/journal`, `/api/journal/:slug`.
- Контактная форма: `POST /api/contact` сохраняет лид, шлёт Telegram и email.
- Загрузка файлов: `POST /api/admin/uploads` (JWT) принимает multipart, грузит в S3 (или локально в `/uploads`), одновременно пишет WebP (quality 80).
- Health checks: `/api/health`, `/api`.

## Скрипты
- `npm run start:dev` — dev-сервер с hot-reload.
- `npm run build && npm run start:prod` — сборка и запуск prod.
- `npm run prisma:generate` — генерировать Prisma client.
- `npm run prisma:migrate` — применить миграции (dev) или использовать SQL из `prisma/migrations`.
- `npm run prisma:studio` — Prisma Studio.
- `npm run prisma:seed` — создать дефолтного админа по env.
- `npm test` — юнит-тесты.

## Структура
- `src/main.ts` — запуск Fastify, helmet/cors, multipart/static `/uploads`.
- `src/prisma` — PrismaService (глобально), схема в `prisma/schema.prisma`.
- `src/admin` — интеграция AdminJS с Prisma, логин через users.
- `src/auth` — JWT login `POST /api/admin/auth/login`, guard для защищённых роутов.
- `src/uploads` — загрузка файлов в S3/локально с конвертацией в WebP.
- `src/public` — публичные GET-эндпоинты с локализацией.
- `src/contact` — контактная форма, Telegram + SMTP отправка.

## Миграции
- SQL миграция: `prisma/migrations/000_init/migration.sql` (создаёт users, projects, services, reviews, journal, leads).
- При наличии БД можно запустить `npm run prisma:migrate` для применения.

## Замечания по окружению
- Для S3 нужен S3_ENDPOINT/S3_BUCKET/S3_ACCESS_KEY_ID/S3_SECRET_ACCESS_KEY. Без них файлы сохраняются локально в `uploads/` и раздаются статикой `/uploads/...`.
- AdminJS cookie шифруется `ADMIN_COOKIE_SECRET`.
- Telegram требует TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.
- SMTP_HOST/PORT/USER/PASS/SMTP_FROM (и опционально SMTP_TO) для писем. Если не заданы — отправка пропускается.
