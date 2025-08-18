import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SimpleGoogleAPIDashboard from '@/components/dashboard/SimpleGoogleAPIDashboard'

const HomePage = async () => {
    const session = await auth()
    if (!session?.user) redirect('/')

    return <SimpleGoogleAPIDashboard />
}
export default HomePage
