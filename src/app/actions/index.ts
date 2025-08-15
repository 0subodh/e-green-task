'use server'

import { signIn, signOut } from '@/auth'

export async function doSocialLogin(formData: FormData): Promise<void> {
    const action = formData.get('action')
    if (typeof action !== 'string') {
        throw new Error('Invalid or missing "action" in form data')
    }
    await signIn(action, { redirectTo: '/home' })
    console.log(action)
}

export async function doSocialLogout() {
    await signOut({ redirectTo: '/' })
}
