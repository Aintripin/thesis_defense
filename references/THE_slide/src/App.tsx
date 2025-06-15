import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './App.module.scss';
import IntegratedWorkflow from './components/IntegratedWorkflow/IntegratedWorkflow';
import IntegratedWorkflowFlowchart from './components/IntegratedWorkflow/IntegratedWorkflowFlowchart';
import Particles from './components/Particles';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className={styles.app}>
      <Navigation />
      
      <Routes>
        {/* Default route redirects to flowchart */}
        <Route path="/" element={<Navigate to="/flowchart" replace />} />
        
        {/* Flowchart version */}
        <Route path="/flowchart" element={<IntegratedWorkflowFlowchart />} />
        
        {/* Canvas version */}
        <Route 
          path="/canvas" 
          element={
            <>
              <Particles />
              <motion.div 
                className={styles.appContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className={styles.appTitle}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  YCSB Database Testing Architecture
                </motion.h1>
                <IntegratedWorkflow />
              </motion.div>
            </>
          } 
        />
      </Routes>
    </div>
  );
}

export default App; 