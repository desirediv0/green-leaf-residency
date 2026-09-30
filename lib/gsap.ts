'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect } from 'react'

let registered = false

/** Registers GSAP plugins once, and only in the browser (keeps SSR clean). */
export function registerGsap() {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
}

/** useLayoutEffect on the client (no flash), useEffect on the server (no warning). */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const EASE = { out: 'power3.out', expo: 'expo.out' } as const

export { gsap, ScrollTrigger }
