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

export default function OverviewPage() {
  const totalProjects = projects.length;

  // ================= STATE UNTUK GITHUB API =================
  const [githubStats, setGithubStats] = useState({
    repos: 0,
    stars: 0,
    totalCommits: 0,
  });

  // Format bawaan kini menggunakan 6 bulan
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

  const topCategory =
    chartData.length > 0
      ? [...chartData].sort((a, b) => b.value - a.value)[0]
      : { name: "None", value: 0 };

  if (!isMounted) return null;

  return (
    <div className="animate-fade-in space-y-10 pb-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#E6F1FF] mb-2">
          Analytics Overview
        </h1>
        <p className="text-[#8892B0] text-sm font-mono">
          Live statistics from{" "}
          <span className="text-[#64FFDA]">{totalProjects}</span> active items
          in your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: GITHUB ACTIVITY (GROWTH) */}
        <div className="lg:col-span-2 bg-[#112240] border border-[#233554] p-8 rounded-2xl shadow-xl flex flex-col justify-between hover:border-[#233554]/80 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[#E6F1FF] font-bold flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Commits
              </h3>
              <p className="text-[#8892B0] text-xs mt-1">
                6-Month cumulative code contributions
              </p>
            </div>
            <div className="text-right">
              <span className="text-[#64FFDA] font-mono text-2xl font-bold">
                {githubStats.totalCommits}
              </span>
              <p className="text-[#8892B0] text-[9px] uppercase tracking-widest mt-1">
                All-Time Commits
              </p>
            </div>
          </div>

          <div className="h-56 w-full font-mono text-[10px]">
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
        </div>

        {/* CHART 2: PROJECT DISTRIBUTION */}
        <div className="bg-[#112240] border border-[#233554] p-8 rounded-2xl shadow-xl flex flex-col items-center hover:border-[#233554]/80 transition-colors">
          <h3 className="text-[#E6F1FF] font-bold w-full mb-1">
            Workspace Mix
          </h3>
          <p className="text-[#8892B0] text-xs w-full mb-8">
            Based on category volume
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
                Items
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

      {/* ================= BARIS 2: GITHUB STATS & INSIGHT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <div className="bg-[#112240]/30 border border-[#233554] p-6 rounded-2xl flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="text-[#64FFDA] font-bold text-sm mb-1">
              Quick Insight
            </h4>
            <p className="text-[#8892B0] text-sm leading-relaxed">
              Your current portfolio is heavily focused on{" "}
              <span className="text-[#E6F1FF] font-bold">
                {topCategory.name}
              </span>{" "}
              (
              {totalProjects > 0
                ? ((topCategory.value / totalProjects) * 100).toFixed(0)
                : 0}
              % of your work). Keep adding projects to balance your tech stack.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/LindungiLw"
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-br from-[#112240] to-[#0A192F] border border-[#233554] p-6 rounded-2xl flex justify-between items-center group cursor-pointer hover:border-[#64FFDA] transition-colors"
        >
          <div>
            <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
              GitHub Live Status
            </h4>
            <div className="flex gap-6">
              <div>
                <p className="text-[#8892B0] text-[10px] uppercase font-mono tracking-wider">
                  Repositories
                </p>
                <p className="text-2xl font-bold text-[#E6F1FF]">
                  {githubStats.repos}
                </p>
              </div>
              <div>
                <p className="text-[#8892B0] text-[10px] uppercase font-mono tracking-wider">
                  Stars
                </p>
                <p className="text-2xl font-bold text-[#F97316]">
                  {githubStats.stars}
                </p>
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#233554] flex items-center justify-center group-hover:border-[#64FFDA] group-hover:text-[#64FFDA] transition-colors text-[#8892B0]">
            →
          </div>
        </a>
      </div>
    </div>
  );
}
