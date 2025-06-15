import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DatasetSlides.module.scss';

const selectedDatasetInfo = [
  {
    label: "Источник: ",
    value: "Метаданные научных публикаций в JSON-формате"
  },
  {
    label: "Объём: ",
    value: "~12 ГБ"
  },
  {
    label: "Количество записей: ",
    value: "4,894,081"
  },
  {
    label: "Структура: ",
    value: "Сложные вложенные JSON-документы с метаданными публикаций"
  }
];

const datasetAdvantages = [
  {
    label: "Реалистичность: ",
    value: "отражает типичную структуру данных современных приложений"
  },
  {
    label: "Сложность структуры: ",
    value: "содержит вложенные объекты, массивы, различные типы данных"
  },
  {
    label: "Масштаб: ",
    value: "достаточный объем для выявления характеристик производительности"
  },
  {
    label: "Универсальность: ",
    value: "подходит для тестирования различных моделей данных"
  }
];

// Sample dataset record
const sampleDatasetRecord = `{
  "id": 1091,
  "authors": [
    {
      "name": "Makoto Satoh",
      "org": "Shinshu University",
      "id": 2312688602
    },
    {
      "name": "Ryo Muramatsu", 
      "org": "Shinshu University",
      "id": 2482909946
    }
  ],
  "title": "Preliminary Design of a Network Protocol Learning Tool Based on the Comprehension of High School Students",
  "year": 2013,
  "n_citation": 1,
  "page_start": "89",
  "page_end": "93",
  "doc_type": "Conference",
  "publisher": "Springer, Berlin, Heidelberg",
  "doi": "10.1007/978-3-642-39476-8_19",
  "indexed_abstract": {
    "IndexLength": 58,
    "InvertedIndex": {
      "tool.": [42],
      "study": [4],
      "students": [14, 46],
      "learning": [9, 41],
      "network": [33, 56]
    }
  }
}`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

interface InfoItemProps {
  item: { label: string; value: string };
  isPrintTheme: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ item, isPrintTheme }) => (
  <motion.li
    variants={itemVariants}
    className={styles.infoItem}
    initial={isPrintTheme ? "visible" : "hidden"}
    animate="visible"
  >
    <div className={styles.bullet} />
    <span>
      {item.label && <span className={styles.label}>{item.label}</span>}
      <span className={styles.value}>{item.value}</span>
    </span>
  </motion.li>
);

interface Slide9ContentProps {
  isPrintTheme: boolean;
}

export const Slide9Content: React.FC<Slide9ContentProps> = ({ isPrintTheme }) => (
  <motion.div
    className={styles.mainContent}
    variants={containerVariants}
    initial={isPrintTheme ? "visible" : "hidden"}
    animate="visible"
    exit={{ opacity: 0 }}
  >
    <div className={styles.contentGrid}>
      {/* Left Column - Dataset Info */}
      <div className={styles.leftColumn}>
        {/* Section 1: Выбранный датасет */}
        <motion.div
          className={styles.section}
          variants={sectionVariants}
          initial={isPrintTheme ? "visible" : "hidden"}
          animate="visible"
        >
          <div className={styles.sectionHeader}>
            Выбранный датасет
          </div>
          <div className={styles.sectionContent}>
            <ul>
              {selectedDatasetInfo.map((item, index) => (
                <InfoItem key={index} item={item} isPrintTheme={isPrintTheme} />
              ))}
            </ul>
          </div>
        </motion.div>
        
        {/* Section 2: Преимущества выбранного датасета */}
        <motion.div
          className={styles.section}
          variants={sectionVariants}
          initial={isPrintTheme ? "visible" : "hidden"}
          animate="visible"
        >
          <div className={styles.sectionHeader}>
            Преимущества выбранного датасета
          </div>
          <div className={styles.sectionContent}>
            <ul>
              {datasetAdvantages.map((item, index) => (
                <InfoItem key={index} item={item} isPrintTheme={isPrintTheme} />
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Dataset Sample */}
      <div className={styles.rightColumn}>
        <motion.div
          className={styles.datasetSampleCard}
          variants={sectionVariants}
          initial={isPrintTheme ? "visible" : "hidden"}
          animate="visible"
          transition={{ delay: isPrintTheme ? 0 : 0.4 }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Пример записи датасета</div>
            <div className={styles.cardSubtitle}>JSON структура метаданных научной публикации</div>
          </div>
          
          <div className={styles.codeTerminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                {isPrintTheme ? (
                  <>
                    {/* Close Icon (X) */}
                    <svg className={styles.terminalIcon} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="5.5" stroke="black"/>
                      <path d="M4 8L8 4M4 4L8 8" stroke="black"/>
                    </svg>
                    {/* Minimize Icon (-) */}
                    <svg className={styles.terminalIcon} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="5.5" stroke="black"/>
                      <path d="M4 6H8" stroke="black"/>
                    </svg>
                    {/* Maximize Icon (Square) */}
                    <svg className={styles.terminalIcon} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="5.5" stroke="black"/>
                      <rect x="3.5" y="3.5" width="5" height="5" stroke="black"/>
                    </svg>
                  </>
                ) : (
                  <>
                    <div className={`${styles.terminalDot} ${styles.red}`}></div>
                    <div className={`${styles.terminalDot} ${styles.yellow}`}></div>
                    <div className={`${styles.terminalDot} ${styles.green}`}></div>
                  </>
                )}
              </div>
              <div className={styles.terminalFilename}>dataset.json</div>
            </div>
            <div className={styles.terminalContent}>
              <pre className={styles.jsonContent}>
                {sampleDatasetRecord}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
); 