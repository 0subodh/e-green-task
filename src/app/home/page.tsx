import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import GoogleAPIDashboard from '@/components/dashboard/GoogleAPIDashboard'

const HomePage = async () => {
    const session = await auth()
    if (!session?.user) redirect('/')

    return (
        <GoogleAPIDashboard />
    )
}
export default HomePage
