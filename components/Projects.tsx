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
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

// ==============================================================
// DYNAMIC ISLAND
// ==============================================================
const DynamicIsland = () => (
  <RoundedBox
    args={[0.7, 0.19, 0.001]}
    radius={0.095}
    smoothness={8}
    position={[0, 2.63, 0.026]}
  >
    <meshBasicMaterial color="#000000" />
  </RoundedBox>
);

// ==============================================================
// TOMBOL SAMPING
// ==============================================================
const SideButtons = () => (
  <group>
    {[1.0, 0.4].map((y, i) => (
      <RoundedBox
        key={i}
        args={[0.035, 0.32, 0.078]}
        radius={0.015}
        smoothness={4}
        position={[-1.545, y, 0]}
      >
        <meshStandardMaterial
          color="#2a2a2e"
          roughness={0.15}
          metalness={0.95}
        />
      </RoundedBox>
    ))}
    <RoundedBox
      args={[0.035, 0.2, 0.078]}
      radius={0.015}
      smoothness={4}
      position={[-1.545, 1.68, 0]}
    >
      <meshStandardMaterial color="#2a2a2e" roughness={0.15} metalness={0.95} />
    </RoundedBox>
    <RoundedBox
      args={[0.035, 0.44, 0.078]}
      radius={0.015}
      smoothness={4}
      position={[1.545, 0.8, 0]}
    >
      <meshStandardMaterial color="#2a2a2e" roughness={0.15} metalness={0.95} />
    </RoundedBox>
  </group>
);

// ==============================================================
// KAMERA FLUSH
// ==============================================================
const CameraFlush = () => (
  <group position={[-0.65, 2.1, -0.025]} rotation={[0, Math.PI, 0]}>
    <RoundedBox args={[1.28, 1.28, 0.001]} radius={0.22} smoothness={8}>
      <meshStandardMaterial color="#111115" roughness={0.08} metalness={0.95} />
    </RoundedBox>
    {(
      [
        [-0.27, 0.27],
        [0.27, 0.27],
        [-0.27, -0.27],
      ] as [number, number][]
    ).map(([x, y], i) => (
      <group key={i} position={[x, y, 0.001]}>
        <mesh>
          <ringGeometry args={[0.18, 0.22, 64]} />
          <meshStandardMaterial
            color="#222228"
            roughness={0.05}
            metalness={1}
          />
        </mesh>
        <mesh>
          <circleGeometry args={[0.18, 64]} />
          <meshStandardMaterial
            color="#07070f"
            roughness={0.04}
            metalness={0.5}
            envMapIntensity={3}
          />
        </mesh>
        <mesh position={[-0.045, 0.055, 0.001]}>
          <circleGeometry args={[0.038, 32]} />
          <meshStandardMaterial
            color="#aaccff"
            roughness={0}
            metalness={1}
            opacity={0.28}
            transparent
          />
        </mesh>
      </group>
    ))}
    <mesh position={[0.27, -0.27, 0.001]}>
      <circleGeometry args={[0.09, 32]} />
      <meshStandardMaterial
        color="#ffe8aa"
        roughness={0.3}
        metalness={0.3}
        emissive="#3a2a00"
        emissiveIntensity={0.5}
      />
    </mesh>
  </group>
);

// ==============================================================
// APPLE LOGO
// ==============================================================
const AppleLogo = () => {
  const { appleShape, leafShape } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.3);
    shape.bezierCurveTo(0.3, 0.3, 0.42, 0.05, 0.3, -0.3);
    shape.bezierCurveTo(0.2, -0.52, 0.08, -0.52, 0, -0.42);
    shape.bezierCurveTo(-0.08, -0.52, -0.2, -0.52, -0.3, -0.3);
    shape.bezierCurveTo(-0.42, 0.05, -0.3, 0.3, 0, 0.3);
    const bite = new THREE.Path();
    bite.absarc(0.33, 0.08, 0.16, 0, Math.PI * 2, false);
    shape.holes.push(bite);
    const leaf = new THREE.Shape();
    leaf.moveTo(0.04, 0.32);
    leaf.bezierCurveTo(0.18, 0.32, 0.22, 0.5, 0.1, 0.58);
    leaf.bezierCurveTo(-0.06, 0.58, -0.1, 0.46, 0.04, 0.32);
    return { appleShape: shape, leafShape: leaf };
  }, []);
  return (
    <group
      position={[0.35, -0.5, -0.025]}
      rotation={[0, Math.PI, 0]}
      scale={0.65}
    >
      <mesh>
        <shapeGeometry args={[appleShape]} />
        <meshStandardMaterial
          color="#aaaaaa"
          roughness={0.05}
          metalness={0.95}
          opacity={0.16}
          transparent
        />
      </mesh>
      <mesh>
        <shapeGeometry args={[leafShape]} />
        <meshStandardMaterial
          color="#aaaaaa"
          roughness={0.05}
          metalness={0.95}
          opacity={0.16}
          transparent
        />
      </mesh>
    </group>
  );
};

