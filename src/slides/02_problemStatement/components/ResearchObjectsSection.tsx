import React from 'react'
import { motion } from 'framer-motion'

const ResearchObjectsSection: React.FC = () => {
  return (
    <motion.div 
      className="entities-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="section-title">
        <div className="section-icon">🗄</div>
        Объекты исследования
      </div>

      <div className="db-grid">
        <div className="db-item">
          <div className="db-icon db-postgresql">🐘</div>
          <div className="db-info">
            <div className="db-name">PostgreSQL</div>
            <div className="db-type">Реляционная СУБД</div>
          </div>
        </div>

        <div className="db-item">
          <div className="db-icon db-mongodb">🍃</div>
          <div className="db-info">
            <div className="db-name">MongoDB</div>
            <div className="db-type">Документоориентированная NoSQL</div>
          </div>
        </div>

        <div className="db-item">
          <div className="db-icon db-cassandra">⚡</div>
          <div className="db-info">
            <div className="db-name">Cassandra</div>
            <div className="db-type">Колоночная NoSQL</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResearchObjectsSection 