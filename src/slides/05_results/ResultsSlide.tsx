import React from 'react'
import SlideLayout from '../../components/SlideLayout'
import './ResultsSlide.scss'

export const ResultsSlide: React.FC = () => {
  return (
    <SlideLayout>
      <div className="results-slide">
        <h1>Результаты</h1>
        <div className="content">
          <p>Результаты тестирования производительности</p>
        </div>
      </div>
    </SlideLayout>
  )
} 