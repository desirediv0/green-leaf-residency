import Image from 'next/image'
import type { Photo } from '@/lib/site'
import { cn } from '@/lib/utils'

type ImageRevealProps = {
  photo: Photo
  alt: string
  sizes: string
  /** Frame sizing/aspect classes, e.g. "aspect-[4/5]" */
  className?: string
  /** object-position etc. */
  imgClassName?: string
  /** Scrubbed parallax travel in % (max 8). 0 disables. */
  parallax?: number
  delay?: number
  priority?: boolean
  /** Round the frame (moderate radius only). */
  rounded?: boolean
}

/** Clip-path reveal frame (`data-clip`) with optional parallax and a gentle 1.03 hover zoom. */
export function ImageReveal({ photo, alt, sizes, className, imgClassName, parallax = 0, delay, priority, rounded }: ImageRevealProps) {
  const image = (
    <Image
      src={photo.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover transition-transform duration-[600ms] ease-out group-hover/img:scale-[1.03]', imgClassName)}
    />
  )
  return (
    <div data-clip data-delay={delay} className={cn('group/img relative overflow-hidden bg-cream', rounded && 'rounded-2xl', className)}>
      {parallax ? (
        <div data-parallax={parallax} className="absolute inset-x-0 -top-[10%] h-[120%]">
          {image}
        </div>
      ) : (
        image
      )}
    </div>
  )
}
