'use client'

import { useMemo, useRef, useState } from 'react'
import { GalleryFilters, GalleryGrid } from '@/components/gallery/GalleryGrid'
import { Lightbox } from '@/components/gallery/Lightbox'
import { Eyebrow } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { PAGE_GALLERY, PAGE_GALLERY_CATEGORIES } from '@/lib/content'

/** Filterable masonry + lightbox for the Gallery page. */
export function GalleryExplorer() {
  const ref = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<(typeof PAGE_GALLERY_CATEGORIES)[number]>('All')
  const [active, setActive] = useState<number | null>(null)
  const items = useMemo(() => PAGE_GALLERY.filter((g) => filter === 'All' || g.category === filter), [filter])
  useReveal(ref)

  return (
    <section ref={ref} className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-12 lg:px-12">
      <div className="mb-8 flex flex-col gap-8 md:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div data-r>
          <Eyebrow>{items.length} photographs</Eyebrow>
        </div>
        <div data-r>
          <GalleryFilters categories={PAGE_GALLERY_CATEGORIES} value={filter} onChange={setFilter} />
        </div>
      </div>

      <GalleryGrid items={items} onOpen={setActive} />

      {active !== null && <Lightbox items={items} index={active} onIndexChange={setActive} onClose={() => setActive(null)} />}
    </section>
  )
}
