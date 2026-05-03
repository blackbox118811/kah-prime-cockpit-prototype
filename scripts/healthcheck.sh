#!/bin/bash
# scripts/healthcheck.sh — Cockpit Healthcheck System
# Verifies tools, git state, cockpit files, and Ollama model.

set -e

CHECKS=0
PASSED=0

check_tool() {
  local tool="$1"
  local check_cmd="$2"
  ((CHECKS++))
  if command -v "$tool" > /dev/null 2>&1; then
    echo "✅ $tool — $($check_cmd 2>/dev/null | head -1)"
    ((PASSED++))
    return 0
  else
    echo "❌ $tool — not found"
    return 1
  fi
}

check_file() {
  local file="$1"
  ((CHECKS++))
  if [ -f "$file" ]; then
    echo "✅ $file — exists"
    ((PASSED++))
    return 0
  else
    echo "❌ $file — missing"
    return 1
  fi
}

check_git_branch() {
  ((CHECKS++))
  local branch
  branch=$(git branch --show-current 2>/dev/null || echo "not a git repo")
  if [ -n "$branch" ] && [ "$branch" != "not a git repo" ]; then
    echo "✅ Git branch — $branch"
    ((PASSED++))
    return 0
  else
    echo "❌ Git branch — $branch"
    return 1
  fi
}

check_git_remote() {
  ((CHECKS++))
  local remote
  remote=$(git remote -v 2>/dev/null | head -1 || echo "no remote")
  if [ -n "$remote" ]; then
    echo "✅ Git remote — $remote"
    ((PASSED++))
    return 0
  else
    echo "❌ Git remote — $remote"
    return 1
  fi
}

check_git_status() {
  ((CHECKS++))
  
  # Check for staged changes
  local staged=0
  if git diff --cached --quiet 2>/dev/null; then
    staged=0
  else
    staged=1
  fi
  
  # Check for unstaged changes
  local unstaged=0
  if git diff --quiet 2>/dev/null; then
    unstaged=0
  else
    unstaged=1
  fi
  
  # Check for untracked files
  local untracked
  untracked=$(git ls-files --others --exclude-standard 2>/dev/null | wc -l | tr -d ' ')
  
  if [ "$staged" -eq 0 ] && [ "$unstaged" -eq 0 ] && [ "$untracked" -eq 0 ]; then
    echo "✅ Working tree — clean"
    ((PASSED++))
    return 0
  else
    local msg=""
    [ "$staged" -eq 1 ] && msg="${msg}staged changes, "
    [ "$unstaged" -eq 1 ] && msg="${msg}unstaged changes, "
    [ "$untracked" -gt 0 ] && msg="${msg}${untracked} untracked file(s), "
    echo "⚠️  Working tree — ${msg%, }"
    ((PASSED++))
    return 0
  fi
}

check_ollama_model() {
  ((CHECKS++))
  if command -v ollama > /dev/null 2>&1; then
    if ollama list 2>/dev/null | grep -q "qwen2.5-coder:7b"; then
      echo "✅ Ollama model — qwen2.5-coder:7b present"
      ((PASSED++))
      return 0
    else
      echo "❌ Ollama model — qwen2.5-coder:7b missing"
      return 1
    fi
  else
    echo "❌ Ollama model — ollama not installed"
    return 1
  fi
}

echo "=== KAH Prime Codex — Cockpit Healthcheck ==="
echo "Timestamp: $(date)"
echo ""

# Tool checks
echo "--- Tools ---"
check_tool "git" "git --version"
check_tool "gh" "gh --version"
check_tool "node" "node --version"
check_tool "npm" "npm --version"
check_tool "gemini" "gemini --version"
check_tool "ollama" "ollama --version"
check_tool "code" "code --version"
if command -v opencode > /dev/null 2>&1; then
  check_tool "opencode" "opencode --version"
else
  ((CHECKS++))
  echo "⚠️  opencode — not installed (optional)"
  ((PASSED++))
fi
echo ""

# Git state checks
echo "--- Git State ---"
check_git_branch
check_git_remote
check_git_status
echo ""

# Required files checks
echo "--- Cockpit Files ---"
check_file "AGENTS.md"
check_file "GEMINI.md"
check_file "README.md"
check_file "opencode.json"
echo ""

# Ollama model check
echo "--- Ollama Model ---"
check_ollama_model
echo ""

# Summary
echo "=== Summary ==="
echo "$PASSED/$CHECKS checks passed"
if [ "$PASSED" -eq "$CHECKS" ]; then
  echo "🎉 All checks passed! Cockpit is healthy."
  exit 0
else
  echo "⚠️  Some checks failed. See above for details."
  exit 1
fi
