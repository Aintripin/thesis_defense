import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DatasetSlides.module.scss';

const dataStructureInfo = [
  {
    label: "Основные поля:",
    value: "title, year, authors, abstract, references",
    isHighlighted: true
  },
  {
    label: "Вложенные объекты:",
    value: "venue (место публикации), fos (области знаний)",
    isHighlighted: true
  },
  {
    label: "Массивы:",
    value: "authors, references, indexed_abstract",
    isHighlighted: true
  },
  {
    label: "Метаданные:",
    value: "идентификаторы, индексы, временные метки",
    isHighlighted: true
  }
];

const dbmsChallenges = [
  {
    label: "MongoDB:",
    value: "прямая совместимость с JSON, сохранение структуры",
    isHighlighted: true
  },
  {
    label: "PostgreSQL:",
    value: "необходимость трансформации в реляционную структуру или использование JSONB",
    isHighlighted: true,
    isLongText: true
  },
  {
    label: "Cassandra:",
    value: "требование денормализации и выравнивания вложенных структур",
    isHighlighted: true
  }
];

const testingSignificance = [
  {
    label: "",
    value: "Проверка эффективности обработки реальных полуструктурированных данных",
    isHighlighted: false
  },
  {
    label: "",
    value: "Оценка производительности при различных паттернах доступа",
    isHighlighted: false
  },
  {
    label: "",
    value: "Выявление ограничений каждой архитектурной модели",
    isHighlighted: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
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

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

interface InfoItemProps {
  item: { label: string; value: string; isHighlighted: boolean; isLongText?: boolean };
  index: number;
  isPrintTheme: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ item, index, isPrintTheme }) => (
  <motion.li
    variants={itemVariants}
    className={styles.infoItem}
    initial={isPrintTheme ? "visible" : "hidden"}
    animate="visible"
  >
    <div className={styles.bullet} />
    
    {/* Pill wrapper - first container */}
    {item.label && (
      <div className={styles.pillWrapper}>
        <span className={item.isHighlighted ? styles.highlight : styles.label}>
          {item.label}
        </span>
      </div>
    )}
    
    {/* Text content wrapper - second container */}
    <div className={styles.textWrapper}>
      <span className={`${styles.value} ${item.isLongText ? styles.longText : ''}`}>
        {item.value}
      </span>
    </div>
  </motion.li>
);

interface Slide10ContentProps {
  isPrintTheme: boolean;
}

export const Slide10Content: React.FC<Slide10ContentProps> = ({ isPrintTheme }) => (
  <motion.div
    className={styles.mainContent}
    variants={containerVariants}
    initial={isPrintTheme ? "visible" : "hidden"}
    animate="visible"
    exit={{ opacity: 0 }}
  >
    {/* Section 1: Структура и особенности данных */}
    <motion.div 
      className={styles.section}
      variants={sectionVariants}
      initial={isPrintTheme ? "visible" : "hidden"}
      animate="visible"
      transition={{ delay: isPrintTheme ? 0 : 0.4 }}
    >
      <div className={styles.sectionHeader}>
        Структура и особенности данных
      </div>
      <div className={styles.sectionContent}>
        <motion.ul
          variants={containerVariants}
          initial={isPrintTheme ? "visible" : "hidden"}
          animate="visible"
          transition={{ delay: isPrintTheme ? 0 : 0.8 }}
        >
          {dataStructureInfo.map((item, index) => (
            <InfoItem key={index} item={item} index={index} isPrintTheme={isPrintTheme} />
          ))}
        </motion.ul>
      </div>
    </motion.div>
    
    {/* Section 2: Вызовы для различных СУБД */}
    <motion.div 
      className={styles.section}
      variants={sectionVariants}
      initial={isPrintTheme ? "visible" : "hidden"}
      animate="visible"
      transition={{ delay: isPrintTheme ? 0 : 1.0 }}
    >
      <div className={styles.sectionHeader}>
        Вызовы для различных СУБД
      </div>
      <div className={styles.sectionContent}>
        <motion.ul
          variants={containerVariants}
          initial={isPrintTheme ? "visible" : "hidden"}
          animate="visible"
          transition={{ delay: isPrintTheme ? 0 : 1.4 }}
        >
          {dbmsChallenges.map((item, index) => (
            <InfoItem key={index} item={item} index={index} isPrintTheme={isPrintTheme} />
          ))}
        </motion.ul>
      </div>
    </motion.div>

    {/* Section 3: Значение для тестирования */}
    <motion.div 
      className={styles.section}
      variants={sectionVariants}
      initial={isPrintTheme ? "visible" : "hidden"}
      animate="visible"
      transition={{ delay: isPrintTheme ? 0 : 1.6 }}
    >
      <div className={styles.sectionHeader}>
        Значение для тестирования
      </div>
      <div className={styles.sectionContent}>
        <motion.ul
          variants={containerVariants}
          initial={isPrintTheme ? "visible" : "hidden"}
          animate="visible"
          transition={{ delay: isPrintTheme ? 0 : 2.0 }}
        >
          {testingSignificance.map((item, index) => (
            <InfoItem key={index} item={item} index={index} isPrintTheme={isPrintTheme} />
          ))}
        </motion.ul>
      </div>
    </motion.div>
  </motion.div>
); 