import React from 'react'
import { motion } from 'framer-motion'
import styles from '../ProblemStatementSlide.module.scss'

const ResearchObjectsSection: React.FC = () => {
  return (
    <motion.div 
      className={styles.entitiesSection}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className={styles.sectionTitle}>
        <div className={styles.sectionIcon}>🗄</div>
        Объекты исследования
      </div>

      <div className={styles.dbGrid}>
        <div className={styles.dbItem}>
          <div className={`${styles.dbIcon} ${styles.dbPostgresql}`}>
            <img src="/src/assets/postgresql.svg" alt="PostgreSQL" />
          </div>
          <div className={styles.dbInfo}>
            <div className={styles.dbName}>PostgreSQL</div>
            <div className={styles.dbType}>Реляционная СУБД</div>
          </div>
        </div>

        <div className={styles.dbItem}>
          <div className={`${styles.dbIcon} ${styles.dbMongodb}`}>
            <img src="/src/assets/mongodb.svg" alt="MongoDB" />
          </div>
          <div className={styles.dbInfo}>
            <div className={styles.dbName}>MongoDB</div>
            <div className={styles.dbType}>Документоориентированная NoSQL</div>
          </div>
        </div>

        <div className={styles.dbItem}>
          <div className={`${styles.dbIcon} ${styles.dbCassandra}`}>
            <img src="/src/assets/apachecassandra.svg" alt="Cassandra" />
          </div>
          <div className={styles.dbInfo}>
            <div className={styles.dbName}>Cassandra</div>
            <div className={styles.dbType}>Колоночная NoSQL</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResearchObjectsSection 