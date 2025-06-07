import React from 'react';
import { motion } from 'framer-motion';

const selectedDatasetInfo = [
  {
    label: "Источник:",
    value: "Метаданные научных публикаций в JSON-формате"
  },
  {
    label: "Объём:",
    value: "~12 ГБ"
  },
  {
    label: "Количество записей:",
    value: "4,894,081"
  },
  {
    label: "Структура:",
    value: "Сложные вложенные JSON-документы с метаданными публикаций"
  }
];

const datasetAdvantages = [
  {
    label: "Реалистичность:",
    value: "отражает типичную структуру данных современных приложений"
  },
  {
    label: "Сложность структуры:",
    value: "содержит вложенные объекты, массивы, различные типы данных"
  },
  {
    label: "Масштаб:",
    value: "достаточный объем для выявления характеристик производительности"
  },
  {
    label: "Универсальность:",
    value: "подходит для тестирования различных моделей данных"
  }
];

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
}

const InfoItem: React.FC<InfoItemProps> = ({ item }) => (
  <motion.li
    variants={itemVariants}
    className="info-item"
  >
    <div className="bullet" />
    <span>
      {item.label && <span className="label">{item.label}</span>}
      <span className="value">{item.value}</span>
    </span>
  </motion.li>
);

export const Slide9Content: React.FC = () => (
  <motion.div
    className="main-content"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit={{ opacity: 0 }}
  >
    {/* Section 1: Выбранный датасет */}
    <motion.div
      className="section"
      variants={sectionVariants}
    >
      <div className="section-header">
        Выбранный датасет
      </div>
      <div className="section-content">
        <ul>
          {selectedDatasetInfo.map((item, index) => (
            <InfoItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </motion.div>
    
    {/* Section 2: Преимущества выбранного датасета */}
    <motion.div
      className="section"
      variants={sectionVariants}
    >
      <div className="section-header">
        Преимущества выбранного датасета
      </div>
      <div className="section-content">
        <ul>
          {datasetAdvantages.map((item, index) => (
            <InfoItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </motion.div>
  </motion.div>
); 