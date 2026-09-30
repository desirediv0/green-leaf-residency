import { SITE } from './site'

export type EnquiryValues = {
  name: string
  phone: string
  email: string
  residence: string
  stay: string
  moveIn: string
  message: string
}

export type EnquiryResult = { ok: true; via: 'api' | 'whatsapp'; whatsappUrl: string } | { ok: false; error: string }

/** Set NEXT_PUBLIC_ENQUIRY_ENDPOINT to a URL that accepts a JSON POST to enable API delivery. */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT

export function whatsappUrl(v: EnquiryValues) {
  const text = [
    `Hello Green Leaf Residency, I'd like to enquire about a residence.`,
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Email: ${v.email.trim()}`,
    `Residence: ${v.residence}`,
    `Stay type: ${v.stay}`,
    v.moveIn && `Preferred move-in: ${v.moveIn}`,
    v.message.trim() && `Message: ${v.message.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')
  return `${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}

/**
 * Single integration point for enquiries.
 * - With NEXT_PUBLIC_ENQUIRY_ENDPOINT set: POSTs the JSON payload there.
 * - Without it (no backend yet): hands the enquiry to WhatsApp, which the caller opens.
 */
export async function submitEnquiry(values: EnquiryValues): Promise<EnquiryResult> {
  const url = whatsappUrl(values)
  if (!ENDPOINT) return { ok: true, via: 'whatsapp', whatsappUrl: url }
  try {
    const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
    if (!res.ok) throw new Error(String(res.status))
    return { ok: true, via: 'api', whatsappUrl: url }
  } catch {
    return { ok: false, error: 'We could not send your enquiry. Please try again, or call or WhatsApp us.' }
  }
}

export const EMPTY_ENQUIRY: EnquiryValues = { name: "", phone: "", email: "", residence: "", stay: "", moveIn: "", message: "" }
