-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Create user_history table to store all user activities
create table if not exists public.user_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature_type text not null check (feature_type in ('resume_analysis', 'interview_prep', 'mock_interview', 'placement_predictor', 'career_path')),
  title text not null,
  summary text,
  data jsonb,
  created_at timestamp with time zone default now()
);

alter table public.user_history enable row level security;

create policy "history_select_own" on public.user_history for select using (auth.uid() = user_id);
create policy "history_insert_own" on public.user_history for insert with check (auth.uid() = user_id);
create policy "history_update_own" on public.user_history for update using (auth.uid() = user_id);
create policy "history_delete_own" on public.user_history for delete using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists idx_user_history_user_id on public.user_history(user_id);
create index if not exists idx_user_history_created_at on public.user_history(created_at desc);
