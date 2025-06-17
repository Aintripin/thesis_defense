import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './TestExecutionSlide.module.scss';
import {
  ProtocolSection,
  StatsSection,
  NumberCard,
  MetricsCard
} from './components';
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

const TestExecutionSlide = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.testExecutionSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <SlideHeading size="small">ПРОВЕДЕНИЕ ТЕСТОВ</SlideHeading>

      {/* The main content area, separate from the header */}
      <motion.div 
        className={styles.contentContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.mainGrid}>
          {/* Left container with flexbox column */}
          <motion.div 
            className={styles.leftContainer}
            variants={slideInLeft}
          >
            {/* Protocol Section (Rectangle #1) */}
            <motion.div variants={fadeInUp}>
              <ProtocolSection />
            </motion.div>
            
            {/* 63 Card (Rectangle #2) */}
            <motion.div variants={fadeInUp}>
              <NumberCard
                number={63}
                label="Тестов на СУБД"
                calculation="21 конфигурация × 3 повторения"
                className={styles.card63}
              />
            </motion.div>
          </motion.div>

          {/* Right container for L-shapes */}
          <motion.div 
            className={styles.rightContainer}
            variants={slideInRight}
          >
            {/* L-shaped Stats Section (Blue L-shape) */}
            <motion.div variants={fadeInUp}>
              <StatsSection />
            </motion.div>
            
            {/* Metrics Card (Orange rectangle) */}
            <motion.div variants={fadeInUp}>
              <MetricsCard />
            </motion.div>
            
            {/* 189 Card (Brown rectangle) */}
            <motion.div variants={fadeInUp}>
              <NumberCard
                number={189}
                label="Общее количество тестов"
                calculation="3 СУБД × 6 workloads × 7 threads × 3 повторения"
                className={styles.card189}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestExecutionSlide; 