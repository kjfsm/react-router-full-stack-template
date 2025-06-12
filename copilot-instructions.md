# GitHub Copilot Instructions for Remix Full Stack Template

## Project Overview

This is a production-ready Remix full-stack template with modern development practices. The stack includes:

- **Framework**: Remix with TypeScript and Vite
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: remix-auth with Google and GitHub OAuth
- **UI**: Tailwind CSS with shadcn/ui components
- **Testing**: Vitest (unit) and Playwright (e2e)
- **Development**: DevContainer with Docker support
- **Deployment**: Firebase Hosting with GitHub Actions CI/CD
- **Code Quality**: Biome for linting and formatting

## Architecture Principles

### Remix Philosophy
- Server-side rendering by default
- Progressive enhancement
- Web standards over abstractions
- Data mutations through forms
- Nested routing for better UX

### Code Organization
```
app/
├── components/        # Reusable UI components
│   └── ui/           # shadcn/ui components
├── lib/              # Server-side utilities
├── routes/           # Remix routes (file-based routing)
├── styles/           # Global styles
└── utils/            # Client-side utilities
```

### Development Patterns
- Use `*.server.ts` suffix for server-only code
- Prefer `loader` functions for data fetching
- Use `action` functions for mutations
- Leverage `useFetcher` for optimistic updates
- Follow Remix's data flow patterns

## Key Guidelines

### Authentication
- Users are authenticated via OAuth (Google/GitHub)
- Use `authenticator.isAuthenticated()` in loaders
- Redirect unauthenticated users to `/login`
- Store user data in Prisma database

### Database
- Use Prisma for type-safe database operations
- Import from `~/lib/db.server.ts`
- Always include user ID in queries for data isolation
- Use transactions for complex operations

### UI Components
- Use shadcn/ui components from `~/components/ui/`
- Prefer composition over prop drilling
- Use Tailwind CSS for styling
- Follow accessibility best practices

### Testing
- Write unit tests with Vitest in `*.test.ts` files
- E2E tests with Playwright in `e2e/` directory
- Test user flows, not implementation details
- Use Docker for consistent test environments

### Environment Setup
- Copy `.env.example` to `.env` for local development
- Configure OAuth providers for authentication
- Use Docker Compose for local database
- DevContainer provides consistent development environment

## Common Tasks

### Adding a New Route
1. Create file in `app/routes/`
2. Export `loader` for data fetching
3. Export `action` for mutations
4. Export default component
5. Add authentication if needed

### Adding a New Component
1. Create in `app/components/`
2. Use TypeScript interfaces for props
3. Follow shadcn/ui patterns for UI components
4. Export from appropriate index file

### Database Changes
1. Update `prisma/schema.prisma`
2. Run `yarn db:push` for development
3. Run `yarn db:migrate` for production
4. Update types will auto-generate

### Deployment
1. Push to main branch
2. GitHub Actions runs tests
3. Deploys to Firebase Hosting
4. Configure environment variables in GitHub Secrets

## Best Practices

### Code Style
- Use Biome for formatting and linting
- Prefer explicit imports over barrel exports
- Use meaningful variable names
- Add JSDoc comments for complex functions

### Security
- Never expose secrets in client code
- Validate all user inputs
- Use CSRF protection (built into Remix)
- Sanitize database queries (Prisma handles this)

### Performance
- Use Remix's built-in optimizations
- Leverage browser caching
- Optimize database queries
- Use proper error boundaries

### Accessibility
- Use semantic HTML
- Add ARIA labels where needed
- Test with keyboard navigation
- Ensure proper color contrast

## Development Workflow

1. Open in DevContainer for consistent environment
2. Copy `.env.example` to `.env` and configure
3. Run `yarn dev` to start development server
4. Make changes and test locally
5. Run tests with `yarn test` and `yarn test:e2e`
6. Create PR for review
7. Deploy automatically on merge to main

## Troubleshooting

### Common Issues
- **Database connection**: Check DATABASE_URL in .env
- **Authentication**: Verify OAuth credentials and callback URLs
- **Build errors**: Check TypeScript types and imports
- **Test failures**: Ensure test database is running

### Debugging
- Use browser dev tools for client-side issues
- Check server logs for backend problems
- Use Prisma Studio for database inspection
- Enable Remix dev tools in development

Remember: This template prioritizes simplicity, type safety, and developer experience while following modern web standards and Remix conventions.