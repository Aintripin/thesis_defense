import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import './TitleSlide.scss'

const TitleSlide: React.FC = () => {
  const navigate = useNavigate()

  const handleStartPresentation = () => {
    navigate('/problem')
  }

  return (
    <div className="title-slide-fullscreen">
      <div className="title-background">
        {/* Background Logo - Large and positioned in corner */}
        <motion.div 
          className="background-logo"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            y: [0, -10, 0]
          }}
          transition={{ 
            delay: 0.6, 
            duration: 2,
            y: {
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }
          }}
        >
          <img 
            src="/assets/bmstu/bmstu-logo-white.png" 
            alt="BMSTU Logo" 
            className="bmstu-logo-background"
            onError={(e) => {
              // Fallback to SVG if PNG fails
              const target = e.target as HTMLImageElement;
              target.src = "/assets/bmstu/bmstu-logo-white.svg";
            }}
          />
        </motion.div>

        {/* Main Content Wrapper with Consistent Left Alignment */}
        <div className="title-main-content">
          <div className="title-content-container">
            {/* University Name */}
            <motion.div 
              className="university-header"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="university-title">
                Московский государственный технический университет им. Н.Э. Баумана
              </h1>
            </motion.div>

            {/* Main Content Area - Centers title vertically */}
            <div className="main-content-area">
              {/* Main Title */}
              <motion.div 
                className="title-section"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h2 className="main-title">
                  <span className="title-line">Исследование производительности</span>
                  <span className="title-line">постреляционных баз данных с</span>
                  <span className="title-line">применением технологий тестирования</span>
                </h2>
              </motion.div>

              {/* Start Presentation Button */}
              <motion.div 
                className="start-button-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <button 
                  className="start-presentation-btn"
                  onClick={handleStartPresentation}
                >
                  <span>Начать презентацию</span>
                  <ChevronRight size={20} />
                </button>
              </motion.div>

              {/* Student and Supervisor Info */}
              <motion.div 
                className="info-wrapper"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Student Info Container */}
                <div className="student-container">
                  <div className="info-section">
                    <div className="labels-container">
                      <span className="label">Студент:</span>
                      <span className="label">Группа</span>
                    </div>
                    <div className="values-container">
                      <span className="value">Кучин Е.А.</span>
                      <span className="value">ИУ5-44М</span>
                    </div>
                  </div>
                </div>

                {/* Supervisor Info Container */}
                <div className="supervisor-container">
                  <div className="info-section">
                    <div className="labels-container">
                      <span className="label supervisor-label">Научный руководитель:</span>
                      <span className="label empty-label"></span>
                    </div>
                    <div className="values-container">
                      <span className="value supervisor-name">Виноградова М.В.</span>
                      <span className="value supervisor-title">доцент, к.т.н.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Date */}
            <div className="footer-area">
              <motion.div 
                className="date-footer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span className="date">18.06.2025</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleSlide 