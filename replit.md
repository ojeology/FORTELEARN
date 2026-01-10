# Fortebet Knowledge Base Application

## Overview

This is a full-stack web application serving as a knowledge base for Fortebet, a sports betting platform. The application displays organized information about bonuses, POS/terminal knowledge, and other betting-related topics in an accordion-style interface. Built with React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth UI transitions
- **Build Tool**: Vite with HMR support

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Path aliases: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API Pattern**: RESTful API endpoints under `/api/`
- **Build**: esbuild for production bundling

The server follows a layered architecture:
- `server/routes.ts` - API route definitions and database seeding
- `server/storage.ts` - Data access layer with repository pattern
- `server/db.ts` - Database connection configuration
- `server/static.ts` - Static file serving for production

### Data Model
Two main tables with a one-to-many relationship:
- **sections** - Main categories (id, title, displayOrder)
- **subsections** - Content items within sections (id, sectionId, title, content, displayOrder)

Schema defined in `shared/schema.ts` using Drizzle ORM with Zod validation via drizzle-zod.

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Database schema and TypeScript types
- `routes.ts` - API route definitions with Zod response schemas

### Development vs Production
- **Development**: Vite dev server with HMR, served through Express middleware
- **Production**: Pre-built static files served from `dist/public/`, bundled server from `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL** - Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM** - Type-safe database queries and migrations
- **drizzle-kit** - Database migration tooling (run with `npm run db:push`)

### UI Components
- **shadcn/ui** - Pre-built accessible React components (configured in `components.json`)
- **Radix UI primitives** - Underlying accessible component primitives
- **Lucide React** - Icon library

### Fonts
- Google Fonts: Inter (body text), Oswald (headers) - loaded via CDN in index.html

### Replit-specific
- `@replit/vite-plugin-runtime-error-modal` - Error overlay in development
- `@replit/vite-plugin-cartographer` - Development tooling
- `@replit/vite-plugin-dev-banner` - Development banner