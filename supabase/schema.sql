-- Create Profile Table
CREATE TABLE public.profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  role_subtitle TEXT,
  bio TEXT,
  experience_years INTEGER,
  avatar_url TEXT,
  email TEXT,
  location TEXT,
  website TEXT,
  socials JSONB, -- Stores { github: "", linkedin: "" }
  education JSONB[], -- Array of JSON objects for multiple entries
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Skills Table
CREATE TABLE public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon_name TEXT,
  level INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Projects Table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  category TEXT,
  image_url TEXT,
  tags TEXT[],
  role TEXT,
  company TEXT,
  period TEXT,
  achievements TEXT[],
  stats JSONB[], -- Array of { label, value }
  case_study JSONB, -- Stores complex nested object
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public profiles are viewable by everyone" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (true);

-- Allow authenticated users (you) to insert/update/delete
-- Since you are the only user, this simple check defaults to "any logged in user"
CREATE POLICY "Enable insert for authenticated users only" ON public.profile FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON public.profile FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON public.skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON public.skills FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON public.projects FOR DELETE TO authenticated USING (true);
