import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './PublicationsSlide.module.scss';

const PublicationsSlide: React.FC = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.slide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <div className={styles.contentContainer}>
        <div className={styles.mainContentContainer}>
          <div className={styles.slideHeader}>
            <motion.h1 
              className={styles.slideTitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              П У Б Л И К А Ц И И
            </motion.h1>
            <motion.p 
              className={styles.slideSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Научные статьи и доклады
            </motion.p>
          </div>

          <div className={styles.publicationsContainer}>
            {/* Journal Articles Section */}
            <motion.div 
              className={styles.publicationSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.sectionHeader}>
                <div className={`${styles.sectionIcon} ${styles.journal}`}>📄</div>
                <div className={styles.sectionTitle}>Статьи РИНЦ</div>
                <div className={styles.sectionCount}>2</div>
              </div>
              
              <ul className={styles.publicationList}>
                <motion.li 
                  className={styles.publicationItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className={styles.publicationContent}>
                    <div className={styles.publicationNumber}>1</div>
                    <div className={styles.publicationDetails}>
                      <div className={styles.publicationTitle}>
                        Сравнительное исследование производительности графовой и документарной СУБД
                      </div>
                      <div className={styles.publicationAuthors}>
                        Е.А. Кучин, Д.Ю. Уткин, Е.А. Елисеева, Г.И. Ревунков
                      </div>
                      <div className={styles.publicationVenue}>
                        ИИАСУ '23  
                      </div>
                      <div className={styles.publicationMeta}>
                        <span className={styles.publicationYear}>2023</span>
                        <span className={styles.publicationType}>Статья</span>
                        <span className={styles.publicationIndex}>№4</span>
                      </div>
                    </div>
                  </div>
                </motion.li>
                
                <motion.li 
                  className={styles.publicationItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className={styles.publicationContent}>
                    <div className={styles.publicationNumber}>2</div>
                    <div className={styles.publicationDetails}>
                      <div className={styles.publicationTitle}>
                        Сравнительный анализ производительности субд postgresql, mongodb и cassandra с использованием бенчмарка ycsb
                      </div>
                      <div className={styles.publicationAuthors}>
                        Е.А. Кучин, М.В. Виноградова
                      </div>
                      <div className={styles.publicationVenue}>
                        Парадигма
                      </div>
                      <div className={styles.publicationMeta}>
                        <span className={styles.publicationYear}>2025</span>
                        <span className={styles.publicationType}>Статья</span>
                        <span className={styles.publicationIndex}>№5</span>
                      </div>
                    </div>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div 
              className={styles.statsSummary}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className={styles.statsTitle}>Научные публикации</div>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>2</span>
                  <span className={styles.statLabel}>Статьи</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>2023-2025</span>
                  <span className={styles.statLabel}>Период</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>РИНЦ</span>
                  <span className={styles.statLabel}>Индексация</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PublicationsSlide }; 