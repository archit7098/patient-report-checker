
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = 'up',
}) => {
  const directionVariants = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...directionVariants[direction],
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}> = ({
  children,
  className,
  delay = 0,
  direction = 'right',
}) => {
  const directionOffset = {
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        x: directionOffset[direction].x,
        y: directionOffset[direction].y,
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.25, 0, 0.35, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export const AnimatePresenceWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn(className)}>{children}</div>;
};
