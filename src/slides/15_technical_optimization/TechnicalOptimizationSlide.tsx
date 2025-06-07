import React from 'react';
import { motion } from 'framer-motion';
import './TechnicalOptimizationSlide.scss';

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
    <div className="technical-optimization-slide">
      {/* Title Container - wrapped for sticky header */}
      <motion.div
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">ОПТИМИЗАЦИЯ КОНФИГУРАЦИЙ СУБД</h1>
      </motion.div>
      
      {/* Content Container - wrapper for the main white card */}
      <div className="content-container">
        {/* Main Content Container - now acts as the single white card */}
        <div className="main-content-container">
          {/* Left Side - Database Configurations */}
          <div className="databases-wrapper">
            
            {/* PostgreSQL Configuration */}
            <motion.div 
              className="db-config-section postgresql-section"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <motion.div 
                className="db-header"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
              >
                <div className="db-icon postgresql-icon">
                  <img src={PostgreSQLIcon} alt="PostgreSQL" className="db-icon-svg" />
                </div>
                <div className="db-info">
                  <h3>PostgreSQL</h3>
                  <p>Реляционная СУБД</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="code-terminal"
                variants={slideInScale}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.9 }}
              >
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                  </div>
                  <div className="terminal-filename">postgresql.conf</div>
                </div>
                <div className="terminal-content">
                  <span className="comment"># Увеличение подключений для высокого параллелизма</span><br/>
                  <span className="config-key">max_connections</span> = <span className="config-number">500</span> <span className="comment"># вместо 100</span><br/><br/>
                  <span className="comment"># аутентификация для тестирования</span><br/>
                  <span className="config-key">local all all trust</span><br/>
                  <span className="config-key">host all all</span> <span className="config-value">127.0.0.1/32</span> <span className="config-key">trust</span>
                </div>
              </motion.div>
            </motion.div>

            {/* MongoDB Configuration */}
            <motion.div 
              className="db-config-section mongodb-section"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.0 }}
            >
              <motion.div 
                className="db-header"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.0 }}
              >
                <div className="db-icon mongodb-icon">
                  <img src={MongoDBIcon} alt="MongoDB" className="db-icon-svg" />
                </div>
                <div className="db-info">
                  <h3>MongoDB</h3>
                  <p>Документоориентированная СУБД</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="code-terminal"
                variants={slideInScale}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.1 }}
              >
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                  </div>
                  <div className="terminal-filename">mongod.conf</div>
                </div>
                <div className="terminal-content">
                  <span className="config-key">cacheSizeGB:</span> <span className="config-number">16</span> <span className="comment"># увеличение кэша</span><br/>
                  <span className="config-key">maxIncomingConnections:</span> <span className="config-number">1000</span><br/><br/>
                  <span className="config-key">wiredTigerConcurrentReadTransactions:</span> <span className="config-number">1000</span><br/>
                  <span className="config-key">wiredTigerConcurrentWriteTransactions:</span> <span className="config-number">1000</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Cassandra Configuration */}
            <motion.div 
              className="db-config-section cassandra-section"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className="db-header"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2 }}
              >
                <div className="db-icon cassandra-icon">
                  <img src={CassandraIcon} alt="Cassandra" className="db-icon-svg" />
                </div>
                <div className="db-info">
                  <h3>Cassandra</h3>
                  <p>Колоночная СУБД</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="code-terminal"
                variants={slideInScale}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.3 }}
              >
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                  </div>
                  <div className="terminal-filename">cassandra.yaml</div>
                </div>
                <div className="terminal-content">
                  <span className="comment"># Увеличение подключений для высокого параллелизма</span><br/>
                  <span className="config-key">concurrent_reads:</span> <span className="config-number">256</span> <span className="comment"># вместо 32</span><br/>
                  <span className="config-key">concurrent_writes:</span> <span className="config-number">256</span> <span className="comment"># вместо 32</span><br/>
                  <span className="config-key">concurrent_materialized_view_writes:</span> <span className="config-number">256</span> <span className="comment"># вместо 32</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Results */}
          <div className="results-wrapper">
            <motion.div 
              className="optimization-overview"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <div className="overview-content">
                <div className="overview-text">
                  <h2 className="overview-title">Результаты оптимизации</h2>
                  <p className="overview-subtitle">
                    Комплексная настройка конфигураций всех трех СУБД для обеспечения 
                    максимальной производительности при высоких нагрузках
                  </p>
                </div>
                
                <motion.div 
                  className="metrics-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="metric-card" variants={fadeInUp} transition={{ delay: 0.3 }}>
                    <div className="metric-icon">
                      <Gauge size={32} />
                    </div>
                    <div className="metric-title">Производительность</div>
                    <div className="metric-value">Минимизация узких мест при высоком параллелизме</div>
                  </motion.div>
                  
                  <motion.div className="metric-card" variants={fadeInUp} transition={{ delay: 0.5 }}>
                    <div className="metric-icon">
                      <Scale size={32} />
                    </div>
                    <div className="metric-title">Стабильность</div>
                    <div className="metric-value">Стабильная производительность на всех уровнях нагрузки</div>
                  </motion.div>
                  
                  <motion.div className="metric-card" variants={fadeInUp} transition={{ delay: 0.7 }}>
                    <div className="metric-icon">
                      <Target size={32} />
                    </div>
                    <div className="metric-title">Эффективность</div>
                    <div className="metric-value">Оптимальное использование аппаратных ресурсов</div>
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