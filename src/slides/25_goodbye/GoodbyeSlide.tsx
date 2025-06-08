import React from 'react'
import { motion } from 'framer-motion'
import styles from './GoodbyeSlide.module.scss'

const GoodbyeSlide: React.FC = () => {
  return (
    <div className={styles.goodbyeSlideFullscreen}>
      <div className={styles.goodbyeBackground}>
        {/* Background Logo - Large and positioned in corner */}
        <motion.div 
          className={styles.backgroundLogo}
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            y: [0, -10, 0]
          }}
          transition={{ 
            delay: 0.6, 
            duration: 2,
            y: {
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }
          }}
        >
          <img 
            src="/assets/bmstu/bmstu-logo-white.png" 
            alt="BMSTU Logo" 
            className={styles.bmstuLogoBackground}
            onError={(e) => {
              // Fallback to SVG if PNG fails
              const target = e.target as HTMLImageElement;
              target.src = "/assets/bmstu/bmstu-logo-white.svg";
            }}
          />
        </motion.div>

        {/* Main Content Wrapper */}
        <div className={styles.goodbyeMainContent}>
          <div className={styles.goodbyeContentContainer}>
            {/* Main Thank You Message */}
            <div className={styles.mainContentArea}>
              <motion.div 
                className={styles.thankYouSection}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 1.2, 
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <h1 className={styles.thankYouTitle}>
                  Спасибо!
                </h1>
              </motion.div>
            </div>

            {/* Contacts Footer */}
            <div className={styles.footerArea}>
              <motion.div 
                className={styles.contactsFooter}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span className={styles.contacts}>ИУ5-44М, Кучин Е.А.</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoodbyeSlide 