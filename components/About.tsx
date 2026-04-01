// components/About.tsx

export const About = () => {
  return (
    <section
      id="about"
      className="py-24 scroll-mt-24 mx-auto max-w-5xl px-6 relative z-40"
    >
      {/* Header Section dengan angka 01 ala Pro Developer */}
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-[#E6F1FF] flex items-center">
          <span className="text-[#FF5722] font-mono text-xl md:text-2xl mr-3">
            01.
          </span>
          About Me
        </h2>
        <div className="h-[1px] bg-[#233554] flex-grow max-w-md"></div>
      </div>

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
