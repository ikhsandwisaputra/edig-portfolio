import { useEffect, useRef, useState } from 'react'
import { nav } from '../lib/content'
import { useActiveId } from '../lib/activeSection'
import { Wordmark } from './Wordmark'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

gsap.registerPlugin(useGSAP)

function DesktopLink({ item, isActive }: { item: any; isActive: boolean }) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  
  useGSAP(() => {
    if (!linkRef.current) return
    const textSplit = new SplitType(linkRef.current, { types: 'chars' })
    const chars = textSplit.chars
    if (!chars) return

    // Set overflow hidden on parents of chars to mask them
    chars.forEach((char) => {
      const wrapper = document.createElement('span')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'inline-block'
      char.parentNode?.insertBefore(wrapper, char)
      wrapper.appendChild(char)
    })

    const hoverAnim = gsap.timeline({ paused: true })
    hoverAnim.to(chars, {
      yPercent: -100,
      duration: 0.3,
      ease: 'power2.inOut',
      stagger: 0.02
    }).set(chars, {
      yPercent: 100
    }).to(chars, {
      yPercent: 0,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.02
    })

    const onEnter = () => hoverAnim.restart()
    linkRef.current.addEventListener('mouseenter', onEnter)

    return () => {
      if (linkRef.current) linkRef.current.removeEventListener('mouseenter', onEnter)
      textSplit.revert()
    }
  }, { scope: linkRef })

  return (
    <a
      ref={linkRef}
      href={`#${item.id}`}
      aria-current={isActive ? 'true' : undefined}
      className={`t-tag rounded-[1px] pb-0.5 transition-colors hover:text-ink inline-block ${
        isActive
          ? 'text-ink [border-bottom:1.5px_solid_var(--color-accent)]'
          : 'text-graphite'
      }`}
    >
      {item.label}
    </a>
  )
}

export function Header() {
  const activeId = useActiveId()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline>(null)

  // GSAP animation for mobile menu
  useGSAP(() => {
    tlRef.current = gsap.timeline({ paused: true })
      .set(menuRef.current, { display: 'block' })
      .fromTo('.menu-backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
      .fromTo('.menu-panel', 
        { xPercent: 101 }, 
        { xPercent: 0, duration: 0.6, ease: 'expo.inOut' }, 
        '<'
      )
      .fromTo('.menu-link', 
        { yPercent: 140, rotate: 10 }, 
        { yPercent: 0, rotate: 0, stagger: 0.05, duration: 0.6, ease: 'back.out(1.2)' },
        '-=0.3'
      )
  }, { scope: menuRef })

  useEffect(() => {
    if (open) {
      tlRef.current?.play()
    } else {
      tlRef.current?.reverse()
    }
  }, [open])

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
            {nav.map((item) => (
              <li key={item.id}>
                <DesktopLink item={item} isActive={activeId === item.id} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="t-kicker inline-flex min-h-11 items-center rounded-[1px] px-1 text-ink md:hidden relative z-[70]"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Tutup' : 'Menu'}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div ref={menuRef} className="fixed inset-0 z-[60] hidden pointer-events-none" style={{ pointerEvents: open ? 'auto' : 'none' }}>
        <div className="menu-backdrop absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <nav
          id="menu-mobile"
          aria-label="Navigasi utama"
          className="menu-panel absolute right-0 top-0 bottom-0 w-[min(88vw,24rem)] bg-paper border-l border-line flex flex-col justify-center px-8"
        >
          <ul className="space-y-6">
            {nav.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id} className="overflow-hidden">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                    className={`menu-link t-h3 block ${
                      isActive ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
