export type MessageType = "user" | "agent" | "system";

export type CardType = "command-menu" | "status-card" | "git-card" | "health-card" | "checklist-card" | "log-card" | "plain";

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