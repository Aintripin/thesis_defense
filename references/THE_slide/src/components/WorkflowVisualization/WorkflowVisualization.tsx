import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, FileText, Play, BarChart3, RefreshCw, Zap, Clock, Server } from 'lucide-react';
import DataPreparation from '../DataPreparation';
import TestingCycle from '../TestingCycle';
import WorkloadBranches from '../WorkloadBranches';
import MetricsCollection from '../MetricsCollection';
import StatsOverview from '../StatsOverview';
import styles from './WorkflowVisualization.module.scss';

const WorkflowVisualization: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const phases = [
    { id: 'data', label: 'Data Preparation', icon: FileText, color: '#3b82f6' },
    { id: 'cycle', label: 'Testing Cycle', icon: RefreshCw, color: '#1e40af' },
    { id: 'workloads', label: 'Workload Types', icon: Zap, color: '#2563eb' },
    { id: 'metrics', label: 'Metrics Collection', icon: BarChart3, color: '#1d4ed8' }
  ];

  return (
    <div className={styles.workflowVisualization}>
      {/* Phase Navigation */}
      <motion.div 
        className={styles.phaseNavigation}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          return (
            <motion.button
              key={phase.id}
              className={`${styles.phaseNavButton} ${activePhase === phase.id ? styles.active : ''}`}
              onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              style={{ '--accent-color': phase.color } as React.CSSProperties}
            >
              <Icon size={20} />
              <span>{phase.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Main Workflow */}
      <motion.div 
        className={styles.workflowMain}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <DataPreparation />
        <TestingCycle />
        <WorkloadBranches />
        <MetricsCollection />
      </motion.div>

      {/* Detailed Phase Views */}
      <AnimatePresence>
        {activePhase && (
          <motion.div
            className={styles.phaseDetailOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhase(null)}
          >
            <motion.div
              className={styles.phaseDetailContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={() => setActivePhase(null)}
              >
                ×
              </button>
              {activePhase === 'data' && <DataPreparation detailed />}
              {activePhase === 'cycle' && <TestingCycle detailed />}
              {activePhase === 'workloads' && <WorkloadBranches detailed />}
              {activePhase === 'metrics' && <MetricsCollection detailed />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Overview */}
      <StatsOverview />
    </div>
  );
};

export default WorkflowVisualization; 