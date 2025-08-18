"use client"

import React from 'react'
import Header from './Header'
import LinkButtons from './LinkButtons'
import DataCard from './DataCard'

const GoogleAPIDashboard: React.FC = () => {
  const [searchConsoleLinked, setSearchConsoleLinked] = React.useState(false)
  const [analyticsLinked, setAnalyticsLinked] = React.useState(false)

  const handleLinkSearchConsole = () => {
    // Placeholder for actual linking flow
    console.log('Linking Google Search Console...')
    setSearchConsoleLinked(true)
  }

  const handleLinkAnalytics = () => {
    // Placeholder for actual linking flow
    console.log('Linking Google Analytics...')
    setAnalyticsLinked(true)
  }

  return (
    <div className="font-sans bg-[#e6f2ff] min-h-[70vh] md:min-h-[60vh] rounded-2xl md:rounded-3xl p-5 md:p-10 flex flex-col items-center text-[#333] my-6">
      <Header />

      <LinkButtons
        onLinkSearchConsole={handleLinkSearchConsole}
        onLinkAnalytics={handleLinkAnalytics}
      />

      <div className="flex gap-6 justify-center flex-wrap w-full max-w-[1200px]">
        <DataCard
          title="Search Console Data"
          description="Search performance and indexing insights"
          accentColor="#4a00e0"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17S3 13.866 3 10 6.134 3 10 3s7 3.134 7 7z" stroke="#4a00e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          placeholderIcon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17S3 13.866 3 10 6.134 3 10 3s7 3.134 7 7z" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          linked={searchConsoleLinked}
          linkedMessage="Data loading..."
          unlinkedMessage={'Click "Link Google Search Console" to view data'}
        />

        <DataCard
          title="Analytics Data"
          description="Traffic and engagement metrics"
          accentColor="#009688"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 12H17M7 16H11M7 8H13" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          placeholderIcon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 12H17M7 16H11M7 8H13" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          linked={analyticsLinked}
          linkedMessage="Data loading..."
          unlinkedMessage={'Click "Link Google Analytics" to view data'}
        />
      </div>
    </div>
  )
}

export default GoogleAPIDashboard
