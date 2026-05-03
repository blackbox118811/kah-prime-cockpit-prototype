# PROTOTYPE EVALUATION NOTES — KAH Prime Codex

## 1. Evaluation Date
2026-05-03

## 2. Repos Inspected
| Repo | URL | Location |
|------|-----|----------|
| claudecodeui (CloudCLI) | https://github.com/siteboon/claudecodeui | `~/KAH-Prototype-Eval/claudecodeui/` |
| chatbot-ui | https://github.com/mckaywrigley/chatbot-ui | `~/KAH-Prototype-Eval/chatbot-ui/` |

## 3. Clone Status
| Repo | Status | Method |
|------|--------|--------|
| claudecodeui | ✅ Successfully cloned | `git clone --depth 1` |
| chatbot-ui | ✅ Successfully cloned | `git clone --depth 1` |

## 4. License Findings
| Repo | License | Verification | Notes |
|------|---------|---------------|-------|
| claudecodeui | AGPL-3.0-or-later | ✅ Verified in `package.json` and `LICENSE` file | Additional terms from Siteboon AI B.V. require attribution preservation, no misrepresentation, limited publicity rights. Contributions before 2026-03-28 were GPL-3.0, relicensed to AGPL-3.0. |
| chatbot-ui | MIT | ✅ Verified in `LICENSE` file | Standard MIT license, commercial-friendly, no restrictions on modification or distribution. |

## 5. Tech Stack Findings
| Repo | Frontend | Backend | Bundler | Styling | Database | Package Name |
|------|----------|---------|---------|---------|----------|--------------|
| claudecodeui | React + TypeScript | Node.js (`server/`) | Vite | Tailwind CSS | Pending verification | `@cloudcli-ai/cloudcli` |
| chatbot-ui | Next.js + TypeScript | Next.js API routes | Next.js built-in | Tailwind CSS | Supabase | `chatbot-ui` |

### claudecodeui Key Dependencies (from package.json):
- `@anthropic-ai/claude-agent-sdk`: ^0.2.116
- TypeScript, React, Vite, Tailwind CSS
- Node.js v22+ required

### chatbot-ui Key Dependencies (from package.json):
- `@anthropic-ai/sdk`: ^0.18.0
- `@google/generative-ai`: ^0.11.4 (Gemini support)
- `@azure/openai`: ^1.0.0-beta.8
- AI SDK for multi-model support
- Supabase for data persistence

## 6. README/Setup Complexity
| Repo | Quick Start | Complexity | Prerequisites |
|------|-------------|------------|----------------|
| claudecodeui | `npx @cloudcli-ai/cloudcli` or `npm install -g @cloudcli-ai/cloudcli` | Low (npm global or npx) | Node.js v22+, Claude Code/Cursor/Codex/Gemini CLI installed |
| chatbot-ui | Clone → `npm install` → Setup Supabase → `npm run dev` | Medium (requires Supabase setup) | Node.js, Supabase CLI, Ollama (optional for local models) |

### claudecodeui Setup Notes:
- Docker sandboxes available (experimental)
- PM2 support for production
- Remote server setup documented
- Runs on port 3001 by default

### chatbot-ui Setup Notes:
- Requires Supabase for data storage (replaced browser localStorage)
- Ollama optional for local models
- Migration from v1.0 to v2.0 (current)
- `npm run db-push` needed for hosted instances

## 7. Agent Workspace Suitability
| Feature | claudecodeui | chatbot-ui |
|---------|---------------|-------------|
| **Operator workspace layout** | ✅ Desktop + mobile responsive | ⚠️ Desktop-focused (mobile improvements coming) |
| **Project navigation** | ✅ File explorer with syntax highlighting | ❌ No file explorer mentioned |
| **Multi-agent support** | ✅ Claude Code, Cursor CLI, Codex, Gemini CLI | ❌ Single chat interface |
| **Session dashboard** | ✅ Resume, manage multiple sessions | ✅ Session management |
| **Plugin system** | ✅ Extensible with custom plugins | ❌ No plugin system mentioned |

