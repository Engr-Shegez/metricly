# Metricly

Metricly is a Next.js analytics product UI that combines a marketing landing page with a multi-page internal dashboard. The project is built as a frontend-heavy SaaS experience with mock data, interactive charts, agile task management, settings screens, and responsive layouts across desktop and mobile.

## What it includes

- Marketing home page with hero, feature, pricing, CTA, and footer sections
- Dashboard workspace with overview, reports, statistics, team, transactions, and settings pages
- Interactive Kanban board powered by `@dnd-kit`
- Charts and data visualizations built with `recharts`
- Theme switching with `next-themes`
- UI primitives based on Radix and local reusable components
- Mock business, project, and transaction data for fast iteration

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Recharts
- Radix UI
- Lucide React

## Project structure

```text
src/
  app/
    page.tsx                    # landing page
    register/page.tsx           # registration page
    dashboard/
      page.tsx                  # dashboard overview
      reports/page.tsx
      statistics/page.tsx
      team/page.tsx
      transaction/page.tsx
      settings/
  components/
    layout/                     # landing page and dashboard shell pieces
    dashboard/                  # kanban board, command palette, cursors
    tables/                     # transaction table
    ui/                         # reusable UI primitives
  lib/
    mockData.ts
    project-dashboard-data.ts
    analytics.ts
  types/
    transaction.ts
    project-dashboard.ts
```

## Getting started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available scripts

```bash
npm run dev     # start local development server
npm run build   # build for production
npm run start   # run production build
npm run lint    # run ESLint
```

## Main routes

- `/` - landing page
- `/register` - registration flow UI
- `/dashboard` - overview workspace
- `/dashboard/reports` - reporting page
- `/dashboard/statistics` - statistics and tables
- `/dashboard/team` - team page
- `/dashboard/transaction` - transaction management
- `/dashboard/settings` - settings area with profile, billing, security, team, and notifications pages

## Notes for development

- Most dashboard content currently uses local mock data from `src/lib`.
- The main overview experience is defined directly in [src/app/dashboard/page.tsx](</c:/Users/LEGION PRO 5/Desktop/metricly/src/app/dashboard/page.tsx>).
- The dashboard shell lives in [src/app/dashboard/layout.tsx](</c:/Users/LEGION PRO 5/Desktop/metricly/src/app/dashboard/layout.tsx>).
- The landing page entry point is [src/app/page.tsx](</c:/Users/LEGION PRO 5/Desktop/metricly/src/app/page.tsx>).

## Future improvements

- Connect dashboard views to a real backend
- Add authentication and protected routes
- Add tests for critical UI flows
- Replace mock datasets with live metrics and transaction feeds
