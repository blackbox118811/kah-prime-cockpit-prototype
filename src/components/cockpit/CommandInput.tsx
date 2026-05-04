"use client";

import { useState } from "react";
import { CockpitMode } from "@/lib/types";

interface CommandInputProps {
  onCommand: (input: string) => void;
  currentMode: CockpitMode;
}

export default function CommandInput({ onCommand, currentMode }: CommandInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input);
    setInput("");
  };

  const handleQuickCommand = (cmd: string) => {
    onCommand(cmd);
  };

  return (
    <div className="space-y-3">
      {/* Main Input */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command or prompt..."
            className="w-full px-4 py-3 rounded-lg bg-[#0F141B] border border-[#263140] text-[#E6EDF5] placeholder-[#6F7C8B] focus:outline-none focus:border-[#F47A20] focus:ring-2 focus:ring-[#F47A20]/20 transition-all shadow-[0_0_20px_rgba(244,122,32,0.1)]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-[#6F7C8B] text-xs">
            <span className="cursor-pointer hover:text-[#F47A20] px-1.5 py-0.5 rounded bg-[#151D27]" title="Keyboard shortcuts">?</span>
          </div>
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-[#F47A20] text-[#0B0F14] font-bold text-sm rounded-lg hover:bg-[#E86A12] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(244,122,32,0.3)]"
        >
          <span>Send</span>
          <span className="text-lg">→</span>
        </button>
      </form>

      {/* Helper Hints */}
      <div className="flex items-center gap-2 text-[10px] text-[#6F7C8B]">
        <span>Try:</span>
        <button onClick={() => handleQuickCommand("/help")} className="px-2 py-0.5 bg-[#151D27] rounded text-[#A9B4C0] hover:text-[#F47A20] transition-colors">/help</button>
        <button onClick={() => handleQuickCommand("/status")} className="px-2 py-0.5 bg-[#151D27] rounded text-[#A9B4C0] hover:text-[#F47A20] transition-colors">/status</button>
        <button onClick={() => handleQuickCommand("/health")} className="px-2 py-0.5 bg-[#151D27] rounded text-[#A9B4C0] hover:text-[#F47A20] transition-colors">/health</button>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => handleQuickCommand("/plan")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            currentMode === "Plan" 
              ? "bg-[#F47A20] text-[#0B0F14]" 
              : "bg-[#F47A20]/20 text-[#F47A20] border border-[#F47A20] hover:bg-[#F47A20]/30"
          }`}
        >
          Plan
        </button>
        <button 
          onClick={() => handleQuickCommand("/build")}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
            currentMode === "Build" 
              ? "bg-[#43C174] text-[#0B0F14]" 
              : "bg-[#151D27] text-[#A9B4C0] border border-[#263140] hover:border-[#43C174]/50 hover:text-[#E6EDF5]"
          }`}
        >
          Build
        </button>
        <button 
          onClick={() => handleQuickCommand("/verify")}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
            currentMode === "Verify" 
              ? "bg-[#A9B4C0] text-[#0B0F14]" 
              : "bg-[#151D27] text-[#A9B4C0] border border-[#263140] hover:border-[#A9B4C0]/50 hover:text-[#E6EDF5]"
          }`}
        >
          Verify
        </button>
      </div>
    </div>
  );
}