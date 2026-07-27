---
name: Bee Geographic Profile
description: How geographic fields were added and why the leaderboard uses raw SQL
---

## What was added
- `country`, `city`, `institution`, `institution_type` columns added to `users` table via raw SQL (ALTER TABLE IF NOT EXISTS).
- `bee_championship_registrations` table created for World Championship sign-ups (unique on user_id + year).

## Why leaderboard uses raw pool.query
The leaderboard endpoint (`GET /api/bee/leaderboard`) uses `pool.query` (raw SQL) instead of drizzle's type-safe builder because the four new geographic columns are NOT in the drizzle TypeScript schema (`lib/db/src/schema/users.ts`). Drizzle only knows about columns it declares.

**How to apply:** Any query that needs country/city/institution/institution_type from users must use raw SQL via `pool` imported from `@workspace/db`. Do not try to add `.country` to a drizzle select on `usersTable` — it will fail at compile time.

## Championship date logic
`nextChampionshipYear()` in `bee.ts` computes the 3rd Saturday of June for the current or next calendar year. Today July 27 2026 → championship June 19 2027.

## Routes added (Phase 3 & 4)
- `GET /api/bee/profile/:userId` — returns geographic profile
- `PATCH /api/bee/profile` — updates geographic profile
- `GET /api/bee/world-championship?userId=` — championship info + user registration status
- `POST /api/bee/world-championship/register` — registers user (requires country + institution)
- Frontend: `/bee/profile` (ProtectedRoute), `/bee/world-championship` (public)
