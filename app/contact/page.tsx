import { Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { MobileCta } from '@/components/common/MobileCta'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { LOCATION_CATEGORIES } from '@/lib/content'
import { pageMeta } from '@/lib/seo'
import { photo, SITE } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Green Leaf Residency | Contact',
  description: 'Contact Green Leaf Residency, Sector 15 Part 2, Gurugram — call 84470 16044, WhatsApp us, send an enquiry or get directions to our location.',
  path: '/contact',
  image: '/images/img-7041.jpg',
})

const row = 'group flex items-start gap-5 border-b border-line py-5'
const iconCls = 'mt-1 shrink-0 text-leaf transition-transform duration-500 ease-out-expo group-hover:translate-x-1'

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Contact"
        title={['Let’s Find the Right', <em key="e">Space for You.</em>]}
        breadcrumb={[{ label: 'Contact' }]}
        image={photo('7041')}
        alt="Balcony with potted palms at Green Leaf Residency"
        position="50% 55%"
      />

      <Reveal className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:py-12 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Get in Touch" lines={['We’d love to', <em key="e">hear from you.</em>]} description="Call, message or send an enquiry — our team will help you find the right residence." />

          <ul className="mt-10 border-t border-line">
            <li data-r className={row}>
              <Phone size={18} strokeWidth={1.3} className={iconCls} />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">Phone</p>
                <div className="mt-2 flex flex-col gap-1">
                  {SITE.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="font-display text-[1.6rem] leading-tight text-forest transition-colors hover:text-leaf">
                      {p.label}
                    </a>
                  ))}
                </div>
              </div>
            </li>
            <li data-r className={row}>
              <Mail size={18} strokeWidth={1.3} className={iconCls} />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">Email</p>
                <a href={`mailto:${SITE.email}`} className="mt-2 block break-all font-display text-[1.35rem] leading-tight text-forest transition-colors hover:text-leaf sm:text-[1.6rem]">
                  {SITE.email}
                </a>
              </div>
            </li>
            <li data-r className={row}>
              <MapPin size={18} strokeWidth={1.3} className={iconCls} />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">Location</p>
                <p className="mt-2 font-display text-[1.6rem] leading-tight text-forest">
                  Sector 15 Part 2
                  <br />
                  Gurugram, Haryana
                </p>
              </div>
            </li>
          </ul>

          <div data-r className="mt-8 grid gap-3 sm:grid-cols-2">
            <ButtonLink href={`tel:${SITE.phone.primary}`} variant="solid" icon={Phone}>
              Call Now
            </ButtonLink>
            <ButtonLink href={SITE.whatsapp} external variant="outline" icon={MessageCircle}>
              WhatsApp Us
            </ButtonLink>
          </div>
        </div>

        <div data-r className="lg:col-span-7">
          <EnquiryForm id="contact-form" className="border border-line shadow-[0_30px_70px_-40px_rgba(15,77,50,0.35)]" />
        </div>
      </Reveal>

      {/* LOCATION (merged from the former /location page) */}
      <Reveal id="location" className="border-t border-line bg-cream/60">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <SectionHeading className="lg:col-span-7" eyebrow="Find Us" lines={['Connected to Gurugram.', <em key="e">Close to what matters.</em>]} />
            <p data-r className="max-w-md text-[15px] leading-[1.7] text-muted lg:col-span-5">
              Located in Sector 15 Part 2, Gurugram, Green Leaf Residency offers convenient access to the city&apos;s major business, lifestyle and everyday destinations.
            </p>
          </div>

          <div data-clip className="relative mt-10 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-cream sm:aspect-[16/10] lg:mt-14 lg:aspect-[16/8]">
            <iframe
              title="Green Leaf Residency location map — Sector 15 Part 2, Gurugram"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0 saturate-[0.7] contrast-[0.95]"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 border border-line bg-ivory/95 px-4 py-3 shadow-[0_10px_30px_-12px_rgba(15,77,50,0.35)] backdrop-blur sm:bottom-6 sm:left-6">
              <MapPin size={18} strokeWidth={1.5} className="text-forest" />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg text-forest">Green Leaf Residency</span>
                <span className="text-[11px] text-muted">{SITE.region}</span>
              </span>
            </div>
          </div>
          <div data-r className="mt-8">
            <ButtonLink href={SITE.directions} external variant="solid" icon={Navigation} className="w-full sm:w-auto">
              Get Directions
            </ButtonLink>
          </div>

          <ul className="mt-10 grid border-t border-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
            {LOCATION_CATEGORIES.map(({ title, text, icon: Icon }, i) => (
              <li key={title} data-r data-delay={i * 0.06} className="group border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                <Icon size={26} strokeWidth={1.1} className="text-leaf transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
                <h3 className="mt-6 font-display text-[1.5rem] leading-tight text-forest">{title}</h3>
                <p className="mt-3 text-[14px] leading-[1.8] text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <p data-r className="mt-6 text-[13px] text-muted">Ask our team for specific travel guidance.</p>
        </div>
      </Reveal>

      <MobileCta />
    </>
  )
}
