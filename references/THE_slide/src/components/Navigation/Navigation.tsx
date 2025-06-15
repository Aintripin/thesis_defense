import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Palette } from 'lucide-react';
import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/flowchart',
      label: 'Flowchart',
      icon: BarChart3,
      description: 'Clean presentation style'
    },
    {
      path: '/canvas',
      label: 'Canvas',
      icon: Palette,
      description: 'Interactive draggable version'
    }
  ];

  return (
    <motion.nav
      className={styles.navigation}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.navContainer}>
        <motion.div 
          className={styles.logo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={styles.logoIcon}>🔬</div>
          <span>YCSB Visualization</span>
        </motion.div>

        <div className={styles.navLinks}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  <motion.div
                    className={styles.navLinkContent}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.navIcon}>
                      <Icon size={20} />
                    </div>
                    <div className={styles.navText}>
                      <div className={styles.navLabel}>{item.label}</div>
                      <div className={styles.navDescription}>{item.description}</div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 