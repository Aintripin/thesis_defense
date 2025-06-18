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
        <Section title="Этап 1: Импорт исходного датасета">
            <Code>mongoimport --db ycsb --collection dblp --file dblp.v12.json --jsonArray</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Количество документов: 4,894,081</li>
                <li>Структура: оригинальная вложенная JSON-структура с полями <code>_id</code>, <code>title</code>, <code>authors</code>, <code>venue</code>, <code>year</code>, <code>n_citation</code>, <code>fos</code>, <code>references</code>, <code>indexed_abstract</code></li>
            </ul>
        </Section>
    ),
    '2': (
        <Section title="Этап 2: Создание тестовой коллекции YCSB">
            <Code>{`./bin/ycsb load mongodb -s -P workloads/workloada
  -p mongodb.url="mongodb://localhost:27017/ycsb"
  -p recordcount=4894081 -threads 16`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Коллекция: <code>usertable</code></li>
                <li>Структура документов: <code>{`{_id: "user<N>", field0: "...", ...}`}</code></li>
                <li>Содержимое: временные синтетические данные YCSB</li>
            </ul>
        </Section>
    ),
    '3': (
        <Section title="Этап 3: Замещение реальными данными">
            <p>Python-скрипт для обновления:</p>
            <Code>{`# Итерация по документам из коллекции dblp
for i, doc in enumerate(dblp_collection.find()):
    user_key = f"user{i}"
    # Обновление документа в usertable реальными данными
    usertable_collection.update_one(
        {"_id": user_key},
        {"$set": {"field0": doc.get("title", ""), 
                  "field1": doc.get("authors", ""), ...}}
    )`}</Code>
        </Section>
    ),
    '4': (
        <Section title="Этап 4: Создание индексов">
            <Code>{'db.usertable.createIndex({"_id": 1})'}</Code>
            <p className={styles.subheading}><b>Финальная структура:</b></p>
            <ul>
                <li>Коллекция <code>usertable</code> с 4,894,081 документами</li>
                <li>YCSB-совместимые ключи (<code>user0</code>, ..., <code>user4894080</code>)</li>
                <li>Реальные данные из исходного датасета</li>
                <li>Индекс по первичному ключу для оптимизации поиска</li>
            </ul>
        </Section>
    )
};

export const DetailedMongoDbFlow = ({ stepsToShow }: { stepsToShow?: (keyof typeof steps)[] }) => {
    
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