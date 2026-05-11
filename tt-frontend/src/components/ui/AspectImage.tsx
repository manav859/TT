import type { ImageAsset } from '@/types/api'
import type { ImageRatio } from '@/lib/imageUtils'
import clsx from 'clsx'

interface AspectImageProps {
  image: ImageAsset | null | undefined
  ratio?: ImageRatio
  className?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain'
  objectPosition?: string
  label?: string
}

const ratioMap: Record<ImageRatio, string> = {
  '1/1':  'aspect-square',
  '4/3':  'aspect-4/3',
  '3/4':  'aspect-3/4',
  '16/9': 'aspect-video',
  '3/2':  'aspect-3/2',
  '2/3':  'aspect-2/3',
  '16/7': 'aspect-16/7',
  'auto': '',
}

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(145deg, #d4c9b8 0%, #c5b8a8 40%, #b8aa98 100%)',
  'linear-gradient(160deg, #c8bba8 0%, #9e8f7e 55%, #8b7d6e 100%)',
  'linear-gradient(135deg, #e0d8cc 0%, #c8baa8 50%, #b0a090 100%)',
  'linear-gradient(150deg, #2a2420 0%, #3d3630 50%, #4a4038 100%)',
  'linear-gradient(140deg, #1a1916 0%, #2e2a26 55%, #3d3630 100%)',
]

function pickGradient(label?: string): string {
  if (!label) return PLACEHOLDER_GRADIENTS[0]
  const hash = [...label].reduce((a, c) => a + c.charCodeAt(0), 0)
  return PLACEHOLDER_GRADIENTS[hash % PLACEHOLDER_GRADIENTS.length]
}

export function AspectImage({
  image,
  ratio = '4/3',
  className,
  priority,
  objectFit = 'cover',
  objectPosition,
  label,
}: AspectImageProps) {
  const ratioClass = ratioMap[ratio]

  if (!image?.url) {
    return (
      <div
        className={clsx('relative overflow-hidden w-full', ratioClass, className)}
        aria-hidden="true"
        role="img"
        aria-label={label ?? 'Image'}
      >
        <div className="absolute inset-0" style={{ background: pickGradient(label) }} />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>
    )
  }

  return (
    <div className={clsx('relative overflow-hidden w-full', ratioClass, className)}>
      <img
        src={image.url}
        alt={image.alt || label || ''}
        className={clsx(
          'absolute inset-0 w-full h-full',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
        )}
        style={objectPosition ? { objectPosition } : undefined}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        {...(image.width  ? { width:  image.width  } : {})}
        {...(image.height ? { height: image.height } : {})}
      />
    </div>
  )
}
