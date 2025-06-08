import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechnicalOptimizationSlide.module.scss';

// Import SVG icons for databases
import PostgreSQLIcon from '@assets/postgresql.svg';
import MongoDBIcon from '@assets/mongodb.svg';
import CassandraIcon from '@assets/apachecassandra.svg';

// Import Lucide icons for metrics
import { Gauge, Scale, Target } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const slideInScale = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
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

export const TechnicalOptimizationSlide = () => {
  return (
    <div className={styles.technicalOptimizationSlide}>
      {/* Title Container - wrapped for sticky header */}
      <motion.div
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>ОПТИМИЗАЦИЯ КОНФИГУРАЦИЙ СУБД</h1>
      </motion.div>
      
      {/* Content Container - wrapper for the main white card */}
      <div className={styles.contentContainer}>
        {/* Main Content Container - now acts as the single white card */}
        <div className={styles.mainContentContainer}>
          {/* Left Side - Database Configurations */}
          <div className={styles.databasesWrapper}>
            
            {/* PostgreSQL Configuration */}
            <motion.div 
              className={`${styles.dbConfigSection} ${styles.postgresqlSection}`}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <motion.div 
                className={styles.dbHeader}
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
              >
                <div className={`${styles.dbIcon} ${styles.postgresqlIcon}`}>
                  <img src={PostgreSQLIcon} alt="PostgreSQL" className={styles.dbIconSvg} />
                </div>
                <div className={styles.dbInfo}>
                  <h3>PostgreSQL</h3>
                  <p>Реляционная СУБД</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.codeTerminal}
                variants={slideInScale}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.9 }}
              >
                <div className={styles.terminalHeader}>
                  <div className={styles.terminalDots}>
                    <div className={`${styles.terminalDot} ${styles.red}`}></div>
                    <div className={`${styles.terminalDot} ${styles.yellow}`}></div>
                    <div className={`${styles.terminalDot} ${styles.green}`}></div>
                  </div>
                  <div className={styles.terminalFilename}>postgresql.conf</div>
                </div>
                <div className={styles.terminalContent}>
                  <span className={styles.comment}># Увеличение подключений для высокого параллелизма</span><br/>
                  <span className={styles.configKey}>max_connections</span> = <span className={styles.configNumber}>500</span> <span className={styles.comment}># вместо 100</span><br/><br/>
                  <span className={styles.comment}># аутентификация для тестирования</span><br/>
                  <span className={styles.configKey}>local all all trust</span><br/>
                  <span className={styles.configKey}>host all all</span> <span className={styles.configValue}>127.0.0.1/32</span> <span className={styles.configKey}>trust</span>
                </div>
              </motion.div>
            </motion.div>

            {/* MongoDB Configuration */}
            <motion.div 
              className={`${styles.dbConfigSection} ${styles.mongodbSection}`}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.0 }}
            >
              <motion.div 
                className={styles.dbHeader}
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.0 }}
              >
                <div className={`${styles.dbIcon} ${styles.mongodbIcon}`}>
                  <img src={MongoDBIcon} alt="MongoDB" className={styles.dbIconSvg} />
                </div>
                <div className={styles.dbInfo}>
                  <h3>MongoDB</h3>
                  <p>Документоориентированная СУБД</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.codeTerminal}
                variants={slideInScale}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.1 }}
              >
                <div className={styles.terminalHeader}>
                  <div className={styles.terminalDots}>
                    <div className={`${styles.terminalDot} ${styles.red}`}></div>
                    <div className={`${styles.terminalDot} ${styles.yellow}`}></div>
                    <div className={`${styles.terminalDot} ${styles.green}`}></div>
                  </div>
                  <div className={styles.terminalFilename}>mongod.conf</div>
                </div>
                <div className={styles.terminalContent}>
                  <span className={styles.configKey}>cacheSizeGB:</span> <span className={styles.configNumber}>16</span> <span className={styles.comment}># увеличение кэша</span><br/>
                  <span className={styles.configKey}>maxIncomingConnections:</span> <span className={styles.configNumber}>1000</span><br/><br/>
                  <span className={styles.configKey}>wiredTigerConcurrentReadTransactions:</span> <span className={styles.configNumber}>1000</span><br/>
                  <span className={styles.configKey}>wiredTigerConcurrentWriteTransactions:</span> <span className={styles.configNumber}>1000</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Cassandra Configuration */}
            <motion.div 
              className={`${styles.dbConfigSection} ${styles.cassandraSection}`}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className={styles.dbHeader}
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2 }}
              >
                <div className={`${styles.dbIcon} ${styles.cassandraIcon}`}>
                  <img src={CassandraIcon} alt="Cassandra" className={styles.dbIconSvg} />
                </div>
                <div className={styles.dbInfo}>
                  <h3>Cassandra</h3>
                  <p>Колоночная СУБД</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.codeTerminal}
                variants={slideInScale}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.3 }}
              >
                <div className={styles.terminalHeader}>
                  <div className={styles.terminalDots}>
                    <div className={`${styles.terminalDot} ${styles.red}`}></div>
                    <div className={`${styles.terminalDot} ${styles.yellow}`}></div>
                    <div className={`${styles.terminalDot} ${styles.green}`}></div>
                  </div>
                  <div className={styles.terminalFilename}>cassandra.yaml</div>
                </div>
                <div className={styles.terminalContent}>
                  <span className={styles.comment}># Увеличение подключений для высокого параллелизма</span><br/>
                  <span className={styles.configKey}>concurrent_reads:</span> <span className={styles.configNumber}>256</span> <span className={styles.comment}># вместо 32</span><br/>
                  <span className={styles.configKey}>concurrent_writes:</span> <span className={styles.configNumber}>256</span> <span className={styles.comment}># вместо 32</span><br/>
                  <span className={styles.configKey}>concurrent_materialized_view_writes:</span> <span className={styles.configNumber}>256</span> <span className={styles.comment}># вместо 32</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Results */}
          <div className={styles.resultsWrapper}>
            <motion.div 
              className={styles.optimizationOverview}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <div className={styles.overviewContent}>
                <div className={styles.overviewText}>
                  <h2 className={styles.overviewTitle}>Результаты оптимизации</h2>
                  <p className={styles.overviewSubtitle}>
                    Комплексная настройка конфигураций всех трех СУБД для обеспечения 
                    максимальной производительности при высоких нагрузках
                  </p>
                </div>
                
                <motion.div 
                  className={styles.metricsGrid}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className={styles.metricCard} variants={fadeInUp} transition={{ delay: 0.3 }}>
                    <div className={styles.metricIcon}>
                      <Gauge size={32} />
                    </div>
                    <div className={styles.metricTitle}>Производительность</div>
                    <div className={styles.metricValue}>Минимизация узких мест при высоком параллелизме</div>
                  </motion.div>
                  
                  <motion.div className={styles.metricCard} variants={fadeInUp} transition={{ delay: 0.5 }}>
                    <div className={styles.metricIcon}>
                      <Scale size={32} />
                    </div>
                    <div className={styles.metricTitle}>Стабильность</div>
                    <div className={styles.metricValue}>Стабильная производительность на всех уровнях нагрузки</div>
                  </motion.div>
                  
                  <motion.div className={styles.metricCard} variants={fadeInUp} transition={{ delay: 0.7 }}>
                    <div className={styles.metricIcon}>
                      <Target size={32} />
                    </div>
                    <div className={styles.metricTitle}>Эффективность</div>
                    <div className={styles.metricValue}>Оптимальное использование аппаратных ресурсов</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}; 