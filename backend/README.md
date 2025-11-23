# Wedding Backend (NestJS + Express + Prisma + AdminJS)

Production-ready backend for the Wedding site uses a clean NestJS API, AdminJS for managing content, and Prisma/ PostgreSQL layers that stay independent of the frontend.

## Overview

- **API**: Express-based NestJS with `/api/v1` prefix, validation, rate limiting, CORS, and structured public endpoints for stories, reviews, posts, homepage content, and form submissions.
- **Admin**: AdminJS (v7+) mounted at `/admin` with Prisma resources, S3 upload features, role-aware authentication, and session cookies.
- **Storage**: S3-first uploads with a local `/uploads` fallback; every story and gallery image stores a key that the API resolves into a URL.
- **Notifications**: Contact form saves leads, sends Telegram/email notifications, and supports anti-spam (honeypot field).

## Getting started

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```

- Admin panel → `http://localhost:4000/admin`.
- API base → `http://localhost:4000/api/v1`.

## Admin panel

- Access: email/password (seeded via `ADMIN_DEFAULT_EMAIL` / `ADMIN_DEFAULT_PASSWORD`).
- Roles:
  - `SUPER_ADMIN`: full access including user management, leads, and system settings.
  - `CONTENT_EDITOR`: manages weddings, galleries, reviews, homepage blocks, and blog posts but cannot touch users or system-wide resources.
- Uploads: cover/galleries use `@adminjs/upload` connected to S3 (or `/uploads` when S3 vars are absent). Uploaded keys are stored in the DB, and API responses expose fully qualified URLs.
- Session cookies are secured with `ADMIN_COOKIE_SECRET`.

## Public API endpoints

All responses are JSON and use a `/api/v1/...` prefix.

- `GET /api/v1/homepage`: homepage content, featured weddings, and recent visible reviews.
- `GET /api/v1/weddings`: paginated list of stories (filter with `featured`, `limit`, `offset`).
- `GET /api/v1/weddings/:slug`: full wedding story with sorted gallery.
- `GET /api/v1/reviews`: all visible reviews.
- `GET /api/v1/posts`: published blog posts with pagination.
- `GET /api/v1/posts/:slug`: single published post.
- `POST /api/v1/contact`: accepts `{ name, email, phone?, weddingDate?, location, message, source?, honeypot? }`. Honeypot field must stay empty; submissions get saved as new leads, and notifications trigger via Telegram/SMTP.

## Environment variables

| Name | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string. |
| `NODE_ENV` | `production` in Render, else `development`. |
| `PORT` | Optional override (Render supplies a port automatically). |
| `JWT_SECRET` | JWT signing secret for internal auth guards. |
| `ADMIN_COOKIE_SECRET` | Cookie secret for AdminJS sessions. |
| `ADMIN_DEFAULT_EMAIL` / `ADMIN_DEFAULT_PASSWORD` | Seed values for the initial `SUPER_ADMIN`. |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`, `S3_REGION` | S3 credentials. |
| `S3_ENDPOINT` | Optional custom endpoint (Yandex, Wasabi, etc.). |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of trusted frontend origins (defaults to `*` when empty). |
| `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX` | Rate limit window/max per IP. Defaults: 60,000 ms window, 100 requests. |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Optional Telegram notifications for leads. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_TO` | Email notification settings. |

## Storage & uploads

- The upload feature (used by AdminJS) reads its provider config from the same env variables above. If S3 is configured, keys are stored there; otherwise, files land in `./uploads` and are served statically via `/uploads`.
- `StorageService` exposes a helper that turns stored keys into fully qualified URLs for the public API.

## Database & seeds

- Use Prisma Migrate for migrations: `npx prisma migrate dev --name init` (development) and `npx prisma migrate deploy` in production.
- Seed data (homepage copy, sample story, blog post, admin user) with `npx prisma db seed`.

## Deployment (e.g. Render)

- Build command: `npm install && npm run build`.
- Start command: `npm run start:prod`.
- Render env vars should include all of the ones listed above plus `JWT_SECRET`, `ADMIN_*`, and `S3_*`.
- Configure a pre-deploy hook: `npx prisma migrate deploy && npx prisma db seed` to ensure the latest schema and seeds are applied before each release.
