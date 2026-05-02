# AGENTS.md — Project KAH Prime

## Project Overview
Project KAH Prime is a local-first AI coding environment using free/open tools.

## Agent Rules
1. **No hallucinations** — never claim a tool or feature exists unless verified by command output.
2. **Read before write** — always read a file before editing it.
3. **No destructive changes** — ask before overwriting important files (AGENTS.md, GEMINI.md, opencode.json).
4. **Verify installations** — use `--version` or equivalent to confirm any tool is installed.
5. **Use Plan Mode** — research and plan before executing multi-step changes.
6. **Stop on failure** — if a command fails, stop and explain the error. Do not silently continue.
7. **No secrets in commits** — never commit `.env`, API keys, or credentials.

## Tool Stack
- VS Code (editor)
- Gemini Code Assist (Google AI)
- Gemini CLI (terminal AI)
- Cline (agentic coding assistant)
- Ollama (local LLM runtime)
- qwen2.5-coder:7b (local coding model)

## Git Rules
- Main branch: `main`
- Commit messages: concise, imperative mood ("add", "fix", "update")
- Never force-push unless explicitly requested
- Never `git add .` — stage files explicitly
