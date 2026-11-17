# My Profile — Portfolio Rahma Lindungi Laowo

Website portfolio pribadi bertema cyberpunk/terminal, dibangun dengan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**.

Repo: [LindungiLw/my-profile-portofolio](https://github.com/LindungiLw/my-profile-portofolio)

## ✨ Fitur

- **Hero interaktif** — teks dengan efek glitch, elemen *bounding box* yang bisa di-drag di desktop, serta tipografi `Dancing Script` via `next/font/google`.
- **Kabel data animasi** — jalur SVG yang melintasi section About → Projects → Experience → Contact, dengan paket data `"01"` yang mengalir saat dipicu.
- **Model 3D interaktif** — *showcase* iPhone 3D menggunakan Three.js (`@react-three/fiber` & `drei`) dengan tombol GitHub, LinkedIn, dan Explore Project yang dapat diklik, serta warna aksen yang mengikuti tema aktif.
- **Multi-tema menyeluruh** — tiga tema (`default`, `cyberpunk`, `matrix`) berbasis CSS variables & `@theme` Tailwind v4 yang konsisten dari halaman utama hingga dashboard, tersimpan di `localStorage` tanpa memblokir SSR.
- **Dwibahasa (EN/ID)** — pergantian bahasa di seluruh halaman utama, dashboard, kategori, dan detail proyek melalui dictionary terpusat di `locales/`.
- **Navigasi & aksesibilitas** — *scroll spy* otomatis berbasis `IntersectionObserver`, dukungan navigasi keyboard pada accordion & flip card, SVG bendera lokal, serta optimasi performa untuk kursor partikel (`prefers-reduced-motion` & perangkat sentuh).
- **GitHub Analytics riil** — statistik repositori, *stars*, dan kurva kumulatif kontribusi 6 bulan terakhir dari `contributionCalendar.weeks` GitHub GraphQL API (`/api/github`) dengan caching server (`revalidate: 3600`), divisualisasikan dengan Recharts.
- **Ulasan & rating** — pengunjung login dengan Google (Supabase Auth) untuk mengirim ulasan dan rating ke tabel `comments`, lengkap dengan fallback aman jika environment Supabase belum dikonfigurasi.
- **Dashboard & Case Study SSG** — halaman kategori dan detail proyek (`/projects/[slug]`) di-prerender secara statis (`generateStaticParams` & `generateMetadata`), menggunakan `next/image` dan layout khusus per kategori (Web, Mobile, UI/UX, Licenses).

## 🧰 Tech Stack

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 16.2.1 (App Router) + React 19 |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v4 (token tema via `@theme` di `app/globals.css`) |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` |
| Chart | `recharts` |
| Backend-as-a-Service | Supabase (Auth Google + tabel `comments`) |
| Data eksternal | GitHub GraphQL API |

## 📁 Struktur Proyek

```text
app/
├── page.tsx                                  # Halaman utama (Hero, About, Projects, Experience, Contact)
├── layout.tsx                                # Root layout, font optimization, metadata, Theme & Language providers
├── globals.css                               # CSS variables tema, token @theme Tailwind v4, animasi
├── api/github/route.ts                       # Route handler statistik & kalender kontribusi GitHub (GraphQL)
└── projects/
    ├── (dashboard)/
    │   ├── layout.tsx                        # Layout sidebar/navigasi workspace proyek
    │   ├── page.tsx                          # Ringkasan analitik GitHub & komposisi proyek
    │   └── category/[name]/
    │       ├── page.tsx                      # Server page kategori + generateStaticParams & metadata
    │       └── CategoryGrid.tsx              # Grid proyek/sertifikat per kategori (next/image + i18n)
    └── [slug]/
        ├── page.tsx                          # Server page case study + generateStaticParams & metadata
        ├── components/BackButton.tsx         # Tombol kembali bersama dengan dukungan i18n
        └── layouts/                          # Layout khusus: Web, Mobile, UI/UX, Licenses, Standard
components/                                   # Hero, About, Projects (3D), Experience, Contact, Navigation, Toggles
context/                                      # ThemeContext & LanguageContext (berbasis useSyncExternalStore)
data/
├── projects.ts                               # Definisi tipe Project & penggabungan seluruh kategori
└── projects_data/                            # Data proyek terpisah: ui-ux.ts, web.ts, mobile.ts, licenses.ts
locales/                                      # Dictionary terjemahan EN/ID
utils/                                        # Inisialisasi aman Supabase client
public/                                       # Aset gambar, thumbnail proyek, dan PDF lisensi
next.config.ts                                # Konfigurasi Next.js (termasuk remotePatterns avatar Google)
```

## 🚀 Menjalankan Secara Lokal

1. **Clone dan install dependency**

   ```bash
   git clone https://github.com/LindungiLw/my-profile-portofolio.git
   cd my-profile-portofolio
   npm install
   ```

2. **Siapkan environment variable** — buat file `.env.local` di root proyek:

   ```bash
   # Supabase (Settings → API di dashboard Supabase)
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...

   # GitHub analytics (token dengan scope read:user, hanya dipakai server-side)
   GITHUB_TOKEN=...
   GITHUB_USERNAME=...
   ```

   > `.env.local` sudah masuk `.gitignore` — jangan pernah di-commit. Fitur ulasan dan statistik GitHub akan menampilkan fallback aman apabila variabel lingkungan belum diisi.

3. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📝 Menambah atau Mengubah Data Proyek

- Tambah atau edit item pada file kategori yang sesuai di `data/projects_data/` (`ui-ux.ts`, `web.ts`, `mobile.ts`, `licenses.ts`).
- Pastikan setiap `slug` **unik** lintas semua file kategori, dan isi `github` / `external` dengan URL valid (atau `"#"` jika belum dipublikasikan).
- Simpan gambar/PDF aset di `public/assets/` lalu referensikan path-nya diawali `/assets/...`.

## 📜 Scripts & Pengecekan Kualitas

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan development server |
| `npm run build` | Build produksi Next.js |
| `npm run start` | Menjalankan hasil build produksi |
| `npm run lint` | Pengecekan ESLint |
| `npx tsc --noEmit` | Pengecekan tipe TypeScript |

## ☁️ Deploy

Cara termudah adalah melalui [Vercel](https://vercel.com/new): import repo, isi keempat environment variable di atas pada pengaturan project, lalu deploy.
