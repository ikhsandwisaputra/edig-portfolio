// ─────────────────────────────────────────────────────────────────────────────
// Content layer — single source of truth, kept separate from presentation.
// Sumber: isi-konten.txt. Teks dipertahankan apa adanya (Bahasa Indonesia).
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  name: 'edig developer',
  parent: 'Ecodigitus',
  eyebrow: 'Divisi pengembang teknologi inti — Ecodigitus',
  // Hero — diadaptasi dari Latar Belakang & Visi agar spesifik, bukan generik.
  headline: 'Kami merancang sistem digital yang merapikan cara bisnis bekerja.',
  lead:
    'Dari ERP Odoo dan LIMS Ediglab hingga web kustom, integrasi AI, dan optimasi SEO — ' +
    'kami hadir sebagai solusi satu pintu untuk pengembangan teknologi di berbagai skala.',
  email: 'ikhsan@ecodigitus.com',
  established: '2017',
} as const

export interface NavItem {
  id: string
  label: string
}

export const nav: NavItem[] = [
  { id: 'latar', label: 'Latar Belakang' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'tim', label: 'Tim' },
  { id: 'portofolio', label: 'Portofolio' },
  { id: 'kontak', label: 'Kontak' },
]

// ── Latar Belakang ───────────────────────────────────────────────────────────
export const background = {
  body:
    'Kami adalah edig developer, divisi pengembang teknologi inti yang merupakan bagian ' +
    'integral dari Ecodigitus. Sebagai startup yang dinamis, kami memiliki fondasi keahlian ' +
    'yang kuat dalam implementasi sistem Enterprise Resource Planning (ERP) berbasis Odoo dan ' +
    'pengembangan Laboratory Information Management System (LIMS) terdepan melalui Ediglab. ' +
    'Portofolio kami meluas hingga optimasi visibilitas digital melalui strategi SEO, serta ' +
    'eksplorasi interaktif pada ekosistem kreatif seperti Roblox.',
} as const

// ── Visi & Tujuan ──────────────────────────────────────────────────────────
export const vision = {
  visi:
    'Menjadi katalisator utama dalam transformasi digital bisnis dengan menghadirkan ekosistem ' +
    'perangkat lunak yang cerdas, terstruktur, dan mudah diakses.',
  tujuan:
    'Mendorong percepatan digitalisasi operasional klien melalui pengembangan sistem terintegrasi ' +
    'dan Content Management System (CMS) yang responsif, andal, dan dirancang untuk merampingkan ' +
    'alur kerja secara efisien.',
} as const

// ── Nilai Inti / Core Values ───────────────────────────────────────────────
export interface CoreValue {
  id: string
  index: string
  titleId: string
  titleEn: string
  body: string
}

export const values: CoreValue[] = [
  {
    id: 'adaptability',
    index: '01',
    titleId: 'Adaptabilitas',
    titleEn: 'Adaptability',
    body:
      'Fleksibel dan tangkas dalam menguasai berbagai spektrum teknologi — dari struktur ERP skala ' +
      'enterprise, manajemen lab, hingga tren digital modern — untuk menjawab kebutuhan yang terus berubah.',
  },
  {
    id: 'precision',
    index: '02',
    titleId: 'Presisi & Kualitas',
    titleEn: 'Precision & Quality',
    body:
      'Berkomitmen membangun sistem berskala tinggi yang akurat dan stabil, memastikan manajemen data ' +
      'dan alur kerja klien berjalan tanpa hambatan.',
  },
  {
    id: 'user-centric',
    index: '03',
    titleId: 'Berpusat pada Pengguna',
    titleEn: 'User-Centric',
    body:
      'Mengedepankan antarmuka yang intuitif dan responsif dalam setiap CMS dan aplikasi yang dibangun, ' +
      'memastikan pengalaman digital yang mulus di berbagai perangkat.',
  },
  {
    id: 'innovation',
    index: '04',
    titleId: 'Inovasi Berkelanjutan',
    titleEn: 'Continuous Innovation',
    body:
      'Selalu mencari pendekatan baru yang lebih efektif untuk mengubah proses manual menjadi otomatisasi ' +
      'digital yang cerdas dan terukur.',
  },
]

// ── Tim ──────────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string
  index: string
  name: string
  initials: string
  role: string
  expertise: string
  bio: string
}

