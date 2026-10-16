# Arun CAD / Architecture / 3D Portfolio — Rebuild

This is a Vite + JavaScript website with Supabase for contact-message storage and admin login, plus a Supabase Edge Function that sends email notifications through Resend.

## 1. Install tools

Install:
- Node.js LTS: https://nodejs.org/
- Visual Studio Code: https://code.visualstudio.com/
- Supabase CLI: follow https://supabase.com/docs/guides/cli
- Git (optional but recommended): https://git-scm.com/

Extract the ZIP, then open the extracted `arunpf-portfolio-rebuild` folder in VS Code.

## 2. Run locally

Open Terminal -> New Terminal in VS Code and run:

```bash
npm install
```

Copy `.env.example` to `.env.local`, then set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Get both from Supabase Dashboard -> Project Settings -> API. These are public client configuration values; do not put secret keys in `VITE_` variables.

Start the site:

```bash
npm run dev
```

Open the local URL printed by Vite, normally http://localhost:5173.
Build-check before deployment:

```bash
npm run build
```

## 3. Configure Supabase

1. Create a project at https://supabase.com/
2. Open SQL Editor and run `supabase/schema.sql`.
3. Open Authentication -> Users and create your admin user.
4. Disable public sign-ups in Authentication settings. Only create the admin user yourself.
5. Add your local and production URLs to Authentication -> URL Configuration if needed.
6. Add `.env.local` to `.gitignore` (already included). Never commit it.

### Important admin security note

The included starter's read policy allows authenticated users to read messages. Disabling public sign-ups and only creating your own admin user is essential, but for a hardened production site replace the policy with an admin allowlist/role-based policy before launch. Do not enable public sign-ups.

## 4. Configure Resend email

1. Create an account at https://resend.com/
2. Add a sending domain you control and verify it.
3. Copy the DNS records Resend provides into your DNS provider exactly as shown. Do not guess values and avoid deleting existing MX/SPF/DKIM records.
4. Choose a sender address on the verified sending domain, for example `Portfolio <notifications@your-verified-domain.com>`.
5. Keep your notification recipient address ready (the mailbox where you want to receive enquiries).

Owning `arunpf.com` does not automatically create an email mailbox. Use an existing inbox address you can access, or configure a mailbox provider separately.

## 5. Deploy the Supabase Edge Function

Log in to the Supabase CLI and link the project:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

Set secrets on the Supabase project (replace values locally; never paste keys into source files):

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxx
supabase secrets set CONTACT_NOTIFICATION_EMAIL=you@example.com
supabase secrets set RESEND_FROM_EMAIL="Arun Portfolio <notifications@your-verified-domain.com>"
supabase secrets set ALLOWED_ORIGINS="https://arunpf.com,https://www.arunpf.com,http://localhost:5173"
```

The Supabase platform provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to deployed functions in its environment. If your setup does not, configure them as project secrets using the Supabase dashboard's function secrets guidance.

Deploy:

```bash
supabase functions deploy contact-notification --no-verify-jwt
```

The function uses `verify_jwt = false` because the public contact form is unauthenticated. It validates input, restricts browser origins to `ALLOWED_ORIGINS`, stores messages using a server-side service key, and emails a notification through Resend. Add rate limiting/CAPTCHA before high-traffic production use.

## 6. Deploy to Vercel

1. Push this folder to a private or public GitHub repository (never commit `.env.local`).
2. Open https://vercel.com/dashboard and import the repository.
3. Add these Environment Variables in Vercel Project -> Settings -> Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy after adding or changing environment variables.
5. Open Project -> Settings -> Domains and add `arunpf.com` and optionally `www.arunpf.com`.
6. Vercel will display the exact DNS records required. Add those exact records at your DNS provider. Do not use guessed IP addresses.
7. Wait until Vercel reports the domain configuration is valid and HTTPS certificate is issued.

## 7. Fix an SSL warning on arunpf.com

Do not bypass the browser warning or enter credentials on the warning page.

1. Open Vercel Dashboard -> your project -> Settings -> Domains.
2. Click `arunpf.com` and note the exact status/error shown.
3. Compare your DNS records with the exact records Vercel requests. Remove/change only records that conflict with Vercel's displayed instructions; preserve mail MX/SPF/DKIM records.
4. If DNS is correct but the certificate is pending, wait for provisioning and recheck Vercel.
5. If it still fails, copy the exact Chrome error code (for example `NET::ERR_CERT_COMMON_NAME_INVALID`) and the Vercel domain status for further diagnosis.

## 8. Replace the demo portfolio content

Open `src/main.js`:
- Replace the `projects` array titles, descriptions, images, and tools with Arun's real work.
- Replace the hero intro and About text.
- Replace any example imagery with images you own or are licensed to use.
- Review service descriptions and location.
- The contact form sends enquiries to `CONTACT_NOTIFICATION_EMAIL` configured in Supabase secrets.

## 9. Test before launch

- `npm run build` completes without errors.
- Vercel deployment is Ready.
- `https://arunpf.com` opens with a valid certificate.
- Submit a test contact form and check your recipient inbox and spam folder.
- Sign in at `https://arunpf.com/#admin` and confirm the message appears.
- Test navigation and form on a phone and laptop.
- Verify no secret keys exist in the browser source or GitHub repository.

## Troubleshooting

- **Blank site:** check Vercel deployment logs and browser console; run `npm run build`.
- **Contact form says not configured:** confirm the two VITE_ values in Vercel and redeploy.
- **Message saved but email not sent:** check Supabase function logs, Resend domain verification, sender address, and secrets.
- **Admin cannot see messages:** check Supabase Auth sign-in and RLS policy.
- **SSL warning:** follow section 7; never bypass the warning.

## Project tree

```text
arunpf-portfolio-rebuild/
├── index.html
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── src/
│   ├── main.js
│   └── style.css
└── supabase/
    ├── schema.sql
    ├── config.toml
    └── functions/
        └── contact-notification/
            └── index.ts
```
