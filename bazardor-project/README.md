# BazarDor (বাজার দর) — beginner setup

## Run on Windows
1. Extract this ZIP. Open VS Code → File → Open Folder → choose the extracted `bazardor-project` folder (the one containing `package.json`).
2. VS Code → Terminal → New Terminal.
3. Run these commands one at a time:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

4. Keep the terminal open and visit http://localhost:3000. Stop the server with Ctrl+C.

## Features
Responsive Bangla home page; Bangla date; category navigation; animated ticker; top six price risers/fallers; all products; category filtering and price sorting; protected product detail; Better Auth email/password; Google/GitHub OAuth integration; profile name update; loading and 404 pages; toast notifications.

## API
Primary base: https://openapi.programming-hero.com/api/bazardor
Endpoints used: `/products`, `/products/:id`, `/categories`. If needed, change `API` in `lib/products.ts` to `https://api.api-store.workers.dev/api/bazardor` or `https://api.abcz.workers.dev/api/bazardor`. API response fields can vary; verify live data. If the API is unavailable, sample fallback prices appear with a visible demo notice; these are not real market prices.

## Authentication
Better Auth uses a local SQLite file for local development. Email/password works after dependencies install. Google/GitHub require OAuth credentials in `.env.local`; see `.env.example`. OAuth callbacks: `http://localhost:3000/api/auth/callback/google` and `/api/auth/callback/github`.

## Vercel warning
A local SQLite file is not durable on Vercel serverless. For production accounts, configure a hosted database and corresponding Better Auth adapter before deployment. Set `BETTER_AUTH_URL` to your deployed HTTPS URL and configure OAuth callback URLs.

## 8+ meaningful Git commits
Suggested milestones: (1) initialize app, (2) global responsive layout, (3) API integration, (4) home/ticker, (5) category/sorting, (6) protected details, (7) authentication, (8) profile and error pages, (9) documentation. Commit actual work as you progress; don't fabricate history.

## Submission checklist
- `npm run build` succeeds
- API returns actual data (not fallback demo data)
- signup/signin/protected page/profile tested
- OAuth configured if required
- deployed URL and GitHub repository submitted

The original Figma file was not supplied here; styling follows the written brief rather than exact Figma matching. Review the code and be prepared to explain the main features.
