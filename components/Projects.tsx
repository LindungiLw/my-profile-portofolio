// components/Projects.tsx
"use client";

import React, { Suspense, useMemo } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Text,
  RoundedBox,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

// ==============================================================
// UTILITY: CETAK BENTUK HP (SUDUT MELENGKUNG SEMPURNA)
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
// KOMPONEN: TOMBOL SAMPING
// ==============================================================
const SideButtons = () => {
  const btnColor = "#1a1a1c";
  return (
    <group>
      {/* Volume Up */}
      <RoundedBox
        args={[0.04, 0.35, 0.04]}
        radius={0.01}
        smoothness={4}
        position={[-1.56, 1.0, 0]}
      >
        <meshStandardMaterial
          color={btnColor}
          roughness={0.3}
          metalness={0.8}
        />
      </RoundedBox>
      {/* Volume Down */}
      <RoundedBox
        args={[0.04, 0.35, 0.04]}
        radius={0.01}
        smoothness={4}
        position={[-1.56, 0.4, 0]}
      >
        <meshStandardMaterial
          color={btnColor}
          roughness={0.3}
          metalness={0.8}
        />
      </RoundedBox>
      {/* Action/Mute Button */}
      <RoundedBox
        args={[0.04, 0.22, 0.04]}
        radius={0.01}
        smoothness={4}
        position={[-1.56, 1.7, 0]}
      >
        <meshStandardMaterial
          color={btnColor}
          roughness={0.3}
          metalness={0.8}
        />
      </RoundedBox>
      {/* Power Button */}
      <RoundedBox
        args={[0.04, 0.48, 0.04]}
        radius={0.01}
        smoothness={4}
        position={[1.56, 0.8, 0]}
      >
        <meshStandardMaterial
          color={btnColor}
          roughness={0.3}
          metalness={0.8}
        />
      </RoundedBox>
    </group>
  );
};

// ==============================================================
// KOMPONEN: MODUL KAMERA ULTRA-FLUSH (TIDAK SEPERTI BALOK)
// ==============================================================
const CameraModule = () => {
  return (
    // Posisi di belakang bodi (Z negatif) dan diputar menghadap belakang
    <group position={[-0.65, 2.05, -0.071]} rotation={[0, Math.PI, 0]}>
      {/* Base Kamera dibuat sangat tipis (depth 0.02) agar menyatu */}
      <RoundedBox
        args={[1.35, 1.35, 0.02]}
        radius={0.3}
        smoothness={8}
        position={[0, 0, 0.01]}
      >
        <meshStandardMaterial color="#111114" roughness={0.2} metalness={0.8} />
      </RoundedBox>

      {/* 3 Lensa Kamera */}
      {[
        { pos: [0.28, 0.28, 0.02], r: 0.28 },
        { pos: [-0.28, 0.28, 0.02], r: 0.24 },
        { pos: [0.28, -0.28, 0.02], r: 0.24 },
      ].map(({ pos, r }, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Ring Metal Lensa */}
          <mesh>
            <ringGeometry args={[r - 0.04, r + 0.02, 64]} />
            <meshStandardMaterial
              color="#2a2a2e"
              roughness={0.1}
              metalness={1}
            />
          </mesh>
          {/* Kaca Lensa Hitam */}
          <mesh position={[0, 0, 0.005]}>
            <circleGeometry args={[r - 0.04, 64]} />
            <meshStandardMaterial
              color="#050508"
              roughness={0.05}
              metalness={0.8}
              envMapIntensity={2}
            />
          </mesh>
          {/* Pantulan Lensa (Biru transparan) */}
          <mesh position={[-r * 0.2, r * 0.2, 0.01]}>
            <circleGeometry args={[r * 0.15, 32]} />
            <meshStandardMaterial
              color="#4477ff"
              roughness={0}
              metalness={1}
              opacity={0.2}
              transparent
            />
          </mesh>
        </group>
      ))}

      {/* Flash */}
      <mesh position={[-0.28, -0.28, 0.02]}>
        <circleGeometry args={[0.09, 32]} />
        <meshStandardMaterial
          color="#ffeba0"
          roughness={0.3}
          emissive="#332500"
        />
      </mesh>

      {/* Sensor LiDAR */}
      <mesh position={[0, -0.28, 0.02]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>
    </group>
  );
};

