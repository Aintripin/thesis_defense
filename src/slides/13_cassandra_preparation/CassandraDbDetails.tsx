import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
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

const Code = ({ children, lang = 'bash' }: { children: React.ReactNode, lang?: string }) => (
    <div className={styles.codeBlock}>
        <Terminal size={18} className={styles.codeIcon} />
        <pre><code className={`language-${lang}`}>{children}</code></pre>
    </div>
);

export const CassandraDbDetails = () => (
    <motion.div
        className={styles.detailsContainer}
        variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
        }}
        initial="hidden"
        animate="visible"
    >
        <Section title="Этап 1: Преобразование JSON в NDJSON">
            <p>Python-скрипт конвертации:</p>
            <Code lang="python">
                {`# Преобразование в NDJSON для потоковой обработки
with open("dataset.json", "r") as infile, open("dataset_clean.ndjson", "w") as outfile:
    for item in ijson.items(infile, "item"):
        json.dump(cleaned_item, outfile)
        outfile.write("\\n")`}
            </Code>
            <p className={styles.subheading}>Результат:</p>
            <ul>
                <li>Формат: NDJSON (Newline Delimited JSON)</li>
                <li>Совместимость с утилитой DSBulk для массовой загрузки</li>
            </ul>
        </Section>
        
        <Section title="Этап 4: Создание тестовой таблицы YCSB">
            <Code>
                {`./bin/ycsb load cassandra-cql -P workloads/workloada \\
  -p hosts="localhost" -p cassandra.keyspace="ycsb" \\
  -p recordcount=4894081 -threads 16`}
            </Code>
            <p className={styles.subheading}>Результат:</p>
            <ul>
                <li>Таблица: <code>usertable</code></li>
                <li>Структура: <code>ycsb_key TEXT PRIMARY KEY, ...</code></li>
                <li>Содержимое: временные синтетические данные YCSB</li>
            </ul>
        </Section>

        <Section title="Этап 5: Замещение синтетических данных реальными">
             <p>Python-скрипт трансплантации данных:</p>
            <Code lang="python">
                {`# Чтение из papers_full и обновление usertable
for i, row in enumerate(papers_full_data):
    ycsb_key = f"user{i}"
    session.execute("""
        UPDATE usertable SET field0=?, field1=?, field2=?
        WHERE ycsb_key=?
    """, (row.title, row.authors, row.venue_raw, ycsb_key))`}
            </Code>
            <p className={styles.subheading}>Финальная структура:</p>
            <ul>
                <li>Таблица <code>usertable</code> с 4,894,081 записями</li>
                <li>YCSB-совместимые ключи (<code>user0...</code>)</li>
                <li>Реальные данные в колоночной структуре</li>
            </ul>
        </Section>
    </motion.div>
); 