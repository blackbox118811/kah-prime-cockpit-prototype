export type MessageType = "user" | "agent" | "system";

export type CardType = "command-menu" | "status-card" | "git-card" | "health-card" | "checklist-card" | "log-card" | "plain" | "memory-card" | "session-log-card" | "summary-card" | "timeline-card";

export interface Message {
  id: number;
  type: MessageType;
  content: string;
  timestamp?: string;
  artifact?: string;
  cardType?: CardType;
  missionUpdate?: {
    missionTitle?: string;
    missionProgress?: number;
  };
}

export type CockpitMode = "Plan" | "Build" | "Verify";

export type WorkflowStep = "Read" | "Plan" | "Approve" | "Build" | "Verify" | "Commit" | "Push";

export interface MissionState {
  title: string;
  progress: number;
  activeMode: CockpitMode;
  currentStep: WorkflowStep;
  lastCommand: string;
  logs: string[];
}

export interface CommandResult {
  message: Message;
  newMode?: CockpitMode;
  newWorkflowStep?: WorkflowStep;
  clearFeed?: boolean;
  resetSession?: boolean;
  missionUpdate?: {
    missionTitle?: string;
    missionProgress?: number;
  };
}

export interface CockpitState {
  mode: CockpitMode;
  workflowStep: WorkflowStep;
  messages: Message[];
  mission: MissionState;
}

export type SessionEventType =
  | "command_executed"
  | "mode_changed"
  | "workflow_changed"
  | "safety_notice"
  | "feed_cleared"
  | "session_reset"
  | "system_message";

export interface SessionEvent {
  id: string;
  timestamp: string;
  type: SessionEventType;
  label: string;
  detail: string;
  command?: string;
  mode?: CockpitMode;
  workflowStep?: WorkflowStep;
}

export interface MissionMemory {
  sessionEvents: SessionEvent[];
  commandCount: number;
  lastCommand: string;
  modeHistory: CockpitMode[];
  sessionStartTime: string;
}

export interface MemorySnapshot {
  version: string;
  memory: MissionMemory;
  savedAt: string;
}

export interface SessionSummary {
  totalCommands: number;
  modeDistribution: Record<CockpitMode, number>;
  duration: string;
  topCommands: string[];
  eventCount: number;
}