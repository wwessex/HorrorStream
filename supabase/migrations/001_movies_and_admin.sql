-- ============================================================
-- HorrorStream / DREADFLIX — Admin Movie Management Schema
-- ============================================================

-- 1. Admin Users (email whitelist)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Movies table
CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  genre TEXT,
  secondary_genres TEXT[] DEFAULT '{}',
  year INT,
  release_date DATE,
  rating TEXT,
  duration TEXT,
  director TEXT,
  cast_members TEXT[] DEFAULT '{}',
  language TEXT DEFAULT 'English',
  country TEXT DEFAULT 'US',
  content_warnings TEXT[] DEFAULT '{}',

  -- Media assets
  cover_image_url TEXT,
  thumbnail_url TEXT,
  banner_image_url TEXT,
  trailer_url TEXT,
  video_url TEXT,
  gradient TEXT,

  -- Display
  match_percent INT DEFAULT 85,
  is_original BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,

  -- Visibility & scheduling
  is_published BOOLEAN DEFAULT true,
  is_coming_soon BOOLEAN DEFAULT false,
  publish_date TIMESTAMPTZ,
  expiration_date TIMESTAMPTZ,

  -- Categorisation
  categories TEXT[] DEFAULT '{}',

  -- SEO
  meta_description TEXT,

  -- Streaming
  quality_options TEXT[] DEFAULT '{1080p}',
  subtitle_languages TEXT[] DEFAULT '{}',
  audio_languages TEXT[] DEFAULT '{English}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast public queries
CREATE INDEX idx_movies_published ON movies (is_published, publish_date, expiration_date);
CREATE INDEX idx_movies_slug ON movies (slug);
CREATE INDEX idx_movies_featured ON movies (is_featured) WHERE is_featured = true;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER movies_updated_at
  BEFORE UPDATE ON movies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public: read published, non-expired, past-publish-date movies
CREATE POLICY "Public can view published movies"
  ON movies FOR SELECT
  USING (
    is_published = true
    AND (expiration_date IS NULL OR expiration_date > now())
    AND (publish_date IS NULL OR publish_date <= now())
  );

-- Admin: full access to movies
CREATE POLICY "Admins have full access to movies"
  ON movies FOR ALL
  USING (
    auth.email() IN (SELECT email FROM admin_users)
  )
  WITH CHECK (
    auth.email() IN (SELECT email FROM admin_users)
  );

-- Admin: read admin_users table
CREATE POLICY "Admins can read admin_users"
  ON admin_users FOR SELECT
  USING (
    auth.email() IN (SELECT email FROM admin_users)
  );

-- ============================================================
-- Storage bucket for movie images
-- ============================================================
-- NOTE: Run these in the Supabase dashboard SQL editor or via supabase CLI:
--
-- INSERT INTO storage.buckets (id, name, public) VALUES ('movie-images', 'movie-images', true);
--
-- CREATE POLICY "Public read movie images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'movie-images');
--
-- CREATE POLICY "Admins can upload movie images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'movie-images'
--     AND auth.email() IN (SELECT email FROM admin_users)
--   );
--
-- CREATE POLICY "Admins can update movie images"
--   ON storage.objects FOR UPDATE
--   USING (
--     bucket_id = 'movie-images'
--     AND auth.email() IN (SELECT email FROM admin_users)
--   );
--
-- CREATE POLICY "Admins can delete movie images"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'movie-images'
--     AND auth.email() IN (SELECT email FROM admin_users)
--   );
