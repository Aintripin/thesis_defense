import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import ProblemSection from './components/ProblemSection'
import ObjectivesSection from './components/ObjectivesSection'
import ResearchObjectsSection from './components/ResearchObjectsSection'
import ResearchSubjectSection from './components/ResearchSubjectSection'
import styles from './ProblemStatementSlide.module.scss'

const ProblemStatementSlide: React.FC = () => {
  const { isPrintTheme } = useTheme()

  return (
    <div className={`${styles.problemStatementSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <motion.div 
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>П О С Т А Н О В К А&nbsp;&nbsp;З А Д А Ч И</h1>
        <p className={styles.slideSubtitle}>Проблема, цель и объекты исследования</p>
      </motion.div>

      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.sectionRow}>
            <ProblemSection />
            <ObjectivesSection />
          </div>

          <div className={styles.bottomRow}>
            <ResearchObjectsSection />
            <ResearchSubjectSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemStatementSlide 