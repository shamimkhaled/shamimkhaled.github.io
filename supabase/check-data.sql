-- Run this in Supabase Dashboard → SQL Editor to verify portfolio data
-- If you see 0 rows, ensure you're in the correct project (check Settings → API → Project URL)

-- Check if table exists and row count
SELECT COUNT(*) AS row_count FROM public.portfolio;

-- Fetch the row (data is JSONB - click to expand in results)
SELECT id, updated_at, 
       jsonb_pretty(data) AS data_preview 
FROM public.portfolio 
WHERE id = 1;

-- Or just raw select
SELECT * FROM public.portfolio;
