import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  /** "light" = white artwork for dark / photographic backgrounds, "dark" = brand colours for ivory. */
  tone?: 'light' | 'dark'
  /** "compact" = mark + typeset wordmark (header). "full" = the complete supplied logo lock-up incl. tagline (footer). */
  variant?: 'compact' | 'full'
  className?: string
  onClick?: () => void
}

/** Green Leaf Residency logo, built from the supplied transparent artwork. */
export function Logo({ tone = 'dark', variant = 'compact', className, onClick }: LogoProps) {
  const light = tone === 'light'

  if (variant === 'full') {
    return (
      <Link href="/" onClick={onClick} aria-label="Green Leaf Residency — home" className={cn('inline-block', className)}>
        <Image
          src={light ? '/images/logo-full-white.png' : '/images/logo-full-transparent.png'}
          alt="Green Leaf Residency — Not Just a Stay, A Standard"
          width={979}
          height={857}
          sizes="200px"
          className="h-auto w-40 sm:w-44"
        />
      </Link>
    )
  }

  return (
    <Link href="/" onClick={onClick} aria-label="Green Leaf Residency — home" className={cn('group inline-flex items-center gap-3', className)}>
      <span className="relative block h-9 w-[66px] shrink-0 sm:h-10 sm:w-[74px]">
        <Image src="/images/logo-mark-color.png" alt="" fill sizes="74px" className={cn('object-contain transition-opacity duration-500', light ? 'opacity-0' : 'opacity-100')} />
        <Image src="/images/logo-mark-white.png" alt="" fill sizes="74px" className={cn('object-contain transition-opacity duration-500', light ? 'opacity-100' : 'opacity-0')} />
      </span>
      <span className={cn('flex flex-col leading-none transition-colors duration-500', light ? 'text-ivory' : 'text-forest')}>
        <span className="font-display text-[1.3rem] font-medium tracking-[0.14em] sm:text-[1.5rem]">GREEN LEAF</span>
        <span className="mt-1.5 text-[8.5px] tracking-[0.62em] sm:text-[9px]">RESIDENCY</span>
      </span>
    </Link>
  )
}
