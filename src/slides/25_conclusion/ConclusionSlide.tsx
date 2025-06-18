import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ConclusionSlide.module.scss';

const ConclusionSlide: React.FC = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.slide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <div className={styles.slideHeader}>
        <motion.h1 
          className={styles.slideTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          З А К Л Ю Ч Е Н И Е
        </motion.h1>
        <motion.p 
          className={styles.slideSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          Вклад исследования и перспективы развития
        </motion.p>
      </div>

      <div className={styles.contentGrid}>
        {/* Научный вклад */}
        <div className={styles.sectionColumn}>
          <motion.div 
            className={`${styles.sectionBlock} ${styles.scientific}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Научный вклад</div>
              <div className={styles.sectionIcon}>{isPrintTheme ? '' : '🔬'}</div>
            </div>
            
            <ul className={styles.contributionList}>
              <li className={styles.contributionItem}>
                <span className={styles.highlight}>Комплексное сравнение</span> трех различных архитектурных подходов к СУБД
              </li>
              <li className={styles.contributionItem}>
                Использование <span className={styles.highlight}>реального большого датасета</span> (~12 ГБ) вместо синтетических данных
              </li>
              <li className={styles.contributionItem}>
                <span className={styles.highlight}>Стандартизированная методология</span> тестирования с обеспечением воспроизводимости
              </li>
              <li className={styles.contributionItem}>
                Детальный анализ поведения при <span className={styles.highlight}>различных уровнях параллелизма</span>
              </li>
            </ul>

            <div className={styles.statsSection}>
              <div className={styles.statsHighlight}>
                <div className={styles.statsNumber}>189</div>
                <div className={styles.statsLabel}>Проведено тестов</div>
              </div>

              <div className={styles.impactGrid}>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>3</div>
                  <div className={styles.impactLabel}>СУБД</div>
                </div>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>6</div>
                  <div className={styles.impactLabel}>Workloads</div>
                </div>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>7</div>
                  <div className={styles.impactLabel}>Уровней потоков</div>
                </div>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>12+ ГБ</div>
                  <div className={styles.impactLabel}>Данных</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Практическая ценность */}
        <div className={styles.sectionColumn}>
          <motion.div 
            className={`${styles.sectionBlock} ${styles.practical}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Практическая ценность</div>
              <div className={styles.sectionIcon}>{isPrintTheme ? '' : '💡'}</div>
            </div>
            
            <ul className={styles.contributionList}>
              <li className={styles.contributionItem}>
                <span className={styles.highlight}>Обоснованные рекомендации</span> по выбору СУБД для конкретных сценариев
              </li>
              <li className={styles.contributionItem}>
                Выявление <span className={styles.highlight}>оптимальных конфигураций</span> для каждой системы
              </li>
              <li className={styles.contributionItem}>
                Понимание <span className={styles.highlight}>ограничений и особенностей</span> масштабирования
              </li>
              <li className={styles.contributionItem}>
                Практические <span className={styles.highlight}>метрики производительности</span> для принятия решений
              </li>
            </ul>

            <div className={styles.statsSection}>
              <div className={styles.statsHighlight}>
                <div className={styles.statsNumber}>30x</div>
                <div className={styles.statsLabel}>Максимальная разница производительности</div>
              </div>

              <div className={styles.impactGrid}>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>Cassandra</div>
                  <div className={styles.impactLabel}>CRUD лидер</div>
                </div>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>PostgreSQL</div>
                  <div className={styles.impactLabel}>Workload D</div>
                </div>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>MongoDB</div>
                  <div className={styles.impactLabel}>Сканирование</div>
                </div>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>100%</div>
                  <div className={styles.impactLabel}>Воспроизводимость</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className={styles.footerNote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
      >
        Исследование обеспечивает научно обоснованный подход к выбору СУБД для современных высоконагруженных систем
      </motion.div>
    </div>
  );
};

export { ConclusionSlide }; 