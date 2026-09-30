'use client'

import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import { useReveal } from '@/lib/animations'
import { SITE } from '@/lib/site'

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="contact" className="relative isolate overflow-hidden bg-forest text-ivory">
      <Image
        src="/images/logo-mark-white.png"
        alt=""
        width={829}
        height={573}
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 w-[36rem] max-w-none opacity-[0.05] lg:w-[52rem]"
      />

      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:py-14 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-16">
        <div className="lg:col-span-6 lg:pr-8">
          <div data-r>
            <Eyebrow tone="light" className="text-sage">
              Let&apos;s Talk
            </Eyebrow>
          </div>
          <Heading
            className="mt-6 text-[length:clamp(2.1rem,7vw,5rem)] text-ivory [&_em]:text-sage"
            lines={['Ready to Find', <em key="e">Your Space?</em>]}
          />
          <p data-r className="mt-8 max-w-md text-[15px] leading-[1.7] text-ivory/75 sm:text-base">
            Tell us what you&apos;re looking for and our team will help you find the right residence.
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <ButtonLink data-r href={`tel:${SITE.phone.primary}`} variant="light" icon={Phone}>
              Call Now
            </ButtonLink>
            <ButtonLink data-r data-delay="0.08" href={SITE.whatsapp} external variant="glass" icon={MessageCircle}>
              WhatsApp Us
            </ButtonLink>
            <ButtonLink data-r data-delay="0.16" href="#enquiry" variant="glass" icon={Send}>
              Send Enquiry
            </ButtonLink>
          </div>

          <ul className="mt-12 max-w-md border-t border-ivory/15 text-[14px]">
            <li data-r className="flex items-center gap-4 border-b border-ivory/15 py-4">
              <Phone size={16} strokeWidth={1.4} className="shrink-0 text-olive" />
              <span className="flex flex-wrap gap-x-4">
                <a href={`tel:${SITE.phone.primary}`} className="hover:text-sage">{SITE.phone.primaryLabel}</a>
                <a href={`tel:${SITE.phone.secondary}`} className="hover:text-sage">{SITE.phone.secondaryLabel}</a>
              </span>
            </li>
            <li data-r className="flex items-center gap-4 border-b border-ivory/15 py-4">
              <Mail size={16} strokeWidth={1.4} className="shrink-0 text-olive" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-sage">{SITE.email}</a>
            </li>
            <li data-r className="flex items-center gap-4 border-b border-ivory/15 py-4">
              <MapPin size={16} strokeWidth={1.4} className="shrink-0 text-olive" />
              {SITE.area}
            </li>
          </ul>
        </div>

        <div data-r className="lg:col-span-6">
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}
