import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Database, Play, BarChart3, RefreshCw, RotateCcw, 
  Zap, Users, Clock 
} from 'lucide-react';
import styles from './IntegratedWorkflow.module.scss';

const IntegratedWorkflowSVG: React.FC = () => {
  const databases = [
    { name: 'PostgreSQL', icon: '🐘', process: 'JSONB→Tables', color: '#336791' },
    { name: 'MongoDB', icon: '🍃', process: 'Direct Import', color: '#4db33d' },
    { name: 'Cassandra', icon: '🗃️', process: 'NDJSON→DSBulk', color: '#ff6b35' }
  ];

  const workloads = [
    { letter: 'A', name: 'Update Heavy', ops: '50% READ / 50% UPDATE', color: '#3b82f6' },
    { letter: 'B', name: 'Read Heavy', ops: '95% READ / 5% UPDATE', color: '#1e40af' },
    { letter: 'C', name: 'Read Only', ops: '100% READ', color: '#2563eb' },
    { letter: 'D', name: 'Read Latest', ops: '95% READ / 5% INSERT', color: '#1d4ed8' },
    { letter: 'E', name: 'Scan Heavy', ops: '95% SCAN / 5% INSERT', color: '#60a5fa' },
    { letter: 'F', name: 'Read-Modify-Write', ops: '50% READ / 50% RMW', color: '#93c5fd' }
  ];

  const metrics = [
    { category: 'YCSB', items: ['Throughput', 'Avg Latency', 'P95 Latency', 'P99 Latency'], color: '#3b82f6' },
    { category: 'System', items: ['CPU Usage', 'Memory', 'Disk I/O', 'Network'], color: '#1e40af' },
    { category: 'DB-Specific', items: ['Connections', 'Cache Hit', 'Queries', 'Locks'], color: '#2563eb' }
  ];

  return (
    <div className={styles.integratedWorkflow}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* SVG for connections and background */}
        <svg className={styles.connectionsSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            {/* Gradients */}
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            
            {/* Arrow markers */}
            <marker id="arrowhead" markerWidth="2" markerHeight="1.5" 
              refX="1.8" refY="0.75" orient="auto" markerUnits="strokeWidth">
              <polygon points="0 0, 2 0.75, 0 1.5" fill="#3b82f6" />
            </marker>
            
            {/* Drop shadow filter */}
            <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0.2" stdDeviation="0.3" floodColor="#000" floodOpacity="0.1"/>
            </filter>
          </defs>
          
          {/* Connection from Data Preparation to Workflow Chain */}
          <motion.path
            d="M 24 35 Q 32 36 36 36"
            stroke="url(#primaryGradient)"
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            filter="url(#dropshadow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          {/* Connection from Workflow Chain to YCSB Run (Workloads) */}
          <motion.path
            d="M 50 42 Q 50 52 50 62"
            stroke="url(#primaryGradient)"
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            filter="url(#dropshadow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          
          {/* Connection from Workflow Chain to Metrics Collection */}
          <motion.path
            d="M 64 36 Q 68 36 76 35"
            stroke="url(#primaryGradient)"
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            filter="url(#dropshadow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.1 }}
          />
        </svg>

        {/* Data Preparation Section */}
        <motion.div 
          className={styles.dataSection}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.iconWrapper}>
              <FileText size={24} />
            </div>
            <h3>Data Preparation</h3>
          </div>
          
          <div className={styles.datasetInfo}>
            <div className={styles.datasetIcon}>📄</div>
            <div className={styles.datasetDetails}>
              <div className={styles.datasetTitle}>JSON Dataset</div>
              <div className={styles.datasetStats}>12GB • 4.8M records</div>
            </div>
          </div>
          
          <div className={styles.databaseList}>
            {databases.map((db, index) => (
              <motion.div
                key={db.name}
                className={styles.databaseItem}
                style={{ '--db-color': db.color } as React.CSSProperties}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, x: 5 }}
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

        {/* Main Workflow Chain */}
        <motion.div 
          className={styles.workflowChain}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            { icon: RefreshCw, label: 'Cold Start', color: '#64748b' },
            { icon: Database, label: 'YCSB Load', color: '#3b82f6' },
            { icon: Play, label: 'YCSB Run', color: '#1e40af' },
            { icon: BarChart3, label: 'Collect Metrics', color: '#2563eb' },
            { icon: RotateCcw, label: 'Restart', color: '#64748b' }
          ].map((step, index) => (
            <React.Fragment key={step.label}>
              <motion.div
                className={`${styles.workflowStep} ${index === 1 || index === 2 ? styles.highlighted : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ '--step-color': step.color } as React.CSSProperties}
              >
                <div className={styles.stepIcon}>
                  <step.icon size={20} />
                </div>
                <div className={styles.stepLabel}>{step.label}</div>
              </motion.div>
              
              {index < 4 && (
                <motion.div
                  className={styles.workflowArrow}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                >
                  →
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* YCSB Workloads Section */}
        <motion.div 
          className={styles.workloadsSection}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.iconWrapper}>
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
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
                }}
              >
                <div className={styles.workloadLetter}>{workload.letter}</div>
                <div className={styles.workloadContent}>
                  <div className={styles.workloadName}>{workload.name}</div>
                  <div className={styles.workloadOps}>{workload.ops}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className={styles.threadInfo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <Users size={18} />
            <span>Thread Levels:</span>
            <div className={styles.threadBadges}>
              {[4, 8, 16, 32, 64, 128, 256].map((threads, index) => (
                <motion.span
                  key={threads}
                  className={styles.threadBadge}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 + index * 0.05, duration: 0.3 }}
                >
                  {threads}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Metrics Collection Section */}
        <motion.div 
          className={styles.metricsSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.iconWrapper}>
              <BarChart3 size={24} />
            </div>
            <h3>Metrics Collection</h3>
          </div>
          
          <div className={styles.metricsGrid}>
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.category}
                className={styles.metricCategory}
                style={{ '--metric-color': metric.color } as React.CSSProperties}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03, x: 5 }}
              >
                <div className={styles.metricHeader}>{metric.category}</div>
                <div className={styles.metricItems}>
                  {metric.items.map((item, itemIndex) => (
                    <motion.div
                      key={item}
                      className={styles.metricItem}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 + index * 0.1 + itemIndex * 0.05, duration: 0.4 }}
                    >
                      • {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Panel */}
        <motion.div 
          className={styles.statsPanel}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className={styles.statsHeader}>
            <Clock size={20} />
            <span>Testing Statistics</span>
          </div>
          
          <div className={styles.statsGrid}>
            {[
              { value: '3', label: 'Databases', icon: Database },
              { value: '6', label: 'Workloads', icon: Zap },
              { value: '7', label: 'Thread Levels', icon: Users },
              { value: '126', label: 'Total Tests', icon: BarChart3 },
              { value: '189', label: 'Hours', icon: Clock }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -3 }}
              >
                <stat.icon size={16} className={styles.statIcon} />
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className={styles.calculation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            3 × 6 × 7 = 126 tests
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntegratedWorkflowSVG; 