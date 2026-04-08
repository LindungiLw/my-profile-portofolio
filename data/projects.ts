// data/projects.ts

export const projects = [
  {
    slug: "ecommerce-redesign",
    overline: "Featured Project",
    title: "E-Commerce Web Platform",
    category: "Web",
    // 👇 Tambahkan properti image ini
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop",
    shortDescription:
      "Platform belanja online responsif dengan integrasi payment gateway.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/LindungiLw",
    external: "#",
    longDescription:
      "Proyek ini berfokus pada pengalaman pengguna saat checkout yang mulus di berbagai perangkat.",
    challenges:
      "Mengoptimalkan gambar produk agar website tetap memuat di bawah 2 detik.",
    solutions:
      "Implementasi Image Optimization bawaan Next.js dan teknik Lazy Loading.",
  },
  {
    slug: "taskflow-mobile",
    overline: "Mobile Application",
    title: "TaskFlow Mobile",
    category: "Mobile",
    image:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=800&auto=format&fit=crop",
    shortDescription:
      "Aplikasi manajemen tugas lintas platform untuk produktivitas harian.",
    techStack: ["Flutter", "Dart", "Firebase"],
    github: "https://github.com/LindungiLw",
    external: "#",
    longDescription:
      "Aplikasi mobile ringan untuk mengatur jadwal, pengingat, dan kolaborasi tugas antar mahasiswa.",
    challenges:
      "Sinkronisasi data offline ke online secara real-time tanpa delay.",
    solutions:
      "Menggunakan kemampuan local persistence dari Firebase Firestore.",
  },
  {
    slug: "fintech-app-design",
    overline: "Design Concept",
    title: "Fintech Wallet App Design",
    category: "UI/UX",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    shortDescription:
      "Eksplorasi antarmuka untuk aplikasi dompet digital dengan gaya modern minimalis.",
    techStack: ["Figma", "FigJam", "Prototyping"],
    github: "https://github.com/LindungiLw",
    external: "https://dribbble.com",
    longDescription:
      "Desain aplikasi keuangan yang menyederhanakan grafik investasi yang rumit.",
    challenges:
      "Menampilkan banyak angka dan data tanpa membuat layar terlihat penuh dan membingungkan.",
    solutions:
      "Penggunaan whitespace yang berani dan hierarki tipografi yang jelas.",
  },
  {
    slug: "aws-cloud-practitioner",
    overline: "Certification",
    title: "AWS Cloud Practitioner",
    category: "Licenses",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    shortDescription:
      "Sertifikasi resmi dari Amazon Web Services untuk pemahaman dasar arsitektur Cloud.",
    techStack: ["AWS", "Cloud Computing", "Security"],
    github: "#",
    external: "https://aws.amazon.com",
    longDescription:
      "Sertifikasi ini memvalidasi pemahaman teknis mengenai infrastruktur cloud AWS.",
    challenges:
      "Memahami ratusan layanan AWS dan use-case spesifiknya dalam waktu singkat.",
    solutions:
      "Membuat mind-map arsitektur dan banyak latihan hands-on di AWS Console.",
  },
];
