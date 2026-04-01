// components/About.tsx
"use client";

export const About = () => {
  return (
    <section
      id="about"
      className="py-12 md:py-20 scroll-mt-12 mx-auto max-w-5xl px-6 relative z-40"
    >
      {/* --- INJECTOR CSS LOKAL (Khusus Animasi Kabel) --- */}
      <style>{`
        @keyframes wavy-flow {
          0% { stroke-dashoffset: 350; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .animate-wavy-flow {
          animation: wavy-flow 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* ============================================== */}
      {/* HEADER, MOUSE & KABEL LOOP 360 DERAJAT       */}
      {/* ============================================== */}
      <div className="relative w-full mb-12">
        {/* 1. CONTAINER MOUSE & KABEL SVG */}
        <div className="relative w-[85%] md:w-[60%] h-[140px] md:h-[180px] ml-4 md:ml-8 z-10">
          {/* MOUSE ICON (Pojok Kanan Atas Kabel) */}
          <div className="absolute top-0 right-0 z-20 cursor-pointer group">
            <div className="w-[26px] h-[42px] border-2 border-[#8892B0]/50 rounded-full relative bg-[#0A192F] shadow-[0_0_10px_rgba(136,146,176,0.1)] group-hover:border-[#64FFDA] transition-colors">
              <div className="w-1 h-3 bg-[#64FFDA] rounded-full absolute left-1/2 -translate-x-1/2 top-2 animate-bounce drop-shadow-[0_0_5px_rgba(100,255,218,0.8)]"></div>
            </div>
          </div>

          {/* KABEL SVG LOOP 360 (Titik-Titik Konsisten) */}
          <svg
            viewBox="0 0 200 150"
            preserveAspectRatio="none"
            className="w-full h-full absolute top-[15px] md:top-[20px] left-0 pointer-events-none overflow-visible"
          >
            {/* Garis Dasar: Titik-titik Bulat Sempurna 
                Trik: strokeDasharray="0 9" + strokeLinecap="round" bikin titik seragam!
                Path: Turun -> Meliuk ke Kiri -> Muter ke Kanan Atas (Loop 360) -> Terjun ke Kiri Bawah
            */}
            <path
              d="M 200 0 C 200 70, 110 80, 110 40 C 110 10, 160 10, 160 40 C 160 80, 40 120, 6 146"
              fill="none"
              stroke="#8892B0"
              strokeWidth="1.8"
              strokeDasharray="0 9"
              strokeLinecap="round"
              opacity="0.3"
            />

            {/* Komet Energi yang Melintasi Jalur Loop */}
            <path
              d="M 200 0 C 200 70, 110 80, 110 40 C 110 10, 160 10, 160 40 C 160 80, 40 120, 6 146"
              fill="none"
              stroke="#64FFDA"
              strokeWidth="2.5"
              strokeDasharray="20 350"
              strokeLinecap="round"
              className="animate-wavy-flow drop-shadow-[0_0_8px_rgba(100,255,218,0.8)]"
            />
          </svg>
        </div>

        {/* 2. JUDUL & TITIK ORANYE (PRESISI!) */}
        <div className="flex items-center gap-4 ml-4 md:ml-8 mt-1 w-full relative z-20">
          <div className="relative">
            {/* TITIK ORANYE (Mendarat Super Presisi di atas angka 01) */}
            <div className="absolute -top-[16px] md:-top-[22px] left-[2px] md:left-[4px] w-2.5 h-2.5 bg-[#0A192F] border-2 border-[#FF5722] rounded-full animate-pulse shadow-[0_0_10px_rgba(255,87,34,0.8)] z-10"></div>

            <h2 className="text-2xl md:text-4xl font-bold text-[#E6F1FF] flex items-center">
              <span className="text-[#FF5722] font-mono text-xl md:text-2xl mr-3">
                01.
              </span>
              About Me
            </h2>
          </div>
          <div className="h-[1px] bg-[#233554] flex-grow max-w-md"></div>
        </div>
      </div>
      {/* ============================================== */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* SISI KIRI: Narasi Biografi */}
        <div className="md:col-span-7 text-[#8892B0] text-lg leading-relaxed space-y-6">
          <p>
            Halo! Saya <span className="text-[#64FFDA]">Rahma</span>, seorang
            mahasiswa
            <span className="text-[#E6F1FF] font-semibold">
              {" "}
              Information Systems
            </span>{" "}
            yang memiliki obsesi menyatukan presisi logika koding dengan
            kebebasan desain visual.
          </p>
          <p>
            Perjalanan saya dimulai ketika saya menyadari bahwa sebuah aplikasi
            bukan hanya soal fungsi, tapi soal bagaimana pengguna "merasakan"
            antarmuka tersebut. Sejak itu, saya mendalami ekosistem
            <span className="text-[#64FFDA]">React & Next.js</span> untuk
            membangun pengalaman web yang estetik.
          </p>
          <p>
            Saat ini, saya fokus pada pengembangan aplikasi lintas platform
            menggunakan
            <span className="text-[#64FFDA]">Flutter</span> dan memperkuat
            arsitektur sistem yang efisien. Saya percaya bahwa kode yang bagus
            harus terlihat seindah tampilannya.
          </p>

          {/* List Skill Singkat */}
          <ul className="grid grid-cols-2 gap-2 font-mono text-sm text-[#64FFDA] pt-4">
            <li className="flex items-center gap-2">
              <span className="text-xs">▹</span> Next.js
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xs">▹</span> TypeScript
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xs">▹</span> Flutter / Dart
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xs">▹</span> Tailwind CSS
            </li>
          </ul>
        </div>

        {/* SISI KANAN: Visual "Properties Panel" */}
        <div className="md:col-span-5 relative group mt-8 md:mt-0">
          {/* Frame Dekoratif di belakang panel */}
          <div className="absolute top-4 left-4 w-full h-full border-2 border-[#64FFDA] rounded-lg z-0 group-hover:top-6 group-hover:left-6 transition-all duration-300"></div>

          <div className="relative z-10 bg-[#112240] border border-[#233554] rounded-lg p-6 shadow-2xl transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 duration-300">
            {/* Header Panel ala Figma */}
            <div className="flex items-center justify-between mb-6 border-b border-[#233554] pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8892B0]">
                Object Properties
              </span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-2 h-2 rounded-full bg-[#27C93F]"></div>
              </div>
            </div>

            {/* Baris Informasi */}
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-[#8892B0]">Name:</span>
                <span className="text-[#64FFDA]">"Rahma L. Laowo"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8892B0]">Major:</span>
                <span className="text-[#E6F1FF]">"Information Systems"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8892B0]">Focus:</span>
                <span className="text-[#E6F1FF]">"Frontend & Mobile"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8892B0]">Loc:</span>
                <span className="text-[#E6F1FF]">"Indonesia"</span>
              </div>

              {/* Progress Bars */}
              <div className="pt-4 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase text-[#8892B0]">
                    <span>Creativity</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full h-1 bg-[#233554] rounded-full overflow-hidden">
                    <div className="w-[95%] h-full bg-[#FF5722]"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase text-[#8892B0]">
                    <span>Logic</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full h-1 bg-[#233554] rounded-full overflow-hidden">
                    <div className="w-[90%] h-full bg-[#64FFDA]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
