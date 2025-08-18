import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const HomePage = async () => {
    const session = await auth()
    if (!session?.user) redirect('/')

    const user = session.user
    // Derive first name only, capitalized. Fallback to email local-part or "User".
    const sourceName = (user?.name && user.name.trim()) || (user?.email && user.email.trim()) || 'User'
    const base = sourceName.includes('@') ? sourceName.split('@')[0] : sourceName
    const token = base
        .replace(/[._-]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean)[0] || 'User'
    const firstName = token.charAt(0).toUpperCase() + token.slice(1).toLowerCase()

    return (
        <div className="flex flex-col items-center m-10">
            <h1 className="text-3xl font-semibold">Welcome, {firstName}</h1>
        </div>
    )
}
export default HomePage