// ==============================================================
// LAYAR UI
// ==============================================================
const PhoneScreen = () => (
  <group position={[0, 0, 0.026]}>
    <mesh>
      <planeGeometry args={[2.82, 5.82]} />
      <meshBasicMaterial color="#050a18" />
    </mesh>
    <mesh position={[0, 2.2, 0.001]}>
      <planeGeometry args={[2.82, 1.4]} />
      <meshBasicMaterial color="#0a1530" transparent opacity={0.9} />
    </mesh>
    <Text
      position={[-0.9, 2.62, 0.002]}
      fontSize={0.19}
      color="#ffffff"
      anchorX="left"
      fontWeight={700}
    >
      9:41
    </Text>

    <mesh position={[0, 0.85, 0.002]}>
      <planeGeometry args={[2.45, 3.1]} />
      <meshBasicMaterial color="#0d1d40" transparent opacity={0.97} />
    </mesh>
    <mesh position={[0, 2.4, 0.003]}>
      <planeGeometry args={[2.45, 0.02]} />
      <meshBasicMaterial color="#38bdf8" />
    </mesh>

    <mesh position={[0, 1.75, 0.003]}>
      <circleGeometry args={[0.52, 64]} />
      <meshBasicMaterial color="#112a5e" />
    </mesh>
    <mesh position={[0, 1.75, 0.004]}>
      <ringGeometry args={[0.52, 0.56, 64]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
    </mesh>
    <Text
      position={[0, 1.75, 0.005]}
      fontSize={0.32}
      color="#38bdf8"
      fontWeight={800}
    >
      RL
    </Text>

    <Text
      position={[0, 1.06, 0.003]}
      fontSize={0.21}
      color="#f0f9ff"
      anchorX="center"
      fontWeight={700}
    >
      Tryotel App
    </Text>
    <Text
      position={[0, 0.76, 0.003]}
      fontSize={0.1}
      color="#475569"
      anchorX="center"
      letterSpacing={0.07}
    >
      MOBILE UI/UX DESIGN
    </Text>

    <mesh position={[0, 0.55, 0.003]}>
      <planeGeometry args={[2.0, 0.01]} />
      <meshBasicMaterial color="#1e3a6e" />
    </mesh>

    {(
      [
        [-0.75, "48", "Screens"],
        [0, "4.9★", "Rating"],
        [0.75, "2K+", "Users"],
      ] as [number, string, string][]
    ).map(([x, val, label]) => (
      <group key={label} position={[x, 0.22, 0.003]}>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.18}
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

    {(
      [
        [-0.63, "React Native"],
        [0.63, "Figma"],
      ] as [number, string][]
    ).map(([x, label]) => (
      <group key={label} position={[x, -0.22, 0.003]}>
        <mesh>
          <planeGeometry args={[0.92, 0.2]} />
          <meshBasicMaterial color="#0c2346" />
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

    <mesh position={[0, -1.2, 0.003]}>
      <planeGeometry args={[2.15, 0.4]} />
      <meshBasicMaterial color="#0284c7" />
    </mesh>
    <Text
      position={[0, -1.2, 0.004]}
      fontSize={0.13}
      color="#ffffff"
      fontWeight={700}
      letterSpacing={0.05}
    >
      EXPLORE PROJECT →
    </Text>

    <mesh position={[0, -2.55, 0.002]}>
      <planeGeometry args={[2.82, 0.65]} />
      <meshBasicMaterial color="#060d1e" />
    </mesh>
    {["⊞", "◎", "♥", "⊙"].map((icon, i) => (
      <Text
        key={i}
        position={[-1.05 + i * 0.7, -2.55, 0.003]}
        fontSize={0.2}
        color={i === 0 ? "#38bdf8" : "#1e3a6e"}
        anchorX="center"
      >
        {icon}
      </Text>
    ))}
    <mesh position={[0, -2.84, 0.003]}>
      <planeGeometry args={[0.65, 0.032]} />
      <meshBasicMaterial color="#334155" transparent opacity={0.6} />
    </mesh>
  </group>
);

// ==============================================================
// IPHONE MODEL
// ==============================================================
const UltraSlimPhone = () => (
  <group>
    <RoundedBox args={[3.1, 6.2, 0.052]} radius={0.42} smoothness={24}>
      <meshStandardMaterial
        color="#17171a"
        roughness={0.16}
        metalness={0.9}
        envMapIntensity={2.2}
      />
    </RoundedBox>
    <mesh position={[0, 0, 0.0261]}>
      <planeGeometry args={[2.92, 5.95]} />
      <meshStandardMaterial
        color="#020408"
        roughness={0.01}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
    <mesh position={[0, 0, -0.0261]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[2.92, 5.95]} />
      <meshStandardMaterial
        color="#0f0f12"
        roughness={0.09}
        metalness={0.88}
        envMapIntensity={1.6}
      />
    </mesh>
    <DynamicIsland />
    <SideButtons />
    <CameraFlush />
    <AppleLogo />
    <PhoneScreen />
  </group>
);

// ==============================================================
// EXPORT UTAMA
// ==============================================================
export const Projects = () => {
  return (
    <section
      id="projects"
      className="py-24 md:py-36 scroll-mt-12 mx-auto max-w-6xl px-6 relative z-40"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* KIRI: TEKS */}
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
                  "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
              }}
            >
              Work
            </span>
          </h2>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="h-[2px] w-10 bg-gradient-to-r from-[#38bdf8] to-transparent" />
            <div className="h-[2px] w-3 bg-[#38bdf8] opacity-30" />
          </div>

          <p className="text-[#64748b] text-base md:text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">
            Dari mendesain antarmuka yang ramah pengguna hingga membangun
            aplikasi lintas platform. Setiap proyek dirancang dengan presisi dan
            perhatian penuh terhadap detail.
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
              className="relative px-8 py-4 rounded-xl font-mono text-sm font-semibold tracking-widest uppercase transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(129,140,248,0.08))",
                border: "1px solid rgba(56,189,248,0.25)",
                color: "#38bdf8",
              }}
            >
              <span className="flex items-center gap-3">
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
            </button>
          </Link>
        </div>

        {/* KANAN: 3D */}
        <div className="w-full lg:w-7/12 h-[500px] lg:h-[680px] relative select-none overflow-hidden">
          {/* Subtle glow */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 50% at 55% 55%, rgba(56,189,248,0.07) 0%, transparent 70%)",
            }}
          />

          <Canvas
            camera={{ position: [0, 1.5, 10], fov: 42 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.35} />

            {/* Cahaya dari atas-depan-kiri — rim light utama */}
            <directionalLight position={[-4, 6, 8]} intensity={2.2} />

            {/* Rim light dari belakang kanan — bikin tepi metalik bersinar */}
            <directionalLight
              position={[6, 2, -6]}
              intensity={1.4}
              color="#88aaff"
            />

            {/* Fill light bawah */}
            <pointLight position={[2, -6, 4]} intensity={0.5} color="#38bdf8" />

            <Environment preset="city" />

            <Float
              speed={0.8}
              rotationIntensity={0.03}
              floatIntensity={0.2}
              floatingRange={[-0.06, 0.06]}
            >
              {/*
                Rotasi dramatis seperti referensi:
                - X: miring ke depan/belakang (sekitar -0.35 rad → atas menjauh)
                - Y: putar ke kiri kira-kira 1.2 rad (hampir tampak samping kiri)
                - Z: miring diagonal seperti di foto (~-0.35 rad)
              */}
              <group rotation={[-0.3, 1.15, 0.32]} position={[0.5, 0.3, 0]}>
                <Suspense
                  fallback={
                    <Text color="#38bdf8" fontSize={0.4}>
                      Loading...
                    </Text>
                  }
                >
                  <UltraSlimPhone />
                </Suspense>
              </group>
            </Float>

            <Sparkles
              count={40}
              scale={[10, 14, 6]}
              size={0.4}
              speed={0.08}
              opacity={0.15}
              color="#38bdf8"
            />

            <ContactShadows
              position={[0, -4.5, 0]}
              opacity={0.45}
              scale={18}
              blur={3}
              far={6}
              resolution={512}
              color="#000a20"
            />

            {/* OrbitControls dimatikan auto-rotate, user bisa drag */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
              minAzimuthAngle={-Math.PI / 2}
              maxAzimuthAngle={Math.PI / 2}
              dampingFactor={0.06}
              enableDamping
            />
          </Canvas>

          {/* Label drag */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] text-[#38bdf8] opacity-30 tracking-widest flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#38bdf8] animate-pulse inline-block" />
            DRAG TO ROTATE
          </div>
        </div>
      </div>
    </section>
  );
};
