"use client";

import { WorkflowStep } from "@/lib/types";

interface WorkflowBadgesProps {
  currentStep: WorkflowStep;
}

const workflowSteps: { id: number; name: WorkflowStep }[] = [
  { id: 1, name: "Read" },
  { id: 2, name: "Plan" },
  { id: 3, name: "Approve" },
  { id: 4, name: "Build" },
  { id: 5, name: "Verify" },
  { id: 6, name: "Commit" },
  { id: 7, name: "Push" },
];

const stepOrder: Record<WorkflowStep, number> = {
  Read: 0,
  Plan: 1,
  Approve: 2,
  Build: 3,
  Verify: 4,
  Commit: 5,
  Push: 6,
};

export default function WorkflowBadges({ currentStep }: WorkflowBadgesProps) {
  const currentIndex = stepOrder[currentStep];

  return (
    <div className="flex items-center gap-0">
      {workflowSteps.map((step, idx) => {
        const completed = idx < currentIndex;
        const isCurrent = idx === currentIndex;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Badge */}
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                isCurrent
                  ? "bg-[#F47A20]/20 text-[#F47A20] border border-[#F47A20] shadow-[0_0_15px_rgba(244,122,32,0.3)]"
                  : completed
                  ? "bg-[#43C174]/10 text-[#43C174] border border-[#43C174]/30"
                  : "bg-[#151D27] text-[#6F7C8B] border border-[#263140]"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isCurrent
                    ? "bg-[#F47A20] text-[#0B0F14]"
                    : completed
                    ? "bg-[#43C174] text-[#0B0F14]"
                    : "bg-[#263140] text-[#6F7C8B]"
                }`}
              >
                {completed ? "✓" : step.id}
              </span>
              <span>{step.name}</span>
            </div>

            {/* Connecting Line */}
            {idx < workflowSteps.length - 1 && (
              <div className="mx-1 flex items-center">
                {completed ? (
                  <div className="h-px w-4 bg-[#43C174]/50"></div>
                ) : isCurrent ? (
                  <div className="h-px w-4 bg-[#263140]">
                    <div className="h-full w-1/2 bg-[#F47A20]/50 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="h-px w-4 bg-[#263140] border-dashed border-t border-[#6F7C8B]/30"></div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}