'use client'

import { Building2, MapPin, Utensils } from 'lucide-react'
import { useRef } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow, Heading, headingSize } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { SITE } from '@/lib/site'

const POINTS = [
  { icon: MapPin, text: 'Sector 15 Part 2, Gurugram' },
  { icon: Building2, text: 'Corporate offices & business districts' },
  { icon: Utensils, text: 'Restaurants, cafes & everyday conveniences' },
]

export function Location() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="location" className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        <div className="lg:col-span-5">
          <div data-r>
            <Eyebrow>Find Us</Eyebrow>
          </div>
          <Heading className="mt-6 text-[length:clamp(1.9rem,5.4vw,3.6rem)]" lines={['Connected to Gurugram.', <em key="e">Close to What Matters.</em>]} />
          <p data-r className="mt-8 max-w-md text-[15px] leading-[1.7] text-muted">
            Located in Sector 15 Part 2, Gurugram, Green Leaf Residency offers convenient access to the city&apos;s major business, lifestyle and everyday destinations.
          </p>

          <ul className="mt-8 border-t border-line">
            {POINTS.map(({ icon: Icon, text }, i) => (
              <li key={text} data-r data-delay={i * 0.06} className="flex items-center gap-4 border-b border-line py-4 text-[14px] text-ink">
                <Icon size={17} strokeWidth={1.4} className="shrink-0 text-leaf" />
                {text}
              </li>
            ))}
          </ul>

          <div data-r className="mt-9">
            <ButtonLink href={SITE.directions} external variant="solid" className="w-full sm:w-auto">
              Get Directions
            </ButtonLink>
          </div>
        </div>

        <div data-clip className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-cream sm:aspect-[4/3] lg:col-span-7 lg:aspect-[5/4]">
          <iframe
            title="Green Leaf Residency location map — Sector 15 Part 2, Gurugram"
            src={SITE.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0 saturate-[0.7] contrast-[0.95]"
          />
          <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 border border-line bg-ivory/95 px-4 py-3 shadow-[0_10px_30px_-12px_rgba(15,77,50,0.35)] backdrop-blur sm:bottom-6 sm:left-6">
            <MapPin size={18} strokeWidth={1.5} className="text-forest" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg text-forest">Green Leaf Residency</span>
              <span className="text-[11px] text-muted">{SITE.area}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
