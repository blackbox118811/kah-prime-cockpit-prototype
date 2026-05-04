"use client";

import ChatThread from "./ChatThread";
import CommandInput from "./CommandInput";
import WorkflowBadges from "./WorkflowBadges";
import ModeSwitcher from "./ModeSwitcher";

export default function CockpitShell() {
  return (
    <main className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-100">KAH Prime</h2>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-gray-100">Projects</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-gray-100">Docs</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-gray-100">Tasks</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-gray-100">Logs</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-gray-100">Scripts</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-gray-100">Settings</a>
        </nav>
      </aside>

      {/* Central Chat/Thread */}
      <section className="flex-1 flex flex-col border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-100">Agent Chat</h1>
            <ModeSwitcher />
          </div>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <ChatThread />
        </div>
        <div className="p-4 border-t border-gray-700">
          <CommandInput />
        </div>
      </section>

      {/* Right Context/Status Panel */}
      <aside className="w-80 bg-gray-800 p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">Context</h2>
        <div className="space-y-4">
          <div className="p-3 bg-gray-700 rounded border border-gray-600">
            <h3 className="font-medium text-gray-200">Model</h3>
            <p className="text-sm text-gray-400">Not selected</p>
          </div>
          <div className="p-3 bg-gray-700 rounded border border-gray-600">
            <h3 className="font-medium text-gray-200">Files</h3>
            <p className="text-sm text-gray-400">None</p>
          </div>
          <div className="p-3 bg-gray-700 rounded border border-gray-600">
            <h3 className="font-medium text-gray-200">Git Status</h3>
            <p className="text-sm text-gray-400">Clean</p>
          </div>
          <div className="p-3 bg-gray-700 rounded border border-gray-600">
            <h3 className="font-medium text-gray-200">Health</h3>
            <p className="text-sm text-green-400">✓ OK</p>
          </div>
          <div className="p-3 bg-gray-700 rounded border border-gray-600">
            <h3 className="font-medium text-gray-200">Next Action</h3>
            <p className="text-sm text-gray-400">Waiting for input</p>
          </div>
        </div>

        {/* Workflow Tracker */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-gray-200">Workflow</h3>
          <WorkflowBadges />
        </div>
      </aside>
    </main>
  );
}
