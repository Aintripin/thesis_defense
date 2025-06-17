import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Key, FileCode, CheckCircle } from 'lucide-react';
import styles from './DataPreparationSlide.module.scss';

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <motion.div variants={stepVariants} className={styles.detailStep}>
        <h4 className={styles.stepTitle}>{title}</h4>
        <div className={styles.stepDescription}>
            {children}
        </div>
    </motion.div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.codeBlock}>
        <Terminal size={18} className={styles.codeIcon} />
        <pre>{children}</pre>
    </div>
);

export const PostgresDbDetails = () => (
    <motion.div
        className={styles.detailsContainer}
        variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
        }}
        initial="hidden"
        animate="visible"
    >
        <Section title="Этап 1: Создание промежуточной таблицы">
            <Code>
                {`CREATE TABLE publications (
    _id VARCHAR(255),
    data JSONB
);`}
            </Code>
            <p className={styles.subheading}>Результат:</p>
            <ul>
                <li>Готовность к импорту данных из MongoDB</li>
            </ul>
        </Section>
        
        <Section title="Этап 2: Импорт данных из MongoDB">
            <Code>
                {`# Миграция данных батчами по 100 записей
for batch in pymongo.find().batch_size(100):
    # ... executemany call ...`}
            </Code>
            <p className={styles.subheading}>Результат:</p>
            <ul>
                <li>Количество записей: 4,894,081</li>
                <li>Содержимое: полные JSON-документы в JSONB-формате</li>
                <li>Очищенные данные без некорректных символов</li>
            </ul>
        </Section>

        <Section title="Этап 3: Создание тестовой таблицы YCSB">
            <Code>
                {`./bin/ycsb load jdbc -P workloads/workloada \\
  -p db.url="jdbc:postgresql://localhost/ycsb" \\
  -p recordcount=4894081 -threads 16`}
            </Code>
            <p className={styles.subheading}>Результат:</p>
            <ul>
                <li>Структура: <code>ycsb_key</code>, <code>field0</code>-<code>field9</code></li>
                <li>Содержимое: временные синтетические данные YCSB</li>
            </ul>
        </Section>

        <Section title="Этап 4: Создание структурированной таблицы">
            <Code>
                {`CREATE TABLE publications_structured (
    id VARCHAR(255), title TEXT, year INTEGER, 
    authors JSONB, abstract TEXT
);`}
            </Code>
            <p className={styles.subheading}>Результат:</p>
            <ul>
                <li>Таблица: <code>publications_structured</code></li>
                <li>Структура: строго типизированные колонки</li>
                <li>Готовность к реляционным операциям</li>
            </ul>
        </Section>
    </motion.div>
); 