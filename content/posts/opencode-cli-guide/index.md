---
title: 'OpenCode CLI: Your Terminal-Native AI Coding Assistant'
description: 'A comprehensive guide to OpenCode CLI — the open-source, terminal-native AI coding agent. Learn installation, features, supported providers, use cases, and how it compares with Claude Code, Codex, and Gemini CLI.'
date: '2026-07-30'
draft: false
slug: '/blogs/opencode-cli-guide'
tags:
  - AI
  - Developer Tools
  - CLI
  - Open Source
  - Tutorial
---

## Introduction

AI coding assistants have gone from novelty to necessity in just a couple of years. Tools like GitHub Copilot and Cursor showed developers what it feels like to have a second brain on tap — autocompleting functions, generating tests, and explaining unfamiliar code in plain English. But as the tooling matured, a new wave of developers started asking a different question: _what if the AI didn't live inside an editor at all?_

That's where terminal-native AI tools come in. They run where your Git workflow already lives, understand your whole project rather than just the open file, and give you fine-grained control over how changes get applied. For many engineers — especially those who live in Vim, Neovim, or plain old bash — the terminal is home.

Enter **OpenCode CLI**: an open-source, terminal-native AI coding agent designed for developers who want a powerful, transparent, and highly customizable AI pair programmer without being locked into a proprietary ecosystem. In this guide, we'll walk through everything you need to know — from installation to real-world workflows — and show you why it's quickly becoming a favorite among AI developer tools.

---

## What is OpenCode CLI?

OpenCode is an **open-source AI coding agent** that runs natively in your terminal. It's a single binary you launch with the `opencode` command, and it opens a polished terminal user interface (TUI) where you can chat with an AI model that has full access to your project.

But calling it "just a chatbot" undersells it. OpenCode is an _agent_ — it can read files, search your codebase, write and edit files, run commands, and work through multi-step tasks on your behalf. It's designed to feel like a thoughtful pair programmer sitting next to you, not a glorified autocomplete.

The project's design philosophy is refreshingly pragmatic:

- **Terminal-first.** Your editor, your Git hooks, your muscle memory — everything stays the same.
- **Open source.** The entire codebase lives on GitHub, so you can audit what it does, contribute features, and even fork it.
- **Provider-agnostic.** Use OpenAI, Anthropic, Google, local models, or anything in between. OpenCode is the _interface_; you choose the brain.
- **Privacy-respecting.** Your code and conversations go only to the provider you explicitly configure. There's no third-party middleman unless you add one.

While the terminal experience is the core, OpenCode also ships as a desktop app and an IDE extension, so you can pick the surface that fits your workflow.

---

## Key Features

Let's break down what makes OpenCode feel powerful in practice.

### AI-Powered Coding Assistance

At its heart, OpenCode is a full agentic coding assistant. You can ask it to write features, fix bugs, refactor code, and explain complex logic — and it will actually do the work across your project, not just in a single file.

### Project-Aware Context

OpenCode doesn't treat your files as isolated snippets. When you run `/init`, it analyzes your project and generates an `AGENTS.md` file in the root that captures the project's structure and coding patterns. Every future session reads that context, so the AI understands your conventions before it touches a single line.

```bash
cd /path/to/project
opencode
/init
```

> **Tip:** Commit your project's `AGENTS.md` file to Git. It helps OpenCode — and your teammates — understand the codebase instantly.

### Terminal-Native Workflow

Everything runs in your existing terminal emulator. There's no new IDE to learn, no cloud workspace to provision, and no context-switching. If you already live in a terminal, OpenCode feels instantly familiar.

### Plan Mode & Build Mode

One of OpenCode's smartest features is the ability to separate _thinking_ from _doing_. Press **Tab** to switch into **Plan mode**, describe the feature you want, and the agent will propose an implementation strategy without changing any files. Review it, iterate on it, then press Tab again to enter **Build mode** and let it execute.

```
When a user deletes a note, we'd like to flag it as deleted in the database.
Then create a screen that shows all the recently deleted notes.
```

### Multi-File Editing

Ask OpenCode to implement a feature that spans several files, and it will make coordinated edits across all of them — updating imports, touching related modules, and keeping the change consistent.

### Undo / Redo

Made a change you don't like? Run `/undo` to revert it, and OpenCode brings back your original prompt so you can tweak and retry. Run it multiple times to step backward through several changes, or use `/redo` to move forward again.

### Git Integration

