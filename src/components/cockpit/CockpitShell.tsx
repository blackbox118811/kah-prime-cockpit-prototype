"use client";

import { useState } from "react";
import ChatThread from "./ChatThread";
import CommandInput from "./CommandInput";
import WorkflowBadges from "./WorkflowBadges";
import ModeSwitcher from "./ModeSwitcher";
import { executeCommand } from "@/lib/commandRouter";
import { Message, CockpitMode, WorkflowStep, MissionState } from "@/lib/types";

const agentRoles = [
  { name: "Commander", icon: "◈", status: "Active", activity: "Orchestrating", progress: 75, active: true },
  { name: "Research", icon: "◉", status: "Waiting", activity: "Idle", progress: 0, active: false },
  { name: "Builder", icon: "◎", status: "Running", activity: "Compiling", progress: 45, active: false },
  { name: "Analyst", icon: "▤", status: "Waiting", activity: "Idle", progress: 0, active: false },
  { name: "QA", icon: "⧉", status: "Waiting", activity: "Idle", progress: 0, active: false },
];

const navItems = [
  { icon: "◈", label: "Projects", active: true },
  { icon: "◉", label: "Docs", active: false },
  { icon: "◎", label: "Tasks", active: false },
  { icon: "▤", label: "Logs", active: false },
  { icon: "⧉", label: "Scripts", active: false },
  { icon: "⚙", label: "Settings", active: false },
];

const sparkline = [30, 45, 35, 50, 40, 55, 45];

const initialMessages: Message[] = [
  { id: 1, type: "system", content: "[System] Command router initialized. Type /help for available commands.", timestamp: "09:00:00" },
  { id: 2, type: "user", content: "What commands are available?", timestamp: "09:00:05" },
  { id: 3, type: "agent", content: "Use /help to see all available commands. I can show status, run mock build, verify, and more.", timestamp: "09:00:10", cardType: "plain" },
];

const initialMission: MissionState = {
  title: "Initializing cockpit",
  progress: 10,
  activeMode: "Plan",
  currentStep: "Plan",
  lastCommand: "init",
  logs: ["[09:00:00] System started", "[09:00:00] Command router initialized"],
};

