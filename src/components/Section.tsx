import type { ReactNode } from 'react'
import { useActiveId } from '../lib/activeSection'

interface SectionProps {
  id: string
  /** Module number shown in the meta-rail, e.g. "01". */
  mod: string
  /** Human label, normal case — uppercased visually by the mono kicker. */
  label: string
  /** Vertical rhythm: alternates per the spec's tokenized asymmetry. */
  pad?: 'lg' | 'xl'
  /** Render the single inverted dark panel (used by Tim). */
  inverted?: boolean
  children: ReactNode
}

function StatusDot({ active, inverted }: { active: boolean; inverted: boolean }) {
  const fill = inverted ? 'bg-signal-soft border-signal-soft' : 'bg-signal border-signal'
  const idle = inverted ? 'border-panel-fg/40' : 'border-graphite/50'
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className={`inline-block h-[7px] w-[7px] rounded-full border ${
          active ? fill : idle
        }`}
      />
      <span>{active ? 'aktif' : 'idle'}</span>
    </span>
  )
}

/**
 * Section shell with the left meta-rail. The rail is `position: sticky` on
 * desktop and dissolves into an inline kicker above the content on mobile.
 */
export function Section({
  id,
  mod,
  label,
  pad = 'lg',
  inverted = false,
  children,
}: SectionProps) {
  const active = useActiveId() === id
  const padY = pad === 'xl' ? 'py-16 lg:py-32' : 'py-14 lg:py-24'

  return (
    <section
      id={id}
      aria-label={label}
      className={[
        'scroll-mt-20 border-t',
        inverted ? 'on-dark bg-panel text-panel-fg border-white/10' : 'border-line',
      ].join(' ')}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-10">
        <div className={`${padY} lg:grid lg:grid-cols-12 lg:gap-x-10`}>
          <header className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <p
                className={`t-kicker flex flex-wrap items-center gap-x-2.5 gap-y-1 ${
                  inverted ? 'text-panel-fg/65' : 'text-graphite'
                }`}
              >
                <span className="tnum">MOD.{mod}</span>
                <span aria-hidden="true" className="text-accent">
                  /
                </span>
                <span>{label}</span>
                <StatusDot active={active} inverted={inverted} />
              </p>
              <div
                aria-hidden="true"
                className="ruler-ticks mt-4 hidden h-14 w-px opacity-70 lg:block"
              />
            </div>
          </header>

          <div className="mt-7 lg:col-span-10 lg:mt-0">{children}</div>
        </div>
      </div>
    </section>
  )
}
