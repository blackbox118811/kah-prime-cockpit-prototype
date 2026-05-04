"use client";

export interface Message {
  id: number;
  type: "user" | "agent" | "system";
  content: string;
  timestamp?: string;
  artifact?: string;
}

export default function MockHistory(): Message[] {
  return [
    {
      id: 1,
      type: "system" as const,
      content: "[Read] docs/OPEN_SOURCE_UI_BASE_AUDIT.md loaded",
      timestamp: "09:00",
    },
    {
      id: 2,
      type: "user" as const,
      content: "Summarize the top 3 UI candidates for KAH Prime cockpit",
      timestamp: "09:01",
    },
    {
      id: 3,
      type: "agent" as const,
      content:
        "Based on the audit, top 3 candidates are:\n1. CloudCLI (siteboon/claudecodeui) — Strong operator workspace (terminal, git, files)\n2. Chatbot UI (mckaywrigley/chatbot-ui) — Strong chat UX (AI SDK, Ollama)\n3. Open Canvas (langchain-ai/open-canvas) — Best canvas/artifact patterns (archived)",
      timestamp: "09:02",
    },
    {
      id: 4,
      type: "system" as const,
      content: "[Plan] Phase 2 cockit UI mock thread complete, ready for Phase 3",
      timestamp: "09:03",
    },
  ];
}
