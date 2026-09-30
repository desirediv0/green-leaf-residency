import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, tone = 'dark', className }: { children: ReactNode; tone?: 'dark' | 'light'; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em]',
        tone === 'light' ? 'text-olive' : 'text-leaf',
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  )
}

/**
 * Editorial display heading. Each entry in `lines` sits in its own mask so
 * GSAP can reveal it line by line (`data-lines` on the wrapper, `data-line` on the inner span).
 * The `<em>` accent is styled via the `[&_em]` variants below.
 */
export function Heading({
  lines,
  as: Tag = 'h2',
  className,
  hero = false,
}: {
  lines: ReactNode[]
  as?: ElementType
  className?: string
  /** Hero headings are animated by the hero timeline instead of a scroll trigger. */
  hero?: boolean
}) {
  return (
    <Tag
      {...(hero ? {} : { 'data-lines': true })}
      className={cn('font-display font-normal tracking-[-0.015em] text-forest [&_em]:font-normal [&_em]:italic [&_em]:text-leaf', className, !className?.includes('leading-') && 'leading-[1.02]')}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em] mb-[-0.14em]">
          <span data-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export const headingSize = 'text-[length:clamp(1.9rem,6.4vw,4.4rem)]'
