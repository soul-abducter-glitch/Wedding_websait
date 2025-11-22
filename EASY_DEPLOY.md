# EASY_DEPLOY (PaaS, без администрирования Linux)

Инструкция для новичков: деплой бэкенда (NestJS + PostgreSQL) на Railway/Render и фронтенда на Vercel. Всё делается через веб-интерфейс, без ручной настройки серверов.

## 1) Бэкенд + База на Railway.app (аналогично на Render)

### Создать проект и базу
1. Зайдите на https://railway.app → Sign up / Log in.
2. `New Project` → `Provision PostgreSQL` (Railway создаст базу и даст URL).
3. Скопируйте `Postgres Connection URL` — он понадобится как `DATABASE_URL`.

### Залить бэкенд из GitHub
1. В Railway: `New Project` → `Deploy from GitHub Repo` → выбрать ваш репозиторий.
2. Railway попросит выбрать папку. Укажите **/backend** (там package.json NestJS).
3. Настройте переменные окружения (Settings → Variables):
   - `DATABASE_URL` — URL из шага выше.
   - `PORT=4000`
   - `JWT_SECRET`, `JWT_REFRESH_SECRET`, `ADMIN_COOKIE_SECRET` — придумайте длинные случайные строки.
   - `ADMIN_DEFAULT_EMAIL`, `ADMIN_DEFAULT_PASSWORD` — временный админ для первого входа.
   - `S3_ENDPOINT`, `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` — если есть S3. Если нет, можно не ставить, будет локальное хранение (Railway диск ограничен).
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — опционально для заявок.
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_TO` — опционально для заявок.
4. Build Command: `npm install && npm run build`
5. Start Command: `npm run start:prod`
6. Нажмите `Deploy`.

### Применить миграции и сиды
Railway позволяет выполнять команды в консоли контейнера:
1. Откройте сервис → `Shell`.
2. Выполните по очереди:
   - `npx prisma migrate deploy`
   - `npx prisma db seed`

**Итог:** Railway выдаст публичный URL, например `https://your-backend.up.railway.app`. API будет на `https://.../api`.

### Render (кратко аналогично)
1. `New Web Service` → GitHub repo → root `/backend`.
2. Runtime: Node 20+.
3. Build Command: `npm install && npm run build`.
4. Start Command: `npm run start:prod`.
5. Env Vars: те же, что выше (DATABASE_URL возьмите из Render PostgreSQL add-on).
6. После первого деплоя зайдите в `Shell` → `npx prisma migrate deploy` → `npx prisma db seed`.

## 2) Фронтенд на Vercel

### Подключение репозитория
1. Перейдите на https://vercel.com → `New Project` → выберите репозиторий.
2. Root директория: корень проекта (где package.json Next.js).
3. Framework: Next.js (автоопределится).

### ENV для фронта
В разделе `Environment Variables` добавьте:
- `NEXT_PUBLIC_API_BASE_URL` — URL бэкенда с `/api`, например `https://your-backend.up.railway.app/api`.

### Build/Start
- Vercel сам поставит: Build Command `next build`, Output `.next`.
- Нажмите `Deploy`.

После деплоя получите URL вида `https://your-frontend.vercel.app`.

## 3) Быстрый чек-лист после деплоя
- Зайти в AdminJS: `https://your-backend.../admin` → логин/пароль из `ADMIN_DEFAULT_*`. Сменить пароль вручную.
- Проверить публичные GET:
  - `/api/health`
  - `/api/projects`
  - `/api/services`
  - `/api/reviews`
  - `/api/journal`
- Проверить контактную форму на фронте → убедиться, что прилетает 200 от `POST /api/contact` (Telegram/SMTP опционально).
- В фронтовом интерфейсе должны отображаться сид-данные (проекты, услуги, отзывы) — если нет, убедитесь, что `NEXT_PUBLIC_API_BASE_URL` указывает на рабочий backend.

## 4) Частые вопросы
- **Нет S3**: оставьте S3-переменные пустыми — загрузки будут в локальный storage сервиса (ограничено). Для прод лучше S3-совместимое хранилище (Yandex Object Storage и т.п.).
- **HTTPS**: Railway/Render/Vercel дают HTTPS сразу, домен можно подключить позже.
- **Миграции забыли**: запустите в shell контейнера `npx prisma migrate deploy && npx prisma db seed`.
