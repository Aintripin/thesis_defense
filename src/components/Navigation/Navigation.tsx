import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home, Target, CheckSquare, Lightbulb, Zap, BarChart3, TrendingUp, CheckCircle, Database, Settings, Cog, Wrench, Settings2, Bot, PieChart, Award, Activity, BookOpen, Handshake, Monitor, Printer, Maximize, Minimize, Star } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import KeyboardShortcutsHelp from '../KeyboardShortcutsHelp'
import styles from './Navigation.module.scss'

interface SlideEntry {
  path: string;
  label: string;
  icon: React.ElementType;
  end?: boolean;
}

const Navigation: React.FC = () => {
  const location = useLocation()
  const [isNavVisible, setIsNavVisible] = useState(false)
  const { toggleTheme, isColorTheme } = useTheme()
  const { isHelpVisible, toggleHelp, closeHelp, isFullscreen, toggleFullscreen } = useKeyboardNavigation()
  
  const slides: SlideEntry[] = [
    { path: '/title', label: 'Титульный слайд', icon: Home },
    { path: '/problem', label: 'Постановка задачи', icon: Target },
    { path: '/market', label: 'Решённые задачи', icon: CheckSquare },
    { path: '/solution', label: 'Архитектурные решения', icon: Lightbulb },
    { path: '/testing', label: 'Технологии тестирования', icon: CheckSquare },
    { path: '/ycsb', label: 'Обоснование выбора YCSB', icon: CheckSquare },
    { path: '/market-analysis', label: 'Анализ рынка: Обзор', icon: BarChart3, end: true },
    { path: '/market-analysis/trends-deep-dive', label: 'Анализ рынка: Детали', icon: BarChart3 },
    { path: '/dataset-selection', label: 'Выбор и анализ датасета', icon: Database, end: true },
    { path: '/dataset-selection/details', label: 'Выбранный датасет', icon: Database },
    { path: '/mongodb-preparation', label: 'Подготовка данных MongoDB', icon: CheckSquare },
    { path: '/postgresql-preparation', label: 'Подготовка данных PostgreSQL', icon: CheckSquare },
    { path: '/cassandra-preparation', label: 'Подготовка данных Cassandra', icon: CheckSquare },
    { path: '/test-environment', label: 'Тестовое окружение', icon: Settings },
    { path: '/technical-implementation', label: 'Техническая реализация', icon: Cog },
    { path: '/technical-optimization', label: 'Оптимизация конфигураций', icon: Wrench },
    { path: '/ycsb-configuration', label: 'Конфигурация YCSB', icon: Settings2 },
    { path: '/automation', label: 'Автоматизация сбора результатов', icon: Bot },
    { path: '/visualization', label: 'Визуализация и рекомендации', icon: PieChart },
    { path: '/main-results', label: 'Основные результаты: Столбчатая диаграмма', icon: Award, end: true },
    { path: '/main-results/radar', label: 'Основные результаты: Радарные диаграммы', icon: Award },
    { path: '/scalability-delays', label: 'Масштабируемость и задержки', icon: Activity },
    { path: '/publications', label: 'Публикации', icon: BookOpen },
    { path: '/recommendations', label: 'Рекомендации', icon: Star },
    { path: '/conclusion', label: 'Заключение', icon: CheckCircle },
    { path: '/goodbye', label: 'Спасибо за внимание', icon: Handshake },
  ]


  const currentIndex = slides.findIndex(slide => {
    // Use exact path matching for nested routes, similar to keyboard navigation
    if (slide.path.includes('/market-analysis') && location.pathname.startsWith('/market-analysis')) {
      return slide.path === location.pathname;
    }
    if (slide.path.includes('/dataset-selection') && location.pathname.startsWith('/dataset-selection')) {
      return slide.path === location.pathname;
    }
    if (slide.path.includes('/main-results') && location.pathname.startsWith('/main-results')) {
      return slide.path === location.pathname;
    }
    return slide.path === location.pathname;
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
        className={styles.navTrigger}
        onMouseEnter={() => setIsNavVisible(true)}
      />
      
      <KeyboardShortcutsHelp 
        isVisible={isHelpVisible} 
        onClose={closeHelp} 
      />
      
      <motion.nav 
        className={`${styles.navigation} ${isNavVisible ? styles.show : ''}`}
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: isNavVisible ? 0 : -280, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setIsNavVisible(true)}
        onMouseLeave={() => setIsNavVisible(false)}
      >
        <div className={styles.navContent}>
          {/* Logo/Title */}
          <div className={styles.navBrand}>
            <div className={styles.navBrandTop}>
              <span className={styles.bmstuLogo}>МГТУ</span>
              <div className={styles.navButtons}>
                <button
                  className={`${styles.navHelpButton} ${isHelpVisible ? styles.active : ''}`}
                  onClick={toggleHelp}
                  title="Show keyboard shortcuts (H)"
                >
                  ?
                </button>
                <button
                  className={`${styles.navFullscreenButton} ${isFullscreen ? styles.active : ''}`}
                  onClick={toggleFullscreen}
                  title={`${isFullscreen ? 'Exit' : 'Enter'} fullscreen (F)`}
                >
                  {isFullscreen ? (
                    <Minimize size={16} />
                  ) : (
                    <Maximize size={16} />
                  )}
                </button>
                <button
                  className={`${styles.navThemeSwitcher} ${isColorTheme ? styles.colorTheme : styles.printTheme}`}
                  onClick={toggleTheme}
                  title={`Switch to ${isColorTheme ? 'Print' : 'Color'} mode (P)`}
                >
                  {isColorTheme ? (
                    <Printer size={16} />
                  ) : (
                    <Monitor size={16} />
                  )}
                </button>
              </div>
            </div>
            <span className={styles.navTitle}>Дипломная презентация</span>
          </div>

          {/* Slide indicators */}
          <div className={styles.slideIndicators}>
            {slides.map((slide, index) => {
              const IconComponent = slide.icon
              return (
                <NavLink
                  key={slide.path}
                  to={slide.path}
                  className={({ isActive }) => `${styles.slideIndicator} ${isActive ? styles.active : ''}`}
                  title={slide.label}
                  end={slide.end}
                >
                  <div className={styles.slideIndicatorContent}>
                    <div className={styles.slideIconWrapper}>
                      <IconComponent size={20} />
                      <span className={styles.slideNumber}>{index + 1}</span>
                    </div>
                    <span className={styles.slideLabel}>{slide.label}</span>
                  </div>
                  {(location.pathname === slide.path) && (
                    <motion.div
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </NavLink>
              )
            })}
          </div>

          {/* Navigation controls */}
          <div className={styles.navControls}>
            <div className={styles.navArrows}>
              {prevSlide && (
                <NavLink to={prevSlide.path} className={`${styles.navArrow} ${styles.prev}`} end>
                  <ChevronLeft size={20} />
                </NavLink>
              )}
              
              {nextSlide && (
                <NavLink to={nextSlide.path} className={`${styles.navArrow} ${styles.next}`} end>
                  <ChevronRight size={20} />
                </NavLink>
              )}
            </div>
            
            <div className={styles.slideCounter}>
              {currentIndex !== -1 ? currentIndex + 1 : '-'} / {slides.length}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation 