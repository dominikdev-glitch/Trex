-- TREX training catalog (public read) and per-user training records.
-- Access model: server functions read the catalog freely.
-- Profiles, completions, bookmarks, and checkout intents are scoped to the
-- authenticated user id. There is no client-supplied user id.

create table if not exists exercises (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  target_muscles text not null,
  equipment text not null,
  difficulty text not null,
  premium boolean not null default false,
  video_url text,
  thumbnail_url text,
  instructions text not null,
  mistakes text not null,
  beginner_mod text not null,
  advanced_mod text not null,
  default_sets integer not null,
  default_reps integer,
  default_seconds integer,
  rest_seconds integer not null,
  calories_per_min integer not null
);

create table if not exists programs (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text not null,
  goal_key text not null,
  difficulty text not null,
  duration_days integer not null,
  equipment text not null,
  requires text not null default 'none',
  cover_image text,
  premium boolean not null default false,
  sort_order integer not null default 0
);

create table if not exists workouts (
  id text primary key,
  program_id text not null references programs (id),
  day_index integer not null,
  title text not null,
  description text not null,
  duration_min integer not null,
  difficulty text not null,
  goal text not null,
  equipment text not null,
  base_calories integer not null,
  free_preview boolean not null default false,
  unique (program_id, day_index)
);

create index if not exists workouts_program_idx on workouts (program_id, day_index);

create table if not exists workout_exercises (
  workout_id text not null references workouts (id) on delete cascade,
  exercise_id text not null references exercises (id),
  position integer not null,
  sets integer not null,
  reps integer,
  seconds integer,
  rest_seconds integer not null,
  primary key (workout_id, position)
);

create table if not exists profiles (
  user_id text primary key,
  goal text,
  experience text,
  training_days integer,
  equipment text,
  onboarding_completed boolean not null default false,
  current_program_id text,
  next_program_id text,
  plan_reason text,
  subscription_status text not null default 'free',
  subscription_plan text,
  subscription_expires_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists completions (
  id text primary key,
  user_id text not null,
  workout_id text not null,
  program_id text,
  completed_at timestamptz not null default now(),
  duration_sec integer not null,
  calories integer not null,
  exercises_completed integer not null
);

create index if not exists completions_user_idx on completions (user_id, completed_at desc);

create table if not exists bookmarks (
  user_id text not null,
  workout_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, workout_id)
);

create table if not exists checkout_intents (
  id text primary key,
  user_id text not null,
  plan text not null,
  status text not null,
  created_at timestamptz not null default now()
);
