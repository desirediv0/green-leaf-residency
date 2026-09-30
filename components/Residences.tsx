'use client'

import { BedDouble, Laptop, Snowflake, Sparkles, Utensils, Wifi } from 'lucide-react'
import { useRef } from 'react'
import { ResidenceCard, type Residence } from '@/components/ResidenceCard'
import { Eyebrow, Heading, headingSize } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { PHOTOS } from '@/lib/site'

const features = [
  { label: 'Fully Furnished', icon: BedDouble },
  { label: 'Air Conditioning', icon: Snowflake },
  { label: 'Wi-Fi', icon: Wifi },
  { label: 'Kitchen Facility', icon: Utensils },
  { label: 'Housekeeping', icon: Sparkles },
  { label: 'Workspace', icon: Laptop },
]

const RESIDENCES: Residence[] = [
  {
    index: 1,
    label: 'Studio Apartment',
    type: '1RK',
    slug: '1rk',
    title: 'A considered space|to call your own.',
    description:
      'A calm, fully furnished studio with a comfortable sleeping area, practical workspace and everything you need for a smooth stay.',
    photo: PHOTOS.bedroom,
    alt: 'Furnished 1RK studio apartment with bed, wardrobe and balcony',
    cta: 'Explore 1RK',
    features,
  },
  {
    index: 2,
    label: 'One Bedroom Residence',
    type: '1 BHK',
    slug: '1bhk',
    title: 'Room to live, work|and unwind.',
    description:
      'A generous one bedroom residence with an easy flow between living, working and resting — made for longer stays.',
    photo: PHOTOS.bedroomTwo,
    alt: 'Furnished 1 BHK residence bedroom',
    cta: 'Explore 1 BHK',
    features,
  },
]

export function Residences() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="residences" className="bg-cream/60">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16">
        <div className="mb-16 grid gap-8 md:mb-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div data-r>
              <Eyebrow>The Residences</Eyebrow>
            </div>
            <Heading className={`mt-6 ${headingSize}`} lines={['Designed around', <em key="e">your everyday.</em>]} />
          </div>
          <p data-r className="max-w-sm text-[15px] leading-[1.7] text-muted lg:col-span-4 lg:justify-self-end">
            Thoughtfully furnished residences for professionals, extended stays and modern urban living.
          </p>
        </div>

        <div className="space-y-14 md:space-y-16 lg:space-y-20">
          {RESIDENCES.map((r, i) => (
            <ResidenceCard key={r.type} residence={r} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