// ==============================================================
// KOMPONEN: LAYAR HP (UI BERSIH TANPA KOTAK HITAM)
// ==============================================================
const PhoneScreen = () => {
  // Layar dibentuk melengkung persis mengikuti bentuk bezel
  const screenShape = useMemo(() => createRoundedRect(2.95, 6.05, 0.4), []);

  return (
    // Z = 0.071 agar menempel pas di atas kaca depan tanpa z-fighting
    <group position={[0, 0, 0.071]}>
      {/* Background Utama Aplikasi (Biru Gelap Mulus) */}
      <mesh>
        <shapeGeometry args={[screenShape]} />
        <meshBasicMaterial color="#050a18" />
      </mesh>

      {/* DYNAMIC ISLAND */}
      <RoundedBox
        args={[0.75, 0.22, 0.01]}
        radius={0.11}
        smoothness={8}
        position={[0, 2.65, 0.001]}
      >
        <meshBasicMaterial color="#000000" />
      </RoundedBox>

      {/* STATUS BAR */}
      <Text
        position={[-0.95, 2.62, 0.002]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="left"
        fontWeight={700}
      >
        9:41
      </Text>

      {/* Konten UI Aplikasi */}
      <mesh position={[0, 0.9, 0.001]}>
        <planeGeometry args={[2.5, 3.0]} />
        <meshBasicMaterial color="#0f2044" />
      </mesh>

      {/* Avatar */}
      <mesh position={[0, 1.7, 0.002]}>
        <circleGeometry args={[0.55, 64]} />
        <meshBasicMaterial color="#1e3a6e" />
      </mesh>
      <Text
        position={[0, 1.7, 0.003]}
        fontSize={0.35}
        color="#38bdf8"
        fontWeight={800}
      >
        RL
      </Text>

      {/* Teks Deskripsi */}
      <Text
        position={[0, 1.0, 0.002]}
        fontSize={0.22}
        color="#f0f9ff"
        anchorX="center"
        fontWeight={700}
      >
        Tryotel App
      </Text>
      <Text
        position={[0, 0.7, 0.002]}
        fontSize={0.13}
        color="#64748b"
        anchorX="center"
      >
        MOBILE UI/UX DESIGN
      </Text>

      {/* Garis Pemisah */}
      <mesh position={[0, 0.5, 0.002]}>
        <planeGeometry args={[2.0, 0.01]} />
        <meshBasicMaterial color="#1e3a6e" />
      </mesh>

      {/* Statistik */}
      {[
        { x: -0.75, val: "48", label: "Screens" },
        { x: 0, val: "4.9", label: "Rating" },
        { x: 0.75, val: "2K+", label: "Users" },
      ].map(({ x, val, label }) => (
        <group key={label} position={[x, 0.2, 0.002]}>
          <Text
            position={[0, 0.1, 0]}
            fontSize={0.2}
            color="#38bdf8"
            anchorX="center"
            fontWeight={800}
          >
            {val}
          </Text>
          <Text
            position={[0, -0.1, 0]}
            fontSize={0.1}
            color="#475569"
            anchorX="center"
          >
            {label}
          </Text>
        </group>
      ))}

      {/* Tombol CTA Biru */}
      <mesh position={[0, -1.25, 0.001]}>
        <planeGeometry args={[2.2, 0.42]} />
        <meshBasicMaterial color="#0ea5e9" />
      </mesh>
      <Text
        position={[0, -1.25, 0.002]}
        fontSize={0.15}
        color="#ffffff"
        fontWeight={700}
      >
        EXPLORE PROJECT →
      </Text>

      {/* Navigasi Bawah */}
      <mesh position={[0, -2.55, 0.001]}>
        <planeGeometry args={[2.8, 0.7]} />
        <meshBasicMaterial color="#070e1f" />
      </mesh>
      {["⊞", "◎", "♥", "⊙"].map((icon, i) => (
        <Text
          key={i}
          position={[-1.05 + i * 0.7, -2.55, 0.002]}
          fontSize={0.22}
          color={i === 0 ? "#38bdf8" : "#334155"}
          anchorX="center"
        >
          {icon}
        </Text>
      ))}

      {/* Home Indicator */}
      <mesh position={[0, -2.85, 0.002]}>
        <planeGeometry args={[0.7, 0.04]} />
        <meshBasicMaterial color="#334155" />
      </mesh>
    </group>
  );
};

// ==============================================================
// KOMPONEN: APPLE LOGO (KURVA DIPERBAIKI)
// ==============================================================
const AppleLogo = () => {
  const { appleShape, leafShape } = useMemo(() => {
    const shape = new THREE.Shape();
    // Bentuk Apple yang lebih presisi dan mulus
    shape.moveTo(0, 0.25);
    shape.bezierCurveTo(0.15, 0.25, 0.25, 0.1, 0.25, -0.1);
    shape.bezierCurveTo(0.25, -0.25, 0.15, -0.35, 0.05, -0.35);
    shape.bezierCurveTo(0, -0.35, -0.05, -0.3, -0.1, -0.3);
    shape.bezierCurveTo(-0.15, -0.3, -0.2, -0.35, -0.25, -0.35);
    shape.bezierCurveTo(-0.4, -0.35, -0.45, -0.15, -0.45, 0.05);
    shape.bezierCurveTo(-0.45, 0.25, -0.3, 0.35, -0.15, 0.3);
    shape.bezierCurveTo(-0.1, 0.3, -0.05, 0.32, 0, 0.25);

    const bite = new THREE.Path();
    bite.absarc(0.28, 0.05, 0.12, 0, Math.PI * 2, false);
    shape.holes.push(bite);

    const leaf = new THREE.Shape();
    leaf.moveTo(0.02, 0.35);
    leaf.bezierCurveTo(0.12, 0.35, 0.18, 0.45, 0.08, 0.55);
    leaf.bezierCurveTo(-0.02, 0.55, -0.08, 0.45, 0.02, 0.35);

    return { appleShape: shape, leafShape: leaf };
  }, []);

  return (
    // Posisi di belakang bodi (Z negatif) dan diputar menghadap belakang
    <group position={[0.05, 0, -0.071]} rotation={[0, Math.PI, 0]} scale={0.65}>
      <mesh>
        <shapeGeometry args={[appleShape]} />
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh>
        <shapeGeometry args={[leafShape]} />
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
};

// ==============================================================
// KOMPONEN: IPHONE 16 PRO (TRUE UNIBODY - 1 MATERIAL)
// ==============================================================
const IPhone16Pro = () => {
  const geometry = useMemo(() => {
    const shape = createRoundedRect(3.1, 6.2, 0.45);

    // Konfigurasi ketebalan dan lekukan pinggiran bodi
    const extrudeSettings = {
      depth: 0.1, // Bodi tipis elegan
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // KUNCI: Titik tengah absolut agar tidak mencong
    geo.center();
    return geo;
  }, []);

  // Material Kaca Hitam Pekat (Untuk layar depan & punggung belakang)
  const glassMat = new THREE.MeshStandardMaterial({
    color: "#020202",
    roughness: 0.02,
    metalness: 0.8,
    envMapIntensity: 1.5,
  });

  // Material Bingkai Titanium
  const frameMat = new THREE.MeshStandardMaterial({
    color: "#1c1c1e",
    roughness: 0.25,
    metalness: 0.95,
    envMapIntensity: 1.2,
  });

  return (
    <group>
      {/* SATU MESH UNTUK SEMUA!
        Three.js ExtrudeGeometry menggunakan Array Material:
        - Index 0: Untuk Kaca Depan & Belakang
        - Index 1: Untuk Bingkai Samping
        Ini membuat HP mustahil terbelah karena fisiknya cuma SATU.
      */}
      <mesh geometry={geometry} material={[glassMat, frameMat]} />

      <SideButtons />
      <CameraModule />
      <AppleLogo />
      <PhoneScreen />
    </group>
  );
};

// ==============================================================
// KOMPONEN SCENE LENGKAP
// ==============================================================
const PhoneScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 6]} intensity={1.5} />
      <directionalLight
        position={[-6, 4, -4]}
        intensity={0.8}
        color="#4488ff"
      />
      <pointLight position={[0, -4, 6]} intensity={0.5} color="#38bdf8" />

      <Environment preset="city" />

      {/* Efek mengambang elegan */}
      <Float
        speed={2}
        rotationIntensity={0.1}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <group rotation={[0.1, -0.45, 0.05]}>
          <IPhone16Pro />
        </group>
      </Float>

      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.6}
        scale={20}
        blur={2.5}
        far={4}
        color="#000820"
      />
    </>
  );
};

