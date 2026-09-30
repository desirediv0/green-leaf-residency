import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import { ResidenceFeatures } from '@/components/residence/ResidenceFeatures'
import { ResidenceGallery } from '@/components/residence/ResidenceGallery'
import type { ResidenceData } from '@/lib/residences'
import { cn } from '@/lib/utils'

/** One large residence section on /residences: number, type, heading, gallery, features and CTA. */
export function ResidenceShowcase({ residence: r, reverse }: { residence: ResidenceData; reverse?: boolean }) {
  return (
    <article id={r.slug} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">
      <ResidenceGallery images={r.gallery} className={cn('lg:col-span-7', reverse && 'lg:order-2')} />

      <div className={cn('lg:col-span-5', reverse ? 'lg:order-1' : 'lg:pt-4')}>
        <div data-r className="flex items-center gap-5">
          <span className="font-display text-6xl italic leading-none text-olive sm:text-7xl">
            <span data-count={r.index}>{String(r.index).padStart(2, '0')}</span>
          </span>
          <span data-grow className="h-px flex-1 bg-line" />
        </div>
        <div data-r className="mt-8">
          <Eyebrow>
            {r.label} · {r.short}
          </Eyebrow>
        </div>
        <Heading as="h2" className="mt-5 text-[length:clamp(1.9rem,5.2vw,3.4rem)]" lines={[r.cardTitle[0], <em key="e">{r.cardTitle[1]}</em>]} />
        <p data-r className="mt-6 max-w-md text-[15px] leading-[1.7] text-muted">
          {r.description}
        </p>
        <ResidenceFeatures features={r.features.slice(0, 6).map((f) => ({ ...f }))} compact className="mt-8 sm:max-w-md" />
        <div data-r className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/residences/${r.slug}`} variant="solid">
            Explore Residence
          </ButtonLink>
          <ButtonLink href={`/enquire?residence=${r.slug}`} variant="outline" icon={null}>
            Enquire
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}
