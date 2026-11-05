-- Run in Cloudflare D1 Console for the database bound as BLOG_DB.
CREATE TABLE IF NOT EXISTS blog_views (
  slug TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0
);
