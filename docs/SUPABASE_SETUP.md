# Supabase Setup Guide

This guide explains how to set up Supabase for portfolio data storage and admin authentication.

## Where Is My Data Stored?

All portfolio data is stored in **Supabase** when configured. There is no localStorage fallback for portfolio content. Configure Supabase (env vars + schema) before using the Admin dashboard.

## Overview

- **Without Supabase**: Portfolio data is stored in `localStorage`. Admin login uses username/password from `.env`.
- **With Supabase**: Portfolio data is stored in Supabase. Admin login uses Supabase Auth (email + password). Reads are public; writes require authentication.

## Setup Steps

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Create a new project (or use an existing one).
3. Wait for the project to be ready.

### 2. Run the Schema

1. Open **Supabase Dashboard** → **SQL Editor**.
2. Copy the contents of `supabase/schema.sql`.
3. Paste and run the SQL.

This creates:

- `portfolio` table (single row, JSONB data)
- Row Level Security (RLS): public read, authenticated write

### 3. Create an Admin User

1. Go to **Authentication** → **Users**.
2. Click **Add user** → **Create new user**.
3. Enter an email and password (e.g. `admin@yourdomain.com`).
4. Save. Use this email and password to log in to the Admin dashboard.

### 4. Environment Variables

Add to your `.env` file:

```env
REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Find these in **Project Settings** → **API** (Project URL and anon public key).

Optional: pre-fill the login form email:

```env
REACT_APP_SUPABASE_ADMIN_EMAIL=admin@yourdomain.com
```

### 5. Restart the App

Restart the dev server so the new env vars are picked up.

## Admin Login

- **Supabase configured**: Use the Supabase user email and password.
- **Supabase not configured**: Use `REACT_APP_ADMIN_USERNAME` and `REACT_APP_ADMIN_PASSWORD` (default `admin` / `admin123`).

## Data Flow

- **Read**: On load, `PortfolioContext` fetches from Supabase (public read). Falls back to defaults if empty.
- **Write**: When you save in the Admin dashboard, data is upserted to Supabase. RLS allows writes only for authenticated users.
- **Fallback**: If Supabase is unavailable, saves go to `localStorage` as a backup.

## Table Returns Empty?

The schema creates a row with `data = {}`. To populate it:

1. **Log in to Admin** (`/admin`) with your Supabase user email/password.
2. **Click "Seed Database"** in the header to push all default portfolio data to Supabase.
3. Or **edit any tab and click Save** — that will also write to the database.

If the table shows no rows at all: re-run `supabase/schema.sql` in the SQL Editor. Then use **Seed Database**.

### SELECT * FROM portfolio returns empty in SQL Editor?

1. **Check project**: `.env` must match the Supabase project. Compare `REACT_APP_SUPABASE_URL` with **Settings → API → Project URL**.
2. **Use explicit schema**: Run `SELECT * FROM public.portfolio;` (not just `portfolio`).
3. **Run the check script**: In **SQL Editor**, run the contents of `supabase/check-data.sql`.
4. **Table Editor**: Go to **Table Editor** → select **portfolio** table. The `data` column is JSONB — **click the cell to expand** and view the JSON. If it shows `{}` or nothing, the row exists but data is empty; use **Seed Database** in Admin.
5. **Verify via app**: If the app shows content and `npm run test:db` succeeds, data is in the DB. The SQL Editor view can lag or you may be in a different project.

### Test database from terminal

```bash
npm run test:db
```

This checks if the Supabase table has data and prints the result.
