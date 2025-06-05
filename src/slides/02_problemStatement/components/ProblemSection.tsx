import React from 'react'
import { motion } from 'framer-motion'

const ProblemSection: React.FC = () => {
  return (
    <motion.div 
      className="problem-section"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="section-title">
        <div className="section-icon">⚠</div>
        Проблема
      </div>

      <div className="problems-grid">
        <motion.div 
          className="problem-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="problem-title">Лавинообразный рост данных</div>
          <div className="problem-text">
            Ежедневно генерируются огромные массивы информации (к 2025 г.
            – <span className="highlight-number">175 зеттабайт</span>)
          </div>
        </motion.div>

        <motion.div 
          className="problem-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="problem-title">Критичность выбора СУБД</div>
          <div className="problem-text">
            От выбора системы напрямую зависят производительность,
            масштабируемость и эффективность приложений
          </div>
        </motion.div>

        <motion.div 
          className="problem-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="problem-title">Многообразие СУБД</div>
          <div className="problem-text">
            Наряду с реляционными СУБД, широкое распространение получили
            NoSQL решения, каждое со своими особенностями
          </div>
        </motion.div>

        <motion.div 
          className="problem-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="problem-title">Высокая цена ошибки</div>
          <div className="problem-text">
            Неправильный выбор ведет к проблемам производительности и
            высоким эксплуатационным расходам
          </div>
        </motion.div>
      </div>

      <div className="ycsb-badge">Решение: YCSB Benchmark</div>
    </motion.div>
  )
}

export default ProblemSection 