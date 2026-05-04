"use client";

interface MessageBubbleProps {
  type: "user" | "agent" | "system";
  content: string;
  timestamp?: string;
}

export default function MessageBubble({ type, content, timestamp }: MessageBubbleProps) {
  const bgColor =
    type === "user"
      ? "bg-blue-600"
      : type === "agent"
      ? "bg-gray-700"
      : "bg-yellow-800";

  const align = type === "user" ? "ml-auto" : "mr-auto";
  const textColor = type === "system" ? "text-yellow-200" : "text-gray-100";

  return (
    <div className={`max-w-[80%] ${align}`}>
      <div className={`p-3 rounded-lg ${bgColor} ${textColor}`}>
        <p className="text-sm">{content}</p>
        {timestamp && (
          <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
        )}
      </div>
    </div>
  );
}
