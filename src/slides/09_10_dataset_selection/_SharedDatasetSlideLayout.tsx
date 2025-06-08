import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide9Content } from './09_dataset_selection/_Slide9Content';
import { Slide10Content } from './10_dataset_selection/_Slide10Content';
import styles from './DatasetSlides.module.scss';

interface SharedLayoutProps {
  subSlide: number;
}

const slideContents = [
  { component: Slide9Content },
  { component: Slide10Content }
];

export const SharedDatasetSlideLayout: React.FC<SharedLayoutProps> = ({ subSlide }) => {
  const CurrentContent = slideContents[subSlide].component;

  return (
    <div className={`${styles.datasetSelectionSlide} ${subSlide === 0 ? styles.slide9 : styles.slide10}`}>
      {/* Title Container */}
      <motion.div
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>В Ы Б О Р&nbsp;&nbsp;И&nbsp;&nbsp;А Н А Л И З&nbsp;&nbsp;Д А Т А С Е Т А</h1>
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        {/* Sidebar */}
        <motion.div
          className={styles.sidebar}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>ВЫБОР И АНАЛИЗ ДАТАСЕТА</h2>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className={styles.mainContentAreaWrapper}>
          <AnimatePresence mode="wait">
            <CurrentContent />
          </AnimatePresence>

          {/* BMSTU Logo Emblem */}
          <motion.div
            className={styles.emblemContainer}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img 
              src="/assets/bmstu/bmstu-logo-white.png" 
              alt="BMSTU Logo" 
              className={styles.bmstuEmblem}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/assets/bmstu/bmstu-logo-white.svg";
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
