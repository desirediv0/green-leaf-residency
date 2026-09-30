'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { Logo } from '@/components/ui/Logo'
import { useReveal } from '@/lib/animations'
import { SITE } from '@/lib/site'

const heading = 'mb-5 text-[10px] font-medium uppercase tracking-[0.26em] text-olive'

/** Footer link: colour fade + a small arrow that slides in on hover. */
function FooterLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = 'group inline-flex items-center gap-2 text-[14px] text-ivory/75 transition-colors duration-300 hover:text-sage'
  const arrow = <ArrowRight size={13} strokeWidth={1.6} className="-translate-x-1.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
  return href.startsWith('/') ? (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  ) : (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
      {arrow}
    </a>
  )
}

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Residences', href: '/residences' },
      { label: 'Amenities', href: '/amenities' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Find Us', href: '/contact#location' },
      { label: 'Contact', href: '/contact' },
      { label: 'Enquire Now', href: '/enquire' },
    ],
  },
  {
    title: 'Residences',
    links: [
      { label: '1RK Studio', href: '/residences/1rk' },
      { label: '1 BHK Residence', href: '/residences/1bhk' },
    ],
  },
]

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <footer ref={ref} className="bg-forest-deep text-ivory [.has-cta_&]:pb-16 sm:[.has-cta_&]:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-24">
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-12">
          <div data-r className="sm:col-span-2 lg:col-span-3">
            <Logo tone="light" variant="full" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ivory/60">
              Comfortable, fully furnished serviced residences designed for modern living in Gurugram.
            </p>
          </div>

          {COLUMNS.map((col, i) => (
            <nav key={col.title} aria-label={col.title} data-r data-delay={0.08 * (i + 1)} className="lg:col-span-2">
              <h4 className={heading}>{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div data-r data-delay="0.32" className="lg:col-span-3">
            <h4 className={heading}>Contact</h4>
            <ul className="space-y-3">
              {SITE.phones.map((p) => (
                <li key={p.tel}>
                  <FooterLink href={`tel:${p.tel}`}>{p.label}</FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <FooterLink href={SITE.directions}>{SITE.region}</FooterLink>
              </li>
              <li>
                <FooterLink href={`mailto:${SITE.email}`}>
                  <span className="break-words">{SITE.email}</span>
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div data-grow className="h-px w-full bg-ivory/15" />
        <div className="flex flex-col gap-4 py-7 text-[12px] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© Green Leaf Residency. All Rights Reserved.</p>
          <p className="flex gap-6">
            <a href="#" className="transition-colors hover:text-sage">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-sage">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
