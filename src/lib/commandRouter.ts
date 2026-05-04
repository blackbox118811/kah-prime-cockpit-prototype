import { CommandResult, Message, CockpitMode, WorkflowStep } from "./types";

const getTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
};

let messageId = 10;

const createMessage = (type: Message["type"], content: string): Message => ({
  id: messageId++,
  type,
  content,
  timestamp: getTime(),
});

export const executeCommand = (input: string, currentMode: CockpitMode, currentWorkflow: WorkflowStep): CommandResult => {
  const trimmed = input.trim().toLowerCase();

  switch (trimmed) {
    case "/help": {
      const helpContent = `Available Commands:
/status   - Show cockpit status
/plan     - Activate Plan mode
/build    - Activate Build mode  
/verify   - Activate Verify mode
/git      - Show Git status
/health   - Show system health
/clear    - Clear message feed

Normal text is treated as operator input.`;
      return { message: createMessage("system", helpContent) };
    }

    case "/status": {
      const statusContent = `Cockpit Status:
• Mode: ${currentMode}
• Git Status: Clean
• Health: OK
• Current Mission: UI restyle complete
• Workflow Step: ${currentWorkflow}`;
      return { message: createMessage("agent", statusContent) };
    }

    case "/plan": {
      return {
        message: createMessage("agent", `[Plan Mode Activated]\n\nPlanning mode enabled. Ready to receive task specifications.\n\n⚠️ No terminal execution performed.`),
        newMode: "Plan" as CockpitMode,
        newWorkflowStep: "Plan" as WorkflowStep,
      };
    }

    case "/build": {
      return {
        message: createMessage("agent", `[Build Mode Activated]\n\nBuild mode enabled. Simulating build process...\n\n[INFO] No terminal execution performed.\n[INFO] This is a safe mock environment.\n[INFO] Use /verify to run mock verification.`),
        newMode: "Build" as CockpitMode,
        newWorkflowStep: "Build" as WorkflowStep,
      };
    }

    case "/verify": {
      const verifyContent = `[Verify Mode Activated]\n\nMock verification checklist:\n\n☑ Lint check - Ready\n☑ Build check - Ready  \n☑ Diff review - Ready\n\n⚠️ No actual verification performed.`;
      return {
        message: createMessage("agent", verifyContent),
        newMode: "Verify" as CockpitMode,
        newWorkflowStep: "Verify" as WorkflowStep,
      };
    }

    case "/git": {
      const gitContent = `Git Status:
• Branch: main
• Remote: origin/main
• Working Tree: Clean
• Last Commit: ded7480 feat: restyle cockpit to premium operator console`;
      return { message: createMessage("agent", gitContent) };
    }

    case "/health": {
      const healthContent = `System Health:
• UI: OK ✓
• Command Router: OK ✓
• Backend: Not connected ⚠
• AI Provider: Not connected ⚠
• Terminal: Disabled ✗`;
      return { message: createMessage("agent", healthContent) };
    }

    case "/clear": {
      return {
        message: createMessage("system", "[Feed Cleared] Message history cleared. Type /help for commands."),
        clearFeed: true,
      };
    }

    default: {
      if (trimmed.startsWith("/")) {
        return { message: createMessage("system", "Unknown command. Type /help for available commands.") };
      }
      return {
        message: createMessage("agent", `Received: "${input}"\n\nThis is currently mock-only. Use /help to view available commands.`),
      };
    }
  }
};