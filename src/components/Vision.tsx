import { vision } from '../lib/content'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function Vision() {
  return (
    <Section id="visi" mod="02" label="Visi & Tujuan" pad="xl">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <p className="t-cap text-graphite">Visi</p>
          {/* The vision statement is the section's defining line. */}
          <h2 className="t-h2 mt-4 max-w-[20ch] text-ink">{vision.visi}</h2>
        </div>

        <Reveal
          className="mt-10 lg:col-span-5 lg:mt-1.5 lg:pl-10 lg:[border-left:1px_solid_var(--color-line)]"
          delay={80}
        >
          <p className="t-cap text-graphite">Tujuan</p>
          <p className="t-body mt-4 max-w-[48ch] text-ink">{vision.tujuan}</p>
        </Reveal>
      </div>
    </Section>
  )
}
