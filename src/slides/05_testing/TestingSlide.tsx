import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './TestingSlide.module.scss'

export const TestingSlide: React.FC = () => {
  const { isPrintTheme } = useTheme()
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const tools = [
    {
      name: "pgBench",
      type: "Специализированный",
      scope: "PostgreSQL",
      features: "Простота использования, оптимизирован для PostgreSQL",
      limitations: "Только для PostgreSQL",
      typeColor: "specialized",
    },
    {
      name: "cassandra-stress",
      type: "Специализированный",
      scope: "Cassandra",
      features: "Встроенный инструмент, оптимизирован для Cassandra",
      limitations: "Только для Cassandra",
      typeColor: "specialized",
    },
    {
      name: "MongoDB Benchmarking Tools",
      type: "Специализированный",
      scope: "MongoDB",
      features: "Оптимизирован для дисковой подсистемы",
      limitations: "Только для MongoDB",
      typeColor: "specialized",
    },
    {
      name: "TPC (TPC-C, TPC-H)",
      type: "Универсальный",
      scope: "Реляционные СУБД",
      features: "Индустриальный стандарт",
      limitations: "Сложность настройки, ориентирован на реляционные системы",
      typeColor: "universal",
    },
    {
      name: "Sysbench",
      type: "Универсальный",
      scope: "Различные СУБД",
      features: "Хороший инструмент",
      limitations: "Ограниченная поддержка NoSQL",
      typeColor: "universal",
    },
    {
      name: "YCSB",
      type: "Универсальный",
      scope: "Различные СУБД",
      features: "Поддержка NoSQL и SQL, простота настройки",
      limitations: "—",
      typeColor: "universal",
      highlighted: true,
    },
  ]

  return (
    <div className={`${styles.testingSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      {/* Title Container */}
      <motion.div 
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>Т Е Х Н О Л О Г И И&nbsp;&nbsp;Т Е С Т И Р О В А Н И Я&nbsp;&nbsp;С У Б Д</h1>
        <p className={styles.slideSubtitle}>Обзор инструментов бенчмаркинга</p>
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        {/* Table Container */}
        <motion.div 
          className={`${styles.tableContainer} ${isVisible ? styles.visible : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.tableWrapper}>
            <table className={styles.mainTable}>
              <thead>
                <tr className={styles.headerRow}>
                  <th className={styles.headerCell}>ИНСТРУМЕНТ</th>
                  <th className={styles.headerCell}>ТИП</th>
                  <th className={styles.headerCell}>ОБЛАСТЬ ПРИМЕНЕНИЯ</th>
                  <th className={styles.headerCell}>ОСОБЕННОСТИ</th>
                  <th className={styles.headerCell}>ОГРАНИЧЕНИЯ</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, index) => (
                  <motion.tr
                    key={index}
                    className={`
                      ${styles.dataRow}
                      ${tool.highlighted ? styles.highlightedRow : ''}
                      ${hoveredRow === index ? styles.hoveredRow : ''}
                    `}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <td className={styles.dataCell}>
                      <div className={`${styles.toolName} ${tool.highlighted ? styles.highlightedName : ''}`}>
                        {tool.name}
                      </div>
                    </td>
                    <td className={styles.dataCell}>
                      <span className={`${styles.typeBadge} ${styles[tool.typeColor]} ${hoveredRow === index ? styles.hoveredBadge : ''}`}>
                        {tool.type}
                      </span>
                    </td>
                    <td className={styles.dataCell}>
                      <div className={styles.scopeText}>{tool.scope}</div>
                    </td>
                    <td className={styles.dataCell}>
                      <div className={styles.featuresText}>{tool.features}</div>
                    </td>
                    <td className={styles.dataCell}>
                      <div className={styles.limitationsText}>{tool.limitations}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div 
          className={styles.conclusionContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className={styles.conclusionTitle}>
            <span className={styles.conclusionDot}></span>
            Вывод
          </h3>
          <p className={styles.conclusionText}>
            Для объективного сравнения производительности PostgreSQL, Cassandra
            и MongoDB был выбран
            <strong className={styles.ycsbHighlight}> YCSB</strong> как универсальный
            инструмент с поддержкой как реляционных, так и NoSQL систем.
          </p>
        </motion.div>
      </div>
    </div>
  )
} 