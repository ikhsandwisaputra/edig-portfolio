import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

const ActiveSectionContext = createContext<string>('')

/** Read the id of the section currently nearest the top of the viewport. */
export function useActiveId(): string {
  return useContext(ActiveSectionContext)
}

/**
 * Scroll-spy provider. Observes the given section ids and exposes whichever
 * one currently sits in a band near the top of the viewport — used to light
 * up the nav and flip each meta-rail stamp between "aktif" and "idle".
 * Built on IntersectionObserver (sticky, never fixed) per the design spec.
 */
export function ActiveSectionProvider({
  ids,
  children,
}: {
  ids: readonly string[]
  children: ReactNode
}) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Pick the earliest section (document order) inside the active band.
        const next = ids.find((id) => visible.has(id))
        if (next) setActive(next)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return (
    <ActiveSectionContext.Provider value={active}>
      {children}
    </ActiveSectionContext.Provider>
  )
}
