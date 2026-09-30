import Image from 'next/image'
import { AnimatedText } from '@/components/common/AnimatedText'
import { CTASection } from '@/components/common/CTASection'
import { ImageReveal } from '@/components/common/ImageReveal'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { DIFFERENTIATORS, PILLARS } from '@/lib/content'
import { pageMeta } from '@/lib/seo'
import { photo } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Green Leaf Residency | About Us',
  description:
    'Green Leaf Residency offers fully furnished 1RK and 1 BHK serviced residences in Sector 15 Part 2, Gurugram — a comfortable, well-managed home away from home for professionals and long-term residents.',
  path: '/about',
  image: '/images/img-7040.jpg',
})

const section = 'mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16'

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Green Leaf Residency"
        title={['More Than Accommodation.', <em key="e">A Place to Feel at Home.</em>]}
        description="Comfortable, fully furnished serviced residences in Sector 15 Part 2, Gurugram."
        breadcrumb={[{ label: 'About' }]}
        image={photo('7040')}
        alt="Palm-lined landing at Green Leaf Residency"
        position="50% 55%"
      />

      {/* OUR STORY */}
      <Reveal className={section}>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-6">
            <ImageReveal photo={photo('7017')} alt="Green courtyard viewed from above at Green Leaf Residency" sizes="(min-width: 1024px) 45vw, 100vw" parallax={6} className="aspect-[4/5] w-full lg:max-h-[46rem]" imgClassName="object-[50%_40%]" />
            <ImageReveal photo={photo('7025')} alt="Furnished studio sleeping area" sizes="(min-width: 1024px) 22vw, 50vw" delay={0.2} className="absolute -bottom-8 -right-2 hidden aspect-[4/3] w-[46%] border-[8px] border-ivory sm:block lg:-right-10" />
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <SectionHeading eyebrow="Our Story" lines={['Your home away', <em key="e">from home in Gurugram.</em>]} />
            <div className="mt-8 max-w-[34rem] space-y-4 text-[15px] leading-[1.7] text-muted sm:text-base">
              <p data-r>Welcome to Green Leaf Residency, your comfortable and well-equipped home away from home in Sector 15 Part 2, Gurugram.</p>
              <p data-r>Designed for modern living, we offer fully furnished 1RK and 1 BHK serviced residences with the essential facilities you need for a comfortable, hassle-free stay.</p>
              <p data-r>From high-speed Wi-Fi and regular housekeeping to a well-maintained living space and a comfortable environment, everything is thoughtfully managed to make everyday living easier.</p>
            </div>
            <ul className="mt-10 border-t border-line">
              {['Working professionals', 'Corporate employees', 'Long-term residents'].map((who, i) => (
                <li key={who} data-r data-delay={i * 0.06} className="flex items-baseline gap-5 border-b border-line py-4">
                  <span className="text-[11px] tracking-[0.2em] text-olive">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-[1.5rem] text-forest">{who}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* DESIGNED FOR MODERN LIVING */}
      <Reveal className="border-y border-line bg-cream/60">
        <div className={section}>
          <SectionHeading eyebrow="Designed for Modern Living" lines={['Four ideas behind', <em key="e">every stay.</em>]} />
          <div className="mt-10 grid gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {PILLARS.map(({ title, text, icon: Icon }, i) => (
              <div key={title} data-r data-delay={i * 0.08} className="group border-line sm:px-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                <div className="flex items-center justify-between">
                  <Icon size={30} strokeWidth={1} className="text-leaf transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
                  <span className="text-[11px] tracking-[0.2em] text-olive">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-8 font-display text-[2rem] leading-none text-forest">{title}</h3>
                <p className="mt-4 max-w-[16rem] text-[14px] leading-[1.8] text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* WHAT MAKES GREEN LEAF DIFFERENT */}
      <Reveal className={section}>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="grid grid-cols-12 gap-3 sm:gap-5 lg:col-span-7">
            <ImageReveal photo={photo('7021')} alt="Landscaped rooftop terrace" sizes="(min-width: 1024px) 40vw, 100vw" parallax={5} className="col-span-12 aspect-[16/10]" />
            <ImageReveal photo={photo('7028')} alt="Fully furnished residence bedroom" sizes="(min-width: 1024px) 24vw, 50vw" delay={0.1} className="col-span-7 aspect-[4/5]" />
            <ImageReveal photo={photo('7018')} alt="Kitchen facility" sizes="(min-width: 1024px) 16vw, 40vw" delay={0.2} className="col-span-5 mt-10 aspect-[3/4] sm:mt-16" />
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <SectionHeading eyebrow="What Makes Green Leaf Different" lines={['Thoughtfully', <em key="e">provided.</em>]} description="Everything a comfortable, long stay asks for — arranged in one calm, green residence." />
            <ul className="mt-10 border-t border-line">
              {DIFFERENTIATORS.map((d, i) => (
                <li key={d} data-r data-delay={(i % 4) * 0.05} className="group flex items-center gap-5 border-b border-line py-4 transition-colors duration-500 hover:bg-cream/70">
                  <span className="w-7 text-[11px] tracking-[0.2em] text-olive transition-transform duration-500 group-hover:-translate-y-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-[1.4rem] text-forest transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">{d}</span>
                </li>
              ))}
            </ul>
            <div data-r className="mt-10">
              <ButtonLink href="/amenities" variant="outline">
                View all amenities
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>

      {/* OUR PROMISE */}
      <Reveal className="relative isolate overflow-hidden bg-forest-deep text-ivory">
        <div data-parallax="8" className="absolute inset-x-0 -top-[10%] -z-20 h-[120%]">
          <Image src="/images/img-7038.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep via-forest-deep/70 to-forest-deep" />
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
          <div data-r className="text-[11px] font-medium uppercase tracking-[0.26em] text-sage">
            Our Promise
          </div>
          <AnimatedText as="h2" text="Comfort should feel effortless." className="mt-8 max-w-5xl font-display text-[length:clamp(2.3rem,9vw,7rem)] leading-[0.98] tracking-[-0.02em] text-ivory" />
          <p data-r className="mt-10 max-w-md text-[15px] leading-[1.7] text-ivory/75 sm:text-base">
            From the day you arrive, everything is taken care of — so all that is left is to feel at home.
          </p>
        </div>
      </Reveal>

      <CTASection />
    </>
  )
}
