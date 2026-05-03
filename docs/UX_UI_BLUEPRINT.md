# UX/UI BLUEPRINT — KAH Prime Codex

## 1. Product Purpose

**What it is:**
A local-first AI Software Development Cockpit Template built on free/open tools.

**What it is not:**
- Not a SaaS product
- Not cloud-only
- Not a single tool or IDE replacement
- Not a paid service

**Core value proposition:**
Provide a reusable, documented, rule-driven template for developers to set up a local AI coding environment quickly and consistently.

---

## 2. Target User

**Primary:**
Developers who want local AI coding assistance with free tools, reproducibility, and clear rules for AI agents.

**Secondary:**
Teams setting up standardized AI development environments across multiple machines.

**Technical level:**
Intermediate to advanced (uses CLI, git, Homebrew, VS Code extensions).

---

## 3. UX Principles

- **Local-first, cloud-optional** — everything works offline except optional Gemini enhancements
- **CLI-native with optional GUI** — VS Code for editing, terminal for agents
- **Transparent agent behavior** — no black boxes, all rules in AGENTS.md/GEMINI.md
- **Fail-fast with clear error messages** — healthcheck script, verbose tool output
- **Documentation-driven workflow** — README, SETUP_GUIDE, OPERATING_ROUTINE, this blueprint

---

## 4. UI Style Direction

- **Minimal, functional, developer-focused**
- **Dark theme preferred** — aligns with VS Code default and terminal workflow
- **Monospace fonts** for code blocks, output, and logs
- **High contrast** for readability in terminal and browser
- **No unnecessary animations or decorations** — this is a tool, not a marketing site

---

## 5. Information Architecture

```
Root (Dashboard - future)
├── Docs/          # Documentation and architecture notes
│   ├── README.md
│   ├── HEALTHCHECK.md
│   └── UX_UI_BLUEPRINT.md  (this file)
├── Tasks/         # Task lists and TODOs
│   └── README.md
├── Logs/          # Session logs and debug traces
│   └── README.md
├── Scripts/       # Automation and helper scripts
│   ├── README.md
│   └── healthcheck.sh
└── Settings/      # Tool configuration and auth (future)
    ├── opencode.json
    └── .env.example
```

---

## 6. Main Pages (Future Prototype)

| Page | Purpose |
|------|---------|
| **Dashboard** | System health, quick actions, recent activity |
| **Docs** | Markdown documentation viewer with table of contents |
| **Tasks** | Task list with status filters (open/done) |
| **Logs** | Log viewer with search and filter |
| **Scripts** | Script runner with output pane |
| **Settings** | Tool configuration, auth status, model selection |

---

## 7. Dashboard Layout (Wireframe Description)

