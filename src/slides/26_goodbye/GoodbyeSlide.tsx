import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './GoodbyeSlide.module.scss'

// Import BMSTU logo assets
import BMSTULogoPNG from '../../assets/bmstu-logo-white.png'
import BMSTULogoSVG from '../../assets/bmstu-logo-white.svg'

const GoodbyeSlide: React.FC = () => {
  const { isPrintTheme } = useTheme()
  const logoRef = useRef<HTMLImageElement>(null)

  return (
    <div className={`${styles.goodbyeSlideFullscreen} ${isPrintTheme ? styles.printTheme : ''}`}>
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
          <motion.img 
            ref={logoRef}
            className={styles.bmstuLogoBackground}
            src={BMSTULogoPNG}
            alt="BMSTU Logo"
            onLoad={() => {
              // Try switching to SVG after PNG loads
              if (logoRef.current) {
                const target = logoRef.current;
                target.src = BMSTULogoSVG;
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ 
              duration: 1.5, 
              delay: 0.8,
              ease: "easeOut"
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