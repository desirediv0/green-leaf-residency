'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { useReveal } from '@/lib/animations'
import type { LightboxItem } from '@/lib/content'
import { ScrollTrigger, useIsoLayoutEffect } from '@/lib/gsap'

/** 1 / 2 / 3 columns to match the breakpoints (SSR renders 3, corrected before first paint). */
function useColumnCount() {
  const [count, setCount] = useState(3)
  useIsoLayoutEffect(() => {
    const queries = [window.matchMedia('(min-width: 1024px)'), window.matchMedia('(min-width: 640px)')]
    const update = () => setCount(queries[0].matches ? 3 : queries[1].matches ? 2 : 1)
    update()
    queries.forEach((q) => q.addEventListener('change', update))
    return () => queries.forEach((q) => q.removeEventListener('change', update))
  }, [])
  return count
}

type Props = { items: LightboxItem[]; onOpen: (index: number) => void }

/** Masonry: each photo goes to the currently shortest column so column bottoms stay level. Clip-path reveals on scroll. */
export function GalleryGrid({ items, onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const columnCount = useColumnCount()

  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => ({ height: 0, items: [] as { item: LightboxItem; index: number }[] }))
    items.forEach((item, index) => {
      const shortest = cols.reduce((a, b) => (b.height < a.height ? b : a))
      shortest.items.push({ item, index })
      shortest.height += item.photo.height / item.photo.width
    })
    return cols.map((c) => c.items)
  }, [items, columnCount])

  const key = items.map((i) => i.photo.src).join('|')
  useReveal(ref, [key, columnCount])

  // Filtering changes the page height, so re-measure every trigger below the grid
  useIsoLayoutEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [key, columnCount])

  return (
    <div ref={ref} data-own-reveal className="flex items-start gap-4 sm:gap-5">
      {columns.map((column, c) => (
        <ul key={c} className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
          {column.map(({ item, index }) => (
            <li key={item.photo.src}>
              <button
                type="button"
                data-clip
                onClick={() => onOpen(index)}
                aria-label={`View ${item.caption}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden bg-cream text-left"
              >
                <Image
                  src={item.photo.src}
                  alt={item.caption}
                  width={item.photo.width}
                  height={item.photo.height}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  className="h-auto w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 p-4 text-ivory opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5">
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.24em] text-sage">{item.category}</span>
                    <span className="mt-1 block font-display text-xl leading-tight">{item.caption}</span>
                  </span>
                  <ArrowUpRight size={18} strokeWidth={1.4} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

/** Filter tabs shared by the Home gallery section and the Gallery page. */
export function GalleryFilters<T extends string>({ categories, value, onChange }: { categories: readonly T[]; value: T; onChange: (c: T) => void }) {
  return (
    <div role="tablist" aria-label="Filter photos" className="-mx-5 flex gap-7 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {categories.map((c) => (
        <button
          key={c}
          role="tab"
          aria-selected={value === c}
          type="button"
          onClick={() => onChange(c)}
          className={`shrink-0 whitespace-nowrap border-b pb-2 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors ${value === c ? 'border-forest text-forest' : 'border-transparent text-muted hover:text-forest'}`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
