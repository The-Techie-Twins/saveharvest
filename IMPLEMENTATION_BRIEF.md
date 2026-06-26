# SaveHarvest — Implementation Brief
## Agent Operational Guide (Claude & Gemini)

> This is the master brief for all agents working on SaveHarvest.
> Cross-reference: `saveharvest resources/SaveHarvest_Technical_Spec.md` for full schema detail.
> Cross-reference: `AGENTS.md` for hard rules and constraints.

---

## 1. Project Context

SaveHarvest is a B2B agricultural cold-chain platform built for a hackathon judged exclusively by AWS Database engineers. The judges are looking for real AWS service integration, a deliberate data model, and a live demo where the database visibly drives the UI.

**The app has a complete UI shell — every page and component exists — but zero backend. All data is hardcoded mock arrays. The entire implementation task is connecting the existing UI to real data.**

---

## 2. Tech Stack (Locked)

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.9 (App Router) |
| UI | React 19, Tailwind v4, shadcn/ui |
| Primary DB | Amazon Aurora PostgreSQL Serverless v2 + PostGIS |
| Real-time DB | Amazon DynamoDB |
| Auth | AWS Cognito + NextAuth v5 |
| ORM | Prisma (with `postgresqlExtensions` preview feature) |
| Maps | react-map-gl + Mapbox GL JS |
| AI | AWS Bedrock (Claude Haiku) |
| Storage | Amazon S3 |
| Payments | Stripe |
| State | Zustand (client), SWR (server polling) |
| Validation | Zod + React Hook Form |
| Hosting | Vercel |

---

## 3. Files to CREATE

### 3.1 Infrastructure & Config

```
prisma/
  schema.prisma              # Full DB schema — see SaveHarvest_Technical_Spec.md §8

.env.local                   # Real credentials (never commit)
.env.example                 # Template with all required key names (commit this)
```

### 3.2 AWS Client Singletons (`src/lib/`)

```
src/lib/
  db.ts                      # Prisma singleton — global.__prisma pattern for serverless
  dynamodb.ts                # DynamoDB DocumentClient singleton
  s3.ts                      # S3Client singleton + presignedPutObject helper
  bedrock.ts                 # BedrockRuntimeClient singleton + invokeModel helper
  auth.ts                    # NextAuth config — Cognito provider, session callbacks, JWT role
```

### 3.3 Next.js Middleware

```
src/
  middleware.ts              # Role-based route protection
                             # /coop/* → role === COOP
                             # /fleet/* → role === FLEET
                             # /buyer/* → role === BUYER
                             # /admin/* → role === ADMIN
                             # onboarding_completed === false → redirect /onboarding
```

### 3.4 Server Actions (`src/lib/actions/`)

```
src/lib/actions/
  auth.ts          # registerUser (Cognito + Aurora insert), completeOnboarding
  batch.ts         # addBatch, updateBatchStatus, listBatches, listUrgentBatches,
                   # listMarketplaceBatches (with dynamic pricing query)
  dispatch.ts      # createDispatchJob, updateJobStatus, getJobsForCoop, getJobsForFleet,
                   # getJobById
  order.ts         # placeOrder (SELECT FOR UPDATE row-lock in $transaction),
                   # updateOrderStatus, getOrdersForBuyer
  fleet.ts         # toggleAvailability (writes Aurora + DynamoDB), updateFleetLocation
                   # (writes DynamoDB only), acceptJob, declineJob, submitEmergencyReport
  profile.ts       # updateProfile, updateCoopLocation (PostGIS point), getProfile
  notifications.ts # createNotification, markAsRead, markAllAsRead,
                   # getNotificationsForUser
  admin.ts         # getGlobalKPIs, getAllUsers, verifyUser, getPlatformStats
  stats.ts         # upsertDailyStats (called after every completed delivery)
```

### 3.5 Zod Validation Schemas (`src/lib/validations/`)

