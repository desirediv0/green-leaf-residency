'use client'

import type { LucideIcon } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { RevealImage } from '@/components/ui/RevealImage'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import type { Photo } from '@/lib/site'
import { cn } from '@/lib/utils'

export type Residence = {
  index: number
  label: string
  type: string
  slug: string
  title: string
  description: string
  photo: Photo
  alt: string
  cta: string
  features: { label: string; icon: LucideIcon }[]
}

export function ResidenceCard({ residence, reverse = false }: { residence: Residence; reverse?: boolean }) {
  const { index, label, type, title, description, photo, alt, cta, features, slug } = residence

  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-24">
      <RevealImage
        photo={photo}
        alt={alt}
        sizes="(min-width: 1024px) 58vw, 100vw"
        parallax={5}
        className={cn('aspect-[4/5] w-full sm:aspect-[4/3] lg:col-span-7 lg:aspect-[5/4]', reverse && 'lg:order-2')}
        imgClassName="object-[50%_60%]"
      />

      <div className={cn('lg:col-span-5', reverse && 'lg:order-1')}>
        <div data-r className="flex items-center gap-5">
          <span className="font-display text-5xl italic leading-none text-olive sm:text-6xl">
            <span data-count={index}>{String(index).padStart(2, '0')}</span>
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div data-r data-delay="0.05" className="mt-8">
          <Eyebrow>
            {label} · {type}
          </Eyebrow>
        </div>
        <Heading as="h3" className="mt-5 text-[length:clamp(1.75rem,5vw,3.2rem)]" lines={title.split('|').map((l, i) => (i === 1 ? <em key={l}>{l}</em> : l))} />
        <p data-r className="mt-6 max-w-md text-[15px] leading-[1.7] text-muted">
          {description}
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-line sm:max-w-md">
          {features.map(({ label: text, icon: Icon }, i) => (
            <li key={text} data-r data-delay={i * 0.05} className="flex items-center gap-3 border-b border-line py-3.5 text-[13px] text-ink">
              <Icon size={16} strokeWidth={1.4} className="shrink-0 text-leaf" />
              {text}
            </li>
          ))}
        </ul>

        <div data-r className="mt-9">
          <ButtonLink
            href={`/residences/${slug}`}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {cta}
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}
