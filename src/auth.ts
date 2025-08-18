import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'

const isProd = process.env.NODE_ENV === 'production'
const isBuilding = process.env.NEXT_PHASE === 'phase-production-build'
const appUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL

if (isProd && !isBuilding) {
    const missing: string[] = []
    if (!appUrl) missing.push('AUTH_URL or NEXTAUTH_URL')
    if (!process.env.GOOGLE_CLIENT_ID) missing.push('GOOGLE_CLIENT_ID')
    if (!process.env.GOOGLE_CLIENT_SECRET) missing.push('GOOGLE_CLIENT_SECRET')
    if (!process.env.AUTH_SECRET) missing.push('AUTH_SECRET')
    if (missing.length) {
        throw new Error(
            `Missing required environment variables in production: ${missing.join(
                ', '
            )}.\n` +
                'Please set AUTH_URL (or NEXTAUTH_URL) to your deployed URL and configure Google OAuth redirect URI accordingly.'
        )
    }
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const url = 'https://oauth2.googleapis.com/token'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken as string,
            }),
        })

        const tokens = await response.json()

        if (!response.ok) {
            throw tokens
        }

        return {
            ...token,
            accessToken: tokens.access_token,
            accessTokenExpires: Date.now() + tokens.expires_in * 1000,
        }
    } catch (error) {
        console.error('Error refreshing access token', error)
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}

export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    // Trust the host in production builds to avoid UntrustedHost errors.
    // Strongly prefer setting AUTH_URL/NEXTAUTH_URL in production to ensure correct redirect_uri.
    trustHost: true,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                    scope: 'openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly'
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Initial sign in
            if (account && account.access_token) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.accessTokenExpires = account.expires_at! * 1000
                return token
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token
            }

            // Access token has expired, try to refresh it
            return refreshAccessToken(token)
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            session.error = token.error as string | undefined
            return session
        },
    },
})
