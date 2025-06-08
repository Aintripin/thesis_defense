import React from 'react';
import styles from './YcsbConfigurationSlide.module.scss';

const YcsbConfigurationSlide: React.FC = () => {
  return (
    <div className={styles.ycsbConfigurationSlide}>
      <div className={styles.contentContainer}>
        <div className={styles.mainContentContainer}>
          
          <div className={styles.slideTitleContainer}>
            <h1 className={styles.slideTitle}>К О Н Ф И Г У Р А Ц И Я&nbsp;&nbsp;Y C S B</h1>
            <p className={styles.slideSubtitle}>Параметры тестирования производительности СУБД</p>
          </div>

          <div className={styles.slideContent}>
            
            {/* Левая колонка */}
            <div className={styles.configSection}>
              <div className={`${styles.configBlock} ${styles.primary}`}>
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
              </div>

              <div className={`${styles.configBlock} ${styles.accent}`}>
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
              </div>
            </div>

            {/* Средняя колонка */}
            <div className={styles.configSection}>
              <div className={`${styles.configBlock} ${styles.workloadsBlock}`}>
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
              </div>
            </div>

            {/* Правая колонка */}
            <div className={styles.configSection}>
              <div className={styles.configBlock}>
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
              </div>

              <div className={`${styles.configBlock} ${styles.accent}`}>
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
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default YcsbConfigurationSlide; 