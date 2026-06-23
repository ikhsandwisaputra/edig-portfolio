import { values } from '../lib/content'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function Values() {
  return (
    <Section id="nilai" mod="03" label="Nilai Inti" pad="lg">
      <h2 className="t-h2">Nilai Inti</h2>
      <p className="t-body mt-4 max-w-[56ch] text-graphite">
        Empat prinsip yang menopang cara kami merancang, membangun, dan menjaga
        setiap sistem.
      </p>

      <Reveal className="mt-9">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Empat nilai inti edig developer: istilah, padanan bahasa Inggris, dan definisi.
          </caption>
          <thead className="hidden md:table-header-group">
            <tr>
              <th scope="col" className="t-cap w-16 border-b border-line py-3 text-graphite">
                ID
              </th>
              <th scope="col" className="t-cap w-[34%] border-b border-line py-3 text-graphite">
                Nilai
              </th>
              <th scope="col" className="t-cap border-b border-line py-3 text-graphite">
                Definisi
              </th>
            </tr>
          </thead>
          <tbody>
            {values.map((v) => (
              <tr
                key={v.id}
                className="block border-b border-line py-5 align-top md:table-row md:border-0 md:py-0"
              >
                <td className="block align-top md:table-cell md:w-16 md:border-b md:border-line md:py-6 md:pr-4">
                  <span className="t-kicker tnum text-graphite">{v.index}</span>
                </td>
                <td className="mt-1 block align-top md:mt-0 md:table-cell md:border-b md:border-line md:py-6 md:pr-8">
                  <span className="t-cap mb-1 block text-graphite">{v.titleEn}</span>
                  <span className="t-h3 block text-ink">{v.titleId}</span>
                </td>
                <td className="mt-3 block align-top md:mt-0 md:table-cell md:border-b md:border-line md:py-6">
                  <span className="t-body block max-w-[58ch] text-graphite">{v.body}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  )
}
