// app/projects/(dashboard)/page.tsx
"use client";

import React from "react";
import { projects } from "@/data/projects";
// IMPORT LIBRARY BARU: Recharts
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Data Dummy untuk Feedback (Sesuai referensi gambar)
const recentFeedbacks = [
  {
    id: 1,
    name: "Lucas Jones",
    role: "Senior Recruiter",
    rating: "90%",
    avatar: "👨‍💼",
  },
  {
    id: 2,
    name: "Sarah Lee",
    role: "Product Manager",
    rating: "95%",
    avatar: "👩‍💻",
  },
  {
    id: 3,
    name: "Alex Chen",
    role: "UI Designer",
    rating: "88%",
    avatar: "🧑‍🎨",
  },
];

// Data untuk Tech Stack Mastery (Kiri Bawah di gambar)
const techSkills = [
  { name: "Next.js & JS", percentage: 92, color: "bg-[#8B5CF6]" }, // Ungu
  { name: "Flutter & Dart", percentage: 85, color: "bg-[#F97316]" }, // Orange
  { name: "Figma (UI/UX)", percentage: 80, color: "bg-[#06B6D4]" }, // Cyan
  { name: "Java & PHP", percentage: 70, color: "bg-[#EAB308]" }, // Kuning
  { name: "WordPress", percentage: 65, color: "bg-[#10B981]" }, // Hijau
];

// ==============================================================
// 📊 BAGIAN DATA UNTUK CHART (Bisa kamu edit angkanya)
// ==============================================================

// 1. Data untuk Coding Activity (Grafik Kurva Gelombang Besar)
const commitActivityData = [
  { name: "Week 1", Commits: 40, PRs: 10 },
  { name: "Week 2", Commits: 90, PRs: 30 },
  { name: "Week 3", Commits: 60, PRs: 20 },
  { name: "Week 4", Commits: 110, PRs: 50 },
  { name: "Week 5", Commits: 85, PRs: 35 },
];

