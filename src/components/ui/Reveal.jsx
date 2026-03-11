import React from 'react';
import { useInView } from '../../hooks/useInView';

export default function Reveal({ children, delay = 0, dir = 'up', style = {} }) {
  const [ref, visible] = useInView();
  const from =
    dir === 'up'
      ? 'translateY(30px)'
      : dir === 'left'
        ? 'translateX(-30px)'
        : 'translateX(30px)';

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0)' : from,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
