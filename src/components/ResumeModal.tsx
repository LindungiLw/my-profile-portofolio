import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

// ==============================================================================
// --- DATA RESUME HUB (Hanya 2 Kategori: CV & Portofolio) ---
// ==============================================================================

type ResumeFile = {
  label: string;
  type: "ATS" | "Creative" | "Portfolio";
  url: string;
};

type ResumeData = Record<string, { name: string; files: ResumeFile[] }>;

export const resumeHubData: ResumeData = {
  // --- KATEGORI 1: CURRICULUM VITAE (Berisi gabungan semua CV) ---
  cv: {
    name: "Curriculum Vitae",
    files: [
      { label: "UI/UX Designer (ATS)", type: "ATS", url: "#LINK_CV_ATS_1" },
      { label: "Graphic Designer (ATS)", type: "ATS", url: "#LINK_CV_ATS_2" },
      {
        label: "IT & Admin Generalist (ATS)",
        type: "ATS",
        url: "#LINK_CV_ATS_3",
      },
      {
        label: "UI/UX Visual (Canva)",
        type: "Creative",
        url: "#LINK_CV_CANVA_1",
      },
      {
        label: "Graphic Art Creative (Canva)",
        type: "Creative",
        url: "#LINK_CV_CANVA_2",
      },
      // Silakan tambah/kurangi daftar CV di atas sesuai kebutuhanmu
    ],
  },
  // --- KATEGORI 2: PORTFOLIO (Hanya 1 File PDF) ---
  portfolio: {
    name: "Portfolio",
    files: [
      {
        label: "Complete Portfolio 2026 (PDF)",
        type: "Portfolio",
        url: "#LINK_PORTFOLIO",
      },
    ],
  },
};

const categoryKeys = Object.keys(resumeHubData);

// ==============================================================================
// --- KOMPONEN MODAL ---
// ==============================================================================

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [activeTab, setActiveTab] = useState(categoryKeys[0]);

  // UX: Menutup modal dengan tombol Escape & mematikan scroll layar belakang
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 [z-100] flex items-center justify-center p-4 md:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background Overlay */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel Konten Modal (Warna Navy Pekat) */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] h-[600px] bg-[#0a1120] border-2 border-secondary/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header Modal */}
            <div className="p-6 md:p-8 border-b border-secondary/20 flex items-center justify-between bg-primary/20 relative z-10 shrink-0">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Resume & Portfolio Hub
                </h2>
                <p className="text-foreground/70 text-sm mt-1">
                  Download my latest curriculum vitae or portfolio below.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-foreground/5 hover:bg-cyan-500/20 rounded-full text-foreground/50 hover:text-cyan-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body Modal (Split: Tabs Kiri, Konten Kanan) */}
            <div className="grow flex flex-col md:flex-row overflow-hidden relative z-0">
              {/* PANEL KIRI: Navigasi Tabs (Hanya 2 Menu) */}
              <div className="w-full md:w-64 p-4 md:p-6 border-b md:border-b-0 md:border-r border-secondary/10 bg-primary/10 overflow-y-auto shrink-0">
                <div className="flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                  {categoryKeys.map((key) => {
                    const category = resumeHubData[key];
                    const isActive = activeTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-3 p-4 rounded-xl text-left whitespace-nowrap transition-all duration-300 w-full group border border-transparent ${
                          isActive
                            ? "bg-cyan-500 text-background shadow-lg"
                            : "text-foreground hover:bg-cyan-500/10 hover:border-cyan-500/20"
                        }`}
                      >
                        <span className="font-semibold text-sm md:text-base">
                          {category.name}
                        </span>
                        <span
                          className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-background/20 text-background"
                              : "bg-cyan-500/10 text-cyan-400"
                          }`}
                        >
                          {category.files.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PANEL KANAN: Daftar File */}
              <div className="grow p-4 md:p-8 overflow-y-auto bg-background/30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5"
                  >
                    {resumeHubData[activeTab].files.map((file, index) => (
                      <motion.a
                        key={file.label}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-2.5 p-5 bg-[#0e172a] border border-secondary/20 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group shadow-sm hover:shadow-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span className="block font-semibold text-foreground group-hover:text-cyan-400 text-base md:text-lg transition-colors truncate">
                          {file.label}
                        </span>
                        {/* Badge Berwarna Cerah (ATS/Canva/Portfolio) */}
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block w-fit ${
                            file.type === "ATS"
                              ? "bg-cyan-500/20 text-cyan-300" // Badge ATS: Cyan
                              : file.type === "Creative"
                                ? "bg-purple-500/20 text-purple-300" // Badge Canva: Ungu
                                : "bg-green-500/20 text-green-300" // Badge Portfolio: Hijau
                          }`}
                        >
                          {file.type === "ATS"
                            ? "ATS-Friendly PDF"
                            : file.type === "Creative"
                              ? "Canva Creative Design"
                              : "Portfolio Case Study"}
                        </span>
                      </motion.a>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Garis Kilap Dekorasi di Modal */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[linear-gradient(to_right,var(--color-secondary),var(--color-primary))] from-transparent via-cyan-500 to-transparent opacity-50 z-20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
