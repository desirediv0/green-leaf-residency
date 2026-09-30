'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { PHOTOS } from '@/lib/site'

/** Full-bleed immersive break with scrubbed parallax. */
export function FeatureBreak() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-forest-deep text-ivory md:min-h-[46rem] md:items-center lg:h-[88svh]">
      <div data-parallax="8" className="absolute inset-x-0 -top-[10%] -z-20 h-[120%]">
        <Image
          src={PHOTOS.terrace.src}
          alt="Landscaped rooftop terrace at Green Leaf Residency in golden light"
          fill
          sizes="100vw"
          className="object-cover object-[38%_50%] md:object-center"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/35 to-forest/30 md:bg-gradient-to-r md:from-forest-deep/80 md:via-forest-deep/35 md:to-transparent" />

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-24 sm:px-8 md:py-14 lg:px-12">
        <div data-r>
          <Eyebrow tone="light" className="text-sage">
            Living, elevated
          </Eyebrow>
        </div>
        <Heading
          className="mt-6 max-w-4xl text-[length:clamp(2rem,7vw,5.4rem)] text-ivory [&_em]:text-sage"
          lines={['Comfort that feels like home.', <em key="e">Convenience that fits your lifestyle.</em>]}
        />
      </div>
    </section>
  )
}
