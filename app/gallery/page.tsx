import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { GalleryExplorer } from '@/components/gallery/GalleryExplorer'
import { pageMeta } from '@/lib/seo'
import { photo } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Green Leaf Residency | Gallery',
  description: 'Browse photographs of Green Leaf Residency in Gurugram — furnished residences, kitchens, bathrooms, courtyard and green spaces.',
  path: '/gallery',
  image: '/images/img-7039.jpg',
})

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={['Life at', <em key="e">Green Leaf</em>]}
        description="A look inside our residences, shared spaces and green surroundings."
        breadcrumb={[{ label: 'Gallery' }]}
        image={photo('7039')}
        alt="Green Leaf Residency building lit at dusk"
        position="50% 40%"
      />
      <GalleryExplorer />
      <CTASection />
    </>
  )
}
