import { ArrowRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/** Internal routes use next/link (prefetch + client nav); everything else is a plain anchor. */
function Anchor({ href = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return href.startsWith('/') ? <Link href={href} {...props} /> : <a href={href} {...props} />
}

const variants = {
  solid: 'bg-forest text-ivory hover:bg-forest-deep border border-forest',
  outline: 'border border-forest/40 text-forest hover:bg-forest hover:text-ivory hover:border-forest',
  light: 'bg-ivory text-forest hover:bg-white border border-ivory',
  glass: 'border border-ivory/40 text-ivory backdrop-blur-sm hover:bg-ivory hover:text-forest',
} as const

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof variants
  icon?: LucideIcon | null
  external?: boolean
}

export function ButtonLink({ variant = 'solid', icon: Icon = ArrowRight, external, className, children, ...props }: ButtonLinkProps) {
  return (
    <Anchor
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0',
        variants[variant],
        className,
      )}
    >
      {children}
      {Icon && <Icon size={15} strokeWidth={1.6} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </Anchor>
  )
}

/** Understated underlined text link. */
export function TextLink({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Anchor
      {...props}
      className={cn(
        'group inline-flex items-center gap-3 border-b border-current pb-1.5 text-[12px] font-medium uppercase tracking-[0.16em] text-forest transition-colors hover:text-leaf',
        className,
      )}
    >
      {children}
      <ArrowRight size={14} strokeWidth={1.6} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Anchor>
  )
}
