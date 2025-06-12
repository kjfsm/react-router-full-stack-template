# 🚀 Remix Full Stack Template

A modern, production-ready full-stack template built with Remix, featuring authentication, database integration, UI components, testing, and deployment automation.

## ✨ Features

- **🎯 Remix Framework** - Modern full-stack React framework with SSR and progressive enhancement
- **🔐 Authentication** - OAuth integration with Google and GitHub via remix-auth
- **🗄️ Database** - PostgreSQL with Prisma ORM for type-safe database operations
- **🎨 UI Components** - Tailwind CSS with shadcn/ui component library
- **🧪 Testing** - Vitest for unit tests and Playwright for end-to-end testing
- **🐳 DevContainer** - Consistent development environment with Docker
- **🚀 Deployment** - Firebase Hosting with GitHub Actions CI/CD
- **🔧 Developer Tools** - Biome for linting/formatting, TypeScript, and more
- **🤖 AI Ready** - GitHub Copilot integration with detailed instructions

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Remix, React, TypeScript, Vite |
| **Database** | PostgreSQL, Prisma ORM |
| **Authentication** | remix-auth, Google OAuth, GitHub OAuth |
| **UI/Styling** | Tailwind CSS, shadcn/ui, Radix UI |
| **Testing** | Vitest, Playwright, Docker |
| **Development** | DevContainer, Docker Compose, Biome |
| **Deployment** | Firebase Hosting, GitHub Actions |
| **Package Manager** | Yarn |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Git

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd remix-full-stack-template

# Copy environment variables
cp .env.example .env

# Install dependencies
yarn install
```

### 2. Start Development Environment

#### Option A: DevContainer (Recommended)
1. Open the project in VS Code
2. When prompted, click "Reopen in Container"
3. VS Code will build and start the development environment

#### Option B: Local Development
```bash
# Start database
docker-compose up -d db

# Generate Prisma client and setup database
yarn db:generate
yarn db:push

# Start development server
yarn dev
```

### 3. Configure Authentication (Optional)

To enable OAuth authentication, set up providers and add credentials to `.env`:

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add redirect URI: `http://localhost:3000/auth/google/callback`
4. Add credentials to `.env`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set callback URL: `http://localhost:3000/auth/github/callback`
4. Add credentials to `.env`:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   ```

## 📁 Project Structure

```
├── app/
│   ├── components/          # Reusable React components
│   │   └── ui/             # shadcn/ui components
│   ├── lib/                # Server-side utilities
│   │   ├── auth.server.ts  # Authentication logic
│   │   ├── db.server.ts    # Database client
│   │   └── session.server.ts # Session management
│   ├── routes/             # Remix routes (file-based routing)
│   ├── styles/             # Global styles and CSS
│   └── utils/              # Client-side utilities
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Database seeding
├── e2e/                   # Playwright end-to-end tests
├── tests/                 # Test utilities and setup
├── .devcontainer/         # DevContainer configuration
├── .github/workflows/     # GitHub Actions CI/CD
└── docker-compose*.yml    # Docker configurations
```

## 🧪 Testing

```bash
# Run unit tests
yarn test

# Run E2E tests (requires development server running)
yarn test:e2e

# Install Playwright browsers (first time only)
npx playwright install
```

## 🚀 Deployment

### Firebase Hosting

1. **Setup Firebase Project**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login and initialize
   firebase login
   firebase init
   ```

2. **Configure GitHub Secrets**
   Add these secrets to your GitHub repository:
   - `DATABASE_URL` - Production database connection string
   - `SESSION_SECRET` - Random secret for session encryption
   - `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON
   - `FIREBASE_PROJECT_ID` - Your Firebase project ID
   - OAuth credentials (if using authentication)

3. **Deploy**
   ```bash
   # Push to main branch triggers automatic deployment
   git push origin main
   ```

### Manual Deployment

```bash
# Build for production
yarn build

# Start production server
yarn start
```

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn lint` | Run linter |
| `yarn lint:fix` | Fix linting issues |
| `yarn format` | Format code |
| `yarn test` | Run unit tests |
| `yarn test:e2e` | Run E2E tests |
| `yarn typecheck` | Check TypeScript types |
| `yarn db:generate` | Generate Prisma client |
| `yarn db:push` | Push schema changes to database |
| `yarn db:migrate` | Create and run migrations |
| `yarn db:studio` | Open Prisma Studio |

### Database Management

```bash
# Generate Prisma client after schema changes
yarn db:generate

# Push schema changes to development database
yarn db:push

# Create a migration for production
yarn db:migrate

# Open database GUI
yarn db:studio

# Seed database with sample data
yarn db:seed
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/remixapp_dev"

# Authentication
SESSION_SECRET="your-session-secret-change-this-in-production"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### Docker Development

The template includes Docker configurations for consistent development:

- `docker-compose.dev.yml` - Development environment with database
- `docker-compose.yml` - Production environment
- `.devcontainer/` - VS Code DevContainer configuration

## 🤖 GitHub Copilot Integration

This template includes comprehensive Copilot integration:

- `copilot-instructions.md` - Detailed instructions for AI assistance
- `copilot-setup-steps.yml` - Step-by-step setup guide
- Optimized code structure for AI understanding
- Extensive documentation and comments

## 📚 Key Concepts

### Remix Philosophy
- **Server-side rendering** by default for better performance and SEO
- **Progressive enhancement** - works without JavaScript
- **Web standards** over framework abstractions
- **Nested routing** for better user experience
- **Forms and mutations** using web standards

### Authentication Flow
1. User clicks login button
2. Redirected to OAuth provider (Google/GitHub)
3. Provider redirects back with authorization code
4. Server exchanges code for user profile
5. User record created/updated in database
6. Session established with secure cookie

### Database Patterns
- **Type-safe queries** with Prisma
- **User data isolation** - all queries scoped to authenticated user
- **Optimistic updates** using Remix's `useFetcher`
- **Schema migrations** for production deployments

## 🔒 Security

- **Session management** with secure HTTP-only cookies
- **CSRF protection** built into Remix forms
- **SQL injection prevention** via Prisma's type-safe queries
- **Environment variable validation**
- **OAuth security** following provider best practices

## 📈 Performance

- **Server-side rendering** for fast initial page loads
- **Automatic code splitting** via Remix
- **Optimistic UI updates** for better perceived performance
- **Database query optimization** with Prisma
- **Static asset optimization** via Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and add tests
4. Run tests: `yarn test && yarn test:e2e`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Ensure PostgreSQL is running
docker-compose up -d db

# Check connection string in .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/remixapp_dev"
```

**Authentication Not Working**
- Verify OAuth credentials in `.env`
- Check callback URLs match your provider settings
- Ensure OAuth apps are properly configured

**Build Failures**
```bash
# Check TypeScript errors
yarn typecheck

# Verify dependencies
yarn install
```

**Tests Failing**
```bash
# Ensure test database is running
docker-compose --profile test up -d

# Run tests individually
yarn test --reporter=verbose
```

For more detailed troubleshooting, see `copilot-setup-steps.yml`.

## 🌟 What's Next?

- [ ] Add more authentication providers (Discord, Twitter, etc.)
- [ ] Implement email/password authentication
- [ ] Add file upload capabilities
- [ ] Integrate with external APIs
- [ ] Add real-time features with WebSockets
- [ ] Implement caching strategies
- [ ] Add monitoring and analytics
- [ ] Create mobile app with React Native

---

**Happy coding! 🎉**

For detailed setup instructions and AI assistance, check out the `copilot-instructions.md` and `copilot-setup-steps.yml` files.