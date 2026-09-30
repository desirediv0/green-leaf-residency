import type { ElementType } from 'react'
import { cn } from '@/lib/utils'

/** Word-by-word masked reveal (driven by `data-words` in the shared reveal system). */
export function AnimatedText({ text, as: Tag = 'p', className }: { text: string; as?: ElementType; className?: string }) {
  return (
    <Tag data-words className={cn(className)}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom">
          <span data-word className="inline-block will-change-transform">
            {word}
            {' '}
          </span>
        </span>
      ))}
    </Tag>
  )
}
