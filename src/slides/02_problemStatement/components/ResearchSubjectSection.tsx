import React from 'react'
import { motion } from 'framer-motion'

const ResearchSubjectSection: React.FC = () => {
  return (
    <motion.div 
      className="subject-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="section-title">
        <div className="section-icon">📊</div>
        Предмет исследования
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Пропускная способность</div>
          <div className="metric-value">ops/sec</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Время отклика</div>
          <div className="metric-value">Latency</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Масштабируемость</div>
          <div className="metric-value">Threads</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Рабочие нагрузки</div>
          <div className="metric-value">YCSB A-F</div>
        </div>
      </div>

      <div className="ycsb-description">
        Показатели при различных рабочих нагрузках<br />
        (CRUD, сканирование), генерируемых YCSB
      </div>
    </motion.div>
  )
}

export default ResearchSubjectSection 