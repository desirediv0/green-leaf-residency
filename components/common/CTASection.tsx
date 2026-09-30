import { MessageCircle, Phone, Send } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SITE } from '@/lib/site'

type Props = {
  eyebrow?: string
  lines?: React.ReactNode[]
  text?: string
}

/** Closing conversion band shared by every inner page. */
export function CTASection({
  eyebrow = "Let's Talk",
  lines = ['Ready to Find', <em key="e">Your Space?</em>],
  text = "Tell us what you're looking for and our team will help you find the right residence.",
}: Props) {
  return (
    <Reveal className="relative isolate overflow-hidden bg-forest text-ivory">
      <Image
        src="/images/logo-mark-white.png"
        alt=""
        width={829}
        height={573}
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 w-[36rem] max-w-none opacity-[0.05] lg:w-[52rem]"
      />
      <div className="mx-auto grid w-full max-w-[1440px] items-end gap-10 px-5 py-14 sm:px-8 md:py-12 lg:grid-cols-12 lg:px-12 lg:py-16">
        <SectionHeading tone="light" eyebrow={eyebrow} lines={lines} description={text} className="lg:col-span-7" headingClassName="text-[length:clamp(2.1rem,7vw,5rem)]" />
        <div className="grid gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-3">
          <ButtonLink data-r href="/enquire" variant="light" icon={Send}>
            Enquire
          </ButtonLink>
          <ButtonLink data-r data-delay="0.08" href={`tel:${SITE.phone.primary}`} variant="glass" icon={Phone}>
            Call Now
          </ButtonLink>
          <ButtonLink data-r data-delay="0.16" href={SITE.whatsapp} external variant="glass" icon={MessageCircle}>
            WhatsApp
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  )
}
