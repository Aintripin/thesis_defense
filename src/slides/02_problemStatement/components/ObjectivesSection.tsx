import React from 'react'
import { motion } from 'framer-motion'
import styles from '../ProblemStatementSlide.module.scss'

const ObjectivesSection: React.FC = () => {
  return (
    <motion.div 
      className={styles.objectivesSection}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className={styles.objectiveBlock}>
        <div className={styles.sectionTitle}>
          <div className={styles.sectionIcon}>🎯</div>
          Цель исследования
        </div>

        <ul className={styles.objectiveList}>
          <li className={styles.objectiveItem}>
            Провести
            <strong> комплексное сравнительное исследование</strong>
            производительности постреляционных и реляционной СУБД
          </li>
          <li className={styles.objectiveItem}>
            Оценить поведение СУБД при обработке
            <strong> больших объемов данных</strong> (~12 ГБ)
          </li>
          <li className={styles.objectiveItem}>
            Использовать
            <strong> стандартизированные методы</strong> тестирования
            (YCSB)
          </li>
          <li className={styles.objectiveItem}>
            Выявить <strong>сильные и слабые стороны</strong> каждой СУБД
            в различных сценариях
          </li>
        </ul>
      </div>
    </motion.div>
  )
}

export default ObjectivesSection 