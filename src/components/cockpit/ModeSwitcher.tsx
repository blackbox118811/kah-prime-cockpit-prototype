"use client";

import { useState } from "react";

type Mode = "Plan" | "Build" | "Verify";

export default function ModeSwitcher() {
  const [mode, setMode] = useState<Mode>("Plan");

  const modeColors = {
    Plan: "bg-yellow-600 hover:bg-yellow-700",
    Build: "bg-blue-600 hover:bg-blue-700",
    Verify: "bg-green-600 hover:bg-green-700",
  };

  return (
    <div className="flex gap-1">
      {(Object.keys(modeColors) as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`px-3 py-1 text-xs rounded-full text-white transition-colors ${
            mode === m ? modeColors[m] : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {m} Mode
        </button>
      ))}
    </div>
  );
}
