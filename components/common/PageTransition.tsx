'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, registerGsap, ScrollTrigger, useIsoLayoutEffect } from '@/lib/gsap'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Global page transition. Internal link clicks fade the current page out (~0.25s) and then
 * navigate; the next page enters with opacity 0→1 / y 20→0 (0.6s, power3.out).
 * Navigation is never blocked: a safety timer navigates regardless of the tween.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const first = useRef(true)

  // Enter animation (skipped on the very first load — the hero has its own intro)
  useIsoLayoutEffect(() => {
    registerGsap()
    const el = ref.current
    if (!el) return
    if (first.current) {
      first.current = false
      return
    }
    if (reduced()) {
      gsap.set(el, { opacity: 1, y: 0 })
    } else {
      gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' })
    }
    // page height changed: re-measure every ScrollTrigger (incl. the shared footer)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  // Exit animation on internal navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return
      if (reduced() || !ref.current) return

      e.preventDefault()
      let done = false
      const go = () => {
        if (done) return
        done = true
        router.push(url.pathname + url.search + url.hash)
      }
      gsap.to(ref.current, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in', onComplete: go })
      window.setTimeout(go, 450)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  return (
    <main id="main" ref={ref}>
      {children}
    </main>
  )
}
