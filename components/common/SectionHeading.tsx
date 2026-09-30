import type { ReactNode } from 'react'
import { Eyebrow, Heading, headingSize } from '@/components/ui/Typography'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  lines: ReactNode[]
  description?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  headingClassName?: string
}

/** Eyebrow + editorial display heading + optional supporting copy. Works on ivory (dark) or forest (light). */
export function SectionHeading({ eyebrow, lines, description, tone = 'dark', align = 'left', as = 'h2', className, headingClassName }: Props) {
  const light = tone === 'light'
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      <div data-r className={cn(align === 'center' && 'flex justify-center')}>
        <Eyebrow tone={light ? 'light' : 'dark'} className={light ? 'text-sage' : undefined}>
          {eyebrow}
        </Eyebrow>
      </div>
      <Heading as={as} lines={lines} className={cn('mt-6', headingSize, light && 'text-ivory [&_em]:text-sage', headingClassName)} />
      {description && (
        <p data-r className={cn('mt-7 max-w-lg text-[15px] leading-[1.85]', light ? 'text-ivory/75' : 'text-muted', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
