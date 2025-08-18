import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-black text-white py-4">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-sm w-full">
                <p>
                    Made with <span className="text-red-500">♥</span> by{' '}
                    <span className="font-medium">Subodh</span>
                </p>

                <p className="text-xs">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
