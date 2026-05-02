# GEMINI.md — Gemini Code Assist Rules

## Project: KAH Prime

## Instructions for Gemini Code Assist
1. Follow the agent rules in AGENTS.md at all times.
2. Prefer local tools (Ollama/qwen2.5-coder) for code generation when possible.
3. Use Gemini API for tasks requiring broader context or web knowledge.
4. Keep responses concise — this is a CLI-driven workflow.
5. When editing files, preserve existing code style and conventions.
6. Always explain *why* a change is being made before making it.
7. Test commands before reporting them as solutions.

## Code Style
- Indent: 2 spaces
- Quotes: double quotes for JS/TS, single for shell
- Line length: 100 chars max
- No trailing whitespace

## Local Model
- Runtime: Ollama
- Model: qwen2.5-coder:7b
- Test with: `ollama run qwen2.5-coder:7b "hello"`
