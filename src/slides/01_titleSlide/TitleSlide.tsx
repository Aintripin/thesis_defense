import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './TitleSlide.module.scss'

// Import BMSTU logo assets
import BMSTULogoPNG from '../../assets/bmstu-logo-white.png'
import BMSTULogoSVG from '../../assets/bmstu-logo-white.svg'

const TitleSlide: React.FC = () => {
  const navigate = useNavigate()
  const { isColorTheme, isPrintTheme } = useTheme()
  const logoRef = useRef<HTMLImageElement>(null)

  const handleStartPresentation = () => {
    navigate('/problem')
  }

  return (
    <div className={`${styles.titleSlideFullscreen} ${isPrintTheme ? styles.printTheme : ''}`}>
      <div className={styles.titleBackground}>
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

        {/* Main Content Wrapper with Consistent Left Alignment */}
        <div className={styles.titleMainContent}>
          <div className={styles.titleContentContainer}>
            {/* University Name */}
            <motion.div 
              className={styles.universityHeader}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className={styles.universityTitle}>
                Московский государственный технический университет им. Н.Э. Баумана
              </h1>
            </motion.div>

            {/* Main Content Area - Centers title vertically */}
            <div className={styles.mainContentArea}>
              {/* Main Title */}
              <motion.div 
                className={styles.titleSection}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h2 className={styles.mainTitle}>
                  <span className={styles.titleLine}>Исследование производительности</span>
                  <span className={styles.titleLine}>постреляционных баз данных с</span>
                  <span className={styles.titleLine}>применением технологий тестирования</span>
                </h2>
              </motion.div>

              {/* Start Presentation Button - Only shown in color theme */}
              {isColorTheme && (
                <motion.div 
                  className={styles.startButtonContainer}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <button 
                    className={styles.startPresentationBtn}
                    onClick={handleStartPresentation}
                  >
                    <span>Начать презентацию</span>
                    <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* Student and Supervisor Info */}
              <motion.div 
                className={styles.infoWrapper}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Student Info Container */}
                <div className={styles.studentContainer}>
                  <div className={styles.infoSection}>
                    <div className={styles.labelsContainer}>
                      <span className={styles.label}>Студент:</span>
                      <span className={styles.label}>Группа</span>
                    </div>
                    <div className={styles.valuesContainer}>
                      <span className={styles.value}>Кучин Е.А.</span>
                      <span className={styles.value}>ИУ5-44М</span>
                    </div>
                  </div>
                </div>

                {/* Supervisor Info Container */}
                <div className={styles.supervisorContainer}>
                  <div className={styles.infoSection}>
                    <div className={styles.labelsContainer}>
                      <span className={`${styles.label} ${styles.supervisorLabel}`}>Научный руководитель:</span>
                      <span className={`${styles.label} ${styles.emptyLabel}`}></span>
                    </div>
                    <div className={styles.valuesContainer}>
                      <span className={`${styles.value} ${styles.supervisorName}`}>Виноградова М.В.</span>
                      <span className={`${styles.value} ${styles.supervisorTitle}`}>доцент, к.т.н.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Date */}
            <div className={styles.footerArea}>
              <motion.div 
                className={styles.dateFooter}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span className={styles.date}>18.06.2025</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleSlide 