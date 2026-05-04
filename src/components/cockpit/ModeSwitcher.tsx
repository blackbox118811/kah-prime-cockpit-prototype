"use client";

import { CockpitMode } from "@/lib/types";

interface ModeSwitcherProps {
  currentMode: CockpitMode;
  onModeChange?: (mode: CockpitMode) => void;
}

const modeStyles = {
  Plan: {
    active: "bg-[#F47A20]/20 text-[#F47A20] border-[#F47A20]",
    inactive: "bg-[#151D27] text-[#6F7C8B] border-[#263140] hover:border-[#F47A20]/50",
  },
  Build: {
    active: "bg-[#43C174]/20 text-[#43C174] border-[#43C174]",
    inactive: "bg-[#151D27] text-[#6F7C8B] border-[#263140] hover:border-[#43C174]/50",
  },
  Verify: {
    active: "bg-[#A9B4C0]/20 text-[#A9B4C0] border-[#A9B4C0]",
    inactive: "bg-[#151D27] text-[#6F7C8B] border-[#263140] hover:border-[#A9B4C0]/50",
  },
};

export default function ModeSwitcher({ currentMode, onModeChange }: ModeSwitcherProps) {
  const modes = ["Plan", "Build", "Verify"] as CockpitMode[];

  return (
    <div className="flex gap-1">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => onModeChange?.(m)}
          className={`px-3 py-1 text-xs rounded border transition-all ${
            currentMode === m
              ? modeStyles[m].active
              : modeStyles[m].inactive
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}