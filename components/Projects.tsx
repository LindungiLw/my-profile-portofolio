// components/Projects.tsx
"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Text,
  RoundedBox,
  Float,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

// ==============================================================
// UTILITY: Rounded Rectangle Shape
// ==============================================================
const createRoundedRect = (w: number, h: number, r: number) => {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return shape;
};

// ==============================================================
// 🔴 PERBAIKAN BUG LAYAR HITAM: CONSTANTS Z POSITIONS
// Ketebalan bodi total = depth(0.10) + bevelDepan(0.025) + bevelBelakang(0.025) = 0.15
// Kaca depan = +0.075 | Kaca belakang = -0.075
// ==============================================================
const Z_FRONT = 0.076; // Digeser sedikit ke depan agar tidak tenggelam di kaca
const Z_BACK = -0.076; // Digeser sedikit ke belakang agar kamera & logo muncul

// ==============================================================
// TOMBOL SAMPING (rata dengan bingkai, tidak menonjol)
// ==============================================================
const SideButtons = () => (
  <group>
    {/* Volume Up */}
    <RoundedBox
      args={[0.032, 0.32, 0.07]}
      radius={0.012}
      smoothness={4}
      position={[-1.555, 1.0, 0]}
    >
      <meshStandardMaterial color="#1a1a1c" roughness={0.2} metalness={0.95} />
    </RoundedBox>
    {/* Volume Down */}
    <RoundedBox
      args={[0.032, 0.32, 0.07]}
      radius={0.012}
      smoothness={4}
      position={[-1.555, 0.38, 0]}
    >
      <meshStandardMaterial color="#1a1a1c" roughness={0.2} metalness={0.95} />
    </RoundedBox>
    {/* Mute/Action */}
    <RoundedBox
      args={[0.032, 0.2, 0.07]}
      radius={0.012}
      smoothness={4}
      position={[-1.555, 1.68, 0]}
    >
      <meshStandardMaterial color="#1a1a1c" roughness={0.2} metalness={0.95} />
    </RoundedBox>
    {/* Power */}
    <RoundedBox
      args={[0.032, 0.46, 0.07]}
      radius={0.012}
      smoothness={4}
      position={[1.555, 0.8, 0]}
    >
      <meshStandardMaterial color="#1a1a1c" roughness={0.2} metalness={0.95} />
    </RoundedBox>
  </group>
);

// ==============================================================
// KAMERA BELAKANG — 100% FLUSH, tidak ada tonjolan
// ==============================================================
const CameraBack = () => {
  const housingShape = useMemo(() => createRoundedRect(1.32, 1.32, 0.28), []);

  return (
    <group position={[-0.65, 2.05, Z_BACK]}>
      <mesh position={[0, 0, -0.001]}>
        <shapeGeometry args={[housingShape]} />
        <meshStandardMaterial
          color="#101013"
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>

      {(
        [
          [-0.28, 0.28, 0.27],
          [0.28, 0.28, 0.23],
          [-0.28, -0.28, 0.23],
        ] as [number, number, number][]
      ).map(([x, y, r], i) => (
        <group key={i} position={[x, y, 0]}>
          <mesh position={[0, 0, -0.002]}>
            <ringGeometry args={[r - 0.02, r + 0.025, 64]} />
            <meshStandardMaterial
              color="#252528"
              roughness={0.05}
              metalness={1}
              envMapIntensity={2}
            />
          </mesh>
          <mesh position={[0, 0, -0.001]}>
            <circleGeometry args={[r - 0.02, 64]} />
            <meshStandardMaterial
              color="#04040a"
              roughness={0.02}
              metalness={0.6}
              envMapIntensity={3}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[r * 0.55, r * 0.72, 64]} />
            <meshStandardMaterial
              color="#1a1a22"
              roughness={0.05}
              metalness={1}
            />
          </mesh>
          <mesh position={[-r * 0.22, r * 0.22, 0.001]}>
            <circleGeometry args={[r * 0.16, 32]} />
            <meshStandardMaterial
              color="#5577ff"
              roughness={0}
              metalness={1}
              opacity={0.22}
              transparent
            />
          </mesh>
        </group>
      ))}

      {/* Flash */}
      <group position={[0.28, -0.28, 0]}>
        <mesh>
          <ringGeometry args={[0.07, 0.1, 32]} />
          <meshStandardMaterial
            color="#222222"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <circleGeometry args={[0.07, 32]} />
          <meshStandardMaterial
            color="#ffe4a0"
            roughness={0.3}
            metalness={0.2}
            emissive="#3a2600"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Microphone dot */}
      <mesh position={[0, -0.28, 0]}>
        <circleGeometry args={[0.038, 16]} />
        <meshStandardMaterial color="#080808" roughness={0.8} metalness={0.1} />
      </mesh>
    </group>
  );
};

