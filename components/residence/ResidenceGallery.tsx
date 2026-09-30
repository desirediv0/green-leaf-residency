'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { ResidenceImage } from '@/lib/residences'
import { gsap, registerGsap, useIsoLayoutEffect } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/** Large main image + thumbnail rail. Thumbnails scroll horizontally on phones; the main image cross-animates with GSAP. */
export function ResidenceGallery({ images, className }: { images: ResidenceImage[]; className?: string }) {
  const [active, setActive] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useIsoLayoutEffect(() => {
    registerGsap()
    if (first.current) {
      first.current = false
      return
    }
    if (!stage.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tween = gsap.fromTo(stage.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' })
    return () => {
      tween.kill()
    }
  }, [active])

  const current = images[active]

  return (
    <div className={cn("min-w-0", className)}>
      <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream sm:aspect-[16/11]">
        <div ref={stage} className="absolute inset-0">
          <Image key={current.photo.src} src={current.photo.src} alt={current.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority={active === 0} />
        </div>
      </div>
      <div data-r className="-mx-5 mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-6 sm:overflow-visible sm:px-0">
        {images.map((img, i) => (
          <button
            key={img.photo.src}
            type="button"
            aria-label={`Show photo ${i + 1}: ${img.alt}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-[4/3] w-24 shrink-0 snap-start overflow-hidden rounded-lg border-2 transition-all duration-300 sm:w-auto',
              i === active ? 'border-forest' : 'border-transparent opacity-60 hover:opacity-100',
            )}
          >
            <Image src={img.photo.src} alt="" fill sizes="(min-width: 640px) 10vw, 96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