export default function OverviewDashboard() {
  const totalProjects = projects.length;

  // 2. Data untuk Project Types (Lingkaran Donat di Kanan Atas)
  // Menghitung jumlah proyek per kategori secara otomatis dari projects.ts
  const uiuxCount = projects.filter((p) => p.category === "UI/UX").length;
  const webCount = projects.filter((p) => p.category === "Web").length;
  const mobileCount = projects.filter((p) => p.category === "Mobile").length;

  const projectTypeData = [
    { name: "UI/UX", value: uiuxCount || 10, color: "#64748B" }, // Abu-abu
    { name: "Web", value: webCount || 60, color: "#F97316" }, // Orange
    { name: "Mobile", value: mobileCount || 30, color: "#06B6D4" }, // Cyan
  ];

  return (
    <div className="animate-fade-in pb-20 selection:bg-[#64FFDA]/30 selection:text-[#E6F1FF]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#E6F1FF] mb-2">
            Analytics Overview
          </h1>
          <p className="text-[#8892B0] text-sm">
            Real-time status, tech stack mastery, and coding activities powered
            by data.
          </p>
        </div>
      </div>

      {/* ================= BARIS 1: AREA CHART & DONUT CHART ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* KIRI BARIS 1 (Col-span 2): Coding Activity (Management Value di Gambar) */}
        <div className="lg:col-span-2 bg-[#112240] border border-[#233554] p-6 rounded-2xl flex flex-col justify-between shadow-xl">
          <div className="flex justify-between items-center mb-8 gap-4">
            <h3 className="text-[#E6F1FF] font-bold text-lg">
              Coding Activity
            </h3>

            {/* Toggles (Earning/Absent/Present di Gambar) */}
            <div className="flex gap-2 shrink-0">
              <button className="px-4 py-1.5 rounded-full border border-[#64FFDA] text-[#64FFDA] text-xs font-mono bg-[#64FFDA]/10">
                Commits
              </button>
              <button className="px-4 py-1.5 rounded-full border border-[#233554] text-[#8892B0] text-xs font-mono hover:bg-[#233554]/50">
                PRs
              </button>
            </div>
          </div>

          {/* ================= GANTI SVG STATIS JADI RECHARTS AREA CHART (DINAMIS) ================= */}
          <div className="w-full h-56 font-mono text-[10px] mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={commitActivityData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                {/* Definisi Warna Gradient yang Keren */}
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPRs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {/* Sumbu X dan Y */}
                <XAxis
                  dataKey="name"
                  stroke="#495670"
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#495670"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  dx={-10}
                />
                {/* Garis Pembantu Putus-putus */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#233554"
                  vertical={false}
                />
                {/* Kotak Info Saat Hover */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#112240",
                    border: "1px solid #233554",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#E6F1FF", fontWeight: "bold" }}
                />
                {/* Area Kurva (Dinamic Data) */}
                <Area
                  type="monotone"
                  dataKey="PRs"
                  stroke="#06B6D4"
                  fillOpacity={1}
                  fill="url(#colorPRs)"
                  strokeWidth={1}
                  strokeOpacity={0.5}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="Commits"
                  stroke="#F97316"
                  fillOpacity={1}
                  fill="url(#colorCommits)"
                  strokeWidth={2}
                  dot={{ fill: "#112240", stroke: "#F97316", strokeWidth: 1 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KANAN BARIS 1 (Col-span 1): Donut Chart */}
        <div className="bg-[#112240] border border-[#233554] p-6 rounded-2xl flex flex-col items-center shadow-xl">
          <h3 className="text-[#E6F1FF] font-bold text-lg w-full text-left mb-8">
            Project Types
          </h3>

          <div className="relative w-full h-full flex items-center justify-center min-h-[160px]">
            {/* ================= GANTI CONIC GRADIENT STATIS JADI RECHARTS PIE CHART (DINAMIS) ================= */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60} // Membuat efek Donut (Lobang Tengah)
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  labelLine={false}
                  cornerRadius={3}
                >
                  {projectTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#112240",
                    border: "1px solid #233554",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#E6F1FF" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Lingkaran Dalam (Teks Total) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#E6F1FF]">
                {totalProjects}
              </span>
              <span className="text-[10px] text-[#8892B0] uppercase tracking-widest font-mono mt-1">
                Total
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-12 text-[10px] font-mono text-[#8892B0] w-full justify-center px-2">
            {projectTypeData.map((entry) => (
              <span key={entry.name} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>{" "}
                {entry.name}{" "}
                <span className="text-[#E6F1FF] font-bold">
                  ({entry.value})
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BARIS 2: BAR CHART & LIST ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KIRI BARIS 2: Tech Stack Mastery (Kiri Bawah di gambar) */}
        <div className="lg:col-span-2 bg-[#112240] border border-[#233554] p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-8 gap-4">
            <h3 className="text-[#E6F1FF] font-bold text-lg">
              Tech Stack Mastery
            </h3>
            <div className="flex gap-3 hidden sm:flex shrink-0">
              {techSkills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-[10px] text-[#8892B0] font-mono"
                >
                  <span className={`w-3 h-3 rounded-sm ${skill.color}`}></span>{" "}
                  {skill.name.split(" ")[0]}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6 relative">
            {techSkills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-4 relative z-10"
              >
                <div className="w-24 text-right text-xs font-mono text-[#8892B0] truncate">
                  {skill.name}
                </div>
                {/* Track Background */}
                <div className="flex-1 bg-[#0A192F] rounded-md h-8 flex items-center border border-[#233554]/50 overflow-hidden">
                  {/* Animated Bar Fill (Tailwind Dinamis) */}
                  <div
                    className={`${skill.color} h-full rounded-r-sm flex items-center px-3 transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.percentage}%` }}
                  >
                    <span className="text-white/90 text-xs font-bold">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KANAN BARIS 2: Recent Feedback (Kanan Bawah di gambar) */}
        <div className="bg-[#112240] border border-[#233554] p-6 rounded-2xl flex flex-col shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[#E6F1FF] font-bold text-lg">
              Recent Feedback
            </h3>
            <span className="bg-[#233554] text-[#8892B0] text-[10px] font-mono px-3 py-1 rounded-md">
              This Month ⌵
            </span>
          </div>

          <div className="space-y-4 flex-1">
            {recentFeedbacks.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-3.5 bg-[#0A192F] border border-[#233554]/50 rounded-xl hover:border-[#64FFDA]/50 transition-colors cursor-default"
              >
                <div className="relative">
                  <div className="w-11 h-11 bg-[#233554] rounded-full flex items-center justify-center text-xl border-2 border-[#233554]">
                    {user.avatar}
                  </div>
                  {/* Badge Nomor */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white
                    ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-400"}
                  `}
                  >
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-[#E6F1FF] text-sm font-bold">
                    {user.name}
                  </h4>
                  <p className="text-[#8892B0] text-xs">
                    {user.role}:{" "}
                    <span className="text-[#F97316] font-mono font-bold">
                      {user.rating}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-5 py-2.5 border border-[#233554] bg-[#233554]/30 text-[#8892B0] text-xs font-mono rounded-lg hover:bg-[#233554] transition-colors">
            View All Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
