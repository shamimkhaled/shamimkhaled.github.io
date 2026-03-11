import { useReducedMotion } from 'framer-motion';

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const getTransition = (duration = 0.5, delay = 0) => ({
  duration,
  delay,
  ease: [0.25, 0.46, 0.45, 0.94],
});

export const useReducedMotionConfig = () => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion
    ? { initial: false, animate: false, transition: { duration: 0 } }
    : {};
};
