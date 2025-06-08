import React from 'react'
import SlideLayout from '../../components/SlideLayout'
import styles from './ConclusionSlide.module.scss'

export const ConclusionSlide: React.FC = () => {
  return (
    <SlideLayout>
      <div className={styles.conclusionSlide}>
        <h1>Заключение</h1>
        <div className="content">
          <p>Выводы по результатам исследования</p>
        </div>
      </div>
    </SlideLayout>
  )
} 