**Winner:** claudecodeui — better suits operator workspace requirements.

## 8. Chat/LLM Suitability
| Feature | claudecodeui | chatbot-ui |
|---------|---------------|-------------|
| **Multi-model support** | ✅ Claude, GPT, Gemini families | ✅ AI SDK (OpenAI, Anthropic, Gemini, Ollama) |
| **Streaming** | ✅ Real-time streaming | ✅ Real-time streaming |
| **Chat history** | ✅ Session-based history | ✅ Persistent storage (Supabase) |
| **Multi-modal** | Pending verification | ✅ Text, code, markdown |
| **Model selection UI** | ✅ CLI selection UI | ✅ Model selector in UI |

**Winner:** chatbot-ui — AI SDK provides more flexible multi-model support including Ollama.

## 9. File/Project Awareness
| Feature | claudecodeui | chatbot-ui |
|---------|---------------|-------------|
| **File explorer** | ✅ Interactive file tree, syntax highlighting, live editing | ❌ Not mentioned in README |
| **Project awareness** | ✅ Works inside git repos | ❌ Not mentioned |
| **File editing** | ✅ Live editing in UI | ❌ Not mentioned |

**Winner:** claudecodeui — has file explorer and project awareness.

## 10. Terminal Support
| Feature | claudecodeui | chatbot-ui |
|---------|---------------|-------------|
| **Built-in terminal** | ✅ Integrated shell terminal with direct CLI access | ❌ No terminal |
| **CLI integration** | ✅ Claude Code, Cursor, Codex, Gemini CLI | ❌ No CLI integration |

**Winner:** claudecodeui — only candidate with terminal support.

## 11. Git Support
| Feature | claudecodeui | chatbot-ui |
|---------|---------------|-------------|
| **Git explorer** | ✅ View, stage, commit changes; switch branches | ❌ No git support mentioned |
| **GitHub integration** | Pending verification | ❌ No GitHub integration |
| **PR management** | Pending verification | ❌ No PR management |

**Winner:** claudecodeui — has Git explorer built-in.

## 12. Artifact/Canvas Support
| Feature | claudecodeui | chatbot-ui |
|---------|---------------|-------------|
| **Canvas/artifacts** | ❌ No canvas mentioned | ❌ No canvas mentioned |
| **Code rendering** | ✅ Syntax highlighting in file explorer | ✅ Code rendering in chat |

**Winner:** Neither — both lack canvas/artifact support. Open Canvas (archived) remains the best reference for this feature.

## 13. Local/Ollama Support
| Feature | claudecodeui | chatbot-ui |
|---------|---------------|-------------|
| **Ollama support** | ❌ Not mentioned (Claude/Cursor/Codex/Gemini only) | ✅ Optional Ollama setup documented |
| **Local LLM** | ❌ Cloud-only (requires API keys) | ✅ Via AI SDK configuration |
| **No API key needed** | ❌ Requires CLI tools installed | ⚠️ Ollama for local, or API keys |

**Winner:** chatbot-ui — Ollama supported via AI SDK.

## 14. Gemini Compatibility
| Feature | claudecodeui | chatbot-ui |
|---------|---------------|-------------|
| **Gemini CLI** | ✅ Explicitly supported (geminicli.com) | ❌ Not mentioned (AI SDK supports Gemini API) |
| **Gemini models** | ✅ Via Gemini CLI | ✅ Via `@google/generative-ai` SDK |
| **Integration method** | Native CLI integration | AI SDK integration |

**Winner:** claudecodeui — native Gemini CLI support with full integration.

