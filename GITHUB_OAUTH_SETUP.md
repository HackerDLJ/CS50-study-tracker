# GitHub OAuth Setup Guide

## Problem You're Experiencing

When clicking the GitHub Login button, you see:
```
Unauthorized
You don't have access to this resource. Redirecting you shortly…
(PROXY UNAUTHORIZED)
```

**Reason:** GitHub OAuth is not enabled in your Supabase project. This guide will fix it.

---

## Step-by-Step Setup

### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** in the left sidebar
3. Click **New OAuth App** button
4. Fill in the form:

   **Application name:** 
   ```
   CS50 Study Tracker
   ```

   **Homepage URL:** 
   ```
   http://localhost:3000
   ```
   (Change to your Vercel domain if deploying)

   **Authorization callback URL:** 
   ```
   http://localhost:3000/auth/callback
   ```
   (Change to `https://your-app.vercel.app/auth/callback` if deploying)

5. Click **Register application**
6. You'll see your **Client ID** and **Client Secret**
7. **Copy both** - you'll need them in the next step

> ⚠️ **Important:** Keep your Client Secret safe! Never commit it to GitHub.

---

### Step 2: Enable GitHub in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your **CS50 Study Tracker** project
3. Navigate to **Authentication** → **Providers** in the left sidebar
4. Find **GitHub** in the provider list
5. Click on **GitHub** to expand it
6. Toggle **Enabled** to ON
7. Paste your **Client ID** from Step 1
8. Paste your **Client Secret** from Step 1
9. Click **Save**

---

### Step 3: Update Callback URLs (If Deploying)

After deploying to Vercel, update the callback URL:

**In GitHub:**
1. Go to [GitHub OAuth Apps](https://github.com/settings/developers/oauth-apps)
2. Click your **CS50 Study Tracker** app
3. Update **Authorization callback URL** to:
   ```
   https://your-app.vercel.app/auth/callback
   ```
4. Click **Update application**

**In Supabase:**
1. Go to Authentication → Providers → GitHub
2. Make sure the redirect URL matches your Vercel domain
3. It should auto-update, but verify it's correct

---

## Testing GitHub Login

1. Go back to your app: `http://localhost:3000/auth/login`
2. Refresh the page (Ctrl+R or Cmd+R)
3. The "GitHub Login" button should now be **enabled** (no longer grayed out)
4. Click it to test the GitHub OAuth flow
5. GitHub will ask for permission
6. You'll be redirected back to your app
7. You're now logged in! ✅

---

## Troubleshooting

### GitHub Button Still Disabled After Setup

**Solution:** 
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Close and reopen your browser
- Try a different browser or incognito window

### "Invalid redirect URL" Error

**Problem:** Your callback URL doesn't match

**Solution:**
1. GitHub app → Authorization callback URL
2. Supabase → GitHub provider settings
3. Your app's redirect URL

All three **MUST match exactly** (including http/https and domain)

### "Client not found" Error

**Problem:** Client ID or Secret is wrong

**Solution:**
1. Go to [GitHub OAuth Apps](https://github.com/settings/developers/oauth-apps)
2. Click your app
3. Copy the **Client ID** and **Client Secret** again
4. Paste into Supabase exactly as shown

---

## What Happens After Setup

Once GitHub OAuth is configured:

1. Users can click "GitHub Login"
2. They're redirected to GitHub to authorize
3. GitHub redirects back to your app with a code
4. Your app exchanges the code for a session
5. User is logged in with their GitHub account
6. Their profile info (name, avatar, email) is saved

---

## Environment Variables (Reference)

Your app automatically uses these:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

You only need these - no additional GitHub secrets are needed in `.env.local` because Supabase handles the OAuth flow.

---

## For Production Deployment

When deploying to Vercel:

1. Update GitHub app callback URL to Vercel domain
2. Update Supabase GitHub provider (if needed)
3. Add `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` to Vercel env vars:
   ```
   https://your-app.vercel.app/auth/callback
   ```

---

## Still Having Issues?

1. Check that GitHub app is saved correctly
2. Check that Supabase GitHub provider is **Enabled**
3. Verify Client ID and Secret are pasted correctly
4. Ensure callback URLs match exactly (including domain)
5. Clear browser cache and try again

For more help:
- [Supabase GitHub Auth Docs](https://supabase.com/docs/guides/auth/social-login/auth-github)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

---

## For Now: Use Email Authentication

Until GitHub OAuth is set up, all users can:

1. Click **Sign in with Email**
2. Create an account with their email
3. Sign in with email/password
4. Use all app features normally

Email authentication is fully functional and doesn't require any setup!

---

That's it! Once these steps are complete, GitHub login will work perfectly. 🚀
