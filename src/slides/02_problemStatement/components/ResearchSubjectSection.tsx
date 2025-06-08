import React from 'react'
import { motion } from 'framer-motion'
import styles from '../ProblemStatementSlide.module.scss'

const ResearchSubjectSection: React.FC = () => {
  return (
    <motion.div 
      className={styles.subjectSection}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className={styles.sectionTitle}>
        <div className={styles.sectionIcon}>📊</div>
        Предмет исследования
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Пропускная способность</div>
          <div className={styles.metricValue}>ops/sec</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Время отклика</div>
          <div className={styles.metricValue}>Latency</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Масштабируемость</div>
          <div className={styles.metricValue}>Threads</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Рабочие нагрузки</div>
          <div className={styles.metricValue}>YCSB A-F</div>
        </div>
      </div>

      <div className={styles.ycsbDescription}>
        Показатели при различных рабочих нагрузках<br />
        (CRUD, сканирование), генерируемых YCSB
      </div>
    </motion.div>
  )
}

export default ResearchSubjectSection 