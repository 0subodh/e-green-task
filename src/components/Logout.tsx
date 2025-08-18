import React from 'react'
import { doSocialLogout } from '@/app/actions'

const Logout = () => {
    return (
        <form action={doSocialLogout}>
            <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
            >
                Logout
            </button>
        </form>
    )
}
export default Logout
