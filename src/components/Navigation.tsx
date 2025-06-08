import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home, Target, CheckSquare, Lightbulb, Zap, BarChart3, TrendingUp, CheckCircle, Database, Settings, Cog, Wrench, Settings2, Bot, PieChart } from 'lucide-react'
import './Navigation.css'

interface SlideEntry {
  path: string;
  label: string;
  icon: React.ElementType;
  end?: boolean;
}

const Navigation: React.FC = () => {
  const location = useLocation()
  const [isNavVisible, setIsNavVisible] = useState(false)
  
  const slides: SlideEntry[] = [
    { path: '/title', label: 'Титульный слайд', icon: Home },
    { path: '/problem', label: 'Постановка задачи', icon: Target },
    { path: '/market', label: 'Решённые задачи', icon: CheckSquare },
    { path: '/solution', label: 'Архитектурные решения', icon: Lightbulb },
    { path: '/testing', label: 'Технологии тестирования', icon: Zap },
    { path: '/ycsb', label: 'Обоснование выбора YCSB', icon: CheckSquare },
    { path: '/market-analysis', label: 'Анализ рынка: Обзор', icon: BarChart3, end: true },
    { path: '/market-analysis/trends-deep-dive', label: 'Анализ рынка: Детали', icon: BarChart3 },
    { path: '/dataset-selection', label: 'Выбор и анализ датасета', icon: Database, end: true },
    { path: '/dataset-selection/details', label: 'Выбранный датасет', icon: Database },
    { path: '/data-preparation', label: 'Стратегии подготовки данных', icon: Zap, end: true },
    { path: '/data-preparation/cassandra', label: 'Подготовка данных для Cassandra', icon: Zap },
    { path: '/test-environment', label: 'Тестовое окружение', icon: Settings },
    { path: '/technical-implementation', label: 'Техническая реализация', icon: Cog },
    { path: '/technical-optimization', label: 'Оптимизация конфигураций', icon: Wrench },
    { path: '/ycsb-configuration', label: 'Конфигурация YCSB', icon: Settings2 },
    { path: '/test-execution', label: 'Проведение тестов', icon: Zap },
    { path: '/automation', label: 'Автоматизация сбора результатов', icon: Bot },
    { path: '/visualization', label: 'Визуализация и рекомендации', icon: PieChart },
    { path: '/results', label: 'Результаты', icon: TrendingUp },
    { path: '/conclusion', label: 'Заключение', icon: CheckCircle },
  ]

  const currentIndex = slides.findIndex(slide => {
    if (slide.end) return location.pathname === slide.path;
    return location.pathname.startsWith(slide.path);
  });
  const prevSlide = currentIndex > 0 ? slides[currentIndex - 1] : null
  const nextSlide = currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null

  // Handle mouse movement for nav trigger - MUST be called on every render
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show nav when mouse is near the left edge of the screen
      if (e.clientX <= 80) {
        setIsNavVisible(true)
      } else if (e.clientX > 350) {
        // Hide when mouse is far from the nav area
        setIsNavVisible(false)
      }
    }

    const handleMouseLeave = () => {
      // Hide nav when mouse leaves the window
      setIsNavVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Hide navigation on title slide to keep it clean - AFTER all hooks
  if (location.pathname === '/title') {
    return null
  }

  return (
    <>
      {/* Invisible trigger area at left of screen */}
      <div 
        className="nav-trigger"
        onMouseEnter={() => setIsNavVisible(true)}
      />
      
      <motion.nav 
        className={`navigation ${isNavVisible ? 'show' : ''}`}
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: isNavVisible ? 0 : -280, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setIsNavVisible(true)}
        onMouseLeave={() => setIsNavVisible(false)}
      >
        <div className="nav-content">
          {/* Logo/Title */}
          <div className="nav-brand">
            <span className="bmstu-logo">МГТУ</span>
            <span className="nav-title">Дипломная презентация</span>
          </div>

          {/* Slide indicators */}
          <div className="slide-indicators">
            {slides.map((slide, index) => {
              const IconComponent = slide.icon
              return (
                <NavLink
                  key={slide.path}
                  to={slide.path}
                  className={({ isActive }) => `slide-indicator ${isActive ? 'active' : ''}`}
                  title={slide.label}
                  end={slide.end}
                >
                  <div className="slide-indicator-content">
                    <div className="slide-icon-wrapper">
                      <IconComponent size={20} />
                      <span className="slide-number">{index + 1}</span>
                    </div>
                    <span className="slide-label">{slide.label}</span>
                  </div>
                  {(location.pathname === slide.path || (slide.end !== true && location.pathname.startsWith(slide.path) && location.pathname !== slides[index-1]?.path && !slides.slice(0,index).some(s=>location.pathname.startsWith(s.path) && s.end))) && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </NavLink>
              )
            })}
          </div>

          {/* Navigation controls */}
          <div className="nav-controls">
            <div className="nav-arrows">
              {prevSlide && (
                <NavLink to={prevSlide.path} className="nav-arrow prev" end>
                  <ChevronLeft size={20} />
                </NavLink>
              )}
              
              {nextSlide && (
                <NavLink to={nextSlide.path} className="nav-arrow next" end>
                  <ChevronRight size={20} />
                </NavLink>
              )}
            </div>
            
            <div className="slide-counter">
              {currentIndex !== -1 ? currentIndex + 1 : '-'} / {slides.length}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation 