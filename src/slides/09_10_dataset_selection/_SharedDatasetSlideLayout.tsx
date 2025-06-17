import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Slide9Content } from './09_dataset_selection/_Slide9Content';
import { Slide10Content } from './10_dataset_selection/_Slide10Content';
import styles from './DatasetSlides.module.scss';
import { SlideHeading } from '../../components/SlideHeading';

interface SharedLayoutProps {
  subSlide: number;
}

const slideContents = [
  { component: Slide9Content },
  { component: Slide10Content }
];

export const SharedDatasetSlideLayout: React.FC<SharedLayoutProps> = ({ subSlide }) => {
  const { isPrintTheme } = useTheme();
  const CurrentContent = slideContents[subSlide].component;

  const layoutClasses = `${styles.datasetSelectionSlide} ${subSlide === 0 ? styles.slide9 : styles.slide10} ${isPrintTheme ? styles.printTheme : ''}`;

  return (
    <div className={layoutClasses}>
      <SlideHeading size="small">В Ы Б О Р&nbsp;&nbsp;И&nbsp;&nbsp;А Н А Л И З&nbsp;&nbsp;Д А Т А С Е Т А</SlideHeading>

      {/* Content Container - No sidebar, full width */}
      <div className={styles.contentContainer}>
        {/* Main Content - Full width without sidebar */}
        <div className={styles.mainContentAreaWrapper}>
          <AnimatePresence mode="wait">
            <CurrentContent isPrintTheme={isPrintTheme} />
          </AnimatePresence>

          {/* BMSTU Logo Emblem */}
          <motion.div
            className={styles.emblemContainer}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img 
              src={isPrintTheme ? "/assets/bmstu/bmstu-logo-black.png" : "/assets/bmstu/bmstu-logo-white.png"} 
              alt="BMSTU Logo" 
              className={styles.bmstuEmblem}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = isPrintTheme ? "/assets/bmstu/bmstu-logo-black.svg" : "/assets/bmstu/bmstu-logo-white.svg";
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
