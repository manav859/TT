import { createElement, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'

interface RevealTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span'
}

export function RevealText({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-12% 0px',
  })
  const reduced = useReducedMotionPreference()

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={
          reduced
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: '110%',
                filter: 'blur(10px)',
              }
        }
        animate={
          isInView
            ? reduced
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }
            : {}
        }
        transition={{
          duration: reduced ? 0.25 : 0.95,
          delay: reduced ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {createElement(
          Tag,
          {
            className,
            style: { margin: 0 },
          },
          children,
        )}
      </motion.div>
    </div>
  )
}
