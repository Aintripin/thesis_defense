import React from 'react'
import { motion } from 'framer-motion'
import { Database, BarChart3, Settings } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './YCSBJustificationSlide.module.scss'

interface JustificationCardProps {
  number: number
  title: string
  children: React.ReactNode
  delay?: number
}

const JustificationCard: React.FC<JustificationCardProps> = ({ number, title, children, delay = 0 }) => (
  <motion.div 
    className={styles.justificationCard}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={styles.cardNumber}>{number}</div>
    <h3 className={styles.cardTitle}>{title}</h3>
    <div className={styles.cardContent}>
      {children}
    </div>
  </motion.div>
)

interface BulletPointProps {
  children: React.ReactNode
}

const BulletPoint: React.FC<BulletPointProps> = ({ children }) => (
  <li className={styles.bulletItem}>
    <span className={styles.bullet}></span>
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
    <div className={styles.workloadWrapper}>
      <span className={styles.workloadItem}>{workload}:</span> 
      <span className={styles.workloadText}>
        {description} <span className={styles.workloadDescription}>({details})</span>
      </span>
    </div>
  </BulletPoint>
)

export const YCSBJustificationSlide: React.FC = () => {
  const { isPrintTheme } = useTheme()

  return (
    <div className={`${styles.ycsbJustificationSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      {/* Title Container */}
      <motion.div 
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>О Б О С Н О В А Н И Е&nbsp;&nbsp;В Ы Б О Р А&nbsp;&nbsp;Y C S B</h1>
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        {/* Main Content - Full Width */}
        <div className={styles.mainContentAreaWrapper}>
          <div className={styles.mainContent}>
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

            {/* Card 2: Standardized Workloads - Two Column Layout */}
            <JustificationCard number={2} title="Стандартизированные рабочие нагрузки" delay={0.6}>
              <div className={styles.workloadsGrid}>
                <div className={styles.workloadsColumn}>
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
                  </ul>
                </div>
                <div className={styles.workloadsColumn}>
                  <ul>
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
                      <div className={styles.workloadWrapper}>
                        <span className={styles.workloadItem}>Workload F:</span>
                        <span className={styles.workloadText}>50% чтение / 50% чтение-модификация-запись</span>
                      </div>
                    </BulletPoint>
                  </ul>
                </div>
              </div>
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

            {/* Conclusion Card */}
            <motion.div 
              className={styles.conclusionCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className={styles.conclusionHeader}>
                <span className={styles.conclusionDot}></span>
                <h3 className={styles.conclusionTitle}>Вывод</h3>
              </div>
              <div className={styles.conclusionContent}>
                <p>YCSB является оптимальным выбором для сравнительного анализа, обеспечивая единую методологию тестирования и объективные результаты для принятия обоснованных решений о выборе СУБД.</p>
              </div>
            </motion.div>
          </div>

          {/* BMSTU Logo Emblem */}
          <motion.div 
            className={styles.emblemContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <img 
              src="/assets/bmstu/bmstu-logo-white.png" 
              alt="BMSTU Logo" 
              className={styles.bmstuEmblem}
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