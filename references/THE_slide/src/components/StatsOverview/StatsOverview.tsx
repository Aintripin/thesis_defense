import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Users, Clock, BarChart } from 'lucide-react';
import styles from './StatsOverview.module.scss';

const StatsOverview: React.FC = () => {
  const stats = [
    { number: '3', label: 'Databases', icon: Database, color: '#3b82f6' },
    { number: '6', label: 'Workloads', icon: Zap, color: '#1e40af' },
    { number: '7', label: 'Thread Levels', icon: Users, color: '#2563eb' },
    { number: '126', label: 'Total Tests', icon: BarChart, color: '#1d4ed8' },
    { number: '189', label: 'Hours Testing', icon: Clock, color: '#60a5fa' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className={styles.statsOverview}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className={styles.statsTitle}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Testing Overview
      </motion.h3>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{ '--stat-color': stat.color } as React.CSSProperties}
            >
              <div className={styles.statIcon}>
                <Icon size={24} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className={styles.calculationNote}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className={styles.calculation}>
          <span>3 databases × 6 workloads × 7 thread levels = 126 total tests</span>
        </div>
        <div className={styles.testDuration}>
          <span>~1.5 hours per test configuration</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatsOverview; 