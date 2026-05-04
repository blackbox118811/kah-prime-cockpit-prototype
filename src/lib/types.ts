export type MessageType = "user" | "agent" | "system";

export interface Message {
  id: number;
  type: MessageType;
  content: string;
  timestamp?: string;
  artifact?: string;
}

export type CockpitMode = "Plan" | "Build" | "Verify";

export type WorkflowStep = "Read" | "Plan" | "Approve" | "Build" | "Verify" | "Commit" | "Push";

export interface CommandResult {
  message: Message;
  newMode?: CockpitMode;
  newWorkflowStep?: WorkflowStep;
  clearFeed?: boolean;
}

export interface CockpitState {
  mode: CockpitMode;
  workflowStep: WorkflowStep;
  messages: Message[];
}