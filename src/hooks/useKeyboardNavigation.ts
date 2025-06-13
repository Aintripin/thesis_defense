import { useEffect, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const slides = [
  '/title',
  '/problem',
  '/market',
  '/solution',
  '/testing',
  '/ycsb',
  '/market-analysis',
  '/market-analysis/trends-deep-dive',
  '/dataset-selection',
  '/dataset-selection/details',
  '/data-preparation',
  '/data-preparation/cassandra',
  '/test-environment',
  '/technical-implementation',
  '/technical-optimization',
  '/ycsb-configuration',
  '/test-execution',
  '/automation',
  '/visualization',
  '/main-results',
  '/main-results/radar',
  '/scalability-delays',
  '/publications',
  '/conclusion',
  '/goodbye'
];

export const useKeyboardNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getCurrentSlideIndex = useCallback(() => {
    return slides.findIndex(slide => {
      if (slide.includes('/market-analysis') && location.pathname.startsWith('/market-analysis')) {
        return slide === location.pathname;
      }
      if (slide.includes('/dataset-selection') && location.pathname.startsWith('/dataset-selection')) {
        return slide === location.pathname;
      }
      if (slide.includes('/data-preparation') && location.pathname.startsWith('/data-preparation')) {
        return slide === location.pathname;
      }
      if (slide.includes('/main-results') && location.pathname.startsWith('/main-results')) {
        return slide === location.pathname;
      }
      return slide === location.pathname;
    });
  }, [location.pathname]);

  const navigateToSlide = useCallback((slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < slides.length) {
      navigate(slides[slideIndex]);
    }
  }, [navigate]);

  const toggleHelp = useCallback(() => {
    setIsHelpVisible(prev => !prev);
  }, []);

  const closeHelp = useCallback(() => {
    setIsHelpVisible(false);
  }, []);

  // Fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.warn('Fullscreen not supported or denied:', error);
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Prevent navigation if user is typing in an input field
    if (event.target && (event.target as HTMLElement).matches('input, textarea, [contenteditable]')) {
      return;
    }

    const currentIndex = getCurrentSlideIndex();
    if (currentIndex === -1) return;

    switch (event.code) {
      case 'Space':
      case 'Enter':
      case 'ArrowRight':
        // Don't navigate if help is visible
        if (isHelpVisible) return;
        event.preventDefault();
        if (currentIndex < slides.length - 1) {
          navigateToSlide(currentIndex + 1);
        }
        break;
      case 'ArrowLeft':
        // Don't navigate if help is visible
        if (isHelpVisible) return;
        event.preventDefault();
        if (currentIndex > 0) {
          navigateToSlide(currentIndex - 1);
        }
        break;
      // P key for toggling print/color theme
      case 'KeyP':
        // Don't toggle theme if help is visible
        if (isHelpVisible) return;
        event.preventDefault();
        toggleTheme();
        break;
      // F key for fullscreen
      case 'KeyF':
        // Don't toggle fullscreen if help is visible
        if (isHelpVisible) return;
        event.preventDefault();
        toggleFullscreen();
        break;
      // H key for help (avoiding Firefox Quick Find conflict with ?)
      case 'KeyH':
        event.preventDefault();
        toggleHelp();
        break;
      // Escape key to close help
      case 'Escape':
        if (isHelpVisible) {
          event.preventDefault();
          closeHelp();
        }
        break;
      // Number keys for direct slide navigation
      case 'Digit1':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(0); // Slide 1
        break;
      case 'Digit2':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(1); // Slide 2
        break;
      case 'Digit3':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(2); // Slide 3
        break;
      case 'Digit4':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(3); // Slide 4
        break;
      case 'Digit5':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(4); // Slide 5
        break;
      case 'Digit6':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(5); // Slide 6
        break;
      case 'Digit7':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(6); // Slide 7
        break;
      case 'Digit8':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(7); // Slide 8
        break;
      case 'Digit9':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(8); // Slide 9
        break;
      case 'Digit0':
        if (isHelpVisible) return;
        event.preventDefault();
        navigateToSlide(9); // Slide 10
        break;
    }
  }, [getCurrentSlideIndex, navigateToSlide, toggleTheme, toggleFullscreen, isHelpVisible, toggleHelp, closeHelp]);

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return {
    currentSlideIndex: getCurrentSlideIndex(),
    totalSlides: slides.length,
    navigateToSlide,
    isHelpVisible,
    toggleHelp,
    closeHelp,
    isFullscreen,
    toggleFullscreen
  };
}; 