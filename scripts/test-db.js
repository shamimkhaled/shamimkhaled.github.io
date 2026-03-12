#!/usr/bin/env node
/**
 * Test Supabase database connection and content.
 * Run: node scripts/test-db.js
 * Requires: .env with REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const url = process.env.REACT_APP_SUPABASE_URL || '';
const key = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!url || !key) {
  console.error('Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

// Use undici fetch for reliable network in Node (Node's native fetch can fail with "fetch failed")
try {
  const { fetch: undiciFetch } = require('undici');
  globalThis.fetch = undiciFetch;
} catch (_) {
  // undici not installed, use native fetch (Node 18+)
}

async function test() {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(url, key);

  console.log('Testing Supabase connection...');
  console.log('URL:', url.replace(/^https:\/\//, 'https://***'));

  let row, error;
  try {
    const result = await supabase
      .from('portfolio')
      .select('id, data, updated_at')
      .eq('id', 1)
      .maybeSingle();
    row = result.data;
    error = result.error;
  } catch (e) {
    const msg = e.cause?.message || e.message || String(e);
    const code = e.cause?.code || e.code || '';
    console.error('Network error:', msg, code ? `(code: ${code})` : '');
    console.error('Tip: Check internet connection, firewall, or proxy. Try: npm install undici && USE_UNDICI=1 npm run test:db');
    process.exit(1);
  }

  if (error) {
    console.error('Supabase error:', error.message, '(code:', error.code + ')');
    process.exit(1);
  }

  if (!row) {
    console.log('Result: No row found (id=1). Table may be empty or schema not run.');
    return;
  }

  const keys = row.data && typeof row.data === 'object' ? Object.keys(row.data) : [];
  const hasData = keys.length > 0;

  console.log('Result: Row exists.');
  console.log('  - Has data:', hasData);
  console.log('  - Keys:', hasData ? keys.join(', ') : '(none)');
  console.log('  - Updated at:', row.updated_at || '—');

  if (!hasData) {
    console.log('\nTip: Run "Seed Database" in Admin to populate.');
  }
}

test().catch((e) => {
  const msg = e.cause?.message || e.message || String(e);
  const code = e.cause?.code || e.code || '';
  console.error('Error:', msg, code ? `(code: ${code})` : '');
  process.exit(1);
});
