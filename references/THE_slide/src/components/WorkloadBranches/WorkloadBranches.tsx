import React from 'react';
import { motion } from 'framer-motion';
import { Zap, GitBranch, Users } from 'lucide-react';
import styles from './WorkloadBranches.module.scss';

interface WorkloadBranchesProps {
  detailed?: boolean;
}

const WorkloadBranches: React.FC<WorkloadBranchesProps> = ({ detailed = false }) => {
  const workloads = [
    {
      letter: 'A',
      name: 'Update Heavy',
      operations: '50% READ\n50% UPDATE',
      color: '#e74c3c',
      bgColor: '#ffeaea'
    },
    {
      letter: 'B',
      name: 'Read Heavy',
      operations: '95% READ\n5% UPDATE',
      color: '#3498db',
      bgColor: '#e6f3ff'
    },
    {
      letter: 'C',
      name: 'Read Only',
      operations: '100% READ',
      color: '#27ae60',
      bgColor: '#e8f5e8'
    },
    {
      letter: 'D',
      name: 'Read Latest',
      operations: '95% READ\n5% INSERT',
      color: '#f39c12',
      bgColor: '#fff8e1'
    },
    {
      letter: 'E',
      name: 'Scan Heavy',
      operations: '95% SCAN\n5% INSERT',
      color: '#9b59b6',
      bgColor: '#f3e5f5'
    },
    {
      letter: 'F',
      name: 'Read-Modify-Write',
      operations: '50% READ\n50% RMW',
      color: '#ff6b35',
      bgColor: '#fff0e6'
    }
  ];

  const threadLevels = [4, 8, 16, 32, 64, 128, 256];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const branchVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className={`${styles.workloadBranches} ${detailed ? styles.detailed : ''}`}>
      {detailed && (
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          YCSB Workload Types
        </motion.h2>
      )}
      
      <div className={styles.workloadTree}>
        {/* Tree Root */}
        <motion.div 
          className={styles.treeRoot}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.rootNode}>
            <Zap size={24} />
            <span>YCSB Run Phase</span>
          </div>
        </motion.div>

        {/* Connection Lines */}
        <div className={styles.treeConnections}>
          <div className={styles.mainTrunk}></div>
          <div className={styles.branchLines}>
            {workloads.map((_, index) => (
              <div key={index} className={styles.branchLine}></div>
            ))}
          </div>
        </div>

        {/* Workload Branches */}
        <motion.div 
          className={styles.workloadGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {workloads.map((workload, index) => (
            <motion.div
              key={workload.letter}
              className={styles.workloadNode}
              variants={branchVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              style={{
                '--workload-color': workload.color,
                '--workload-bg': workload.bgColor
              } as React.CSSProperties}
            >
              <div className={styles.workloadHeader}>
                <div className={styles.workloadLetter}>{workload.letter}</div>
                <div className={styles.workloadName}>{workload.name}</div>
              </div>
              <div className={styles.workloadOperations}>
                {workload.operations.split('\n').map((op, i) => (
                  <div key={i} className={styles.operationLine}>{op}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Thread Levels */}
        <motion.div 
          className={styles.threadLevels}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className={styles.threadHeader}>
            <Users size={20} />
            <span>Parallelism Levels</span>
          </div>
          <div className={styles.threadValues}>
            {threadLevels.map((threads, index) => (
              <motion.div
                key={threads}
                className={styles.threadBadge}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {threads}
              </motion.div>
            ))}
          </div>
          <div className={styles.threadLabel}>threads per workload</div>
        </motion.div>
      </div>

      {detailed && (
        <motion.div 
          className={styles.workloadDetails}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className={styles.detailsGrid}>
            {workloads.map((workload) => (
              <div key={workload.letter} className={styles.workloadDetailCard}>
                <div className={styles.detailHeader} style={{ backgroundColor: workload.bgColor, borderColor: workload.color }}>
                  <div className={styles.detailLetter} style={{ backgroundColor: workload.color }}>
                    {workload.letter}
                  </div>
                  <h4>{workload.name}</h4>
                </div>
                <div className={styles.detailContent}>
                  <div className={styles.operationsBreakdown}>
                    {workload.operations.split('\n').map((op, i) => (
                      <div key={i} className={styles.operationItem}>{op}</div>
                    ))}
                  </div>
                  <div className={styles.workloadDescription}>
                    {getWorkloadDescription(workload.letter)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const getWorkloadDescription = (letter: string): string => {
  const descriptions: { [key: string]: string } = {
    'A': 'Balanced read/write workload simulating typical application behavior',
    'B': 'Read-mostly workload typical of photo tagging or social media applications',
    'C': 'Read-only workload for read-heavy applications like caching layers',
    'D': 'Read latest workload typical of user status updates and timelines',
    'E': 'Scan workload typical of analytics and reporting applications',
    'F': 'Read-modify-write workload typical of user record updates'
  };
  return descriptions[letter] || '';
};

export default WorkloadBranches; 