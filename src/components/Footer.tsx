import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    Made by Subodh with love
                </span>
                <span
                    className="ml-2 text-red-500"
                    aria-label="love"
                    role="img"
                >
                    ♥
                </span>
            </div>
        </footer>
    )
}

export default Footer
