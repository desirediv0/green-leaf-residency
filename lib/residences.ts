import { BedDouble, Laptop, type LucideIcon, Snowflake, Sparkles, Utensils, Wifi, Sofa } from 'lucide-react'
import { photo, type Photo } from './site'

export type ResidenceFeature = { title: string; text: string; icon: LucideIcon }
export type ResidenceImage = { photo: Photo; alt: string }

export type ResidenceData = {
  slug: '1rk' | '1bhk'
  index: number
  short: string
  label: string
  preference: '1RK' | '1BHK'
  cardTitle: string[]
  heroTitle: string[]
  heroText: string
  description: string
  overview: string[]
  hero: { photo: Photo; position: string }
  gallery: ResidenceImage[]
  features: ResidenceFeature[]
  amenities: string[]
  idealFor: { title: string; text: string }[]
  metaTitle: string
  metaDescription: string
}

const core: ResidenceFeature[] = [
  { title: 'Fully Furnished', text: 'Bed, wardrobe and furnishings in place from day one.', icon: Sofa },
  { title: 'Air Conditioning', text: 'Comfortable temperatures through the year.', icon: Snowflake },
  { title: 'Wi-Fi', text: 'High-speed internet for work and downtime.', icon: Wifi },
  { title: 'Kitchen Facility', text: 'A kitchen setup for everyday meals.', icon: Utensils },
  { title: 'Housekeeping', text: 'Regular housekeeping keeps the space fresh.', icon: Sparkles },
  { title: 'Workspace', text: 'A practical desk area to get things done.', icon: Laptop },
]

const sharedAmenities = ['High-speed Wi-Fi', 'Regular housekeeping', '24/7 security', 'Secure basement parking', 'High-speed elevator access', 'Modern fitness centre', 'Green courtyard & open spaces']

export const RESIDENCES: ResidenceData[] = [
  {
    slug: '1rk',
    index: 1,
    short: '1RK',
    label: 'Studio Apartment',
    preference: '1RK',
    cardTitle: ['A considered space', 'to call your own.'],
    heroTitle: ['Studio Living,', 'Thoughtfully Designed'],
    heroText: 'A calm, fully furnished studio with a comfortable sleeping area, practical workspace and everything you need for a smooth stay.',
    description: 'A calm, fully furnished studio with a comfortable sleeping area, practical workspace and everything you need for a smooth stay.',
    overview: [
      'The 1RK studio at Green Leaf Residency is a fully furnished serviced apartment in Sector 15 Part 2, Gurugram, made for comfortable, hassle-free everyday living.',
      'A comfortable sleeping area, practical workspace and kitchen facility sit alongside Wi-Fi, air conditioning and regular housekeeping, so you can settle in from the first day.',
    ],
    hero: { photo: photo('7028'), position: '50% 55%' },
    gallery: [
      { photo: photo('7028'), alt: '1RK studio bedroom with bed, wardrobe and balcony door' },
      { photo: photo('7025'), alt: 'Furnished studio sleeping area' },
      { photo: photo('7027'), alt: 'Studio bedroom with twin beds' },
      { photo: photo('7018'), alt: 'Kitchen facility in the residence' },
      { photo: photo('7019'), alt: 'Bathroom with illuminated vanity mirror' },
      { photo: photo('7035'), alt: 'Balcony with palms and planters' },
    ],
    features: core,
    amenities: sharedAmenities,
    idealFor: [
      { title: 'Working Professionals', text: 'Comfortable accommodation with essential everyday facilities.' },
      { title: 'Corporate Employees', text: 'A convenient residential base for professionals working in Gurugram.' },
    ],
    metaTitle: 'Green Leaf Residency | Furnished 1RK Studio in Gurugram',
    metaDescription: 'Fully furnished 1RK studio apartments at Green Leaf Residency, Sector 15 Part 2, Gurugram — Wi-Fi, air conditioning, kitchen facility and housekeeping included.',
  },
  {
    slug: '1bhk',
    index: 2,
    short: '1 BHK',
    label: 'One Bedroom Residence',
    preference: '1BHK',
    cardTitle: ['Room to live, work', 'and unwind.'],
    heroTitle: ['More Space.', 'More Comfort.'],
    heroText: 'A generous one bedroom residence with an easy flow between living, working and resting — made for longer stays.',
    description: 'A generous one bedroom residence with an easy flow between living, working and resting — made for longer stays.',
    overview: [
      'The 1 BHK residence at Green Leaf Residency is a fully furnished one bedroom serviced apartment in Sector 15 Part 2, Gurugram, designed for longer, more settled stays.',
      'A spacious living arrangement, workspace, Wi-Fi, air conditioning and regular housekeeping come together for an easy flow between living, working and resting.',
    ],
    hero: { photo: photo('7034'), position: '50% 60%' },
    gallery: [
      { photo: photo('7034'), alt: '1 BHK residence bedroom' },
      { photo: photo('7026'), alt: 'Bedroom with a work desk and wardrobe' },
      { photo: photo('7020'), alt: 'Bedroom with wardrobe and desk' },
      { photo: photo('7029'), alt: 'Kitchenette and living area' },
      { photo: photo('7032'), alt: 'Residence bathroom vanity' },
      { photo: photo('7041'), alt: 'Balcony with potted palms' },
    ],
    features: [{ title: 'Spacious Living', text: 'An easy flow between living, working and resting.', icon: BedDouble }, ...core],
    amenities: sharedAmenities,
    idealFor: [
      { title: 'Long-Term Residents', text: 'A furnished, managed living environment that feels more like home.' },
      { title: 'Working Professionals', text: 'Room to live and work comfortably through longer stays.' },
    ],
    metaTitle: 'Green Leaf Residency | Furnished 1 BHK Residence in Gurugram',
    metaDescription: 'Fully furnished 1 BHK serviced residences at Green Leaf Residency, Sector 15 Part 2, Gurugram — spacious living, workspace, Wi-Fi and housekeeping.',
  },
]

export const getResidence = (slug: string) => RESIDENCES.find((r) => r.slug === slug)
