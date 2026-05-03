# SETUP GUIDE — KAH Prime Codex

Complete step-by-step setup for a fresh macOS machine.

## Prerequisites
- macOS with Homebrew installed
- GitHub account (free tier OK)
- Google account (for Gemini, free tier OK)

---

## 1. Install Core Tools

```bash
# Update Homebrew
brew update

# Install git, gh, node, ollama
brew install git gh node ollama

# Verify
git --version
gh --version
node --version
npm --version
ollama --version
```

## 2. Configure Git and GitHub

```bash
# Authenticate with GitHub
gh auth login
# Select: GitHub.com → HTTPS → Login with browser

# Verify
gh auth status

# Configure git
git config --global user.name "your-username"
git config --global user.email "your-email@example.com"
git config --global credential.helper osxkeychain
```

## 3. Install Gemini CLI

```bash
npm install -g @google/gemini-cli

# Authenticate (opens browser)
gemini

# Verify
gemini --version
```

## 4. Start Ollama and Pull Model

```bash
# Start Ollama service (persistent)
brew services start ollama

# Wait a few seconds, then pull model
ollama pull qwen2.5-coder:7b

# Verify
ollama list
ollama run qwen2.5-coder:7b "hello"
```

## 5. Install VS Code and Extensions

```bash
# Install VS Code
brew install --cask visual-studio-code

# Enable code CLI (open VS Code, Cmd+Shift+P)
# Run: "Shell Command: Install 'code' command in PATH"

# Install extensions
code --install-extension google.geminicodeassist
code --install-extension saoudrizwan.claude-dev

# Verify
code --version
```

## 6. Clone This Repo

```bash
# Clone
git clone https://github.com/blackbox118811/project-kah-prime-codex.git
cd project-kah-prime-codex

# Verify
git status
```

## 7. Configure Environment

```bash
# Copy example env
cp .env.example .env

# Edit .env and add your tokens
# Never commit .env (already in .gitignore)
```

## Done

All tools installed and configured. Test with:
```bash
gemini "hello from gemini"
ollama run qwen2.5-coder:7b "hello from local model"
code .
```
