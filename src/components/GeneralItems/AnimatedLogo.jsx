import React, { useState, useRef, useEffect } from "react";
import styles from "./AnimatedLogo.module.css";

const AnimatedLogo = () => {
  const [isPressed, setIsPressed] = useState(false);
  const particlesRef = useRef([]);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsPressed(true);
    createParticles(e, 8); // Сразу создаем несколько искр
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const createParticles = (e, count = 3) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const baseX = e.clientX - rect.left;
    const baseY = e.clientY - rect.top;

    for (let i = 0; i < count; i++) {
      const particle = {
        id: Date.now() + Math.random(),
        x: baseX,
        y: baseY,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 15,
        speedY: (Math.random() - 0.7) * 12,
        life: 100,
        color: getRandomSparkColor(),
      };

      particlesRef.current.push(particle);
    }

    if (particlesRef.current.length > 40) {
      particlesRef.current = particlesRef.current.slice(-40);
    }
  };

  const getRandomSparkColor = () => {
    const colors = [
      "#ff6b35", // оранжевый
      "#ff8c42", // светлый оранжевый
      "#ffd166", // желтый
      "#ffffff", // белый
      "#ffaa5b", // золотистый
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Анимация частиц
  useEffect(() => {
    const animateParticles = () => {
      particlesRef.current = particlesRef.current
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.speedX * 0.3,
          y: particle.y + particle.speedY * 0.3,
          life: particle.life - 2.5,
          size: particle.size * 0.97,
        }))
        .filter((particle) => particle.life > 0 && particle.size > 0.3);

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animationRef.current = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Создание искр при удержании
  useEffect(() => {
    if (isPressed) {
      const particleInterval = setInterval(() => {
        if (particlesRef.current.length < 35) {
          createParticles(
            {
              clientX:
                containerRef.current.getBoundingClientRect().left +
                Math.random() * containerRef.current.offsetWidth,
              clientY:
                containerRef.current.getBoundingClientRect().top +
                Math.random() * containerRef.current.offsetHeight,
            },
            2
          );
        }
      }, 150);

      return () => clearInterval(particleInterval);
    }
  }, [isPressed]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Частицы искр */}
      {particlesRef.current.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.life / 100,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transform: `rotate(${
              (Math.atan2(particle.speedY, particle.speedX) * 180) / Math.PI
            }deg)`,
          }}
        />
      ))}

      <span className={styles.appName}>FutureDev</span>
    </div>
  );
};

export default AnimatedLogo;