export default function CockpitShell() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [mode, setMode] = useState<CockpitMode>("Plan");
  const [workflowStep, setWorkflowStep] = useState<WorkflowStep>("Plan");
  const [mission, setMission] = useState<MissionState>(initialMission);

  const getTime = () => new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const handleCommand = (input: string) => {
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: getTime(),
    };

    const result = executeCommand(input, mode, workflowStep, mission.title, mission.progress);

    const logEntry = `[${getTime()}] ${input}`;

    if (result.clearFeed) {
      setMessages([
        { id: Date.now() + 1, type: "system", content: result.message.content, timestamp: getTime(), cardType: result.message.cardType }
      ]);
      setMission((prev) => ({ ...prev, logs: [...prev.logs, logEntry, `[${getTime()}] Feed cleared`] }));
    } else {
      setMessages((prev) => [...prev, userMessage, { ...result.message, timestamp: getTime() }]);
      setMission((prev) => ({ ...prev, logs: [...prev.logs, logEntry, `[${getTime()}] ${result.message.type}: ${input}`] }));
    }

    if (result.newMode) {
      setMode(result.newMode);
      setMission((prev) => ({ ...prev, activeMode: result.newMode! }));
    }
    if (result.newWorkflowStep) {
      setWorkflowStep(result.newWorkflowStep);
      setMission((prev) => ({ ...prev, currentStep: result.newWorkflowStep! }));
    }
    if (result.missionUpdate) {
      setMission((prev) => ({
        ...prev,
        title: result.missionUpdate?.missionTitle || prev.title,
        progress: result.missionUpdate?.missionProgress || prev.progress,
      }));
    }
    setMission((prev) => ({ ...prev, lastCommand: input }));
  };

  const handleModeChange = (newMode: CockpitMode) => {
    setMode(newMode);
    const result = executeCommand(`/${newMode.toLowerCase()}`, mode, workflowStep, mission.title, mission.progress);
    setMessages((prev) => [...prev, { ...result.message, timestamp: getTime() }]);
    if (result.newWorkflowStep) {
      setWorkflowStep(result.newWorkflowStep);
      setMission((prev) => ({ ...prev, currentStep: result.newWorkflowStep! }));
    }
    if (result.missionUpdate) {
      setMission((prev) => ({
        ...prev,
        title: result.missionUpdate?.missionTitle || prev.title,
        progress: result.missionUpdate?.missionProgress || prev.progress,
      }));
    }
    setMission((prev) => ({ ...prev, activeMode: newMode, lastCommand: `/${newMode.toLowerCase()}` }));
  };

  return (
    <main className="flex min-h-screen bg-[#0B0F14] text-[#E6EDF5]">
      {/* Top Status Bar - Richer Command Center */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-[#10161D] border-b border-[#263140] z-50 flex items-center px-5 justify-between">
        {/* Brand Block */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gradient-orange">KAH</span>
            <span className="text-sm font-semibold text-[#E6EDF5]">Prime</span>
          </div>
          <span className="text-xs text-[#6F7C8B]">‖</span>
          <span className="text-xs text-[#A9B4C0]">Agent Hub</span>
        </div>

        {/* Status Cards */}
        <div className="flex items-center gap-4">
          {/* Model Status Card */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#151D27] rounded border border-[#263140]">
            <span className="text-xs text-[#6F7C8B]">Model</span>
            <span className="text-xs font-mono text-[#A9B4C0]">qwen2.5-coder</span>
            <span className="w-1 h-1 rounded-full bg-[#43C174]"></span>
          </div>

          <ModeSwitcher currentMode={mode} onModeChange={handleModeChange} />

          {/* Latency Card with Micro Graph */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#151D27] rounded border border-[#263140]">
            <div className="flex items-end gap-[2px] h-4">
              {sparkline.map((h, i) => (
                <div key={i} className="w-1 rounded-sm bg-[#43C174]" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <span className="text-xs text-[#43C174]">48ms</span>
          </div>

          {/* Health Dot */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#43C174] animate-pulse"></span>
            <span className="text-xs text-[#43C174]">Healthy</span>
          </div>

          {/* Utility Icons */}
          <div className="flex items-center gap-3 text-[#6F7C8B] border-l border-[#263140] pl-3">
            <span className="cursor-pointer hover:text-[#F47A20] text-sm" title="Terminal">TERM</span>
            <span className="cursor-pointer hover:text-[#F47A20] text-sm" title="Files">FILES</span>
            <span className="cursor-pointer hover:text-[#F47A20] text-sm" title="Settings">SETUP</span>
          </div>

          {/* Operator Profile Circle */}
          <div className="w-8 h-8 rounded-full bg-[#151D27] border border-[#F47A20] flex items-center justify-center">
            <span className="text-xs text-[#F47A20] font-bold">OP</span>
          </div>
        </div>
      </div>

      {/* Left Sidebar - Richer System Overview */}
      <aside className="w-60 bg-[#121922] border-r border-[#263140] pt-14 pb-4 flex flex-col">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all ${
                item.active
                  ? "bg-[#1B2430] text-[#F47A20] border-l-2 border-[#F47A20] shadow-[0_0_10px_rgba(244,122,32,0.15)]"
                  : "text-[#A9B4C0] hover:bg-[#151D27] hover:text-[#E6EDF5]"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* System Overview Card - Richer */}
        <div className="mt-4 mx-3 p-4 bg-[#151D27] rounded-lg border border-[#263140]">
          <div className="text-xs text-[#6F7C8B] mb-3 uppercase tracking-wider flex items-center justify-between">
            <span>System Status</span>
            <span className="w-2 h-2 rounded-full bg-[#43C174]"></span>
          </div>
          
          {/* Mini Stats */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#6F7C8B]">Memory</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 bg-[#263140] rounded overflow-hidden">
                  <div className="h-full w-[62%] bg-[#F47A20] rounded-sm"></div>
                </div>
                <span className="text-xs text-[#F47A20]">62%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#6F7C8B]">CPU</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 bg-[#263140] rounded overflow-hidden">
                  <div className="h-full w-[23%] bg-[#43C174] rounded-sm"></div>
                </div>
                <span className="text-xs text-[#43C174]">23%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#6F7C8B]">Tokens</span>
              <span className="text-xs text-[#A9B4C0]">1,240</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#6F7C8B]">Sessions</span>
              <span className="text-xs text-[#A9B4C0]">3</span>
            </div>
          </div>

          {/* Tiny Sparkline */}
          <div className="mt-3 pt-3 border-t border-[#263140]">
            <div className="flex items-end gap-[2px] h-6">
              {[40, 55, 45, 60, 50, 70, 55, 65, 50, 45, 55, 40].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-[#F47A20]/50" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Central Workspace */}
      <section className="flex-1 flex flex-col pt-14 border-r border-[#263140]">
        {/* Agent Status Cards - Real Status Cards */}
        <div className="flex gap-3 p-4 bg-[#10161D] border-b border-[#263140] overflow-x">
          {agentRoles.map((role) => (
            <div
              key={role.name}
              className={`min-w-[140px] px-4 py-3 rounded-lg border transition-all ${
                role.active
                  ? "bg-[#151D27] border-[#F47A20] orange-glow"
                  : "bg-[#151D27] border-[#263140]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-base">{role.icon}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  role.status === "Active" ? "bg-[#F47A20]/20 text-[#F47A20]" :
                  role.status === "Running" ? "bg-[#43C174]/20 text-[#43C174]" :
                  "bg-[#263140] text-[#6F7C8B]"
                }`}>
                  {role.status}
                </span>
              </div>
              <div className="text-xs font-semibold text-[#E6EDF5] mb-1">{role.name}</div>
              <div className="text-[10px] text-[#6F7C8B] mb-2">{role.activity}</div>
              {role.progress > 0 && (
                <div className="h-1 bg-[#263140] rounded overflow-hidden">
                  <div 
                    className="h-full bg-[#F47A20] rounded-sm transition-all" 
                    style={{ width: `${role.progress}%` }}
                  ></div>
                </div>
              )}
              {role.active && (
                <div className="mt-2 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47A20] animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47A20]/50"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47A20]/30"></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Workflow Strip - Stronger Visual States */}
        <div className="px-4 py-3 bg-[#0F141B] border-b border-[#1F2A36]">
          <div className="flex items-center gap-2">
            <WorkflowBadges currentStep={workflowStep} />
          </div>
        </div>

        {/* Chat Thread Area - Richer Operator Thread */}
        <div className="flex-1 p-4 overflow-auto bg-[#0B0F14]">
          <ChatThread messages={messages} />
        </div>

        {/* Command Input Dock - Launch Dock */}
        <div className="p-4 bg-[#10161D] border-t border-[#263140]">
          <CommandInput onCommand={handleCommand} currentMode={mode} />
        </div>
      </section>

      {/* Right Context Panel - Richer Mission Console */}
      <aside className="w-76 bg-[#121922] pt-14 pb-4 overflow-auto">
        <div className="px-4 space-y-4">
          {/* Active Context with Icons */}
          <div className="p-4 bg-[#151D27] rounded-lg border border-[#263140]">
            <div className="text-xs text-[#6F7C8B] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span>◈</span>
              <span>Active Context</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">📁</span>
              <p className="text-sm text-[#A9B4C0] font-mono">kah-prime-cockpit-prototype</p>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="text-[10px] px-2 py-0.5 bg-[#263140] rounded text-[#6F7C8B]">src/</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#263140] rounded text-[#6F7C8B]">12 files</span>
            </div>
          </div>

          {/* Current Mission with Dynamic Progress */}
          <div className="p-4 bg-[#151D27] rounded-lg border border-[#263140]">
            <div className="text-xs text-[#6F7C8B] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span>◎</span>
              <span>Current Mission</span>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-[#F47A20]/20 text-[#F47A20] rounded">{mode}</span>
            </div>
            <p className="text-sm text-[#E6EDF5] mb-3">{mission.title}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#6F7C8B]">Progress</span>
                <span className="text-[#F47A20]">{mission.progress}%</span>
              </div>
              <div className="h-1.5 bg-[#263140] rounded overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#F47A20] to-[#E86A12] rounded-sm transition-all" style={{ width: `${mission.progress}%` }}></div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#263140] flex justify-between text-[10px]">
              <span className="text-[#6F7C8B]">Step: {workflowStep}</span>
              <span className="text-[#A9B4C0]">Last: {mission.lastCommand}</span>
            </div>
          </div>

          {/* Pinned Goals with States */}
          <div className="p-4 bg-[#151D27] rounded-lg border border-[#263140]">
            <div className="text-xs text-[#6F7C8B] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span>▤</span>
              <span>Pinned Goals</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="text-[#43C174]">✓</span>
                <span className="text-[#43C174]">Apply dark slate palette</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#43C174]">✓</span>
                <span className="text-[#43C174]">Add workflow strip</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-[#F47A20]"></span>
                <span className="text-[#F47A20]">Refine command input</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#263140]"></span>
                <span className="text-[#6F7C8B]">Add visual polish</span>
              </li>
            </ul>
          </div>

          {/* Live Logs - Dynamic */}
          <div className="p-4 bg-[#151D27] rounded-lg border border-[#263140]">
            <div className="text-xs text-[#6F7C8B] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span>⏺</span>
              <span>Live Logs</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-[#43C174] animate-pulse"></span>
            </div>
            <div className="font-mono text-xs space-y-1 max-h-32 overflow-y-auto">
              {mission.logs.slice(-6).reverse().map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-[#F47A20] animate-pulse" : "bg-[#43C174]"}`}></span>
                  <span className={idx === 0 ? "text-[#F47A20]" : "text-[#43C174]"}>{log}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage with Mini Bar Chart */}
          <div className="p-4 bg-[#151D27] rounded-lg border border-[#263140]">
            <div className="text-xs text-[#6F7C8B] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span>⧉</span>
              <span>Usage</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#6F7C8B]">CPU</span>
                  <span className="text-[#A9B4C0]">23%</span>
                </div>
                <div className="h-2 bg-[#263140] rounded overflow-hidden flex items-end gap-[2px]">
                  {[30, 45, 25, 60, 40, 35, 20, 50, 45, 30, 25, 40, 35, 50, 45, 30].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#F47A20]/60 rounded-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#6F7C8B]">Memory</span>
                  <span className="text-[#A9B4C0]">62%</span>
                </div>
                <div className="h-2 bg-[#263140] rounded overflow-hidden flex items-end gap-[2px]">
                  {[50, 55, 60, 58, 62, 65, 60, 58, 62, 60, 58, 62, 65, 60, 58, 62].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#43C174]/60 rounded-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Execution Flow - Dynamic */}
          <div className="p-4 bg-[#151D27] rounded-lg border border-[#263140]">
            <div className="text-xs text-[#6F7C8B] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span>⟐</span>
              <span>Execution Flow</span>
            </div>
            <div className="flex items-center gap-1 text-xs flex-wrap">
              <span className="text-[#43C174]">●</span>
              <span className="text-[#A9B4C0]">Ready</span>
              <span className="text-[#263140]">━━</span>
              {["Plan", "Build", "Verify"].map((step, idx) => {
                const isCurrent = workflowStep === step;
                const stepNum = idx + 1;
                return (
                  <span key={step} className="flex items-center">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${isCurrent ? "bg-[#F47A20] text-[#0B0F14]" : "bg-[#263140] text-[#6F7C8B]"}`}>
                      {stepNum}
                    </span>
                    <span className={isCurrent ? "text-[#F47A20]" : "text-[#6F7C8B]"}>{step}</span>
                    {step !== "Verify" && <span className="text-[#263140]">━</span>}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}