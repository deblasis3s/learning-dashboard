# Vercel Post-Breach Security Audit Checklist

**Date:** April 20, 2026  
**Status:** Ready to work through

---

## Prerequisites

Before starting, make sure you're logged into the Vercel dashboard at **https://vercel.com/dashboard**.

If you want to use the CLI instead (faster for some checks), open your terminal and run:

```bash
npx vercel login
```

This will open a browser window to authenticate. Once done, you can use CLI commands below as an alternative to the dashboard.

---

## 1. Review Activity Logs

**What you're looking for:** Any actions you don't recognize — logins from unknown IPs, deployments you didn't trigger, environment variable changes, team member additions, or settings changes.

### Via Dashboard:
1. Go to **https://vercel.com/dashboard** and select your team/account
2. Click **Settings** in the left sidebar
3. Click **Activity Log** (under the General section)
4. Review the log entries. Pay attention to:
   - **Logins** from IP addresses or locations you don't recognize
   - **Environment variable changes** you didn't make
   - **Deployments** you didn't trigger
   - **Team member invitations** you didn't send
   - **Domain or DNS changes** you didn't authorize
   - Any activity at **unusual hours** (e.g., 3am your time)

### Via CLI (alternative):
```bash
# There's no direct "activity log" CLI command, so the dashboard is best for this one
```

### What to do if you find something suspicious:
- Note the timestamp, action type, and any associated user/IP
- If you see unauthorized logins, change your password immediately and enable 2FA
- If you see unauthorized deployments, check what code was deployed (covered in step 4)

**Your findings:**
- [ ] Activity log reviewed — nothing suspicious
- [ ] Activity log reviewed — suspicious items found (note them below)

---

## 2. Review Environment Variables

**What you're looking for:** Any environment variables that contain secrets (API keys, database URLs, tokens, signing keys) that are NOT marked as "Sensitive." Also look for any env vars you don't recognize, which could indicate unauthorized access.

### Via Dashboard:
1. Go to your project in the Vercel dashboard
2. Click **Settings** > **Environment Variables**
3. For each environment (Production, Preview, Development), review:
   - Do you recognize every variable?
   - Are secret values (anything with "key", "token", "secret", "password", "credential", "url" containing credentials) marked with the lock icon (Sensitive)?

### Via CLI:
```bash
# List env vars for all environments
npx vercel env ls

# List for a specific environment
npx vercel env ls production
npx vercel env ls preview
npx vercel env ls development
```

### Common env vars that SHOULD be marked Sensitive:
- `DATABASE_URL` (contains credentials)
- `API_KEY`, `API_SECRET`, any `*_KEY` or `*_SECRET`
- `AUTH_SECRET`, `JWT_SECRET`, `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- Any `*_TOKEN` (e.g., `GITHUB_TOKEN`, `SLACK_TOKEN`)
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- `SENDGRID_API_KEY`, `TWILIO_AUTH_TOKEN`
- Any `*_PASSWORD` or `*_CREDENTIAL`

### What to do if you find unrecognized env vars:
- Do NOT delete them yet — document them first
- Check the activity log (step 1) to see who added them and when
- If they look malicious, remove them after documenting

**Your findings:**
- [ ] All env vars recognized and accounted for
- [ ] Found unrecognized env vars (list them)
- [ ] Found secrets NOT marked as Sensitive (list them — these need the Sensitive flag enabled, covered in step 3)

---

## 3. Enable the "Sensitive" Flag on Secret Env Vars

**What this does:** When an env var is marked "Sensitive" in Vercel, its value is write-only — meaning once saved, nobody can read the value through the dashboard or API. This is critical because if an attacker gains access to your Vercel account, they can't extract your secrets.

### Via Dashboard:
1. Go to your project > **Settings** > **Environment Variables**
2. For each secret env var identified in step 2:
   - Click the three-dot menu (⋮) next to the variable
   - Click **Edit**
   - Check the **Sensitive** checkbox
   - Click **Save**
3. Note: Once marked Sensitive, you can't view the value again. Make sure you have the values stored securely elsewhere (e.g., a password manager) before enabling this.

### Via CLI:
```bash
# Remove the old variable and re-add it as sensitive
# WARNING: This briefly removes the var — do during low traffic if in production

