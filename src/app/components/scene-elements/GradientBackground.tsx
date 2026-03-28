/**
 * Reusable Gradient Background component
 * Supports animated gradient transitions
 */

import { motion } from 'motion/react';
import { gradientTransition } from '../../animations/variants';

interface GradientBackgroundProps {
  gradient: string;
  animate?: boolean;
}

export function GradientBackground({ gradient, animate = false }: GradientBackgroundProps) {
  const Component = animate ? motion.div : 'div';

  return (
    <Component
      className="absolute h-full left-0 top-0 w-full"
      style={{ backgroundImage: gradient }}
      {...(animate && {
        animate: { backgroundImage: gradient },
        ...gradientTransition,
      })}
    />
  );
}
