'use client'

import { useRef } from 'react'
import { RevealImage } from '@/components/ui/RevealImage'
import { TextLink } from '@/components/ui/ButtonLink'
import { Eyebrow, Heading, headingSize } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { PHOTOS } from '@/lib/site'

const FACTS = ['1RK & 1BHK', 'Fully Furnished', 'Professional Living', 'Managed Residence']

export function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="about" className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        <div className="relative lg:col-span-6">
          <RevealImage
            photo={PHOTOS.courtyard}
            alt="Green courtyard inside Green Leaf Residency"
            sizes="(min-width: 1024px) 45vw, 100vw"
            parallax={6}
            className="aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[4/5] lg:max-h-[46rem]"
            imgClassName="object-[50%_35%]"
          />
          <span data-r className="absolute -bottom-5 right-4 bg-ivory px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-leaf sm:right-8 lg:-right-6">
            Sector 15 Part 2
          </span>
        </div>

        <div className="lg:col-span-6 lg:pl-6 xl:pl-12">
          <div data-r>
            <Eyebrow>About Green Leaf Residency</Eyebrow>
          </div>
          <Heading className={`mt-6 ${headingSize}`} lines={['Your Home Away From Home', <em key="e">in Gurugram.</em>]} />

          <div className="mt-8 max-w-[34rem] space-y-4 text-[15px] leading-[1.7] text-muted sm:text-base">
            <p data-r>
              Welcome to Green Leaf Residency, your comfortable and well-equipped home away from home in Sector 15 Part 2, Gurugram.
            </p>
            <p data-r data-delay="0.08">
              Designed for modern living, we offer fully furnished 1RK and 1 BHK serviced residences with the essential facilities you need for a comfortable, hassle-free stay.
            </p>
            <p data-r data-delay="0.16">
              From high-speed Wi-Fi and regular housekeeping to a well-maintained living space and a comfortable environment, everything is thoughtfully managed to make everyday living easier.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 border-t border-line">
            {FACTS.map((fact, i) => (
              <div
                key={fact}
                data-r
                data-delay={i * 0.08}
                className="flex flex-col gap-3 border-b border-line py-5 pr-4 odd:border-r odd:pl-0 even:pl-5 sm:py-6 sm:even:pl-8"
              >
                <dt className="text-[10px] tracking-[0.24em] text-olive">
                  <span data-count={i + 1}>{String(i + 1).padStart(2, '0')}</span>
                </dt>
                <dd className="font-display text-[1.35rem] leading-tight text-forest sm:text-[1.7rem]">{fact}</dd>
              </div>
            ))}
          </dl>

          <div data-r className="mt-10">
            <TextLink href="/residences">Discover the residences</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
