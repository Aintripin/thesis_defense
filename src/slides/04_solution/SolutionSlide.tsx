import React from 'react'
import { motion } from 'framer-motion'
import { Database } from 'lucide-react'
import styles from './SolutionSlide.module.scss'

interface DatabaseCardProps {
  title: string
  subtitle: string
  features: string[]
  subItems?: string[]
  icon: React.ElementType
  colorClass: string
  isFullWidth?: boolean
  delay?: number
}

const DatabaseCard: React.FC<DatabaseCardProps> = ({ 
  title, 
  subtitle, 
  features, 
  subItems,
  icon: Icon, 
  colorClass, 
  isFullWidth = false,
  delay = 0 
}) => (
  <motion.div 
    className={`${styles.databaseCard} ${styles[colorClass]} ${isFullWidth ? styles.fullWidth : ''}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <h3 className={styles.cardTitle}>{title}</h3>
    <ul className={styles.featuresList}>
      {features.map((feature, index) => (
        <li key={index} className={styles.featureItem}>
          <span className={styles.bullet}></span>
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
)

interface SidebarCardProps {
  title: string
  content: string
  isImportant?: boolean
  delay?: number
}

const SidebarCard: React.FC<SidebarCardProps> = ({ title, content, isImportant = false, delay = 0 }) => (
  <motion.div 
    className={`${styles.sidebarSection} ${isImportant ? styles.importantBox : styles.thesisSection}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <h2>{title}</h2>
    <p>{content}</p>
  </motion.div>
)

export const SolutionSlide: React.FC = () => {
  const databases = [
    {
      title: 'PostgreSQL (реляционная СУБД)',
      subtitle: '',
      icon: Database,
      colorClass: 'postgres',
      features: [
        'Реляционная модель данных с определенной схемой',
        'MVCC (Multiversion Concurrency Control) для изоляции транзакций',
        'Полная поддержка ACID-свойств (Atomicity, Consistency, Isolation, Durability)',
        'JSON-поддержка для работы с полуструктурированными данными',
        'Расширяемость через пользовательские типы данных и функции'
      ]
    },
    {
      title: 'MongoDB (документоориентированная СУБД)',
      subtitle: '',
      icon: Database,
      colorClass: 'mongo',
      features: [
        'Колоночная модель данных для эффективности определенных типов запросов',
        'Распределенная архитектура без единой точки отказа',
        'Линейная масштабируемость при добавлении узлов',
        'Настраиваемая консистентность для каждой операции',
        'Оптимизация для записи - архитектура, ориентированная на высокую производительность операций записи'
      ]
    },
    {
      title: 'Cassandra (колоночная СУБД)',
      subtitle: '',
      icon: Database,
      colorClass: 'cassandra',
      features: [
        'Колоночная модель данных для эффективности определенных типов запросов',
        'Распределенная архитектура без единой точки отказа',
        'Линейная масштабируемость при добавлении узлов',
        'Настраиваемая консистентность для каждой операции',
        'Оптимизация для записи - архитектура, ориентированная на высокую производительность операций записи'
      ]
    },
    {
      title: 'Сравнение подходов к обработке данных',
      subtitle: '',
      icon: Database,
      colorClass: 'comparison',
      isFullWidth: true,
      features: [
        'Реляционный подход (PostgreSQL): строгая схема, нормализация, SQL, транзакционность',
        'Документоориентированный подход (MongoDB): гибкая схема, вложенные документы, горизонтальное масштабирование',
        'Колоночный подход (Cassandra): денормализация, широкие строки, распределение данных'
      ]
    }
  ]

  return (
    <div className={styles.solutionSlide}>
      {/* Title Container */}
      <motion.div 
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>А Р Х И Т Е К Т У Р Н Ы Е&nbsp;&nbsp;Р Е Ш Е Н И Я&nbsp;&nbsp;С У Б Д</h1>
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.solutionContentWrapper}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <SidebarCard
              title="Тезис"
              content="Архитектура СУБД определяет системные возможности"
              delay={0.2}
            />
            <SidebarCard
              title="ВАЖНО"
              content="Реляционные СУБД дают консистентность, NoSQL масштабируемость и гибкость"
              isImportant={true}
              delay={0.3}
            />
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            <motion.div 
              className={styles.contentHeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className={styles.contentTitle}>Анализ архитектурных особенностей</h2>
            </motion.div>

            <div className={styles.cardsGrid}>
              {databases.map((db, index) => (
                <DatabaseCard
                  key={db.title}
                  {...db}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 