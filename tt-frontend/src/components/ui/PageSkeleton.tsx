import { motion } from 'framer-motion'

export function PageSkeleton() {
  return (
    <motion.div
      className="w-full min-h-[60vh] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      aria-busy="true"
      aria-label="Loading page"
    >
      {/* Hero-style block */}
      <div className="tt-wide pt-16 pb-12">
        <div className="space-y-5">
          <div className="tt-skeleton h-14 w-2/3 max-w-md" style={{ borderRadius: 0 }} />
          <div className="tt-skeleton h-4 w-1/3 max-w-xs" style={{ borderRadius: 0 }} />
        </div>
      </div>
      <div className="tt-skeleton w-full" style={{ aspectRatio: '16/7', borderRadius: 0 }} />
    </motion.div>
  )
}
