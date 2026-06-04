import { useState } from 'react'

interface Props {
  src: string
  alt: string
  className?: string
  /** Render above the fold — loads eagerly with high priority instead of lazy. */
  eager?: boolean
  /**
   * Extra styles merged AFTER the defaults, so callers can override `height`
   * (e.g. supply an `aspectRatio` instead of filling a sized wrapper) or add a
   * placeholder `background`. Kept minimal on purpose.
   */
  style?: React.CSSProperties
  draggable?: boolean
}

/**
 * Drop-in <img> that fades in once decoded, killing the white pop-in flash.
 * Defaults to filling a sized/aspect-ratio'd wrapper with object-fit: cover.
 */
export default function SmoothImage({
  src,
  alt,
  className,
  eager,
  style,
  draggable,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      draggable={draggable}
      onLoad={() => setLoaded(true)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.6s ease',
        ...style,
      }}
    />
  )
}
