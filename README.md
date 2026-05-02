# Project KAH Prime

A local-first AI coding environment built on free/open tools.

## Stack
- **VS Code** — editor
- **Gemini Code Assist** — Google AI coding assistant
- **Gemini CLI** — terminal-based AI assistant
- **Cline** — agentic coding extension for VS Code
- **Ollama** — local LLM runtime
- **qwen2.5-coder:7b** — local coding model

## Setup
```bash
# Verify tools
git --version
gh --version
node --version
npm --version
gemini --version
ollama --version
code --version

# Verify Ollama model
ollama list

# Start Ollama if needed
brew services start ollama
```

## Project Files
- `AGENTS.md` — Rules for AI coding agents
- `GEMINI.md` — Rules for Gemini Code Assist
- `opencode.json` — OpenCode configuration

## Git
```bash
git init
git add AGENTS.md GEMINI.md README.md opencode.json
git commit -m "init: project KAH Prime setup"
```
