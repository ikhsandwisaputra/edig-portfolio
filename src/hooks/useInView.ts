import { useEffect, useRef, useState } from 'react'

interface Options {
  /** Fraction of the element visible before it counts as "in view". */
  threshold?: number
  /** Margin around the root, e.g. trigger slightly before it enters. */
  rootMargin?: string
  /** Reveal only once, then stop observing. */
  once?: boolean
}

/**
 * Lightweight scroll-reveal hook built on IntersectionObserver.
 * Hand-rolled (no animation library) and honours `prefers-reduced-motion`:
 * users who opt out are treated as "already in view" so nothing is hidden.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
