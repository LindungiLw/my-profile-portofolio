import React from "react";

interface DynamicWaveProps {
  fill?: string;
  opacity?: number;
}

export const DynamicWave: React.FC<DynamicWaveProps> = ({
  fill = "var(--color-primary)",
  opacity = 1,
}) => {
  const wavePath =
    "M-160 50 c30 0 58-40 88-40 s58 40 88 40 s58-40 88-40 s58 40 88 40 v150 h-352 Z";

  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none h-48 md:h-72"
      style={{ opacity }}
    >
      <style>{`
        @keyframes waveMove {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-wave {
          animation: waveMove infinite linear;
          will-change: transform;
        }
      `}</style>

      {/* viewBox diubah agar menampung gelombang yang lebih tinggi */}
      <svg
        viewBox="0 0 150 120"
        preserveAspectRatio="none"
        className="relative block w-[200%] h-full min-h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="tsunami-wave" d={wavePath} />
        </defs>

        {/* Layer 1 (Paling Belakang - Gelombang pertama yang tinggi) */}
        <g
          className="animate-wave"
          style={{ animationDuration: "14s", animationDelay: "-2s" }}
        >
          <use href="#tsunami-wave" x="48" y="0" fill={fill} opacity="0.2" />
        </g>

        {/* Layer 2 (Tengah - Menyusul di bawahnya) */}
        <g
          className="animate-wave"
          style={{ animationDuration: "10s", animationDelay: "-4s" }}
        >
          <use href="#tsunami-wave" x="48" y="15" fill={fill} opacity="0.4" />
        </g>

        {/* Layer 3 (Tengah - Agak Cepat) */}
        <g
          className="animate-wave"
          style={{ animationDuration: "8s", animationDelay: "-6s" }}
        >
          <use href="#tsunami-wave" x="48" y="30" fill={fill} opacity="0.7" />
        </g>

        {/* Layer 4 (Paling Depan - Gulungan Tsunami Utama, Paling Cepat) */}
        <g className="animate-wave" style={{ animationDuration: "6s" }}>
          <use href="#tsunami-wave" x="48" y="45" fill={fill} opacity="1" />
        </g>
      </svg>
    </div>
  );
};
