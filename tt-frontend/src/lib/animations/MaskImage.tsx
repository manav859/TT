import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'

interface MaskImageProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function MaskImage({ children, className, delay = 0 }: MaskImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduced = useReducedMotionPreference()

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={
          reduced
            ? { opacity: 0 }
            : {
                opacity: 0,
                clipPath: 'inset(0 0 100% 0)',
                scale: 1.06,
                filter: 'blur(12px)',
              }
        }
        animate={
          isInView
            ? reduced
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  clipPath: 'inset(0 0 0% 0)',
                  scale: 1,
                  filter: 'blur(0px)',
                }
            : {}
        }
        transition={{
          duration: reduced ? 0.35 : 1.1,
          delay: reduced ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="h-full w-full overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  )
}
