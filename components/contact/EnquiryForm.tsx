'use client'

import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { EMPTY_ENQUIRY, submitEnquiry, type EnquiryValues } from '@/lib/enquiry'
import { cn } from '@/lib/utils'

const RESIDENCES = ['1RK', '1BHK'] as const
const STAY_TYPES = ['Short Stay', 'Long Stay', 'Corporate Stay'] as const

type Errors = Partial<Record<keyof EnquiryValues, string>>

function validate(v: EnquiryValues): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^(\+?91)?[6-9]\d{9}$/.test(v.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid 10-digit mobile number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (!v.residence) e.residence = 'Choose a residence type.'
  if (!v.stay) e.stay = 'Choose a stay type.'
  return e
}

const field = 'w-full border-0 border-b bg-transparent px-0 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-forest'
const label = 'mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted'
const choice =
  'flex min-h-12 items-center justify-center rounded-lg border border-line px-2 text-center text-[13px] font-medium tracking-wide text-ink transition-colors hover:border-forest peer-checked:border-forest peer-checked:bg-forest peer-checked:text-ivory peer-focus-visible:ring-2 peer-focus-visible:ring-leaf/60 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ivory'

type Props = { id?: string; className?: string; title?: string; intro?: string }

export function EnquiryForm({ id = 'enquiry', className, title = 'Send an enquiry', intro = "Tell us a little about your stay and we'll get back to you soon." }: Props) {
  const [values, setValues] = useState<EnquiryValues>(EMPTY_ENQUIRY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, boolean>>>({})
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const [done, setDone] = useState<{ whatsapp: string; via: 'api' | 'whatsapp' } | null>(null)

  // /enquire?residence=1rk (from the residence pages) pre-selects the residence type
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get('residence')?.toUpperCase()
    if (r === '1RK' || r === '1BHK') setValues((v) => ({ ...v, residence: r }))
  }, [])

  const set = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key]) setErrors(validate(next))
  }
  const blur = (key: keyof EnquiryValues) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }
  const show = (key: keyof EnquiryValues) => (touched[key] ? errors[key] : undefined)
  const fid = (k: string) => `${id}-${k}`

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, phone: true, email: true, residence: true, stay: true, moveIn: true, message: true })
    const first = Object.keys(found)[0]
    if (first) return void document.getElementById(fid(first))?.focus()

    setSending(true)
    setFailure(null)
    // Delivered by lib/enquiry.ts: API endpoint when configured, otherwise a WhatsApp hand-off.
    const res = await submitEnquiry(values)
    setSending(false)
    if (!res.ok) return setFailure(res.error)
    if (res.via === 'whatsapp') window.open(res.whatsappUrl, '_blank', 'noopener,noreferrer')
    setDone({ whatsapp: res.whatsappUrl, via: res.via })
  }

  const reset = () => {
    setValues(EMPTY_ENQUIRY)
    setErrors({})
    setTouched({})
    setDone(null)
  }

  const err = (key: keyof EnquiryValues) =>
    show(key) ? (
      <p id={`${fid(key)}-err`} role="alert" className="mt-1.5 text-[12px] text-red-700">
        {show(key)}
      </p>
    ) : null
  const line = (key: keyof EnquiryValues) => (show(key) ? 'border-red-600/70' : 'border-line')
  const today = new Date().toISOString().split('T')[0]

  return (
    <div id={id} className={cn('rounded-2xl bg-ivory p-6 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] sm:p-10', className)}>
      {done ? (
        <div role="status" className="flex min-h-[26rem] flex-col items-start justify-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-forest text-ivory">
            <Check size={22} strokeWidth={1.6} />
          </span>
          <h3 className="mt-6 font-display text-4xl text-forest">Thank you.</h3>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
            {done.via === 'api'
              ? "We've received your enquiry and our team will be in touch shortly."
              : "Your enquiry is ready in WhatsApp — send it and our team will be in touch shortly. If it didn't open, use the button below."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {done.via === 'whatsapp' && (
              <a href={done.whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-forest px-6 text-[12px] font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-forest-deep">
                Open WhatsApp <ArrowRight size={15} strokeWidth={1.6} />
              </a>
            )}
            <button type="button" onClick={reset} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-forest/40 px-6 text-[12px] font-medium uppercase tracking-[0.14em] text-forest transition-colors hover:bg-forest hover:text-ivory">
              Send another enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <h3 className="font-display text-[2rem] leading-none text-forest sm:text-4xl">{title}</h3>
          <p className="mt-3 text-[14px] text-muted">{intro}</p>

          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor={fid('name')} className={label}>Full Name</label>
              <input id={fid('name')} autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} aria-invalid={!!show('name')} aria-describedby={`${fid('name')}-err`} placeholder="Your name" className={cn(field, line('name'))} />
              {err('name')}
            </div>
            <div>
              <label htmlFor={fid('phone')} className={label}>Phone</label>
              <input id={fid('phone')} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} aria-invalid={!!show('phone')} aria-describedby={`${fid('phone')}-err`} placeholder="98765 43210" className={cn(field, line('phone'))} />
              {err('phone')}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={fid('email')} className={label}>Email</label>
              <input id={fid('email')} type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} aria-invalid={!!show('email')} aria-describedby={`${fid('email')}-err`} placeholder="you@example.com" className={cn(field, line('email'))} />
              {err('email')}
            </div>

            <fieldset className="sm:col-span-2">
              <legend className={label}>Residence Type</legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {RESIDENCES.map((r, i) => (
                  <label key={r} className="cursor-pointer">
                    <input type="radio" id={i === 0 ? fid('residence') : undefined} name={fid('residence')} value={r} checked={values.residence === r} onChange={() => set('residence', r)} onBlur={() => blur('residence')} className="peer sr-only" />
                    <span className={choice}>{r === '1BHK' ? '1 BHK' : r}</span>
                  </label>
                ))}
              </div>
              {err('residence')}
            </fieldset>

            <fieldset className="sm:col-span-2">
              <legend className={label}>Stay Type</legend>
              <div className="mt-2 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
                {STAY_TYPES.map((s, i) => (
                  <label key={s} className="cursor-pointer">
                    <input type="radio" id={i === 0 ? fid('stay') : undefined} name={fid('stay')} value={s} checked={values.stay === s} onChange={() => set('stay', s)} onBlur={() => blur('stay')} className="peer sr-only" />
                    <span className={choice}>{s}</span>
                  </label>
                ))}
              </div>
              {err('stay')}
            </fieldset>

            <div className="sm:col-span-2">
              <label htmlFor={fid('moveIn')} className={label}>
                Preferred Move-in Date <span className="normal-case tracking-normal text-muted/70">(optional)</span>
              </label>
              <input id={fid('moveIn')} type="date" min={today} value={values.moveIn} onChange={(e) => set('moveIn', e.target.value)} className={cn(field, 'border-line')} />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={fid('message')} className={label}>
                Message <span className="normal-case tracking-normal text-muted/70">(optional)</span>
              </label>
              <textarea id={fid('message')} rows={3} value={values.message} onChange={(e) => set('message', e.target.value)} placeholder="Number of guests, anything we should know" className={cn(field, 'resize-none border-line')} />
            </div>
          </div>

          {failure && (
            <p role="alert" className="mt-6 text-[13px] text-red-700">
              {failure}
            </p>
          )}

          <button type="submit" disabled={sending} className="group mt-9 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-forest px-8 text-[12px] font-medium uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:bg-forest-deep disabled:opacity-70 sm:w-auto">
            {sending ? 'Sending…' : 'Send Enquiry'}
            {sending ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} strokeWidth={1.6} className="transition-transform duration-300 group-hover:translate-x-1" />}
          </button>
        </form>
      )}
    </div>
  )
}
