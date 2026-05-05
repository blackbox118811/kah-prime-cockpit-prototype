import { SessionEvent, SessionEventType, MissionMemory, SessionSummary, CockpitMode, MemorySnapshot } from "./types";

const STORAGE_KEY = "kah-prime-session-memory-v1";
const STORAGE_VERSION = "v1";
const MAX_SESSION_EVENTS = 100;

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString();
};

export const createSessionEvent = (
  type: SessionEventType,
  label: string,
  detail: string,
  options?: {
    command?: string;
    mode?: CockpitMode;
    workflowStep?: string;
  }
): SessionEvent => ({
  id: generateId(),
  timestamp: getTimestamp(),
  type,
  label,
  detail,
  command: options?.command,
  mode: options?.mode,
  workflowStep: options?.workflowStep as CockpitMode | undefined,
});

export const deriveMissionMemory = (events: SessionEvent[]): MissionMemory => {
  const modeHistory: CockpitMode[] = [];
  let lastCommand = "";

  events.forEach((event) => {
    if (event.type === "mode_changed" && event.mode) {
      modeHistory.push(event.mode);
    }
    if (event.command) {
      lastCommand = event.command;
    }
  });

  const commandEvents = events.filter((e) => e.type === "command_executed");

  return {
    sessionEvents: events,
    commandCount: commandEvents.length,
    lastCommand,
    modeHistory,
    sessionStartTime: events.length > 0 ? events[0].timestamp : getTimestamp(),
  };
};

export const deriveSessionSummary = (memory: MissionMemory): SessionSummary => {
  const modeDistribution: Record<CockpitMode, number> = {
    Plan: 0,
    Build: 0,
    Verify: 0,
  };

  const commandCounts: Record<string, number> = {};

  memory.sessionEvents.forEach((event) => {
    if (event.mode) {
      modeDistribution[event.mode]++;
    }
    if (event.command) {
      commandCounts[event.command] = (commandCounts[event.command] || 0) + 1;
    }
  });

  const topCommands = Object.entries(commandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([cmd]) => cmd);

  const startTime = memory.sessionStartTime ? new Date(memory.sessionStartTime) : new Date();
  const endTime = new Date();
  const durationMs = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(durationMs / 3600000);
  const minutes = Math.floor((durationMs % 3600000) / 60000);

  let duration = "";
  if (hours > 0) {
    duration = `${hours}h ${minutes}m`;
  } else {
    duration = `${minutes}m`;
  }

  return {
    totalCommands: memory.commandCount,
    modeDistribution,
    duration,
    topCommands,
    eventCount: memory.sessionEvents.length,
  };
};

export const loadSessionMemory = (): MissionMemory | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const snapshot: MemorySnapshot = JSON.parse(stored);
    if (snapshot.version !== STORAGE_VERSION) {
      return null;
    }

    return snapshot.memory;
  } catch {
    return null;
  }
};

export const saveSessionMemory = (memory: MissionMemory): void => {
  if (typeof window === "undefined") {
    return;
  }

  const trimmedEvents = memory.sessionEvents.slice(-MAX_SESSION_EVENTS);
  const trimmedMemory: MissionMemory = {
    ...memory,
    sessionEvents: trimmedEvents,
  };

  const snapshot: MemorySnapshot = {
    version: STORAGE_VERSION,
    memory: trimmedMemory,
    savedAt: getTimestamp(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    console.warn("Failed to save session memory to localStorage");
  }
};

export const clearSessionMemory = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.warn("Failed to clear session memory from localStorage");
  }
};

export const getStorageInfo = (): { stored: boolean; eventCount: number } => {
  const memory = loadSessionMemory();
  return {
    stored: memory !== null,
    eventCount: memory?.sessionEvents.length || 0,
  };
};