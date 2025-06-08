import React from 'react';
import { motion } from 'framer-motion';
import styles from './VisualizationSlide.module.scss';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const VisualizationSlide = () => {
  return (
    <div className={styles.visualizationSlide}>
      {/* Header like slides 17 & 18 */}
      <motion.div 
        className={styles.slideHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>В И З У А Л И З А Ц И Я&nbsp;&nbsp;И&nbsp;&nbsp;Р Е К О М Е Н Д А Ц И И</h1>
        <p className={styles.slideSubtitle}>Apache Superset дашборды</p>
      </motion.div>

      {/* Main content area */}
      <motion.div 
        className={styles.contentContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.contentGrid}>
          {/* Left column: Visualization */}
          <motion.div 
            className={styles.contentSection}
            variants={slideInLeft}
          >
            <motion.div 
              className={styles.sectionBlock}
              variants={fadeInUp}
            >
              <div className={styles.supersetHeader}>
                <div className={styles.supersetTitle}>Apache Superset</div>
                <div className={styles.supersetDesc}>
                  Платформа для интерактивной визуализации данных
                </div>
              </div>

              <div className={styles.blockTitle}>Типы созданных визуализаций:</div>
              <ul className={styles.visualizationList}>
                <li className={styles.vizItem}>
                  Линейные графики пропускной способности по количеству потоков
                </li>
                <li className={styles.vizItem}>
                  Гистограммы сравнения производительности по workload'ам
                </li>
                <li className={styles.vizItem}>Тепловые карты задержек операций</li>
                <li className={styles.vizItem}>
                  Сравнительные диаграммы масштабируемости СУБД
                </li>
              </ul>

              <div className={styles.blockTitle}>Ключевые дашборды:</div>
              <div className={styles.dashboardGrid}>
                <div className={styles.dashboardItem}>
                  <div className={styles.dashboardName}>"Обзор производительности"</div>
                  <div className={styles.dashboardDesc}>
                    Сравнение всех СУБД по основным метрикам
                  </div>
                </div>
                <div className={styles.dashboardItem}>
                  <div className={styles.dashboardName}>"Анализ масштабируемости"</div>
                  <div className={styles.dashboardDesc}>
                    Поведение при увеличении параллелизма
                  </div>
                </div>
                <div className={styles.dashboardItem}>
                  <div className={styles.dashboardName}>"Детализация по операциям"</div>
                  <div className={styles.dashboardDesc}>
                    Задержки для различных типов операций
                  </div>
                </div>
                <div className={styles.dashboardItem}>
                  <div className={styles.dashboardName}>
                    "Workload-специфичные паттерны"
                  </div>
                  <div className={styles.dashboardDesc}>
                    Оптимальные сценарии для каждой СУБД
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Recommendations */}
          <motion.div 
            className={styles.contentSection}
            variants={slideInRight}
          >
            <motion.div 
              className={styles.sectionBlock}
              variants={fadeInUp}
            >
              <div className={styles.blockTitle}>Рекомендации по выбору СУБД:</div>

              <motion.div 
                className={`${styles.dbSection} ${styles.dbMongodb}`}
                variants={fadeInUp}
              >
                <div className={`${styles.dbTitle} ${styles.mongodbColor}`}>MongoDB</div>
                <div className={styles.dbSubtitle}>Оптимальные сценарии:</div>
                <ul className={styles.dbFeatures}>
                  <li className={styles.dbFeature}>Приложения с гибкой схемой данных</li>
                  <li className={styles.dbFeature}>
                    Системы с преобладанием операций чтения
                  </li>
                  <li className={styles.dbFeature}>Сложные вложенные документы</li>
                </ul>
                <div className={styles.performanceMetrics}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricLabel}>Workload D</div>
                    <div className={styles.metricValue}>47.7k ops/sec</div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricLabel}>Workload E</div>
                    <div className={styles.metricValue}>23.9k ops/sec</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className={`${styles.dbSection} ${styles.dbCassandra}`}
                variants={fadeInUp}
              >
                <div className={`${styles.dbTitle} ${styles.cassandraColor}`}>Cassandra</div>
                <div className={styles.dbSubtitle}>Сильные стороны:</div>
                <ul className={styles.dbFeatures}>
                  <li className={styles.dbFeature}>
                    Системы с высокой интенсивностью записи
                  </li>
                  <li className={styles.dbFeature}>
                    Лидер по пропускной способности Workload A-C
                  </li>
                  <li className={styles.dbFeature}>Низкие задержки операций обновления</li>
                </ul>
                <div className={styles.performanceMetrics}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricLabel}>Workload A-C</div>
                    <div className={styles.metricValue}>24.2-29.2k ops/sec</div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricLabel}>Workload E</div>
                    <div className={styles.metricValue}>1.81k ops/sec</div>
                  </div>
                </div>
                <div className={styles.limitations}>
                  <div className={styles.limitationsTitle}>Ограничения:</div>
                  <div className={styles.limitationsText}>
                    Низкая эффективность сканирования
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className={`${styles.dbSection} ${styles.dbPostgresql}`}
                variants={fadeInUp}
              >
                <div className={`${styles.dbTitle} ${styles.postgresqlColor}`}>PostgreSQL</div>
                <div className={styles.dbSubtitle}>Универсальность:</div>
                <ul className={styles.dbFeatures}>
                  <li className={styles.dbFeature}>
                    Исключительная производительность Workload D
                  </li>
                  <li className={styles.dbFeature}>Полноценная ACID-совместимость</li>
                  <li className={styles.dbFeature}>
                    Нелинейная масштабируемость с пиком при 128 потоков
                  </li>
                </ul>
                <div className={styles.performanceMetrics}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricLabel}>Workload D</div>
                    <div className={styles.metricValue}>55.8k ops/sec</div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricLabel}>Workload E</div>
                    <div className={styles.metricValue}>9.62k ops/sec</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisualizationSlide; 