# HEALTHCHECK.md — Cockpit Healthcheck System

## Overview

The healthcheck script verifies that your AI Development Cockpit is correctly configured and operational.

---

## How to Run

```bash
cd ~/Omega081180
bash scripts/healthcheck.sh
```

Or make it executable first:
```bash
chmod +x scripts/healthcheck.sh
./scripts/healthcheck.sh
```

---

## What Each Check Means

### Tools Section
Verifies that required CLI tools are installed and accessible in your PATH.

| Check | Purpose |
|-------|---------|
| `git` | Version control system |
| `gh` | GitHub CLI for repo management |
| `node` | Node.js runtime |
| `npm` | Node package manager |
| `gemini` | Gemini CLI (terminal AI) |
| `ollama` | Local LLM runtime |
| `code` | VS Code editor CLI |
| `opencode` | OpenCode (optional, not required) |

### Git State Section
Verifies your git repository is initialized and in a clean state.

| Check | Purpose |
|-------|---------|
| Git branch | Current working branch (should be `main`) |
| Git remote | Connected GitHub remote (should be `origin`) |
| Working tree | Clean, or shows staged/unstaged/untracked separately |

### Cockpit Files Section
Verifies the core cockpit configuration files exist.

| File | Purpose |
|------|---------|
| `AGENTS.md` | Rules for AI coding agents |
| `GEMINI.md` | Rules for Gemini Code Assist |
| `README.md` | Project documentation |
| `opencode.json` | OpenCode configuration |

### Ollama Model Section
Verifies the required local LLM model is available.

| Check | Purpose |
|-------|---------|
| `qwen2.5-coder:7b` | Local coding model for agentic tasks |

---

## Common Fixes

| Check Fails | Fix |
|--------------|-----|
| `git` not found | `brew install git` |
| `gh` not authenticated | `gh auth login` |
| `node` not found | `brew install node` |
| `npm` not found | Reinstall node: `brew reinstall node` |
| `gemini` not found | `npm install -g @google/gemini-cli` |
| `ollama` not running | `brew services start ollama` |
| `code` not found | `brew install --cask visual-studio-code` then enable CLI |
| `opencode` not installed | Optional — install if needed |
| Git branch missing | `git init` or `git checkout main` |
| Git remote missing | `git remote add origin <url>` |
| Working tree has staged | `git commit` or `git restore --staged <file>` |
| Working tree has unstaged | `git add` or `git checkout -- <file>` |
| Working tree has untracked | `rm` or add to `.gitignore` |
| `AGENTS.md` missing | `git checkout -- AGENTS.md` |
| `GEMINI.md` missing | `git checkout -- GEMINI.md` |
| `README.md` missing | `git checkout -- README.md` |
| `opencode.json` missing | `git checkout -- opencode.json` |
| Model missing | `ollama pull qwen2.5-coder:7b` |

---

## Exit Codes

- `0` — All checks passed
- `1` — One or more checks failed

Use in automation:
```bash
./scripts/healthcheck.sh && echo "Deploy!" || echo "Fix issues first."
```