```
src/lib/validations/
  auth.ts          # registerSchema, loginSchema, onboardingCoopSchema,
                   # onboardingFleetSchema, onboardingBuyerSchema
  batch.ts         # addBatchSchema (crop, weight, harvestTime, lifespanHours,
                   # basePrice, tempMax, grade, minOrderKg, description)
  dispatch.ts      # createJobSchema, updateJobStatusSchema, emergencyReportSchema
  order.ts         # placeOrderSchema (batchId, quantityKg, deliveryAddressId)
  profile.ts       # updateProfileSchema, updateLocationSchema ({ lat, lng })
  address.ts       # addAddressSchema (label, addressText, lat, lng, isDefault)
```

### 3.6 API Routes (`src/app/api/`)

```
src/app/api/
  auth/
    [...nextauth]/route.ts   # NextAuth handler (GET + POST)

  fleet/
    locations/route.ts       # GET → DynamoDB scan on is_available-index
                             # Returns all available fleet positions for Mapbox markers
    [id]/
      update-location/route.ts  # POST → write GPS to DynamoDB fleet-locations

  batches/
    nearby-fleet/route.ts    # GET ?batchId=X → PostGIS ST_DWithin query
                             # Returns trucks within 50km sorted by distance

  dispatch/
    recommend/route.ts       # POST → Bedrock Claude Haiku
                             # Input: batch urgency + available fleet list
                             # Output: recommended truck ID + reasoning string

  marketplace/
    listings/route.ts        # GET with filter params → dynamic pricing query
                             # SWR polls this every 30s on marketplace page

  upload/
    presign/route.ts         # POST { filename, contentType } → S3 presigned PUT URL

  webhooks/
    stripe/route.ts          # POST → verify Stripe-Signature header
                             # On payment_intent.succeeded → updateOrderStatus PAID

  platform/
    stats/route.ts           # GET → aggregate query on platform_stats + delivered orders
                             # Used by LiveImpactCounter on landing page
```

### 3.7 Shared Components (`src/components/shared/`)

```
src/components/shared/
  PerishabilityClock.tsx     # Props: { expiryAt: string, totalLifespanHours: number }
                             # Derives secondsRemaining from expiryAt - Date.now()
                             # Drives color scale: green > 48h, amber 24-48h,
                             # red < 24h, pulsing red < 5h
                             # Used in: InventoryTable, CropListingCard

  StatusBadge.tsx            # Props: { status: BatchStatus | JobStatus | OrderStatus }
                             # Renders shadcn Badge with semantic color per status value

  MapView.tsx                # Thin react-map-gl wrapper
                             # Props: { initialViewState, children }
                             # Handles NEXT_PUBLIC_MAPBOX_TOKEN injection
                             # Prevents SSR errors with dynamic import guard
```

### 3.8 Custom Hook

```
src/hooks/
  usePerishability.ts        # Args: expiryAt (ISO string), totalLifespanHours (number)
                             # Returns: { secondsRemaining, percentRemaining, urgency,
                             #           currentPricePerKg, formattedClock }
                             # Urgency levels: 'safe' | 'warning' | 'critical' | 'spoiled'
                             # Dynamic price: basePrice * (0.60 + 0.40 * percentRemaining)
                             # Updates every second via setInterval
```

### 3.9 Missing Pages

```
src/app/(dashboard)/
  admin/
    dashboard/page.tsx       # GlobalKPIGrid + PlatformHealthCharts (RSC)
    users/page.tsx           # UserManagementTable with verify toggle (RSC)
  notifications/page.tsx     # All / Unread tabs, mark-as-read actions (RSC)
  profile/page.tsx           # Shared user profile edit — name, avatar, phone (RSC)
```

### 3.10 Missing Admin Components

```
src/components/features/admin/
  GlobalKPIGrid.tsx          # Total kg rescued, active coops, revenue, batches saved
  PlatformHealthCharts.tsx   # Recharts — daily batches rescued vs spoiled over 30 days
  UserManagementTable.tsx    # All users table, is_verified toggle, role badge
```

---

## 4. Files to MODIFY

### 4.1 Package Config

```
package.json                 # Add all new deps — see §6 of Technical Spec
```

### 4.2 App Shell

```
src/app/layout.tsx           # Add: Amplify.configure() for Cognito client-side
                             # Add: NextAuth SessionProvider wrapper
                             # Add: Sonner <Toaster /> for global toasts

src/app/(dashboard)/layout.tsx
                             # Convert from "use client" to RSC
                             # Add: getServerSession() check → redirect /login if null
                             # Add: onboarding_completed check → redirect /onboarding
                             # Keep: breadcrumb logic (can move to client sub-component)
```

