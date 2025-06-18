import React from 'react';
import styles from '../TestExecutionSlide.module.scss';

const MetricsCard: React.FC = () => {
  return (
    <div className={styles.cardMetrics}>
      <div className={styles.metricsTitle}>Собираемые метрики:</div>
      <ul className={styles.metricsList}>
        <li className={styles.metricItem}>Пропускная способность (ops/sec)</li>
        <li className={styles.metricItem}>Задержки (среднее, мин, макс, P95, P99)</li>
        <li className={styles.metricItem}>Системные метрики (CPU, память)</li>
        <li className={styles.metricItem}>Дисковый I/O и сеть</li>
      </ul>
      <div className={styles.processFlow}>
        <div className={styles.flowStep}>
          <div className={styles.stepNumber}>1</div>
          <span>Workload A-F</span>
        </div>
        <div className={styles.flowStep}>
          <div className={styles.stepNumber}>2</div>
          <span>7 уровней threads</span>
        </div>
        <div className={styles.flowStep}>
          <div className={styles.stepNumber}>3</div>
          <span>3 повторения</span>
        </div>
        <div className={styles.flowStep}>
          <div className={styles.stepNumber}>4</div>
          <span>Анализ результатов</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard; 