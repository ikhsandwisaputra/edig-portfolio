// Dev-only visual QA: capture the site at a few viewports/states.
// Usage: node scripts/qa-screens.mjs  (dev server must be running on :5173)
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const url = process.env.QA_URL ?? 'http://localhost:5173/'
const out = './.qa'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()

async function withPage(contextOpts, fn) {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', ...contextOpts })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'load', timeout: 30000 })
  await page.waitForTimeout(1400)
  await fn(page)
  await ctx.close()
}

async function el(page, selector, name) {
  const loc = page.locator(selector).first()
  await loc.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  await loc.screenshot({ path: `${out}/${name}.png` })
  console.log('saved', name)
}

// ── Desktop section detail ─────────────────────────────────────────────
await withPage({ viewport: { width: 1280, height: 900 } }, async (page) => {
  await el(page, '#hero', 'd-hero')
  await el(page, '#latar', 'd-latar')
  await el(page, '#visi', 'd-visi')
  await el(page, '#nilai', 'd-nilai')
  // expand two service rows before shooting
  const btns = await page.locator('#layanan button').all()
  if (btns[0]) await btns[0].click()
  if (btns[3]) await btns[3].click()
  await page.waitForTimeout(450)
  await el(page, '#layanan', 'd-layanan')
  await el(page, '#tim', 'd-tim')
  await el(page, '#portofolio article >> nth=0', 'd-case1')
  await el(page, '#kontak', 'd-kontak')
})

// ── Mobile detail ──────────────────────────────────────────────────────
await withPage({ viewport: { width: 390, height: 800 }, isMobile: true }, async (page) => {
  await el(page, '#hero', 'm-hero')
  await el(page, '#layanan', 'm-layanan')
  await el(page, '#tim', 'm-tim')
})

await browser.close()
console.log('done')