### 4.3 Auth Pages

```
src/app/(auth)/login/page.tsx          # Wire to Cognito signIn via NextAuth signIn()
src/app/(auth)/register/page.tsx       # Wire to Cognito signUp + Aurora user insert
src/app/(auth)/onboarding/page.tsx     # Wire role-specific form to completeOnboarding action
src/app/(auth)/forgot-password/page.tsx # Wire to Cognito forgotPassword()
src/app/(auth)/reset-password/page.tsx  # Wire to Cognito confirmForgotPassword()

src/components/features/auth/
  LoginForm.tsx              # Add: Zod schema + React Hook Form + NextAuth signIn()
  RegisterForm.tsx           # Add: Zod schema + React Hook Form + Cognito signUp()
  CoopDetailsForm.tsx        # Add: React Hook Form + completeOnboarding server action
  FleetDetailsForm.tsx       # Add: React Hook Form + completeOnboarding server action
  BuyerDetailsForm.tsx       # Add: React Hook Form + completeOnboarding server action
```

### 4.4 Co-op Features

```
src/app/(dashboard)/coop/dashboard/page.tsx
  # Convert to RSC. Fetch: listUrgentBatches() + getDailySummaryKPIs()
  # Remove: all useState timers — move to PerishabilityClock component
  # Pass real batch data with expiryAt to UrgentAlertsFeed

src/app/(dashboard)/coop/inventory/page.tsx
  # RSC. Fetch: listBatches(coopId) — sorted by expiry_at ASC
  # Pass to InventoryTable

src/app/(dashboard)/coop/dispatch/page.tsx
  # RSC for initial batch data. Client component for map interactivity.
  # Replace hardcoded truck array with SWR → /api/fleet/locations
  # Replace hardcoded batch timers with real expiry_at from DB

src/app/(dashboard)/coop/analytics/page.tsx
  # RSC. Fetch: revenue data, rescued vs spoiled aggregates from dispatch_jobs + orders

src/app/(dashboard)/coop/settings/page.tsx
  # RSC. Fetch: current profile. Pass to ProfileForm + LocationUpdater + NotificationPreferences

src/components/features/coop/
  AddBatchSheet.tsx          # Wire onSubmit to addBatch server action
                             # Add: Zod validation via React Hook Form
                             # Add: lifespan_hours field, base_price field, temperature field
                             # Add: image upload via S3 presigned URL
  InventoryTable.tsx         # Replace mock rows with Props: { batches: Batch[] }
                             # Render PerishabilityClock per row using batch.expiry_at
  UrgentBatchList.tsx        # Replace mock data with Props: { batches: UrgentBatch[] }
  UrgentAlertsFeed.tsx       # Remove useState timers — use PerishabilityClock component
  DailySummaryKPIs.tsx       # Props: { kpis: DailyKPIs } — remove hardcoded numbers
  FleetMapView.tsx           # Add: react-map-gl Map component
                             # SWR poll → /api/fleet/locations every 3s
                             # Render Marker per available truck
                             # On batch select: draw 50km radius circle layer
                             # On truck select: show TruckDetailsPopover
  LocationUpdater.tsx        # Add: react-map-gl Map with draggable Marker
                             # On marker drop: call updateCoopLocation server action
  TruckDetailsPopover.tsx    # Add: "Dispatch This Truck" button → createDispatchJob action
                             # Add: Bedrock recommendation badge if truck is AI-suggested
```

### 4.5 Fleet Features

