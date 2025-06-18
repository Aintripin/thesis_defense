import React from 'react';
import { motion } from 'framer-motion';
import styles from './RecommendationsSlide.module.scss';
import CassandraLogo from '../../assets/apachecassandra.svg';
import PostgresLogo from '../../assets/postgresql.svg';
import MongoLogo from '../../assets/mongodb.svg';
import { Target, BarChart3, Key } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: 'easeOut'
    }
  })
};

const RecommendationsSlide = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.slideContainer} ${isPrintTheme ? styles.printTheme : ''}`}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className={styles.title}>Рекомендации по выбору СУБД</h1>
        <p className={styles.subtitle}>На основе результатов сравнительного анализа производительности</p>
      </motion.div>

      <div className={styles.recommendationsGrid}>
        {/* Cassandra */}
        <motion.div 
          className={`${styles.recommendationCard} ${styles.cassandraCard}`}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className={styles.cardHeader}>
            <div className={`${styles.dbIcon} ${styles.cassandraIcon}`}><img src={CassandraLogo} alt="Cassandra Logo" /></div>
            <div>
              <h3 className={styles.cardTitle}>Apache Cassandra</h3>
              <span className={styles.performanceBadge}>🏆 Лидер CRUD-операций</span>
            </div>
          </div>
          <div className={styles.useCases}>
            <h4><Target size={20} className={styles.h4Icon} /> Оптимальные сценарии:</h4>
            <ul className={styles.useCaseList}>
              <li>Высокая интенсивность записи</li>
              <li>Системы логирования и мониторинга</li>
              <li>Временные ряды данных</li>
              <li>Распределенные системы</li>
              <li>Требования низких задержек записи</li>
            </ul>
          </div>
          <div className={styles.metrics}>
            <h5><BarChart3 size={20} className={styles.h5Icon} /> Ключевые показатели</h5>
            <div className={styles.metricItem}>
              <span>Пик пропускной способности:</span>
              <span className={styles.metricValue}>29.2k ops/sec</span>
            </div>
            <div className={styles.metricItem}>
              <span>Workload A-C (смешанные):</span>
              <span className={styles.metricValue}>24-29k ops/sec</span>
            </div>
            <div className={styles.metricItem}>
              <span>Оптимальный параллелизм:</span>
              <span className={styles.metricValue}>32 потока</span>
            </div>
          </div>
        </motion.div>

        {/* PostgreSQL */}
        <motion.div 
          className={`${styles.recommendationCard} ${styles.postgresqlCard}`}
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className={styles.cardHeader}>
            <div className={`${styles.dbIcon} ${styles.postgresqlIcon}`}><img src={PostgresLogo} alt="PostgreSQL Logo" /></div>
            <div>
              <h3 className={styles.cardTitle}>PostgreSQL</h3>
              <span className={styles.performanceBadge}>🔥 Лучший для "горячих" данных</span>
            </div>
          </div>
          <div className={styles.useCases}>
            <h4><Target size={20} className={styles.h4Icon} /> Оптимальные сценарии:</h4>
            <ul className={styles.useCaseList}>
              <li>Чтение недавних данных</li>
              <li>Аналитика в реальном времени</li>
              <li>Транзакционные системы</li>
              <li>Сложные SQL-запросы</li>
              <li>Гибридные JSON + реляционные</li>
            </ul>
          </div>
          <div className={styles.metrics}>
            <h5><BarChart3 size={20} className={styles.h5Icon} /> Ключевые показатели</h5>
            <div className={styles.metricItem}>
              <span>Workload D (горячие данные):</span>
              <span className={styles.metricValue}>55.8k ops/sec</span>
            </div>
            <div className={styles.metricItem}>
              <span>Workload C (только чтение):</span>
              <span className={styles.metricValue}>18.5k ops/sec</span>
            </div>
            <div className={styles.metricItem}>
              <span>Пик масштабируемости:</span>
              <span className={styles.metricValue}>128 потоков</span>
            </div>
          </div>
        </motion.div>

        {/* MongoDB */}
        <motion.div 
          className={`${styles.recommendationCard} ${styles.mongodbCard}`}
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className={styles.cardHeader}>
            <div className={`${styles.dbIcon} ${styles.mongodbIcon}`}><img src={MongoLogo} alt="MongoDB Logo" /></div>
            <div>
              <h3 className={styles.cardTitle}>MongoDB</h3>
              <span className={styles.performanceBadge}>⚡ Лидер сканирования</span>
            </div>
          </div>
          <div className={styles.useCases}>
            <h4><Target size={20} className={styles.h4Icon} /> Оптимальные сценарии:</h4>
            <ul className={styles.useCaseList}>
              <li>Операции сканирования диапазонов</li>
              <li>Документоориентированные данные</li>
              <li>Гибкая схема данных</li>
              <li>Быстрое прототипирование</li>
              <li>Агрегация и аналитика</li>
            </ul>
          </div>
          <div className={styles.metrics}>
            <h5><BarChart3 size={20} className={styles.h5Icon} /> Ключевые показатели</h5>
            <div className={styles.metricItem}>
              <span>Workload D (горячие данные):</span>
              <span className={styles.metricValue}>47.7k ops/sec</span>
            </div>
            <div className={styles.metricItem}>
              <span>Workload E (сканирование):</span>
              <span className={styles.metricValue}>23.9k ops/sec</span>
            </div>
            <div className={styles.metricItem}>
              <span>Стабильность до:</span>
              <span className={styles.metricValue}>128 потоков</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.conclusion}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
      >
        <h3><Key size={20} className={styles.conclusionIcon} /> Ключевой вывод</h3>
        <p>Не существует универсального решения — выбор СУБД должен основываться на конкретных паттернах нагрузки приложения</p>
      </motion.div>
    </div>
  );
};

export default RecommendationsSlide; 