import React from 'react'
import { doSocialLogout } from '@/app/actions'

const Logout = () => {
    return (
        <form action={doSocialLogout}>
            <button
                className="bg-red-600 my-2 text-white p-1 rounded-2xl"
                type="submit"
            >
                Logout
            </button>
        </form>
    )
}
export default Logout
