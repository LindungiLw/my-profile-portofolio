"use client";

import React from "react";
import { currentStatus } from "@/data/status";

export const RealtimeStatus = () => {
  return (
    <div className="bg-[#112240]/80 backdrop-blur-sm border border-[#233554] p-5 rounded-2xl w-full max-w-sm shadow-xl font-mono text-sm relative overflow-hidden group">
      {/* Efek Garis Hijau di Atas */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#64FFDA] to-transparent opacity-50"></div>

      <div className="flex items-center gap-3 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64FFDA] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#64FFDA]"></span>
        </span>
        <span className="text-[#E6F1FF] font-bold uppercase tracking-widest text-xs">
          Live Status
        </span>
      </div>

      <div className="space-y-3 text-[#8892B0]">
        <div className="flex flex-col">
          <span className="text-xs text-[#64FFDA] mb-1">
            {currentStatus.activity.type}:
          </span>
          <a
            href={currentStatus.activity.figmaLink}
            target="_blank"
            rel="noreferrer"
            className="text-[#E6F1FF] hover:text-[#64FFDA] transition-colors truncate"
          >
            {currentStatus.activity.project}
          </a>

          {/* Progress Bar Dinamis */}
          <div className="w-full bg-[#0A192F] rounded-full h-1.5 mt-2 overflow-hidden border border-[#233554]">
            <div
              className="bg-[#64FFDA] h-1.5 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${currentStatus.activity.progress}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-right text-[10px] mt-1 text-[#64FFDA]">
            {currentStatus.activity.progress}% Completed
          </p>
        </div>

        <div className="pt-2 border-t border-[#233554]/50 flex items-center gap-2">
          <span>🎧</span>
          <span className="truncate text-xs">
            Listening to:{" "}
            <span className="text-[#E6F1FF]">{currentStatus.listeningTo}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
