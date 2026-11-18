# Portfolio — Rahma Lindungi Laowo

Aplikasi web portfolio pribadi yang dibangun menggunakan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**. Situs ini menggabungkan halaman profil interaktif berbasis 3D, sistem multi-tema, dukungan dwibahasa (EN/ID), dashboard analitik GitHub, serta halaman studi kasus proyek yang di-prerender secara statis.

Repository: [github.com/LindungiLw/my-profile-portofolio](https://github.com/LindungiLw/my-profile-portofolio)

---

## Ringkasan Arsitektur & Fitur

### Halaman Utama & Interaksi
- **Hero Interaktif**: Tipografi berlapis dengan efek *glitch scramble* saat di-hover/klik dan komponen *bounding box* yang dapat digeser (*drag*) pada layar desktop.
- **Aliran Data SVG Global**: Jalur kabel SVG yang menghubungkan section About, Projects, Experience, dan Contact dengan animasi paket biner `"01"` ketika tombol pemicu pada section About ditekan.
- **Showcase iPhone 3D**: Model 3D interaktif menggunakan `three`, `@react-three/fiber`, dan `@react-three/drei` dengan tombol GitHub, LinkedIn, serta tautan menuju dashboard proyek yang aktif diklik dan mengikuti aksen tema.
- **Navigasi & Kursor Partikel**: *Scroll spy* otomatis menggunakan `IntersectionObserver`, menu responsif dengan atribut ARIA, navigasi keyboard untuk accordion dan kartu profil 3D, serta kanvas partikel biner yang otomatis nonaktif pada perangkat sentuh dan `prefers-reduced-motion`.

### Multi-Tema & Lokalisasi
- **Tiga Tema Terpadu**: `default` (Navy Teal), `cyberpunk`, dan `matrix` yang didefinisikan melalui CSS variables dan token `@theme` Tailwind CSS v4 di `app/globals.css`. Preferensi tema tersimpan di `localStorage` dan diinisialisasi sebelum hydration melalui `ThemeContext` (`useSyncExternalStore`) tanpa memblokir Server-Side Rendering.
- **Dwibahasa (EN / ID)**: Pengaturan bahasa terpusat di `locales/dictionary.ts` dan dikelola lewat `LanguageContext` untuk seluruh halaman utama, dashboard, daftar kategori, dan halaman detail proyek.

### Dashboard, Studi Kasus & Integrasi Data
- **GitHub Analytics**: Route handler `/api/github` mengambil jumlah repositori, *stars*, dan data kontribusi riil 6 bulan terakhir dari `contributionCalendar.weeks` GitHub GraphQL API dengan caching server (`revalidate: 3600`), lalu divisualisasikan menggunakan Recharts.
- **Ulasan Pengunjung**: Integrasi Google OAuth dan tabel `comments` melalui Supabase (`utils/supabase.ts`), lengkap dengan umpan balik status inline serta *graceful fallback* apabila variabel lingkungan Supabase belum dikonfigurasi.
- **Static Site Generation (SSG)**: Halaman kategori (`/projects/category/[name]`) dan detail proyek (`/projects/[slug]`) menggunakan `generateStaticParams` dan `generateMetadata`, optimasi gambar melalui `next/image`, serta tata letak terpisah per kategori (UI/UX, Web, Mobile, dan Licenses).

---

## Tech Stack

| Kategori | Teknologi | Versi / Keterangan |
| --- | --- | --- |
| Framework | Next.js (App Router) | `16.2.1` |
| UI Library | React & React DOM | `19.2.4` |
| Bahasa | TypeScript | `^5` (strict mode) |
| Styling | Tailwind CSS | `^4` (`@tailwindcss/postcss`) |
| Grafis 3D | Three.js, `@react-three/fiber`, `@react-three/drei` | `^0.183.2`, `^9.5.0`, `^10.7.7` |
| Visualisasi Data | Recharts | `^3.8.1` |
| Auth & Database | Supabase (`@supabase/supabase-js`) | `^2.101.1` |
| Data Eksternal | GitHub GraphQL API | Server-side Route Handler |

---

## Peta Rute Aplikasi

| Rute | Tipe | Deskripsi |
| --- | --- | --- |
| `/` | Static | Halaman utama (Hero, About, Projects 3D, Experience, Contact) |
| `/projects` | Static | Dashboard ringkasan proyek dan analitik GitHub |
| `/projects/category/[name]` | SSG | Katalog proyek per kategori (`ui-ux`, `web`, `mobile`, `licenses`) |
| `/projects/[slug]` | SSG | Halaman detail / studi kasus proyek dengan layout sesuai kategori |
| `/api/github` | Dynamic API | Endpoint statistik repositori dan kontribusi 6 bulan terakhir dari GitHub |

---

## Struktur Direktori

```text
app/
├── page.tsx                                  # Halaman utama & jalur kabel SVG global
├── layout.tsx                                # Root layout, next/font (Geist, Geist Mono, Dancing Script), metadata
├── globals.css                               # Definisi tema CSS variables, token @theme, dan animasi
├── api/github/route.ts                       # Route handler GitHub GraphQL API
└── projects/
    ├── (dashboard)/
    │   ├── layout.tsx                        # Navigasi sidebar (desktop) & tab horizontal (mobile)
    │   ├── page.tsx                          # Overview analitik GitHub & komposisi proyek
    │   └── category/[name]/
    │       ├── page.tsx                      # Server Component kategori (generateStaticParams & metadata)
    │       └── CategoryGrid.tsx              # Grid kartu proyek/lisensi dengan next/image & terjemahan
    └── [slug]/
        ├── page.tsx                          # Server Component detail proyek (SSG)
        ├── components/BackButton.tsx         # Komponen navigasi kembali bersama
        └── layouts/                          # UiUxLayout, WebLayout, MobileLayout, LicensesLayout, StandardLayout
components/                                   # Komponen UI (Hero, About, Projects, Experience, Contact, Navigation, Toggles)
context/                                      # ThemeContext & LanguageContext berbasis useSyncExternalStore
data/
├── projects.ts                               # Interface Project, ProjectCategory, dan agregasi seluruh proyek
└── projects_data/                            # Data terpisah per kategori (ui-ux.ts, web.ts, mobile.ts, licenses.ts)
locales/
└── dictionary.ts                             # Kamus terjemahan EN & ID
utils/
└── supabase.ts                               # Inisialisasi aman client Supabase
public/                                       # Aset gambar profil, thumbnail proyek, dan PDF sertifikat
next.config.ts                                # Konfigurasi Next.js (remotePatterns avatar Google)
```

---

## Menjalankan Secara Lokal

### 1. Prasyarat
- Node.js versi 20 atau lebih baru
- npm (bawaan Node.js)

### 2. Instalasi
```bash
git clone https://github.com/LindungiLw/my-profile-portofolio.git
cd my-profile-portofolio
npm install
```

### 3. Konfigurasi Environment Variable
Buat file `.env.local` pada root proyek dan isi variabel berikut:

| Variabel | Sifat | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Publik (Client) | URL proyek Supabase (Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publik (Client) | Anonymous key Supabase (Settings → API) |
| `GITHUB_TOKEN` | Rahasia (Server-only) | Personal Access Token GitHub dengan scope `read:user` |
| `GITHUB_USERNAME` | Rahasia (Server-only) | Username GitHub yang statistiknya akan ditampilkan |

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GITHUB_TOKEN=ghp_your_token
GITHUB_USERNAME=LindungiLw
```

> File `.env.local` sudah dikecualikan di `.gitignore`. Jika variabel di atas belum tersedia saat pengembangan lokal, aplikasi tetap dapat dijalankan dan akan menampilkan pesan fallback yang aman pada bagian ulasan maupun analitik GitHub.

### 4. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser.

---

## Pengelolaan Konten Proyek

1. Tambahkan atau ubah entri pada file kategori yang sesuai di `data/projects_data/` (`ui-ux.ts`, `web.ts`, `mobile.ts`, atau `licenses.ts`).
2. Pastikan nilai `slug` bersifat unik di seluruh file kategori karena digunakan sebagai parameter statis `/projects/[slug]`.
3. Simpan aset gambar atau PDF di `public/assets/`, lalu referensikan menggunakan path relatif dari root publik (misalnya `/assets/nama-file.png`).
4. Gunakan `"#"` untuk field `github` atau `external` apabila tautan repositori maupun situs live belum tersedia.

---

## Perintah & Pengecekan Kualitas

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan lokal |
| `npm run build` | Membangun bundle produksi Next.js dan halaman SSG |
| `npm run start` | Menjalankan hasil build produksi |
| `npm run lint` | Menjalankan pemeriksaan ESLint |
| `npx tsc --noEmit` | Memeriksa validitas tipe TypeScript tanpa menghasilkan file output |

---

## Deployment

Proyek ini siap di-deploy melalui [Vercel](https://vercel.com/new):
1. Import repository GitHub ke dashboard Vercel.
2. Tambahkan keempat environment variable (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GITHUB_TOKEN`, `GITHUB_USERNAME`) pada menu **Settings → Environment Variables**.
3. Pastikan URL callback autentikasi Google di dashboard Supabase sudah mencakup domain produksi Vercel.
4. Jalankan proses deploy.
