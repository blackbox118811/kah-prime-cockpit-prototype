"use client";

import { useState } from "react";

const workflowSteps = [
  { id: 1, name: "Read", completed: true },
  { id: 2, name: "Plan", completed: false },
  { id: 3, name: "Approve", completed: false },
  { id: 4, name: "Build", completed: false },
  { id: 5, name: "Verify", completed: false },
  { id: 6, name: "Commit", completed: false },
  { id: 7, name: "Push", completed: false },
];

export default function WorkflowBadges() {
  const [steps, setSteps] = useState(workflowSteps);

  return (
    <div className="space-y-1 text-sm">
      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-2">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
              step.completed ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-400"
            }`}
          >
            {step.completed ? "✓" : step.id}
          </span>
          <span className={step.completed ? "text-gray-300" : "text-gray-500"}>
            {step.name}
          </span>
        </div>
      ))}
    </div>
  );
}
