import { CommandResult, Message, CockpitMode, WorkflowStep, CardType } from "./types";
import { cockpitContext } from "./cockpitContext";

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
      const ctx = cockpitContext;
      const missionLine = currentMission.length > 20 
        ? `│ Mission       │ ${currentMission.substring(0, 20)}... │`
        : `│ Mission       │ ${currentMission.padEnd(20)}│`;
      const statusContent = `┌─ Cockpit Status (Read-only Snapshot) ─┐
│ Mode          │ ${currentMode.padEnd(18)}│
│ Workflow Step │ ${currentWorkflow.padEnd(18)}│
${missionLine}
│ Progress      │ ${String(currentProgress + "%").padEnd(18)}│
│ Git Status    │ ${ctx.git.workingTree.padEnd(18)}│
│ Health        │ ${ctx.system.uiStatus.padEnd(18)}│
│ Backend       │ ${ctx.system.backendStatus.padEnd(18)}│
│ AI Provider   │ ${ctx.system.aiProviderStatus.padEnd(18)}│
└─────────────────────────────────────────────┘
${ctx.meta.snapshotType} - ${ctx.meta.lastVerifiedAt}`;
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
      const ctx = cockpitContext.git;
      const gitContent = `┌─ Git Status ────────────────────────┐
│ Branch        │ ${ctx.branch.padEnd(17)}│
│ Remote        │ ${ctx.remote.padEnd(17)}│
│ Working Tree  │ ${ctx.workingTree.padEnd(17)}│
│ Latest Known  │ ${ctx.latestKnownCommit.padEnd(17)}│
│ Mode          │ ${ctx.mode.padEnd(17)}│
└─────────────────────────────────────┘

🔒 ${cockpitContext.meta.snapshotType}
⚠ No git commands executed.`;
      return { message: createMessage("agent", gitContent, "git-card") };
    }

    case "/health": {
      const ctx = cockpitContext.system;
      const healthContent = `┌─ System Health ─────────────────────┐
│ UI              │ ${ctx.uiStatus.padEnd(15)}│
│ Command Router  │ ${ctx.commandRouterStatus.padEnd(15)}│
│ Backend         │ ${ctx.backendStatus.padEnd(15)}│
│ AI Provider     │ ${ctx.aiProviderStatus.padEnd(15)}│
│ Terminal        │ ${ctx.terminalStatus.padEnd(15)}│
│ Safety Gate     │ ${ctx.safetyGate.padEnd(15)}│
└─────────────────────────────────────┘

${cockpitContext.meta.snapshotType}`;
      return { message: createMessage("agent", healthContent, "health-card") };
    }

    case "/clear": {
      return {
        message: createMessage("system", "[Feed Cleared] Message history cleared. Current mode preserved: " + currentMode, "log-card"),
        clearFeed: true,
      };
    }

    default: {
      const inputParts = input.trim().split(/\s+/);
      const slashCount = inputParts.filter(p => p.startsWith("/")).length;
      
      if (slashCount > 1) {
        return { message: createMessage("system", "Multiple commands in one line are not supported yet.\n\nRun one command at a time.", "log-card") };
      }
      
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