npx vercel env rm MY_SECRET_VAR production
npx vercel env add MY_SECRET_VAR production
# When prompted, paste the value — CLI will ask if you want to mark it Sensitive
```

### Important caveat:
If you're rotating secrets (recommended after a breach — see recommendations at the end), you'll be updating the values anyway, so enable the Sensitive flag at the same time.

**Your findings:**
- [ ] All secrets already marked Sensitive
- [ ] Updated the following vars to Sensitive: (list them)

---

## 4. Review Recent Deployments

**What you're looking for:** Deployments you don't recognize — from unknown branches, at odd times, with suspicious commit messages, or not matching your Git history.

### Via Dashboard:
1. Go to your project in the Vercel dashboard
2. Click the **Deployments** tab
3. Review the last 2-4 weeks of deployments. For each, check:
   - **Branch name** — do you recognize it?
   - **Commit message** — does it match what's in your Git repo?
   - **Timestamp** — was this deployed at a reasonable time?
   - **Triggered by** — was it a Git push, manual deploy, or API trigger?
   - **Status** — any failed deployments that look like probing?

### Via CLI:
```bash
# List recent deployments
npx vercel ls

# Or with more detail
npx vercel ls --limit 20
```

### Cross-reference with Git:
```bash
# In your project directory, check recent Git history
git log --oneline -20

# Compare commit hashes with what Vercel shows
```

### Red flags:
- Deployments from branches you didn't create
- Deployments triggered via API when you only use Git pushes
- Deployments at times nobody on your team was working
- Commit messages that don't match your Git log
- Multiple rapid deployments (could indicate automated probing)

**Your findings:**
- [ ] All recent deployments look normal
- [ ] Found suspicious deployments (note details)

---

## 5. Check Deployment Protection

**What this is:** Deployment Protection prevents unauthorized access to your preview and production deployments. "Standard Protection" requires visitors to be Vercel team members to view preview deployments. This prevents attackers from accessing preview URLs that might contain unreleased features or testing credentials.

### Via Dashboard:
1. Go to your project > **Settings** > **Deployment Protection**
2. Check the current setting:
   - **No Protection** — anyone with the URL can access deployments (NOT recommended)
   - **Standard Protection** — preview deployments require Vercel authentication (MINIMUM recommended)
   - **All Deployments** — both preview AND production require authentication

### Recommended setting:
At minimum, set to **Standard Protection**. This ensures preview deployments (which often have debug modes, test data, or less-hardened configurations) aren't publicly accessible.

If your production deployment is an internal tool (not public-facing), consider **All Deployments**.

**Your findings:**
- [ ] Deployment Protection is set to Standard or higher
- [ ] Deployment Protection was off — now enabled

---

## 6. Review Deployment Protection Bypass Tokens

**What these are:** Protection Bypass tokens let specific systems (like CI/CD pipelines, testing tools, or monitoring services) access protected deployments without Vercel authentication. If compromised, an attacker could use these to access your protected deployments.

### Via Dashboard:
1. Go to your project > **Settings** > **Deployment Protection**
2. Scroll down to **Protection Bypass for Automation**
3. Check if any tokens exist
4. For each token, consider:
   - Do you recognize what it's used for?
   - Is it still needed?
   - When was it last rotated?

### Recommended actions:
- **Rotate all existing tokens** — generate new ones and update the systems that use them
- **Remove any tokens** you don't recognize or no longer need
- **Document** what each token is used for so you can audit them in the future

**Your findings:**
- [ ] No bypass tokens exist
- [ ] Tokens exist — all recognized and rotated
- [ ] Found unrecognized tokens — removed

---

## Post-Audit Recommendations

After completing the checklist, here are additional steps to harden your Vercel account:

1. **Rotate all secrets** — Even if nothing suspicious was found, it's good practice after any potential breach. Generate new values for all API keys, database passwords, tokens, and signing keys. Update them in Vercel AND in the services they connect to.

2. **Enable 2FA** — If not already enabled, go to your Vercel account settings and turn on two-factor authentication.

3. **Review team members** — Go to Settings > Members and remove anyone who shouldn't have access.

4. **Review connected Git integrations** — Check Settings > Git to make sure only your authorized repos are connected.

5. **Review OAuth/API tokens** — Go to Settings > Tokens and revoke any you don't recognize or no longer need.

6. **Set up log monitoring** — Consider setting up alerts for unusual activity (Vercel integrates with monitoring tools).

7. **Review Vercel's security docs** — https://vercel.com/docs/security for the latest recommendations.

---

*Work through each section, check the boxes, and note any findings. If you find anything suspicious, don't panic — document it and take the recommended actions.*
