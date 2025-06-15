import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Database, Play, BarChart3, RotateCcw, ArrowRight } from 'lucide-react';
import styles from './TestingCycle.module.scss';

interface TestingCycleProps {
  detailed?: boolean;
}

const TestingCycle: React.FC<TestingCycleProps> = ({ detailed = false }) => {
  const phases = [
    {
      name: 'Cold Start',
      icon: RefreshCw,
      detail: 'VM Restart\nCache Clear',
      color: '#ff6b35',
      bgColor: '#fff0e6'
    },
    {
      name: 'YCSB Load',
      icon: Database,
      detail: 'Populate\nusertable',
      color: '#4facfe',
      bgColor: '#e6f7ff'
    },
    {
      name: 'YCSB Run',
      icon: Play,
      detail: 'Execute\nWorkload',
      color: '#27ae60',
      bgColor: '#e8f5e8'
    },
    {
      name: 'Collect Metrics',
      icon: BarChart3,
      detail: 'Throughput\nLatency',
      color: '#e74c3c',
      bgColor: '#ffeaea'
    },
    {
      name: 'Restart',
      icon: RotateCcw,
      detail: 'Cleanup\nNext Test',
      color: '#6c757d',
      bgColor: '#f8f9fa'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className={`${styles.testingCycle} ${detailed ? styles.detailed : ''}`}>
      {detailed && (
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Testing Cycle Flow
        </motion.h2>
      )}
      
      <motion.div 
        className={styles.cycleContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.cycleHeader}>
          <RefreshCw size={24} />
          <span>Testing Cycle</span>
        </div>
        
        <div className={styles.cycleFlow}>
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <React.Fragment key={phase.name}>
                <motion.div
                  className={styles.phaseItem}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                  style={{
                    '--phase-color': phase.color,
                    '--phase-bg': phase.bgColor
                  } as React.CSSProperties}
                >
                  <div className={styles.phaseIcon}>
                    <Icon size={20} />
                  </div>
                  <div className={styles.phaseContent}>
                    <div className={styles.phaseName}>{phase.name}</div>
                    <div className={styles.phaseDetail}>
                      {phase.detail.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {index < phases.length - 1 && (
                  <motion.div 
                    className={styles.cycleArrow}
                    variants={itemVariants}
                    animate={{
                      x: [0, 3, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Cycle Loop Indicator */}
        <motion.div 
          className={styles.cycleLoop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className={styles.loopLine}></div>
          <div className={styles.loopText}>Repeat for each test configuration</div>
        </motion.div>
      </motion.div>

      {detailed && (
        <motion.div 
          className={styles.cycleDetails}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <h4>Cold Start Process</h4>
              <ul>
                <li>Virtual machine restart</li>
                <li>Clear OS page cache</li>
                <li>Clear database caches</li>
                <li>Ensure consistent starting state</li>
              </ul>
            </div>
            <div className={styles.detailItem}>
              <h4>Load Phase</h4>
              <ul>
                <li>Copy real data to YCSB tables</li>
                <li>Populate usertable with workload data</li>
                <li>Warm up database connections</li>
                <li>Prepare for workload execution</li>
              </ul>
            </div>
            <div className={styles.detailItem}>
              <h4>Run Phase</h4>
              <ul>
                <li>Execute specific YCSB workload</li>
                <li>Monitor system performance</li>
                <li>Collect real-time metrics</li>
                <li>Run until completion or timeout</li>
              </ul>
            </div>
            <div className={styles.detailItem}>
              <h4>Metrics Collection</h4>
              <ul>
                <li>YCSB throughput and latency</li>
                <li>System resource utilization</li>
                <li>Database-specific metrics</li>
                <li>Export results for analysis</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TestingCycle; 