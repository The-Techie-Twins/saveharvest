<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# SaveHarvest — Agent Operating Rules

> Read `IMPLEMENTATION_BRIEF.md` (project root) before touching any file.
> Read `saveharvest resources/SaveHarvest_Technical_Spec.md` for the full schema and services reference.

## Non-negotiable Rules

1. **No mock data in server code.** Pages that currently use hardcoded arrays must be refactored to use RSC + Prisma queries. Mock values are UI prototypes only — never final.
2. **PostGIS columns use `Unsupported(...)` in Prisma.** Never try to type them as `String` or `Float`. Use raw SQL via `$queryRaw` for all geometry reads/writes.
3. **All Geography writes go through a typed server action with Zod validation.** Never accept raw lat/lng from the client without parsing.
4. **DynamoDB is for fleet GPS and notification events only.** Do not move relational data (orders, batches, users) into DynamoDB.
5. **AWS Cognito owns all passwords and reset flows.** Never store `password_hash` or `reset_token` in Aurora. The `users` table is linked by `cognito_sub` only.
6. **Server Actions must call `revalidatePath` after every mutation** that affects a visible page.
7. **`expiry_at` and `price_per_kg` are GENERATED columns in Aurora.** Never compute them in application code — always read from the DB.
8. **Mapbox token is `NEXT_PUBLIC_MAPBOX_TOKEN`.** All three map components (`FleetMapView`, `LiveRouteMap`, `LocationUpdater`) use `react-map-gl`. Never use Leaflet.
9. **Order placement uses `SELECT ... FOR UPDATE` row-locking** to prevent double-buying the same batch. This must be done inside a Prisma `$transaction`.
10. **`fleet_is_available` is the single source of truth for fleet availability.** It lives in `profiles` (Aurora) and is mirrored into DynamoDB `fleet-locations` on every toggle. Never check only one source.

## Stack Versions in Use

- Next.js 16.2.9 (App Router, React Server Components, Server Actions)
- React 19.2.4
- Tailwind CSS v4
- shadcn/ui (component primitives already installed in `src/components/ui/`)

## Folder Conventions

- Server actions → `src/lib/actions/<domain>.ts`
- Zod schemas → `src/lib/validations/<domain>.ts`
- AWS clients (singleton) → `src/lib/db.ts`, `src/lib/dynamodb.ts`, `src/lib/s3.ts`, `src/lib/bedrock.ts`
- Shared UI → `src/components/shared/`
- Route-specific components → `src/components/features/<role>/`
- API routes → `src/app/api/<resource>/route.ts`

## Build Order — Do Not Skip Steps

1. `prisma/schema.prisma` + `prisma migrate dev` + PostGIS extension enabled
2. `src/lib/auth.ts` + `src/middleware.ts` + NextAuth Cognito provider
3. Server actions (batch → dispatch → order → fleet → profile)
4. DynamoDB client + `/api/fleet/locations` polling endpoint
5. Mapbox install + `FleetMapView` + `LiveRouteMap` + `LocationUpdater`
6. `usePerishability` hook + `PerishabilityClock` + `StatusBadge` shared components
7. Wire all existing pages to real data (replace every hardcoded array)
8. Bedrock dispatch recommendation (`/api/dispatch/recommend`)
9. Missing pages: `/admin/dashboard`, `/admin/users`, `/notifications`, `/profile`
10. `platform_stats` aggregation + `LiveImpactCounter` real data
