# Setting up sign-up / login (Supabase)

The sign-up, login, and account pages are built and ready, but they need a
real backend to check emails/passwords against. This project uses
[Supabase](https://supabase.com) for that — it's free for a project this
size, and it's just a database + auth API, no server for you to run.

## 1. Create a Supabase project

1. Go to https://supabase.com and sign up (GitHub login is fastest).
2. Click **New project**. Pick any name (e.g. "sameet-website"), set a
   database password (save it somewhere), and choose the region closest to
   your visitors.
3. Wait ~2 minutes for it to finish provisioning.

## 2. Get your API keys

1. In your new project, go to **Project Settings -> API**.
2. Copy the **Project URL** and the **anon / public** key (NOT the
   `service_role` key — that one must never be exposed to the browser).

## 3. Set your local environment variables

1. In the project folder, copy `.env.local.example` to `.env.local`:
   ```
   cp .env.local.example .env.local
   ```
2. Paste your values in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
3. Run `npm install` (pulls in the two new Supabase packages), then
   `npm run dev` and try signing up at `/signup`.

## 4. Turn on email/password auth (it's on by default, just double-check)

In Supabase: **Authentication -> Providers -> Email** should already be
enabled. Leave it on.

**For testing**, you can turn off "Confirm email" under
**Authentication -> Providers -> Email** so new accounts can log in
immediately without clicking a confirmation link. Turn it back on before
you launch for real — you don't want to let anyone log in with an email
they don't own.

## 5. Add the same variables to Vercel (for the live site)

1. In your Vercel project: **Settings -> Environment Variables**.
2. Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   with the same values as your `.env.local`.
3. Redeploy (Vercel -> Deployments -> Redeploy) so the new variables take
   effect.

## What you get once this is done

- `/signup` — creates a new account (name, email, password)
- `/login` — logs an existing user in
- `/account` — a simple page showing who's logged in, with a logout button
- Every new sign-up shows up in Supabase under **Authentication -> Users**,
  so you can see your users without building an admin panel

## Nice-to-haves for later (not required to launch)

- **Password reset** — Supabase supports it out of the box
  (`supabase.auth.resetPasswordForEmail`); ask me to wire up a page for it
  whenever you want it.
- **Google/GitHub login** — same idea, a couple more lines and a provider
  toggle in the Supabase dashboard.
- **A real "member" area** — right now `/account` just proves the login
  works. If you want visitors to actually do something once logged in
  (save projects, view invoices, etc.), that's a separate feature to build
  on top of this.
