import {
  ArrowUpDown,
  BedDouble,
  Building2,
  Dumbbell,
  Fingerprint,
  KeyRound,
  Laptop,
  Leaf,
  type LucideIcon,
  MapPin,
  ParkingSquare,
  Bus,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  Snowflake,
  Sparkles,
  Sun,
  Utensils,
  Wifi,
  Coffee,
  Sofa,
} from 'lucide-react'
import { photo, type Photo, type PhotoId } from './site'

/* ------------------------------------------------------------------ gallery */

export const PAGE_GALLERY_CATEGORIES = ['All', 'Residences', 'Interiors', 'Bathrooms', 'Kitchen', 'Green Spaces', 'Exterior'] as const
export type PageGalleryCategory = Exclude<(typeof PAGE_GALLERY_CATEGORIES)[number], 'All'>

export type LightboxItem = { photo: Photo; category: string; caption: string }

const g = (id: PhotoId, category: PageGalleryCategory, caption: string): LightboxItem => ({ photo: photo(id), category, caption })

/** Every supplied photograph, categorised for the Gallery page. */
export const PAGE_GALLERY: LightboxItem[] = [
  g('7039', 'Exterior', 'Green Leaf Residency at dusk'),
  g('7028', 'Residences', 'Furnished studio bedroom'),
  g('7017', 'Green Spaces', 'Central courtyard'),
  g('7018', 'Kitchen', 'Kitchen facility'),
  g('7034', 'Residences', 'One bedroom residence'),
  g('7021', 'Green Spaces', 'Rooftop terrace'),
  g('7033', 'Interiors', 'Residence corridor'),
  g('7027', 'Residences', 'Bedroom with twin beds'),
  g('7040', 'Green Spaces', 'Palm-lined landing'),
  g('7019', 'Bathrooms', 'Illuminated vanity mirror'),
  g('7023', 'Green Spaces', 'Green balcony wall'),
  g('7026', 'Residences', 'Bedroom with workspace'),
  g('7029', 'Kitchen', 'Kitchenette and living area'),
  g('7030', 'Green Spaces', 'Landscaped terrace at night'),
  g('7032', 'Bathrooms', 'Bathroom vanity'),
  g('7035', 'Green Spaces', 'Open balcony with planters'),
  g('7020', 'Residences', 'Bedroom with wardrobe and desk'),
  g('7037', 'Exterior', 'Terrace railing after dark'),
  g('7031', 'Interiors', 'Secure biometric access'),
  g('7041', 'Green Spaces', 'Balcony greenery'),
  g('7024', 'Residences', 'Bedroom with balcony access'),
  g('7036', 'Bathrooms', 'Tiled bathroom'),
  g('7038', 'Green Spaces', 'Garden terrace lit at night'),
  g('7022', 'Green Spaces', 'Open-air terrace'),
  g('7025', 'Residences', 'Studio sleeping area'),
]

/* --------------------------------------------------------------- amenities */

export type AmenityItem = { title: string; icon: LucideIcon }
export type AmenityGroup = { id: string; title: string; blurb: string; items: AmenityItem[] }

export const AMENITY_GROUPS: AmenityGroup[] = [
  {
    id: 'living',
    title: 'Living',
    blurb: 'Rooms that are ready the day you arrive.',
    items: [
      { title: 'Fully Furnished Interiors', icon: Sofa },
      { title: 'Comfortable Rooms', icon: BedDouble },
      { title: 'Workspace', icon: Laptop },
    ],
  },
  {
    id: 'connectivity',
    title: 'Connectivity',
    blurb: 'Stay connected, at home and around the city.',
    items: [
      { title: 'High-Speed Wi-Fi', icon: Wifi },
      { title: 'Convenient Location', icon: MapPin },
    ],
  },
  {
    id: 'convenience',
    title: 'Convenience',
    blurb: 'The everyday things, handled.',
    items: [
      { title: 'In-House Kitchen', icon: Utensils },
      { title: 'Housekeeping', icon: Sparkles },
      { title: 'Elevator', icon: ArrowUpDown },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    blurb: 'Peace of mind, round the clock.',
    items: [
      { title: '24/7 Security', icon: ShieldCheck },
      { title: 'Secure Access', icon: KeyRound },
      { title: 'Biometric System', icon: Fingerprint },
      { title: 'Parking', icon: ParkingSquare },
    ],
  },
  {
    id: 'wellness',
    title: 'Wellness',
    blurb: 'Room to breathe, move and unwind.',
    items: [
      { title: 'Fitness Centre', icon: Dumbbell },
      { title: 'Green Spaces', icon: Leaf },
      { title: 'Open Courtyard', icon: Sun },
    ],
  },
]

/* ---------------------------------------------------------------- location */

export const LOCATION_CATEGORIES: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Business & Corporate', text: 'Corporate offices and business districts across Gurugram.', icon: Building2 },
  { title: 'Food & Cafes', text: 'Restaurants, cafes and dining options around the city.', icon: Coffee },
  { title: 'Shopping', text: 'Retail and lifestyle destinations within Gurugram.', icon: ShoppingBag },
  { title: 'Daily Essentials', text: 'Everyday conveniences for regular living.', icon: ShoppingBasket },
  { title: 'Transport', text: 'Road and public transport connections across Gurugram.', icon: Bus },
]

/* --------------------------------------------------------- about / general */

export const PILLARS: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Comfort', text: 'Fully furnished, air-conditioned residences with everything set up for a smooth stay.', icon: Snowflake },
  { title: 'Convenience', text: 'Wi-Fi, housekeeping and kitchen facilities, thoughtfully managed for everyday ease.', icon: Sparkles },
  { title: 'Security', text: 'Round-the-clock security, secure access and a biometric system.', icon: ShieldCheck },
  { title: 'Community', text: 'A calm, well-kept residential atmosphere with shared green spaces.', icon: Leaf },
]

export const DIFFERENTIATORS = [
  'Fully furnished residences',
  'Regular housekeeping',
  'High-speed Wi-Fi',
  'Kitchen facilities',
  'Modern fitness centre',
  '24/7 security',
  'Green surroundings',
]
