import { brand } from '../lib/content'
import { Reveal } from './Reveal'

/** A small mono field row for the hero metadata sheet. */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <dt className="t-kicker text-graphite">{label}</dt>
      <dd className="t-tag text-right text-ink">{children}</dd>
    </div>
  )
}

export function Hero() {
  return (
    <section id="hero" className="scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="py-16 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-24">
          {/* Main column */}
          <div className="lg:col-span-8">
            <Reveal>
              <p className="t-kicker flex flex-wrap items-center gap-x-2.5 gap-y-1 text-graphite">
                <span className="tnum">MOD.00</span>
                <span aria-hidden="true" className="text-accent">
                  /
                </span>
                <span>Sampul</span>
              </p>
            </Reveal>

            <h1 className="mt-8 lg:mt-10">
              <span className="sr-only">edig developer — </span>
              <span aria-hidden="true" className="t-display block">
                Edig Developer
                <span
                  className="font-mono text-accent"
                  style={{ fontSize: '0.42em', verticalAlign: '0.06em' }}
                >
                  //
                </span>
              </span>
              <span className="t-lead mt-6 block max-w-[34ch] text-ink lg:mt-8">
                {brand.headline}
              </span>
            </h1>

            <Reveal delay={80}>
              <p className="t-body mt-6 max-w-[58ch] text-graphite">{brand.lead}</p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                <a
                  href="#layanan"
                  className="t-kicker inline-flex items-center gap-2 rounded-[1px] pb-1 text-accent [border-bottom:1.5px_solid_var(--color-accent)]"
                >
                  Lihat layanan
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#kontak"
                  className="t-kicker inline-flex items-center gap-2 rounded-[1px] pb-1 text-graphite underline-offset-4 hover:text-ink hover:underline"
                >
                  Hubungi kami
                </a>
              </div>
            </Reveal>
          </div>

          {/* Metadata sheet */}
          <div className="mt-12 lg:col-span-4 lg:mt-2 lg:pl-8 lg:[border-left:1px_solid_var(--color-line)]">
            <Reveal delay={120}>
              <p className="t-cap mb-3 text-graphite">Rekaman</p>
              <dl>
                <Field label="Divisi">{brand.parent}</Field>
                <Field label="Fokus">ERP · LIMS · Web · AI</Field>
                <Field label="Stack">React · Odoo · Python</Field>
                <Field label="Layanan">6 lini</Field>
                <Field label="Est.">{brand.established}</Field>
                <Field label="Status">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="inline-block h-[7px] w-[7px] rounded-full bg-signal"
                    />
                    aktif
                  </span>
                </Field>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
