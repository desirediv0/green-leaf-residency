import type { Metadata } from 'next'
import { SITE } from './site'

type PageMeta = { title: string; description: string; path: string; image?: string }

/** Unique title/description/OpenGraph/canonical for a page. */
export function pageMeta({ title, description, path, image = '/images/img-7039.jpg' }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE.name, type: 'website', images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}
