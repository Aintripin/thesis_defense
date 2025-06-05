import React from 'react'
import { SlideHeader } from '../SlideHeader/SlideHeader'
import { ContentContainer } from '../ContentContainer/ContentContainer'
import './SlideLayout.scss'

interface SlideLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = '',
  contentClassName = ''
}) => {
  return (
    <div className={`slide-layout ${className}`}>
      <SlideHeader title={title} subtitle={subtitle} />
      <ContentContainer className={contentClassName}>
        {children}
      </ContentContainer>
    </div>
  )
} 