-- Run this in your Supabase SQL editor at supabase.com
-- Dashboard → SQL Editor → New Query → paste & run

CREATE TABLE IF NOT EXISTS waitlist (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name  TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  language    TEXT NOT NULL,   -- which African language they want to learn
  persona     TEXT NOT NULL,
  level       TEXT NOT NULL,
  budget      TEXT NOT NULL,
  pain_point       TEXT,
  creator_interest TEXT,   -- 'yes' | 'maybe' | 'no' | null
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- If the table already exists, run these migrations:
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'unspecified';
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS creator_interest TEXT;

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);

-- Row Level Security (keep data private)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write (from your API)
CREATE POLICY "Service role only" ON waitlist
  USING (false)
  WITH CHECK (false);