## 15. Risks
### claudecodeui Risks:
| Risk | Severity | Mitigation |
|------|----------|------------|
| AGPL-3.0 license — must share modifications if distributed | High (legal) | Legal review before any distribution; consider separate service architecture |
| Additional terms require attribution preservation | Medium (compliance) | Ensure "CloudCLI UI" attribution in docs/UI |
| No Ollama support (cloud-only) | Medium (local-first goal) | May need custom integration |
| Requires Node.js v22+ | Low (technical) | Ensure runtime compatibility |

### chatbot-ui Risks:
| Risk | Severity | Mitigation |
|------|----------|------------|
| No terminal support | High (cockpit requirement) | Would need to build custom terminal component |
| No git support | High (cockpit requirement) | Would need to integrate git UI |
| Requires Supabase setup | Medium (complexity) | Consider simpler storage for prototype |
| No file explorer | Medium (cockpit requirement) | Would need to build file navigation |

## 16. Provisional Recommendation & Decision

### CloudCLI (claudecodeui) Test Result:
- ✅ Installed, built, server tested on port 3001
- ✅ HTTP 200 confirmed, serves PWA app with React + CodeMirror + xterm.js
- ✅ Strong operator workspace candidate (terminal, git explorer, file explorer)
- ⚠️ AGPL-3.0 remains a major legal/commercial risk
- ⚠️ No Ollama support (cloud-only: Claude/Cursor/Codex/Gemini)

### Chatbot UI Test Result:
- ✅ Installed (1455 packages, 66 vulnerabilities reported)
- ✅ Build successful (Next.js static generation)
- ❌ Full app test not completed (requires Supabase setup)
- ✅ Strong chat UX candidate (AI SDK, multi-model, Ollama support)
- ❌ Weaker for terminal/git/operator workspace (no terminal, no git explorer, no file explorer)

### Decision:
1. **Do not fork either repo yet**
2. **Do not install Supabase yet**
3. **Do not use AGPL code directly inside KAH Prime without legal review**
4. **Best path**: Build a lightweight KAH Prime prototype in a separate repo using our own code, borrowing UX patterns only

### Secondary reference:
- Use chatbot-ui as chat layer inspiration (AI SDK patterns)
- Use claudecodeui as operator workspace inspiration (terminal, git, files)
- Reference `langchain-ai/open-canvas` (archived) for canvas/artifact patterns

## 17. Recommended Next Prototype

### Create a new repo from project-kah-prime-codex template:
- **Name suggestion**: `kah-prime-cockpit-prototype`
- **Base**: Separate repo (not inside `~/Omega081180`)

### Build a minimal Next.js shell with:
1. **Left sidebar** — Project navigation (Projects, Docs, Tasks, Logs, Scripts, Settings)
2. **Central agent chat/thread** — Primary workspace (inspired by chatbot-ui chat patterns)
3. **Right context/status panel** — Model, files, git status, health, next action
4. **Bottom prompt input** — Command/text input bar
5. **Healthcheck/status card** — Quick system status (reuse `docs/HEALTHCHECK.md` patterns)
6. **Workflow tracker**: Read → Plan → Approve → Build → Verify → Commit → Push

### Inspiration sources (UX patterns only, no code copying):
- Chatbot UI (mckaywrigley/chatbot-ui) — MIT, chat layer patterns
- CloudCLI (siteboon/claudecodeui) — AGPL-3.0, operator workspace layout (do not use code directly)
- Open Canvas (langchain-ai/open-canvas) — MIT, canvas/artifact patterns

---

## 18. Next Test Plan
1. **Legal review** — Have AGPL-3.0 license reviewed before any modification or distribution of claudecodeui
2. **Do not fork either repo yet**
3. **Do not install Supabase yet**
4. **Build prototype** — Create `kah-prime-cockpit-prototype` repo with minimal Next.js shell
5. **Document findings** — Continue updating this file as prototype progresses

---
**Document version:** 1.0  
**Last updated:** 2026-05-03  
**Status:** Initial evaluation complete, pending install tests and legal review
