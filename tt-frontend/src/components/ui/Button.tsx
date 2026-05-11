import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'accent' | 'text'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
}

export function Button({ variant = 'primary', loading, className, children, disabled, as: Tag = 'button', href, ...rest }: ButtonProps) {
  const classes = clsx(
    'tt-button',
    variant === 'ghost'  && 'tt-button-ghost',
    variant === 'accent' && 'tt-button-accent',
    variant === 'text'   && 'bg-transparent border-transparent text-tt-ink p-0 underline hover:bg-transparent hover:opacity-60',
    className,
  )

  if (Tag === 'a') {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {loading ? <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
      </a>
    )
  }

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
    </button>
  )
}
