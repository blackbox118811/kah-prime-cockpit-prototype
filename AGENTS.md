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
8. **English only** — all visible output, commit messages, documentation, and comments must be in English. Do not use Chinese or other languages in any visible text.

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

## Git Truth Protocol — Mandatory

1. Never claim the branch is ahead, behind, diverged, clean, dirty, pushed, or unpushed unless command output proves it.

2. Before reporting sync status, run:

   git fetch origin
   git status -sb
   git rev-list --left-right --count origin/main...HEAD
   git log --oneline -5

3. Interpret ahead/behind exactly:
   - rev-list output `0 0` means local and origin/main are aligned.
   - `0 N` means local is N commits ahead of origin/main.
   - `N 0` means local is N commits behind origin/main.
   - `A B` where both are non-zero means branches have diverged.

4. If `git status -sb` shows:
   `## main...origin/main`
   with no ahead/behind marker, report:
   "Local main and origin/main are aligned."

5. Never infer ahead/behind from the number of commits in `git log`.

6. Never say "branch is X commits ahead" from stale memory, previous handoff text, or model reasoning.

7. If command output conflicts with previous model claims, command output wins.

8. If `origin/main` is unknown, say:
   "origin/main is not available locally; run git fetch origin first."

9. If a claim was wrong, explicitly correct it:
   "Correction: previous ahead/behind claim was not supported by Git evidence."

10. Every handoff report must include a Git Evidence Block:

   Git Evidence:
   - `git status -sb`: <exact result>
   - `git rev-list --left-right --count origin/main...HEAD`: <exact result>
   - Interpretation: <aligned/ahead/behind/diverged>

## Handoff Honesty Rule

Do not write:
- "ready"
- "complete"
- "pushed"
- "clean"
- "ahead"
- "aligned"
- "verified"

unless the relevant command output has been shown in the same session.