// ==============================================================
// APPLE LOGO — Presisi tinggi, flat di kaca belakang
// ==============================================================
const AppleLogo = () => {
  const { appleShape, leafShape } = useMemo(() => {
    const s = new THREE.Shape();
    const r = 0.38;

    s.moveTo(0, r * 0.8);
    s.bezierCurveTo(r * 0.7, r * 0.8, r, r * 0.4, r, 0);
    s.bezierCurveTo(r, -r * 0.55, r * 0.55, -r * 0.9, r * 0.12, -r * 0.9);
    s.bezierCurveTo(0, -r * 0.9, 0, -r * 0.75, 0, -r * 0.75);
    s.bezierCurveTo(0, -r * 0.75, 0, -r * 0.9, -r * 0.12, -r * 0.9);
    s.bezierCurveTo(-r * 0.55, -r * 0.9, -r, -r * 0.55, -r, 0);
    s.bezierCurveTo(-r, r * 0.4, -r * 0.7, r * 0.8, 0, r * 0.8);

    const bite = new THREE.Path();
    bite.absarc(r * 0.62, r * 0.2, r * 0.32, 0, Math.PI * 2, false);
    s.holes.push(bite);

    const leaf = new THREE.Shape();
    leaf.moveTo(0, r * 0.85);
    leaf.bezierCurveTo(
      r * 0.35,
      r * 0.85,
      r * 0.4,
      r * 1.38,
      r * 0.12,
      r * 1.38,
    );
    leaf.bezierCurveTo(-r * 0.12, r * 1.38, -r * 0.12, r * 0.85, 0, r * 0.85);

    return { appleShape: s, leafShape: leaf };
  }, []);

  return (
    <group position={[0.18, -0.3, Z_BACK - 0.001]} scale={0.58}>
      <mesh>
        <shapeGeometry args={[appleShape]} />
        <meshStandardMaterial
          color="#888888"
          roughness={0.08}
          metalness={0.9}
          opacity={0.22}
          transparent
          envMapIntensity={2}
        />
      </mesh>
      <mesh>
        <shapeGeometry args={[leafShape]} />
        <meshStandardMaterial
          color="#888888"
          roughness={0.08}
          metalness={0.9}
          opacity={0.22}
          transparent
          envMapIntensity={2}
        />
      </mesh>
    </group>
  );
};

