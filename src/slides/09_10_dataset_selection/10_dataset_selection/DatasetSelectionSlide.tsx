import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './DatasetSelectionSlide.scss';

// Import BMSTU logo assets
import BMSTULogoPNG from '../../../assets/bmstu-logo-white.png';
import BMSTULogoSVG from '../../../assets/bmstu-logo-white.svg';

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
}

const InfoItem: React.FC<InfoItemProps> = ({ item, index }) => (
  <motion.li
    variants={itemVariants}
    className="info-item"
  >
    <div className="bullet" />
    <span>
      {item.label && (
        <span className={item.isHighlighted ? "highlight" : "label"}>
          {item.label}
        </span>
      )}{' '}
      <span className={`value ${item.isLongText ? 'long-text' : ''}`}>{item.value}</span>
    </span>
  </motion.li>
);

export const DatasetSelectionSlide: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);

  return (
    <div className="dataset-selection-slide">
      {/* Title Container */}
      <motion.div
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">В Ы Б О Р&nbsp;&nbsp;И&nbsp;&nbsp;А Н А Л И З&nbsp;&nbsp;Д А Т А С Е Т А</h1>
      </motion.div>

      {/* Content Container */}
      <div className="content-container">
        {/* Main Content Area */}
        <div className="main-content-area-wrapper">
          <motion.div
            className="main-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {/* Section 1: Структура и особенности данных */}
            <motion.div 
              className="section"
              variants={sectionVariants}
              transition={{ delay: 0.4 }}
            >
              <div className="section-header">
                Структура и особенности данных
              </div>
              <div className="section-content">
                <motion.ul
                  variants={containerVariants}
                  transition={{ delay: 0.8 }}
                >
                  {dataStructureInfo.map((item, index) => (
                    <InfoItem key={index} item={item} index={index} />
                  ))}
                </motion.ul>
              </div>
            </motion.div>
            
            {/* Section 2: Вызовы для различных СУБД */}
            <motion.div 
              className="section"
              variants={sectionVariants}
              transition={{ delay: 1.0 }}
            >
              <div className="section-header">
                Вызовы для различных СУБД
              </div>
              <div className="section-content">
                <motion.ul
                  variants={containerVariants}
                  transition={{ delay: 1.4 }}
                >
                  {dbmsChallenges.map((item, index) => (
                    <InfoItem key={index} item={item} index={index} />
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            {/* Section 3: Значение для тестирования */}
            <motion.div 
              className="section"
              variants={sectionVariants}
              transition={{ delay: 1.6 }}
            >
              <div className="section-header">
                Значение для тестирования
              </div>
              <div className="section-content">
                <motion.ul
                  variants={containerVariants}
                  transition={{ delay: 2.0 }}
                >
                  {testingSignificance.map((item, index) => (
                    <InfoItem key={index} item={item} index={index} />
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>

          {/* BMSTU Logo Emblem */}
          <motion.div
            className="emblem-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.img 
              ref={logoRef}
              className="bmstu-emblem"
              src={BMSTULogoPNG}
              alt="BMSTU Logo"
              onLoad={() => {
                // Try switching to SVG after PNG loads
                if (logoRef.current) {
                  const target = logoRef.current;
                  target.src = BMSTULogoSVG;
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.8,
                ease: "easeOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 