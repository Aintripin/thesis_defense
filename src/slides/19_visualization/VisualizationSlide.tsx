import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './VisualizationSlide.module.scss';

import img15 from '../../imgs/Picture15.png';
import img6 from '../../imgs/Picture6.png';
import img4 from '../../imgs/Picture4.png';
import img14 from '../../imgs/Picture14.png';
import img1 from '../../imgs/Picture1.png';
import img2 from '../../imgs/Picture2.png';

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

const placeholderVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

const VisualizationSlide = () => {
  const { isPrintTheme } = useTheme();
  const images = [img15, img6, img4, img14, img1, img2];

  return (
    <div className={`${styles.visualizationSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <motion.div 
        className={styles.slideHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>В И З У А Л И З А Ц И Я&nbsp;&nbsp;В&nbsp;&nbsp;APACHE SUPERSET</h1>
      </motion.div>

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

          {/* Right column: Placeholders */}
          <motion.div 
            className={styles.contentSection}
            variants={slideInRight}
          >
            <div className={styles.screenshotGrid}>
              {images.map((imgSrc, index) => (
                <motion.div
                  key={index}
                  className={styles.screenshotPlaceholder}
                  custom={index}
                  variants={placeholderVariants}
                >
                  <img 
                    src={imgSrc} 
                    alt={`Superset Dashboard ${index + 1}`} 
                    className={styles.screenshotImage} 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisualizationSlide; 