import { useId, useState } from 'react'
import { services, type Service } from '../lib/content'
import { serviceSchematics } from './Schematics'
import { Section } from './Section'

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

  return (
    <li className="relative border-b border-line first:border-t">
      {/* Accent bar that scales in from the left when expanded — no layout shift. */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-[2px] origin-top bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? 'scale-y-100' : 'scale-y-0'
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
              open ? 'text-accent' : 'text-graphite'
            }`}
          >
            {service.index}
          </span>
          <span className="t-h3 flex-1 text-ink">{service.title}</span>
          {Schematic && (
            <span
              className={`shrink-0 transition-colors ${
                open ? 'text-accent' : 'text-ink/65'
              }`}
            >
              <Schematic className="h-9 w-9 sm:h-10 sm:w-10" />
            </span>
          )}
          <span className={`shrink-0 pl-1 ${open ? 'text-accent' : 'text-graphite'}`}>
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

      <ul className="mt-9">
        {services.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </ul>
    </Section>
  )
}
