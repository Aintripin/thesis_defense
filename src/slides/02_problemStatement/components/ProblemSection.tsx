import React from 'react'
import { motion } from 'framer-motion'
import styles from '../ProblemStatementSlide.module.scss'

const ProblemSection: React.FC = () => {
  return (
    <motion.div 
      className={styles.problemSection}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={styles.sectionTitle}>
        <div className={styles.sectionIcon}>⚠</div>
        Проблема
      </div>

      <div className={styles.problemsGrid}>
        <motion.div 
          className={styles.problemCard}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.problemTitle}>Лавинообразный рост данных</div>
          <div className={styles.problemText}>
            Ежедневно генерируются огромные массивы информации (к 2025 г.
            – <span className={styles.highlightNumber}>175 зеттабайт</span>)
          </div>
        </motion.div>

        <motion.div 
          className={styles.problemCard}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.problemTitle}>Критичность выбора СУБД</div>
          <div className={styles.problemText}>
            От выбора системы напрямую зависят производительность,
            масштабируемость и эффективность приложений
          </div>
        </motion.div>

        <motion.div 
          className={styles.problemCard}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className={styles.problemTitle}>Многообразие СУБД</div>
          <div className={styles.problemText}>
            Наряду с реляционными СУБД, широкое распространение получили
            NoSQL решения, каждое со своими особенностями
          </div>
        </motion.div>

        <motion.div 
          className={styles.problemCard}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={styles.problemTitle}>Высокая цена ошибки</div>
          <div className={styles.problemText}>
            Неправильный выбор ведет к проблемам производительности и
            высоким эксплуатационным расходам
          </div>
        </motion.div>
      </div>

      <div className={styles.ycsbBadge}>Решение: YCSB Benchmark</div>
    </motion.div>
  )
}

export default ProblemSection 