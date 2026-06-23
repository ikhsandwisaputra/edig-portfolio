# edig developer — Portfolio

Situs portofolio tim **edig developer**, divisi pengembang teknologi inti
Ecodigitus. Dibangun sebagai *technical reference manual* — bersih, presisi,
dan minimalis: kertas hangat, tinta, dua aksen warna, tipografi serif + mono,
serta skema garis (monoline) buatan tangan. Tanpa tema template.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4** (plugin `@tailwindcss/vite`, tema via `@theme` di CSS)
- **Bun** sebagai package manager & runner
- Font: Fraunces (display), Newsreader (body), IBM Plex Mono (label sistem)

## Menjalankan

```bash
bun install      # pasang dependency
bun dev          # mode pengembangan  → http://localhost:5173
bun run build    # type-check (tsc) + build produksi ke dist/
bun run preview  # pratinjau hasil build
bun run typecheck
```

## Struktur

```
src/
  lib/
    content.ts        # SUMBER TUNGGAL semua teks/konten (edit di sini)
    activeSection.tsx # scroll-spy: menyorot nav & status meta-rail
  hooks/
    useInView.ts      # reveal saat scroll (hormati prefers-reduced-motion)
  components/
    Header.tsx        # nav sticky + menu mobile aksesibel
    Hero.tsx          # MOD.00 — sampul
    Background.tsx     # MOD.01 — latar belakang
    Vision.tsx        # MOD.02 — visi & tujuan
    Values.tsx        # MOD.03 — nilai inti (tabel semantik)
    Services.tsx      # MOD.04 — layanan (disclosure list)
    Team.tsx          # MOD.05 — tim (panel gelap)
    Work.tsx          # MOD.06 — portofolio (laporan studi kasus)
    Footer.tsx        # MOD.07 — kontak / colophon
    Schematics.tsx    # skema garis buatan tangan (6 layanan + 3 wireframe)
    Section.tsx, Reveal.tsx, Wordmark.tsx
  index.css           # token desain (@theme), skala tipografi, util
```

## Menyunting konten

Semua teks ada di [`src/lib/content.ts`](src/lib/content.ts) — ubah di sana,
tidak perlu menyentuh komponen.

### Mengganti placeholder

- **Foto tim** — [`src/components/Team.tsx`](src/components/Team.tsx): kolom kiri
  kini menampilkan nomor rekaman + kode `REC`. Untuk menampilkan foto, ganti
  blok plate tersebut dengan `<img>` portrait (mis. 320×400) di kolom yang sama.
- **Tangkapan layar studi kasus** — [`src/components/Work.tsx`](src/components/Work.tsx):
  saat ini menampilkan *wireframe skematik* sebagai placeholder jujur. Ganti
  `<Wire .../>` dengan `<img src="..." alt="..." />` ketika screenshot asli
  tersedia (rasio 16:10). Taruh gambar di `public/`.

## Desain & aksesibilitas

- Token warna/font terpusat di `@theme` ([`src/index.css`](src/index.css)).
- Semantik nyata: `<table>` untuk nilai inti, `<button aria-expanded>` untuk
  layanan, landmark `header/main/nav/footer`, skip-link, fokus terlihat.
- Kontras warna diverifikasi AA; status tidak hanya bergantung pada warna
  (selalu disertai teks "aktif/idle" dan bentuk dot terisi/kosong).
- Semua animasi mematuhi `prefers-reduced-motion: reduce`.

## Keamanan (OWASP)

Situs ini statis (tanpa backend), namun tetap menerapkan praktik aman:

- **Tanpa `dangerouslySetInnerHTML`**, tanpa `eval`, tanpa skrip inline di
  build produksi → ramah Content-Security-Policy.
- Tautan eksternal (jika ditambahkan) gunakan `rel="noopener noreferrer"`.
- `referrer` policy ketat di `<head>`; tidak ada rahasia/kunci di sisi klien.
- **Security headers** siap pakai di [`public/_headers`](public/_headers)
  (Netlify / Cloudflare Pages): CSP, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, HSTS.

### nginx (jika tidak memakai Netlify/CF)

```nginx
add_header Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; form-action 'self'" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), camera=(), microphone=()" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

> Catatan: `style-src 'unsafe-inline'` diperlukan untuk atribut `style`
> (delay reveal) dan CSS Google Fonts. Untuk menghapusnya, pindahkan font ke
> self-host dan ganti inline style dengan kelas.

## Deploy

`bun run build` menghasilkan `dist/` (statis). Unggah ke Netlify, Cloudflare
Pages, Vercel, atau server statis apa pun. File `public/_headers` otomatis
diterapkan di Netlify/Cloudflare.

### GitHub Pages (otomatis)

Repo ini sudah berisi workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
yang otomatis build (Bun) lalu deploy ke GitHub Pages setiap kali ada push ke
`main`. Workflow juga mengaktifkan Pages sendiri (`enablement: true`).

- URL hasil: **https://ikhsandwisaputra.github.io/edig-portfolio/**
- `base` produksi di [`vite.config.ts`](vite.config.ts) disetel ke
  `/edig-portfolio/` (sesuai nama repo). Jika nama repo berubah, sesuaikan.
- Jika langkah _Setup Pages_ gagal mengaktifkan otomatis, aktifkan sekali di
  **Settings → Pages → Build and deployment → Source: GitHub Actions**.

> Catatan: GitHub Pages **tidak** mendukung custom header, jadi
> `public/_headers` tidak berefek di sana — meta `referrer` di `<head>` tetap
> berlaku. Untuk CSP/HSTS penuh, deploy ke Netlify/Cloudflare/server sendiri.
