import { useRef } from 'react'
import { caseStudies, type CaseStudy, type Metric } from '../lib/content'
import { caseWireframes } from './Schematics'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function FieldBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="t-cap mb-2 inline-flex items-center gap-2 text-graphite">
        <span aria-hidden="true" className="inline-block h-px w-5 bg-accent" />
        {label}
      </p>
      <p className="t-body max-w-[58ch] text-ink">{text}</p>
    </div>
  )
}

function MetricCell({ metric, wide }: { metric: Metric; wide: boolean }) {
  const isFigure = /\d/.test(metric.value) && metric.value.length <= 6
  return (
    <div className={`bg-surface px-5 py-6 ${wide ? 'sm:col-span-2' : ''}`}>
      <p className={`${isFigure ? 't-metric' : 't-h3'} tnum text-accent`}>
        {metric.value}
      </p>
      <p className="t-cap mt-3 text-graphite">{metric.label}</p>
    </div>
  )
}

function CaseStudyView({ study, index }: { study: CaseStudy; index: number }) {
  const container = useRef<HTMLElement>(null)
  const Wire = caseWireframes[study.id]
  const reverse = index % 2 === 1
  const single = study.metrics.length === 1

  useGSAP(() => {
    if (!container.current) return

    // Clip path reveal on the article
    gsap.fromTo(container.current, 
      { clipPath: "inset(20% 0 100% 0)", opacity: 0.5 },
      { 
        clipPath: "inset(0% 0 0% 0)", 
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 1
        }
      }
    )

    // Parallax and blur on the figure
    const figure = container.current.querySelector('figure')
    if (figure) {
      gsap.fromTo(figure, 
        { scale: 0.9, filter: "blur(10px)" },
        {
          scale: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: figure,
            start: "top 95%",
            end: "top 50%",
            scrub: true
          }
        }
      )
    }

    // Text lines reveal for title
    const title = container.current.querySelector('h3')
    if (title) {
      const split = new SplitType(title, { types: 'lines' })
      if (split.lines) {
        split.lines.forEach(line => {
          const wrapper = document.createElement('div')
          wrapper.style.overflow = 'hidden'
          line.parentNode?.insertBefore(wrapper, line)
          wrapper.appendChild(line)
        })
        gsap.from(split.lines, {
          yPercent: 125,
          rotate: 2.5,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        })
      }
    }
  }, { scope: container })

  return (
    <article ref={container} className="border-t border-line pt-12 first:border-0 first:pt-0 pb-16">
      <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <div>
          <p className="t-kicker tnum text-graphite">Studi Kasus {study.index}</p>
          <h3 className="t-h3 mt-2 max-w-[26ch] text-ink">{study.title}</h3>
          <p className="t-tag mt-2 text-graphite">{study.client}</p>
        </div>
        <p className="t-tag text-graphite">{study.tags.join('  ·  ')}</p>
      </header>

      <div className="mt-9 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
        <div className={`space-y-6 lg:col-span-7 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <FieldBlock label="Latar Belakang" text={study.background} />
          <FieldBlock label="Tantangan" text={study.challenge} />
          <FieldBlock label="Solusi Kami" text={study.solution} />
        </div>

        <div className={`mt-10 lg:col-span-5 lg:mt-0 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {study.metrics.map((m) => (
              <MetricCell key={m.label} metric={m} wide={single} />
            ))}
          </dl>

          <p className="t-small mt-4 flex gap-2 text-graphite">
            <span aria-hidden="true" className="text-accent">
              →
            </span>
            {study.outcome}
          </p>

          {Wire && (
            <figure className="mt-7 border border-line bg-surface overflow-hidden">
              <div className="relative flex aspect-[16/10] items-center justify-center p-5 text-graphite/45">
                <span className="t-cap absolute left-3 top-3 text-graphite z-10">
                  skematik
                </span>
                <Wire className="h-full w-full" />
              </div>
              <figcaption className="t-cap border-t border-line px-4 py-2.5 text-graphite">
                {study.figureCaption}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </article>
  )
}

export function Work() {
  return (
    <Section id="portofolio" mod="06" label="Portofolio" pad="xl">
      <Reveal>
        <h2 className="t-h2">Portofolio</h2>
        <p className="t-body mt-4 max-w-[58ch] text-graphite">
          Tiga laporan kerja — latar belakang, tantangan, solusi, dan dampak yang terukur.
        </p>
      </Reveal>

      <div className="mt-12 space-y-14">
        {caseStudies.map((study, i) => (
          <CaseStudyView key={study.id} study={study} index={i} />
        ))}
      </div>
    </Section>
  )
}
