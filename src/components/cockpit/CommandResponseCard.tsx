"use client";

import { CardType } from "@/lib/types";

interface CommandResponseCardProps {
  cardType: CardType;
  content: string;
}

export default function CommandResponseCard({ cardType, content }: CommandResponseCardProps) {
  const cardStyles: Record<CardType, string> = {
    "command-menu": "font-mono text-xs text-[#43C174] bg-[#0F141B] border-[#43C174]/30",
    "status-card": "font-mono text-xs text-[#A9B4C0] bg-[#121922] border-[#263140]",
    "git-card": "font-mono text-xs text-[#A9B4C0] bg-[#121922] border-[#263140]",
    "health-card": "font-mono text-xs text-[#A9B4C0] bg-[#121922] border-[#263140]",
    "checklist-card": "font-mono text-xs text-[#43C174] bg-[#121922] border-[#263140]",
    "log-card": "font-mono text-xs text-[#6F7C8B] bg-[#0F141B] border-[#263140]",
    "plain": "text-sm text-[#E6EDF5]",
    "memory-card": "font-mono text-xs text-[#43C174] bg-[#121922] border-[#43C174]/30",
    "session-log-card": "font-mono text-xs text-[#A9B4C0] bg-[#121922] border-[#263140]",
    "summary-card": "font-mono text-xs text-[#F47A20] bg-[#121922] border-[#F47A20]/30",
    "timeline-card": "font-mono text-xs text-[#A9B4C0] bg-[#121922] border-[#263140]",
  };

  if (!cardType || cardType === "plain") {
    return <p className="text-sm text-[#E6EDF5] leading-relaxed whitespace-pre-wrap">{content}</p>;
  }

  return (
    <pre className={`p-3 rounded-lg border ${cardStyles[cardType]} overflow-x-auto`}>
      {content}
    </pre>
  );
}