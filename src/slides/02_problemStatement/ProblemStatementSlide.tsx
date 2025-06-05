import React from 'react'
import { motion } from 'framer-motion'
import ProblemSection from './components/ProblemSection'
import ObjectivesSection from './components/ObjectivesSection'
import ResearchObjectsSection from './components/ResearchObjectsSection'
import ResearchSubjectSection from './components/ResearchSubjectSection'
import './ProblemStatementSlide.scss'

const ProblemStatementSlide: React.FC = () => {
  return (
    <div className="problem-statement-slide">
      <motion.div 
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">П О С Т А Н О В К А&nbsp;&nbsp;З А Д А Ч И</h1>
        <p className="slide-subtitle">Проблема, цель и объекты исследования</p>
      </motion.div>

      <div className="content-container">
        <div className="content-wrapper">
          <div className="section-row">
            <ProblemSection />
            <ObjectivesSection />
          </div>

          <div className="bottom-row">
            <ResearchObjectsSection />
            <ResearchSubjectSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemStatementSlide 