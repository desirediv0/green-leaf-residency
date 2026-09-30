'use client'

import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { useReveal } from '@/lib/animations'

type RevealProps = HTMLAttributes<HTMLElement> & { as?: ElementType; children: ReactNode }

/**
 * Client boundary that activates the shared scroll-reveal system (data-r, data-clip, data-lines,
 * data-parallax, data-count, data-grow, data-words) for everything inside it. Lets page files stay server components.
 */
export function Reveal({ as: Tag = 'section', children, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
}
