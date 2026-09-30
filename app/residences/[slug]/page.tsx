import { MessageCircle, Phone, Send } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CTASection } from '@/components/common/CTASection'
import { MobileCta } from '@/components/common/MobileCta'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ResidenceFeatures } from '@/components/residence/ResidenceFeatures'
import { ResidenceGallery } from '@/components/residence/ResidenceGallery'
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink'
import { getResidence, RESIDENCES } from '@/lib/residences'
import { pageMeta } from '@/lib/seo'
import { SITE } from '@/lib/site'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => RESIDENCES.map((r) => ({ slug: r.slug }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = getResidence((await params).slug)
  if (!r) return {}
  return pageMeta({ title: r.metaTitle, description: r.metaDescription, path: `/residences/${r.slug}`, image: r.hero.photo.src })
}

const block = 'border-t border-line pt-14 md:pt-20'

export default async function ResidencePage({ params }: Params) {
  const r = getResidence((await params).slug)
  if (!r) notFound()
  const other = RESIDENCES.find((x) => x.slug !== r.slug)!

  return (
    <>
      <PageHero
        eyebrow={`${r.label} · ${r.short}`}
        title={[r.heroTitle[0], <em key="e">{r.heroTitle[1]}</em>]}
        description={r.heroText}
        breadcrumb={[{ label: 'Residences', href: '/residences' }, { label: r.short }]}
        image={r.hero.photo}
        alt={`${r.short} residence at Green Leaf Residency`}
        position={r.hero.position}
      >
        <ButtonLink href={`/enquire?residence=${r.slug}`} variant="light" className="w-full sm:w-auto">
          Enquire Now
        </ButtonLink>
        <ButtonLink href="#gallery" variant="glass" icon={null} className="w-full sm:w-auto">
          View Photos
        </ButtonLink>
      </PageHero>

      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:py-12 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-16">
        {/* Main column */}
        <div className="min-w-0 space-y-12 md:space-y-16 lg:col-span-8">
          <Reveal as="div">
            <SectionHeading eyebrow="Overview" lines={[r.cardTitle[0], <em key="e">{r.cardTitle[1]}</em>]} />
            <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-[1.7] text-muted sm:text-base">
              {r.overview.map((p) => (
                <p key={p} data-r>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal as="div" id="gallery" className={block}>
            <SectionHeading eyebrow="Gallery" lines={['Inside the', <em key="e">residence.</em>]} headingClassName="text-[length:clamp(2rem,3.6vw,3.2rem)]" />
            <ResidenceGallery images={r.gallery} className="mt-10" />
          </Reveal>

          <Reveal as="div" className={block}>
            <SectionHeading eyebrow="Features" lines={['Everything', <em key="e">in place.</em>]} headingClassName="text-[length:clamp(2rem,3.6vw,3.2rem)]" />
            <ResidenceFeatures features={r.features} className="mt-10" />
          </Reveal>

          <Reveal as="div" className={block}>
            <SectionHeading eyebrow="Amenities" lines={['Shared across', <em key="e">Green Leaf.</em>]} headingClassName="text-[length:clamp(2rem,3.6vw,3.2rem)]" />
            <ul className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
              {r.amenities.map((a, i) => (
                <li key={a} data-r data-delay={(i % 2) * 0.05} className="flex items-baseline gap-5 border-b border-line py-4">
                  <span className="w-6 text-[11px] tracking-[0.2em] text-olive">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-[1.35rem] text-forest">{a}</span>
                </li>
              ))}
            </ul>
            <div data-r className="mt-8">
              <TextLink href="/amenities">See all amenities</TextLink>
            </div>
          </Reveal>

          <Reveal as="div" className={block}>
            <SectionHeading eyebrow="Ideal For" lines={['Who it suits', <em key="e">best.</em>]} headingClassName="text-[length:clamp(2rem,3.6vw,3.2rem)]" />
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {r.idealFor.map((w, i) => (
                <div key={w.title} data-r data-delay={i * 0.08}>
                  <span className="text-[11px] tracking-[0.2em] text-olive">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 border-b border-line pb-3 font-display text-[1.7rem] leading-tight text-forest">{w.title}</h3>
                  <p className="mt-4 max-w-xs text-[14px] leading-[1.8] text-muted">{w.text}</p>
                </div>
              ))}
            </div>
            <div data-r className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8 text-[13px] text-muted">
              Also available: <TextLink href={`/residences/${other.slug}`}>{other.label} · {other.short}</TextLink>
            </div>
          </Reveal>
        </div>

        {/* Sticky enquiry panel (desktop) */}
        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28 rounded-2xl bg-forest p-8 text-ivory">
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-sage">{r.label}</p>
            <h2 className="mt-4 font-display text-[2.3rem] leading-none">Interested in {r.short}?</h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-ivory/75">Tell us what you&apos;re looking for and our team will help you find the right residence.</p>
            <div className="mt-7 grid gap-3">
              <ButtonLink href={`/enquire?residence=${r.slug}`} variant="light" icon={Send}>
                Enquire Now
              </ButtonLink>
              <ButtonLink href={`tel:${SITE.phone.primary}`} variant="glass" icon={Phone}>
                {SITE.phone.primaryLabel}
              </ButtonLink>
              <ButtonLink href={SITE.whatsapp} external variant="glass" icon={MessageCircle}>
                WhatsApp Us
              </ButtonLink>
            </div>
            <p className="mt-6 border-t border-ivory/15 pt-5 text-[12px] text-ivory/60">{SITE.region}</p>
          </div>
        </aside>
      </div>

      <CTASection />
      <MobileCta />
    </>
  )
}
