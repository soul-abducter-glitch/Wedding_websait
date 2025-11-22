# DEPLOY (Ubuntu VPS)

Ниже — пошаговый план для продакшн-развертывания (backend + frontend) и пример Nginx + SSL.

## 0. Предварительно
- Ubuntu 22.04+, Docker + Docker Compose, git.
- Открыты порты 80/443.
- Домен, указывающий на сервер (A-запись).

## 1. Клонировать репо и подготовить .env
```bash
git clone <repo_url> wedding
cd wedding
cp backend/.env.example backend/.env        # backend окружение
cp .env.example .env                        # frontend окружение (NEXT_PUBLIC_API_BASE_URL)
```

### Критично заменить для продакшна
- `backend/.env`:
  - `DATABASE_URL` — прод база (например, postgres в docker-compose).
  - `JWT_SECRET`, `JWT_REFRESH_SECRET`, `ADMIN_COOKIE_SECRET` — длинные, случайные.
  - `ADMIN_DEFAULT_EMAIL`, `ADMIN_DEFAULT_PASSWORD` — временные, потом сменить в админке.
  - `S3_*` — реальные ключи/endpoint/bucket.
  - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_TO` (опц. — если использовать другой email получателя).
- `.env` (frontend):
  - `NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api` (или ваш backend под nginx).

## 2. Docker Compose (пример)
Файл `docker-compose.prod.yml` (можно положить в корень):
```yaml
version: "3.9"

services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: wedding
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    restart: unless-stopped
    env_file:
      - ./backend/.env
    ports:
      - "4000:4000"
    depends_on:
      db:
        condition: service_healthy
    command: ["npm", "run", "start:prod"]

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    restart: unless-stopped
    env_file:
      - ./.env
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  db_data:
```

### Dockerfile для backend (backend/Dockerfile)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
CMD ["node", "dist/main.js"]
```

### Dockerfile для frontend (Dockerfile.frontend)
В корне проекта:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN npm install
COPY . .
# Собрать Next (app router): prod build + start
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
CMD ["npm", "run", "start"]
EXPOSE 3000
```

> Если хотите фронтенд как чистую статику, используйте `next export` и отдавайте через Nginx: `npm run build && npx next export` → папка `out/`.

## 3. Сборка и запуск
```bash
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

После первого старта:
```bash
docker compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy
docker compose -f docker-compose.prod.yml exec backend npx prisma db seed
```

## 4. Nginx (reverse proxy)
Пример конфига `/etc/nginx/sites-available/wedding.conf`:
```nginx
server {
    listen 80;
    server_name yourdomain.com api.yourdomain.com;
    client_max_body_size 50M;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Активировать:
```bash
sudo ln -s /etc/nginx/sites-available/wedding.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Если фронт отдается статикой (`out/`), то вместо прокси на 3000:
```nginx
    root /var/www/wedding/out;
    location / {
        try_files $uri $uri/ /index.html;
    }
```

## 5. SSL (Certbot)
```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
# Проверка автопродления
sudo certbot renew --dry-run
```
Certbot добавит в конфиг 443-блоки и сертификаты.

## 6. Обновления и перезапуск
```bash
git pull
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

## 7. Переменные окружения (краткий чек-лист)
- Backend (`backend/.env`):
  - `PORT=4000`
  - `DATABASE_URL=postgresql://USER:PASS@db:5432/wedding?schema=public`
  - `JWT_SECRET`, `JWT_REFRESH_SECRET`, `ADMIN_COOKIE_SECRET` (уникальные)
  - `S3_ENDPOINT`, `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
  - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_TO`
  - `ADMIN_DEFAULT_EMAIL`, `ADMIN_DEFAULT_PASSWORD` (сменить после первого входа)
- Frontend (`.env`):
  - `NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api`

## 8. Полезные команды
- Логи: `docker compose -f docker-compose.prod.yml logs -f backend frontend`
- Рестарт: `docker compose -f docker-compose.prod.yml restart backend frontend`
- Prisma Studio (временно): `docker compose -f docker-compose.prod.yml exec backend npx prisma studio` (только при необходимости, не держать в проде).
