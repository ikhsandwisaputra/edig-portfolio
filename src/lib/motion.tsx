import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import Lenis from 'lenis'
import SplitType from 'split-type'

/* ─────────────────────────────────────────────────────────────────────────
   Motion system — adapted (not copied) from the three reference designs:
   · Lenis buttery smooth scroll + GSAP ScrollTrigger     (desain-1)
   · masked line reveals, clip/parallax, schematic draw   (desain-1)
   · CustomEase "main"                                     (desain-3)
   Every effect is gated behind `prefers-reduced-motion`: when the user opts
   out we init nothing, so all content is shown statically. Initial hidden
   states are set in useLayoutEffect (pre-paint) to avoid any flash.
   ───────────────────────────────────────────────────────────────────────── */

const EASE = 'main'
const EASE_FALLBACK = '0.65, 0.01, 0.05, 0.99'

interface MotionApi {
  lockScroll: () => void
  unlockScroll: () => void
}

const MotionContext = createContext<MotionApi>({
  lockScroll: () => {},
  unlockScroll: () => {},
})

export const useMotion = () => useContext(MotionContext)

export function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // honour reduced-motion: render everything statically

    gsap.registerPlugin(ScrollTrigger, CustomEase)
    try {
      CustomEase.create(EASE, EASE_FALLBACK)
    } catch {
      /* already registered (StrictMode re-run) */
    }

    const splits: SplitType[] = []
    let killed = false

    // ── Pre-paint: hide reveal targets so nothing flashes before animating ──
    gsap.set('.t-h2', { opacity: 0 })
    gsap.set('[data-reveal="fade"], [data-reveal-child]', { autoAlpha: 0, y: 24 })
    gsap.set('[data-reveal="figure"]', { clipPath: 'inset(0 0 100% 0)' })

    const ctx = gsap.context(() => {
      // Fade-rise blocks
      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE }),
        })
      })

      // Staggered groups (lists, hero)
      gsap.utils.toArray<HTMLElement>('[data-reveal="group"]').forEach((group) => {
        const items = group.querySelectorAll('[data-reveal-child]')
        if (!items.length) return
        ScrollTrigger.create({
          trigger: group,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(items, {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: EASE,
              stagger: 0.08,
            }),
        })
      })

      // Figures: clip-path reveal + gentle inner scale
      gsap.utils.toArray<HTMLElement>('[data-reveal="figure"]').forEach((el) => {
        const inner = el.querySelector('svg, img')
        if (inner) gsap.set(inner, { scale: 1.08, transformOrigin: 'center' })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: EASE })
            if (inner) gsap.to(inner, { scale: 1, duration: 1.4, ease: EASE })
          },
        })
      })

      // Gentle scrub parallax
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || '6')
        gsap.fromTo(
          el,
          { yPercent: amt },
          {
            yPercent: -amt,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // Schematic draw-on (like a diagram being plotted)
      gsap.utils.toArray<SVGElement>('[data-draw]').forEach((host) => {
        const shapes = host.querySelectorAll<SVGGeometryElement>(
          'path, line, polyline, rect, circle, ellipse',
        )
        const drawable: SVGGeometryElement[] = []
        shapes.forEach((s) => {
          let len = 0
          try {
            len = s.getTotalLength()
          } catch {
            len = 0
          }
          if (len > 0) {
            gsap.set(s, { strokeDasharray: len, strokeDashoffset: len })
            drawable.push(s)
          }
        })
        if (!drawable.length) return
        ScrollTrigger.create({
          trigger: host,
          start: 'top 92%',
          once: true,
          onEnter: () =>
            gsap.to(drawable, {
              strokeDashoffset: 0,
              duration: 0.9,
              ease: 'power2.out',
              stagger: 0.04,
            }),
        })
      })
    })

    // ── Section titles: masked, staggered line reveal (after fonts settle) ──
    const setupTitles = () => {
      if (killed) return
      gsap.utils.toArray<HTMLElement>('.t-h2').forEach((el) => {
        const split = new SplitType(el, { types: 'lines' })
        splits.push(split)
        split.lines?.forEach((line) => {
          const mask = document.createElement('span')
          mask.className = 'line-mask'
          line.parentNode?.insertBefore(mask, line)
          mask.appendChild(line)
        })
        gsap.set(el, { opacity: 1 })
        if (split.lines?.length) {
          gsap.set(split.lines, { yPercent: 115, rotate: 3 })
          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () =>
              gsap.to(split.lines!, {
                yPercent: 0,
                rotate: 0,
                duration: 1,
                ease: EASE,
                stagger: 0.09,
              }),
          })
        }
      })
      ScrollTrigger.refresh()
    }

    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(setupTitles)
    } else {
      setupTitles()
    }

    // ── Lenis smooth scroll, driven by the GSAP ticker ──
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // In-page anchor links scroll smoothly via Lenis
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const hash = anchor.getAttribute('href') || ''
      if (hash.length < 2) return
      const target = document.getElementById(hash.slice(1))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -64 })
      history.replaceState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    return () => {
      killed = true
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
      splits.forEach((s) => s.revert())
      ctx.revert()
    }
  }, [])

  const api: MotionApi = {
    lockScroll: () => {
      lenisRef.current?.stop()
      document.documentElement.style.overflow = 'hidden'
    },
    unlockScroll: () => {
      lenisRef.current?.start()
      document.documentElement.style.overflow = ''
    },
  }

  return <MotionContext.Provider value={api}>{children}</MotionContext.Provider>
}
