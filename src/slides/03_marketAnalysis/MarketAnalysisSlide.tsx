import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './MarketAnalysisSlide.module.scss'

interface TaskItemProps {
  number: number
  text: string
  delay?: number
}

const TaskItem: React.FC<TaskItemProps> = ({ number, text, delay = 0 }) => (
  <motion.li 
    className={styles.taskItem}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <div className={styles.taskNumber}>{number}</div>
    <div className={styles.taskText} dangerouslySetInnerHTML={{ __html: text }} />
  </motion.li>
)

interface PhaseProps {
  phaseClass: string
  icon: string
  title: string
  subtitle: string
  tasks: Array<{ number: number; text: string }>
  delay?: number
}

const Phase: React.FC<PhaseProps> = ({ phaseClass, icon, title, subtitle, tasks, delay = 0 }) => (
  <motion.div 
    className={`${styles.phase} ${styles[phaseClass.replace('-', '')]}`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <div className={styles.phaseHeader}>
      <div className={styles.phaseIcon}>{icon}</div>
      <div>
        <div className={styles.phaseTitle}>{title}</div>
        <div className={styles.phaseSubtitle}>{subtitle}</div>
      </div>
    </div>
    <ul className={styles.tasksList}>
      {tasks.map((task, index) => (
        <TaskItem 
          key={task.number}
          number={task.number}
          text={task.text}
          delay={delay + 0.1 + index * 0.1}
        />
      ))}
    </ul>
  </motion.div>
)

export const MarketAnalysisSlide: React.FC = () => {
  const { isPrintTheme } = useTheme()

  const phases = [
    {
      phaseClass: 'phase-1',
      icon: '🔍',
      title: 'ИССЛЕДОВАНИЕ И АНАЛИЗ',
      subtitle: 'Теоретическое обоснование',
      tasks: [
        {
          number: 1,
          text: 'Исследование <strong>архитектурных решений</strong> и подходов к обработке больших объемов данных в PostgreSQL, MongoDB и Cassandra'
        },
        {
          number: 2,
          text: 'Сравнительный <strong>анализ технологий тестирования</strong> СУБД и обоснованный выбор универсального бенчмарка YCSB'
        },
        {
          number: 3,
          text: 'Анализ <strong>технологий инструментов бенчмаркинга</strong> баз данных и исследование тенденций их использования'
        }
      ]
    },
    {
      phaseClass: 'phase-2',
      icon: '⚙️',
      title: 'ПОДГОТОВКА ДАННЫХ',
      subtitle: 'Настройка окружения',
      tasks: [
        {
          number: 4,
          text: 'Анализ и выбор реального <strong>JSON-датасета</strong> научных публикаций объемом ~12 ГБ для тестирования производительности'
        },
        {
          number: 5,
          text: 'Разработка специфических <strong>стратегий подготовки</strong> и загрузки данных для каждой СУБД с учетом их архитектурных особенностей'
        },
        {
          number: 6,
          text: 'Создание и прецизионная настройка <strong>изолированного тестового окружения</strong> на виртуальной машине'
        }
      ]
    },
    {
      phaseClass: 'phase-3',
      icon: '🔧',
      title: 'ТЕХНИЧЕСКАЯ РЕАЛИЗАЦИЯ',
      subtitle: 'Оптимизация и настройка',
      tasks: [
        {
          number: 7,
          text: 'Техническая реализация <strong>загрузки больших объемов</strong> данных с преодолением совместимости инструментов'
        },
        {
          number: 8,
          text: 'Комплексная оптимизация <strong>конфигурационных файлов</strong> PostgreSQL, MongoDB и Cassandra для высокопроизводительных нагрузок'
        },
        {
          number: 9,
          text: 'Детальная конфигурация <strong>YCSB</strong> и разработка стандартизированных тестовых сценариев c широким диапазоном параллелизма'
        }
      ]
    },
    {
      phaseClass: 'phase-4',
      icon: '📊',
      title: 'ТЕСТИРОВАНИЕ И АНАЛИЗ',
      subtitle: 'Сбор и визуализация результатов',
      tasks: [
        {
          number: 10,
          text: 'Проведение комплексной <strong>серии тестов</strong> производительности с обеспечением статистической достоверности и контролем условий'
        },
        {
          number: 11,
          text: 'Разработка специализированного <strong>Python-скрипта</strong> для автоматизированного сбора и обработки многомерных результатов'
        },
        {
          number: 12,
          text: 'Создание интерактивных <strong>дашбордов в Apache Superset</strong> для визуализации данных и формулирование практических рекомендаций'
        }
      ]
    }
  ]

  return (
    <div className={`${styles.marketAnalysisSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      {/* Title Container */}
      <motion.div 
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>П Е Р Е Ч Е Н Ь&nbsp;&nbsp;Р Е Ш Ё Н Н Ы Х&nbsp;&nbsp;З А Д А Ч</h1>
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.phasesGrid}>
            {phases.map((phase, index) => (
              <Phase
                key={phase.phaseClass}
                {...phase}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>

          {/* Summary */}
          <motion.div 
            className={styles.summary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className={styles.summaryText}>
              ВСЕГО ВЫПОЛНЕНО: 12 задач | 4 этапа | 3 СУБД | 189 тестов
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 