'use client'

import type { DependencyList, RefObject } from 'react'
import { EASE, gsap, registerGsap, useIsoLayoutEffect } from './gsap'

const START = 'top 88%'

/**
 * Shared scroll-reveal system. Drop data attributes on any element inside `scope`:
 *
 *   data-r            fade + rise (data-delay="0.1" to offset)
 *   data-clip         clip-path image reveal (inner <img> / [data-clip-img] settles from 1.15 scale)
 *   data-lines        container whose [data-line] children reveal line-by-line
 *   data-parallax="8" scrubbed parallax (% travel) on a child taller than its overflow-hidden parent
 *   data-count="3"    number that counts up to 3 (rendered as 03)
 *
 * Everything is a no-op when the user prefers reduced motion; parallax is halved on small screens.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: DependencyList = []) {
  useIsoLayoutEffect(() => {
    registerGsap()
    const root = scope.current
    if (!root) return

    const mm = gsap.matchMedia(root)

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // elements inside a nested [data-own-reveal] boundary (e.g. GalleryGrid) animate themselves
      const q = <T extends HTMLElement>(sel: string) =>
        gsap.utils.toArray<T>(sel, root).filter((el) => {
          const own = el.closest('[data-own-reveal]')
          return !own || own === root
        })
      const trigger = (el: Element, start = START) => ({ trigger: el, start, once: true })

      q('[data-r]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1, ease: EASE.out, delay: Number(el.dataset.delay ?? 0), scrollTrigger: trigger(el) },
        )
      })

      q('[data-clip]').forEach((el) => {
        const inner = el.querySelector('img, [data-clip-img]')
        const tl = gsap.timeline({ delay: Number(el.dataset.delay ?? 0), scrollTrigger: trigger(el, 'top 90%') })
        tl.fromTo(
          el,
          { opacity: 0, clipPath: 'inset(12% 12% 12% 12%)' },
          { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: EASE.expo },
        )
        if (inner) tl.fromTo(inner, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: EASE.expo }, 0)
      })

      q('[data-lines]').forEach((el) => {
        const lines = el.querySelectorAll('[data-line]')
        if (!lines.length) return
        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 1 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: EASE.expo, stagger: 0.1, scrollTrigger: trigger(el) },
        )
      })

      q('[data-grow]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, opacity: 1, transformOrigin: 'left center' },
          { scaleX: 1, opacity: 1, duration: 1.4, ease: EASE.expo, delay: Number(el.dataset.delay ?? 0), scrollTrigger: trigger(el, 'top 95%') },
        )
      })

      q('[data-words]').forEach((el) => {
        const words = el.querySelectorAll('[data-word]')
        if (!words.length) return
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 1 },
          { yPercent: 0, opacity: 1, duration: 1, ease: EASE.expo, stagger: 0.045, scrollTrigger: trigger(el, 'top 80%') },
        )
      })

      q('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const counter = { v: 0 }
        el.textContent = '00'
        gsap.to(counter, {
          v: target,
          duration: 1.1,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v)).padStart(2, '0')
          },
          scrollTrigger: trigger(el, 'top 92%'),
        })
      })
    })

    // Parallax, intensity reduced on small screens
    mm.add(
      { desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)' },
      (ctx) => {
        const factor = ctx.conditions?.desktop ? 1 : 0.4
        gsap.utils.toArray<HTMLElement>('[data-parallax]', root).filter((el) => { const own = el.closest('[data-own-reveal]'); return !own || own === root }).forEach((el) => {
          const amount = Number(el.dataset.parallax || 8) * factor
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      },
    )

    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Shared cinematic intro for hero sections (Home + PageHero). Expects, inside `scope`:
 * [data-hero-bg] (parallax wrapper) > [data-hero-img], [data-hero-eyebrow], [data-line]s,
 * [data-hero-copy], [data-hero-cta] (many), [data-hero-deco] (many), [data-scroll-line].
 */
export function useHeroIntro(scope: RefObject<HTMLElement | null>, delay = 0) {
  useIsoLayoutEffect(() => {
    registerGsap()
    const root = scope.current
    if (!root) return
    const mm = gsap.matchMedia(root)

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: EASE.out }, delay })
      const step = (sel: string, from: gsap.TweenVars, to: gsap.TweenVars, at: number) => {
        if (root.querySelector(sel)) tl.fromTo(sel, from, to, at)
      }
      step('[data-hero-img]', { scale: 1.08 }, { scale: 1, duration: 1.4, ease: EASE.expo }, 0)
      step('[data-hero-eyebrow]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.35)
      step('[data-line]', { yPercent: 110, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 1, ease: EASE.expo, stagger: 0.12 }, 0.5)
      step('[data-hero-copy]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
      step('[data-hero-cta]', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.15)
      step('[data-hero-deco]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 1.4)

      if (root.querySelector('[data-scroll-line]')) {
        gsap.fromTo(
          '[data-scroll-line]',
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 1.4, ease: 'power2.inOut', repeat: -1, repeatDelay: 0.4, delay: 2 },
        )
      }
    })

    // Subtle scroll parallax, gentler on phones
    mm.add(
      { desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)' },
      (ctx) => {
        gsap.to('[data-hero-bg]', {
          yPercent: ctx.conditions?.desktop ? 5 : 2,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        })
      },
    )

    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
