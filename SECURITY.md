# Security Policy

## Supported versions

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| older   | :x:                |

## Reporting a vulnerability

If you discover a security issue, please email **roel@rulio.app** (or open a private security advisory on GitHub). Don't open a public issue for security bugs.

We aim to acknowledge within 48 hours and ship a fix within 7 days for anything critical.

## What NOT to commit

The `.github/workflows/secret-scan.yml` workflow will block any PR or push to `main` that contains:

- Stripe live keys (`sk_live_*`)
- Stripe test keys (`sk_test_*` after the first commit)
- Stripe webhook secrets (`whsec_*`)
- Supabase service-role keys (`sb_secret_*`)
- Resend API keys (`re_*`)
- PostHog keys (`phc_*`)
- OpenAI keys (`sk-*T3BlbkFJ*`)
- Google API keys (`AIza*`)
- GitHub PATs (`ghp_*`, `github_pat_*`)

If the scan flags a real key you've already committed:

1. **Rotate the key** in the issuing platform (Stripe Dashboard, Supabase, etc.)
2. Remove it from the file
3. Use `git filter-repo` or contact a maintainer to scrub history
4. Push a fix

## Local secrets

Real secrets belong in `engine/.env.local` (gitignored) or in your hosting provider's secret store. The `engine/.env.production.example` template is committed but only contains `REPLACE_ME` placeholders.

## Reporting workflow

```
You find a vulnerability
    ↓
Email roel@rulio.app (PGP key on request)
    ↓
We confirm + classify within 48h
    ↓
Critical: hotfix in <7 days, CVE if needed
Non-critical: next regular release
```

## Past incidents

None reported.
