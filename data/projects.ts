export const projects = [
  {
    slug: "ecommerce-redesign",
    overline: "Featured Project",
    title: "E-Commerce Web Redesign",
    category: "UI/UX",
    shortDescription:
      "Sebuah perancangan ulang antarmuka (UI/UX) dan pengembangan frontend untuk platform e-commerce fiktif. Fokus utama pada peningkatan konversi.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    github: "https://github.com/LindungiLw",
    external: "#",
    longDescription:
      "Proyek ini bertujuan untuk meningkatkan konversi penjualan dengan menyederhanakan alur checkout. Saya melakukan riset pengguna selama 2 minggu sebelum mulai mendesain di Figma, lalu mengeksekusinya menjadi kode interaktif dengan Next.js.",
    challenges:
      "Tantangan terbesar adalah membuat keranjang belanja yang state-nya tersinkronisasi di seluruh komponen secara real-time tanpa menurunkan performa website (re-rendering berlebih).",
    solutions:
      "Saya menggunakan Zustand untuk state management ringan dan mengimplementasikan LocalStorage agar data keranjang tidak hilang saat pengguna me-refresh halaman.",
  },
  {
    slug: "taskflow-mobile",
    overline: "Mobile Application",
    title: "TaskFlow Mobile",
    category: "Mobile",
    shortDescription:
      "Aplikasi manajemen tugas lintas platform yang dibangun menggunakan Flutter. Memiliki fitur sinkronisasi cloud real-time dan dark mode.",
    techStack: ["Flutter", "Dart", "Firebase", "Provider"],
    github: "https://github.com/LindungiLw",
    external: "#",
    longDescription:
      "TaskFlow adalah solusi untuk mahasiswa dan profesional yang kewalahan mengatur jadwal kuliah dan tugas harian. Aplikasi ini tidak hanya mencatat tugas, tapi juga memberikan pengingat cerdas berdasarkan lokasi dan waktu.",
    challenges:
      "Mengatur notifikasi lokal agar berjalan akurat di latar belakang (background) sangat menantang, karena Android dan iOS memiliki aturan pembatasan baterai yang berbeda-beda.",
    solutions:
      "Saya menggunakan package flutter_local_notifications yang dikombinasikan dengan workmanager untuk membuat service terpisah yang secara handal menangani logika background task di kedua OS.",
  },
];
