import { useRef } from 'react'
import type { ReactNode } from 'react'
import { brand } from '../lib/content'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

/** A small mono field row for the hero metadata sheet. */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <dt className="t-kicker text-graphite">{label}</dt>
      <dd className="t-tag text-right text-ink">{children}</dd>
    </div>
  )
}

export function Hero() {
  const container = useRef<HTMLElement>(null)
  const scrambleRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!container.current) return

    // 1. Fade up staggering for all hero elements
    const groups = gsap.utils.toArray<HTMLElement>('[data-reveal="group"]', container.current)
    groups.forEach((group) => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal-child]', group)
      gsap.fromTo(items, 
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.2
        }
      )
    })

    // 2. Coding / Hacker transition effect on "Edig Developer" text
    if (scrambleRef.current) {
      const el = scrambleRef.current;
      const originalText = "Edig Developer";
      const totalChars = originalText.length;
      const allTexts = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
      const obj = { sA: 0, sB: 0 };
      
      // sA controls the length of the string (typing in effect)
      gsap.to(obj, {
        sA: 1,
        duration: 1.0,
        ease: "power2.out",
        delay: 0.2
      });

      // sB controls the resolution of correct characters (decoding effect)
      gsap.to(obj, {
        sB: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.5,
        onUpdate: () => {
          let str = '';
          const len = Math.floor(obj.sA * totalChars);
          const lockedCount = Math.floor(obj.sB * totalChars);
          
          for (let i = 0; i < len; i++) {
            if (i < lockedCount) {
              str += originalText[i];
            } else {
              if (originalText[i] === ' ') {
                str += ' ';
              } else {
                str += allTexts[Math.floor(Math.random() * allTexts.length)];
              }
            }
          }
          el.innerText = str;
        },
        onComplete: () => {
          el.innerText = originalText;
        }
      });
    }

  }, { scope: container })

  return (
    <section id="hero" className="scroll-mt-20" ref={container}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div
          data-reveal="group"
          className="py-16 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-24"
        >
          {/* Main column */}
          <div className="lg:col-span-8">
            <p
              data-reveal-child
              className="t-kicker flex flex-wrap items-center gap-x-2.5 gap-y-1 text-graphite"
            >
              <span className="tnum">MOD.00</span>
              <span aria-hidden="true" className="text-accent">
                /
              </span>
              <span>Sampul</span>
            </p>

            <h1 data-reveal-child className="mt-8 lg:mt-10">
              <span className="sr-only">edig developer — </span>
              <span aria-hidden="true" className="t-display flex items-baseline gap-2">
                <span ref={scrambleRef}></span>
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

            <p data-reveal-child className="t-body mt-6 max-w-[58ch] text-graphite">
              {brand.lead}
            </p>

            <div
              data-reveal-child
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
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
          </div>

          {/* Metadata sheet */}
          <div className="mt-12 lg:col-span-4 lg:mt-2 lg:pl-8 lg:[border-left:1px_solid_var(--color-line)]">
            <div data-reveal-child>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
