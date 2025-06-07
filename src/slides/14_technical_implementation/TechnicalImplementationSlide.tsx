import React from 'react';
import { motion } from 'framer-motion';
import './TechnicalImplementationSlide.scss';

// Animation variants
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

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
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

export const TechnicalImplementationSlide = () => {
  return (
    <div className="technical-implementation-slide">
      {/* Title Container */}
      <motion.div
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">ТЕХНИЧЕСКАЯ РЕАЛИЗАЦИЯ ЗАГРУЗКИ</h1>
      </motion.div>

      {/* Content Container */}
      <div className="content-container">
        <div className="content-grid">
          
          {/* Challenges Section */}
          <motion.div 
            className="challenges-section"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="challenges-content">
              <h2 className="section-title">Основные технические вызовы:</h2>
              <motion.div className="mini-cards-container" variants={containerVariants}>
                <motion.div className="mini-card" variants={cardVariants}>
                  <div className="mini-card-icon"></div>
                  <div className="mini-card-text">Различия в форматах данных между СУБД</div>
                </motion.div>
                <motion.div className="mini-card" variants={cardVariants}>
                  <div className="mini-card-icon"></div>
                  <div className="mini-card-text">Совместимость драйверов и API</div>
                </motion.div>
                <motion.div className="mini-card" variants={cardVariants}>
                  <div className="mini-card-icon"></div>
                  <div className="mini-card-text">Оптимизация процесса загрузки для больших объемов</div>
                </motion.div>
                <motion.div className="mini-card" variants={cardVariants}>
                  <div className="mini-card-icon"></div>
                  <div className="mini-card-text">Обеспечение целостности данных при трансформации</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            className="results-section"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="results-title">Результаты технической реализации:</h2>
            <div className="results-content">
              <motion.div className="mini-cards-container" variants={containerVariants}>
                <motion.div className="mini-card" variants={cardVariants}>
                  <div className="mini-card-icon"></div>
                  <div className="mini-card-text">Успешная загрузка 4,894,081 записей во все три СУБД</div>
                </motion.div>
                <motion.div className="mini-card" variants={cardVariants}>
                  <div className="mini-card-icon"></div>
                  <div className="mini-card-text">Сохранение целостности данных при всех трансформациях</div>
                </motion.div>
                <motion.div className="mini-card" variants={cardVariants}>
                  <div className="mini-card-icon"></div>
                  <div className="mini-card-text">Подготовка единообразных тестовых таблиц</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Databases Section */}
          <div className="databases-section">
            
            {/* MongoDB Card */}
            <motion.div 
              className="db-card mongodb-card"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="db-title-container">
                <div className="db-title">MongoDB</div>
              </div>
              <div className="db-content">
                <motion.div className="mini-cards-container" variants={containerVariants}>
                  <motion.div className="mini-card" variants={cardVariants}>
                    <div className="mini-card-icon"></div>
                    <div className="mini-card-text">Прямое использование mongoimport для JSON</div>
                  </motion.div>
                  <motion.div className="mini-card" variants={cardVariants}>
                    <div className="mini-card-icon"></div>
                    <div className="mini-card-text">Настройка параметров импорта для оптимизации скорости</div>
                  </motion.div>
                  <motion.div className="mini-card" variants={cardVariants}>
                    <div className="mini-card-icon"></div>
                    <div className="mini-card-text">Создание индексов после загрузки для минимизации времени</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* PostgreSQL Card */}
            <motion.div 
              className="db-card postgresql-card"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="db-title-container">
                <div className="db-title">PostgreSQL</div>
              </div>
              <div className="db-content">
                <motion.div className="mini-cards-container" variants={containerVariants}>
                  <motion.div className="mini-card" variants={cardVariants}>
                    <div className="mini-card-icon"></div>
                    <div className="mini-card-text">Пакетная загрузка с использованием psycopg2-binary</div>
                  </motion.div>
                  <motion.div className="mini-card" variants={cardVariants}>
                    <div className="mini-card-icon"></div>
                    <div className="mini-card-text">Оптимизация SQL-запросов для трансформации JSON в реляционную структуру</div>
                  </motion.div>
                  <motion.div className="mini-card" variants={cardVariants}>
                    <div className="mini-card-icon"></div>
                    <div className="mini-card-text">Использование COPY для быстрой загрузки больших объемов</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Cassandra Card */}
            <motion.div 
              className="db-card cassandra-card"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="db-title-container">
                <div className="db-title">Cassandra</div>
              </div>
              <div className="db-content">
                <motion.div className="mini-cards-container" variants={containerVariants}>
                  <motion.div className="mini-card" variants={cardVariants}>
                    <div className="mini-card-icon"></div>
                    <div className="mini-card-text">Предобработка данных (JSON → NDJSON, выравнивание, валидация данных)</div>
                  </motion.div>
                  <motion.div className="mini-card" variants={cardVariants}>
                    <div className="mini-card-icon"></div>
                    <div className="mini-card-text">Конфигурация DSBulk (создание конфигурационных файлов, настройка маппинга полей м/источником и целевой схемой, оптимизация параметров загрузки)</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}; 