"use client";

import { useState } from "react";

export default function CommandInput() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    console.log("Mock submit:", input);
    setInput("");
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
        <span className="px-2 py-0.5 bg-[#151D27] rounded text-[#A9B4C0]">analyze this</span>
        <span className="px-2 py-0.5 bg-[#151D27] rounded text-[#A9B4C0]">write tests</span>
        <span className="px-2 py-0.5 bg-[#151D27] rounded text-[#A9B4C0]">refactor</span>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 bg-[#F47A20]/20 text-[#F47A20] border border-[#F47A20] text-xs font-semibold rounded-lg hover:bg-[#F47A20]/30 transition-all">
          Plan
        </button>
        <button className="px-4 py-2 bg-[#151D27] text-[#A9B4C0] border border-[#263140] text-xs font-medium rounded-lg hover:border-[#F47A20]/50 hover:text-[#E6EDF5] transition-all">
          Build
        </button>
        <button className="px-4 py-2 bg-[#151D27] text-[#A9B4C0] border border-[#263140] text-xs font-medium rounded-lg hover:border-[#F47A20]/50 hover:text-[#E6EDF5] transition-all">
          Review
        </button>
        <button className="px-4 py-2 bg-[#151D27] text-[#A9B4C0] border border-[#263140] text-xs font-medium rounded-lg hover:border-[#F47A20]/50 hover:text-[#E6EDF5] transition-all">
          Run
        </button>
      </div>
    </div>
  );
}