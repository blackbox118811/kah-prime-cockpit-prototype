# OPERATING ROUTINE — KAH Prime Codex

Daily workflow for AI-assisted development.

## Start of Day

```bash
# 1. Check environment
cd ~/Omega081180
git status

# 2. Ensure Ollama is running
brew services list | grep ollama
# If not running: brew services start ollama

# 3. Verify tools
gemini --version
ollama list
code --version
```

## Development Loop

1. **Read** — Inspect existing code and files
2. **Plan** — Write plan in `tasks/` or discuss with agent
3. **Build** — Make changes (one file at a time when possible)
4. **Verify** — Test, lint, typecheck
5. **Commit** — Explicit stage, clear message
6. **Push** — Sync to GitHub

## Agent Usage

### Gemini CLI (Terminal)
```bash
# Quick questions, code generation
gemini "explain this error: ..."
gemini --prompt "refactor this function for readability"
```

### Gemini Code Assist (VS Code)
- Inline suggestions: type and wait
- Chat: `Cmd+I` or sidebar
- Refactoring: highlight code → right-click → Gemini

### Cline (VS Code)
- Open sidebar, configure provider:
  - Local: Ollama (http://localhost:11434)
  - Cloud: Gemini API
- Give task in chat, review changes, approve

### OpenCode (Terminal)
```bash
opencode
# Uses opencode.json config
# Model: qwen2.5-coder:7b (local)
```

## Git Discipline

```bash
# Always check status first
git status

# Stage explicitly
git add file1.js file2.js

# Commit with clear message
git commit -m "fix: resolve connection timeout in ollama client"

# Push
git push origin main
```

## End of Day

```bash
# Check for uncommitted work
git status

# Commit if needed
git add -A
git commit -m "wip: end-of-day snapshot"

# Push
git push origin main

# Stop Ollama if you want (optional)
# brew services stop ollama
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Ollama not responding | `brew services restart ollama` |
| Gemini CLI auth error | `gemini` (re-authenticate) |
| VS Code extensions missing | Check Extensions sidebar |
| Git push fails | `gh auth status` → re-authenticate |
| Model pull fails | Check internet, try `ollama pull` again |
