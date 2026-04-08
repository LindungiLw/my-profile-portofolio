"use client";
import React from "react";
import { projects } from "@/data/projects";
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

const commitData = [
  { name: "W1", val: 40 },
  { name: "W2", val: 90 },
  { name: "W3", val: 65 },
  { name: "W4", val: 110 },
  { name: "W5", val: 80 },
];

export default function OverviewPage() {
  const chartData = [
    {
      name: "Web",
      value: projects.filter((p) => p.category === "Web").length || 1,
      color: "#F97316",
    },
    {
      name: "Mobile",
      value: projects.filter((p) => p.category === "Mobile").length || 1,
      color: "#06B6D4",
    },
    {
      name: "UI/UX",
      value: projects.filter((p) => p.category === "UI/UX").length || 1,
      color: "#64748B",
    },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-10">Analytics Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#112240] border border-[#233554] p-6 rounded-2xl h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={commitData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#233554"
                vertical={false}
              />
              <XAxis dataKey="name" stroke="#495670" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#112240", border: "none" }}
              />
              <Area
                type="monotone"
                dataKey="val"
                stroke="#F97316"
                fill="#F97316"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#112240] border border-[#233554] p-6 rounded-2xl flex flex-col items-center justify-center">
          <PieChart width={160} height={160}>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-4 text-xs font-mono text-[#8892B0] flex gap-4">
            <span>Web</span>
            <span>Mobile</span>
            <span>UI/UX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
