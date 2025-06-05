import React from 'react'
import SlideLayout from '../../components/SlideLayout'
import './ConclusionSlide.scss'

export const ConclusionSlide: React.FC = () => {
  return (
    <SlideLayout>
      <div className="conclusion-slide">
        <h1>Заключение</h1>
        <div className="content">
          <p>Выводы по результатам исследования</p>
        </div>
      </div>
    </SlideLayout>
  )
} 