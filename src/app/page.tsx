import LoginForm from '@/components/LoginForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await auth()
    if (session?.user) redirect('/home')

    return (
        <div className="w-full flex justify-center py-6">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-6">Log In</h1>
                <div className="flex justify-center">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
