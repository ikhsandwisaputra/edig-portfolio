import { useId, useState, useRef } from 'react'
import { services, type Service } from '../lib/content'
import { serviceSchematics } from './Schematics'
import { Section } from './Section'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

gsap.registerPlugin(useGSAP)

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="2" y1="7" x2="12" y2="7" />
      {!open && <line x1="7" y1="2" x2="7" y2="12" />}
    </svg>
  )
}

function ServiceRow({ service }: { service: Service }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const btnId = useId()
  const Schematic = serviceSchematics[service.id]
  const rowRef = useRef<HTMLLIElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!titleRef.current || !rowRef.current) return

    const textSplit = new SplitType(titleRef.current, { types: 'chars' })
    const chars = textSplit.chars
    if (!chars) return

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
      stagger: 0.015
    }).set(chars, {
      yPercent: 100
    }).to(chars, {
      yPercent: 0,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.015
    })

    const onEnter = () => hoverAnim.restart()
    const button = rowRef.current.querySelector('button')
    button?.addEventListener('mouseenter', onEnter)

    return () => {
      button?.removeEventListener('mouseenter', onEnter)
      textSplit.revert()
    }
  }, { scope: rowRef })

  return (
    <li ref={rowRef} data-reveal-child className="relative border-b border-line first:border-t group">
      {/* Accent bar that scales in from the left when expanded — no layout shift. */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-[2px] origin-top bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100 group-hover:opacity-50'
        }`}
      />

      <h3 className="m-0">
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-4 py-5 pr-1 text-left sm:gap-6"
        >
          <span
            className={`t-kicker tnum w-7 shrink-0 transition-colors ${
              open ? 'text-accent' : 'text-graphite group-hover:text-ink'
            }`}
          >
            {service.index}
          </span>
          <span ref={titleRef} className="t-h3 flex-1 text-ink">{service.title}</span>
          {Schematic && (
            <span
              data-draw
              className={`shrink-0 transition-colors ${
                open ? 'text-accent' : 'text-ink/65 group-hover:text-accent'
              }`}
            >
              <Schematic className="h-9 w-9 sm:h-10 sm:w-10" />
            </span>
          )}
          <span className={`shrink-0 pl-1 transition-colors ${open ? 'text-accent' : 'text-graphite group-hover:text-accent'}`}>
            <PlusMinus open={open} />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pl-11 pr-1 sm:pl-13">
            <p className="t-body max-w-[60ch] text-graphite">{service.body}</p>
            <p className="t-tag mt-4 text-graphite">
              {service.tags.join('  ·  ')}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export function Services() {
  return (
    <Section id="layanan" mod="04" label="Layanan" pad="lg">
      <h2 className="t-h2">Layanan</h2>
      <p className="t-body mt-4 max-w-[58ch] text-graphite">
        Enam lini solusi teknologi — pilih satu untuk membuka rinciannya.
      </p>

      <ul data-reveal="group" className="mt-9">
        {services.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </ul>
    </Section>
  )
}
