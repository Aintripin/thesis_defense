import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './TechnicalOptimizationSlide.module.scss';
import { Settings, Zap, Shield, ChevronUp } from 'lucide-react';

const optimizationData = [
  {
    category: 'Производительность',
    parameter: 'shared_buffers',
    database: 'PostgreSQL',
    change: 'Увеличено до 4GB',
    justification: 'Увеличение разделяемых буферов позволяет большему количеству данных кэшироваться в памяти, значительно сокращая дисковый ввод-вывод и ускоряя выполнение запросов.',
    impact: 'positive',
  },
  {
    category: 'Производительность',
    parameter: 'WiredTiger Cache',
    database: 'MongoDB',
    change: 'Увеличено до 16GB',
    justification: 'Расширение кэша WiredTiger обеспечивает хранение рабочего набора данных в RAM, что минимизирует задержки при чтении и повышает общую пропускную способность.',
    impact: 'positive',
  },
  {
    category: 'Производительность',
    parameter: 'memtable_flush_writers',
    database: 'Cassandra',
    change: 'Увеличено до 4',
    justification: 'Увеличение числа потоков для сброса memtable на диск повышает параллелизм операций записи и предотвращает замедление при высоких нагрузках.',
    impact: 'positive',
  },
  {
    category: 'Надежность',
    parameter: 'wal_level',
    database: 'PostgreSQL',
    change: 'Установлено в "replica"',
    justification: 'Обеспечивает запись достаточной информации в WAL для поддержки репликации и восстановления на определенный момент времени, повышая отказоустойчивость.',
    impact: 'neutral',
  },
  {
    category: 'Масштабируемость',
    parameter: 'max_connections',
    database: 'PostgreSQL',
    change: 'Увеличено до 1000',
    justification: 'Позволяет обслуживать большее количество одновременных клиентских подключений, что критически важно для масштабирования приложений.',
    impact: 'neutral',
  },
  {
    category: 'Масштабируемость',
    parameter: 'maxIncomingConnections',
    database: 'MongoDB',
    change: 'Увеличено до 1000',
    justification: 'Аналогично PostgreSQL, увеличивает лимит одновременных подключений для поддержки роста пользовательской базы и нагрузки.',
    impact: 'neutral',
  },
];

type Category = 'Производительность' | 'Надежность' | 'Масштабируемость';

const categoryInfo: Record<Category, { icon: React.ElementType; color: string }> = {
  'Производительность': { icon: Zap, color: 'performance' },
  'Надежность': { icon: Shield, color: 'reliability' },
  'Масштабируемость': { icon: ChevronUp, color: 'scalability' },
};

export const TechnicalOptimizationSlide = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.technicalOptimizationSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <motion.div
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>ОПТИМИЗАЦИЯ КОНФИГУРАЦИЙ СУБД</h1>
      </motion.div>
      
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.tableContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <table className={styles.optimizationTable}>
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.headerCell}>Категория</th>
                <th className={styles.headerCell}>Параметр</th>
                <th className={styles.headerCell}>СУБД</th>
                <th className={styles.headerCell}>Изменение</th>
                <th className={styles.headerCell}>Обоснование и Влияние</th>
              </tr>
            </thead>
            <tbody>
              {optimizationData.map((item, index) => {
                const category = item.category as Category;
                const CategoryIcon = categoryInfo[category].icon;
                const categoryColor = categoryInfo[category].color;

                return (
                  <motion.tr
                    key={index}
                    className={styles.dataRow}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <td className={`${styles.dataCell} ${styles.categoryCell}`}>
                      <div className={`${styles.categoryBadge} ${styles[categoryColor]}`}>
                        <CategoryIcon size={18} className={styles.categoryIcon} />
                        <span>{item.category}</span>
                      </div>
                    </td>
                    <td className={`${styles.dataCell} ${styles.parameterCell}`}>
                      <code>{item.parameter}</code>
                    </td>
                    <td className={`${styles.dataCell} ${styles.dbCell}`}>
                      {item.database}
                    </td>
                    <td className={`${styles.dataCell} ${styles.changeCell}`}>
                      {item.change}
                    </td>
                    <td className={`${styles.dataCell} ${styles.justificationCell}`}>
                      {item.justification}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}; 