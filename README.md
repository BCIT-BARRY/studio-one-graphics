# Studio One Graphics

Premium automotive wraps, paint protection film, ceramic coatings, and custom graphics. Built with Next.js, Supabase, and Tailwind CSS.

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |

## Deployment

Deployed to Railway via Docker. See `Dockerfile` and `railway.toml` for config.

## Branch Strategy

- `main` — production (protected, requires PR)
- `dev` — testing/staging (default branch)
- Feature branches merge into `dev`, then `dev` merges into `main`
