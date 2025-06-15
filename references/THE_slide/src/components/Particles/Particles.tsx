import React, { useEffect, useState } from 'react';
import styles from './Particles.module.scss';

const Particles: React.FC = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    animationDelay: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const particleCount = 25;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (%)
      animationDelay: Math.random() * 15, // Random delay (seconds)
      size: Math.random() * 2 + 2, // Random size between 2-4px
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className={styles.particles}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles; 