import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import ProblemSection from './components/ProblemSection'
import ObjectivesSection from './components/ObjectivesSection'
import ResearchObjectsSection from './components/ResearchObjectsSection'
import ResearchSubjectSection from './components/ResearchSubjectSection'
import styles from './ProblemStatementSlide.module.scss'
import { SlideHeading } from '../../components/SlideHeading'

const ProblemStatementSlide: React.FC = () => {
  const { isPrintTheme } = useTheme()

  return (
    <div className={`${styles.problemStatementSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <SlideHeading size="small">П О С Т А Н О В К А&nbsp;&nbsp;З А Д А Ч И</SlideHeading>

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