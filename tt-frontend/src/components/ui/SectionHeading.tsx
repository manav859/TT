import { RevealText } from '@/lib/animations/RevealText'
import clsx from 'clsx'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', className, size = 'md' }: SectionHeadingProps) {
  return (
    <div className={clsx('space-y-4', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className="tt-caption">{eyebrow}</p>
      )}
      <RevealText
        as="h2"
        className={clsx(
          'tt-serif',
          size === 'lg' && 'tt-heading-xl',
          size === 'md' && 'tt-heading-lg',
          size === 'sm' && 'text-2xl font-light',
        )}
      >
        {title}
      </RevealText>
      {subtitle && (
        <p className="tt-body max-w-prose">{subtitle}</p>
      )}
    </div>
  )
}
