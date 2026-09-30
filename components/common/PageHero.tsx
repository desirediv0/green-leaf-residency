'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import { useHeroIntro } from '@/lib/animations'
import type { Photo } from '@/lib/site'
import { cn } from '@/lib/utils'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow: string
  /** One entry per animated line; wrap the accent in <em>. */
  title: ReactNode[]
  description?: string
  breadcrumb: Crumb[]
  image: Photo
  alt: string
  /** CSS object-position, e.g. "50% 40%" */
  position?: string
  /**
   * full   – full-bleed cinematic image, copy bottom-left
   * center – full-bleed, centred copy
   * split  – deep-forest panel, copy left, framed rounded photo right
   */
  variant?: 'full' | 'center' | 'split'
  compact?: boolean
  children?: ReactNode
}

function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" data-hero data-hero-eyebrow>
      <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ivory/70">
        {[{ label: 'Home', href: '/' }, ...items].map((c, i, all) => (
          <li key={c.label} className="flex items-center gap-2">
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="transition-colors hover:text-sage">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-sage">
                {c.label}
              </span>
            )}
            {i < all.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Shared inner-page hero — same design language as Home, three compositions. */
export function PageHero({ eyebrow, title, description, breadcrumb, image, alt, position = '50% 50%', variant = 'full', compact, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  useHeroIntro(ref, 0.15)

  const copy = (
    <div className={cn(variant === 'center' && 'mx-auto text-center')}>
      <div className={cn(variant === 'center' && 'flex justify-center')}>
        <Breadcrumb items={breadcrumb} />
      </div>
      <div data-hero data-hero-eyebrow className={cn('mt-6', variant === 'center' && 'flex justify-center')}>
        <Eyebrow tone="light" className="text-sage">
          {eyebrow}
        </Eyebrow>
      </div>
      <Heading
        hero
        as="h1"
        className={cn(
          'mt-5 text-[length:clamp(2rem,8.6vw,4rem)] leading-[1] text-ivory md:text-[length:clamp(3.6rem,6.6vw,6.4rem)] [&_em]:text-sage',
          variant === 'split' && 'md:text-[length:clamp(3rem,5vw,5rem)]',
        )}
        lines={title}
      />
      {description && (
        <p data-hero data-hero-copy className={cn('mt-6 max-w-[34rem] text-[15px] leading-relaxed text-ivory/85 sm:text-base md:text-[17px]', variant === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
      {children && (
        <div data-hero data-hero-cta className={cn('mt-8 flex flex-col gap-3 sm:flex-row', variant === 'center' && 'justify-center')}>
          {children}
        </div>
      )}
    </div>
  )

  if (variant === 'split') {
    return (
      <section ref={ref} className="relative isolate overflow-hidden bg-forest-deep text-ivory">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 pb-16 pt-28 sm:px-8 md:pb-20 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:pb-24 lg:pt-36">
          <div className="lg:col-span-6">{copy}</div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[4/3] lg:aspect-[5/6]">
              <div data-hero-bg className="absolute inset-x-0 -top-[6%] h-[112%]">
                <div data-hero-img className="absolute inset-0">
                  <Image src={image.src} alt={alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: position }} />
                </div>
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate flex flex-col overflow-hidden bg-forest-deep text-ivory',
        compact ? 'min-h-[62svh]' : 'min-h-[86svh] md:min-h-[82svh]',
        variant === 'center' ? 'justify-center' : 'justify-end',
      )}
    >
      <div data-hero-bg className="absolute inset-x-0 -top-[6%] -z-20 h-[112%]">
        <div data-hero-img className="absolute inset-0">
          <Image src={image.src} alt={alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-forest-deep/55" />
      <div aria-hidden className={cn('absolute inset-0 -z-10', variant === 'center' ? 'bg-forest-deep/25' : 'bg-gradient-to-r from-forest-deep/70 via-forest-deep/20 to-transparent')} />
      <div className={cn('mx-auto w-full max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-12', compact ? 'pb-14 sm:pb-16' : 'pb-16 sm:pb-24')}>{copy}</div>
    </section>
  )
}
