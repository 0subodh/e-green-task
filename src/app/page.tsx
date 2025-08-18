import LoginForm from '@/components/LoginForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await auth()
    if (session?.user) redirect('/home')

    return (
        <div className="flex flex-col justify-center items-center m-4">
            <h1 className="text-3xl my-3">Log In</h1>
            <LoginForm />
        </div>
    )
}
