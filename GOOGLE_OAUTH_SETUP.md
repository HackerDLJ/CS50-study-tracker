# Google OAuth Setup Guide

## Overview
Google OAuth provides a secure way for users to sign in using their Google account. This guide will walk you through the setup process.

## Status
- **Button in App**: ✅ Present and functional
- **Implementation**: ✅ Complete and ready
- **Configuration**: ⚠️ Requires Supabase setup

## Step-by-Step Setup

### Step 1: Create a Google OAuth Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account
3. Create a new project:
   - Click on the project dropdown at the top
   - Click "NEW PROJECT"
   - Enter project name: "CS50 Study Tracker"
   - Click "CREATE"
4. Wait for the project to be created

### Step 2: Enable Google OAuth API

1. In the Google Cloud Console, go to "APIs & Services"
2. Click "Enable APIs and Services"
3. Search for "Google+ API"
4. Click on it and click "ENABLE"

**Note**: Some older Google documentation mentions "Google+ API", but you may need the "Google Identity Services API" instead. Look for whichever is available in your project.

### Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. You may be prompted to "Configure OAuth consent screen" first:
   - Choose "External" (for development/testing)
   - Click "CREATE"
   - Fill in the form:
     - **App name**: CS50 Study Tracker
     - **User support email**: Your email
     - **Developer contact**: Your email
     - Click "SAVE AND CONTINUE"
4. On the "Scopes" page, click "SAVE AND CONTINUE"
5. On the "Test users" page, add your test email, then click "SAVE AND CONTINUE"
6. Back to creating credentials:
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Name it "CS50 Study Tracker Web"
   - Under "Authorized redirect URIs", add:
     - `http://localhost:3000/auth/callback` (for local development)
     - `https://your-app.vercel.app/auth/callback` (for production)
     - `https://your-supabase-url.supabase.co/auth/v1/callback?provider=google` (for Supabase)
   - Click "CREATE"
7. You'll see a dialog with:
   - **Client ID**
   - **Client Secret**
   - Save these for the next step!

### Step 4: Add to Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** and toggle "Enabled"
5. Paste your:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)
6. Click **SAVE**

### Step 5: Test Google Login

1. Run your app: `pnpm dev`
2. Go to `http://localhost:3000/auth/login`
3. Click **"Google Login"**
4. You should be redirected to Google's login
5. After signing in, you'll be redirected back to your app
6. ✅ Success! You're logged in with Google

## Environment Variables

Your app automatically uses:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your anonymous key
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - Callback URL for local development

These are already configured and ready to use.

## Troubleshooting

### "Redirect URI mismatch" error
- **Problem**: The callback URL in Google Cloud doesn't match your app's URL
- **Solution**: Add the exact URL to Google Cloud Console
  - For localhost: `http://localhost:3000/auth/callback`
  - For production: `https://yourdomain.com/auth/callback`

### "Invalid client" error
- **Problem**: Client ID or Secret is wrong
- **Solution**: Double-check that you copied them correctly from Google Cloud Console

### Google login button doesn't work
- **Problem**: Google OAuth not enabled in Supabase
- **Solution**: 
  1. Go to Supabase → Authentication → Providers
  2. Find Google and toggle "Enabled"
  3. Paste Client ID and Secret

### "auth/INVALID_OAUTH_CLIENT_ID" error
- **Problem**: Supabase received an invalid Client ID
- **Solution**: Verify the Client ID is exactly correct (copy/paste from Google Cloud Console)

## Developer Mode

The app includes a **Developer Mode** for testing and debugging:

1. Click the **🔒** button in the top-right of the login page
2. It will change to **👨‍💻 Dev**
3. A terminal-like panel appears showing:
   - Supabase URL (first 40 chars)
   - Redirect URL configuration
   - Current session status
   - OAuth provider status
4. Use this to verify your configuration is correct

## Security Notes

⚠️ **Important**:
- Never commit your Client Secret to Git
- Keep it in environment variables only
- For production, only allow your production domain in OAuth redirect URIs
- Rotate credentials periodically

## Next Steps

After Google OAuth is working:

1. Test the full authentication flow
2. Verify user profiles are created in Supabase
3. Check that user data is properly stored
4. Test on mobile devices
5. Deploy to production with production OAuth credentials

## Additional Resources

- [Google Cloud Console](https://console.cloud.google.com)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## Need Help?

If you encounter issues:

1. **Check the Developer Mode** (👨‍💻) on the login page
2. **Review the error message** carefully
3. **Check Supabase logs** in your dashboard
4. **Verify environment variables** are set correctly
5. **Check Google Cloud Console** OAuth configuration

---

**Status**: Google OAuth is fully implemented and ready for configuration!
