import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Slide9Content } from './09_dataset_selection/_Slide9Content';
import { Slide10Content } from './10_dataset_selection/_Slide10Content';
import styles from './DatasetSlides.module.scss';
import { SlideHeading } from '../../components/SlideHeading';

// Import BMSTU logo assets
import BMSTULogoPNG from '../../assets/bmstu-logo-white.png';
import BMSTULogoSVG from '../../assets/bmstu-logo-white.svg';

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

  const logoRef = useRef<HTMLImageElement>(null);

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
            <motion.img 
              ref={logoRef}
              src={BMSTULogoPNG}
              alt="BMSTU Logo" 
              className={styles.bmstuEmblem}
              onLoad={() => {
                // Try switching to SVG after PNG loads
                if (logoRef.current) {
                  const target = logoRef.current;
                  target.src = BMSTULogoSVG;
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.8,
                ease: "easeOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
