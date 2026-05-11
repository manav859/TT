import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'

interface StaggerGridProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

const containerVariants = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
})

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.88,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
}

export function StaggerGrid({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduced = useReducedMotionPreference()

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants(reduced ? 0.04 : staggerDelay)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduced = useReducedMotionPreference()

  return (
    <motion.div className={className} variants={reduced ? itemVariantsReduced : itemVariants}>
      {children}
    </motion.div>
  )
}