OpenCode works naturally alongside Git. It can operate on PR branches (`opencode pr <number>`), and the GitHub agent lets you automate repository workflows like issue triage and review through a GitHub Actions workflow.

### Support for Multiple LLM Providers

This is a defining differentiator. OpenCode builds on the [AI SDK](https://ai-sdk.dev/) and [Models.dev](https://models.dev), giving you access to **75+ LLM providers**. You can switch brains for different tasks — a fast model for quick questions, a frontier model for deep refactors — all from the same interface.

### Fast Performance

OpenCode is a compiled binary with a snappy TUI. Startup is quick, keystrokes are responsive, and sessions are cached so you can resume where you left off instantly.

### Extensibility

OpenCode is built to be extended:

- **Agents** — define custom agents with their own system prompts and permission sets (`opencode agent create`).
- **Plugins** — install plugins that add tools and integrations (`opencode plugin <module>`).
- **MCP Servers** — connect Model Context Protocol servers for external tooling (`opencode mcp add`).
- **Custom Tools & LSP Servers** — add your own tools and language-server-powered capabilities.
- **Themes & Keybinds** — make the TUI yours.

### Custom Prompts & Commands

Create your own reusable slash commands and prompts so common workflows are one keystroke away.

### Permissions & Safety

OpenCode runs with a permission system that lets you gate what the agent can do — read-only vs. write access, allowed tools, and command execution. Combined with Plan mode and `/undo`, you stay in control.

---

## Installation

OpenCode is easy to install on every major platform.

### One-Line Install Script

The fastest way:

```bash
curl -fsSL https://opencode.ai/install | bash
```

### Using a Package Manager

**npm / Bun / pnpm / Yarn:**

```bash
npm install -g opencode-ai
bun install -g opencode-ai
pnpm install -g opencode-ai
yarn global add opencode-ai
```

**Homebrew (macOS and Linux):**

```bash
brew install anomalyco/tap/opencode
```

> **Note:** The OpenCode tap is updated more frequently than the official Homebrew formula, so the tap is recommended.

**Arch Linux:**

```bash
sudo pacman -S opencode        # Stable
paru -S opencode-bin           # Latest from AUR
```

**Windows:**

The best experience on Windows is through **WSL** (Windows Subsystem for Linux), but you also have several native options:

```bash
choco install opencode          # Chocolatey
scoop install opencode          # Scoop
npm install -g opencode-ai      # npm
mise use -g github:anomalyco/opencode  # mise
docker run -it --rm ghcr.io/anomalyco/opencode  # Docker
```

You can also grab prebuilt binaries directly from the [GitHub Releases](https://github.com/anomalyco/opencode/releases) page.

---

## Getting Started

Let's take OpenCode for a spin.

### 1. Configure a provider

Run the `/connect` command inside the TUI and choose your provider. If you're new, the easiest starting point is **OpenCode Zen** — a curated list of models tested and verified by the OpenCode team.

```
/connect
```

Pick a provider, and it will guide you through authentication — either pasting an API key or opening a browser to sign in.

> **Note:** If you already have a ChatGPT Plus, GitHub Copilot, or GitLab Duo subscription, OpenCode can use those credentials directly with zero extra setup.

### 2. Select a model

List available models with:

```
/models
```

Models appear in `provider/model` format (for example, `anthropic/claude-sonnet-4`). You can switch models at any time.

### 3. Open your project

Navigate to your project and launch OpenCode:

```bash
cd /path/to/project
opencode
```

Run `/init` so the agent builds an `AGENTS.md` with project context.

### 4. Ask questions

You can ask OpenCode to explain parts of the codebase you didn't write. Use `@` to fuzzy-search for files:

```
How is authentication handled in @packages/functions/src/api/index.ts
```

### 5. Make changes

For a direct change, just describe it:

```
We need to add authentication to the /settings route. Take a look at how this is
handled in the /notes route and implement the same logic for /settings.
```

For anything non-trivial, switch to **Plan mode** first (press Tab), review the plan, then switch back to **Build mode** and say _"Go ahead and make the changes."_

### 6. Undo if needed

Not happy with the result?

```
/undo
```

OpenCode reverts the changes and brings back your prompt so you can refine it.

### 7. Non-interactive mode

You don't always need the full TUI. For quick questions or scripting:

```bash
opencode run "Explain how closures work in JavaScript"
```

This runs OpenCode headlessly and prints the answer — perfect for automation and CI pipelines.

---

## Real-World Use Cases

Here's where OpenCode shines in day-to-day development.

### Debugging

Stuck on a cryptic error? Paste the stack trace and let the agent trace the root cause:

```bash
opencode run "The tests are failing with a TypeScript type error in src/services. Diagnose the issue and propose a fix."
```

### Refactoring Legacy Code

OpenCode can safely modernize old code across a codebase, preserving behavior while improving structure. Run it in Plan mode first to review exactly what will change before committing.

### Explaining Unfamiliar Code

Joining a new codebase is intimidating. Ask targeted questions about specific files, and OpenCode explains the architecture using your project's actual code as context.

### Writing Tests

Generate unit and integration tests that match your existing test conventions:

```
Look at the testing patterns in @tests/unit and write equivalent tests for the new payment service.
```

### Documentation Generation

Struggling to keep docs current? OpenCode can generate README sections, inline doc comments, and API documentation straight from your source.

### Code Review

Use `opencode pr <number>` to fetch a PR branch and have the agent review the diff for bugs, edge cases, and style issues before you request human review.

### Learning New Frameworks

Ask OpenCode to translate a pattern you know into a framework you don't:

```
I know how to do dependency injection in Spring. Show me how to do the same in FastAPI, using this project's conventions.
```

---

## Supported AI Models

One of OpenCode's biggest advantages is provider freedom. Because it's built on the AI SDK and Models.dev, it supports **75+ providers**, including:

### Hosted Providers

- **OpenAI** — GPT models, and ChatGPT Plus/Pro subscription support
- **Anthropic** — Claude models
- **Google** — Gemini via Vertex AI or Google AI
- **OpenRouter** — a unified gateway to hundreds of models
- **Groq** — blazing-fast inference
- **DeepSeek** — strong open-weights models at low cost
- **xAI** — Grok models
- **Azure OpenAI** & **Amazon Bedrock** — enterprise cloud deployments
- **Cloudflare** (Workers AI / AI Gateway), **NVIDIA**, **Hugging Face**, **Together AI**, **Moonshot AI**, **MiniMax**, **Cerebras**, and dozens more

### Local Models

Prefer to keep everything on your machine? OpenCode works with:

- **Ollama** — popular local model runner
- **LM Studio** — desktop app for local LLMs
- **llama.cpp** — via its `llama-server` utility
- **Atomic Chat** — local models behind an OpenAI-compatible server

Local models mean zero per-token cost, full privacy, and the freedom to experiment offline.

### OpenCode's Own Offerings

- **OpenCode Zen** — a curated, tested list of models from the OpenCode team.
- **OpenCode Go** — a low-cost subscription providing reliable access to popular open coding models.

---

## Advantages

Why choose OpenCode over a traditional, editor-bound assistant?

### Privacy

Your code and prompts are sent only to the provider you explicitly configure. There's no opaque middleman collecting your data by default.

### Speed

As a native terminal binary, OpenCode is fast to launch and responsive. No bloated IDE extensions or remote workspace round-trips.

### Open-Source Ecosystem

Being open source means total transparency and the ability to contribute. If you don't like a behavior, you can change it — or install a community plugin that does.

### Flexibility

Switch between 75+ providers and local models with a single command. Use the best model for each task, not whatever the tool vendor decided to bundle.

### Cost Efficiency

Because you control the provider, you control the bill. Use cheap models for routine tasks, frontier models only when needed, or run fully local models for \$0.

### No Vendor Lock-In

The TUI and config are provider-agnostic. If a new model provider launches tomorrow, you just add a key — no migration.

### Local Model Support

For air-gapped environments, privacy-sensitive work, or budget constraints, local models through Ollama, LM Studio, or llama.cpp are a first-class option.

---

## Comparison

How does OpenCode stack up against the other major terminal AI assistants?

| Feature                 | **OpenCode CLI**                              | **Claude Code**                | **OpenAI Codex CLI** | **Gemini CLI**       |
| ----------------------- | --------------------------------------------- | ------------------------------ | -------------------- | -------------------- |
| **Open source**         | ✅ Yes                                        | ❌ No (proprietary)            | ✅ Yes               | ❌ No                |
| **Terminal-first**      | ✅ Yes                                        | ✅ Yes                         | ✅ Yes               | ✅ Yes               |
| **Local model support** | ✅ Yes (Ollama, LM Studio, llama.cpp)         | ❌ No                          | ❌ No                | ❌ No                |
| **Multiple providers**  | ✅ 75+ providers                              | ⚠️ Limited (Anthropic-centric) | ❌ OpenAI-centric    | ❌ Google-centric    |
| **Customization**       | ✅ High (plugins, MCP, custom agents, themes) | ⚠️ Medium (extends Claude)     | ⚠️ Medium            | ⚠️ Low-Medium        |
| **Pricing**             | ✅ Free (bring your own provider)             | ⚠️ Subscription/usage          | ⚠️ Usage-based       | ⚠️ Free tier + usage |
| **Ease of use**         | ✅ Great onboarding (`/connect`, `/init`)     | ✅ Very good                   | ✅ Good              | ✅ Good              |

The takeaway: if you want **freedom of choice** — open source, any provider, and local models — OpenCode is the strongest option today. Claude Code and the others are polished tools, but they're tightly coupled to their parent companies' ecosystems.

---

## Tips and Best Practices

A few habits that get the most out of OpenCode:

1. **Commit `AGENTS.md`.** Project context is the single biggest quality lever. Keep it up to date.
2. **Use Plan mode for big changes.** Always let it propose a strategy before touching code. Iterate on the plan first.
3. **Be specific in prompts.** Talk to OpenCode like a junior engineer: give file paths, expected behavior, and constraints.
4. **Use `@` to reference files.** Fuzzy-search with `@` gives the agent precise file context.
5. **Lean on `/undo`.** Don't be afraid to experiment — you can always revert.
6. **Try `opencode run` for automation.** Script common questions or wire it into CI for quick answers.
7. **Match the model to the task.** Use fast/cheap models for routine edits, frontier models for hard refactors.
8. **Configure permissions.** Start read-only where possible, then open up write access as you build trust.
9. **Use MCP servers and plugins.** Extend OpenCode with your team's tools instead of reinventing workflows.
10. **Share sessions with `/share`** when collaborating, so teammates can see exactly what the agent did.

---

## Limitations

No tool is perfect, and it's worth being honest about OpenCode's current rough edges:

- **Terminal prerequisites.** It expects a modern terminal emulator, and on Windows the best experience is via WSL. That's a barrier for some developers.
- **Learning curve.** Agents, permissions, MCP, and config files are powerful but take time to learn compared to a simple autocomplete plugin.
- **Token costs.** Hosted models charge per token, so heavy agentic use can add up — though local models and `OpenCode Go` help.
- **Experimental surface.** The project moves fast, and some features are still experimental and can change between releases.
- **Prompt quality matters.** Like all LLM tools, output quality depends heavily on how well you frame your requests and how good your project context is.

These are fair trade-offs for the flexibility you get, and most are actively being addressed by the project's rapid development.

---

## Future of AI Terminal Assistants

We're at an inflection point. The next wave of developer tooling isn't about autocomplete — it's about _agents_ that plan, execute, and verify multi-step work. Terminal-native assistants like OpenCode are at the center of that shift.

Several trends point to where this is heading:

- **Agentic workflows.** Tools are moving from "suggest a line" to "design, build, test, and ship" — with humans reviewing at key checkpoints.
- **The MCP ecosystem.** Model Context Protocol is becoming the standard way for agents to talk to external tools, databases, and services. OpenCode's native MCP support puts it ahead of the curve.
- **Local models getting good.** As open-weights models close the gap with frontier models, local-first agents become viable for more teams — and OpenCode already supports them.
- **Blurring editor/terminal boundaries.** Desktop apps and IDE extensions are lowering the barrier for developers who prefer GUIs, without giving up the agent's power.
- **Open source as a trust signal.** In a tool that touches your source code, being able to audit and extend it matters. Open-source agents have a durable advantage.

OpenCode is well-positioned in this ecosystem: it's open source, provider-agnostic, and aggressively extensible. As agentic workflows become the default, tools that let _you_ choose the brain — and take it with you anywhere — will win the developer's trust.

---

## Conclusion

OpenCode CLI is more than just another AI coding assistant. It's a terminal-native, open-source agent that puts **you** in control: your provider, your models, your permissions, your workflow. Whether you're a solo developer who wants a powerful pair programmer, an engineer who values privacy and local models, or a team building custom agentic workflows, OpenCode adapts to you — not the other way around.

The fastest way to decide if it's for you is to try it:

```bash
curl -fsSL https://opencode.ai/install | bash
```

Then `cd` into a project, run `opencode`, hit `/connect`, and ask it something about your code. Five minutes in, you'll know exactly why terminal-native AI tools are the future — and why **OpenCode CLI** deserves a permanent spot in your toolkit.
