import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Settings, Database } from 'lucide-react'
import screwdriverWrenchIcon from '../../assets/screwdriver-wrench-svgrepo-com.svg'
import './TestingSlide.scss'

interface ToolCardProps {
  name: string
  description: string
  category: 'specialized' | 'universal'
  delay?: number
}

const ToolCard: React.FC<ToolCardProps> = ({ name, description, category, delay = 0 }) => (
  <motion.div 
    className={`tool-card ${category}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="tool-header">
      <span className="tool-name">{name}</span>
    </div>
    <p className="tool-description">{description}</p>
  </motion.div>
)

interface SidebarCardProps {
  title: string
  content: string
  delay?: number
}

const SidebarCard: React.FC<SidebarCardProps> = ({ title, content, delay = 0 }) => (
  <motion.div 
    className="sidebar-section"
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
    <div className="testing-slide">
      {/* Title Container */}
      <motion.div 
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">Т Е Х Н О Л О Г И И&nbsp;&nbsp;Т Е С Т И Р О В А Н И Я&nbsp;&nbsp;С У Б Д</h1>
      </motion.div>

      {/* Content Container - Will become a grid parent */}
      <div className="content-container">
        {/* Sidebar - Now a direct child of content-container */}
        <motion.div 
          className="sidebar"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="sidebar-header">
            <div className="sidebar-icon-cluster">
              <Database size={40} className="sidebar-tool-icon database" />
              <img 
                src={screwdriverWrenchIcon} 
                alt="Tools" 
                className="sidebar-tool-icon screwdriver-wrench"
              />
            </div>
            <h2 className="sidebar-title">ТЕХНОЛОГИИ ТЕСТИРОВАНИЯ СУБД</h2>
            <p className="sidebar-subtitle">Обзор инструментов бенчмаркинга</p>
          </div>
        </motion.div>

        {/* Main Content Area Wrapper - New wrapper, direct child of content-container */}
        <div className="main-content-area-wrapper">
          {/* Main Content (original structure with sections and tools) */}
          <div className="main-content">
            {/* Specialized Benchmarks Section */}
            <motion.div 
              className="tools-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="section-header">
                <Zap className="section-icon" />
                <h3 className="section-title">Специализированные бенчмарки</h3>
              </div>
              <div className="tools-grid specialized">
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
              className="tools-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="section-header">
                <Settings className="section-icon" />
                <h3 className="section-title">Универсальные бенчмарки</h3>
              </div>
              <div className="tools-grid universal">
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