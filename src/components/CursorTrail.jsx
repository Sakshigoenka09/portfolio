import React, { useEffect, useCallback } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
  const createSparkle = useCallback((x, y) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    
    // Random size
    const size = Math.random() * 12 + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Random offset from cursor
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;
    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;

    // Random color from palette
    const colors = ['#9f7aea', '#d6bcfa', '#c4b5fd', '#ffffff'];
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);

    // Remove after animation ends
    setTimeout(() => {
      sparkle.remove();
    }, 800);
  }, []);

  useEffect(() => {
    let frameCount = 0;

    const handleMouseMove = (e) => {
      frameCount++;
      // Create a sparkle every 2nd frame for performance
      if (frameCount % 2 === 0) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createSparkle]);

  return null; // This component doesn't render anything, it just adds sparkles to the DOM
};

export default CursorTrail;
