'use client'

import React from 'react'

type Props = {
    onLinkSearchConsole: () => void
    onLinkAnalytics: () => void
}

const LinkButtons: React.FC<Props> = ({
    onLinkSearchConsole,
    onLinkAnalytics,
}) => {
    return (
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
                onClick={onLinkSearchConsole}
                className="w-full justify-center bg-[#1a66ff] text-white rounded-lg px-6 py-3 text-base font-medium inline-flex items-center gap-2 hover:brightness-110 transition cursor-pointer"
                type="button"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17S3 13.866 3 10 6.134 3 10 3s7 3.134 7 7z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Link Google Search Console
            </button>

            <button
                onClick={onLinkAnalytics}
                className="w-full justify-center bg-[#009688] text-white rounded-lg px-6 py-3 text-base font-medium inline-flex items-center gap-2 hover:brightness-110 transition cursor-pointer"
                type="button"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7 12H17M7 16H11M7 8H13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Link Google Analytics
            </button>
        </div>
    )
}

export default LinkButtons
