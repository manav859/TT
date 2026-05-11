import { useState } from 'react'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'

interface FadeBlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
}

export function FadeBlurImage({ src, alt, className, style, ...rest }: FadeBlurImageProps) {
  const [loaded, setLoaded] = useState(false)
  const reduced = useReducedMotionPreference()

  return (
    <div className="relative w-full h-full">
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 tt-skeleton" aria-hidden="true" />
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-[opacity,filter] ${className ?? ''}`}
        style={{
          opacity: loaded ? 1 : 0,
          filter: loaded || reduced ? 'blur(0px)' : 'blur(10px)',
          transitionDuration: reduced ? '200ms' : '600ms',
          transitionTimingFunction: 'ease-out',
          ...style,
        }}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </div>
  )
}
