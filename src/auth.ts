import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    // Trust the host in production builds to avoid UntrustedHost errors
    // Prefer setting AUTH_URL to your deployment URL in real deployments
    trustHost: true,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
})
