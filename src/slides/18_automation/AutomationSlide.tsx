import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './AutomationSlide.module.scss';
import { SlideHeading } from '../../components/SlideHeading';

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

const AutomationSlide = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.automationSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <SlideHeading size="small">АВТОМАТИЗАЦИЯ СБОРА РЕЗУЛЬТАТОВ</SlideHeading>

      {/* Main content area */}
      <motion.div 
        className={styles.contentContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.contentGrid}>
          {/* Left column: Functionality */}
          <motion.div 
            className={styles.contentSection}
            variants={slideInLeft}
          >
            <motion.div 
              className={styles.sectionBlock}
              variants={fadeInUp}
            >
              <div className={styles.scriptInfo}>
                <div className={styles.scriptName}>parse_ycsb.py</div>
                <div className={styles.scriptDesc}>
                  Автоматизированный парсинг результатов YCSB тестирования
                </div>
              </div>

              <div className={styles.categoryTitle}>Функциональность скрипта:</div>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <strong>Автоматическое извлечение</strong> метрик из отчетов YCSB
                </li>
                <li className={styles.featureItem}>
                  <strong>Парсинг различных форматов</strong> выходных данных
                </li>
                <li className={styles.featureItem}>
                  <strong>Агрегация результатов</strong> по СУБД, workload'ам и потокам
                </li>
                <li className={styles.featureItem}>
                  <strong>Расчет статистических показателей</strong> (среднее, медиана, стандартное отклонение)
                </li>
              </ul>

              <div className={styles.outputSection}>
                <div className={styles.categoryTitle}>Структура выходных данных:</div>
                <div className={styles.outputGrid}>
                  <div className={styles.outputItem}>
                    <div className={styles.outputTitle}>CSV-файлы</div>
                    <div className={styles.outputDesc}>
                      Агрегированные результаты для каждой СУБД
                    </div>
                  </div>
                  <div className={styles.outputItem}>
                    <div className={styles.outputTitle}>Сводные таблицы</div>
                    <div className={styles.outputDesc}>
                      Данные для сравнительного анализа
                    </div>
                  </div>
                  <div className={styles.outputItem}>
                    <div className={styles.outputTitle}>JSON-файлы</div>
                    <div className={styles.outputDesc}>
                      Интеграция с системами визуализации
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Extracted metrics */}
          <motion.div 
            className={styles.contentSection}
            variants={slideInRight}
          >
            <motion.div 
              className={styles.sectionBlock}
              variants={fadeInUp}
            >
              <div className={styles.categoryTitle}>Извлекаемые метрики:</div>

              <div className={styles.metricsSection}>
                <div className={styles.metricGroup}>
                  <div className={styles.groupTitle}>Общие метрики</div>
                  <div className={styles.groupItems}>
                    • Время выполнения (RunTime)<br />
                    • Пропускная способность (Throughput, ops/sec)
                  </div>
                </div>

                <div className={styles.metricGroup}>
                  <div className={styles.groupTitle}>Метрики сборки мусора</div>
                  <div className={styles.groupItems}>
                    • G1 Young Generation (количество, время, %)<br />
                    • G1 Old Generation (количество, время, %)
                  </div>
                </div>

                <div className={styles.metricGroup}>
                  <div className={styles.groupTitle}>Операции YCSB</div>
                  <div className={styles.groupItems}>
                    • READ, UPDATE, INSERT, SCAN<br />
                    • READ-MODIFY-WRITE, CLEANUP
                  </div>
                </div>

                <div className={styles.metricGroup}>
                  <div className={styles.groupTitle}>Задержки операций</div>
                  <div className={styles.groupItems}>
                    • Среднее значение (AverageLatency)<br />
                    • Минимум и максимум<br />
                    • Перцентили: P95, P99
                  </div>
                </div>
              </div>

              <motion.div 
                className={styles.metricsGrid}
                variants={fadeInUp}
              >
                <div className={styles.metricCard}>
                  <div className={styles.metricTitle}>Всего метрик</div>
                  <div className={styles.metricValue}>60+<br />параметров</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricTitle}>Формат вывода</div>
                  <div className={styles.metricValue}>CSV<br />структура</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricTitle}>Автоматизация</div>
                  <div className={styles.metricValue}>100%<br />процесса</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricTitle}>Точность</div>
                  <div className={styles.metricValue}>Микросекунды<br />(μs)</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AutomationSlide; 