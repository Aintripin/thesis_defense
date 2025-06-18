import React from 'react';
import { Terminal } from 'lucide-react';
import styles from './DataPreparationSlide.module.scss';
import { motion } from 'framer-motion';

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

const Code = ({ children }: { children: string }) => (
    <div className={styles.codeBlock}>
        <Terminal size={18} className={styles.codeIcon} />
        <pre>{children}</pre>
    </div>
);

const steps = {
    '1': (
        <Section title="Этап 1: Создание промежуточной таблицы">
            <Code>{`CREATE TABLE publications (
    _id VARCHAR(255),
    data JSONB
);`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Готовность к импорту данных из MongoDB</li>
            </ul>
        </Section>
    ),
    '2': (
        <Section title="Этап 2: Импорт данных из MongoDB">
            <p>Python-скрипт:</p>
            <Code>{`# Миграция данных батчами по 100 записей
for batch in pymongo.find().batch_size(100):
    # ...
    cursor.executemany(...)`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Содержимое: полные JSON-документы в JSONB-формате</li>
            </ul>
        </Section>
    ),
    '3': (
        <Section title="Этап 3: Создание тестовой таблицы YCSB">
            <Code>{`./bin/ycsb load jdbc -P workloads/workloada
  -p db.url="jdbc:postgresql://localhost/ycsb"
  -p recordcount=4894081 -threads 16`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Содержимое: временные синтетические данные YCSB</li>
            </ul>
        </Section>
    ),
    '4': (
        <Section title="Этап 4: Создание структурированной таблицы">
            <p>SQL-команда:</p>
            <Code>{`CREATE TABLE publications_structured (
    id VARCHAR(255), title TEXT, year INTEGER, 
    authors JSONB, abstract TEXT
);`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Структура: строго типизированные колонки</li>
            </ul>
        </Section>
    ),
    '5': (
        <Section title="Этап 5: Трансформация в реляционную структуру">
            <p>SQL-запрос с JSON-операторами:</p>
            <Code>{`INSERT INTO publications_structured (id, title, year, authors, abstract)
SELECT _id, data->>'title', (data->>'year')::integer, 
       data->'authors', data->>'abstract'
FROM publications;`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Извлечение данных из JSONB в типизированные колонки</li>
                <li>Преобразование документной модели в реляционную</li>
            </ul>
        </Section>
    ),
    '6': (
        <Section title="Этап 6: Замещение синтетических данных реальными">
            <p>SQL UPDATE с JOIN:</p>
            <Code>{`UPDATE usertable SET field0 = p.title, field1 = p.authors::text
FROM (SELECT ROW_NUMBER() OVER () as rn, * FROM publications_structured) p
WHERE usertable.ycsb_key = 'user' || (p.rn - 1);`}</Code>
            <p className={styles.subheading}><b>Финальная структура:</b></p>
            <ul>
                <li>Таблица usertable с реальными данными</li>
                <li>YCSB-совместимые ключи (user0...)</li>
            </ul>
        </Section>
    )
};

export const DetailedPostgresDbFlow = ({ stepsToShow }: { stepsToShow?: (keyof typeof steps)[] }) => {
    
    const stepsToRender = stepsToShow ? stepsToShow.map(key => steps[key]) : Object.values(steps);

    return (
        <motion.div
            className={styles.detailsContainer}
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
            }}
            initial="hidden"
            animate="visible"
        >
            {stepsToRender}
        </motion.div>
    );
}; 