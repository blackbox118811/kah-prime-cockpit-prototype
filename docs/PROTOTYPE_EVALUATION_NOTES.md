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

## 16. Provisional Recommendation
**Primary evaluation candidate: claudecodeui (CloudCLI)**

### Why:
1. ✅ Terminal support (critical for KAH Prime cockpit)
2. ✅ Git explorer (critical for cockpit)
3. ✅ File explorer with live editing
4. ✅ Multi-agent support (Claude Code, Cursor, Codex, Gemini CLI)
5. ✅ Session management dashboard
6. ✅ Mobile + desktop responsive
7. ✅ Plugin system for extensibility

### Concerns:
1. ⚠️ AGPL-3.0 license requires legal review before distribution
2. ⚠️ No Ollama support (cloud-only models)
3. ⚠️ Additional compliance terms from Siteboon AI B.V.

### Secondary reference: chatbot-ui
- Use as chat layer inspiration (AI SDK patterns)
- Reference for Ollama/local model integration
- MIT license is cleaner for commercial use

### Canvas/artifact inspiration:
- Continue referencing `langchain-ai/open-canvas` (archived) for canvas patterns
- Not suitable as primary base due to lack of terminal/git/file features

## 17. Next Test Plan
1. **Legal review** — Have AGPL-3.0 license reviewed by legal counsel before any modification or distribution of claudecodeui
2. **Install test (claudecodeui)** — Run `npx @cloudcli-ai/cloudcli` and verify:
   - Starts on port 3001
   - Discovers existing Claude Code sessions
   - Terminal integration works
   - Git explorer functional
   - **Node.js version**: Requires v22 (current: v25.9.0 ✅)
   - **Build result (2026-05-03)**: ✅ Built successfully in 23.40s
     - Client: Vite build with code splitting (2.5MB main bundle after gzip: 760KB)
     - Server: TypeScript compiled to `dist-server/`
     - Warnings: Some chunks > 1000KB, CSS syntax warnings in KaTeX
   - **Server start test (2026-05-03)**: ✅ Server runs successfully
     - Listens on port 3001 (IPv4)
     - Detects sessions automatically (Claude, Codex, Cursor, Gemini)
     - Database initialized at `~/.cloudcli`
     - **Persistent run**: `nohup npm run server > server.log` keeps process alive (PID 6611)
     - **HTTP test**: ✅ Responds with HTTP 200, serves HTML/PWA app
     - **App**: Single-page app with React, CodeMirror, xterm.js
     - **PWA**: Service worker, manifest.json, iOS meta tags
   - **Next test**: Open `http://localhost:3001` in browser to test UI
3. **Install test (chatbot-ui)** — Setup Supabase and run `npm install && npm run dev` to verify:
   - AI SDK multi-model selection works
   - Ollama integration functional
   - Session management UI
   - **Node.js version**: Requires v20.11.0 (current: v25.9.0 ✅)
4. **Install test results (2026-05-03)**:
   - `npm install --dry-run` failed for both due to husky prepare script (expected in dry-run)
   - Actual `node_modules/` not present in either folder (not installed yet)
   - Node.js v25.9.0 satisfies both requirements (v22+ for claudecodeui, v20+ for chatbot-ui)
5. **Integration test** — Verify Gemini CLI works with claudecodeui
6. **Document findings** — Update this file with install test results
7. **Decision** — Based on test results, decide:
   - Fork claudecodeui (after legal approval)
   - Build custom prototype inspired by both
   - Wait for better candidate

---
**Document version:** 1.0  
**Last updated:** 2026-05-03  
**Status:** Initial evaluation complete, pending install tests and legal review
