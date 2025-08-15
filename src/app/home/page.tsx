import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Logout from '@/components/Logout'

const HomePage = async () => {
    const session = await auth()
    if (!session?.user) redirect('/')

    const user = session!.user
    const displayName = user?.name ?? 'User'
    const imageSrc = typeof user?.image === 'string' && user.image.length > 0 ? user.image : null

    return (
        <div className="flex flex-col items-center m-4">
            <h1>{displayName}</h1>
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt={`${displayName}'s profile photo`}
                    width={80}
                    height={80}
                    className="rounded-full"
                />
            ) : (
                <div
                    className="rounded-full bg-gray-200 flex items-center justify-center"
                    style={{ width: 80, height: 80 }}
                    aria-label={`${displayName} has no profile photo`}
                    role="img"
                >
                    {displayName.charAt(0).toUpperCase()}
                </div>
            )}
            <Logout />
        </div>
    )
}
export default HomePage
