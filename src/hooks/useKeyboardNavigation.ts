import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
        event.preventDefault();
        if (currentIndex < slides.length - 1) {
          navigateToSlide(currentIndex + 1);
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          navigateToSlide(currentIndex - 1);
        }
        break;
      // Number keys for direct slide navigation
      case 'Digit1':
        event.preventDefault();
        navigateToSlide(0); // Slide 1
        break;
      case 'Digit2':
        event.preventDefault();
        navigateToSlide(1); // Slide 2
        break;
      case 'Digit3':
        event.preventDefault();
        navigateToSlide(2); // Slide 3
        break;
      case 'Digit4':
        event.preventDefault();
        navigateToSlide(3); // Slide 4
        break;
      case 'Digit5':
        event.preventDefault();
        navigateToSlide(4); // Slide 5
        break;
      case 'Digit6':
        event.preventDefault();
        navigateToSlide(5); // Slide 6
        break;
      case 'Digit7':
        event.preventDefault();
        navigateToSlide(6); // Slide 7
        break;
      case 'Digit8':
        event.preventDefault();
        navigateToSlide(7); // Slide 8
        break;
      case 'Digit9':
        event.preventDefault();
        navigateToSlide(8); // Slide 9
        break;
      case 'Digit0':
        event.preventDefault();
        navigateToSlide(9); // Slide 10
        break;
    }
  }, [getCurrentSlideIndex, navigateToSlide]);

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
    navigateToSlide
  };
}; 