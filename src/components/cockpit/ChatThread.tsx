"use client";

import MessageBubble from "./MessageBubble";
import MockHistory from "./MockHistory";

export default function ChatThread() {
  const messages = MockHistory();

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