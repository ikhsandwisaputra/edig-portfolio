import { useEffect, useRef, useState } from 'react'
import { nav } from '../lib/content'
import { useActiveId } from '../lib/activeSection'
import { Wordmark } from './Wordmark'

export function Header() {
  const activeId = useActiveId()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the mobile menu on Escape and when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 lg:px-10">
        <a
          href="#hero"
          aria-label="edig developer — ke beranda"
          className="rounded-[1px] text-xl tracking-tight"
        >
          <Wordmark />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`t-tag rounded-[1px] pb-0.5 transition-colors hover:text-ink ${
                      isActive
                        ? 'text-ink [border-bottom:1.5px_solid_var(--color-accent)]'
                        : 'text-graphite'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="t-kicker inline-flex min-h-11 items-center rounded-[1px] px-1 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Tutup' : 'Menu'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navigasi utama"
          className="border-t border-line md:hidden"
        >
          <ul className="mx-auto max-w-[1200px] px-6 py-2">
            {nav.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id} className="border-b border-line/70 last:border-0">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                    className={`t-kicker flex items-center justify-between py-3.5 ${
                      isActive ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {item.label}
                    {isActive && <span aria-hidden="true">●</span>}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
