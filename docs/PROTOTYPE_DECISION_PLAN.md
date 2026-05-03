# PROTOTYPE DECISION PLAN — KAH Prime Codex

## 1. Decision Purpose
Select the next UX/UI prototype evaluation step for KAH Prime Codex, following audit findings and project rules.

## 2. Options Compared

| # | Option | License | Pros | Cons | Risk |
|---|--------|---------|------|------|------|
| 1 | Clone/evaluate CloudCLI (`siteboon/claudecodeui`) | AGPL-3.0 ⚠️ | Terminal integration, git support, CloudCLI dashboard, Gemini CLI support | AGPL-3.0 requires legal review, TypeScript/React complexity | High (license), Medium (complexity) |
| 2 | Clone/evaluate Chatbot UI (`mckaywrigley/chatbot-ui`) | MIT ✅ | AI SDK multi-model (OpenAI/Anthropic/Gemini/Ollama), session management, active maintenance | No terminal, no git, Next.js/TypeScript | Low (license), Medium (complexity) |
| 3 | Build our own lightweight Next.js prototype | N/A | Full control, clean slate, tailored to KAH Prime needs | Violates audit rules ("no `src/`", "no `package.json`"), time-consuming, duplicates existing work | High (breaks template rules) |
| 4 | **Create scratch evaluation folders outside this repo** ✅ **Recommended** | N/A | Keeps template clean, safe evaluation, no rule violations, allows comparison of #1 and #2 side-by-side | External to repo (findings must be manually documented in `docs/`), not version-controlled with main repo | Low |

## 3. Recommended Path
**Option 4: Create scratch evaluation folders at `~/KAH-Prototype-Eval/`**

## 4. Why
- Complies with `docs/OPEN_SOURCE_UI_BASE_AUDIT.md` Section 12: *"Do not fork anything yet until license, maintenance, install complexity, and local-agent integration are verified"*
- Complies with AGENTS.md rules: no `src/`, no `package.json` in the template repo
- Keeps the clean `~/Omega081180` template repo untouched — no accidental commits of external code
- Allows safe cloning and evaluation of both CloudCLI and Chatbot UI in isolation
- Findings can be documented in `docs/` without polluting the repo structure

## 5. Risks
- Scratch folders won't be version-controlled with the main repo (separate `git init` if needed)
- Manual documentation of findings required in `docs/`
- CloudCLI AGPL-3.0 still requires legal review before any derivative use or distribution
- Evaluation may reveal install complexity not captured in the audit

## 6. Exact Next File to Create
After evaluation, create:
```
docs/PROTOTYPE_EVALUATION_NOTES.md
```
Document findings from `~/KAH-Prototype-Eval/` evaluations (install steps, license verification, local-agent integration results).

## 7. What Not to Do Yet
- ❌ Do not clone anything inside `~/Omega081180`
- ❌ Do not create `src/` or `package.json` in this repo
- ❌ Do not fork/modify CloudCLI until AGPL-3.0 legal review is complete
- ❌ Do not build prototype application code in this repo
- ❌ Do not install Next.js, Vue, Nuxt, or React dependencies in this repo
- ❌ Do not use `/tmp` for scratch folders (may be cleared)

## 8. Scratch Folder Structure (External to Repo)
```
~/KAH-Prototype-Eval/
├── claudecodeui/          # git clone siteboon/claudecodeui
├── chatbot-ui/            # git clone mckaywrigley/chatbot-ui
└── eval-notes.md          # Local evaluation notes (not committed to main repo)
```

## 9. Suggested Commit Message
```
docs: add prototype decision plan with scratch evaluation strategy
```
