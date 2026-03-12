-- Portfolio database schema for Supabase
-- Run this in Supabase Dashboard > SQL Editor

-- Single table stores entire portfolio as JSONB
CREATE TABLE IF NOT EXISTS portfolio (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Enable Row Level Security (RLS)
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running (e.g. after schema changes)
DROP POLICY IF EXISTS "Public read access" ON portfolio;
DROP POLICY IF EXISTS "Authenticated write access" ON portfolio;
DROP POLICY IF EXISTS "Authenticated insert" ON portfolio;
DROP POLICY IF EXISTS "Authenticated update" ON portfolio;

-- Policy: Anyone can read portfolio data (public site)
CREATE POLICY "Public read access" ON portfolio
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert/update (admin)
CREATE POLICY "Authenticated insert" ON portfolio
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update" ON portfolio
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Insert default row if empty
INSERT INTO portfolio (id, data)
VALUES (1, '{}')
ON CONFLICT (id) DO NOTHING;

-- Create admin user (run in Supabase Dashboard > Authentication > Users):
-- 1. Click "Add user" > "Create new user"
-- 2. Email: your-admin@email.com
-- 3. Password: (set a strong password)
-- 4. Use this email/password to log in to the Admin dashboard
