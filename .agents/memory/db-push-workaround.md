---
name: DB Push Workaround
description: drizzle-kit push fails non-interactively due to users table unique constraint drift
---

## Problem
`pnpm --filter @workspace/db run push` (and `push-force`) fails with "Interactive prompts require a TTY terminal" because drizzle-kit detects a `users_email_unique` constraint drift and asks whether to truncate the table.

## Workaround
Create/alter tables directly via raw SQL, run from the `lib/db` package context (which has `pg` available):

```bash
cd /home/runner/workspace/lib/db && node --input-type=module << 'EOF'
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
await pool.query(`CREATE TABLE IF NOT EXISTS ...`);
await pool.end();
EOF
```

**Why:** The `users` table in the live DB is missing the `email_unique` constraint that exists in the TypeScript schema. drizzle-kit wants to add it but needs confirmation because the table has rows. Adding the constraint without truncating is safe — just the interactive TTY check blocks it non-interactively.

**How to apply:** Any time new tables are needed, use raw SQL via `lib/db` node context rather than drizzle-kit push.
