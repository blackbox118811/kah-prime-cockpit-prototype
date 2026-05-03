# OPEN SOURCE UI BASE AUDIT — KAH Prime Codex

## 1. Decision Purpose

Why this audit exists: choose a UI foundation for the future KAH Prime Codex agent cockpit prototype.

The cockpit must allow users to:
- Talk to LLMs/agents
- Manage agent sessions
- Inspect files and projects
- View terminal/git status
- Run approval-gated workflows
- Support artifacts/canvas-style outputs (future)

---

## 2. KAH Prime Cockpit Requirements

| Requirement | Priority |
|-------------|----------|
| Chat/LLM conversation support | ⭐ High |
| Agent session management | ⭐ High |
| File/project awareness | ⭐ High |
| Terminal support | ⭐ High |
| Git support | ⭐ High |
| Artifact/canvas support | Medium |
| Local/Ollama support | ⭐ High |
| Gemini/OpenCode/Cline compatibility | ⭐ High |
| Voice-readiness | Low |
| Maintenance risk assessment | Medium |
| Security risk assessment | Medium |

---

## 3. Candidate Comparison Table

| Feature | mckaywrigley/chatbot-ui | siteboon/claudecodeui (CloudCLI) | langchain-ai/open-canvas | BrunoEduardo/open-claude | vtemian/octto |
|---------|-------------------|-----------------------------|------------------------|------------------------|-----------------|
| **Chat/LLM** | ✅ AI SDK (any model) | ✅ Claude Code/Cursor/Codex/Gemini | ✅ Multi-modal chat | ✅ Claude-style | ✅ Interactive brainstorming |
| **Agent sessions** | ✅ Session management | ✅ CloudCLI dashboard | ⚠️ Single session | ✅ Session mgmt | ✅ Multi-question forms |
| **File awareness** | ✅ Project-aware | ✅ Repo-aware | ✅ Editor + artifacts | ✅ Project-aware | ⚠️ Saves to docs/plans/ |
| **Terminal support** | ❌ No terminal | ✅ Full terminal | ❌ No terminal | ⚠️ Limited | ❌ No terminal |
| **Git support** | ❌ No git | ✅ GitHub PR mgmt | ❌ No git | ⚠️ Basic | ❌ No git |
| **Artifact/Canvas** | ❌ No artifacts | ❌ No canvas | ✅ Canvas + versions | ❌ No canvas | ⚠️ Plan documents |
| **Local/Ollama** | ⚠️ AI SDK (config) | ❌ Claude/Cursor/Codex only | ❌ LangChain cloud | ⚠️ Claude API | ❌ OpenCode cloud |
| **Gemini compat** | ✅ AI SDK (any model) | ✅ Gemini CLI supported | ❌ No | ❌ No | ❌ No |
| **Voice-ready** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Maintenance** | Medium (2024-08-03, 50 contrib) | Medium (active 2026, 50 contrib) | High (archived 2026-02) | Medium (unknown) | Low (early stage) |
| **Security** | High (TypeScript, MIT) | Medium (TypeScript, AGPL-3.0) | High (TypeScript, MIT) | Medium | Medium (MIT) |
| **License** | MIT ✅ | AGPL-3.0 ⚠️ | MIT ✅ | MIT ✅ | MIT ✅ |

> **AGPL-3.0 Note:** siteboon/claudecodeui uses AGPL-3.0, which requires careful legal/commercial review before distributing modified versions.

---

## 4. Per-Repo Analysis

### 4.1 Chatbot UI (mckaywrigley/chatbot-ui)

