import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, ArrowRight, Layers } from 'lucide-react';
import styles from './DataPreparation.module.scss';

interface DataPreparationProps {
  detailed?: boolean;
}

const DataPreparation: React.FC<DataPreparationProps> = ({ detailed = false }) => {
  const databases = [
    {
      name: 'PostgreSQL',
      icon: '🐘',
      process: 'JSONB→Tables',
      detail: 'Normalization',
      color: '#336791',
      bgColor: '#e8f4fd'
    },
    {
      name: 'MongoDB',
      icon: '🍃',
      process: 'Direct Import',
      detail: 'mongoimport',
      color: '#4db33d',
      bgColor: '#e8f5e8'
    },
    {
      name: 'Cassandra',
      icon: '🗃️',
      process: 'NDJSON→DSBulk',
      detail: 'Denormalization',
      color: '#ff6b35',
      bgColor: '#fff0e6'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`${styles.dataPreparation} ${detailed ? styles.detailed : ''}`}>
      {detailed && (
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Data Preparation Phase
        </motion.h2>
      )}
      
      <motion.div 
        className={styles.dataFlow}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Source Dataset */}
        <motion.div 
          className={styles.sourceBox}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className={styles.iconContainer}>
            <FileText size={24} />
          </div>
          <div className={styles.boxContent}>
            <h3>JSON Dataset</h3>
            <div className={styles.stats}>
              <span className={styles.stat}>12 GB</span>
              <span className={styles.stat}>4,894,081 records</span>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div 
          className={styles.flowArrow}
          variants={itemVariants}
          animate={{
            x: [0, 5, 0],
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }
          }}
        >
          <ArrowRight size={24} />
        </motion.div>

        {/* Database Targets */}
        <motion.div 
          className={styles.databaseTargets}
          variants={containerVariants}
        >
          {databases.map((db, index) => (
            <motion.div
              key={db.name}
              className={styles.databaseBox}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              style={{ 
                '--db-color': db.color,
                '--db-bg': db.bgColor 
              } as React.CSSProperties}
            >
              <div className={styles.dbIcon}>{db.icon}</div>
              <div className={styles.dbInfo}>
                <h4>{db.name}</h4>
                <div className={styles.dbProcess}>{db.process}</div>
                <div className={styles.dbDetail}>{db.detail}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrow to YCSB */}
        <motion.div 
          className={styles.flowArrow}
          variants={itemVariants}
          animate={{
            x: [0, 5, 0],
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.5
            }
          }}
        >
          <ArrowRight size={24} />
        </motion.div>

        {/* YCSB Compatible Tables */}
        <motion.div 
          className={styles.ycsbBox}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className={`${styles.iconContainer} ${styles.ycsb}`}>
            <Layers size={24} />
          </div>
          <div className={styles.boxContent}>
            <h3>YCSB-Compatible</h3>
            <div className={styles.ycsbDetail}>Tables</div>
          </div>
        </motion.div>
      </motion.div>

      {detailed && (
        <motion.div 
          className={styles.tableStructureDetail}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>YCSB Table Structure</h3>
          <div className={styles.structureGrid}>
            <div className={styles.structureItem}>
              <h4>Schema</h4>
              <code>
                CREATE TABLE usertable (<br/>
                &nbsp;&nbsp;YCSB_KEY VARCHAR(255) PRIMARY KEY,<br/>
                &nbsp;&nbsp;FIELD0 TEXT,<br/>
                &nbsp;&nbsp;FIELD1 TEXT,<br/>
                &nbsp;&nbsp;...<br/>
                &nbsp;&nbsp;FIELD9 TEXT<br/>
                );
              </code>
            </div>
            <div className={styles.structureItem}>
              <h4>Data Mapping</h4>
              <div className={styles.mappingList}>
                <div>YCSB_KEY: user0, user1, user2...</div>
                <div>FIELD0: title, authors, abstract...</div>
                <div>FIELD1: venue, year, references...</div>
                <div>FIELD9: indexed_abstract, fos...</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DataPreparation; 