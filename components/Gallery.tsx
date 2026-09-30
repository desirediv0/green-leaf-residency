'use client'

import { useMemo, useRef, useState } from 'react'
import { GalleryFilters, GalleryGrid } from '@/components/gallery/GalleryGrid'
import { Lightbox } from '@/components/gallery/Lightbox'
import { TextLink } from '@/components/ui/ButtonLink'
import { Eyebrow, Heading, headingSize } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { GALLERY, GALLERY_CATEGORIES } from '@/lib/site'

/** Home-page gallery teaser; the full library lives at /gallery. */
export function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<(typeof GALLERY_CATEGORIES)[number]>('All')
  const [active, setActive] = useState<number | null>(null)
  const items = useMemo(() => GALLERY.filter((g) => filter === 'All' || g.category === filter), [filter])
  useReveal(ref)

  return (
    <section ref={ref} id="gallery" className="bg-cream/60">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16">
        <div className="mb-8 flex flex-col gap-10 md:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-r>
              <Eyebrow>The Property</Eyebrow>
            </div>
            <Heading className={`mt-6 ${headingSize}`} lines={['See it for', <em key="e">yourself.</em>]} />
          </div>
          <div data-r>
            <GalleryFilters categories={GALLERY_CATEGORIES} value={filter} onChange={setFilter} />
          </div>
        </div>

        <GalleryGrid items={items} onOpen={setActive} />

        <div data-r className="mt-10 flex justify-center">
          <TextLink href="/gallery">View the full gallery</TextLink>
        </div>
      </div>

      {active !== null && <Lightbox items={items} index={active} onIndexChange={setActive} onClose={() => setActive(null)} />}
    </section>
  )
}
