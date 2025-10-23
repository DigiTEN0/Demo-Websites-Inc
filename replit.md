# Dutch Roofing Company Website

## Overview

This is a professional multi-tenant demo website system for a Dutch web developer who builds roofing company websites. The system enables rapid creation of customized demo sites for potential clients, with each demo having a unique URL (demos.digiten.nl/company-slug), all running on a single deployment.

**Key Features:**
- Multi-tenant architecture supporting unlimited demo sites simultaneously
- Each demo has a unique URL slug and customized business information
- Complete demo management dashboard (create, edit, preview, delete)
- Public demo viewer that displays customized roofing websites
- Single deployment architecture (portable, not tied to Replit)
- Designed for Railway deployment with Vimexx-hosted domain
- Admin dashboard for managing base template settings
- Contact form and quote request system

## Recent Changes

**October 23, 2025 - Multi-Tenant Demo System Implementation:**
- Created database schema for demos table with all customization fields
- Implemented complete CRUD API endpoints for demo management (/api/demos/*)
- Built demo management dashboard with search, create, edit, preview, delete
- Created public demo viewer that renders customized sites based on URL slug
- Updated routing to support demo URLs pattern (/:slug for public demos)
- Added demo color loading to apply per-demo primary colors globally
- Integrated demo management link in main dashboard navigation
- All demo management endpoints protected with authentication

**October 23, 2025 - Replit Environment Setup:**
- Installed all npm dependencies (490 packages)
- Created .gitignore file for Node.js/TypeScript project
- Created attached_assets/logos directory for logo uploads
- Configured development workflow to run on port 5000
- Configured deployment settings for production (autoscale)
- Verified website loads correctly with all features working
- Default admin credentials: info@digiten.nl / digiten339584!

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **UI Components:** Shadcn/ui component library with Radix UI primitives
- **Styling:** Tailwind CSS with custom design system
- **State Management:** TanStack Query (React Query) for server state
- **Forms:** React Hook Form with Zod validation

**Design System:**
- Custom theme based on "New York" Shadcn variant
- Typography: Inter (body) and Poppins (headings) from Google Fonts
- Color scheme: Neutral base with customizable primary colors
- Responsive breakpoints: mobile-first approach (md: 768px, lg: 1024px)
- Consistent spacing system using Tailwind's spacing scale

**Key Architectural Decisions:**
- Component-based architecture with reusable UI primitives
- Separation of page components from shared UI components
- Co-located styles using Tailwind utility classes
- Type-safe API communication using TypeScript interfaces

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database ORM:** Drizzle ORM
- **Session Management:** Express-session with MemoryStore (development)
- **Build Tool:** esbuild for production bundling

**API Design:**
- RESTful API endpoints under `/api/*` namespace
- Session-based authentication for admin dashboard
- JSON request/response format
- Centralized error handling

**Data Layer:**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based storage abstraction (`IStorage`) for easy database swapping
- Four main data models: Users, SiteSettings, ContactSubmissions, Demos
- Schema definitions using Drizzle ORM with Zod validation
- Demo schema includes: slug, businessName, logoText, logoUrl, contact info, primaryColor

**Session Architecture:**
- Cookie-based sessions with 7-day expiration
- HTTP-only cookies for security
- Secure flag enabled in production
- Memory-based session store (suitable for single-instance deployments)

**Rationale:** The in-memory storage approach allows rapid development and testing without database setup. The interface-based design (`IStorage`) enables seamless migration to PostgreSQL or other databases by implementing the interface with actual database queries.

### Application Structure

**Monorepo Layout:**
- `client/` - React frontend application
- `server/` - Express backend application  
- `shared/` - Shared types and schemas between frontend/backend
- `attached_assets/` - Static assets (images)

**Route Mapping:**
- `/` - Base template home page
- `/diensten/:id` - Service detail pages
- `/login` - Admin login
- `/dashboard` - Admin dashboard (protected)
- `/dashboard/demos` - Demo management dashboard (protected)
- `/dashboard/demos/new` - Create new demo form (protected)
- `/dashboard/demos/:id/edit` - Edit demo form (protected)
- `/:slug` - Public demo viewer (loads customized demo by slug)
- `/api/*` - Backend API endpoints

**Multi-Tenant Architecture:**
- Single codebase serves unlimited demos simultaneously
- Slug-based routing identifies which demo to display
- Each demo loads its own primary color and business information
- Demo data stored separately from base template settings
- Authentication required only for demo management, not viewing

### Development Workflow

**Build Process:**
- Vite for frontend development and production builds
- Hot Module Replacement (HMR) for fast development
- TypeScript compilation with strict mode
- Separate build outputs: `dist/public` (frontend), `dist` (backend)

**Development Server:**
- Vite dev server proxied through Express
- Single port deployment (Express serves both API and frontend)
- Request logging middleware for API calls
- Development-only error overlays and debugging tools

## External Dependencies

### Third-Party Services

**Google Fonts:**
- Inter font family (weights: 400, 500, 600, 700)
- Poppins font family (weights: 600, 700)
- Loaded via CDN with preconnect optimization

**Google Maps:**
- Embedded maps using Google Maps Embed API
- API key configured for map display
- Used for business location visualization

**WhatsApp Business:**
- Click-to-chat integration using `wa.me` links
- Floating WhatsApp button for direct customer contact
- Phone number format: international format without special characters

### Database

**Current Setup:**
- In-memory data storage for development
- Drizzle ORM configured for PostgreSQL migration path

**Database Schema (prepared for PostgreSQL):**
- `users` - Admin users with email/password authentication
- `site_settings` - Base template customizable business information (single record)
- `contact_submissions` - Customer inquiries and quote requests
- `demos` - Demo website configurations with unique slugs and business information

**Configuration:**
- Drizzle Kit configured with `drizzle.config.ts`
- Connection via `DATABASE_URL` environment variable
- Migration files output to `./migrations`
- Uses `@neondatabase/serverless` driver

**Migration Path:** The application is designed to easily switch from in-memory storage to PostgreSQL by:
1. Provisioning a database and setting `DATABASE_URL`
2. Running `npm run db:push` to create schema
3. Updating the storage implementation to use Drizzle queries instead of Maps

### UI Component Libraries

**Radix UI:**
- Comprehensive set of unstyled, accessible UI primitives
- Components include: Accordion, Dialog, Dropdown, Select, Toast, etc.
- Provides accessibility and keyboard navigation out-of-the-box

**Shadcn/ui:**
- Pre-styled components built on Radix UI
- Customized with Tailwind CSS
- Copy-paste component model (not npm package)
- Configured via `components.json`

**Additional Libraries:**
- `class-variance-authority` - Type-safe component variants
- `cmdk` - Command menu component
- `embla-carousel-react` - Carousel functionality
- `lucide-react` - Icon library
- `react-icons` - Additional icons (social media)

### Development Tools

**Replit Integration:**
- `@replit/vite-plugin-runtime-error-modal` - Error overlays
- `@replit/vite-plugin-cartographer` - Code mapping
- `@replit/vite-plugin-dev-banner` - Development banner

**Build Tools:**
- Vite 5.x with React plugin
- PostCSS with Tailwind CSS and Autoprefixer
- TypeScript compiler with strict checking
- esbuild for fast production builds