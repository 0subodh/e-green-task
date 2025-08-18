import React from 'react'

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-[#4a00e0] leading-tight">Google APIs Dashboard</h1>
      <p className="text-sm md:text-base text-gray-600 max-w-[600px] mx-auto mt-3">
        Connect your Google Search Console and Google Analytics to view comprehensive insights about your website performance.
      </p>
    </div>
  )
}

export default Header
