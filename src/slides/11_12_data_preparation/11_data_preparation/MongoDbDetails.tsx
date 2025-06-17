import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Database, Key, FileCode, CheckCircle } from 'lucide-react';
import styles from './DataPreparationSlide.module.scss';

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export const MongoDbDetails = () => (
  <motion.div
    className={styles.detailsContainer}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
    }}
    initial="hidden"
    animate="visible"
  >
    <motion.div variants={stepVariants} className={styles.detailStep}>
      <div className={styles.stepHeader}>
        <div className={styles.stepIcon}><FileCode size={24} /></div>
        <h4 className={styles.stepTitle}>Этап 1: Импорт исходного датасета (Блоки 0 и 1)</h4>
      </div>
      <p className={styles.stepDescription}>
        Первичная загрузка JSON-файла (12 ГБ, 4.8 млн записей) в "сырую" коллекцию <code>dblp</code> для сохранения оригинальной структуры.
      </p>
      <div className={styles.codeBlock}>
        <Terminal size={18} className={styles.codeIcon} />
        <pre>mongoimport --db ycsb --collection dblp --file dblp.v12.json --jsonArray</pre>
      </div>
    </motion.div>

    <motion.div variants={stepVariants} className={styles.detailStep}>
      <div className={styles.stepHeader}>
        <div className={styles.stepIcon}><Key size={24} /></div>
        <h4 className={styles.stepTitle}>Этап 2: Создание тестовой коллекции (Блок 2)</h4>
      </div>
      <p className={styles.stepDescription}>
        Запуск <code>ycsb load</code> для создания таблицы <code>usertable</code> со стандартными ключами YCSB (<code>user&lt;N&gt;</code>) и синтетическими данными.
      </p>
       <div className={styles.codeBlock}>
        <Terminal size={18} className={styles.codeIcon} />
        <pre>./bin/ycsb load mongodb -P workloads/workloada -p recordcount=4894081 ...</pre>
      </div>
    </motion.div>

    <motion.div variants={stepVariants} className={styles.detailStep}>
      <div className={styles.stepHeader}>
        <div className={styles.stepIcon}><Database size={24} /></div>
        <h4 className={styles.stepTitle}>Этап 3: Заполнение реальными данными (Блок 3)</h4>
      </div>
      <p className={styles.stepDescription}>
        Python-скрипт переносит данные из <code>dblp</code> в <code>usertable</code>, замещая синтетические поля реальными, но сохраняя YCSB-ключи.
      </p>
    </motion.div>

    <motion.div variants={stepVariants} className={styles.detailStep}>
      <div className={styles.stepHeader}>
        <div className={styles.stepIcon}><CheckCircle size={24} /></div>
        <h4 className={styles.stepTitle}>Этап 4: Создание индексов (Блок 4)</h4>
      </div>
      <p className={styles.stepDescription}>
        Создание индекса по полю <code>_id</code> в коллекции <code>usertable</code> для ускорения поиска в ходе тестирования.
      </p>
    </motion.div>
  </motion.div>
); 