```
src/app/(dashboard)/fleet/dashboard/page.tsx
  # RSC. Fetch: getJobsForFleet(fleetId, status: PENDING)
  # Pass to StatusToggleCard + JobRequestsFeed

src/app/(dashboard)/fleet/active-job/page.tsx
  # RSC. Fetch: getActiveJob(fleetId) — single job with status IN [ACCEPTED, EN_ROUTE, PICKUP_CONFIRMED]

src/app/(dashboard)/fleet/history/page.tsx
  # RSC. Fetch: getJobsForFleet(fleetId, status: COMPLETED) + earnings aggregate

src/components/features/fleet/
  StatusToggleCard.tsx       # Wire toggle to toggleAvailability server action
                             # Writes both Aurora profiles.fleet_is_available
                             # AND DynamoDB fleet-locations.is_available
  JobRequestsFeed.tsx        # Remove INITIAL_JOBS mock — Props: { jobs: DispatchJob[] }
                             # Accept/Decline buttons → acceptJob / declineJob server actions
                             # Use PerishabilityClock for timeToSpoilage
  LiveRouteMap.tsx           # Add: react-map-gl Map
                             # Fetch Mapbox Directions API for pickup → dropoff route
                             # Render route line layer + current position marker
  JobStatusActions.tsx       # Wire to updateJobStatus server action
                             # Buttons: "Confirm Pickup" → PICKUP_CONFIRMED
                             #          "Confirm Delivery" → COMPLETED
  EmergencyReportButton.tsx  # Wire to submitEmergencyReport server action
                             # Sets job status → EMERGENCY_FAILED
                             # Creates EMERGENCY_REPORT notification for coop
```

### 4.6 Buyer Features

```
src/app/(dashboard)/buyer/marketplace/page.tsx
  # RSC for initial listings. SWR client poll every 30s for price updates.
  # Fetch: /api/marketplace/listings with buyer's default delivery address for distance calc

src/app/(dashboard)/buyer/checkout/page.tsx
  # RSC. Read batchId from searchParams. Fetch batch + buyer addresses.
  # Wire to placeOrder server action with Stripe PaymentIntent creation

src/app/(dashboard)/buyer/orders/page.tsx
  # RSC. Fetch: getOrdersForBuyer(buyerId)

src/components/features/buyer/
  CropListingCard.tsx        # Remove internal useState timer
                             # Accept Props: { listing } with expiryAt from DB
                             # Use usePerishability hook for clock + current price
  FlashOrderGrid.tsx         # SWR poll → /api/marketplace/listings
                             # Pass listings to CropListingCard
  MarketplaceFilters.tsx     # Wire to Zustand marketplaceStore
                             # Filter state: cropType, maxDistance, maxPrice, gradeMin
  PaymentGatewayStub.tsx     # Stripe Elements integration
                             # On submit: POST /api/orders/create → Stripe PaymentIntent
  OrderSummaryCard.tsx       # Props: { batch, quantityKg, currentPricePerKg, address }
  AddressManager.tsx         # Wire to addDeliveryAddress / setDefaultAddress server actions
```

---

## 5. Skills Available (Claude Code)

| Skill | When to Use |
|---|---|
| `/verify` | After each phase — boot the app and confirm the feature works end-to-end |
| `/run` | Start dev server, open browser, test a specific flow |
| `/code-review` | Before moving to the next build phase — catch bugs early |
| `/security-review` | After completing auth + middleware — critical before any live data |
| `/claude-api` | When writing Bedrock integration — load accurate model IDs and API shape |
| `/simplify` | After wiring up any component that grew large during refactor |

---

## 6. MCP Servers to Configure

Add these to `.claude/settings.json` under `mcpServers`.

### 6.1 PostgreSQL — Direct DB Access

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "${DATABASE_URL}"],
      "description": "Direct Aurora query access — inspect schema, debug data, run PostGIS queries"
    }
  }
}
```

**What agents use this for:**
- Inspect the schema after `prisma migrate dev` to confirm columns + computed columns generated correctly
- Run `ST_DWithin` queries manually to validate geospatial results before wiring to API routes
- Query live data during debugging without needing the app running
- Verify row-lock behavior on order placement

### 6.2 Fetch — Local API Testing

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "description": "Hit local API routes + external docs (Mapbox, Stripe, Bedrock) without leaving the agent"
    }
  }
}
```

**What agents use this for:**
- Test `/api/fleet/locations`, `/api/marketplace/listings`, `/api/dispatch/recommend` while dev server is running
- Fetch Mapbox Directions API docs to get the correct response shape before building `LiveRouteMap`
- Fetch Stripe docs for PaymentIntent creation flow

### 6.3 AWS — DynamoDB + S3 + Bedrock

