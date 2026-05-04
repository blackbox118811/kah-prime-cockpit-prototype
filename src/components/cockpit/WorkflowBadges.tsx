"use client";

const workflowSteps = [
  { id: 1, name: "Read", completed: true, current: false },
  { id: 2, name: "Plan", completed: true, current: true },
  { id: 3, name: "Approve", completed: false, current: false },
  { id: 4, name: "Build", completed: false, current: false },
  { id: 5, name: "Verify", completed: false, current: false },
  { id: 6, name: "Commit", completed: false, current: false },
  { id: 7, name: "Push", completed: false, current: false },
];

export default function WorkflowBadges() {
  return (
    <div className="flex items-center gap-0">
      {workflowSteps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          {/* Step Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              step.current
                ? "bg-[#F47A20]/20 text-[#F47A20] border border-[#F47A20] shadow-[0_0_15px_rgba(244,122,32,0.3)]"
                : step.completed
                ? "bg-[#43C174]/10 text-[#43C174] border border-[#43C174]/30"
                : "bg-[#151D27] text-[#6F7C8B] border border-[#263140]"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step.current
                  ? "bg-[#F47A20] text-[#0B0F14]"
                  : step.completed
                  ? "bg-[#43C174] text-[#0B0F14]"
                  : "bg-[#263140] text-[#6F7C8B]"
              }`}
            >
              {step.completed ? "✓" : step.id}
            </span>
            <span>{step.name}</span>
          </div>

          {/* Connecting Line */}
          {idx < workflowSteps.length - 1 && (
            <div className="mx-1 flex items-center">
              {step.completed ? (
                <div className="h-px w-4 bg-[#43C174]/50"></div>
              ) : step.current ? (
                <div className="h-px w-4 bg-[#263140]">
                  <div className="h-full w-1/2 bg-[#F47A20]/50 animate-pulse"></div>
                </div>
              ) : (
                <div className="h-px w-4 bg-[#263140] border-dashed border-t border-[#6F7C8B]/30"></div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}