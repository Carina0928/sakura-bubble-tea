import Link from 'next/link'
import clsx from 'clsx'

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2'

  const variants = {
    primary: 'bg-pink-600 text-white hover:bg-pink-700 active:scale-[0.98]',
    secondary: 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]',
    outline: 'border border-stone-300 text-stone-700 hover:border-stone-400 hover:bg-stone-50',
    ghost: 'text-stone-600 hover:text-stone-900 hover:bg-stone-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2',
  }

  const classes = clsx(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
}

export function SectionHeader({ eyebrow, title, description, centered, light }: SectionHeaderProps) {
  return (
    <div className={clsx('max-w-2xl', centered && 'mx-auto text-center')}>
      {eyebrow && (
        <p className={clsx(
          'text-xs font-medium tracking-[0.15em] uppercase mb-3',
          light ? 'text-pink-300' : 'text-pink-600'
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx(
        'font-display text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-4',
        light ? 'text-white' : 'text-stone-900'
      )}>
        {title}
      </h2>
      {description && (
        <p className={clsx(
          'text-base sm:text-lg leading-relaxed',
          light ? 'text-stone-300' : 'text-stone-500'
        )}>
          {description}
        </p>
      )}
    </div>
  )
}

export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'brand' | 'gold' }) {
  const variants = {
    default: 'bg-stone-100 text-stone-600',
    brand: 'bg-pink-50 text-pink-700',
    gold: 'bg-amber-50 text-amber-700',
  }
  return (
    <span className={clsx('inline-block px-2.5 py-0.5 text-xs font-medium rounded-sm', variants[variant])}>
      {children}
    </span>
  )
}

export function Divider({ className }: { className?: string }) {
  return <hr className={clsx('border-stone-200', className)} />
}
