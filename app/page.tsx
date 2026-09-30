import { About } from '@/components/About'
import { Amenities } from '@/components/Amenities'
import { ContactCTA } from '@/components/ContactCTA'
import { FeatureBreak } from '@/components/FeatureBreak'
import { Gallery } from '@/components/Gallery'
import { Hero } from '@/components/Hero'
import { IdealFor } from '@/components/IdealFor'
import { Lifestyle } from '@/components/Lifestyle'
import { Location } from '@/components/Location'
import { MobileCta } from '@/components/common/MobileCta'
import { Residences } from '@/components/Residences'

export default function Page() {
  return (
    <>
        <Hero />
        <About />
        <Residences />
        <FeatureBreak />
        <Amenities />
        <Lifestyle />
        <Gallery />
        <Location />
        <IdealFor />
        <ContactCTA />
      <MobileCta />
    </>
  )
}
