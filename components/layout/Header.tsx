'use client'

import { ArrowRight, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { gsap, registerGsap } from '@/lib/gsap'
import { NAV_LINKS, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Home is active only on "/", every other link also matches its sub-routes (e.g. /residences/1rk). */
const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Transparent over the hero → ivory + blur + hairline once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Entrance (first load only – the header persists across pages)
  useEffect(() => {
    registerGsap()
    if (prefersReducedMotion() || !headerRef.current) return
    const tween = gsap.fromTo(headerRef.current, { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out', clearProps: 'transform' })
    return () => {
      tween.revert()
    }
  }, [])

  // Close the menu whenever the route changes
  useEffect(() => setOpen(false), [pathname])

  // Full-screen menu: fade the container, then slide items up one by one; reverses on close
  useEffect(() => {
    registerGsap()
    const menu = menuRef.current
    if (!menu) return
    const items = menu.querySelectorAll('[data-menu-item]')
    const instant = prefersReducedMotion()
    gsap.killTweensOf([menu, items])

    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(menu, { autoAlpha: 1 })
      if (instant) gsap.set(items, { opacity: 1, y: 0 })
      else {
        gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
        gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.15 })
      }
    } else {
      document.body.style.overflow = ''
      if (instant) gsap.set(menu, { autoAlpha: 0 })
      else {
        gsap.to(items, { opacity: 0, y: 16, duration: 0.25, ease: 'power2.in', stagger: { each: 0.03, from: 'end' } })
        gsap.to(menu, { autoAlpha: 0, duration: 0.35, delay: 0.15, ease: 'power2.in' })
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => () => void (document.body.style.overflow = ''), [])

  const close = () => setOpen(false)
  const overHero = !scrolled && !open

  return (
    <>
      <header
        ref={headerRef}
        data-hero
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          overHero ? 'border-transparent bg-transparent' : 'border-line bg-ivory/85 backdrop-blur-xl',
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo tone={overHero ? 'light' : 'dark'} />

          <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex 2xl:gap-10">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative py-1 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-500 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-out-expo hover:after:scale-x-100',
                    active ? 'after:scale-x-100' : 'after:scale-x-0',
                    overHero ? 'text-ivory' : active ? 'text-forest' : 'text-ink',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/enquire"
              className={cn(
                'hidden min-h-11 items-center gap-2 rounded-lg border px-5 text-[12px] font-medium uppercase tracking-[0.16em] transition-all duration-500 xl:inline-flex',
                overHero ? 'border-ivory/50 text-ivory hover:bg-ivory hover:text-forest' : 'border-forest bg-forest text-ivory hover:bg-forest-deep',
              )}
            >
              Enquire Now
              <ArrowRight size={14} strokeWidth={1.6} />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className={cn('inline-flex size-11 items-center justify-center rounded-lg transition-colors duration-500 xl:hidden', overHero ? 'text-ivory' : 'text-forest')}
            >
              <Menu size={26} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile / tablet menu */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className="invisible fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory opacity-0 xl:hidden"
      >
        <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-5 sm:px-8">
          <Logo tone="dark" onClick={close} />
          <button type="button" aria-label="Close menu" onClick={close} className="inline-flex size-11 items-center justify-center rounded-lg text-forest">
            <X size={26} strokeWidth={1.4} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 py-4 sm:px-8">
          <ul className="divide-y divide-line border-y border-line">
            {NAV_LINKS.map((link, i) => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.href} data-menu-item>
                  <Link href={link.href} onClick={close} aria-current={active ? 'page' : undefined} className="group flex items-baseline justify-between py-3 sm:py-4">
                    <span
                      className={cn(
                        'font-display text-[clamp(1.85rem,8vw,3rem)] leading-none transition-transform duration-500 group-hover:translate-x-2',
                        active ? 'text-leaf italic' : 'text-forest',
                      )}
                    >
                      {link.label}
                    </span>
                    <span className="text-[11px] tracking-[0.2em] text-olive">{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 px-5 pb-8 pt-2 sm:px-8">
          <p data-menu-item className="flex items-center gap-2 text-[12px] text-muted">
            <MapPin size={14} className="text-leaf" />
            {SITE.area}
          </p>
          <div data-menu-item className="grid grid-cols-2 gap-3">
            <a href={`tel:${SITE.phone.primary}`} onClick={close} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-forest/40 text-[12px] font-medium uppercase tracking-[0.14em] text-forest">
              <Phone size={15} strokeWidth={1.6} /> Call Now
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" onClick={close} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-forest/40 text-[12px] font-medium uppercase tracking-[0.14em] text-forest">
              <MessageCircle size={15} strokeWidth={1.6} /> WhatsApp
            </a>
          </div>
          <Link data-menu-item href="/enquire" onClick={close} className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-forest text-[12px] font-medium uppercase tracking-[0.16em] text-ivory">
            Enquire Now <ArrowRight size={15} strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </>
  )
}
