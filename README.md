# Green Auth — Google Analytics & Search Console Dashboard (Next.js)

Green Auth is a Next.js app that lets users sign in with Google and fetch data from:
- Google Analytics Data API (GA4)
- Google Search Console API

It uses NextAuth for authentication and requests the minimum required scopes to read analytics and search data.

## Features
- Google OAuth login (NextAuth v5)
- Secure token handling with refresh support
- Fetch GA4 metrics (sessions, activeUsers) via the Run Report endpoint
- Fetch Search Console query/page data for a site URL
- Simple dashboard UI to try both APIs interactively

## Tech Stack
- Next.js App Router
- next-auth (Google provider)
- TypeScript, Tailwind CSS

---

## Getting Started

### 1) Prerequisites
- Node.js 18+ and npm
- A Google Cloud project with OAuth consent configured
- A Web OAuth 2.0 Client ID/Secret

Required OAuth scopes (configured by the app during sign-in):
- https://www.googleapis.com/auth/webmasters.readonly
- https://www.googleapis.com/auth/analytics.readonly

### 2) Clone and install
```bash
npm install
```

### 3) Environment variables
Create a .env file in the project root (do not commit it). The following variables are recognized by the app.

Required for all environments:
- GOOGLE_CLIENT_ID: Google OAuth 2.0 Client ID from Google Cloud Console.
- GOOGLE_CLIENT_SECRET: Google OAuth 2.0 Client Secret from Google Cloud Console.
- AUTH_SECRET: A random string used by NextAuth to encrypt/sign tokens. You can generate one with: openssl rand -base64 32

Required in production (recommended locally too):
- AUTH_URL or NEXTAUTH_URL: The base URL of your app without trailing slash.
  - Example (local): http://localhost:3000
  - Example (prod): https://your-domain.com

Optional:
- PROPERTY_ID: Default GA4 property ID (e.g., properties/123456789). If not set, you can input a Property ID directly in the dashboard UI when fetching Analytics data.

Notes:
- In production, the app will throw if required env vars are missing (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET, and a base URL via AUTH_URL/NEXTAUTH_URL).
- NODE_ENV is handled by Next.js automatically.

Example .env (development):
```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
AUTH_SECRET=your-32-byte-random-secret
NEXTAUTH_URL=http://localhost:3000
# Optional
PROPERTY_ID=properties/123456789
```

### 4) Configure Google OAuth
In Google Cloud Console:
1. Create a project (if you don’t have one).
2. Configure OAuth consent screen (External or Internal as needed). Add the scopes listed above.
3. Create Credentials -> OAuth client ID -> Web application.
4. Add Authorized redirect URIs:
   - Development: http://localhost:3000/api/auth/callback/google
   - Production: https://your-domain.com/api/auth/callback/google
5. Copy the Client ID/Secret into your .env.

### 5) Run the app
```bash
npm run dev
```
Visit http://localhost:3000 and sign in with Google. After logging in, you’ll be redirected to /home where you can:
- Enter a Search Console site URL (e.g., sc-domain:example.com or https://www.example.com/) and fetch data.
- Enter a GA4 Property ID (or rely on PROPERTY_ID) and fetch Analytics data.

### 6) Build and deploy
```bash
npm run build
npm start
```
Ensure AUTH_URL (or NEXTAUTH_URL) is set to your deployment URL and the same redirect URI is configured in Google Cloud.

---

## Project Structure (high level)
- src/auth.ts: NextAuth configuration, Google provider, token refresh logic, and export of auth handlers.
- src/app/api/auth/[...nextauth]/route.ts: Exposes NextAuth GET/POST handlers.
- src/app/actions/index.ts: Server actions for calling Google APIs using the session access token.
- src/app/page.tsx: Login page; redirects authenticated users to /home.
- src/app/home/page.tsx: Protected page that renders the dashboard UI.
- src/components/dashboard/SimpleGoogleAPIDashboard.tsx: UI to input Property ID and Site URL and fetch data.
- src/config/env.ts: Environment variable mapping and validation helpers.

## Troubleshooting
- Callback URI mismatch: Ensure AUTH_URL/NEXTAUTH_URL matches your actual domain and the redirect URI in Google Cloud is exactly {BASE_URL}/api/auth/callback/google.
- Missing env vars in production: The app throws a clear error listing what’s missing.
- 403/permission errors from Google APIs: Verify the signed-in Google account has access to the GA4 property and the Search Console property, and that the requested scopes were granted.

## License
MIT (or project’s license, if different).
