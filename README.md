# My Profile — Portfolio Rahma Lindungi Laowo

Website portfolio pribadi bertema cyberpunk/terminal, dibangun dengan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**.

Repo: [LindungiLw/my-profile-portofolio](https://github.com/LindungiLw/my-profile-portofolio)

## ✨ Fitur

- **Hero interaktif** — teks dengan efek glitch, elemen yang bisa di-drag (desktop), dan bounding box ala design tool.
- **Kabel data animasi** — jalur SVG yang melintasi section About → Projects → Experience → Contact, dengan paket data "01" yang mengalir saat dipicu.
- **Model 3D** — showcase proyek dengan Three.js melalui `@react-three/fiber` dan `drei`.
- **Multi-tema** — tiga tema (default, cyberpunk, matrix) berbasis CSS variable `@theme` Tailwind v4, tersimpan di `localStorage`.
- **Dwibahasa (EN/ID)** — toggle bahasa dengan dictionary terpusat di `locales/`.
- **GitHub Analytics** — statistik repo, stars, dan kontribusi via GitHub GraphQL API (route handler `/api/github`), divisualisasikan dengan Recharts.
- **Komentar & rating** — pengunjung login dengan Google (Supabase Auth) lalu meninggalkan komentar di section Contact.
- **Dashboard proyek** — daftar proyek per kategori (Web, Mobile, UI/UX, Licenses) dengan layout detail berbeda per kategori.

## 🧰 Tech Stack

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 16.2.1 (App Router) + React 19 |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v4 (token via `@theme` di `app/globals.css`) |
| 3D | three, @react-three/fiber, @react-three/drei |
| Chart | Recharts |
| Backend-as-a-Service | Supabase (Auth Google + tabel komentar) |
| Data eksternal | GitHub GraphQL API |

## 📁 Struktur Proyek

```
app/
├── page.tsx                  # Halaman utama (Hero, About, Projects, Experience, Contact)
├── layout.tsx                # Root layout + ThemeProvider & LanguageProvider
├── api/github/route.ts       # Route handler statistik GitHub (GraphQL)
└── projects/
    ├── (dashboard)/          # Dashboard proyek + halaman kategori
    │   └── category/[name]/  # Daftar proyek per kategori
    └── [slug]/               # Halaman detail proyek
        └── layouts/          # Layout per kategori: Web, Mobile, UI/UX, Licenses
components/                   # Hero, About, Projects (3D), Experience, Contact, dll.
context/                      # ThemeContext (multi-tema) & LanguageContext (EN/ID)
data/                         # Data proyek per kategori + status
locales/                      # Dictionary terjemahan EN/ID
utils/                        # Supabase client
public/                       # Aset gambar, thumbnail, dan PDF lisensi
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

   > `.env.local` sudah masuk `.gitignore` — jangan pernah di-commit.

3. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📜 Scripts

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | Pengecekan ESLint |

## ☁️ Deploy

Cara termudah adalah melalui [Vercel](https://vercel.com/new): import repo, isi keempat environment variable di atas pada pengaturan project, lalu deploy.
