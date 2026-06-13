# Hivoraa

A privacy-first student ecosystem — three worlds for learning, emotional safety, and anonymous crisis support.

## The Three Worlds

| World | Path | Purpose |
|-------|------|---------|
| ☀️ **Knowledge Square** | `/knowledge` | Student-only academic help, inline Reddit-style feed |
| 🛡️ **Trust Circle** | `/trust` | Semi-private emotional support, pseudonyms, warm UI |
| 🌙 **Listening Chamber** | `/chamber` | Fully anonymous crisis support, code-only return |

## Tech Stack

- Next.js 15+ (App Router)
- TypeScript · Tailwind CSS v4 · shadcn/ui
- Firebase (Auth, Firestore)
- Framer Motion · Zustand · React Hook Form · Zod

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

- **Landing:** http://localhost:3000
- **Demo:** `/login` → Try demo mode → Knowledge Square
- **Chamber:** `/chamber` — no login required

## Key Features

- **Knowledge Square:** Inline posts (no modals), difficulty barometer, deadline progress, No Reply Rescue, filters, study groups, resources, talent wall
- **Trust Circle:** Themed rooms, supportive reactions only, private journal & goals, bridges to Chamber
- **Listening Chamber:** Five support doors, tracking codes (e.g. `UBUN-7291`), emergency resources
- **Admin:** Aggregated Campus Pulse only — no individual identities
- **Bridges:** Gentle cross-world suggestions when distress or ignored posts are detected

## Project Structure

```
src/
├── app/
│   ├── knowledge/     # World 1
│   ├── trust/         # World 2
│   ├── chamber/       # World 3
│   └── admin/
├── components/
│   ├── knowledge/     # Feed, barometer, filters
│   ├── worlds/        # Bridges
│   └── landing/
├── stores/            # Zustand (app + filters)
├── schemas/           # Zod validation
└── types/
```

## Firebase Collections

`users`, `pseudonyms`, `anonymous_sessions`, `posts`, `comments`, `votes`, `study_groups`, `resources`, `talent_profiles`, `collaborations`, `trust_rooms`, `journal_entries`, `support_requests`, `anonymous_codes`, `moderator_actions`, `reports`, `notifications`

## Design

- Background: `#F5F7FA`
- Text: `#111827`
- Accent: `#2563EB`
- Rounded `2xl`, soft shadows, calm motion

MIT
