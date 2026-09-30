'use client'

import { MapPin } from 'lucide-react'
import { getImageProps } from 'next/image'
import { useRef } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import { useHeroIntro } from '@/lib/animations'
import { PHOTOS } from '@/lib/site'

/** Art-directed hero: wide building shot on tablet+, portrait green-wall shot on phones. */
function useHeroSources() {
  const common = { alt: 'Green Leaf Residency building at dusk, Gurugram', fill: true, priority: true, sizes: '100vw' } as const
  const desktop = getImageProps({ ...common, src: PHOTOS.exterior.src }).props
  const mobile = getImageProps({ ...common, src: PHOTOS.heroMobile.src }).props
  return { desktop: desktop.srcSet, mobile: mobile.srcSet, img: mobile }
}

export function Hero() {
  const sources = useHeroSources()
  const ref = useRef<HTMLElement>(null)

  useHeroIntro(ref)

  return (
    <section ref={ref} id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-deep text-ivory">
      {/* Background photograph (parallax wrapper → scale-in wrapper → image) */}
      <div data-hero-bg className="absolute inset-x-0 -top-[6%] -z-20 h-[112%]">
        <div data-hero-img className="absolute inset-0">
          <picture>
            <source media="(min-width: 768px)" srcSet={sources.desktop} sizes="100vw" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...sources.img}
              srcSet={sources.mobile}
              alt="Green Leaf Residency, Gurugram"
              className="object-cover object-center"
            />
          </picture>
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/85 via-forest-deep/10 to-forest-deep/50" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/70 via-forest-deep/20 to-transparent" />

      <div className="mx-auto mt-auto w-full max-w-[1440px] px-5 pb-24 pt-28 sm:px-8 sm:pb-32 lg:px-12">
        <div data-hero data-hero-eyebrow>
          <Eyebrow tone="light" className="text-sage">
            Green Leaf Residency · Gurugram
          </Eyebrow>
        </div>

        <Heading
          hero
          as="h1"
          className="mt-5 text-[length:clamp(2.1rem,9.4vw,4.4rem)] leading-[0.98] text-ivory md:mt-7 md:text-[length:clamp(4rem,8vw,7.5rem)] [&_em]:text-sage"
          lines={['Live Comfortably.', <em key="e">Stay Effortlessly.</em>]}
        />

        <p data-hero data-hero-copy className="mt-6 max-w-[34rem] text-[15px] leading-relaxed text-ivory/85 sm:text-base md:mt-8 md:text-[17px]">
          Fully furnished serviced residences designed for comfortable, convenient and hassle-free urban living.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <ButtonLink data-hero data-hero-cta href="/residences" variant="light" className="w-full sm:w-auto">
            Explore Residences
          </ButtonLink>
          <ButtonLink data-hero data-hero-cta href="/enquire" variant="glass" className="w-full sm:w-auto">
            Enquire Now
          </ButtonLink>
        </div>
      </div>

      {/* Bottom rail */}
      <div data-hero data-hero-deco className="absolute inset-x-0 bottom-0 hidden border-t border-ivory/20 sm:block">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-8 text-[11px] uppercase tracking-[0.22em] text-ivory/80 lg:px-12">
          <span className="flex items-center gap-2.5">
            <MapPin size={14} strokeWidth={1.5} /> Sector 15 Part 2 · Gurugram
          </span>
          <span className="flex items-center gap-4">
            Scroll to Explore
            <span className="relative flex h-9 w-px overflow-hidden bg-ivory/25">
              <span data-scroll-line className="absolute inset-0 bg-ivory" />
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
