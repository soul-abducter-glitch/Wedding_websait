Backend plan for the Wedding site API/admin.

Stack
- Backend: NestJS + Fastify, Prisma ORM.
- DB: PostgreSQL.
- Auth: JWT access + refresh, bcrypt password hashes.
- File storage: S3-compatible (Yandex Object Storage) with local fallback for dev.
- Admin UI: AdminJS mounted inside the Nest app with RBAC for admins.
- Messaging: Telegram Bot API + SMTP (nodemailer).
- Validation: class-validator/class-transformer on DTOs; Zod on client if needed.
- Localization: field suffixes `_ru` / `_en`; `?lang=ru|en` query to pick fields with fallback logic.

Env keys (example)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/wedding
PORT=4000
JWT_SECRET=change-me
JWT_REFRESH_SECRET=change-me-too
S3_ENDPOINT=https://storage.yandexcloud.net
S3_BUCKET=wedding-media
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_REGION=ru-central1
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM="Wedding Site <no-reply@example.com>"
```

DB schema (Prisma-style models)
```
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

model Project {
  id           String   @id @default(uuid())
  slug         String   @unique
  coverImage   String
  title_ru     String
  title_en     String
  location_ru  String
  location_en  String
  date         DateTime
  description_ru String
  description_en String
  gallery      Json
  isFeatured   Boolean  @default(false)
  sortOrder    Int      @default(0)
  reviews      Review[] @relation("ProjectReviews")
}

model Service {
  id         String @id @default(uuid())
  title_ru   String
  title_en   String
  price_ru   String
  price_en   String
  features_ru Json
  features_en Json
  isPopular  Boolean @default(false)
}

model Review {
  id              String  @id @default(uuid())
  coupleNames     String
  avatar          String
  text_ru         String
  text_en         String
  location_ru     String
  location_en     String
  relatedProject  Project? @relation("ProjectReviews", fields: [relatedProjectId], references: [id])
  relatedProjectId String?
}

model Journal {
  id          String   @id @default(uuid())
  slug        String   @unique
  title_ru    String
  title_en    String
  content_ru  String
  content_en  String
  coverImage  String
  createdAt   DateTime @default(now())
}

model Lead {
  id        String   @id @default(uuid())
  name      String
  date      String
  messenger String
  contact   String
  details   String
  createdAt DateTime @default(now())
}
```

Public API (JSON)
- `GET /api/homepage?lang=ru|en` → `{ featuredProjects: Project[], reviews: Review[], author: {...static content...} }`
- `GET /api/projects?limit=&offset=&lang=` → list with pagination metadata.
- `GET /api/projects/:slug?lang=` → single project with gallery.
- `GET /api/services?lang=` → services list.
- `GET /api/reviews?lang=` → reviews list.
- `GET /api/journal?limit=&offset=&lang=` and `GET /api/journal/:slug?lang=`.
- `POST /api/contact` → body `{ name, date, messenger, contact, details }`, returns `{ status: "ok" }`; persists Lead + sends Telegram + email.

Admin API (JWT-protected)
- `POST /api/admin/auth/login` → {accessToken, refreshToken}.
- CRUD: `/api/admin/projects`, `/api/admin/services`, `/api/admin/reviews`, `/api/admin/journal`, `/api/admin/leads (read-only)`, `/api/admin/uploads` (multi-upload to S3/local).
- AdminJS mounted at `/admin` with the same resources; permissions check per role (for now only role "admin").

Localization behavior
- If `lang=ru|en` provided, API maps translatable fields to `title`, `location`, etc. and includes raw `_ru/_en` for admin only.
- Fallback: if requested language is empty string/undefined, default is `ru`; if a translation is empty, fall back to the other language.

File handling
- Upload endpoint accepts multiple images (multipart, 10–20 files at once) and stores to S3 path `projects/{projectId}/{filename}`.
- On upload: optionally run sharp → WebP (quality 80) + keep original; store both URLs.
- For dev/local: write to `/uploads` and serve statically; use signed URL expiration for S3 if private buckets are needed.

Contact flow
- Save Lead row.
- Send Telegram message:  
  ```
  🔥 Новая заявка с сайта!
  Имена: ...
  Дата: ...
  Связь: ...
  Сообщение: ...
  ```
- Send email to photographer with the same content; basic retry + logging.

Security/perf
- Rate limit public endpoints (IP-based) and contact POST to avoid spam.
- Helmet/CORS configured; strong password policy in admin.
- Request validation on DTOs; JSON size limits.
- Structured logging (pino) + audit log for admin mutations.
- Pagination on list endpoints; `isFeatured` + `sortOrder` indexes.

Rollout plan
1) Init NestJS project, add Prisma, generate migrations from schema above.  
2) Implement auth + AdminJS resources.  
3) Implement public read endpoints with `lang` handling + tests.  
4) Implement uploads (S3 + local fallback) + image conversion.  
5) Implement contact flow (Lead model + Telegram + SMTP).  
6) Hook front-end to these endpoints; add seed data for demos.  
7) Deploy: Dockerfile + docker-compose for Postgres; set up object storage bucket and env vars; add CI lint/test.
