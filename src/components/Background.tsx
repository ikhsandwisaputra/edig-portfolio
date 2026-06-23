import { background } from '../lib/content'
import { Section } from './Section'
import { Reveal } from './Reveal'

const facts: { k: string; v: string }[] = [
  { k: 'Induk', v: 'Ecodigitus' },
  { k: 'Fondasi', v: 'Odoo ERP · Ediglab LIMS' },
  { k: 'Ekspansi', v: 'SEO · Roblox' },
  { k: 'Model', v: 'Solusi satu pintu' },
]

export function Background() {
  // Open with the identity sentence at lead size; the rest reads as body.
  const split = background.body.indexOf('. ')
  const lead = background.body.slice(0, split + 1)
  const rest = background.body.slice(split + 2)

  return (
    <Section id="latar" mod="01" label="Latar Belakang" pad="lg">
      <h2 className="t-h2 max-w-[14ch]">Latar Belakang</h2>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-10">
        <Reveal className="lg:col-span-7">
          <p className="t-lead max-w-[58ch] text-ink">{lead}</p>
          <p className="t-body mt-5 max-w-[60ch] text-graphite">{rest}</p>
        </Reveal>

        <Reveal className="mt-10 lg:col-span-5 lg:mt-1.5" delay={90}>
          <dl className="border-t border-line">
            {facts.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline gap-4 border-b border-line py-3"
              >
                <dt className="t-kicker w-24 shrink-0 text-graphite">{f.k}</dt>
                <dd className="t-tag text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
