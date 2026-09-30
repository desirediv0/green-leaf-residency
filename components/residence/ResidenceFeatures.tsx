import type { ResidenceFeature } from '@/lib/residences'
import { cn } from '@/lib/utils'

/** Editorial feature list — hairline rows, no cards. */
export function ResidenceFeatures({ features, compact, className }: { features: ResidenceFeature[]; compact?: boolean; className?: string }) {
  return (
    <ul className={cn('grid border-t border-line', compact ? 'grid-cols-2 gap-x-6' : 'sm:grid-cols-2 sm:gap-x-10', className)}>
      {features.map(({ title, text, icon: Icon }, i) => (
        <li key={title} data-r data-delay={(i % 2) * 0.06}>
          <div className={cn('group flex items-start gap-4 border-b border-line transition-colors duration-500 hover:bg-cream/70', compact ? 'items-center py-3.5' : 'py-6')}>
            <Icon size={compact ? 16 : 22} strokeWidth={1.3} className="mt-0.5 shrink-0 text-leaf transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            <div>
              <h4 className={cn(compact ? 'text-[13px] text-ink' : 'font-display text-[1.45rem] leading-tight text-forest')}>{title}</h4>
              {!compact && <p className="mt-1.5 max-w-xs text-[14px] leading-[1.75] text-muted">{text}</p>}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
