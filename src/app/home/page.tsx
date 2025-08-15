import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Logout from '@/components/Logout'

const HomePage = async () => {
    const session = await auth()
    if (!session?.user) redirect('/')

    return (
        <div className="flex flex-col items-center m-4">
            <h1> {session?.user?.name}</h1>
            <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={80}
                height={80}
                className="rounded-full"
            />
            <Logout />
        </div>
    )
}
export default HomePage
