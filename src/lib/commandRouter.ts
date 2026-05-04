import { CommandResult, Message, CockpitMode, WorkflowStep, CardType } from "./types";

const getTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

let messageId = 10;

const createMessage = (type: Message["type"], content: string, cardType?: CardType, missionUpdate?: CommandResult["missionUpdate"]): Message => ({
  id: messageId++,
  type,
  content,
  timestamp: getTime(),
  cardType,
  missionUpdate,
});

export const executeCommand = (input: string, currentMode: CockpitMode, currentWorkflow: WorkflowStep, currentMission: string, currentProgress: number): CommandResult => {
  const trimmed = input.trim().toLowerCase();

  switch (trimmed) {
    case "/help": {
      const helpContent = `┌─ Available Commands ──────────────┐
│ /status   │ Show cockpit status   │
│ /plan     │ Activate Plan mode    │
│ /build    │ Activate Build mode   │
│ /verify   │ Activate Verify mode  │
│ /git      │ Show Git status       │
│ /health   │ Show system health    │
│ /clear    │ Clear message feed    │
└───────────────────────────────────┘
Normal text is treated as operator input.`;
      return { message: createMessage("system", helpContent, "command-menu") };
    }

    case "/status": {
      const statusContent = `┌─ Cockpit Status ───────────────────┐
│ Mode          │ ${currentMode.padEnd(16)}│
│ Workflow Step │ ${currentWorkflow.padEnd(16)}│
│ Mission       │ ${currentMission.substring(0, 16).padEnd(16)}│
│ Progress      │ ${String(currentProgress + "%").padEnd(16)}│
│ Git Status    │ Clean               │
│ Health        │ OK                  │
│ Backend       │ Not connected       │
│ AI Provider   │ Not connected       │
└─────────────────────────────────────┘`;
      return { message: createMessage("agent", statusContent, "status-card") };
    }

    case "/plan": {
      return {
        message: createMessage("agent", `[Plan Mode Activated]

Planning mode enabled.
Ready to receive task specifications.

⚠ No terminal execution performed.
🔒 Safety gate: Active`, "status-card", { missionTitle: "Planning phase", missionProgress: 30 }),
        newMode: "Plan" as CockpitMode,
        newWorkflowStep: "Plan" as WorkflowStep,
        missionUpdate: { missionTitle: "Planning phase", missionProgress: 30 },
      };
    }

    case "/build": {
      return {
        message: createMessage("agent", `[Build Mode Activated]

Build mode enabled.
Simulating build process...

[INFO] No terminal execution performed.
[INFO] This is a safe mock environment.
[INFO] Use /verify to run mock verification.

🔒 Safety gate: Active`, "status-card", { missionTitle: "Building implementation", missionProgress: 55 }),
        newMode: "Build" as CockpitMode,
        newWorkflowStep: "Build" as WorkflowStep,
        missionUpdate: { missionTitle: "Building implementation", missionProgress: 55 },
      };
    }

    case "/verify": {
      const verifyContent = `[Verify Mode Activated]

┌─ Verification Checklist ─────────────┐
│ ☑ Lint check      │ Mock ready      │
│ ☑ Build check     │ Mock ready      │
│ ☑ Diff review     │ Mock ready      │
│ ☐ Commit approval │ Required       │
│ ☐ Push approval   │ Required        │
└──────────────────────────────────────┘

⚠ No actual verification performed.`;
      return {
        message: createMessage("agent", verifyContent, "checklist-card", { missionTitle: "Verification phase", missionProgress: 75 }),
        newMode: "Verify" as CockpitMode,
        newWorkflowStep: "Verify" as WorkflowStep,
        missionUpdate: { missionTitle: "Verification phase", missionProgress: 75 },
      };
    }

    case "/git": {
      const gitContent = `┌─ Git Status ────────────────────────┐
│ Branch        │ main              │
│ Remote        │ origin/main       │
│ Working Tree  │ Clean             │
│ Last Commit   │ 1f91ae0           │
│ Mode          │ Read-only mock    │
└─────────────────────────────────────┘

🔒 No git commands executed.`;
      return { message: createMessage("agent", gitContent, "git-card") };
    }

    case "/health": {
      const healthContent = `┌─ System Health ─────────────────────┐
│ UI              │ OK ✓            │
│ Command Router  │ OK ✓            │
│ Backend         │ Not connected ⚠ │
│ AI Provider     │ Not connected ⚠ │
│ Terminal        │ Disabled ✗      │
│ Safety Gate     │ Active ✓        │
└─────────────────────────────────────┘`;
      return { message: createMessage("agent", healthContent, "health-card") };
    }

    case "/clear": {
      return {
        message: createMessage("system", "[Feed Cleared] Message history cleared. Current mode preserved: " + currentMode, "log-card"),
        clearFeed: true,
      };
    }

    default: {
      if (trimmed.startsWith("/")) {
        return { message: createMessage("system", `Unknown command: ${input}\n\nType /help for available commands.`, "log-card") };
      }
      return {
        message: createMessage("agent", `Received: "${input}"

This is currently mock-only.
Use /help to view available commands.

◈ Commander`, "plain"),
      };
    }
  }
};