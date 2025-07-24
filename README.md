# WebAppStore

A professional web app/game store inspired by Playstore, built with React + Material UI, powered by [Supabase](https://supabase.com/) for free authentication, storage, and database.

## Features
- Playstore-like UI (MUI, gradients, card grid, search, categories)
- User Google login (via Supabase)
- Developer sign up/login and upload panel
- Admin review/delete panel
- App/game listing & downloads
- PWA installable from Chrome
- 100% free to deploy (frontend on Vercel/Netlify, backend on Supabase)

---

## 1. Quick Start

### 1.1. **Clone & Install**

```sh
git clone https://github.com/YOUR_USERNAME/WebAppStore.git
cd WebAppStore
npm install
```

### 1.2. **Create a Supabase Project**
- Go to [supabase.com](https://app.supabase.com/), create a new project.
- In Project Settings, under API, copy your `anon` and `service_role` keys and project URL.

### 1.3. **Set Up Supabase Tables**

- In the Supabase dashboard, go to SQL Editor and run:

```sql
-- Apps Table
create table if not exists apps (
  id uuid primary key default uuid_generate_v4(),
  name text,
  description text,
  icon_url text,
  apk_url text,
  category text,
  developer_id uuid,
  created_at timestamptz default now()
);

-- Developers Table
create table if not exists developers (
  id uuid primary key default uuid_generate_v4(),
  email text,
  name text,
  created_at timestamptz default now()
);

-- User Roles Table
create table if not exists user_roles (
  user_id uuid primary key,
  role text -- 'admin' or 'developer' or 'user'
);

-- Enable Storage for icons and APKs (set up via Supabase Storage)
```

- Go to **Authentication > Providers** and enable Google login.
- Go to **Storage** and create two buckets: `icons` and `apks`.

### 1.4. **Configure Environment Variables**

Copy `.env.example` to `.env` and fill with your Supabase project info:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## 2. **Run Locally**

```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

---

## 3. **Deploy to Production (Vercel/Netlify)**

- Push your repo to GitHub
- Connect to Vercel or Netlify, set the same environment variables
- Build and deploy!

---

## 4. **Admin Login**

- Set any user as admin: In Supabase SQL:

```sql
insert into user_roles (user_id, role) values ('USER_ID_HERE', 'admin');
```

---

## 5. **Customize**

- Update branding in `src/constants.js`
- Add new categories in `src/constants.js`
- Add your logo to `/public`

---

## 6. **Questions?**

Open an issue or PR!
