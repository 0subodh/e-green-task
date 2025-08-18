import React from 'react'

export type DataCardProps = {
  title: string
  description: string
  accentColor?: string
  icon: React.ReactNode
  placeholderIcon: React.ReactNode
  linked: boolean
  linkedMessage: string
  unlinkedMessage: string
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  description,
  accentColor = '#4a00e0',
  icon,
  placeholderIcon,
  linked,
  linkedMessage,
  unlinkedMessage,
}) => {
  return (
    <div className="flex-1 min-w-[300px] bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <span aria-hidden className="inline-flex items-center justify-center">
          {icon}
        </span>
        <h2 className="m-0 text-xl font-semibold" style={{ color: accentColor }}>
          {title}
        </h2>
      </div>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      <div className="flex flex-col items-center justify-center h-32">
        <span aria-hidden className="inline-flex items-center justify-center">
          {placeholderIcon}
        </span>
        <p className="mt-3 text-gray-600 text-sm text-center">
          {linked ? linkedMessage : unlinkedMessage}
        </p>
      </div>
    </div>
  )
}

export default DataCard
