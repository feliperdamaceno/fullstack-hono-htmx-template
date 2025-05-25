# Fullstack Hono HTMX Template

A complete, batteries-included template for building fullstack web applications
using [Hono](https://hono.dev) and [HTMX](https://htmx.org). This template helps
you bootstrap production-ready projects fast with a modern stack, built-in
authentication, and a clean, scalable structure.

## Built-in Features

- **Backend with Hono + HTMX**: Modern, fast, and flexible web development
  stack.
- **Tailwind CSS**: Just-in-time builds to ship only the styles you use.
- **PostgreSQL + Drizzle ORM**: Type-safe database queries and migrations.
- **Authentication System**: JWT-based authentication with session and role
  support.
- **Zod Validation in Service Layer**: All input validation is handled using
  [Zod](https://zod.dev) directly within service logic.
- **Role & User Management**: Preconfigured models, services, and repositories.
- **View Engine**: Built-in component-based view engine, easily extendable for
  layouts and pages.
- **Environment Variables**: All required environment variables are documented
  in `.env.example`.
- **Scalable Structure**: Modular architecture for long-term maintainability.

## Project Structure

```
internal/
  core/         # App core, config, DI container, middleware, routes, views
  database/     # Drizzle config, schema, migrations
  exceptions/   # Custom HTTP exceptions
  handlers/     # Request handlers (controllers)
  helpers/      # Utility functions
  middleware/   # Custom middleware (e.g., auth)
  models/       # Data models (User, Role, etc.)
  repositories/ # Data access layer
  services/     # Business logic layer (uses Zod for validation)
  types/        # Type definitions
  validators/   # Zod schemas
  views/        # View components, layouts, and pages
scripts/        # Utility scripts (e.g., DB init)
web/            # Static assets, styles, client scripts
```

## Database

- Uses **PostgreSQL** by default.
- **Drizzle ORM** enables type-safe schemas and migrations.
- Migrations located at `internal/database/migrations/`.

## Authentication & Authorization

- Full authentication system with JWT and sessions.
- User and Role management built-in.
- Logic located in `internal/services/auth.service.ts`.

## View Engine

- Located under `internal/views/`.
- Fully component-based and layout-aware.
- Supports server-side rendering and dynamic page generation.
- Easy to extend with new components and views.

## Creating New Features (Service Pattern)

To add a new feature:

1. **Model** → `internal/models/`
2. **Register Model** → `internal/database/schema.ts`
3. **Repository** → `internal/repositories/`
4. **Register Repository** → `internal/core/bindings.ts`
5. **Service** (with Zod validation) → `internal/services/`
6. **Register Service** → `internal/core/bindings.ts`
7. **Handler** → `internal/handlers/`
8. **Register Handler** → `internal/core/routes.ts`

Your route becomes available automatically once the handler is registered.

## Getting Started

1. **Install Bun** if not already installed:
   [Install Bun](https://bun.sh/docs/installation)

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Configure environment**: Copy `.env.example` to `.env` and fill in the
   required values.

4. **Generate DB migration**:

   ```bash
   bun run db:generate
   ```

5. **Run DB migrations**:

   ```bash
   bun run db:migrate
   ```

6. **Initialize DB**:

   ```bash
   bun run db:init
   ```

7. **Start the app**:

   ```bash
   bun dev
   ```

For more details, plese see the documentation in each file. The project is
structured to be readable, intuitive, and easy to extend.

## Useful Links

- [Bun Runtime](https://bun.sh)
- [Hono Documentation](https://hono.dev)
- [HTMX Documentation](https://htmx.org)
- [Drizzle ORM](https://orm.drizzle.team)
- [Zod Schema Validation](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)

## Licence

This is an open-source project and is available under the
[**MIT License**](LICENSE). You are free to use, modify, and distribute the code
in accordance with the terms of the license.

## Contributors

Contributions are highly appreciated! If you encounter any issues or have
suggestions for improvements, please feel free to open an issue or submit a pull
request.

[feliperdamaceno](https://github.com/feliperdamaceno)

## Contact me

Linkedin: [feliperdamaceno](https://www.linkedin.com/in/feliperdamaceno)
