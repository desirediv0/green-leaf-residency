'use client'

import { useRef } from 'react'
import { TextLink } from '@/components/ui/ButtonLink'
import { RevealImage } from '@/components/ui/RevealImage'
import { Eyebrow, Heading, headingSize } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { photo, PHOTOS } from '@/lib/site'

/** Single-line botanical sprig, echoing the logo's leaf without becoming wallpaper. */
function Sprig({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 260" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className={className}>
      <path d="M62 258C60 190 66 100 58 6" />
      <path d="M62 212C34 208 16 190 10 166c28 2 48 20 52 46Z" />
      <path d="M61 164c28-2 46-18 54-42-28 0-49 16-54 42Z" />
      <path d="M60 118C34 114 20 98 14 76c26 2 44 16 46 42Z" />
      <path d="M59 72c22-4 36-18 42-38-22 0-38 12-42 38Z" />
    </svg>
  )
}

export function Lifestyle() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <Sprig className="pointer-events-none absolute -top-24 right-2 h-44 text-leaf/30 lg:-top-32 lg:right-0 lg:h-60" />
            <div data-r>
              <Eyebrow>Green Living</Eyebrow>
            </div>
            <Heading className={`mt-6 ${headingSize}`} lines={['A Greener', <em key="e">Way to Live</em>]} />
            <p data-r className="mt-8 max-w-sm text-[15px] leading-[1.7] text-muted">
              Thoughtfully maintained green spaces, open courtyards and naturally calm surroundings create a refreshing residential atmosphere in the middle of Gurugram.
            </p>
            <div data-r className="mt-9">
              <TextLink href="/gallery">See the spaces</TextLink>
            </div>
          </div>

          {/* Overlapping collage */}
          <div className="relative pb-12 lg:col-span-7 lg:pb-16">
            <div className="grid grid-cols-12 gap-3 sm:gap-5">
              <RevealImage
                photo={PHOTOS.planters}
                alt="Palms and planters along a Green Leaf Residency balcony"
                sizes="(min-width: 1024px) 40vw, 65vw"
                parallax={5}
                className="col-span-8 aspect-[4/5]"
              />
              <RevealImage
                photo={photo('7030')}
                alt="Landscaped terrace garden at night"
                sizes="(min-width: 1024px) 20vw, 32vw"
                delay={0.15}
                parallax={8}
                className="col-span-4 mt-10 aspect-[2/3] self-end sm:mt-28"
              />
            </div>
            <RevealImage
              photo={photo('7041')}
              alt="Balcony stairs with potted palms"
              sizes="(min-width: 1024px) 25vw, 45vw"
              delay={0.3}
              className="absolute bottom-0 left-[14%] aspect-[4/3] w-[46%] border-[6px] border-ivory sm:border-[10px] lg:left-[20%] lg:w-[40%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
