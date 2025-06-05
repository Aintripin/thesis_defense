import React from 'react'
import { motion } from 'framer-motion'

const ObjectivesSection: React.FC = () => {
  return (
    <motion.div 
      className="objectives-section"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="objective-block">
        <div className="section-title">
          <div className="section-icon">🎯</div>
          Цель исследования
        </div>

        <ul className="objective-list">
          <li className="objective-item">
            Провести
            <strong> комплексное сравнительное исследование</strong>
            производительности постреляционных и реляционной СУБД
          </li>
          <li className="objective-item">
            Оценить поведение СУБД при обработке
            <strong> больших объемов данных</strong> (~12 ГБ)
          </li>
          <li className="objective-item">
            Использовать
            <strong> стандартизированные методы</strong> тестирования
            (YCSB)
          </li>
          <li className="objective-item">
            Выявить <strong>сильные и слабые стороны</strong> каждой СУБД
            в различных сценариях
          </li>
        </ul>
      </div>
    </motion.div>
  )
}

export default ObjectivesSection 