```json
{
  "mcpServers": {
    "aws-dynamodb": {
      "command": "uvx",
      "args": ["awslabs.amazon-dynamodb-mcp-server"],
      "env": {
        "AWS_REGION": "${AWS_REGION}",
        "AWS_ACCESS_KEY_ID": "${AWS_ACCESS_KEY_ID}",
        "AWS_SECRET_ACCESS_KEY": "${AWS_SECRET_ACCESS_KEY}"
      },
      "description": "DynamoDB table management — create tables, scan records, debug fleet location writes"
    },
    "aws-s3": {
      "command": "uvx",
      "args": ["awslabs.amazon-s3-mcp-server"],
      "env": {
        "AWS_REGION": "${AWS_REGION}",
        "AWS_ACCESS_KEY_ID": "${AWS_ACCESS_KEY_ID}",
        "AWS_SECRET_ACCESS_KEY": "${AWS_SECRET_ACCESS_KEY}"
      },
      "description": "S3 bucket management — create bucket, verify uploads, set CORS for presigned URLs"
    },
    "aws-bedrock": {
      "command": "uvx",
      "args": ["awslabs.amazon-bedrock-mcp-server"],
      "env": {
        "AWS_REGION": "${AWS_REGION}",
        "AWS_ACCESS_KEY_ID": "${AWS_ACCESS_KEY_ID}",
        "AWS_SECRET_ACCESS_KEY": "${AWS_SECRET_ACCESS_KEY}"
      },
      "description": "Bedrock model access — test dispatch recommendation prompt against Claude Haiku before wiring API route"
    }
  }
}
```

> Install via: `pip install awslabs-mcp` or `uv add awslabs-mcp`
> AWS Labs MCP repo: github.com/awslabs/mcp

### 6.4 Filesystem (Built-in to Claude Code)

Already available. No config needed.

---

## 7. Environment Variables Reference

```bash
# .env.local — never commit this file

# ── Aurora PostgreSQL (Prisma) ─────────────────────────────────────
DATABASE_URL=""

# ── AWS Cognito ────────────────────────────────────────────────────
NEXT_PUBLIC_COGNITO_USER_POOL_ID=""
NEXT_PUBLIC_COGNITO_CLIENT_ID=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# ── AWS General (DynamoDB + S3 + Bedrock) ──────────────────────────
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"

# ── DynamoDB Table Names ───────────────────────────────────────────
DYNAMODB_TABLE_FLEET_LOCATIONS="saveharvest-fleet-locations"
DYNAMODB_TABLE_NOTIFICATION_EVENTS="saveharvest-notification-events"

# ── S3 ─────────────────────────────────────────────────────────────
S3_BUCKET_NAME="saveharvest-assets"

# ── AWS Bedrock ────────────────────────────────────────────────────
BEDROCK_MODEL_ID="anthropic.claude-haiku-4-5-20251001"

# ── Mapbox ─────────────────────────────────────────────────────────
NEXT_PUBLIC_MAPBOX_TOKEN=""

# ── Stripe ─────────────────────────────────────────────────────────
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

---

## 8. NPM Install Commands

```bash
# ORM + DB driver
npm install prisma @prisma/client

# AWS SDK v3 — DynamoDB, S3, Bedrock
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install @aws-sdk/client-bedrock-runtime

# Auth
npm install next-auth @auth/core
npm install aws-amplify @aws-amplify/auth

# Validation + Forms
npm install zod react-hook-form @hookform/resolvers

# Maps
npm install react-map-gl mapbox-gl
npm install -D @types/mapbox-gl

# Client state + polling
npm install zustand swr

# Payments
npm install stripe @stripe/stripe-js

