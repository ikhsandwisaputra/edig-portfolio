import { ReactLenis } from 'lenis/react'
import { ActiveSectionProvider } from './lib/activeSection'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Background } from './components/Background'
import { Vision } from './components/Vision'
import { Values } from './components/Values'
import { Services } from './components/Services'
import { Team } from './components/Team'
import { Work } from './components/Work'
import { Footer } from './components/Footer'

// Stable reference so the scroll-spy observer isn't rebuilt every render.
const SECTION_IDS = [
  'hero',
  'latar',
  'visi',
  'nilai',
  'layanan',
  'tim',
  'portofolio',
  'kontak',
] as const

export default function App() {
  return (
    <ReactLenis root>
      <ActiveSectionProvider ids={SECTION_IDS}>
        <a
          href="#main"
          className="t-kicker sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Lewati ke konten
        </a>

        <Header />

        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Hero />
          <Background />
          <Vision />
          <Values />
          <Services />
          <Team />
          <Work />
        </main>

        <Footer />
      </ActiveSectionProvider>
    </ReactLenis>
  )
}
