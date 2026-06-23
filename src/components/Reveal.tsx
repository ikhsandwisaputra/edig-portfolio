import { useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Marks a block for a fade-and-rise on scroll using GSAP.
 * @param delay - delay in milliseconds
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const el = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!el.current) return
    gsap.fromTo(el.current, 
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay: delay / 1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el.current,
          start: 'top 85%',
          once: true
        }
      }
    )
  }, { scope: el })

  return (
    <div ref={el} className={className || undefined}>
      {children}
    </div>
  )
}
