---
name: Bee Contest Platform
description: Architecture decisions for the LexigenZ Spelling Bee multiplayer contest system
---

## Key Architecture Decisions

**Socket.IO path:** `/api/socket.io` — all socket traffic routes through the Replit proxy's `/api/` rule to the api-server (port 8080).

**Socket singleton (frontend):** `artifacts/lexigen/src/lib/socket.ts` — lazy connect, disconnect-and-reconnect if socket is disconnected. Passes `userId` and `userName` as auth.

**Contest page structure:** Single `ContestPage` component handles all three phases (lobby → playing → finished) to avoid socket disconnect/reconnect on page navigation.

**Tables created:** `bee_contests`, `bee_contest_players`, `bee_contest_words`, `bee_contest_answers`, `bee_invites`, `bee_world_rankings` — created via raw SQL (see db-push-workaround.md).

**Scoring formula:** 100 base − 20 per hint level used + 10 speed bonus (<5s) + 15 streak bonus (streak ≥ 3).

**Why:**
- Single page avoids socket lifecycle issues mid-game.
- Path `/api/socket.io` is the only path proxied through to api-server from Replit's routing.
