import React from 'react';
import styles from './TestExecutionSlide.module.scss';
import {
  ProtocolSection,
  StatsSection,
  NumberCard,
  MetricsCard
} from './components';

const TestExecutionSlide = () => {
  return (
    <div className={styles.testExecutionSlide}>
      {/* The correct header, at the top of the page */}
      <div className={styles.slideHeader}>
        <h1 className={styles.slideTitle}>П Р О В Е Д Е Н И Е&nbsp;&nbsp;Т Е С Т О В</h1>
        <p className={styles.slideSubtitle}>Методология и контроль качества</p>
      </div>

      {/* The main content area, separate from the header */}
      <div className={styles.contentContainer}>
        <div className={styles.mainGrid}>
          {/* Left container with flexbox column */}
          <div className={styles.leftContainer}>
            {/* Protocol Section (Rectangle #1) */}
            <ProtocolSection />
            
            {/* 63 Card (Rectangle #2) */}
            <NumberCard
              number={63}
              label="Тестов на СУБД"
              calculation="21 конфигурация × 3 повторения"
              className={styles.card63}
            />
          </div>

          {/* Right container for L-shapes */}
          <div className={styles.rightContainer}>
            {/* L-shaped Stats Section (Blue L-shape) */}
            <StatsSection />
            
            {/* Metrics Card (Orange rectangle) */}
            <MetricsCard />
            
            {/* 189 Card (Brown rectangle) */}
            <NumberCard
              number={189}
              label="Общее количество тестов"
              calculation="3 СУБД × 6 workloads × 7 threads × 3 повторения"
              className={styles.card189}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionSlide; 