export const team: TeamMember[] = [
  {
    id: 'rian',
    index: '01',
    name: 'Rian Hidayat',
    initials: 'RH',
    role: 'Leader of Developer (Tech Lead)',
    expertise: 'System Analysis & Business Flow',
    bio:
      'Sebagai pemimpin tim pengembang, Rian mengarahkan visi teknis proyek. Keahlian utamanya pada ' +
      'analisis sistem dan pemetaan alur bisnis — memastikan setiap masalah operasional klien ' +
      'diterjemahkan menjadi arsitektur solusi digital yang tepat guna, efisien, dan terstruktur.',
  },
  {
    id: 'ivan',
    index: '02',
    name: 'Ivan Adi Prayoga',
    initials: 'IP',
    role: 'Odoo Developer',
    expertise: 'Odoo ERP Development & Customization',
    bio:
      'Tulang punggung pengembangan ekosistem ERP perusahaan. Dengan keahlian mendalam di platform Odoo, ' +
      'Ivan berfokus pada kustomisasi modul, integrasi sistem, dan implementasi fitur yang disesuaikan ' +
      'untuk merampingkan proses bisnis klien di berbagai sektor.',
  },
  {
    id: 'ikhsan',
    index: '03',
    name: 'Ikhsan Dwi Saputra',
    initials: 'IS',
    role: 'Full-Stack Developer',
    expertise: 'AI Integration · Front-End · Back-End · Database',
    bio:
      'Menangani siklus pengembangan perangkat lunak secara menyeluruh — dari antarmuka pengguna yang ' +
      'responsif, logika server, hingga pengelolaan basis data. Ikhsan membawa inovasi lanjut lewat ' +
      'integrasi Kecerdasan Buatan (AI) untuk menciptakan otomatisasi dan alur kerja yang lebih cerdas.',
  },
]

// ── Layanan ──────────────────────────────────────────────────────────────────
export interface Service {
  id: string
  index: string
  title: string
  body: string
  tags: string[]
}

export const services: Service[] = [
  {
    id: 'odoo',
    index: '01',
    title: 'Implementasi & Kustomisasi Odoo ERP',
    body:
      'Pengembangan sistem ERP berbasis Odoo. Kami memetakan alur bisnis ke dalam sistem, melakukan ' +
      'kustomisasi modul, dan mengintegrasikan seluruh operasional — inventaris, penjualan, SDM — ke ' +
      'dalam satu platform terpusat yang efisien.',
    tags: ['ERP', 'Odoo', 'Integrasi'],
  },
  {
    id: 'lims',
    index: '02',
    title: 'Ediglab LIMS',
    body:
      'Solusi digitalisasi khusus manajemen laboratorium. Sistem andal untuk mengelola data sampel, ' +
      'melacak proses pengujian secara real-time, dan mengotomatisasi pelaporan agar operasional lab ' +
      'lebih presisi dan terstandarisasi.',
    tags: ['LIMS', 'SaaS', 'Lab'],
  },
  {
    id: 'cms',
    index: '03',
    title: 'Website & CMS',
    body:
      'Pembuatan website profesional dan sistem manajemen konten yang responsif, aman, dan mudah ' +
      'dikelola klien. Berfokus pada digitalisasi profil bisnis dan antarmuka yang berpusat pada pengguna.',
    tags: ['Web', 'CMS', 'UX'],
  },
  {
    id: 'fullstack-ai',
    index: '04',
    title: 'Aplikasi Web Kustom & Integrasi AI',
    body:
      'Layanan full-stack menyeluruh — dari front-end, logika back-end, hingga manajemen database. ' +
      'Kami juga menghadirkan integrasi Kecerdasan Buatan (AI) untuk otomatisasi lanjut dan fitur ' +
      'analitik cerdas pada sistem Anda.',
    tags: ['Full-Stack', 'AI', 'Otomatisasi'],
  },
  {
    id: 'seo',
    index: '05',
    title: 'Optimasi SEO',
    body:
      'Strategi peningkatan visibilitas digital agar website Anda menduduki peringkat atas mesin pencari. ' +
      'Kami menerapkan optimasi teknis dan struktural untuk mendatangkan trafik organik yang relevan.',
    tags: ['SEO', 'Teknis', 'Trafik'],
  },
  {
    id: 'roblox',
    index: '06',
    title: 'Proyek Interaktif (Roblox)',
    body:
      'Eksplorasi pengembangan virtual experience di ekosistem Roblox — untuk gamifikasi, kampanye ' +
      'digital interaktif, atau pembangunan komunitas virtual yang unik.',
    tags: ['Roblox', 'Gamifikasi', 'Interaktif'],
  },
]

