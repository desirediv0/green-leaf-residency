'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { gsap, registerGsap } from '@/lib/gsap'
import type { LightboxItem } from '@/lib/content'

type Props = {
  items: LightboxItem[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Lightbox({ items, index, onIndexChange, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const closing = useRef(false)
  const item = items[index]

  const step = useCallback((dir: 1 | -1) => onIndexChange((index + dir + items.length) % items.length), [index, items.length, onIndexChange])

  const close = useCallback(() => {
    const overlay = overlayRef.current
    if (closing.current) return
    closing.current = true
    if (!overlay || reduced()) return onClose()
    gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose })
  }, [onClose])

  // Open: fade in, lock scroll, focus, restore focus on unmount
  useEffect(() => {
    registerGsap()
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    if (overlayRef.current && !reduced()) gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  // Image swap animation
  useEffect(() => {
    if (!stageRef.current || reduced()) return
    const tween = gsap.fromTo(stageRef.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
    return () => {
      tween.kill()
    }
  }, [index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, step])

  const navButton = 'absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 text-ivory backdrop-blur transition-colors hover:bg-ivory hover:text-forest sm:size-12'

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={close}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
      }}
      className="fixed inset-0 z-[70] flex flex-col bg-forest-deep/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-5 py-4 text-ivory sm:px-8">
        <span className="text-[11px] tracking-[0.24em] text-ivory/70">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" aria-label="Close viewer" onClick={close} className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-forest">
          <X size={20} strokeWidth={1.4} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), step(-1))} className={`${navButton} left-3 sm:left-6`}>
          <ChevronLeft size={22} strokeWidth={1.4} />
        </button>
        <div ref={stageRef} onClick={(e) => e.stopPropagation()} className="relative h-full w-full max-w-6xl">
          <Image src={item.photo.src} alt={item.caption} fill sizes="100vw" className="object-contain" priority />
        </div>
        <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), step(1))} className={`${navButton} right-3 sm:right-6`}>
          <ChevronRight size={22} strokeWidth={1.4} />
        </button>
      </div>

      <div className="px-5 py-5 text-center sm:py-6">
        <p className="font-display text-xl text-ivory sm:text-2xl">{item.caption}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.26em] text-olive">{item.category}</p>
      </div>
    </div>
  )
}
