import { team } from '../lib/content'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function Team() {
  return (
    <Section id="tim" mod="05" label="Tim" pad="xl" inverted>
      <h2 className="t-h2 text-panel-fg">Tim</h2>
      <p className="t-body mt-4 max-w-[52ch] text-panel-fg/75">
        Tiga orang yang menerjemahkan kebutuhan operasional menjadi sistem yang
        berjalan.
      </p>

      <ul className="mt-10 border-y border-white/10">
        {team.map((m, i) => (
          <li key={m.id} className="border-b border-white/10 last:border-0">
            <Reveal delay={i * 70}>
              <article className="py-7 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:py-9">
                {/* Record-number plate (no avatar tile). Untuk menampilkan foto,
                    ganti blok ini dengan <img> berukuran portrait di kolom yang sama. */}
                <div className="flex items-baseline gap-3 lg:col-span-2 lg:flex-col lg:items-start lg:gap-1.5">
                  <span
                    className="font-display leading-none text-panel-fg"
                    style={{ fontWeight: 560, fontSize: 'clamp(2.25rem, 4vw, 3rem)' }}
                  >
                    {m.index}
                  </span>
                  <span className="t-tag text-panel-fg/55">REC · {m.initials}</span>
                </div>

                {/* Identity record */}
                <div className="mt-5 lg:col-span-10 lg:mt-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <p className="t-tag text-accent-soft">{m.role}</p>
                    <span className="t-tag inline-flex items-center gap-1.5 text-panel-fg/55">
                      <span
                        aria-hidden="true"
                        className="inline-block h-[7px] w-[7px] rounded-full bg-signal-soft"
                      />
                      aktif
                    </span>
                  </div>

                  <h3 className="t-h3 mt-2 text-panel-fg">
                    <span aria-hidden="true" className="mr-1.5 font-mono text-panel-fg/35">
                      &gt;
                    </span>
                    {m.name}
                  </h3>

                  <p className="t-body mt-3 max-w-[60ch] text-panel-fg/75">{m.bio}</p>
                  <p className="t-tag mt-4 text-panel-fg/55">[ {m.expertise} ]</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
