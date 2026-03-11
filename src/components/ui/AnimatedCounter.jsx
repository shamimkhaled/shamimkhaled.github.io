import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, inView, delay = 0 }) => {
  const [display, setDisplay] = useState('0');
  const numericMatch = value.match(/(\d+)/);
  const number = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = value.replace(/\d+/, '').trim() || '';

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      let current = 0;
      const step = Math.ceil(number / 30);
      const interval = setInterval(() => {
        current += step;
        if (current >= number) {
          setDisplay(number + suffix);
          clearInterval(interval);
        } else {
          setDisplay(current + suffix);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay * 200);
    return () => clearTimeout(timer);
  }, [inView, number, suffix, delay]);

  return <span className="text-2xl md:text-3xl font-bold text-white">{display}</span>;
};

export default AnimatedCounter;
