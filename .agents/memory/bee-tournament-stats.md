---
name: Bee Tournament + Stats System
description: Phase 5 (tournament brackets + spectator) and Phase 6 (stats + achievements + admin) added in one session.
---

## DB tables added (raw SQL migration)
- `bee_tournaments` — id, name, level, status, organiser_id, current_round, total_rounds
- `bee_tournament_players` — tournament_id, user_id, status (active/eliminated/winner), eliminated_in_round, final_rank
- `bee_tournament_rounds` — tournament_id, round_number, round_name, contest_id (FK), status, advancing_count
- `bee_achievements` — user_id, achievement_key (UNIQUE per user), earned_at
- `users.is_admin` BOOLEAN added

## Tournament bracket design
Group-elimination (not 1v1 matchups): all players compete in one contest per round; top N advance.
- 2 players → 1 round (Final)
- 3-6 players → 2 rounds (Semis → Final)
- 7-8 players → 3 rounds (Quarters → Semis → Final)

## API routes added
- `POST /api/bee/tournaments` — create tournament + auto-create Round 1 contest
- `GET /api/bee/tournaments/:id` — full bracket with round results
- `POST /api/bee/tournaments/:id/advance` — eliminate bottom players, create next round contest
- `GET /api/bee/users/:userId/tournaments` — user tournament history
- `GET /api/bee/stats/:userId` — full stats (overview, byLevel, recentContests, scoreHistory, achievements)
- `GET /api/bee/achievements/:userId` — all achievements with earned status
- `GET /api/bee/admin/check?userId=` — is-admin check
- `GET /api/bee/admin/overview?userId=` — platform stats
- `GET /api/bee/admin/contests?userId=` — paginated contest list
- `GET /api/bee/admin/users?userId=` — paginated user list
- `POST /api/bee/admin/contests/:id/cancel` — force cancel
- `POST /api/bee/admin/users/:id/toggle-admin` — toggle admin flag

## Socket additions (bee-socket.ts)
- `bee:spectate` now sends `bee:spectator-state` (full snapshot: status, currentWord, leaderboard) to new spectator
- `bee:spectator-count` broadcast to whole room on spectator join/leave
- `bee:join-tournament` joins `tournament:<id>` room for tournament notifications
- After contest ends: `checkAchievements()` called for each player (non-blocking); `bee:achievements` emitted if any earned; `bee:tournament-round-ended` emitted to tournament room

## Achievement keys
first_contest, first_win, streak_master (5+ streak), perfect_speller, speed_demon (3+ answers <3s),
scholar (all 4 levels), hat_trick (3 wins), world_contender, tournament_winner, centurion (100+ pts)

**Why achievements use pool.query (not drizzle):** bee_achievements is not in the Drizzle schema TypeScript file. Always insert/query via pool.

## Frontend pages
- `/bee/tournament/create` (ProtectedRoute) — tournament organiser form
- `/bee/tournament/:id` (ProtectedRoute) — bracket view + advance-round button for organiser
- `/bee/watch/:contestId` (public) — spectator view with purple banner, live word + leaderboard
- `/bee/stats` (ProtectedRoute) — stats tiles + score trend chart + history + achievements tabs
- `/bee/admin` (ProtectedRoute) — admin-gated: overview stats, contest list (with cancel), user list (with toggle-admin)

## Navbar links added
🏆 Tourney → /bee/tournament/create, 📊 Stats → /bee/stats (both ProtectedRoute)
