"use client";

import MessageBubble from "./MessageBubble";
import { Message } from "@/lib/types";

interface ChatThreadProps {
  messages: Message[];
}

export default function ChatThread({ messages }: ChatThreadProps) {
  return (
    <div className="space-y-0">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          type={msg.type}
          content={msg.content}
          timestamp={msg.timestamp}
          artifact={msg.artifact}
        />
      ))}
    </div>
  );
}