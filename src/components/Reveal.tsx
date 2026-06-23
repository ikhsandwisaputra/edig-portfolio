import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger this element's reveal by N ms. */
  delay?: number
}

/**
 * Wraps content in a once-only fade-and-rise reveal. The motion is defined in
 * CSS (`.reveal`) and is fully disabled under `prefers-reduced-motion`.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