```
┌─────────────────────────────────────────────────────────────┐
│ Header: Project KAH Prime Codex  [Health: ✅]  [Quick Actions] │
├─────────────────────────────────────────────────────────────┤
│ Sidebar                     │ Main Content                  │
│ ├── Dashboard (active)    │                             │
│ ├── Docs                 │ System Health:              │
│ ├── Tasks                │ ✅ Tools (7/7)             │
│ ├── Logs                 │ ✅ Git: main, clean      │
│ ├── Scripts              │ ✅ Files present            │
│ └── Settings             │ ✅ Model: qwen2.5-coder  │
│                             │                             │
│                             │ Quick Actions:               │
│                             │ [Run Healthcheck] [New Task]│
│                             │ [Start Ollama] [Git Push] │
│                             │                             │
│                             │ Recent Activity:            │
│                             │ • Add cockpit healthcheck   │
│                             │ • Add AI template struct  │
├─────────────────────────────────────────────────────────────┤
│ Footer: main │ last updated 2026-05-03 │ git 2.54.0 │    │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Navigation Model

- **Primary:** Sidebar navigation (persistent, collapsible on smaller screens)
- **Secondary:** Breadcrumbs on inner pages (Docs > HEALTHCHECK.md)
- **Quick actions:** Header buttons or floating action button
- **Keyboard:** Vim-style bindings (`j`/`k` for navigation, `/` for search)
- **CLI fallback:** All navigation available via terminal commands (`cd docs/`, `cat file.md`)

---

## 9. Component System

### Health Indicators
- ✅ Green — Check passed
- ⚠️ Yellow — Warning (staged changes, optional tool missing)
- ❌ Red — Error (tool missing, git broken)

### Code Blocks
- Syntax-highlighted via Markdown or Shiki
- Copy-to-clipboard button
- Line numbers optional

### Status Badges
- **Git:** 🟢 Clean / 🟡 Staged / 🔴 Dirty / ⚪ Untracked
- **Tools:** ✅ Installed / ❌ Missing / ⚠️ Needs auth
- **Model:** ✅ Loaded / ❌ Not pulled / ⚠️ Service down

### Action Buttons
- **Primary:** Solid background, high contrast
- **Secondary:** Outline or ghost style
- **Destructive:** Red background (reset, delete)

### Tables
- Minimal borders, zebra striping for readability
- Sortable columns (future)
- Responsive: horizontal scroll on small screens

---

## 10. Empty States

| Context | Message | Action |
|---------|---------|--------|
| No tasks | "No tasks yet. Add one with `echo 'TASK-001: Description' > tasks/TASK-001.md`" | [Create Task] |
| No logs | "No logs yet. Run `bash scripts/healthcheck.sh` to generate one." | [Run Healthcheck] |
| No docs | "No docs yet. Add markdown files to `docs/`." | [New Doc] |
| No scripts | "No scripts yet. Add shell or Node scripts to `scripts/`." | [New Script] |

---

## 11. Status Indicators

### System Health
- ✅ **Healthy** — All checks passed
- ⚠️ **Warning** — Non-critical issues (optional tools missing)
- ❌ **Error** — Critical failure (git broken, model missing)

### Git Status
- 🟢 **Clean** — Nothing to commit
- 🟡 **Staged** — Changes staged for commit
- 🔴 **Dirty** — Unstaged changes present
- ⚪ **Untracked** — New files not in git

### Tool Status
- ✅ **Installed** — Tool found in PATH
- ❌ **Missing** — Tool not installed
- ⚠️ **Needs Auth** — Tool installed but not authenticated

### Model Status
- ✅ **Loaded** — Model present in Ollama
- ❌ **Not Pulled** — Model not downloaded
- ⚠️ **Service Down** — Ollama not running

---

## 12. Mobile/Tablet/Desktop Behaviour

| Viewport | Layout | Navigation |
|----------|--------|-------------|
| **Desktop (primary)** | Full sidebar, multi-column layouts | Sidebar always visible |
| **Tablet** | Collapsible sidebar, stacked panels | Hamburger menu for sidebar |
| **Mobile (not priority)** | Single column, stacked sections | Bottom navigation or hamburger |

**Responsive guidelines:**
- Min-width: 320px (future consideration)
- Sidebar collapses to icon-only at < 768px
- Tables gain horizontal scroll at < 640px
- Font size: 16px minimum for readability

---

## 13. Accessibility Rules

- **Keyboard navigable** — All interactive elements reachable via `Tab`
- **Sufficient color contrast** — WCAG AA compliance (4.5:1 for normal text)
- **Semantic HTML** — Use `<nav>`, `<main>`, `<aside>`, `<footer>`
- **ARIA labels** — All dynamic elements have `aria-label` or `aria-live`
- **Screen reader friendly** — Status messages announced via `aria-live="polite"`
- **Focus indicators** — Visible focus rings on all interactive elements

---

## 14. Future Next.js Prototype Plan

**Framework:** Next.js 14+ with App Router  
**Styling:** Tailwind CSS (utility-first, matches developer workflow)  
**Components:** Shadcn/ui or custom minimal components  
**State Management:** React Context for healthcheck data, Zustand (optional)  
**Markdown Rendering:** `react-markdown` or `next-mdx-remote`  
**API Routes:**
- `/api/healthcheck` — Returns tool/git/file/model status
- `/api/git-status` — Returns git status JSON
- `/api/model-status` — Returns Ollama model availability

**Note:** This is a plan only. No Next.js code exists yet.

---

## 15. What Not to Build Yet

- ❌ No `src/` directory — no application code
- ❌ No `package.json` — no dependencies installed
- ❌ No Next.js installation — framework is future only
- ❌ No authentication system — use existing GitHub auth via `gh`
- ❌ No database — file-based storage only (`docs/`, `tasks/`, `logs/`)
- ❌ No real-time collaboration features
- ❌ No mobile app — desktop-first
- ❌ No payment/subscription system — all tools are free tier

---

**Document version:** 1.0  
**Last updated:** 2026-05-03  
**Status:** Planning complete, ready for prototype phase (future)