- **Stars:** Pending verification | **Forks:** Pending verification
- **Stack:** TypeScript + Next.js + AI SDK
- **Chat:** ✅ AI SDK supporting any model (OpenAI, Anthropic, Gemini, Ollama)
- **Agent sessions:** ✅ Session management
- **Files:** ✅ Project-aware
- **Terminal:** ❌ No terminal integration
- **Git:** ❌ No git support
- **Artifacts:** ❌ No canvas-style outputs
- **Local LLM:** ⚠️ Via AI SDK configuration (Ollama supported)
- **Maintenance:** Medium (last push: 2024-08-03, 50 contributors)
- **Security:** High (TypeScript, MIT, active maintenance)
- **License:** MIT ✅ (commercial-friendly)
- **Notes:** Popular chatbot starter. AI SDK provides multi-model flexibility including Gemini. No terminal/git features.

---

### 4.2 CloudCLI (siteboon/claudecodeui)

- **Stars:** Pending verification | **Forks:** Pending verification
- **Stack:** TypeScript + React + Claude Code integration
- **Chat:** ✅ Claude Code, Cursor, Codex, Gemini CLI support
- **Agent sessions:** ✅ CloudCLI dashboard with session tracking
- **Files:** ✅ Repo-aware (works inside git repos)
- **Terminal:** ✅ Full terminal integration
- **Git:** ✅ GitHub PR management, auto-fix, re-push
- **Artifacts:** ❌ No canvas outputs
- **Local LLM:** ❌ Claude/Cursor/Codex only (no Ollama)
- **Maintenance:** Medium (active 2026, 50 contributors)
- **Security:** Medium (TypeScript, AGPL-3.0)
- **License:** AGPL-3.0 ⚠️ (requires legal review for distribution)
- **Notes:** Operator workspace style. Gemini CLI supported. AGPL-3.0 requires careful commercial review before distributing modified versions.

---

### 4.3 Open Canvas (langchain-ai/open-canvas)

- **Stars:** 5,425 | **Forks:** 855
- **Stack:** TypeScript + React + LangChain
- **Chat:** ✅ Multi-modal chat (text, code, markdown)
- **Agent sessions:** ⚠️ Single session (no multi-session mgmt)
- **Files:** ✅ Markdown + code editor with live rendering
- **Terminal:** ❌ No terminal
- **Git:** ❌ No git integration
- **Artifacts:** ✅ Canvas-style with versioning, code + markdown
- **Local LLM:** ❌ LangChain cloud models (archived)
- **Maintenance:** High (archived 2026-02-25, was active since 2024-10)
- **Security:** High (TypeScript, MIT, Email/GitHub/Google auth)
- **License:** MIT ✅ (commercial-friendly)
- **Notes:** Archived but excellent artifact/canvas pattern inspiration. Memory system, custom quick actions.

---

### 4.4 Open-Claude (BrunoEduardo/open-claude)

- **Stars:** Pending verification | **Forks:** Pending verification
- **Stack:** Web-based chat interface
- **Chat:** ✅ Claude-style conversation
- **Agent sessions:** ✅ Session management
- **Files:** ✅ Project-aware
- **Terminal:** ⚠️ Limited terminal support
- **Git:** ⚠️ Basic git awareness
- **Artifacts:** ❌ No canvas
- **Local LLM:** ⚠️ Claude API only (Anthropic)
- **Maintenance:** Medium (community project, unclear activity)
- **Security:** Medium (web-based, needs auth)
- **License:** MIT ✅
- **Notes:** Limited public info available. Claude-focused, not suitable for multi-model cockpit.

---

### 4.5 octto (vtemian/octto) — OpenCode Plugin

- **Stars:** Pending verification | **Forks:** Pending verification
- **Stack:** Browser UI + OpenCode plugin
- **Chat:** ✅ Interactive brainstorming with multi-question forms
- **Agent sessions:** ✅ Bootstrapper → Probe → octto orchestration
- **Files:** ⚠️ Saves plans to `docs/plans/` (limited editing)
- **Terminal:** ❌ No terminal integration
- **Git:** ❌ No git support
- **Artifacts:** ⚠️ Plan documents only (not visual canvas)
- **Local LLM:** ❌ OpenCode cloud LLM (Anthropic/others)
- **Maintenance:** Low (early stage, 1 contributor)
- **Security:** Medium (OpenCode auth, MIT)
- **License:** MIT ✅
- **Notes:** Plugin for OpenCode. Interactive UI opens in browser. 3-agent system (bootstrapper, probe, octto).