# Toast notifications
npm install sonner
```

---

## 9. Build Phase Checklist

### Phase 1 — Foundation
- [ ] `npm install` all packages above
- [ ] Create `prisma/schema.prisma` from Technical Spec §8
- [ ] Provision Aurora PostgreSQL Serverless v2 on AWS (or via Vercel AWS integration)
- [ ] Enable PostGIS: `CREATE EXTENSION IF NOT EXISTS postgis;`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Verify schema with postgres MCP: `\d+ batches` (check generated columns)
- [ ] Create DynamoDB tables: `saveharvest-fleet-locations` + `saveharvest-notification-events`
- [ ] Create `src/lib/db.ts`, `src/lib/dynamodb.ts`, `src/lib/s3.ts`, `src/lib/bedrock.ts`

### Phase 2 — Auth
- [ ] Create Cognito User Pool with groups: COOP, FLEET, BUYER, ADMIN
- [ ] Create `src/lib/auth.ts` — NextAuth v5 config with Cognito provider
- [ ] Create `src/middleware.ts` — role-based route protection
- [ ] Wire `LoginForm.tsx` → NextAuth `signIn()`
- [ ] Wire `RegisterForm.tsx` → Cognito `signUp()` + Aurora user insert
- [ ] Wire onboarding forms to `completeOnboarding` server action
- [ ] Test: register → onboarding → redirect to correct dashboard by role
- [ ] Run `/security-review`

### Phase 3 — Core Server Actions
- [ ] `src/lib/actions/batch.ts` — addBatch + listBatches + listUrgentBatches
- [ ] `src/lib/actions/fleet.ts` — toggleAvailability (dual-write Aurora + DynamoDB)
- [ ] `src/lib/actions/order.ts` — placeOrder with `SELECT FOR UPDATE` in `$transaction`
- [ ] `src/lib/actions/dispatch.ts` — createDispatchJob + updateJobStatus
- [ ] `src/lib/actions/profile.ts` — updateCoopLocation (PostGIS point write)
- [ ] Wire `AddBatchSheet.tsx` to addBatch — confirm batch appears in DB

### Phase 4 — Real-time Fleet Map
- [ ] `src/app/api/fleet/locations/route.ts` — DynamoDB GSI scan → return fleet positions
- [ ] `src/app/api/fleet/[id]/update-location/route.ts` — write GPS to DynamoDB
- [ ] Wire `FleetMapView.tsx` to react-map-gl + SWR polling
- [ ] Wire `LocationUpdater.tsx` to Mapbox marker + updateCoopLocation action
- [ ] `src/app/api/batches/nearby-fleet/route.ts` — PostGIS radius query
- [ ] On batch select in dispatch: call nearby-fleet, draw 50km ring on map

### Phase 5 — Perishability Engine
- [ ] `src/hooks/usePerishability.ts`
- [ ] `src/components/shared/PerishabilityClock.tsx`
- [ ] `src/components/shared/StatusBadge.tsx`
- [ ] Remove all hardcoded timer state from pages — replace with PerishabilityClock
- [ ] Verify clock pulses red in demo when < 5h remaining

### Phase 6 — Marketplace (Dynamic Pricing)
- [ ] `src/app/api/marketplace/listings/route.ts` — dynamic pricing SQL query
- [ ] Wire `FlashOrderGrid.tsx` to SWR + `/api/marketplace/listings`
- [ ] Wire `CropListingCard.tsx` to `usePerishability` hook
- [ ] Wire checkout → `placeOrder` → Stripe PaymentIntent
- [ ] Wire `stripe/route.ts` webhook → `updateOrderStatus PAID`

### Phase 7 — Bedrock AI Dispatch
- [ ] `src/app/api/dispatch/recommend/route.ts`
- [ ] Prompt: batch urgency + weight + temp requirement + available fleet list (distance, capacity, temp rating)
- [ ] Response: `{ recommendedFleetId, reason, confidenceScore }`
- [ ] Show "AI Recommended" badge on the suggested truck in FleetMapView
- [ ] Test with fetch MCP before wiring to UI

### Phase 8 — Missing Pages + Admin
- [ ] `/admin/dashboard` — GlobalKPIGrid + PlatformHealthCharts
- [ ] `/admin/users` — UserManagementTable + verify toggle
- [ ] `/notifications` — grouped by type, All/Unread tabs
- [ ] `/profile` — edit name, avatar (S3 upload), phone

### Phase 9 — Impact Counter + Polish
- [ ] `src/lib/actions/stats.ts` — upsertDailyStats (called in order + dispatch completion)
- [ ] `src/app/api/platform/stats/route.ts` — aggregate query
- [ ] Wire `LiveImpactCounter` on landing page to real platform_stats data
- [ ] Run `/verify` on full demo flow: register → add batch → dispatch → buyer purchases
- [ ] Run `/code-review high`
