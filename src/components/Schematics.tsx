import type { ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   Bespoke monoline schematics. Hand-drawn, single-weight strokes in
   currentColor — never an icon library, never emoji. Each depicts the actual
   domain (ERP modules, LIMS sample tracking, SSO + AI graph, …). This is the
   load-bearing anti-AI detail, so the geometry is specific, not generic.
   ───────────────────────────────────────────────────────────────────────── */

interface SvgProps {
  className?: string
}

function Glyph({
  children,
  className,
  viewBox = '0 0 56 56',
  strokeWidth = 1.4,
}: SvgProps & { children: ReactNode; viewBox?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

// ── Service glyphs (56×56) ──────────────────────────────────────────────────

function OdooErp({ className }: SvgProps) {
  // Interconnected modules around a central one — an integrated ERP.
  return (
    <Glyph className={className}>
      <rect x="22" y="22" width="12" height="12" />
      <rect x="24" y="6" width="8" height="8" />
      <rect x="6" y="24" width="8" height="8" />
      <rect x="42" y="24" width="8" height="8" />
      <rect x="24" y="42" width="8" height="8" />
      <path d="M28 22V14M28 34v8M22 28h-8M34 28h8" />
    </Glyph>
  )
}

function Lims({ className }: SvgProps) {
  // Three sample tubes tracked along a process line with nodes.
  return (
    <Glyph className={className}>
      <path d="M11 9V19a3 3 0 0 0 6 0V9" />
      <path d="M25 9V19a3 3 0 0 0 6 0V9" />
      <path d="M39 9V19a3 3 0 0 0 6 0V9" />
      <path d="M10 9h8M24 9h8M38 9h8" />
      <path d="M8 46h40" />
      <circle cx="14" cy="46" r="2" />
      <circle cx="28" cy="46" r="2" />
      <circle cx="42" cy="46" r="2" />
      <path d="M14 24v20M28 24v20M42 24v20" />
    </Glyph>
  )
}

function Cms({ className }: SvgProps) {
  // A page/CMS frame: window chrome, a feature block, content lines.
  return (
    <Glyph className={className}>
      <rect x="8" y="8" width="40" height="40" rx="1.5" />
      <path d="M8 18h40" />
      <circle cx="13" cy="13" r="1" />
      <circle cx="18" cy="13" r="1" />
      <circle cx="23" cy="13" r="1" />
      <rect x="13" y="24" width="14" height="18" rx="1" />
      <path d="M31 25h12M31 31h12M31 37h9" />
    </Glyph>
  )
}

function FullstackAi({ className }: SvgProps) {
  // Stacked layers (FE/BE/DB) feeding an AI node graph.
  return (
    <Glyph className={className}>
      <rect x="7" y="10" width="22" height="9" rx="1.5" />
      <rect x="7" y="23" width="22" height="9" rx="1.5" />
      <rect x="7" y="36" width="22" height="9" rx="1.5" />
      <path d="M29 27h8" />
      <circle cx="43" cy="14" r="2.5" />
      <circle cx="39" cy="28" r="2.5" />
      <circle cx="46" cy="41" r="2.5" />
      <path d="M43 16.5 39.6 25.6M39 30.5 45.4 38.6M44.6 15.8 46 38.5" />
    </Glyph>
  )
}

function Seo({ className }: SvgProps) {
  // Rising bars under a magnifier — search visibility & growth.
  return (
    <Glyph className={className}>
      <path d="M8 46h38" />
      <rect x="10" y="36" width="6" height="10" />
      <rect x="19" y="30" width="6" height="16" />
      <rect x="28" y="22" width="6" height="24" />
      <circle cx="41" cy="18" r="8" />
      <path d="M47 24 52 29" />
    </Glyph>
  )
}

function Roblox({ className }: SvgProps) {
  // An isometric stud block — the Roblox primitive.
  return (
    <Glyph className={className}>
      <path d="M28 8 44 17 28 26 12 17Z" />
      <path d="M12 17v18l16 9V26" />
      <path d="M44 17v18l-16 9" />
      <ellipse cx="28" cy="14" rx="4" ry="2" />
    </Glyph>
  )
}

export const serviceSchematics: Record<string, (p: SvgProps) => ReactNode> = {
  odoo: OdooErp,
  lims: Lims,
  cms: Cms,
  'fullstack-ai': FullstackAi,
  seo: Seo,
  roblox: Roblox,
}

// ── Case-study wireframes (320×180) — used inside figure placeholders ────────

function WireCms({ className }: SvgProps) {
  // Homepage: header + nav, hero, three article cards.
  return (
    <Glyph className={className} viewBox="0 0 320 180" strokeWidth={1.1}>
      <rect x="8" y="8" width="304" height="164" rx="3" />
      <path d="M8 36h304" />
      <rect x="20" y="17" width="46" height="11" rx="2" />
      <path d="M210 23h22M244 23h22M278 23h22" />
      <rect x="20" y="50" width="180" height="42" rx="2" />
      <path d="M214 58h86M214 70h86M214 82h56" />
      <rect x="20" y="104" width="86" height="56" rx="2" />
      <rect x="117" y="104" width="86" height="56" rx="2" />
      <rect x="214" y="104" width="86" height="56" rx="2" />
      <path d="M28 150h70M125 150h70M222 150h70" />
    </Glyph>
  )
}

function WireLims({ className }: SvgProps) {
  // Dashboard: sidebar, stat tiles, bar chart, table.
  return (
    <Glyph className={className} viewBox="0 0 320 180" strokeWidth={1.1}>
      <rect x="8" y="8" width="304" height="164" rx="3" />
      <path d="M86 8v164M8 36h304" />
      <path d="M20 56h52M20 72h44M20 88h52M20 104h38" />
      <rect x="100" y="50" width="62" height="34" rx="2" />
      <rect x="170" y="50" width="62" height="34" rx="2" />
      <rect x="240" y="50" width="62" height="34" rx="2" />
      <path d="M100 150h136" />
      <rect x="108" y="120" width="12" height="30" />
      <rect x="128" y="108" width="12" height="42" />
      <rect x="148" y="128" width="12" height="22" />
      <rect x="168" y="100" width="12" height="50" />
      <rect x="188" y="116" width="12" height="34" />
      <rect x="208" y="104" width="12" height="46" />
      <path d="M248 104h54M248 120h54M248 136h54M248 152h54" />
    </Glyph>
  )
}

function WireSso({ className }: SvgProps) {
  // Split: SSO padlock + fields | AI chat thread.
  return (
    <Glyph className={className} viewBox="0 0 320 180" strokeWidth={1.1}>
      <rect x="8" y="8" width="304" height="164" rx="3" />
      <path d="M160 8v164" />
      <rect x="68" y="50" width="32" height="26" rx="3" />
      <path d="M74 50v-8a10 10 0 0 1 20 0v8" />
      <circle cx="84" cy="61" r="3" />
      <path d="M84 64v6" />
      <rect x="44" y="92" width="80" height="14" rx="3" />
      <rect x="44" y="114" width="80" height="14" rx="3" />
      <rect x="44" y="136" width="80" height="14" rx="3" />
      <rect x="176" y="36" width="92" height="24" rx="5" />
      <path d="M186 45h68M186 52h44" />
      <rect x="200" y="72" width="96" height="24" rx="5" />
      <path d="M210 81h74M210 88h52" />
      <rect x="176" y="108" width="84" height="24" rx="5" />
      <path d="M186 117h62M186 124h40" />
      <rect x="176" y="146" width="128" height="16" rx="5" />
    </Glyph>
  )
}

export const caseWireframes: Record<string, (p: SvgProps) => ReactNode> = {
  'unmal-cms': WireCms,
  'ediglab-lims': WireLims,
  'sso-ai-odoo': WireSso,
}
