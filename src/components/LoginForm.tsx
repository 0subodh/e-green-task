import React from 'react'
import { doSocialLogin } from '@/app/actions'

const LoginForm = () => {
    return (
        <form action={doSocialLogin}>
            <button
                className="bg-black text-white p-1 rounded-md m-1 text-lg"
                type="submit"
                name="action"
                value="google"
            >
                Sign In with Google
            </button>
        </form>
    )
}

export default LoginForm
