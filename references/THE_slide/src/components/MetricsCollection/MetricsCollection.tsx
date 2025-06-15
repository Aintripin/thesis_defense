import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Cpu, Database, Activity } from 'lucide-react';
import styles from './MetricsCollection.module.scss';

interface MetricsCollectionProps {
  detailed?: boolean;
}

const MetricsCollection: React.FC<MetricsCollectionProps> = ({ detailed = false }) => {
  const metricCategories = [
    {
      name: 'YCSB Metrics',
      icon: BarChart3,
      color: '#e74c3c',
      bgColor: '#ffeaea',
      metrics: ['Throughput (ops/sec)', 'Average Latency', 'P95 Latency', 'P99 Latency']
    },
    {
      name: 'System Metrics',
      icon: Cpu,
      color: '#3498db',
      bgColor: '#e6f3ff',
      metrics: ['CPU Utilization', 'Memory Usage', 'Disk I/O', 'Network I/O']
    },
    {
      name: 'DB-Specific',
      icon: Database,
      color: '#27ae60',
      bgColor: '#e8f5e8',
      metrics: ['Connection Pool', 'Cache Hit Rate', 'Query Performance', 'Lock Contention']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className={`${styles.metricsCollection} ${detailed ? styles.detailed : ''}`}>
      {detailed && (
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Metrics Collection
        </motion.h2>
      )}
      
      <motion.div 
        className={styles.metricsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {metricCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              className={styles.metricCategory}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{
                '--metric-color': category.color,
                '--metric-bg': category.bgColor
              } as React.CSSProperties}
            >
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <Icon size={24} />
                </div>
                <h3>{category.name}</h3>
              </div>
              <div className={styles.metricsList}>
                {category.metrics.map((metric, index) => (
                  <motion.div
                    key={metric}
                    className={styles.metricItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className={styles.metricBullet}></div>
                    <span>{metric}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {detailed && (
        <motion.div 
          className={styles.metricsDetails}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className={styles.collectionProcess}>
            <h3>Metrics Collection Process</h3>
            <div className={styles.processSteps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4>Real-time Monitoring</h4>
                  <p>Continuous collection during workload execution using system tools and YCSB built-in metrics</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4>Data Aggregation</h4>
                  <p>Combine metrics from different sources: vmstat, iostat, YCSB output, and database logs</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4>Analysis & Export</h4>
                  <p>Process collected data, calculate percentiles, and export for comparative analysis</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.databaseSpecific}>
            <h3>Database-Specific Metrics</h3>
            <div className={styles.dbMetricsGrid}>
              <div className={styles.dbMetricCard}>
                <h4>PostgreSQL</h4>
                <ul>
                  <li>pg_stat_activity</li>
                  <li>pg_stat_database</li>
                  <li>Buffer cache hit ratio</li>
                  <li>Lock wait times</li>
                </ul>
              </div>
              <div className={styles.dbMetricCard}>
                <h4>MongoDB</h4>
                <ul>
                  <li>serverStatus metrics</li>
                  <li>WiredTiger statistics</li>
                  <li>Connection pool stats</li>
                  <li>Operation counters</li>
                </ul>
              </div>
              <div className={styles.dbMetricCard}>
                <h4>Cassandra</h4>
                <ul>
                  <li>GC logs analysis</li>
                  <li>Compaction metrics</li>
                  <li>Read/Write latencies</li>
                  <li>JVM heap usage</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MetricsCollection; 