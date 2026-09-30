import {
  ArrowUpDown,
  BedDouble,
  Dumbbell,
  Leaf,
  type LucideIcon,
  Laptop,
  ParkingSquare,
  ShieldCheck,
  Sparkles,
  Utensils,
  Wifi,
} from 'lucide-react'
import meta from './image-meta.json'

export const SITE = {
  name: 'Green Leaf Residency',
  tagline: 'Not Just a Stay, A Standard',
  area: 'Sector 15 Part 2, Gurugram',
  phone: { primary: '+918447016044', primaryLabel: '84470 16044', secondary: '+919870749849', secondaryLabel: '98707 49849' },
  phones: [
    { label: '84470 16044', tel: '+918447016044' },
    { label: '98707 49849', tel: '+919870749849' },
    { label: '98107 01604', tel: '+919810701604' },
  ],
  email: 'greenleafoliving@gmail.com',
  region: 'Sector 15 Part 2, Gurugram, Haryana',
  whatsapp: 'https://wa.me/918447016044',
  directions: 'https://www.google.com/maps/search/Sector+15+Part+2+Gurugram',
  mapEmbed: 'https://maps.google.com/maps?q=Sector+15+Part+2+Gurugram&z=14&output=embed',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Residences', href: '/residences' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const

export type PhotoId = keyof typeof meta

export type Photo = { src: string; width: number; height: number }

/** Resolves a supplied property photograph (IMG_70xx) to its optimised file + intrinsic size. */
export function photo(id: PhotoId): Photo {
  return { src: `/images/img-${id}.jpg`, width: meta[id].w, height: meta[id].h }
}

export const PHOTOS = {
  exterior: photo('7039'),
  courtyard: photo('7017'),
  greenery: photo('7023'),
  terrace: photo('7021'),
  bedroom: photo('7028'),
  bedroomTwo: photo('7034'),
  balcony: photo('7040'),
  corridor: photo('7033'),
  planters: photo('7035'),
  heroMobile: photo('7023'),
} as const

export type Amenity = { title: string; icon: LucideIcon }

export const AMENITIES: Amenity[] = [
  { title: 'Fully Furnished Interiors', icon: BedDouble },
  { title: 'High-Speed Wi-Fi', icon: Wifi },
  { title: 'Regular Housekeeping', icon: Sparkles },
  { title: 'In-House Kitchen', icon: Utensils },
  { title: 'Fitness Centre', icon: Dumbbell },
  { title: '24/7 Security', icon: ShieldCheck },
  { title: 'Secure Parking', icon: ParkingSquare },
  { title: 'Elevator Access', icon: ArrowUpDown },
  { title: 'Green Courtyard', icon: Leaf },
  { title: 'Comfortable Workspaces', icon: Laptop },
]

export type GalleryCategory = 'Residences' | 'Interiors' | 'Amenities' | 'Green Spaces'
export const GALLERY_CATEGORIES = ['All', 'Residences', 'Interiors', 'Amenities', 'Green Spaces'] as const

export type GalleryItem = { photo: Photo; category: GalleryCategory; caption: string }

export const GALLERY: GalleryItem[] = [
  { photo: photo('7039'), category: 'Residences', caption: 'Green Leaf Residency at dusk' },
  { photo: photo('7017'), category: 'Green Spaces', caption: 'Central courtyard' },
  { photo: photo('7028'), category: 'Residences', caption: 'Furnished studio apartment' },
  { photo: photo('7018'), category: 'Interiors', caption: 'Kitchen facility' },
  { photo: photo('7021'), category: 'Amenities', caption: 'Rooftop terrace' },
  { photo: photo('7023'), category: 'Green Spaces', caption: 'Green balcony wall' },
  { photo: photo('7034'), category: 'Residences', caption: 'One bedroom residence' },
  { photo: photo('7032'), category: 'Interiors', caption: 'Residence bathroom' },
  { photo: photo('7040'), category: 'Green Spaces', caption: 'Palm-lined landing' },
  { photo: photo('7030'), category: 'Green Spaces', caption: 'Landscaped terrace at night' },
  { photo: photo('7026'), category: 'Residences', caption: 'Bedroom with workspace' },
  { photo: photo('7033'), category: 'Interiors', caption: 'Residence corridor' },
  { photo: photo('7035'), category: 'Green Spaces', caption: 'Open balcony with planters' },
  { photo: photo('7031'), category: 'Amenities', caption: 'Secure biometric access' },
  { photo: photo('7029'), category: 'Interiors', caption: 'Living and kitchen area' },
  { photo: photo('7037'), category: 'Amenities', caption: 'Terrace after dark' },
  { photo: photo('7041'), category: 'Green Spaces', caption: 'Balcony greenery' },
  { photo: photo('7019'), category: 'Interiors', caption: 'Illuminated vanity' },
  { photo: photo('7022'), category: 'Amenities', caption: 'Open-air terrace' },
  { photo: photo('7025'), category: 'Residences', caption: 'Studio sleeping area' },
]
