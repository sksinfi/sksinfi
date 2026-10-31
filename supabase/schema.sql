-- ==============================================================================
-- SKS INFI SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Contact Form Inquiries
create table if not exists public.contact_enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  address text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'contacted', 'closed')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Loan & Investment Specific Inquiries
create table if not exists public.loan_enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text,
  phone text not null,
  service_category text not null, -- 'Loan', 'Investment', 'Insurance', 'Real Estate', 'Taxation'
  product_name text not null,     -- 'Home Loan', 'Mutual Funds', 'Business Loan', etc.
  loan_amount numeric,
  city text,
  message text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'approved', 'rejected', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Partner With Us (DSA / Referral Partners)
create table if not exists public.partner_enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  mobile text not null,
  country text default 'India',
  city text not null,
  product_interest text not null,
  experience_years text,
  message text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Career Applications
create table if not exists public.career_applications (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  mobile text not null,
  location text,
  position text not null,
  vertical text,
  experience text,
  resume_url text,
  app_info text,
  status text not null default 'applied' check (status in ('applied', 'shortlisted', 'interviewed', 'hired', 'rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Dynamic Site Banners & Notifications
create table if not exists public.site_banners (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  image_url text not null,
  target_url text,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Dynamic Financial Blogs & Articles
create table if not exists public.blogs (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  category text not null,
  author_name text not null,
  author_role text,
  author_avatar text,
  read_time text not null default '5 min read',
  cover_image text not null,
  tags text[] default '{}',
  takeaways text[] default '{}',
  content text not null,
  is_published boolean default true,
  is_featured boolean default false,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.contact_enquiries enable row level security;
alter table public.loan_enquiries enable row level security;
alter table public.partner_enquiries enable row level security;
alter table public.career_applications enable row level security;
alter table public.site_banners enable row level security;
alter table public.blogs enable row level security;

-- Anonymous public users can INSERT submissions (frontend lead forms)
create policy "Allow anonymous inserts into contact_enquiries"
  on public.contact_enquiries for insert with check (true);

create policy "Allow anonymous inserts into loan_enquiries"
  on public.loan_enquiries for insert with check (true);

create policy "Allow anonymous inserts into partner_enquiries"
  on public.partner_enquiries for insert with check (true);

create policy "Allow anonymous inserts into career_applications"
  on public.career_applications for insert with check (true);

-- Anonymous public users can read active banners and published blogs
create policy "Allow anonymous read active site_banners"
  on public.site_banners for select using (is_active = true);

create policy "Allow anonymous read published blogs"
  on public.blogs for select using (is_published = true);

-- Authenticated Admin users can select, update, and delete all records
create policy "Allow authenticated admin full access to contact_enquiries"
  on public.contact_enquiries for all using (auth.role() = 'authenticated');

create policy "Allow authenticated admin full access to loan_enquiries"
  on public.loan_enquiries for all using (auth.role() = 'authenticated');

create policy "Allow authenticated admin full access to partner_enquiries"
  on public.partner_enquiries for all using (auth.role() = 'authenticated');

create policy "Allow authenticated admin full access to career_applications"
  on public.career_applications for all using (auth.role() = 'authenticated');

create policy "Allow authenticated admin full access to site_banners"
  on public.site_banners for all using (auth.role() = 'authenticated');

create policy "Allow authenticated admin full access to blogs"
  on public.blogs for all using (auth.role() = 'authenticated');

