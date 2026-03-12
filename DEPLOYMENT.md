# Deployment Guide: Supabase + GitHub Pages

This portfolio uses **Supabase** for the database and **GitHub Pages** for hosting the site.

---

## Overview

| Component | Where | Notes |
|-----------|-------|-------|
| **Site (React app)** | GitHub Pages | Static files, auto-deploys on push |
| **Database** | Supabase Cloud | No deployment needed; just configure |
| **Credentials** | `.env` (local) + GitHub Secrets (CI) | Never committed to git |

---

## 1. Supabase Setup (One-time)

1. Create a project at [supabase.com](https://supabase.com).
2. Run the schema: **SQL Editor** → paste `supabase/schema.sql` → Run.
3. Create admin user: **Authentication** → **Users** → **Add user**.
4. Get credentials: **Settings** → **API**:
   - **Project URL** → `REACT_APP_SUPABASE_URL`
   - **anon public** key → `REACT_APP_SUPABASE_ANON_KEY`

See `docs/SUPABASE_SETUP.md` for details.

---

## 2. Where to Keep Credentials (.env)

### Local development

Create a `.env` file in the project root (same folder as `package.json`):

```
REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
REACT_APP_SUPABASE_ADMIN_EMAIL=admin@yourdomain.com

REACT_APP_EMAILJS_SERVICE_ID=...
REACT_APP_EMAILJS_TEMPLATE_ID=...
REACT_APP_EMAILJS_PUBLIC_KEY=...

REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=your_secure_password

REACT_APP_DEVTO_USERNAME=shamimkhaled
```

- `.env` is in `.gitignore` — **never commit it**
- Copy from `.env.example` and fill in real values

### GitHub Actions (deploy from push)

For deploys that run on GitHub (when you push to `main`), credentials go in **Repository Secrets**:

1. Repo → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** for each:

| Secret name | Required for |
|-------------|--------------|
| `REACT_APP_SUPABASE_URL` | Supabase database |
| `REACT_APP_SUPABASE_ANON_KEY` | Supabase database |
| `REACT_APP_EMAILJS_SERVICE_ID` | Contact form |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | Contact form |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | Contact form |
| `REACT_APP_ADMIN_PASSWORD` | Admin login (when Supabase not used) |
| `REACT_APP_ADMIN_USERNAME` | Optional |
| `REACT_APP_SUPABASE_ADMIN_EMAIL` | Optional |
| `REACT_APP_DEVTO_USERNAME` | Optional, for blog section |

**Security:** The Supabase **anon** key is safe to expose in the built app; it only allows public reads and writes with valid auth. Never use the **service_role** key in the frontend.

---

## 3. Deploy to GitHub Pages

### Option A: Deploy from GitHub (automatic)

1. Add the secrets above.
2. **Enable Pages** (one-time): **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `gh-pages` / `/(root)` → Save.
3. Push to `main` or `master`:

   ```bash
   git add .
   git commit -m "Deploy"
   git push origin main
   ```

4. The workflow builds and pushes to the `gh-pages` branch. Your site will be live at the Pages URL.

### Option B: Deploy from your machine

1. Ensure `.env` exists with your credentials.
2. Run:

   ```bash
   npm run build
   npm run deploy
   ```

   This pushes the `build/` folder to the `gh-pages` branch.

3. Configure Pages: **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `gh-pages`.

---

## 4. Post-Deploy

1. Site URL: `https://shamimkhaled.github.io` (user site) or `https://<username>.github.io/<repo-name>` (project repo)
2. Admin: `https://<site-url>/admin` — log in with your Supabase user.
3. First-time: click **Seed Database** if the table is empty.

---

## 5. Environment Variables Reference

| Variable | Required | Purpose |
|----------|----------|---------|
| `REACT_APP_SUPABASE_URL` | For Supabase | Project URL |
| `REACT_APP_SUPABASE_ANON_KEY` | For Supabase | Public API key |
| `REACT_APP_SUPABASE_ADMIN_EMAIL` | No | Pre-fill login email |
| `REACT_APP_ADMIN_USERNAME` | If no Supabase | Fallback admin username |
| `REACT_APP_ADMIN_PASSWORD` | Yes | Admin password (fallback) |
| `REACT_APP_EMAILJS_*` | For contact form | EmailJS credentials |
| `REACT_APP_DEVTO_USERNAME` | No | Blog section |

---

## Security Notes

- Never commit `.env` or real keys to git.
- Supabase anon key is designed for client-side use; RLS protects data.
- Use strong admin passwords.
