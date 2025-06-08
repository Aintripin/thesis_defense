import React from 'react';
import { motion } from 'framer-motion';
import styles from './YcsbConfigurationSlide.module.scss';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const YcsbConfigurationSlide: React.FC = () => {
  return (
    <div className={styles.ycsbConfigurationSlide}>
      <div className={styles.contentContainer}>
        <div className={styles.mainContentContainer}>
          
          <motion.div 
            className={styles.slideTitleContainer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.slideTitle}>К О Н Ф И Г У Р А Ц И Я&nbsp;&nbsp;Y C S B</h1>
            <p className={styles.slideSubtitle}>Параметры тестирования производительности СУБД</p>
          </motion.div>

          <motion.div 
            className={styles.slideContent}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Левая колонка */}
            <motion.div 
              className={styles.configSection}
              variants={slideInLeft}
            >
              <motion.div 
                className={`${styles.configBlock} ${styles.primary}`}
                variants={fadeInUp}
              >
                <div className={styles.blockHeader}>
                  <div className={styles.blockIcon}>⚙</div>
                  <h3 className={styles.blockTitle}>Основные параметры</h3>
                </div>
                <div className={styles.blockContent}>
                  <ul className={styles.configList}>
                    <li className={styles.configItem}>
                      <span className={styles.configLabel}>Record Count</span>
                      <span className={styles.configValue}>4,894,081</span>
                    </li>
                    <li className={styles.configItem}>
                      <span className={styles.configLabel}>Operation Count</span>
                      <span className={styles.configValue}>4,894,081</span>
                    </li>
                    <li className={styles.configItem}>
                      <span className={styles.configLabel}>Threads</span>
                      <span className={styles.configValue}>[4,8,16,32,64,128,256]</span>
                    </li>
                    <li className={styles.configItem}>
                      <span className={styles.configLabel}>Распределение</span>
                      <span className={styles.configValue}>zipfian</span>
                    </li>
                    <li className={styles.configItem}>
                      <span className={styles.configLabel}>Повторения</span>
                      <span className={styles.configValue}>3x</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div 
                className={`${styles.configBlock} ${styles.accent}`}
                variants={fadeInUp}
              >
                <div className={styles.blockHeader}>
                  <div className={styles.blockIcon}>🗄</div>
                  <h3 className={styles.blockTitle}>Драйверы СУБД</h3>
                </div>
                <div className={styles.blockContent}>
                  <div className={styles.driversGrid}>
                    <div className={styles.driverItem}>
                      <div className={styles.driverName}>MongoDB</div>
                      <div className={styles.driverDesc}>Стандартный YCSB драйвер для документоориентированной СУБД</div>
                    </div>
                    <div className={styles.driverItem}>
                      <div className={styles.driverName}>Cassandra</div>
                      <div className={styles.driverDesc}>CQL-драйвер для колоночной распределенной СУБД</div>
                    </div>
                    <div className={styles.driverItem}>
                      <div className={styles.driverName}>PostgreSQL</div>
                      <div className={styles.driverDesc}>JDBC-драйвер для реляционной СУБД</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Средняя колонка */}
            <motion.div 
              className={styles.configSection}
              variants={fadeInUp}
            >
              <motion.div 
                className={`${styles.configBlock} ${styles.workloadsBlock}`}
                variants={fadeInUp}
              >
                <div className={styles.blockHeader}>
                  <div className={styles.blockIcon}>📊</div>
                  <h3 className={styles.blockTitle}>Рабочие нагрузки <span className={styles.statHighlight}>6 типов</span></h3>
                </div>
                <div className={styles.blockContent}>
                  <div className={styles.workloadGrid}>
                    <div className={styles.workloadCard}>
                      <h4 className={styles.workloadTitle}>
                        <span className={styles.workloadLetter}>A</span>
                        Workload A
                      </h4>
                      <div className={styles.workloadDescription}>
                        <span className={styles.workloadType}>Baseline</span>
                        <span className={styles.workloadDetail}>сбалансированная нагрузка</span>
                      </div>
                      <div className={styles.workloadMetrics}>50% read / 50% update</div>
                    </div>

                    <div className={styles.workloadCard}>
                      <h4 className={styles.workloadTitle}>
                        <span className={styles.workloadLetter}>B</span>
                        Workload B
                      </h4>
                      <div className={styles.workloadDescription}>
                        <span className={styles.workloadType}>Read-Heavy</span>
                        <span className={styles.workloadDetail}>преимущественно чтение</span>
                      </div>
                      <div className={styles.workloadMetrics}>95% read / 5% update</div>
                    </div>

                    <div className={styles.workloadCard}>
                      <h4 className={styles.workloadTitle}>
                        <span className={styles.workloadLetter}>C</span>
                        Workload C
                      </h4>
                      <div className={styles.workloadDescription}>
                        <span className={styles.workloadType}>Read-Only</span>
                        <span className={styles.workloadDetail}>только чтение</span>
                      </div>
                      <div className={styles.workloadMetrics}>100% read</div>
                    </div>

                    <div className={styles.workloadCard}>
                      <h4 className={styles.workloadTitle}>
                        <span className={styles.workloadLetter}>D</span>
                        Workload D
                      </h4>
                      <div className={styles.workloadDescription}>
                        <span className={styles.workloadType}>Read-Latest</span>
                        <span className={styles.workloadDetail}>чтение последних записей</span>
                      </div>
                      <div className={styles.workloadMetrics}>95% read latest / 5% insert</div>
                    </div>

                    <div className={styles.workloadCard}>
                      <h4 className={styles.workloadTitle}>
                        <span className={styles.workloadLetter}>E</span>
                        Workload E
                      </h4>
                      <div className={styles.workloadDescription}>
                        <span className={styles.workloadType}>Scan-Heavy</span>
                        <span className={styles.workloadDetail}>сканирование диапазонов</span>
                      </div>
                      <div className={styles.workloadMetrics}>95% scan / 5% insert</div>
                    </div>

                    <div className={styles.workloadCard}>
                      <h4 className={styles.workloadTitle}>
                        <span className={styles.workloadLetter}>F</span>
                        Workload F
                      </h4>
                      <div className={styles.workloadDescription}>
                        <span className={styles.workloadType}>Read-Modify-Write</span>
                        <span className={styles.workloadDetail}>чтение с модификацией</span>
                      </div>
                      <div className={styles.workloadMetrics}>50% read / 50% RMW</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Правая колонка */}
            <motion.div 
              className={styles.configSection}
              variants={slideInRight}
            >
              <motion.div 
                className={styles.configBlock}
                variants={fadeInUp}
              >
                <div className={styles.blockHeader}>
                  <div className={styles.blockIcon}>🔄</div>
                  <h3 className={styles.blockTitle}>Процедура тестирования</h3>
                </div>
                <div className={styles.blockContent}>
                  <ul className={styles.procedureList}>
                    <li className={styles.procedureItem}>
                      Трехкратное повторение каждой комбинации параметров
                    </li>
                    <li className={styles.procedureItem}>
                      Полный перезапуск СУБД между тестами
                    </li>
                    <li className={styles.procedureItem}>
                      Продолжительность тестирования: ≥120 минут
                    </li>
                    <li className={styles.procedureItem}>
                      Идентичные параметры для всех исследуемых СУБД
                    </li>
                    <li className={styles.procedureItem}>
                      Единая методология измерения производительности
                    </li>
                    <li className={styles.procedureItem}>
                      Стандартизированная форма отчетности
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div 
                className={`${styles.configBlock} ${styles.accent}`}
                variants={fadeInUp}
              >
                <div className={styles.blockHeader}>
                  <div className={styles.blockIcon}>✨</div>
                  <h3 className={styles.blockTitle}>Ключевые особенности</h3>
                </div>
                <div className={styles.blockContent}>
                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <div className={styles.featureIcon}>⚡</div>
                      Zipfian распределение для имитации реальных "горячих" точек доступа
                    </li>
                    <li className={styles.featureItem}>
                      <div className={styles.featureIcon}>🎯</div>
                      Минимизация влияния кэширования на результаты измерений
                    </li>
                    <li className={styles.featureItem}>
                      <div className={styles.featureIcon}>📐</div>
                      Обеспечение полной сопоставимости результатов между СУБД
                    </li>
                    <li className={styles.featureItem}>
                      <div className={styles.featureIcon}>🔍</div>
                      Комплексное покрытие спектра рабочих нагрузок
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default YcsbConfigurationSlide; 