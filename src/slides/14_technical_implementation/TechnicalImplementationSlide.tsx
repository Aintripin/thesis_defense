import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechnicalImplementationSlide.module.scss';

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
    <div className={styles.technicalImplementationSlide}>
      {/* Title Container */}
      <motion.div
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>ТЕХНИЧЕСКАЯ РЕАЛИЗАЦИЯ ЗАГРУЗКИ</h1>
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.contentGrid}>
          
          {/* Challenges Section */}
          <motion.div 
            className={styles.challengesSection}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.challengesContent}>
              <h2 className={styles.sectionTitle}>Основные технические вызовы:</h2>
              <motion.div className={styles.miniCardsContainer} variants={containerVariants}>
                <motion.div className={styles.miniCard} variants={cardVariants}>
                  <div className={styles.miniCardIcon}></div>
                  <div className={styles.miniCardText}>Различия в форматах данных между СУБД</div>
                </motion.div>
                <motion.div className={styles.miniCard} variants={cardVariants}>
                  <div className={styles.miniCardIcon}></div>
                  <div className={styles.miniCardText}>Совместимость драйверов и API</div>
                </motion.div>
                <motion.div className={styles.miniCard} variants={cardVariants}>
                  <div className={styles.miniCardIcon}></div>
                  <div className={styles.miniCardText}>Оптимизация процесса загрузки для больших объемов</div>
                </motion.div>
                <motion.div className={styles.miniCard} variants={cardVariants}>
                  <div className={styles.miniCardIcon}></div>
                  <div className={styles.miniCardText}>Обеспечение целостности данных при трансформации</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            className={styles.resultsSection}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className={styles.resultsTitle}>Результаты технической реализации:</h2>
            <div className={styles.resultsContent}>
              <motion.div className={styles.miniCardsContainer} variants={containerVariants}>
                <motion.div className={styles.miniCard} variants={cardVariants}>
                  <div className={styles.miniCardIcon}></div>
                  <div className={styles.miniCardText}>Успешная загрузка 4,894,081 записей во все три СУБД</div>
                </motion.div>
                <motion.div className={styles.miniCard} variants={cardVariants}>
                  <div className={styles.miniCardIcon}></div>
                  <div className={styles.miniCardText}>Сохранение целостности данных при всех трансформациях</div>
                </motion.div>
                <motion.div className={styles.miniCard} variants={cardVariants}>
                  <div className={styles.miniCardIcon}></div>
                  <div className={styles.miniCardText}>Подготовка единообразных тестовых таблиц</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Databases Section */}
          <div className={styles.databasesSection}>
            
            {/* MongoDB Card */}
            <motion.div 
              className={`${styles.dbCard} ${styles.mongodbCard}`}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.dbTitleContainer}>
                <div className={styles.dbTitle}>MongoDB</div>
              </div>
              <div className={styles.dbContent}>
                <motion.div className={styles.miniCardsContainer} variants={containerVariants}>
                  <motion.div className={styles.miniCard} variants={cardVariants}>
                    <div className={styles.miniCardIcon}></div>
                    <div className={styles.miniCardText}>Прямое использование mongoimport для JSON</div>
                  </motion.div>
                  <motion.div className={styles.miniCard} variants={cardVariants}>
                    <div className={styles.miniCardIcon}></div>
                    <div className={styles.miniCardText}>Настройка параметров импорта для оптимизации скорости</div>
                  </motion.div>
                  <motion.div className={styles.miniCard} variants={cardVariants}>
                    <div className={styles.miniCardIcon}></div>
                    <div className={styles.miniCardText}>Создание индексов после загрузки для минимизации времени</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* PostgreSQL Card */}
            <motion.div 
              className={`${styles.dbCard} ${styles.postgresqlCard}`}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.dbTitleContainer}>
                <div className={styles.dbTitle}>PostgreSQL</div>
              </div>
              <div className={styles.dbContent}>
                <motion.div className={styles.miniCardsContainer} variants={containerVariants}>
                  <motion.div className={styles.miniCard} variants={cardVariants}>
                    <div className={styles.miniCardIcon}></div>
                    <div className={styles.miniCardText}>Пакетная загрузка с использованием psycopg2-binary</div>
                  </motion.div>
                  <motion.div className={styles.miniCard} variants={cardVariants}>
                    <div className={styles.miniCardIcon}></div>
                    <div className={styles.miniCardText}>Оптимизация SQL-запросов для трансформации JSON в реляционную структуру</div>
                  </motion.div>
                  <motion.div className={styles.miniCard} variants={cardVariants}>
                    <div className={styles.miniCardIcon}></div>
                    <div className={styles.miniCardText}>Использование COPY для быстрой загрузки больших объемов</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Cassandra Card */}
            <motion.div 
              className={`${styles.dbCard} ${styles.cassandraCard}`}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.dbTitleContainer}>
                <div className={styles.dbTitle}>Cassandra</div>
              </div>
              <div className={styles.dbContent}>
                <motion.div className={styles.miniCardsContainer} variants={containerVariants}>
                  <motion.div className={styles.miniCard} variants={cardVariants}>
                    <div className={styles.miniCardIcon}></div>
                    <div className={styles.miniCardText}>Предобработка данных (JSON → NDJSON, выравнивание, валидация данных)</div>
                  </motion.div>
                  <motion.div className={styles.miniCard} variants={cardVariants}>
                    <div className={styles.miniCardIcon}></div>
                    <div className={styles.miniCardText}>Конфигурация DSBulk (создание конфигурационных файлов, настройка маппинга полей м/источником и целевой схемой, оптимизация параметров загрузки)</div>
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