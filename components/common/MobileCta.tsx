'use client'

import { MessageCircle, Phone, Send } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { SITE } from '@/lib/site'

const btn = 'flex min-h-12 flex-1 items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em]'

/**
 * Floating Call / WhatsApp / Enquire bar for phones. Mounting it flags <body> so the footer
 * adds bottom padding and nothing sits underneath the bar.
 */
export function MobileCta() {
  useEffect(() => {
    document.body.classList.add('has-cta')
    return () => document.body.classList.remove('has-cta')
  }, [])

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-40 flex overflow-hidden rounded-xl border border-line bg-ivory/95 shadow-[0_10px_40px_-8px_rgba(15,77,50,0.35)] backdrop-blur-lg sm:hidden"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={`tel:${SITE.phone.primary}`} className={`${btn} text-forest`}>
        <Phone size={14} strokeWidth={1.6} /> Call
      </a>
      <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className={`${btn} border-x border-line text-forest`}>
        <MessageCircle size={14} strokeWidth={1.6} /> WhatsApp
      </a>
      <Link href="/enquire" className={`${btn} bg-forest text-ivory`}>
        <Send size={14} strokeWidth={1.6} /> Enquire
      </Link>
    </div>
  )
}
