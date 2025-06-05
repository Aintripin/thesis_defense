import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SlideLayout.css'

interface SlideLayoutProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle 
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`slide-layout ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="slide-container glass-strong">
          {(title || subtitle) && (
            <motion.header 
              className="slide-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {title && (
                <h1 className="slide-title text-gradient">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="slide-subtitle">
                  {subtitle}
                </p>
              )}
            </motion.header>
          )}
          
          <motion.main 
            className="slide-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {children}
          </motion.main>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SlideLayout 