# WANGAK — Website Starter

Starter project for a public WANGAK band profile plus private member dashboard for up to 20 members.

## Features included
- Public homepage/profile
- Supabase authentication (username-style login is implemented as email login; see note below)
- Private member dashboard
- Supabase SQL schema with row-level security (RLS)
- Admin-only member management approach
- PWA manifest and service worker placeholder
- Secure server endpoint skeleton for scheduled WhatsApp reminders

## Important setup notes
This is a starter source package, not a deployed website. A public URL will exist only after you deploy it to a hosting provider and configure the required services.

### 1. Requirements
- Node.js 20+
- Supabase project
- Vercel account (free tier may be sufficient for initial testing)
- WhatsApp Business Platform credentials if you want automated WhatsApp messages

### 2. Install
```bash
npm install
cp .env.example .env.local
```
Fill in the environment values in `.env.local`. Never commit `.env.local`.

```bash
npm run dev
```

### 3. Supabase
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Supabase Auth, create the admin account and member accounts.
4. Set each user's `profiles.role` to `admin` or `member` in the Supabase SQL editor.
5. To create temporary credentials, create accounts from a trusted admin-only server workflow or the Supabase dashboard. Do not create accounts in browser code and do not store plaintext passwords in the database.

### Username and temporary password note
Supabase Auth signs in with email/password by default. To let members type a username, add a trusted server-side username-to-email lookup endpoint or use a custom auth flow. Do not expose the member directory or perform username lookups in client-side code. For the first version, use each member's assigned login email and temporary password, then require a password reset/change on first login.

### 4. WhatsApp reminders
`app/api/reminders/whatsapp/route.ts` is a protected skeleton. Configure a scheduler (e.g. Vercel Cron) and WhatsApp Business Platform credentials. WhatsApp templates, opt-in, business verification, and provider pricing/availability may apply. Never expose tokens in client-side code.

### 5. Web push notifications
The included service worker is a placeholder. Production web push requires VAPID keys, subscription storage, server-side sending, HTTPS, and user permission. Browser/device support varies. Do not promise delivery if permission is denied or the device restricts notifications.

### Security checklist before launch
- Enable MFA for admin where possible.
- Keep Supabase service-role key and WhatsApp token server-side only.
- Verify RLS policies using a non-admin account.
- Keep schedule and progress data private.
- Require opt-in before sending WhatsApp reminders.
- Rate-limit login and server endpoints.
- Use HTTPS and avoid putting passwords in links or group chats.
