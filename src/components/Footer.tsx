import { brand, team } from '../lib/content'
import { useActiveId } from '../lib/activeSection'

const modules: { mod: string; id: string; label: string }[] = [
  { mod: '00', id: 'hero', label: 'Sampul' },
  { mod: '01', id: 'latar', label: 'Latar Belakang' },
  { mod: '02', id: 'visi', label: 'Visi & Tujuan' },
  { mod: '03', id: 'nilai', label: 'Nilai Inti' },
  { mod: '04', id: 'layanan', label: 'Layanan' },
  { mod: '05', id: 'tim', label: 'Tim' },
  { mod: '06', id: 'portofolio', label: 'Portofolio' },
  { mod: '07', id: 'kontak', label: 'Kontak' },
]

export function Footer() {
  const active = useActiveId() === 'kontak'

  return (
    <footer id="kontak" aria-label="Kontak" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="py-14 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-24">
          {/* Meta-rail */}
          <header className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <p className="t-kicker flex flex-wrap items-center gap-x-2.5 gap-y-1 text-graphite">
                <span className="tnum">MOD.07</span>
                <span aria-hidden="true" className="text-accent">
                  /
                </span>
                <span>Kontak</span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-[7px] w-[7px] rounded-full border ${
                      active ? 'border-signal bg-signal' : 'border-graphite/50'
                    }`}
                  />
                  {active ? 'aktif' : 'idle'}
                </span>
              </p>
            </div>
          </header>

          {/* Content */}
          <div className="mt-8 lg:col-span-10 lg:mt-0">
            <p className="t-cap text-graphite">Kontak</p>
            <h2 className="t-h2 mt-4 max-w-[18ch] text-ink">
              Mari bangun sistem yang merapikan kerja Anda.
            </h2>
            <p className="t-body mt-5 max-w-[52ch] text-graphite">
              Ceritakan kebutuhan ERP, LIMS, web, atau integrasi AI Anda — kami
              bantu petakan menjadi solusi yang terukur.
            </p>
            <a
              href={`mailto:${brand.email}`}
              className="t-lead mt-6 inline-flex items-center gap-2 rounded-[1px] pb-1 break-words text-accent [border-bottom:1.5px_solid_var(--color-accent)]"
            >
              {brand.email}
              <span aria-hidden="true">→</span>
            </a>

            {/* Imprint / masthead */}
            <div className="mt-16 border-t border-line pt-9 lg:grid lg:grid-cols-12 lg:gap-x-10">
              {/* Sitemap = the module index reprinted */}
              <nav aria-label="Indeks halaman" className="lg:col-span-6">
                <p className="t-cap mb-4 text-graphite">Indeks</p>
                <ul className="grid grid-cols-1 gap-y-1 sm:grid-cols-2">
                  {modules.map((m) => (
                    <li key={m.id}>
                      <a
                        href={`#${m.id}`}
                        className="t-tag inline-flex min-h-11 items-center gap-3 rounded-[1px] py-2 text-graphite hover:text-ink"
                      >
                        <span className="tnum text-graphite/70">{m.mod}</span>
                        {m.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Kontributor */}
              <div className="mt-9 lg:col-span-3 lg:mt-0">
                <p className="t-cap mb-4 text-graphite">Kontributor</p>
                <ul className="space-y-1.5">
                  {team.map((m) => (
                    <li key={m.id} className="t-tag text-ink">
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colophon meta */}
              <div className="mt-9 lg:col-span-3 lg:mt-0">
                <p className="t-cap mb-4 text-graphite">Imprint</p>
                <dl className="space-y-1.5">
                  <div className="t-tag text-ink">
                    <dt className="inline text-graphite">Divisi · </dt>
                    <dd className="inline">{brand.parent}</dd>
                  </div>
                  <div className="t-tag text-ink">
                    <dt className="inline text-graphite">Est. · </dt>
                    <dd className="inline tnum">{brand.established}</dd>
                  </div>
                  <div className="t-tag text-ink">
                    <dt className="inline text-graphite">Stack · </dt>
                    <dd className="inline">React · Vite · TS</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Edition line */}
            <div className="t-tag mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-6 text-graphite">
              <span>
                Edisi 01 — {brand.established}–2026 · Disusun oleh{' '}
                <span className="text-ink">edig developer</span> · divisi
                teknologi {brand.parent}
              </span>
              <span className="tnum">© 2026</span>
            </div>
            <p className="t-cap mt-3 text-graphite">
              doc-id: edig.portfolio · lang: id-ID · last-revised: 2026.06.22
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
