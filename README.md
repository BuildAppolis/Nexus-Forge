# NexusForge: Next-Gen Web Development Boilerplate

## Installation and Deployment Guide

NexusForge is a cutting-edge boilerplate for Next.js 14, featuring shadcn/ui, Stripe integration, Lucia authentication, Prisma ORM, PostgreSQL, S3 compatibility, Tailwind CSS, and the full T3 stack with tRPC.

## Table of Contents

- [NexusForge: Next-Gen Web Development Boilerplate](#nexusforge-next-gen-web-development-boilerplate)
  - [Installation and Deployment Guide](#installation-and-deployment-guide)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Development](#development)
  - [Testing with Playwright](#testing-with-playwright)
  - [Production Deployment](#production-deployment)
  - [Troubleshooting](#troubleshooting)

## Prerequisites

Ensure you have the following installed:
- Node.js (v18 or later)
- pnpm
- PostgreSQL
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nexusforge.git
   cd nexusforge
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Environment Setup

1. Rename `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and update all the variables with your actual values.

3. The `env.js` file in the root directory ensures type safety for your environment variables. If you add new environment variables, make sure to update both `.env` and `env.js`.

## Development

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open `http://localhost:3000` in your browser.

3. The tRPC API routes are located in `/server/api/routers`. Add new routers here and import them in `/server/api/root.ts`.

4. The Prisma schema is located at `prisma/schema.prisma`. After making changes to the schema, run:
   ```bash
   pnpm db:push
   ```

5. To seed the database:
   ```bash
   pnpm db:seed
   ```

## Testing with Playwright

1. Install Playwright browsers:
   ```bash
   pnpm playwright install
   ```

2. Run Playwright tests:
   ```bash
   pnpm test:e2e
   ```

3. To open Playwright UI for debugging:
   ```bash
   pnpm test:e2e:ui
   ```

4. Playwright test files are located in the `e2e` directory. Add new tests there.

## Production Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

3. For database migrations in production:
   ```bash
   pnpm db:migrate:deploy
   ```

4. Ensure all environment variables are properly set in your production environment.

5. Set up a reverse proxy (e.g., Nginx) and SSL certificates for secure HTTPS connections.

6. Configure your Stripe webhook endpoint in the Stripe dashboard to point to your production URL.

## Troubleshooting

- If you encounter TypeScript errors related to environment variables, ensure that both `.env` and `env.js` are properly configured.
- For database connection issues, check your `DATABASE_URL` in the `.env` file and ensure your PostgreSQL server is running.
- If Playwright tests fail, make sure you have the latest browsers installed and your application is running on the expected port.

For more detailed information, refer to the documentation of individual packages used in NexusForge.