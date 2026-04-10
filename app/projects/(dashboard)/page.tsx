// app/projects/(dashboard)/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Import mesin bahasa
import { useLanguage } from "@/context/LanguageContext";

export default function OverviewPage() {
  const totalProjects = projects.length;

  // Panggil fungsi bahasa
  const { t } = useLanguage();

  // ================= STATE UNTUK GITHUB API =================
  const [githubStats, setGithubStats] = useState({
    repos: 0,
    stars: 0,
    totalCommits: 0,
  });

  const [commitData, setCommitData] = useState([
    { name: "M1", val: 0 },
    { name: "M2", val: 0 },
    { name: "M3", val: 0 },
    { name: "M4", val: 0 },
    { name: "M5", val: 0 },
    { name: "M6", val: 0 },
  ]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    async function fetchMyInternalAPI() {
      try {
        const res = await fetch("/api/github");

        if (!res.ok) {
          console.error("Gagal mengambil data dari /api/github");
          return;
        }

        const data = await res.json();

        setGithubStats({
          repos: data.repos || 0,
          stars: data.stars || 0,
          totalCommits: data.totalCommits || 0,
        });

        if (data.graphData) {
          setCommitData(data.graphData);
        }
      } catch (error) {
        console.error("Gagal mengambil data internal:", error);
      }
    }

    fetchMyInternalAPI();
  }, []);

  // ================= MENGHITUNG KATEGORI WORKSPACE =================
  const chartData = [
    {
      name: "Web",
      value: projects.filter((p) => p.category === "Web").length,
      color: "#F97316",
    },
    {
      name: "Mobile",
      value: projects.filter((p) => p.category === "Mobile").length,
      color: "#06B6D4",
    },
    {
      name: "UI/UX",
      value: projects.filter((p) => p.category === "UI/UX").length,
      color: "#8B5CF6",
    },
    {
      name: "Licenses",
      value: projects.filter((p) => p.category === "Licenses").length,
      color: "#10B981",
    },
  ].filter((item) => item.value > 0);

  if (!isMounted) return null;

  return (
    <div className="animate-fade-in space-y-10 pb-12">
      {/* HEADER DASHBOARD */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#E6F1FF] mb-2">
          {t("overview.title")}
        </h1>
        <p className="text-[#8892B0] text-sm font-mono">
          {t("overview.subtitle1")}
          <span className="text-[#64FFDA]">{totalProjects}</span>
          {t("overview.subtitle2")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: GITHUB ACTIVITY & STATUS (DIGABUNG) */}
        <div className="lg:col-span-2 bg-[#112240] border border-[#233554] p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between hover:border-[#233554]/80 transition-colors relative overflow-hidden">
          {/* Header Kotak GitHub */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 relative z-10">
            <div>
              <h3 className="text-[#E6F1FF] text-lg font-bold flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t("overview.githubStatus")}
              </h3>
              <p className="text-[#8892B0] text-xs mt-1">
                {t("overview.githubCommitsSub")}
              </p>
            </div>

            {/* Box Angka Statistik di Sudut Kanan Atas */}
            <div className="flex gap-4 md:gap-6 bg-[#0A192F]/50 p-4 rounded-xl border border-[#233554]/60 backdrop-blur-sm">
              <div className="text-center">
                <span className="text-[#64FFDA] font-mono text-xl font-bold">
                  {githubStats.totalCommits}
                </span>
                <p className="text-[#8892B0] text-[9px] uppercase tracking-widest mt-1">
                  {t("overview.allTimeCommits")}
                </p>
              </div>
              <div className="text-center border-l border-[#233554] pl-4 md:pl-6">
                <span className="text-[#E6F1FF] font-mono text-xl font-bold">
                  {githubStats.repos}
                </span>
                <p className="text-[#8892B0] text-[9px] uppercase tracking-widest mt-1">
                  {t("overview.repos")}
                </p>
              </div>
              <div className="text-center border-l border-[#233554] pl-4 md:pl-6">
                <span className="text-[#F97316] font-mono text-xl font-bold">
                  {githubStats.stars}
                </span>
                <p className="text-[#8892B0] text-[9px] uppercase tracking-widest mt-1">
                  {t("overview.stars")}
                </p>
              </div>
            </div>
          </div>

          {/* Area Grafik */}
          <div className="h-56 w-full font-mono text-[10px] relative z-10">
            <ResponsiveContainer
              width="99%"
              height="100%"
              minWidth={1}
              minHeight={1}
            >
              <AreaChart data={commitData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#233554"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#495670"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A192F",
                    border: "1px solid #233554",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#64FFDA" }}
                />
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="#64FFDA"
                  fill="url(#colorVal)"
                  fillOpacity={1}
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64FFDA" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#64FFDA" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Link ke profil GitHub Asli di bawah grafik */}
          <a
            href="https://github.com/LindungiLw"
            target="_blank"
            rel="noreferrer"
            className="mt-6 pt-4 border-t border-[#233554]/50 flex items-center justify-center gap-2 text-xs font-mono text-[#8892B0] hover:text-[#64FFDA] transition-colors relative z-10"
          >
            Explore GitHub Profile →
          </a>
        </div>

        {/* CHART 2: PROJECT DISTRIBUTION */}
        <div className="bg-[#112240] border border-[#233554] p-8 rounded-2xl shadow-xl flex flex-col items-center hover:border-[#233554]/80 transition-colors">
          <h3 className="text-[#E6F1FF] font-bold w-full mb-1">
            {t("overview.workspaceMix")}
          </h3>
          <p className="text-[#8892B0] text-xs w-full mb-8">
            {t("overview.workspaceMixSub")}
          </p>

          <div className="relative">
            <PieChart width={160} height={160}>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                stroke="none"
                paddingAngle={5}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A192F",
                  border: "1px solid #233554",
                  borderRadius: "8px",
                  color: "#E6F1FF",
                }}
                itemStyle={{ color: "#E6F1FF" }}
              />
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-[#E6F1FF]">
                {totalProjects}
              </span>
              <span className="text-[9px] text-[#8892B0] tracking-widest uppercase mt-1">
                {t("overview.items")}
              </span>
            </div>
          </div>

          <div className="mt-8 w-full space-y-3">
            {chartData.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-[#8892B0]">{item.name}</span>
                </div>
                <span className="text-[#E6F1FF] font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* "Quick Insight" & "GitHub Live Status" terpisah DIHAPUS karena sudah digabung di atas. Jauh lebih bersih! */}
    </div>
  );
}