// ── Portofolio / Studi Kasus ───────────────────────────────────────────────
export interface Metric {
  value: string
  label: string
}

export interface CaseStudy {
  id: string
  index: string
  title: string
  client: string
  tags: string[]
  background: string
  challenge: string
  solution: string
  metrics: Metric[]
  outcome: string
  figureCaption: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'unmal-cms',
    index: '01',
    title: 'Digitalisasi Informasi Akademik',
    client: 'Universitas Malang · CMS',
    tags: ['CMS', 'Mobile-first', 'Front-End', 'Back-End'],
    background:
      'Universitas Malang membutuhkan pembaruan infrastruktur digital untuk mengelola publikasi ' +
      'informasi, berita kampus, dan data akademik. Sistem lama dirasa kurang intuitif dan menyulitkan ' +
      'pembaruan konten secara real-time.',
    challenge:
      'Membangun platform yang menangani traffic tinggi, mudah digunakan staf admin non-teknis, serta ' +
      'responsif diakses melalui perangkat mobile oleh ribuan mahasiswa.',
    solution:
      'Tim merancang CMS kustom yang berpusat pada pengguna dengan arsitektur front-end responsif ' +
      '(pendekatan mobile-first) dan back-end tangguh untuk mempermudah alur publikasi konten.',
    metrics: [{ value: '−60%', label: 'Waktu publikasi konten oleh staf' }],
    outcome:
      'Peningkatan aksesibilitas mobile menghasilkan lonjakan keterlibatan pengunjung website.',
    figureCaption: 'Gbr. 01 — Halaman utama & dashboard admin CMS',
  },
  {
    id: 'ediglab-lims',
    index: '02',
    title: 'Ediglab LIMS',
    client: 'Platform Manajemen Laboratorium · SaaS',
    tags: ['LIMS', 'SaaS', 'Paperless', 'Otomatisasi'],
    background:
      'Operasional laboratorium kerap terhambat pencatatan manual, pelacakan sampel berbasis kertas, ' +
      'dan kesulitan standarisasi pelaporan hasil uji.',
    challenge:
      'Mengubah alur kerja fisik yang kompleks ke bentuk digital tanpa mengubah standar operasional ' +
      'baku lab, sekaligus meminimalisir risiko human error.',
    solution:
      'Membangun Ediglab LIMS berbasis SaaS — ekosistem digital terintegrasi untuk pelacakan sampel ' +
      'end-to-end, manajemen inventaris lab, hingga otomatisasi pencetakan sertifikat hasil uji.',
    metrics: [
      { value: '100%', label: 'Alur pelacakan sampel terdigitalisasi (paperless)' },
      { value: '99.9%', label: 'Akurasi pelacakan data sampel' },
    ],
    outcome:
      'Waktu administrasi pelaporan hasil uji terpangkas drastis, meningkatkan produktivitas analis lab.',
    figureCaption: 'Gbr. 02 — Dashboard utama & antarmuka tracking sampel',
  },
  {
    id: 'sso-ai-odoo',
    index: '03',
    title: 'SSO Portal & AI Integration for Odoo',
    client: 'Modernisasi ERP Enterprise',
    tags: ['SSO', 'AI Agent', 'Odoo', 'Enterprise'],
    background:
      'Pengguna enterprise berskala besar menghadapi kendala efisiensi akibat banyaknya titik akses ' +
      'login untuk berbagai aplikasi perusahaan, serta lambatnya pencarian dan analisis dokumen di ERP.',
    challenge:
      'Mengintegrasikan keamanan login terpusat tanpa mengganggu database eksisting, dan memasukkan AI ' +
      'yang mampu “membaca” serta menganalisis data langsung dari dalam Odoo.',
    solution:
      'Mengimplementasikan Portal SSO (Single Sign-On) agar karyawan cukup login satu kali untuk seluruh ' +
      'ekosistem Odoo, lalu mengintegrasikan AI Agent untuk memproses dokumen dan menyajikan data lewat ' +
      'perintah bahasa natural.',
    metrics: [
      { value: '−80%', label: 'Keluhan lupa password via portal terpusat' },
      { value: 'Jam → Detik', label: 'Waktu pencarian & analisis dokumen via AI' },
    ],
    outcome:
      'Alur pengambilan keputusan bisnis menjadi lebih cepat berbasis data AI yang akurat.',
    figureCaption: 'Gbr. 03 — Portal login SSO & antarmuka analisis dokumen AI',
  },
]
