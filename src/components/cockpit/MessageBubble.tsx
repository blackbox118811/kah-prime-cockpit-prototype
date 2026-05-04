"use client";

interface MessageBubbleProps {
  type: "user" | "agent" | "system";
  content: string;
  timestamp?: string;
  artifact?: string;
}

export default function MessageBubble({ type, content, timestamp, artifact }: MessageBubbleProps) {
  const typeStyles = {
    user: {
      bg: "bg-[#151D27]",
      border: "border-[#263140]",
      icon: "◈",
      label: "Operator",
      labelColor: "text-[#F47A20]",
      statusDot: "bg-[#F47A20]",
    },
    agent: {
      bg: "bg-[#121922]",
      border: "border-[#1F2A36]",
      icon: "◉",
      label: "Agent",
      labelColor: "text-[#43C174]",
      statusDot: "bg-[#43C174]",
    },
    system: {
      bg: "bg-[#0F141B]",
      border: "border-[#263140]",
      icon: "⚡",
      label: "System",
      labelColor: "text-[#A9B4C0]",
      statusDot: "bg-[#A9B4C0]",
    },
  };

  const style = typeStyles[type];

  return (
    <div className="group relative">
      <div className="flex gap-3 py-3 hover:bg-[#151D27]/30 rounded-lg transition-colors">
        {/* Actor Icon */}
        <div className="flex-shrink-0 w-8 flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-lg ${style.bg} border ${style.border} flex items-center justify-center`}>
            <span className={`text-sm ${style.labelColor}`}>{style.icon}</span>
          </div>
          <span className={`w-1.5 h-1.5 rounded-full ${style.statusDot}`}></span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-semibold ${style.labelColor}`}>{style.label}</span>
            {timestamp && <span className="text-[10px] text-[#6F7C8B] font-mono">{timestamp}</span>}
            <span className="flex-1 h-px bg-[#263140]"></span>
            {artifact && (
              <span className="text-[10px] px-2 py-0.5 bg-[#263140] rounded text-[#A9B4C0] flex items-center gap-1">
                <span>📄</span>
                <span>{artifact}</span>
              </span>
            )}
          </div>

          {/* Message Body */}
          <div className={`p-3 rounded-lg ${style.bg} border ${style.border}`}>
            <p className="text-sm text-[#E6EDF5] leading-relaxed">{content}</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex-shrink-0 pr-2">
          <span className="text-[10px] text-[#6F7C8B] opacity-0 group-hover:opacity-100 transition-opacity">●</span>
        </div>
      </div>
      
      {/* Subtle Row Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#263140] to-transparent"></div>
    </div>
  );
}