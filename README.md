# CS50 Study Tracker

A modern, full-stack study session tracker built with Next.js 16, React 19, Supabase, and Tailwind CSS. Features real-time data synchronization, authentication, analytics, and goal tracking.

## Features

### Authentication
- **Email/Password Authentication** - Create account and sign in with email
- **GitHub OAuth** - Sign in with GitHub (requires setup)
- **Secure Sessions** - Managed via Supabase with HTTP-only cookies
- **Protected Routes** - Automatic redirect to login for unauthorized access

### Study Tracking
- **Log Study Sessions** - Record subject, minutes, and notes
- **Edit/Delete Sessions** - Manage your study history
- **Session History** - View all past study sessions with filtering
- **CSV Export** - Download your study data for analysis

### Analytics & Goals
- **Study Statistics** - Total hours, daily breakdown, subject breakdown
- **Study Streaks** - Track current and longest study streaks
- **Study Goals** - Set weekly/monthly targets and track progress
- **Charts & Graphs** - Visual representation of your study patterns

### Themes
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Professional dark slate design
- **Glass Mode** - Modern glassmorphism effects

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase PostgreSQL with Row-Level Security
- **Authentication**: Supabase Auth (Email & GitHub OAuth)
- **Hosting**: Vercel-ready deployment
- **Charts**: Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm/npm
- Supabase account (free tier available)
- GitHub account (optional, for OAuth setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cs50-study-tracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   ```

   Get these values from your Supabase project:
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Settings → API → Copy `Project URL` and `anon` key

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Authentication Setup

### Email/Password Authentication (Ready to Use)
1. Sign up with your email at `/auth/signup`
2. Sign in with email/password at `/auth/login`
3. No additional setup required!

### GitHub OAuth (Optional)

To enable GitHub login, you need to configure GitHub OAuth in Supabase:

#### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the form:
   - **Application name**: CS50 Study Tracker
   - **Homepage URL**: `https://your-domain.com` (or `http://localhost:3000` for local)
   - **Authorization callback URL**: `https://your-domain.com/auth/callback` (or `http://localhost:3000/auth/callback` for local)
4. Click **Register application**
5. Copy the **Client ID** and **Client Secret**

#### Step 2: Enable GitHub in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Click on **GitHub**
5. Toggle **Enabled**
6. Paste your **Client ID** and **Client Secret** from Step 1
7. Click **Save**

#### Step 3: Test GitHub Login

1. Visit `http://localhost:3000/auth/login`
2. Click **GitHub Login**
3. Authorize the application

## Project Structure

```
├── app/
│   ├── auth/
│   │   ├── callback/      # OAuth callback handler
│   │   ├── login/         # Login page (Email & GitHub)
│   │   ├── signup/        # Sign up page
│   │   └── error/         # Auth error page
│   ├── dashboard/         # Main dashboard with session logging
│   ├── history/           # Study history with edit/delete
│   ├── analytics/         # Statistics and charts
│   ├── goals/             # Goal management
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── supabase-auth-provider.tsx  # Auth context
│   ├── theme-provider.tsx          # Theme context
│   ├── theme-switcher.tsx          # Theme toggle
│   └── navbar.tsx                  # Shared navigation
├── lib/
│   └── supabase/
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       ├── proxy.ts       # Session proxy
│       └── queries.ts     # Database queries
├── middleware.ts          # Next.js middleware for auth
└── public/
    └── cs50-logo.svg      # CS50 branding
```

## Database Schema

The app uses 5 PostgreSQL tables with Row-Level Security:

- **profiles** - User profile information
- **study_sessions** - Individual study records
- **study_goals** - Study targets (weekly/monthly)
- **study_streaks** - Streak tracking data
- **github_repos** - Linked GitHub repositories

All tables have automatic timestamps and RLS policies ensuring users only access their own data.

## API Routes

- `POST /auth/callback` - OAuth callback handler
- Study sessions, goals, and analytics are managed via Supabase client SDK

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **Import Project**
4. Select your repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (set to your Vercel domain)
6. Click **Deploy**

### Update Supabase OAuth Redirect

After deploying to Vercel:

1. Go to Supabase → Authentication → Providers → GitHub
2. Update the redirect URL to your Vercel domain: `https://your-app.vercel.app/auth/callback`
3. Save changes

## Troubleshooting

### "Unsupported provider" Error
- GitHub OAuth is not enabled in Supabase
- Solution: Follow the GitHub OAuth setup steps above

### Email confirmation not working
- Check your Supabase email settings
- Go to Authentication → Email Templates
- Ensure email confirmation is enabled

### Sessions not persisting
- Clear browser cookies and cache
- Check that middleware.ts is correctly configured
- Verify Supabase URL and anon key in environment variables

## Contributing

Feel free to submit issues and pull requests to improve the app!

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Review the [Next.js Documentation](https://nextjs.org/docs)
3. Open an issue in the repository

## Roadmap

- [ ] Connect to official CS50 course materials
- [ ] GitHub repo integration for project tracking
- [ ] Pull request creation from app
- [ ] Social features (leaderboards, study groups)
- [ ] Mobile app (React Native)
- [ ] Notifications and reminders
- [ ] Integration with popular IDEs

---

Built with ❤️ for CS50 students. Happy studying!
