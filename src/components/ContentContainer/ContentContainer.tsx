import React from 'react'
import './ContentContainer.scss'

interface ContentContainerProps {
  children: React.ReactNode
  className?: string
}

export const ContentContainer: React.FC<ContentContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className="content-container">
      <div className={`content-wrapper ${className}`}>
        {children}
      </div>
    </div>
  )
} 