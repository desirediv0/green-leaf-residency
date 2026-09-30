'use client'

import { useRef } from 'react'
import { RevealImage } from '@/components/ui/RevealImage'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { photo, PHOTOS } from '@/lib/site'

const AUDIENCES = [
  {
    title: 'Working Professionals',
    copy: 'Comfortable long-term accommodation with essential everyday facilities.',
    photo: photo('7026'),
    alt: 'Furnished bedroom with a work desk',
  },
  {
    title: 'Corporate Employees',
    copy: 'A convenient residential base for professionals working in Gurugram.',
    photo: PHOTOS.corridor,
    alt: 'Bright residence corridor',
  },
  {
    title: 'Long-Term Residents',
    copy: 'A furnished, managed living environment that feels more like home.',
    photo: photo('7029'),
    alt: 'Living and kitchen area of a residence',
  },
]

export function IdealFor() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} className="border-t border-line bg-cream/60">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12">
        <div data-r>
          <Eyebrow>Made for Modern Urban Living</Eyebrow>
        </div>
        <Heading className="mt-6 max-w-2xl text-[length:clamp(1.9rem,5.4vw,3.6rem)]" lines={['Who feels at home', <em key="e">at Green Leaf.</em>]} />

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-3 md:gap-8 lg:gap-12">
          {AUDIENCES.map((a, i) => (
            <div key={a.title} className={i === 1 ? 'md:mt-16' : ''}>
              <RevealImage
                photo={a.photo}
                alt={a.alt}
                sizes="(min-width: 768px) 30vw, 100vw"
                delay={i * 0.1}
                className="aspect-[4/3] w-full md:aspect-[3/4]"
              />
              <div data-r className="mt-6 flex items-baseline gap-4 border-b border-line pb-3">
                <span className="text-[11px] tracking-[0.2em] text-olive">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[1.7rem] leading-tight text-forest">{a.title}</h3>
              </div>
              <p data-r className="mt-4 max-w-xs text-[14px] leading-[1.8] text-muted">
                {a.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
