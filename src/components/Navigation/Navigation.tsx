import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, ChevronRight, Home, Target, CheckSquare, Lightbulb, 
  BarChart3, CheckCircle, Database, Settings, Cog, Wrench, 
  Settings2, Bot, PieChart, Award, Activity, BookOpen, 
  Handshake, Maximize, Minimize, Star 
} from 'lucide-react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import KeyboardShortcutsHelp from '../KeyboardShortcutsHelp/KeyboardShortcutsHelp'
import styles from './Navigation.module.scss'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

interface SlideEntry {
  path: string;
  label: string;
  icon: React.ElementType;
  end?: boolean;
}

const slides: SlideEntry[] = [
    { path: '/title', label: 'Титульный слайд', icon: Home, end: true },
    { path: '/problem', label: 'Постановка задачи', icon: Target, end: true },
    { path: '/market', label: 'Решённые задачи', icon: CheckSquare, end: true },
    { path: '/solution', label: 'Архитектурные решения', icon: Lightbulb, end: true },
    { path: '/testing', label: 'Технологии тестирования', icon: CheckSquare, end: true },
    { path: '/ycsb', label: 'Обоснование выбора YCSB', icon: Star, end: true },
    { path: '/market-analysis', label: 'Анализ рынка: Обзор', icon: BarChart3, end: false },
    { path: '/market-analysis/trends-deep-dive', label: 'Анализ рынка: Детали', icon: PieChart, end: true },
    { path: '/dataset-selection', label: 'Выбор и анализ датасета', icon: Database, end: false },
    { path: '/dataset-selection/details', label: 'Выбранный датасет', icon: Database, end: true },
    { path: '/mongodb-preparation', label: 'Подготовка MongoDB', icon: Cog, end: true },
    { path: '/postgresql-preparation', label: 'Подготовка PostgreSQL', icon: Cog, end: true },
    { path: '/cassandra-preparation', label: 'Подготовка Cassandra', icon: Cog, end: true },
    { path: '/test-environment', label: 'Тестовое окружение', icon: Settings, end: true },
    { path: '/technical-implementation', label: 'Техническая реализация', icon: Wrench, end: true },
    { path: '/technical-optimization', label: 'Оптимизация конфигураций', icon: Settings2, end: true },
    { path: '/ycsb-configuration', label: 'Конфигурация YCSB', icon: Settings2, end: true },
    { path: '/automation', label: 'Автоматизация сбора', icon: Bot, end: true },
    { path: '/visualization', label: 'Визуализация', icon: PieChart, end: true },
    { path: '/main-results', label: 'Основные результаты', icon: Award, end: false },
    { path: '/scalability-delays', label: 'Масштабируемость', icon: Activity, end: true },
    { path: '/publications', label: 'Публикации', icon: BookOpen, end: true },
    { path: '/recommendations', label: 'Рекомендации', icon: Star, end: true },
    { path: '/conclusion', label: 'Заключение', icon: CheckCircle, end: true },
    { path: '/goodbye', label: 'Спасибо за внимание', icon: Handshake, end: true },
];

const Navigation: React.FC = () => {
  const location = useLocation()
  const [isNavVisible, setIsNavVisible] = useState(false)
  const { isFullscreen, toggleFullscreen, currentSlideIndex } = useKeyboardNavigation()
  
  const prevSlide = currentSlideIndex > 0 ? slides[currentSlideIndex - 1] : null;
  const nextSlide = currentSlideIndex < slides.length - 1 ? slides[currentSlideIndex + 1] : null;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 80) setIsNavVisible(true)
      else if (e.clientX > 350) setIsNavVisible(false)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (location.pathname === '/title') return null

  return (
    <>
      <div className={styles.topRightControls}>
        <ThemeSwitcher />
      </div>
      
      <KeyboardShortcutsHelp />
      
      <motion.nav 
        className={`${styles.navigation} ${isNavVisible ? styles.show : ''}`}
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: isNavVisible ? 0 : -280, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setIsNavVisible(true)}
        onMouseLeave={() => setIsNavVisible(false)}
      >
        <div className={styles.navContent}>
          <div className={styles.navBrand}>
            <div className={styles.navBrandTop}>
              <span className={styles.bmstuLogo}>МГТУ</span>
              <div className={styles.navButtons}>
                <button
                  className={`${styles.navFullscreenButton} ${isFullscreen ? styles.active : ''}`}
                  onClick={toggleFullscreen}
                  title={`${isFullscreen ? 'Exit' : 'Enter'} fullscreen (F)`}
                >
                  {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                </button>
              </div>
            </div>
            <span className={styles.navTitle}>Дипломная презентация</span>
          </div>

          <div className={styles.slideIndicators}>
            {slides.map((slide, index) => {
              const IconComponent = slide.icon
              const isActive = location.pathname.startsWith(slide.path) && (slide.end === false || location.pathname === slide.path)
              return (
                <NavLink
                  key={slide.path}
                  to={slide.path}
                  className={`${styles.slideIndicator} ${isActive ? styles.active : ''}`}
                  title={slide.label}
                  end={slide.end !== false}
                >
                  <div className={styles.slideIndicatorContent}>
                    <div className={styles.slideIconWrapper}>
                      <IconComponent size={20} />
                      <span className={styles.slideNumber}>{index + 1}</span>
                    </div>
                    <span className={styles.slideLabel}>{slide.label}</span>
                  </div>
                  {isActive && (
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
              {currentSlideIndex !== -1 ? currentSlideIndex + 1 : '-'} / {slides.length}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation
