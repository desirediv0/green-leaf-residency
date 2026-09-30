import { MobileCta } from '@/components/common/MobileCta'
import { ImageReveal } from '@/components/common/ImageReveal'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { Eyebrow } from '@/components/ui/Typography'
import { pageMeta } from '@/lib/seo'
import { photo, SITE } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Green Leaf Residency | Enquire Now',
  description: 'Enquire about a furnished 1RK or 1 BHK serviced residence at Green Leaf Residency, Sector 15 Part 2, Gurugram. Tell us what you need and our team will help.',
  path: '/enquire',
  image: '/images/img-7028.jpg',
})

export default function EnquirePage() {
  return (
    <>
      <PageHero
        compact
        variant="center"
        eyebrow="Book Your Stay"
        title={['Find Your Space', <em key="e">at Green Leaf</em>]}
        breadcrumb={[{ label: 'Enquire' }]}
        image={photo('7028')}
        alt="Furnished bedroom at Green Leaf Residency"
        position="50% 55%"
      />

      <Reveal className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-10 sm:px-8 md:py-14 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ImageReveal photo={photo('7017')} alt="Green courtyard at Green Leaf Residency" sizes="(min-width: 1024px) 38vw, 100vw" parallax={5} rounded className="aspect-[16/11] w-full lg:aspect-[4/5]" imgClassName="object-[50%_40%]" />
            <div className="mt-8">
              <div data-r>
                <Eyebrow>Our Team Will Help</Eyebrow>
              </div>
              <p data-r className="mt-4 max-w-sm font-display text-[1.9rem] italic leading-snug text-forest">
                “Tell us what you&apos;re looking for and our team will help you find the right residence.”
              </p>
              <p data-r className="mt-5 text-[13px] text-muted">
                Prefer to talk? Call{' '}
                <a href={`tel:${SITE.phone.primary}`} className="text-forest underline underline-offset-4">
                  {SITE.phone.primaryLabel}
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div data-r className="lg:col-span-7">
          <EnquiryForm id="enquire-form" title="Your enquiry" intro="It takes a minute. We'll take it from here." className="border border-line shadow-[0_30px_70px_-40px_rgba(15,77,50,0.35)] sm:p-12" />
        </div>
      </Reveal>

      <MobileCta />
    </>
  )
}