// ==============================================================
// KOMPONEN UTAMA
// ==============================================================
export const Projects = () => {
  return (
    <section
      id="projects"
      className="py-24 md:py-36 scroll-mt-12 mx-auto max-w-6xl px-6 relative z-40"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* SISI KIRI: TEKS */}
        <div className="w-full lg:w-5/12 space-y-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <span className="text-[#38bdf8] font-mono text-lg md:text-xl tracking-widest">
              03.
            </span>
            <span className="text-[#334155] font-mono text-sm tracking-widest uppercase">
              Featured Work
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-[#f0f9ff] tracking-tight leading-none">
            My{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
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
            Dari mendesain antarmuka yang ramah pengguna hingga membangun
            aplikasi lintas platform. Setiap proyek dirancang dengan presisi dan
            perhatian penuh terhadap detail.
          </p>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#0f2044]">
            {[
              { value: "12+", label: "Projects" },
              { value: "3", label: "Awards" },
              { value: "98%", label: "Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p
                  className="text-2xl font-black text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #38bdf8, #818cf8)",
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
              className="relative px-8 py-4 rounded-xl font-mono text-sm font-semibold tracking-widest uppercase overflow-hidden transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.1))",
                border: "1px solid rgba(56,189,248,0.3)",
                color: "#38bdf8",
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                View All Projects
                <svg
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
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
              </span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(129,140,248,0.15))",
                }}
              />
            </button>
          </Link>
        </div>

        {/* SISI KANAN: 3D CANVAS */}
        <div className="w-full lg:w-7/12 h-[540px] lg:h-[680px] relative cursor-grab active:cursor-grabbing select-none">
          <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-[#38bdf8] opacity-40 tracking-widest hidden md:flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            DRAG TO ROTATE
          </div>

          <Canvas
            className="touch-none"
            camera={{ position: [0, 0, 10.5], fov: 38 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
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

            {/* Rotasi Bebas 360 Derajat */}
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
};
