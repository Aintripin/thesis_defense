import React from 'react'
import { motion } from 'framer-motion'
import './SlideHeader.scss'

interface SlideHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export const SlideHeader: React.FC<SlideHeaderProps> = ({ 
  title, 
  subtitle, 
  className = '' 
}) => {
  return (
    <motion.div 
      className={`slide-title-container ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="slide-title">{title}</h1>
      {subtitle && <p className="slide-subtitle">{subtitle}</p>}
    </motion.div>
  )
} 