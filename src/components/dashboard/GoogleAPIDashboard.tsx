'use client'

import React, { useState, useEffect } from 'react'
import Header from './Header'
import LinkButtons from './LinkButtons'
import DataCard from './DataCard'
import {
    fetchGoogleAnalyticsData,
    fetchGoogleSearchConsoleData,
} from '@/app/actions'

const GoogleAPIDashboard: React.FC = () => {
    const [searchConsoleLinked, setSearchConsoleLinked] = React.useState(false)
    const [analyticsLinked, setAnalyticsLinked] = React.useState(false)
    const [analyticsData, setAnalyticsData] = useState<any>(null)
    const [searchConsoleData, setSearchConsoleData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [analyticsError, setAnalyticsError] = useState<string | null>(null)
    const [searchConsoleError, setSearchConsoleError] = useState<string | null>(
        null
    )
    const [viewId, setViewId] = useState<string>('')
    const [siteUrl, setSiteUrl] = useState<string>('')

    const handleLinkSearchConsole = async () => {
        if (!siteUrl) {
            setSearchConsoleError('Please enter a Site URL')
            return
        }

        setLoading(true)
        setSearchConsoleError(null)

        try {
            const result = await fetchGoogleSearchConsoleData(siteUrl)

            // Log the result for debugging
            console.log('Search Console API Result:', result)

            if (result.success) {
                setSearchConsoleData(result.data)
                setSearchConsoleLinked(true)
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

    const handleLinkAnalytics = () => {
        // Call the fetchAnalyticsData function when linking
        fetchAnalyticsData()
    }

    const fetchAnalyticsData = async () => {
        if (!viewId) {
            setAnalyticsError('Please enter a View ID')
            return
        }

        setLoading(true)
        setAnalyticsError(null)

        try {
            const result = await fetchGoogleAnalyticsData(viewId)

            // Log the result for debugging
            console.log('Analytics API Result:', result)

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
        <div className="font-sans bg-[#e6f2ff] min-h-[70vh] md:min-h-[60vh] rounded-2xl md:rounded-3xl p-5 md:p-10 flex flex-col items-center text-[#333] my-6">
            <Header />

            <LinkButtons
                onLinkSearchConsole={handleLinkSearchConsole}
                onLinkAnalytics={handleLinkAnalytics}
            />

            {/* Search Console Data Section */}
            <div className="w-full max-w-[1200px] mt-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Enter Search Console Site URL (e.g., sc-domain:example.com or https://www.example.com/)"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleLinkSearchConsole}
                        disabled={loading}
                        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Fetch Search Console Data'}
                    </button>
                </div>

                {searchConsoleError && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                        Error: {searchConsoleError}
                    </div>
                )}

                {searchConsoleData && (
                    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">
                            Google Search Console Data
                        </h3>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                            {JSON.stringify(searchConsoleData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            {/* Analytics Data Section */}
            <div className="w-full max-w-[1200px] mt-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Enter Google Analytics View ID"
                        value={viewId}
                        onChange={(e) => setViewId(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={fetchAnalyticsData}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Fetch Analytics Data'}
                    </button>
                </div>

                {analyticsError && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                        Error: {analyticsError}
                    </div>
                )}

                {analyticsData && (
                    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">
                            Google Analytics Data
                        </h3>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                            {JSON.stringify(analyticsData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            <div className="flex gap-6 justify-center flex-wrap w-full max-w-[1200px]">
                <DataCard
                    title="Search Console Data"
                    description="Search performance and indexing insights"
                    accentColor="#4a00e0"
                    icon={
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17S3 13.866 3 10 6.134 3 10 3s7 3.134 7 7z"
                                stroke="#4a00e0"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    placeholderIcon={
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17S3 13.866 3 10 6.134 3 10 3s7 3.134 7 7z"
                                stroke="#ccc"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    linked={searchConsoleLinked}
                    linkedMessage={
                        searchConsoleData
                            ? `Found ${searchConsoleData.rows?.length || 0} data rows`
                            : 'Data loading...'
                    }
                    unlinkedMessage={
                        'Click "Fetch Search Console Data" to view data'
                    }
                />

                <DataCard
                    title="Analytics Data"
                    description="Traffic and engagement metrics"
                    accentColor="#009688"
                    icon={
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                stroke="#009688"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7 12H17M7 16H11M7 8H13"
                                stroke="#009688"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    placeholderIcon={
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                stroke="#ccc"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7 12H17M7 16H11M7 8H13"
                                stroke="#ccc"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    linked={analyticsLinked}
                    linkedMessage="Data loading..."
                    unlinkedMessage={
                        'Click "Fetch Analytics Data" to view data'
                    }
                />
            </div>
        </div>
    )
}

export default GoogleAPIDashboard
