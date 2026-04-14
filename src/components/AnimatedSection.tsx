"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: (dir: Direction = "up") => ({
      opacity: 0,
      y: directionOffset[dir].y,
      x: directionOffset[dir].x,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  },
};

type Props = {
  children: ReactNode;
  variant?: "fadeUp" | "scale" | "stagger";
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
};

export function AnimatedSection({
  children,
  variant = "fadeUp",
  direction = "up",
  delay = 0,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants[variant]}
      custom={direction}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  return (
    <motion.div variants={variants.fadeUp} custom={direction} className={className}>
      {children}
    </motion.div>
  );
}
