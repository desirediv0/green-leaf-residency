import { CTASection } from '@/components/common/CTASection'
import { ImageReveal } from '@/components/common/ImageReveal'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AMENITY_GROUPS } from '@/lib/content'
import { pageMeta } from '@/lib/seo'
import { photo } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Green Leaf Residency | Amenities',
  description:
    'Fully furnished interiors, high-speed Wi-Fi, housekeeping, in-house kitchen, fitness centre, 24/7 security, parking and green courtyard spaces at Green Leaf Residency, Gurugram.',
  path: '/amenities',
  image: '/images/img-7035.jpg',
})

export default function AmenitiesPage() {
  let counter = 0
  return (
    <>
      <PageHero
        variant="center"
        eyebrow="Amenities"
        title={['Everything You Need.', <em key="e">Thoughtfully Provided.</em>]}
        description="From furnished interiors to round-the-clock security, every detail is arranged for comfortable everyday living."
        breadcrumb={[{ label: 'Amenities' }]}
        image={photo('7035')}
        alt="Palms and planters on a Green Leaf Residency balcony"
        position="50% 45%"
      />

      <Reveal className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16">
        <div className="space-y-14 md:space-y-20">
          {AMENITY_GROUPS.map((group, gi) => (
            <div key={group.id} id={group.id} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <div data-r className="flex items-center gap-4">
                    <span className="font-display text-5xl italic leading-none text-olive">{String(gi + 1).padStart(2, '0')}</span>
                    <span data-grow className="h-px w-16 bg-line" />
                  </div>
                  <h2 data-r className="mt-6 font-display text-[length:clamp(2rem,5vw,3.4rem)] leading-none text-forest">
                    {group.title}
                  </h2>
                  <p data-r className="mt-4 max-w-[16rem] text-[14px] leading-[1.8] text-muted">
                    {group.blurb}
                  </p>
                </div>
              </div>

              <ul className="border-t border-line lg:col-span-8">
                {group.items.map(({ title, icon: Icon }) => {
                  const n = ++counter
                  return (
                    <li key={title} data-r>
                      <div className="group relative flex items-center gap-5 border-b border-line px-1 py-6 transition-all duration-500 hover:bg-cream/70 sm:gap-8 sm:py-7 sm:hover:px-4">
                        <span className="w-9 shrink-0 text-[11px] tracking-[0.2em] text-olive transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:text-forest">
                          {String(n).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-display text-[1.5rem] leading-tight text-forest sm:text-[1.9rem]">{title}</span>
                        <Icon size={26} strokeWidth={1.1} className="shrink-0 text-leaf transition-transform duration-500 ease-out-expo group-hover:translate-x-2 group-hover:-rotate-6" />
                        <span aria-hidden className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-forest transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="border-t border-line bg-cream/60">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 md:py-12 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <SectionHeading className="lg:col-span-5" eyebrow="Green Living" lines={['Room to breathe,', <em key="e">right at home.</em>]} description="Courtyards, terraces and planted balconies bring the outdoors into everyday life." />
          <div className="grid grid-cols-12 gap-3 sm:gap-5 lg:col-span-7">
            <ImageReveal photo={photo('7021')} alt="Rooftop terrace" sizes="(min-width: 1024px) 34vw, 62vw" parallax={5} className="col-span-8 aspect-[4/3]" />
            <ImageReveal photo={photo('7017')} alt="Courtyard with palms" sizes="(min-width: 1024px) 20vw, 34vw" delay={0.12} className="col-span-4 aspect-[9/16] sm:mt-10" />
          </div>
        </div>
      </Reveal>

      <CTASection />
    </>
  )
}
