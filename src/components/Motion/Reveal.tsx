'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Delay in seconds before the animation starts. */
  delay?: number
  /** Initial vertical offset in px. */
  y?: number
}

/**
 * Wraps content in a framer-motion whileInView entrance animation.
 * Respects the user's reduced-motion preference.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 24,
}) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
