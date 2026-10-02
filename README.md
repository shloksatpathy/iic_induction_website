# Idea Innovation Cell — Orientation Website

Induction and registration site for the Idea Innovation Cell (IIC). Students land on a
starfield/rocket-themed home page, register through a validated form,
and see a personal dashboard with the club's domains. Registrations go to a Neon
Postgres database through Drizzle ORM.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS and shadcn/ui.

## Pages

| Route | What it does |
|---|---|
| `/` | Landing page: hero, animated starfield, rocket illustration, call to register |
| `/register` | Registration form (react-hook-form + zod), posts to `/api/register` |
| `/dashboard` | The student's submitted details and an overview of the club domains (Computer Science → AIML / WebDev, Electronics, Mechanical, …). Reads from `localStorage`, so it only shows data on the device that registered |
| `POST /api/register` | Validates the payload and inserts a row into `registrations` |

## Registration flow

1. The form validates on the client using `lib/registration-schema.ts`:
   - name and branch: 2–100 chars
   - valid email
   - 10-digit Indian mobile number (`^[6-9]\d{9}$`)
   - registration number: 3–20 chars
2. `app/api/register/route.ts` validates again on the server, lowercases the email and uppercases the registration number.
3. The insert uses `ON CONFLICT DO NOTHING`. `email` and `registration_number` are both unique, so a double-tap can't create a duplicate.
4. If nothing was inserted, the stored row is compared with the submission:
   - **identical** → treated as success (a retry that landed after an earlier commit)
   - **different** → `409` ("already registered")
5. Only after the server confirms does the form save a copy to `localStorage` (`iic_registration`) for the dashboard.

### Built for registration rushes

The site has to survive everyone registering at the same moment:

- **Stateless HTTP driver.** `@neondatabase/serverless` sends one HTTPS request per query, so a burst of serverless invocations never exhausts a connection pool (`lib/db/index.ts`).
- **5 s per-query timeout.** A stalled TLS handshake fails fast instead of hanging for Node's default 10 s.
- **Retries for network failures only.** `withRetry` in `lib/db/retry.ts` retries transport errors such as fetch failures, timeouts and resets, up to 3 attempts within a 12 s deadline, using exponential backoff with jitter. Errors Postgres actually returns (bad SQL, constraint violations) are passed straight through.

Responses: `200 {ok: true}`, `400` for invalid input, `409` for a duplicate, `502` when the database is unreachable after retries.

## Getting started

Requirements: Node.js 20+ and pnpm (an npm `package-lock.json` is also checked in, if you prefer npm).

```bash
pnpm install
```

Create `.env.local` (git-ignored) with your Neon **pooled** connection string:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>-pooler.<region>.aws.neon.tech/<db>?sslmode=require
```

Apply the schema, then start the dev server:

```bash
pnpm db:migrate    # apply migrations in drizzle/
pnpm dev           # http://localhost:3000
```

The app throws at startup if `DATABASE_URL` is missing.

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm lint` | ESLint |
| `pnpm db:generate` | Generate a new SQL migration from `lib/db/schema.ts` |
| `pnpm db:migrate` | Apply migrations (`lib/db/migrate.ts`) |
| `pnpm db:push` | Push the schema straight to the database (dev shortcut, no migration file) |
| `pnpm db:studio` | Open Drizzle Studio to browse registrations |

## Database schema

`registrations` (`lib/db/schema.ts`, migration `drizzle/0000_quiet_hemingway.sql`):

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK, random default |
| `name` | `text` | |
| `email` | `text` | unique, stored lowercase |
| `phone` | `text` | |
| `branch` | `text` | |
| `registration_number` | `text` | unique, stored uppercase |
| `created_at` | `timestamptz` | default `now()`, indexed |

## Project layout

```
app/
├── page.tsx               # Landing page
├── register/page.tsx      # Registration page
├── dashboard/page.tsx     # Post-registration dashboard
├── api/register/route.ts  # Registration endpoint
├── layout.tsx             # Root layout, metadata, theme
└── globals.css
components/
├── registration-form.tsx  # Form + submit logic
├── countdown.tsx          # Countdown to TARGET_DATE (currently not rendered on any page)
├── navbar.tsx, starfield.tsx, rocket-illustration.tsx, theme-provider.tsx
└── ui/                    # shadcn/ui primitives
lib/
├── registration-schema.ts # Shared zod schema (client + server)
├── db/                    # Drizzle client, schema, retry helper, migrator
└── utils.ts
drizzle/                   # Generated SQL migrations + metadata
```

## Before the next induction

- **The countdown is unused.** `components/countdown.tsx` exists but no page imports it, and its `TARGET_DATE` is still `2025-02-10T10:00:00+05:30`. To use it, set a new date and render `<Countdown />` on the landing page. After the date passes it switches to "The Induction Quiz Has Begun".
- **Replace the placeholder images.** `public/` still holds the template's `placeholder-*` images.
