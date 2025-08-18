import React from 'react'
import { doSocialLogin } from '@/app/actions'

const LoginForm = () => {
    return (
        <form action={doSocialLogin}>
            <button
                className="bg-black text-white px-3 py-2 rounded-md m-1 text-lg flex items-center gap-2 cursor-pointer"
                type="submit"
                name="action"
                value="google"
                aria-label="Sign in with Google"
            >
                {/* Google logo SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        fill="#FFC107"
                        d="M43.611 20.083H42V20H24v8h11.303C33.932 32.658 29.317 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.155 7.948 3.052l5.657-5.657C34.869 6.053 29.7 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.652-.389-3.917z"
                    />
                    <path
                        fill="#FF3D00"
                        d="M6.306 14.691l6.571 4.818C14.323 15.108 18.799 12 24 12c3.059 0 5.842 1.155 7.948 3.052l5.657-5.657C34.869 6.053 29.7 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                        fill="#4CAF50"
                        d="M24 44c5.236 0 10.016-1.997 13.613-5.252l-6.278-5.311C29.318 34.658 26.751 36 24 36c-5.29 0-9.852-3.366-11.459-8.053l-6.5 5.007C9.356 39.556 16.12 44 24 44z"
                    />
                    <path
                        fill="#1976D2"
                        d="M43.611 20.083H42V20H24v8h11.303c-1.088 3.105-3.45 5.559-6.668 6.854l6.278 5.311C37.861 37.682 40 31.333 40 24c0-1.341-.138-2.652-.389-3.917z"
                    />
                </svg>
                <span>Sign In with Google</span>
            </button>
        </form>
    )
}

export default LoginForm