// ==============================================================
// DYNAMIC ISLAND
// ==============================================================
const DynamicIsland = () => {
  const islandShape = useMemo(() => createRoundedRect(0.72, 0.2, 0.1), []);
  return (
    <mesh position={[0, 2.64, Z_FRONT + 0.001]}>
      <shapeGeometry args={[islandShape]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
};

// ==============================================================
// LAYAR UI — Sekarang Berada di Atas Permukaan (Tidak Tenggelam!)
// ==============================================================
const PhoneScreen = () => {
  const router = useRouter(); // Pastikan useRouter di-import dari next/navigation
  const [btnHovered, setBtnHovered] = useState(false);

  const screenShape = useMemo(() => createRoundedRect(2.94, 6.04, 0.42), []);

  return (
    <group position={[0, 0, Z_FRONT]}>
      {/* Background screen */}
      <mesh>
        <shapeGeometry args={[screenShape]} />
        <meshBasicMaterial color="#050a18" />
      </mesh>

      {/* Header area */}
      <mesh position={[0, 2.22, 0.001]}>
        <planeGeometry args={[2.94, 1.35]} />
        <meshBasicMaterial color="#081328" transparent opacity={0.95} />
      </mesh>

      {/* Status bar */}
      <Text
        position={[-0.92, 2.62, 0.002]}
        fontSize={0.185}
        color="#ffffff"
        anchorX="left"
        fontWeight={700}
      >
        9:41
      </Text>
      <Text
        position={[1.0, 2.62, 0.002]}
        fontSize={0.13}
        color="#aaaaaa"
        anchorX="right"
      >
        ▮▮▮ ●
      </Text>

      <DynamicIsland />

      {/* ===== HERO CARD ===== */}
      <mesh position={[0, 0.88, 0.001]}>
        <planeGeometry args={[2.5, 3.08]} />
        <meshBasicMaterial color="#0b1d3e" transparent opacity={0.98} />
      </mesh>
      <mesh position={[0, 2.43, 0.002]}>
        <planeGeometry args={[2.5, 0.018]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Avatar */}
      <mesh position={[0, 1.76, 0.002]}>
        <circleGeometry args={[0.5, 64]} />
        <meshBasicMaterial color="#0d2550" />
      </mesh>
      <mesh position={[0, 1.76, 0.003]}>
        <ringGeometry args={[0.5, 0.545, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
      </mesh>
      <Text
        position={[0, 1.76, 0.004]}
        fontSize={0.3}
        color="#38bdf8"
        fontWeight={800}
      >
        RL
      </Text>

      {/* Teks */}
      <Text
        position={[0, 1.09, 0.002]}
        fontSize={0.215}
        color="#f0f9ff"
        anchorX="center"
        fontWeight={700}
      >
        Tryotel App
      </Text>
      <Text
        position={[0, 0.78, 0.002]}
        fontSize={0.105}
        color="#475569"
        anchorX="center"
        letterSpacing={0.06}
      >
        MOBILE UI/UX DESIGN
      </Text>
      <mesh position={[0, 0.58, 0.002]}>
        <planeGeometry args={[2.1, 0.01]} />
        <meshBasicMaterial color="#1a3260" />
      </mesh>

      {/* Stats */}
      {(
        [
          [-0.78, "48", "Screens"],
          [0, "4.9★", "Rating"],
          [0.78, "2K+", "Users"],
        ] as [number, string, string][]
      ).map(([x, val, label]) => (
        <group key={label} position={[x, 0.24, 0.002]}>
          <Text
            position={[0, 0.1, 0]}
            fontSize={0.185}
            color="#38bdf8"
            anchorX="center"
            fontWeight={800}
          >
            {val}
          </Text>
          <Text
            position={[0, -0.1, 0]}
            fontSize={0.09}
            color="#475569"
            anchorX="center"
          >
            {label}
          </Text>
        </group>
      ))}

      {/* Tech tag pills */}
      {(
        [
          [-0.64, "React Native"],
          [0.64, "Figma"],
        ] as [number, string][]
      ).map(([x, label]) => (
        <group key={label} position={[x, -0.2, 0.002]}>
          <mesh>
            <planeGeometry args={[0.9, 0.195]} />
            <meshBasicMaterial color="#0a1e42" />
          </mesh>
          <Text
            position={[0, 0, 0.001]}
            fontSize={0.09}
            color="#38bdf8"
            anchorX="center"
          >
            {label}
          </Text>
        </group>
      ))}

      {/* ===== TOMBOL INTERAKTIF ===== */}
      <group
        position={[0, -1.18, 0.002]}
        onClick={(e) => {
          e.stopPropagation(); // Mencegah perputaran HP
          router.push("/projects"); // Pindah halaman
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setBtnHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setBtnHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <mesh>
          <planeGeometry args={[2.18, 0.4]} />
          {/* Warna menjadi lebih terang jika di-hover */}
          <meshBasicMaterial color={btnHovered ? "#02a6fa" : "#0284c7"} />
        </mesh>
        <Text
          position={[0, 0, 0.001]}
          fontSize={0.13}
          color="#ffffff"
          fontWeight={700}
          letterSpacing={0.04}
        >
          EXPLORE PROJECT →
        </Text>
      </group>

      {/* Bottom Nav */}
      <mesh position={[0, -2.54, 0.001]}>
        <planeGeometry args={[2.94, 0.66]} />
        <meshBasicMaterial color="#060d1e" />
      </mesh>
      {["⊞", "◎", "♥", "⊙"].map((icon, i) => (
        <Text
          key={i}
          position={[-1.05 + i * 0.7, -2.54, 0.002]}
          fontSize={0.2}
          color={i === 0 ? "#38bdf8" : "#1e3260"}
          anchorX="center"
        >
          {icon}
        </Text>
      ))}

      {/* Home indicator */}
      <mesh position={[0, -2.84, 0.002]}>
        <planeGeometry args={[0.65, 0.032]} />
        <meshBasicMaterial color="#334155" transparent opacity={0.65} />
      </mesh>
    </group>
  );
};

// ==============================================================
// BODI IPHONE — ExtrudeGeometry UNIBODY, true 1-material
// ==============================================================
const IPhoneBody = () => {
  const geometry = useMemo(() => {
    const shape = createRoundedRect(3.1, 6.2, 0.45);
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, []);

  const glassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#030507",
        roughness: 0.02,
        metalness: 0.85,
        envMapIntensity: 1.8,
      }),
    [],
  );

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1c1c1f",
        roughness: 0.22,
        metalness: 0.97,
        envMapIntensity: 2.0,
      }),
    [],
  );

  return <mesh geometry={geometry} material={[glassMat, frameMat]} />;
};

// ==============================================================
// IPHONE LENGKAP
// ==============================================================
const IPhone16Pro = () => (
  <group>
    <IPhoneBody />
    <SideButtons />
    <CameraBack />
    <AppleLogo />
    <PhoneScreen />
  </group>
);

// ==============================================================
// SCENE LENGKAP
// ==============================================================
const PhoneScene = () => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[-3, 8, 7]} intensity={1.8} />
    <directionalLight position={[7, 3, -5]} intensity={1.2} color="#99bbff" />
    <pointLight position={[0, -5, 5]} intensity={0.4} color="#38bdf8" />
    <spotLight position={[0, 12, 4]} angle={0.2} penumbra={1} intensity={1.0} />

    <Environment preset="studio" />

    <Float
      speed={1.4}
      rotationIntensity={0.07}
      floatIntensity={0.4}
      floatingRange={[-0.1, 0.1]}
    >
      <group rotation={[0.08, -0.35, 0.04]}>
        <IPhone16Pro />
      </group>
    </Float>

    <Sparkles
      count={50}
      scale={[10, 14, 6]}
      size={0.45}
      speed={0.1}
      opacity={0.15}
      color="#38bdf8"
    />

    <ContactShadows
      position={[0, -3.6, 0]}
      opacity={0.55}
      scale={18}
      blur={2.8}
      far={5}
      resolution={512}
      color="#000a20"
    />
  </>
);

