"use client";

import React from "react";
import { currentStatus } from "@/data/status";

export const RealtimeStatus = () => {
  return (
    <div className="bg-surface/80 backdrop-blur-sm border border-surface-light p-5 rounded-2xl w-full max-w-sm shadow-xl font-mono text-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="flex items-center gap-3 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
        </span>
        <span className="text-textMain font-bold uppercase tracking-widest text-xs">
          Live Status
        </span>
      </div>

      <div className="space-y-3 text-textMuted">
        <div className="flex flex-col">
          <span className="text-xs text-primary mb-1">
            {currentStatus.activity.type}:
          </span>
          <a
            href={currentStatus.activity.figmaLink}
            target="_blank"
            rel="noreferrer"
            className="text-textMain hover:text-primary transition-colors truncate"
          >
            {currentStatus.activity.project}
          </a>

          <div className="w-full bg-main rounded-full h-1.5 mt-2 overflow-hidden border border-surface-light">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${currentStatus.activity.progress}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <p className="text-right text-[10px] mt-1 text-primary tabular-nums">
            {currentStatus.activity.progress}% Completed
          </p>
        </div>

        <div className="pt-2 border-t border-surface-light/50 flex items-center gap-2">
          <span aria-hidden="true">🎧</span>
          <span className="truncate text-xs">
            Listening to:{" "}
            <span className="text-textMain">{currentStatus.listeningTo}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
