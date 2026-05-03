# PROJECT BRIEF — KAH Prime Codex

## Mission
Build a reusable AI Software Development Cockpit Template using free/open tools.

## Goals
1. Local-first AI coding environment
2. No paid APIs required (optional cloud enhancements allowed)
3. Reproducible setup via Homebrew + npm
4. Clear rules for AI agents (AGENTS.md, GEMINI.md)
5. Template structure for other developers to fork and use

## Tool Stack
- **Editor**: VS Code
- **Local LLM**: Ollama + qwen2.5-coder:7b
- **Cloud AI**: Gemini CLI + Gemini Code Assist (free tier)
- **Agent**: Cline (VS Code extension)
- **Git**: GitHub CLI + macOS Keychain

## Non-Functional Requirements
- All tools must be free (as in free tier, not necessarily open source)
- Setup must work on macOS with Homebrew
- No secrets in commits
- Clear documentation for every component
- Agent rules must prevent hallucinations and destructive changes

## Success Criteria
- [ ] Repo forks cleanly
- [ ] `git clone` + setup guide produces working environment
- [ ] All AI tools respond to test prompts
- [ ] No `git add .` — explicit staging only
- [ ] AGENTS.md rules enforced by all agents
