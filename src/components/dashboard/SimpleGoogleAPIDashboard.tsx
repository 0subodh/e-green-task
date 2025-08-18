'use client'

import React, { useState } from 'react'
import {
    fetchGoogleAnalyticsData,
    fetchGoogleSearchConsoleData,
} from '@/app/actions'

const SimpleGoogleAPIDashboard: React.FC = () => {
    const [analyticsData, setAnalyticsData] = useState<any>(null)
    const [searchConsoleData, setSearchConsoleData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [analyticsError, setAnalyticsError] = useState<string | null>(null)
    const [searchConsoleError, setSearchConsoleError] = useState<string | null>(
        null
    )
    const [propertyId, setPropertyId] = useState<string>('')
    const [siteUrl, setSiteUrl] = useState<string>('')

    const fetchSearchConsoleData = async () => {
        if (!siteUrl) {
            setSearchConsoleError('Please enter a Site URL')
            return
        }

        setLoading(true)
        setSearchConsoleError(null)

        try {
            const result = await fetchGoogleSearchConsoleData(siteUrl)

            if (result.success) {
                setSearchConsoleData(result.data)
                setSearchConsoleError(null)
            } else {
                setSearchConsoleError(
                    result.error || 'Failed to fetch search console data'
                )
                setSearchConsoleData(null)
            }
        } catch (err) {
            setSearchConsoleError('An unexpected error occurred')
            setSearchConsoleData(null)
        } finally {
            setLoading(false)
        }
    }

    const fetchAnalyticsData = async () => {
        if (!propertyId) {
            setAnalyticsError('Please enter a Property ID')
            return
        }

        setLoading(true)
        setAnalyticsError(null)

        try {
            const result = await fetchGoogleAnalyticsData(propertyId)

            if (result.success) {
                setAnalyticsData(result.data)
                setAnalyticsError(null)
            } else {
                setAnalyticsError(
                    result.error || 'Failed to fetch analytics data'
                )
                setAnalyticsData(null)
            }
        } catch (err) {
            setAnalyticsError('An unexpected error occurred')
            setAnalyticsData(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="font-sans bg-[#e6f2ff] w-full rounded-none p-1 md:p-2 flex flex-col items-center text-[#333] my-0">
            <h1 className="text-2xl font-bold mb-6">Google API Dashboard</h1>

            {/* Search Console Section */}
            <div className="w-full mt-4">
                <h2 className="text-xl font-semibold mb-4">
                    Search Console Data
                </h2>
                <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
                    <input
                        type="text"
                        placeholder="Enter Search Console Site URL (e.g., sc-domain:example.com or https://www.example.com/)"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        className="w-full md:w-[400px] px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={fetchSearchConsoleData}
                        disabled={loading}
                        className="w-full md:w-[400px] px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Fetch Search Console Data'}
                    </button>
                </div>

                {searchConsoleError && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        Error: {searchConsoleError}
                    </div>
                )}

                {searchConsoleData && (
                    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-medium mb-3">
                            Search Console Results
                        </h3>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                            {JSON.stringify(searchConsoleData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            {/* Analytics Section */}
            <div className="w-full mt-8">
                <h2 className="text-xl font-semibold mb-4">Analytics Data</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
                    <input
                        type="text"
                        placeholder="Enter Google Analytics Property ID"
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                        className="w-full md:w-[400px] px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={fetchAnalyticsData}
                        disabled={loading}
                        className="w-full md:w-[400px] px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Fetch Analytics Data'}
                    </button>
                </div>

                {analyticsError && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        Error: {analyticsError}
                    </div>
                )}

                {analyticsData && (
                    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-medium mb-3">
                            Analytics Results
                        </h3>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                            {JSON.stringify(analyticsData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SimpleGoogleAPIDashboard
