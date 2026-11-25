# NasInfinity AI (v2.0.0)

A production-ready, browser-native AI assistant and spatial developer workspace featuring a **Spatial Obsidian & Daylight Paper UI**, **Multimodal Vision & Document Attachments**, **In-Browser Python WebAssembly Runner (Pyodide)**, **Real-Time Token Streaming**, **Spotlight Command Palette (`⌘K`)**, **Workspace Search & Full JSON Backup/Restore**, **NLP Studio**, **Interactive Periodic Table Studio (118 Elements)**, **Offline Arcade Game (Runner: Zero Gravity)**, and a **Hardened Zero-Dependency Node.js Server**.

[![Version: 2.0.0](https://img.shields.io/badge/Version-2.0.0-indigo.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)]()
[![Privacy: Zero Telemetry](https://img.shields.io/badge/Privacy-100%25%20Local--First-indigo.svg)]()

---

## 🌟 What's New in v2.0.0

1. **🔒 Production Security & Server Hardening (`server.js`):**
   * **Strict Static Asset Protection:** Blocks hidden dotfiles (`.git`, `.env`, `.gitignore`) and internal server/test files (`server.js`, `package.json`, `tests/`).
   * **Gzip Compression & Tiered Caching:** Zero-dependency `zlib` gzip compression, weak `ETag` / `304 Not Modified` support, and environment-configurable CORS.
   * **Rate Limiting & Payload Validation:** Per-IP sliding-window rate limiter (`429 Too Many Requests`), JSON validation (`400`), and `413 Payload Too Large` protection on `/api/chat`.
   * **Sandboxed Live Preview & XSS Escaping:** `#previewIframe` isolated via `sandbox="allow-scripts allow-forms allow-modals"` and `escapeHtml` applied across dynamic UI renders.
   * **Readiness Probes & Containers:** Added `/api/health` + `/health`, `Dockerfile`, `.dockerignore`, `.env.example`, `robots.txt`, and `favicon.svg`.

2. **🎨 Spatial Obsidian & Daylight Paper UI:**
   * Frosted spatial glass surfaces, `Plus Jakarta Sans` & `JetBrains Mono` typography, Dark/Light theme toggle, Bento Studio Launchpad, Floating Capsule Composer, Editorial Message Stream, and `Ctrl+K` / `⌘K` Spotlight Command Palette.

3. **📷 Multimodal Vision, ⚡ Live Streaming & 🐍 Python Wasm:**
   * Drag-and-drop images & code/text attachments (`📎`), real-time SSE token streaming (with custom Model ID override support), and client-side Python 3.12 execution via Pyodide WebAssembly.

4. **🔍 Workspace Search, Pinning & PWA Offline Resilience:**
   * Grouped thread timeline (`Pinned`, `Today`, `Earlier`), real-time thread search, full `.json` backup/restore, and network-first HTML + cache-first asset Service Worker (`sw.js`).

---

## 🚀 Deployment & Running

### 1. Local Node.js Server
```powershell
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** (health check at **[http://localhost:3000/api/health](http://localhost:3000/api/health)**).

### 2. Docker Production Container
```bash
docker build -t nasinfinity-ai:2.0.0 .
docker run -d -p 3000:3000 --name nasinfinity nasinfinity-ai:2.0.0
```

### 3. Production Environment Variables
See [`.env.example`](.env.example):
* `PORT` (default `3000`)
* `HOST` (default `0.0.0.0`)
* `NODE_ENV` (`production` / `development`)
* `ALLOWED_ORIGIN` (default `*`)
* `RATE_LIMIT_MAX` (default `30` requests/window on `POST /api/chat`)
* `RATE_LIMIT_WINDOW_MS` (default `60000` ms)

### 4. Automated Test Suite
```powershell
npm test
```

---

## 📁 Repository Structure

* [index.html](index.html) — Streamlined spatial application shell with sandboxed Live Preview and SEO/OpenGraph tags.
* [style.css](style.css) — Obsidian Dark & Daylight Paper design tokens and spatial glass styles.
* [manifest.json](manifest.json), [sw.js](sw.js), [favicon.svg](favicon.svg), [robots.txt](robots.txt) — PWA manifest, Service Worker, vector icon, and crawler config.
* `js/` — Modular feature engines & studios (`app.js`, `document-processor.js`, `python-runner.js`, `periodic-table.js`, `game.js`, `nlp.js`, `code-generators.js`, `coding-tutor.js`, `code-writer.js`, `conversational-ai.js`).
* [server.js](server.js) — Production-hardened, zero-dependency Node.js HTTP server with gzip, ETag, rate limiting, and `/api/health`.
* [Dockerfile](Dockerfile), [.dockerignore](.dockerignore), [.env.example](.env.example) — Container & cloud deployment configuration.
* [tests/test-suite.js](tests/test-suite.js) — Automated security, compression, endpoint, and dataset regression suite.
* [LICENSE](LICENSE) — Official MIT License.
