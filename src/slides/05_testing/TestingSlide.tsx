import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Settings, Database } from 'lucide-react'
import screwdriverWrenchIcon from '../../assets/screwdriver-wrench-svgrepo-com.svg'
import styles from './TestingSlide.module.scss'

interface ToolCardProps {
  name: string
  description: string
  category: 'specialized' | 'universal'
  delay?: number
}

const ToolCard: React.FC<ToolCardProps> = ({ name, description, category, delay = 0 }) => (
  <motion.div 
    className={`${styles.toolCard} ${styles[category]}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={styles.toolHeader}>
      <span className={styles.toolName}>{name}</span>
    </div>
    <p className={styles.toolDescription}>{description}</p>
  </motion.div>
)

interface SidebarCardProps {
  title: string
  content: string
  delay?: number
}

const SidebarCard: React.FC<SidebarCardProps> = ({ title, content, delay = 0 }) => (
  <motion.div 
    className={styles.sidebarSection}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <h2>{title}</h2>
    <p>{content}</p>
  </motion.div>
)

export const TestingSlide: React.FC = () => {
  const specializedTools = [
    {
      name: 'pgBench',
      description: 'только для PostgreSQL'
    },
    {
      name: 'Cassandra-stress', 
      description: 'специально для Cassandra, CQL операции'
    },
    {
      name: 'MongoDB Benchmarking Tools',
      description: 'mongoperf для тестирования дисковой подсистемы'
    },
    {
      name: 'Apache JMeter',
      description: 'универсальный, но с ограничениями для NoSQL'
    }
  ]

  const universalTools = [
    {
      name: 'TPC Benchmarks (TPC-C, TPC-H)',
      description: 'индустриальные стандарты, сложны в настройке'
    },
    {
      name: 'Sysbench',
      description: 'скриптуемый, ограниченная поддержка NoSQL'
    }
  ]

  return (
    <div className={styles.testingSlide}>
      {/* Title Container */}
      <motion.div 
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>Т Е Х Н О Л О Г И И&nbsp;&nbsp;Т Е С Т И Р О В А Н И Я&nbsp;&nbsp;С У Б Д</h1>
      </motion.div>

      {/* Content Container - Will become a grid parent */}
      <div className={styles.contentContainer}>
        {/* Sidebar - Now a direct child of content-container */}
        <motion.div 
          className={styles.sidebar}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarIconCluster}>
              <Database size={40} className={`${styles.sidebarToolIcon} ${styles.database}`} />
              <img 
                src={screwdriverWrenchIcon} 
                alt="Tools" 
                className={`${styles.sidebarToolIcon} ${styles.screwdriverWrench}`}
              />
            </div>
            <h2 className={styles.sidebarTitle}>ТЕХНОЛОГИИ ТЕСТИРОВАНИЯ СУБД</h2>
            <p className={styles.sidebarSubtitle}>Обзор инструментов бенчмаркинга</p>
          </div>
        </motion.div>

        {/* Main Content Area Wrapper - New wrapper, direct child of content-container */}
        <div className={styles.mainContentAreaWrapper}>
          {/* Main Content (original structure with sections and tools) */}
          <div className={styles.mainContent}>
            {/* Specialized Benchmarks Section */}
            <motion.div 
              className={styles.toolsSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={styles.sectionHeader}>
                <Zap className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Специализированные бенчмарки</h3>
              </div>
              <div className={`${styles.toolsGrid} ${styles.specialized}`}>
                {specializedTools.map((tool, index) => (
                  <ToolCard
                    key={tool.name}
                    name={tool.name}
                    description={tool.description}
                    category="specialized"
                    delay={0.5 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Universal Benchmarks Section */}
            <motion.div 
              className={styles.toolsSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className={styles.sectionHeader}>
                <Settings className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Универсальные бенчмарки</h3>
              </div>
              <div className={`${styles.toolsGrid} ${styles.universal}`}>
                {universalTools.map((tool, index) => (
                  <ToolCard
                    key={tool.name}
                    name={tool.name}
                    description={tool.description}
                    category="universal"
                    delay={0.7 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 