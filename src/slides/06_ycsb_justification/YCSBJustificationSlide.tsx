import React from 'react'
import { motion } from 'framer-motion'
import { Database, BarChart3, Settings } from 'lucide-react'
import './YCSBJustificationSlide.scss'

interface JustificationCardProps {
  number: number
  title: string
  children: React.ReactNode
  delay?: number
}

const JustificationCard: React.FC<JustificationCardProps> = ({ number, title, children, delay = 0 }) => (
  <motion.div 
    className="justification-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="card-number">{number}</div>
    <h3 className="card-title">{title}</h3>
    <div className="card-content">
      {children}
    </div>
  </motion.div>
)

interface BulletPointProps {
  children: React.ReactNode
}

const BulletPoint: React.FC<BulletPointProps> = ({ children }) => (
  <li className="bullet-item">
    <span className="bullet"></span>
    {children}
  </li>
)

interface WorkloadItemProps {
  workload: string
  description: string
  details: string
}

const WorkloadItem: React.FC<WorkloadItemProps> = ({ workload, description, details }) => (
  <BulletPoint>
    <span className="workload-item">{workload}:</span> {description} <span className="workload-description">({details})</span>
  </BulletPoint>
)

export const YCSBJustificationSlide: React.FC = () => {
  return (
    <div className="ycsb-justification-slide">
      {/* Title Container */}
      <motion.div 
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">О Б О С Н О В А Н И Е&nbsp;&nbsp;В Ы Б О Р А&nbsp;&nbsp;Y C S B</h1>
      </motion.div>

      {/* Content Container */}
      <div className="content-container">
        {/* Sidebar */}
        <motion.div 
          className="sidebar"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="sidebar-header">
            <div className="sidebar-icon-cluster">
              <Database size={40} className="sidebar-icon database" />
              <BarChart3 size={36} className="sidebar-icon chart" />
            </div>
            <h2 className="sidebar-title">Обоснование выбора YCSB</h2>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="main-content-area-wrapper">
          <div className="main-content">
            {/* Card 1: Cross-platform */}
            <JustificationCard number={1} title="Кросс-платформенность" delay={0.4}>
              <ul>
                <BulletPoint>
                  Поддержка всех трех исследуемых СУБД
                </BulletPoint>
                <BulletPoint>
                  Единый инструмент и единые метрики для сопоставимости результатов
                </BulletPoint>
              </ul>
            </JustificationCard>

            {/* Card 2: Standardized Workloads */}
            <JustificationCard number={2} title="Стандартизированные рабочие нагрузки" delay={0.6}>
              <ul>
                <WorkloadItem 
                  workload="Workload A" 
                  description="50% чтение / 50% обновление" 
                  details="Update heavy" 
                />
                <WorkloadItem 
                  workload="Workload B" 
                  description="95% чтение / 5% обновление" 
                  details="Read heavy" 
                />
                <WorkloadItem 
                  workload="Workload C" 
                  description="100% чтение" 
                  details="Read only" 
                />
                <WorkloadItem 
                  workload="Workload D" 
                  description="95% чтение / 5% вставка" 
                  details="Read latest" 
                />
                <WorkloadItem 
                  workload="Workload E" 
                  description="95% сканирование / 5% вставка" 
                  details="Short ranges scan" 
                />
                <BulletPoint>
                  <span className="workload-item">Workload F:</span> 50% чтение / 50% чтение-модификация-запись
                </BulletPoint>
              </ul>
            </JustificationCard>

            {/* Card 3: Relevant Metrics */}
            <JustificationCard number={3} title="Релевантные метрики" delay={0.8}>
              <ul>
                <BulletPoint>
                  Пропускная способность (ops/sec)
                </BulletPoint>
                <BulletPoint>
                  Задержки операций (среднее, перцентили P95, P99)
                </BulletPoint>
                <BulletPoint>
                  Конфигурируемость параметров тестирования
                </BulletPoint>
              </ul>
            </JustificationCard>
          </div>

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
      </div>
    </div>
  )
} 