import React from 'react';
import { motion } from 'framer-motion';
import styles from './DataPreparationSlide.module.scss';
import { useTheme } from '../../contexts/ThemeContext';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const PostgresDbDetails = () => {
    const { isPrintTheme } = useTheme();

    return (
        <motion.div
            variants={sectionVariants}
            className={`${styles.detailsCard} ${isPrintTheme ? styles.printTheme : ''}`}
        >
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Особенности и компромиссы</h3>
            </div>
            <div className={styles.cardContent}>
                <ul className={styles.detailsList}>
                    <li>
                        <strong>Анализ структуры данных:</strong> Изучение JSON-документов для определения общей схемы, типов данных и выявления необязательных полей.
                    </li>
                    <li>
                        <strong>JSONB для первичного импорта:</strong> Использование типа данных JSONB в PostgreSQL для быстрой загрузки исходных данных без строгой валидации схемы. Это позволило сохранить исходную структуру и обеспечить гибкость на начальном этапе.
                    </li>
                    <li>
                        <strong>Создание структурированных таблиц:</strong> Проектирование реляционной схемы на основе анализа данных. Создание таблиц с типизированными колонками, индексами и внешними ключами для обеспечения целостности и производительности.
                    </li>
                    <li>
                        <strong>ETL-процесс:</strong> Написание скриптов для извлечения данных из JSONB, их преобразования и загрузки в новые структурированные таблицы. Этот шаг включал очистку данных, обработку отсутствующих значений и приведение типов.
                    </li>
                </ul>
            </div>
        </motion.div>
    );
};