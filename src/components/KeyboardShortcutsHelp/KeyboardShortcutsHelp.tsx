import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, Printer, Monitor, Hash, Maximize } from 'lucide-react'
import styles from './KeyboardShortcutsHelp.module.scss'
import { useHotkeys } from 'react-hotkeys-hook'

const KeyboardShortcutsHelp = () => {
  const [isOpen, setIsOpen] = useState(false)

  useHotkeys('h', () => setIsOpen(prev => !prev), { preventDefault: true })
  useHotkeys('esc', () => setIsOpen(false), { preventDefault: true, enabled: isOpen })

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['Space', 'Enter', '→'], description: 'Next slide', icon: ArrowRight },
        { keys: ['←'], description: 'Previous slide', icon: ArrowLeft },
        { keys: ['1-9'], description: 'Jump to slide number', icon: Hash },
      ]
    },
    {
      category: 'View',
      items: [
        { keys: ['F'], description: 'Toggle fullscreen', icon: Maximize },
        { keys: ['P'], description: 'Toggle Print/Color theme', icon: Printer },
      ]
    },
    {
      category: 'Help',
      items: [
        { keys: ['H'], description: 'Show/hide this help', icon: Monitor },
        { keys: ['Esc'], description: 'Close help overlay', icon: X },
      ]
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Help Modal */}
            <motion.div
              className={styles.helpModal}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal
            >
              {/* Header */}
              <div className={styles.header}>
                <h2 className={styles.title}>Keyboard Shortcuts</h2>
                <button 
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close help"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className={styles.content}>
                {shortcuts.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    className={styles.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.1 + categoryIndex * 0.1,
                      duration: 0.3 
                    }}
                  >
                    <h3 className={styles.categoryTitle}>{category.category}</h3>
                    <div className={styles.shortcuts}>
                      {category.items.map((shortcut, index) => (
                        <motion.div
                          key={index}
                          className={styles.shortcut}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: 0.2 + categoryIndex * 0.1 + index * 0.05,
                            duration: 0.2 
                          }}
                        >
                          <div className={styles.keys}>
                            {shortcut.keys.map((key, keyIndex) => (
                              <React.Fragment key={keyIndex}>
                                <kbd className={styles.key}>{key}</kbd>
                                {keyIndex < shortcut.keys.length - 1 && (
                                  <span className={styles.or}>or</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          <div className={styles.description}>
                            <shortcut.icon size={16} className={styles.icon} />
                            <span>{shortcut.description}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <motion.div 
                className={styles.footer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <p>Press <kbd className={styles.key}>H</kbd> or <kbd className={styles.key}>Esc</kbd> to close, or click outside</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default KeyboardShortcutsHelp 