import { motion } from 'framer-motion';
import { Settings, Monitor, Cloud, Layers } from 'lucide-react';
import './TestEnvironmentSlide.scss';

// Import SVG icons using path aliases
import CpuIcon from '@assets/cpu.svg';
import MemoryIcon from '@assets/memory-stick.svg';
import HardDriveIcon from '@assets/hard-drive.svg';
import LinuxIcon from '@assets/linux-svgrepo-com.svg';
import MongoDBIcon from '@assets/mongodb.svg';
import PostgreSQLIcon from '@assets/postgresql.svg';
import CassandraIcon from '@assets/apachecassandra.svg';
import PythonIcon from '@assets/python.svg';
import JavaIcon from '@assets/openjdk.svg';
import YCSBIcon from '@assets/yahoo-svgrepo-com.svg';
import ToolsIcon from '@assets/screwdriver-wrench-svgrepo-com.svg';
import VMwareIcon from '@assets/vmware.svg';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const TestEnvironmentSlide = () => {
  return (
    <div className="test-environment-slide">
      {/* Title Container */}
      <motion.div
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">ТЕСТОВОЕ ОКРУЖЕНИЕ</h1>
      </motion.div>

      {/* Content Container - White container with two direct children */}
      <div className="content-container">
        
        {/* Left Content Area */}
        <div className="main-content-area">
          <motion.div 
            className="main-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hardware Configuration */}
            <motion.div className="config-section" variants={sectionVariants}>
              <h2 className="section-title">
                <Monitor className="section-icon lucide-icon" />
                Аппаратная и программная конфигурация
              </h2>
              <div className="spec-grid">
                <motion.div className="spec-item" variants={itemVariants}>
                  <div className="spec-icon">
                    <img src={CpuIcon} alt="CPU" />
                  </div>
                  <div className="spec-text">Intel Core i9-12900H (16 виртуальных ядер, 2.9 ГГц)</div>
                </motion.div>
                <motion.div className="spec-item" variants={itemVariants}>
                  <div className="spec-icon">
                    <img src={MemoryIcon} alt="Memory" />
                  </div>
                  <div className="spec-text">24 ГБ DDR5 RAM, 4800MHz</div>
                </motion.div>
                <motion.div className="spec-item" variants={itemVariants}>
                  <div className="spec-icon">
                    <img src={HardDriveIcon} alt="Storage" />
                  </div>
                  <div className="spec-text">NVMe SSD Western Digital S850NX (1512 ГБ)</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Virtualization */}
            <motion.div className="config-section" variants={sectionVariants}>
              <h2 className="section-title">
                <Cloud className="section-icon lucide-icon" />
                Виртуализация
              </h2>
              <div className="spec-grid">
                <motion.div className="spec-item" variants={itemVariants}>
                  <div className="spec-icon vmware">
                    <img src={VMwareIcon} alt="VMware" />
                  </div>
                  <div className="spec-text">VMware Workstation Pro 17</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Software Environment */}
            <motion.div className="config-section" variants={sectionVariants}>
              <h2 className="section-title">
                <Layers className="section-icon lucide-icon" />
                Программное окружение
              </h2>
              <div className="software-grid">
                <motion.div className="software-item" variants={itemVariants}>
                  <div className="software-icon">
                    <img src={LinuxIcon} alt="Linux" />
                  </div>
                  <div className="spec-text">Kubuntu 24.04 LTS</div>
                </motion.div>
                <motion.div className="software-item" variants={itemVariants}>
                  <div className="software-icon">
                    <img src={MongoDBIcon} alt="MongoDB" />
                  </div>
                  <div className="spec-text">MongoDB 8.0.6</div>
                </motion.div>
                <motion.div className="software-item" variants={itemVariants}>
                  <div className="software-icon">
                    <img src={PostgreSQLIcon} alt="PostgreSQL" />
                  </div>
                  <div className="spec-text">PostgreSQL 17.4</div>
                </motion.div>
                <motion.div className="software-item" variants={itemVariants}>
                  <div className="software-icon">
                    <img src={CassandraIcon} alt="Cassandra" />
                  </div>
                  <div className="spec-text">Cassandra 4.1.8</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div className="config-section" variants={sectionVariants}>
              <h2 className="section-title">
                <img src={ToolsIcon} className="section-icon" alt="Tools" />
                Инструменты
              </h2>
              <div className="software-grid">
                <motion.div className="software-item" variants={itemVariants}>
                  <div className="software-icon">
                    <img src={YCSBIcon} alt="YCSB" />
                  </div>
                  <div className="spec-text">YCSB 0.17.0</div>
                </motion.div>
                <motion.div className="software-item" variants={itemVariants}>
                  <div className="software-icon">
                    <img src={PythonIcon} alt="Python" />
                  </div>
                  <div className="spec-text">Python 3.9.21</div>
                </motion.div>
                <motion.div className="software-item" variants={itemVariants}>
                  <div className="software-icon">
                    <img src={JavaIcon} alt="Java" />
                  </div>
                  <div className="spec-text">JDK 11.0.26</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* BMSTU Logo Emblem */}
          <motion.div 
            className="emblem-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <img 
              src="/assets/bmstu/bmstu-logo-white.png" 
              alt="BMSTU Logo" 
              className="bmstu-emblem"
              onError={(e) => {
                // Fallback to SVG if PNG fails
                const target = e.target as HTMLImageElement;
                target.src = "/assets/bmstu/bmstu-logo-white.svg";
              }}
            />
          </motion.div>
        </div>

        {/* Right Panel - Direct child of content-container */}
        <motion.div 
          className="right-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="principle-section">
            <h3 className="principle-title">ПРИНЦИПЫ ОБЕСПЕЧЕНИЯ <span className="highlight">ОБЪЕКТИВНОСТИ:</span></h3>
            <ul className="principle-list">
              <motion.li variants={itemVariants}>Идентичное окружение для всех тестов</motion.li>
              <motion.li variants={itemVariants}>"Холодный" старт перед каждым тестом</motion.li>
              <motion.li variants={itemVariants}>Контролируемые условия и изоляция процессов</motion.li>
            </ul>
          </div>

          <div className="principle-section">
            <h3 className="principle-title">ОБЕСПЕЧЕНИЕ <span className="highlight">НАДЁЖНОСТИ</span> РЕЗУЛЬТАТОВ</h3>
            <ul className="principle-list">
              <motion.li variants={itemVariants}>Трёхкратное повторение каждого теста</motion.li>
              <motion.li variants={itemVariants}>Статистическая обработка результатов</motion.li>
              <motion.li variants={itemVariants}>Контроль внешних факторов и системных ресурсов</motion.li>
              <motion.li variants={itemVariants}>Документирование условий проведения тестов</motion.li>
            </ul>
          </div>

          <div className="principle-section">
            <h3 className="principle-title"><span className="highlight">СТАНДАРТИЗАЦИЯ</span> ПРОЦЕДУР</h3>
            <ul className="principle-list">
              <motion.li variants={itemVariants}>Одинаковая последовательность тестирования</motion.li>
              <motion.li variants={itemVariants}>Фиксированные интервалы между тестами</motion.li>
              <motion.li variants={itemVariants}>Автоматизация сбора метрик и результатов</motion.li>
            </ul>
          </div>
        </motion.div>

      </div>
    </div>
  );
}; 