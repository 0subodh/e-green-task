'use server'

import { signIn, signOut } from '@/auth'
import { auth } from '@/auth'

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

export async function fetchGoogleAnalyticsData(propertyId: string) {
    try {
        // Get the session to retrieve the access token
        const session = await auth()
        
        // Log the access token for debugging (remove in production)
        console.log('Access Token:', session?.accessToken)

        if (!session || !session.accessToken) {
            throw new Error('No access token available')
        }

        // Check if there was an error refreshing the token
        if (session.error) {
            throw new Error(session.error)
        }

        // Make the API request to Google Analytics GA4
        // Using the runReport endpoint of the GA4 Reporting API
        const response = await fetch(
            `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dateRanges: [
                        {
                            startDate: '30daysAgo',
                            endDate: 'today'
                        }
                    ],
                    metrics: [
                        {
                            name: 'sessions'
                        },
                        {
                            name: 'activeUsers'
                        }
                    ]
                })
            }
        )

        if (!response.ok) {
            throw new Error(
                `Google Analytics API request failed with status ${response.status}`
            )
        }

        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        console.error('Error fetching Google Analytics data:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

export async function fetchGoogleSearchConsoleData(siteUrl: string) {
    try {
        // Get the session to retrieve the access token
        const session = await auth()
        
        // Log the access token for debugging (remove in production)
        console.log('Search Console Access Token:', session?.accessToken)
        
        if (!session || !session.accessToken) {
            throw new Error('No access token available')
        }
        
        // Check if there was an error refreshing the token
        if (session.error) {
            throw new Error(session.error)
        }
        
        // Make the API request to Google Search Console
        // We're using a simple query to get search analytics data
        const response = await fetch(
            `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate: '2023-01-01',
                    endDate: '2023-01-31',
                    dimensions: ['query', 'page'],
                    rowLimit: 10,
                }),
            }
        )
        
        if (!response.ok) {
            throw new Error(`Google Search Console API request failed with status ${response.status}`)
        }
        
        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        console.error('Error fetching Google Search Console data:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}
