import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import Logout from '@/components/Logout'
import Footer from '@/components/Footer'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Everything Green',
    description: 'Authentication example with NextAuth and Google',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()
    const user = session?.user
    // Derive first name only, capitalized. Fallback to email local-part or "User".
    const sourceName =
        (user?.name && user.name.trim()) ||
        (user?.email && user.email.trim()) ||
        'User'
    const base = sourceName.includes('@')
        ? sourceName.split('@')[0]
        : sourceName
    const token =
        base
            .replace(/[._-]+/g, ' ')
            .trim()
            .split(/\s+/)
            .filter(Boolean)[0] || 'User'
    const firstName =
        token.charAt(0).toUpperCase() + token.slice(1).toLowerCase()
    const imageSrc =
        typeof user?.image === 'string' && user.image.length > 0
            ? user.image
            : null

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                        <Link
                            href="/"
                            className="font-semibold text-gray-900 dark:text-gray-100"
                        >
                            Green Everything
                        </Link>
                        <nav className="flex items-center gap-4">
                            {user ? (
                                <details className="relative">
                                    <summary className="flex items-center gap-2 list-none cursor-pointer select-none">
                                        {imageSrc ? (
                                            <Image
                                                src={imageSrc}
                                                alt={`${firstName}'s profile photo`}
                                                width={28}
                                                height={28}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <div
                                                className="rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700"
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                }}
                                                aria-label={`${firstName} has no profile photo`}
                                                role="img"
                                            >
                                                {firstName
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                        <span className="text-sm text-gray-800 dark:text-gray-200">
                                            {firstName}
                                        </span>
                                        <svg
                                            className="w-4 h-4 text-gray-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </summary>
                                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-2 z-50">
                                        <div className="px-2 py-2">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                                {firstName}
                                            </p>
                                            {user?.email && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {user.email}
                                                </p>
                                            )}
                                        </div>
                                        <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
                                        <div className="mt-1 px-1">
                                            <Logout />
                                        </div>
                                    </div>
                                </details>
                            ) : (
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Not logged in
                                    </span>
                                    <Link
                                        href="/"
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </header>
                <main className="flex-1 flex items-center justify-center">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
