import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ResidenceShowcase } from '@/components/residence/ResidenceShowcase'
import { RESIDENCES } from '@/lib/residences'
import { pageMeta } from '@/lib/seo'
import { photo } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Green Leaf Residency | Furnished 1RK & 1 BHK Residences',
  description:
    'Explore fully furnished 1RK studio and 1 BHK serviced residences at Green Leaf Residency, Sector 15 Part 2, Gurugram — Wi-Fi, air conditioning, kitchen facility and housekeeping included.',
  path: '/residences',
  image: '/images/img-7028.jpg',
})

export default function ResidencesPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="The Residences"
        title={['Spaces Designed', <em key="e">Around Your Stay</em>]}
        description="Two thoughtfully furnished layouts — a considered 1RK studio and a generous 1 BHK residence — for professionals, extended stays and modern urban living."
        breadcrumb={[{ label: 'Residences' }]}
        image={photo('7028')}
        alt="Furnished bedroom in a Green Leaf Residency studio apartment"
        position="50% 55%"
      />

      <Reveal className="bg-cream/60">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-14 lg:px-12 lg:py-16">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Choose Your Residence" lines={['Studio or one bedroom,', <em key="e">furnished throughout.</em>]} />
            <p data-r className="max-w-sm text-[15px] leading-[1.7] text-muted">
              Both residences include Wi-Fi, air conditioning, kitchen facility and housekeeping.
            </p>
          </div>
          <div className="space-y-14 md:space-y-16">
            {RESIDENCES.map((r, i) => (
              <ResidenceShowcase key={r.slug} residence={r} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </Reveal>

      <CTASection />
    </>
  )
}
