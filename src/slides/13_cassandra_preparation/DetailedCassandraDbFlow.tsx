import React from 'react';
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

const Code = ({ children, lang }: { children: string, lang?: string }) => (
    <div className={styles.codeBlock}>
        <pre><code className={lang ? `language-${lang}` : ''}>{children}</code></pre>
    </div>
);

const steps = {
    '1': (
        <Section title="Этап 1: Преобразование JSON в потоковый формат NDJSON">
            <p>Python-скрипт конвертации:</p>
            <Code lang="python">{`# Преобразование единого JSON-массива в NDJSON для потоковой обработки
with open("dataset.json", "r") as infile, open("dataset_clean.ndjson", "w") as outfile:
    for item in ijson.items(infile, "item"):
        json.dump(cleaned_item, outfile)
        outfile.write("\\n")`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Формат: NDJSON (Newline Delimited JSON)</li>
            </ul>
        </Section>
    ),
    '2': (
        <Section title="Этап 2: Выравнивание структуры данных">
            <p>Python-скрипт:</p>
            <Code lang="python">{`# Преобразование вложенной структуры в плоскую колоночную модель
def flatten_record(record):
    flat_record["venue_raw"] = record["venue"]["raw"]
    flat_record["authors"] = json.dumps(record["authors"])
    flat_record["paper_references"] = record["references"]`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Извлечение вложенных объектов в отдельные поля</li>
                <li>Сериализация массивов в JSON-строки</li>
            </ul>
        </Section>
    ),
    '3': (
        <Section title="Этап 3: Создание таблицы и массовая загрузка через DSBulk">
            <Code lang="sql">{`CREATE TABLE ycsb.papers_full (
    id text PRIMARY KEY,
    title text, authors text, year int,
    venue_raw text, venue_id int,
    paper_references list<bigint>
);`}</Code>
            <p>Загрузка через DSBulk:</p>
            <Code lang="bash">{`java -Xmx4G -jar dsbulk-1.11.0.jar load -f dsbulk_production.conf
# batch.mode = PARTITION_KEY для оптимизации`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Таблица: <code className={styles.inlineCode}>papers_full</code> с 4,894,081 записями</li>
            </ul>
        </Section>
    ),
    '4': (
        <Section title="Этап 4: Создание тестовой таблицы YCSB">
            <p>Команда создания:</p>
            <Code lang="bash">{`./bin/ycsb load cassandra-cql -P workloads/workloada \\
  -p hosts="localhost" -p cassandra.keyspace="ycsb" \\
  -p recordcount=4894081 -threads 16`}</Code>
            <p className={styles.subheading}><b>Результат:</b></p>
            <ul>
                <li>Содержимое: временные синтетические данные YCSB</li>
            </ul>
        </Section>
    ),
    '5': (
        <Section title="Этап 5: Замещение синтетических данных реальными">
            <p>Python-скрипт трансплантации данных:</p>
            <Code lang="python">{`# Чтение из papers_full и обновление usertable
for i, row in enumerate(papers_full_data):
    ycsb_key = f"user{i}"
    session.execute("""
        UPDATE usertable SET field0=?, field1=?, field2=?
        WHERE ycsb_key=?
    """, (row.title, row.authors, row.venue_raw, ycsb_key))`}</Code>
            <p className={styles.subheading}><b>Финальная структура:</b></p>
            <ul>
                <li>Таблица <code className={styles.inlineCode}>usertable</code> с 4,894,081 записями</li>
                <li>YCSB-совместимые ключи (<code className={styles.inlineCode}>user0</code>, <code className={styles.inlineCode}>user1</code>, ..., <code className={styles.inlineCode}>user4894080</code>)</li>
                <li>Реальные данные в колоночной структуре</li>
            </ul>
        </Section>
    )
};

export const DetailedCassandraDbFlow = ({ stepsToShow }: { stepsToShow?: (keyof typeof steps)[] }) => {
    
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