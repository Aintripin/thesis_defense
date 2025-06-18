import React from 'react';
import { Card, Row, Col, Typography, Descriptions, Tag } from 'antd';
import { Server, Cpu, HardDrive, MemoryStick, Monitor, Database, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './TestEnvironmentSlide.module.scss';
import { SlideHeading } from '../../components/SlideHeading';

// Import SVG icons using path aliases
import CpuIcon from '../../assets/cpu.svg';
import MemoryIcon from '../../assets/memory-stick.svg';
import HardDriveIcon from '../../assets/hard-drive.svg';
import LinuxIcon from '../../assets/linux-svgrepo-com.svg';
import MongoDBIcon from '../../assets/mongodb.svg';
import PostgreSQLIcon from '../../assets/postgresql.svg';
import CassandraIcon from '../../assets/apachecassandra.svg';
import PythonIcon from '../../assets/python.svg';
import JavaIcon from '../../assets/openjdk.svg';
import YCSBIcon from '../../assets/yahoo-svgrepo-com.svg';
import ToolsIcon from '../../assets/screwdriver-wrench-svgrepo-com.svg';
import VMwareIcon from '../../assets/vmware.svg';

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
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.testEnvironmentSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <SlideHeading size="small">ТЕСТОВОЕ ОКРУЖЕНИЕ</SlideHeading>

      {/* Content Container - White container with two direct children */}
      <div className={styles.contentContainer}>
        
        {/* Left Content Area */}
        <div className={styles.mainContentArea}>
          <motion.div 
            className={styles.mainContent}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hardware Configuration */}
            <motion.div className={styles.configSection} variants={sectionVariants}>
              <h2 className={styles.sectionTitle}>
                <Monitor className={`${styles.sectionIcon} ${styles.lucideIcon}`} />
                Аппаратная и программная конфигурация
              </h2>
              <div className={styles.specGrid}>
                <motion.div className={styles.specItem} variants={itemVariants}>
                  <div className={styles.specIcon}>
                    <img src={CpuIcon} alt="CPU" />
                  </div>
                  <div className={styles.specText}>Intel Core i9-12900H (16 виртуальных ядер, 2.9 ГГц)</div>
                </motion.div>
                <motion.div className={styles.specItem} variants={itemVariants}>
                  <div className={styles.specIcon}>
                    <img src={MemoryIcon} alt="Memory" />
                  </div>
                  <div className={styles.specText}>24 ГБ DDR5 RAM, 4800MHz</div>
                </motion.div>
                <motion.div className={styles.specItem} variants={itemVariants}>
                  <div className={styles.specIcon}>
                    <img src={HardDriveIcon} alt="Storage" />
                  </div>
                  <div className={styles.specText}>NVMe SSD Western Digital S850NX (1512 ГБ)</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Virtualization */}
            <motion.div className={styles.configSection} variants={sectionVariants}>
              <h2 className={styles.sectionTitle}>
                <Monitor className={`${styles.sectionIcon} ${styles.lucideIcon}`} />
                Виртуализация
              </h2>
              <div className={styles.specGrid}>
                <motion.div className={styles.specItem} variants={itemVariants}>
                  <div className={`${styles.specIcon} ${styles.vmware}`}>
                    <img src={VMwareIcon} alt="VMware" />
                  </div>
                  <div className={styles.specText}>VMware Workstation Pro 17</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Software Environment */}
            <motion.div className={styles.configSection} variants={sectionVariants}>
              <h2 className={styles.sectionTitle}>
                <Monitor className={`${styles.sectionIcon} ${styles.lucideIcon}`} />
                Программное окружение
              </h2>
              <div className={styles.softwareGrid}>
                <motion.div className={styles.softwareItem} variants={itemVariants}>
                  <div className={styles.softwareIcon}>
                    <img src={LinuxIcon} alt="Linux" />
                  </div>
                  <div className={styles.specText}>Kubuntu 24.04 LTS</div>
                </motion.div>
                <motion.div className={styles.softwareItem} variants={itemVariants}>
                  <div className={styles.softwareIcon}>
                    <img src={MongoDBIcon} alt="MongoDB" />
                  </div>
                  <div className={styles.specText}>MongoDB 8.0.6</div>
                </motion.div>
                <motion.div className={styles.softwareItem} variants={itemVariants}>
                  <div className={styles.softwareIcon}>
                    <img src={PostgreSQLIcon} alt="PostgreSQL" />
                  </div>
                  <div className={styles.specText}>PostgreSQL 17.4</div>
                </motion.div>
                <motion.div className={styles.softwareItem} variants={itemVariants}>
                  <div className={styles.softwareIcon}>
                    <img src={CassandraIcon} alt="Cassandra" />
                  </div>
                  <div className={styles.specText}>Cassandra 4.1.8</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div className={styles.configSection} variants={sectionVariants}>
              <h2 className={styles.sectionTitle}>
                <img src={ToolsIcon} className={styles.sectionIcon} alt="Tools" />
                Инструменты
              </h2>
              <div className={styles.softwareGrid}>
                <motion.div className={styles.softwareItem} variants={itemVariants}>
                  <div className={styles.softwareIcon}>
                    <img src={YCSBIcon} alt="YCSB" />
                  </div>
                  <div className={styles.specText}>YCSB 0.17.0</div>
                </motion.div>
                <motion.div className={styles.softwareItem} variants={itemVariants}>
                  <div className={styles.softwareIcon}>
                    <img src={PythonIcon} alt="Python" />
                  </div>
                  <div className={styles.specText}>Python 3.9.21</div>
                </motion.div>
                <motion.div className={styles.softwareItem} variants={itemVariants}>
                  <div className={styles.softwareIcon}>
                    <img src={JavaIcon} alt="Java" />
                  </div>
                  <div className={styles.specText}>JDK 11.0.26</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Panel - Direct child of content-container */}
        <motion.div 
          className={styles.rightPanel}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className={styles.principleSection}>
            <h3 className={styles.principleTitle}>ПРИНЦИПЫ ОБЕСПЕЧЕНИЯ <span className={styles.highlight}>ОБЪЕКТИВНОСТИ:</span></h3>
            <ul className={styles.principleList}>
              <motion.li variants={itemVariants}>Идентичное окружение для всех тестов</motion.li>
              <motion.li variants={itemVariants}>"Холодный" старт перед каждым тестом</motion.li>
              <motion.li variants={itemVariants}>Контролируемые условия и изоляция процессов</motion.li>
            </ul>
          </div>

          <div className={styles.principleSection}>
            <h3 className={styles.principleTitle}>ОБЕСПЕЧЕНИЕ <span className={styles.highlight}>НАДЁЖНОСТИ</span> РЕЗУЛЬТАТОВ</h3>
            <ul className={styles.principleList}>
              <motion.li variants={itemVariants}>Трёхкратное повторение каждого теста</motion.li>
              <motion.li variants={itemVariants}>Статистическая обработка результатов</motion.li>
              <motion.li variants={itemVariants}>Контроль внешних факторов и системных ресурсов</motion.li>
              <motion.li variants={itemVariants}>Документирование условий проведения тестов</motion.li>
            </ul>
          </div>

          <div className={styles.principleSection}>
            <h3 className={styles.principleTitle}><span className={styles.highlight}>СТАНДАРТИЗАЦИЯ</span> ПРОЦЕДУР</h3>
            <ul className={styles.principleList}>
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