---

## 5. Appendix: Alternative Candidates

### A.1 Chatbot UI Alternative (WongSaang/chatgpt-ui)

- **Stars:** 1,632 | **Forks:** 355
- **Stack:** Vue + Nuxt + Django
- **Chat:** ✅ Multi-user, persistent storage (MySQL/PostgreSQL/SQLite)
- **Agent sessions:** ❌ No session management
- **Files:** ❌ No project awareness
- **Terminal:** ❌ No terminal integration
- **Git:** ❌ No git support
- **Artifacts:** ❌ No canvas-style outputs
- **Local LLM:** ❌ OpenAI API only (cloud-only)
- **Maintenance:** Medium (last push: 2025-12-03, 20 contributors)
- **Security:** Medium (Django backend, multi-user auth, SQL databases)
- **License:** MIT ✅ (commercial-friendly)
- **Notes:** Originally ChatGPT UI, now pivoting to RiceBall. Server-client architecture. Alternative to mckaywrigley/chatbot-ui.

---

### A.2 Otto (alanmeadows/otto) — Copilot UI Style

- **Stars:** 2 | **Forks:** 1
- **Stack:** Go + Copilot SDK + DevTunnel
- **Chat:** ✅ Copilot CLI chat with real-time streaming
- **Agent sessions:** ✅ Copilot session dashboard with sub-agent tracking
- **Files:** ✅ Repo-aware (works inside git repos)
- **Terminal:** ✅ Full terminal integration via Copilot CLI
- **Git:** ✅ GitHub PR management, auto-fix, re-push
- **Artifacts:** ❌ No canvas outputs
- **Local LLM:** ❌ Copilot-only (subscription required)
- **Maintenance:** Low (early stage, 3 contributors, last push: 2026-04-13)
- **Security:** High (Go binary, Azure Entra ID, tunnel auth)
- **License:** Apache 2.0 ✅ (commercial-friendly)
- **Notes:** Requires Go 1.25.6+, GitHub Copilot subscription. Dashboard embedded in binary. Early stage; included here as reference only.

---

## 6. Voice-Readiness

| Project | Voice Input | Voice Output | Notes |
|---------|-------------|--------------|-------|
| mckaywrigley/chatbot-ui | ❌ | ❌ | Text-only chat |
| siteboon/claudecodeui | ❌ | ❌ | Text + terminal |
| Open Canvas | ❌ | ❌ | Text + canvas |
| Open-Claude | ❌ | ❌ | Text chat |
| octto | ❌ | ❌ | Browser UI text |

**Verdict:** None are voice-ready. Voice is a future consideration for KAH Prime.

---

## 7. Maintenance Risk Assessment

| Project | Last Push | Contributors | Risk Level | Notes |
|---------|-----------|--------------|------------|-------|
| mckaywrigley/chatbot-ui | 2024-08-03 | 50 | Medium | Active, AI SDK flexible |
| siteboon/claudecodeui | 2026 (active) | 50 | Medium | Active, AGPL-3.0 risk |
| Open Canvas | 2026-02-25 | 20 | High (archived) | Archived but stable patterns |
| Open-Claude | Unknown | Unknown | Medium | Insufficient public data |
| octto | 2026-01-02 | 1 | Low (early) | Single contributor, plugin-only |

---

## 8. Security Risk Assessment

| Project | Backend | Auth | Data Storage | Risk | Notes |
|---------|--------|------|-------------|------|-------|
| mckaywrigley/chatbot-ui | Next.js + AI SDK | TBD | Browser/storage | Low | TypeScript, MIT, client-side |
| siteboon/claudecodeui | TypeScript + React | TBD | TBD | Medium | AGPL-3.0, CloudCLI dashboard |
| Open Canvas | Node.js + LangChain | Email/GitHub/Google | Browser storage | Low | TypeScript, MIT, client-side |
| Open-Claude | Web API | TBD | TBD | Medium | Unknown backend |
| octto | OpenCode API | OpenCode auth | docs/plans/ | Low | File-based, plugin scope |

