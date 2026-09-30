'use client'

import { useRef } from 'react'
import { Eyebrow, Heading, headingSize } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { AMENITIES } from '@/lib/site'

export function Amenities() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="amenities" className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div data-r>
              <Eyebrow>The Essentials</Eyebrow>
            </div>
            <Heading className={`mt-6 ${headingSize}`} lines={['Made for', <em key="e">Comfortable</em>, 'Living']} />
            <p data-r className="mt-8 max-w-xs text-[15px] leading-[1.7] text-muted">
              Everything is in place, so you can focus on the things that matter.
            </p>
          </div>
        </div>

        <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
          {AMENITIES.map(({ title, icon: Icon }, i) => (
            <li key={title} data-r data-delay={(i % 2) * 0.08}>
              <div className="group relative flex items-center gap-5 border-b border-line px-1 py-6 transition-colors duration-500 hover:bg-cream/70 sm:gap-6 sm:py-7 sm:hover:px-3">
                <span className="w-8 shrink-0 text-[11px] tracking-[0.2em] text-olive transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:text-forest">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-display text-[1.45rem] leading-tight text-forest sm:text-[1.6rem]">{title}</span>
                <Icon
                  size={22}
                  strokeWidth={1.2}
                  className="shrink-0 text-leaf transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 group-hover:-rotate-6"
                />
                <span aria-hidden className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-forest transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
