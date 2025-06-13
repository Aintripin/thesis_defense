import React from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './SlideIndicator.module.scss'

const SlideIndicator: React.FC = () => {
  const { currentSlideIndex, totalSlides } = useKeyboardNavigation()
  const { isColorTheme } = useTheme()

  // Don't show on title slide to keep it clean
  if (currentSlideIndex === -1 || currentSlideIndex === 0) {
    return null
  }

  return (
    <div className={`${styles.slideIndicator} ${!isColorTheme ? styles.printMode : ''}`}>
      {!isColorTheme ? (
        // Print mode: Just show the big slide number
        <span className={styles.bigNumber}>{currentSlideIndex + 1}</span>
      ) : (
        // Color mode: Show "X / Y" format
        <>
          <span className={styles.current}>{currentSlideIndex + 1}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.total}>{totalSlides}</span>
        </>
      )}
    </div>
  )
}

export default SlideIndicator 