---

## 9. License Review

| Project | License | Commercial Use | Modification | Distribution |
|---------|---------|----------------|--------------|-------------|
| mckaywrigley/chatbot-ui | MIT ✅ | ✅ | ✅ | ✅ |
| siteboon/claudecodeui | AGPL-3.0 ⚠️ | ⚠️ With restrictions | ✅ | ⚠️ Must share modifications |
| Open Canvas | MIT ✅ | ✅ | ✅ | ✅ |
| Open-Claude | MIT ✅ | ✅ | ✅ | ✅ |
| octto | MIT ✅ | ✅ | ✅ | ✅ |

> **AGPL-3.0:** Requires careful legal/commercial review before distributing modified versions of siteboon/claudecodeui.

**Most candidates are commercial-friendly.** AGPL-3.0 requires additional review.

---

## 10. Recommended Evaluation Order

1. **octto** — Test brainstorming workflow (plugin for OpenCode, low risk)
2. **siteboon/claudecodeui** — Evaluate CloudCLI operator workspace (terminal, git, AGPL-3.0 review needed)
3. **Open Canvas** — Assess artifact/canvas patterns (even if archived, patterns are valid)
4. **mckaywrigley/chatbot-ui** — Review chat-first UX patterns (AI SDK, multi-model, MIT)
5. **Open-Claude** — Check Claude-style session management (least info available)

---

## 11. Final Provisional Strategy

**CloudCLI-style operator workspace + Chatbot UI-style chat + Open Canvas artifact inspiration + octto guided planning inspiration**

### Primary UI Pattern:
**CloudCLI-style operator workspace:**
- Left sidebar: Project navigation (Projects, Docs, Tasks, Logs, Scripts, Settings)
- Centre: Agent chat/thread (primary workspace)
- Right panel: Context (model, files, git status, health, next action)
- Bottom: Prompt/command input bar
- Top: Project status bar (branch, health, last updated)

### Chat Foundation:
**mckaywrigley/chatbot-ui** (TypeScript, Next.js, AI SDK, MIT)
- AI SDK for multi-model support (OpenAI, Anthropic, Gemini, Ollama)
- Session management patterns
- Responsive layout examples

### Artifact Inspiration:
**Open Canvas** (archived but patterns are solid)
- Canvas-style versioned artifacts
- Code + markdown dual-mode
- Live rendering + editing
- Memory system for agent context

### Planning Inspiration:
**octto** (OpenCode plugin)
- Interactive brainstorming UI
- Multi-question forms
- Agent orchestration (bootstrapper → probe → octto)
- Plan documents saved to `docs/plans/`

### Rejected:
- **Open-Claude** — Limited info, unclear maintenance, Claude-only (not multi-model)
- **WongSaang/chatgpt-ui** — Moved to appendix; Vue/Nuxt/Django stack, OpenAI-only
- **Otto** — Moved to appendix; early stage, Go + Copilot-only

---

## 12. What Not to Do Yet

- ❌ Do not clone any candidate repos yet
- ❌ Do not install Next.js, Vue, Nuxt, or Django dependencies
- ❌ Do not copy proprietary UI exactly (ChatGPT, Claude, Copilot)
- ❌ Do not build external SaaS features yet
- ❌ Do not build multi-user collaboration yet
- ❌ No `src/` directory (no application code)
- ❌ No `package.json` (no dependencies)
- ❌ No authentication system (use existing GitHub auth via `gh`)
- ❌ No database (file-based storage only: `docs/`, `tasks/`, `logs/`)
- ❌ Do not fork anything yet until license, maintenance, install complexity, and local-agent integration are verified

---

**Document version:** 1.1  
**Last updated:** 2026-05-03  
**Status:** Audit corrected, strategy selected, ready for prototype phase (future)