// ==============================================================
// EXPORT UTAMA
// ==============================================================
export const Projects = () => (
  <section
    id="projects"
    className="py-24 md:py-36 scroll-mt-12 mx-auto max-w-6xl px-6 relative z-40"
  >
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
      {/* ===== KIRI: TEKS ===== */}
      <div className="w-full lg:w-5/12 space-y-8 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3">
          <span className="text-[#38bdf8] font-mono text-lg tracking-widest">
            03.
          </span>
          <span className="text-[#334155] font-mono text-xs tracking-widest uppercase">
            Featured Work
          </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-black text-[#f0f9ff] tracking-tight leading-none">
          My{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg,#38bdf8 0%,#818cf8 100%)",
            }}
          >
            Work
          </span>
        </h2>

        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <div className="h-[2px] w-12 bg-gradient-to-r from-[#38bdf8] to-transparent" />
          <div className="h-[2px] w-4 bg-[#38bdf8] opacity-40" />
        </div>

        <p className="text-[#64748b] text-base md:text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">
          Dari mendesain antarmuka yang ramah pengguna hingga membangun aplikasi
          lintas platform. Setiap proyek dirancang dengan presisi dan perhatian
          penuh terhadap detail.
        </p>

        <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#0f2044]">
          {[
            ["12+", "Projects"],
            ["3", "Awards"],
            ["98%", "Satisfaction"],
          ].map(([value, label]) => (
            <div key={label} className="text-center lg:text-left">
              <p
                className="text-2xl font-black text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg,#38bdf8,#818cf8)",
                }}
              >
                {value}
              </p>
              <p className="text-xs text-[#475569] font-mono uppercase tracking-wider mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>

        <Link href="/projects" className="inline-block group">
          <button
            className="px-8 py-4 rounded-xl font-mono text-sm font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-3"
            style={{
              background:
                "linear-gradient(135deg,rgba(56,189,248,0.1),rgba(129,140,248,0.1))",
              border: "1px solid rgba(56,189,248,0.3)",
              color: "#38bdf8",
            }}
          >
            View All Projects
            <svg
              className="group-hover:translate-x-1 transition-transform duration-300"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </Link>
      </div>

      {/* ===== KANAN: 3D CANVAS ===== */}
      <div className="w-full lg:w-7/12 h-[540px] lg:h-[700px] relative cursor-grab active:cursor-grabbing select-none">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 58% 50%,rgba(56,189,248,0.06) 0%,transparent 70%)",
          }}
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] text-[#38bdf8] opacity-30 tracking-widest hidden md:flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[#38bdf8] animate-pulse inline-block" />
          DRAG TO ROTATE
        </div>

        <Canvas
          className="touch-none"
          camera={{ position: [0, 0, 10.5], fov: 38 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense
            fallback={
              <Text color="#38bdf8" fontSize={0.4}>
                Loading...
              </Text>
            }
          >
            <PhoneScene />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </div>
  </section>
);
