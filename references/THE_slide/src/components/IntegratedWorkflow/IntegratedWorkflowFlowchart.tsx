import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Database, Play, BarChart3, RefreshCw, RotateCcw, 
  Zap, Users, Clock, ArrowRight, ArrowDown 
} from 'lucide-react';
import styles from './IntegratedWorkflowFlowchart.module.scss';

const IntegratedWorkflowFlowchart: React.FC = () => {
  const databases = [
    { name: 'PostgreSQL', process: 'JSON→Tables', color: '#336791', icon: '🐘' },
    { name: 'MongoDB', process: 'Schema Import', color: '#4db33d', icon: '🍃' },
    { name: 'Cassandra', process: 'NoSQL→noSQLBx', color: '#ff6b35', icon: '🗃️' }
  ];

  const workloads = [
    { letter: 'A', name: 'Update Heavy', ops: '50% READ / 50% UPDATE', color: '#3b82f6' },
    { letter: 'B', name: 'Read Heavy', ops: '95% READ / 5% UPDATE', color: '#1e40af' },
    { letter: 'C', name: 'Read Only', ops: '100% READ', color: '#2563eb' },
    { letter: 'D', name: 'Read Latest', ops: '95% READ / 5% INSERT', color: '#1d4ed8' },
    { letter: 'E', name: 'Scan Heavy', ops: '95% SCAN / 5% INSERT', color: '#60a5fa' },
    { letter: 'F', name: 'Read-Modify-Write', ops: '50% READ / 50% RMW', color: '#93c5fd' }
  ];

  const workflowSteps = [
    { icon: RefreshCw, label: 'Cold Start', color: '#64748b' },
    { icon: ArrowRight, label: '>', color: '#3b82f6' },
    { icon: Database, label: 'YCSB Load', color: '#3b82f6' },
    { icon: ArrowRight, label: '>', color: '#3b82f6' },
    { icon: Play, label: 'YCSB Run', color: '#1e40af' },
    { icon: ArrowRight, label: '>', color: '#3b82f6' },
    { icon: BarChart3, label: 'Collect Metrics', color: '#2563eb' }
  ];

  return (
    <div className={styles.flowchartContainer}>
      <motion.div
        className={styles.mainContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          YCSB Database Testing Architecture
        </motion.h1>

        {/* Main Layout Grid */}
        <div className={styles.layoutGrid}>
          {/* Left Column - Data Preparation */}
          <motion.div 
            className={styles.dataPreparation}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.iconBox}>
                <Database size={24} />
              </div>
              <h3>Data Preparation</h3>
            </div>

            <div className={styles.datasetCard}>
              <div className={styles.datasetIcon}>📄</div>
              <div className={styles.datasetInfo}>
                <div className={styles.datasetTitle}>JSON Dataset</div>
                <div className={styles.datasetStats}>13days, 4.4M records</div>
              </div>
            </div>

            <div className={styles.databaseList}>
              {databases.map((db, index) => (
                <motion.div
                  key={db.name}
                  className={styles.databaseCard}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <div className={styles.dbIcon}>{db.icon}</div>
                  <div className={styles.dbInfo}>
                    <div className={styles.dbName}>{db.name}</div>
                    <div className={styles.dbProcess}>{db.process}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Column - Flow */}
          <div className={styles.centerFlow}>
            {/* Flow Arrow */}
            <motion.div 
              className={styles.flowArrow}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className={styles.arrowLine}></div>
              <div className={styles.arrowText}>Flow of Procedures</div>
            </motion.div>

            {/* Main Workflow */}
            <motion.div 
              className={styles.workflowChain}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {workflowSteps.map((step, index) => (
                <React.Fragment key={index}>
                  {step.label === '>' ? (
                    <div className={styles.arrowStep}>
                      <ArrowRight size={20} color={step.color} />
                    </div>
                  ) : (
                    <motion.div
                      className={styles.workflowStep}
                      style={{ '--step-color': step.color } as React.CSSProperties}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className={styles.stepIcon}>
                        <step.icon size={20} />
                      </div>
                      <div className={styles.stepLabel}>{step.label}</div>
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Down Arrow to YCSB Run */}
            <motion.div 
              className={styles.downArrow}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <ArrowDown size={32} color="#3b82f6" />
            </motion.div>

            {/* YCSB Run Section */}
            <motion.div 
              className={styles.ycsbRunSection}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <div className={styles.ycsbHeader}>
                <div className={styles.ycsbIcon}>
                  <Zap size={24} />
                </div>
                <h3>YCSB Run</h3>
              </div>

              <div className={styles.workloadGrid}>
                {workloads.map((workload, index) => (
                  <motion.div
                    key={workload.letter}
                    className={styles.workloadCard}
                    style={{ '--workload-color': workload.color } as React.CSSProperties}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                  >
                    <div className={styles.workloadLetter}>{workload.letter}</div>
                    <div className={styles.workloadDetails}>
                      <div className={styles.workloadName}>{workload.name}</div>
                      <div className={styles.workloadOps}>{workload.ops}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Workload Matrix */}
              <motion.div 
                className={styles.workloadMatrix}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                <div className={styles.matrixRow}>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'E', 'F'].map((letter, index) => (
                    <div key={index} className={styles.matrixCell}>{letter}</div>
                  ))}
                </div>
                <div className={styles.matrixRow}>
                  {['A', 'B', 'C', 'C', 'E', 'F', 'D', 'F'].map((letter, index) => (
                    <div key={index} className={styles.matrixCell}>{letter}</div>
                  ))}
                </div>
                <div className={styles.matrixRow}>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'R-M/W'].map((item, index) => (
                    <div key={index} className={styles.matrixCell}>{item}</div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Metrics */}
          <motion.div 
            className={styles.metricsSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.iconBox}>
                <BarChart3 size={24} />
              </div>
              <h3>Metrics Collections</h3>
            </div>

            <div className={styles.metricsCategories}>
              <motion.div 
                className={styles.metricCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className={styles.categoryTitle}>YCSB</div>
                <div className={styles.categoryItems}>
                  <div>• Throughput</div>
                  <div>• AVG Latency</div>
                  <div>• 85% Latency</div>
                </div>
              </motion.div>

              <motion.div 
                className={styles.metricCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className={styles.categoryTitle}>System</div>
                <div className={styles.categoryItems}>
                  <div>• CPU Usage</div>
                  <div>• Network</div>
                  <div>• Disk IO</div>
                </div>
              </motion.div>

              <motion.div 
                className={styles.metricCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <div className={styles.categoryTitle}>DB-Specific</div>
                <div className={styles.categoryItems}>
                  <div>• Connections</div>
                  <div>• Queries</div>
                  <div>• Latency</div>
                </div>
              </motion.div>
            </div>

            {/* Flow Arrow to Metrics */}
            <motion.div 
              className={styles.metricsArrow}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <div className={styles.arrowLine}></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntegratedWorkflowFlowchart; 