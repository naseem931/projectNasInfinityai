# NasInfinity AI (v1.2.0)

A modern, high-performance, browser-native AI assistant and developer workspace with live internet intelligence, **Multimodal Vision & Document Attachment Engine**, **In-Browser Python WebAssembly Runner (Pyodide)**, **Real-Time Token Streaming**, **Workspace Search & Full Backup/Restore**, an integrated **Natural Language Processing (NLP) Studio**, **Interactive Periodic Table of Elements Studio (118 Elements)**, **Offline Arcade Game (Runner: Zero Gravity)**, speech synthesis/recognition, Markdown tables, live interactive code sandboxes, and a **Local-First, Zero-Telemetry Privacy Architecture**.

[![Version: 1.2.0](https://img.shields.io/badge/Version-1.2.0-indigo.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: Production Ready](https://img.shields.io/badge/Status-Commercial%20Ready-emerald.svg)]()
[![Privacy: Zero Telemetry](https://img.shields.io/badge/Privacy-100%25%20Local--First-indigo.svg)]()

---

## 🌟 What's New in v1.2.0

1. **📷 Multimodal Vision & Document Attachment Engine:**
   * Click the attachment icon (`📎`) or drag-and-drop images, screenshots, code files, and documents directly into the chat.
   * Visual preview tray with file size formatters and removal controls.
   * Native vision inference through Gemini 2.5 Flash and OpenAI GPT-4o mini APIs.
   * Client-side extraction for `.txt`, `.py`, `.js`, `.json`, `.csv`, `.md`, `.html`, `.cpp`, `.java`, and `.ts`.

2. **⚡ Real-Time Streaming (ReadableStream / SSE):**
   * Real-time Server-Sent Events (SSE) streaming for Gemini and OpenAI models.
   * Words and code stream in token-by-token with instant Time-to-First-Token (TTFT) and zero initial delay.

3. **🐍 In-Browser Python WebAssembly Runner (Pyodide):**
   * Click **"▶ Run Python (Wasm)"** on any generated Python code block to execute code directly inside your browser.
   * Powered by WebAssembly (Wasm) with live standard output (`stdout`), standard error (`stderr`), and return value capture.

4. **🔍 Workspace Search, Pinning & Full JSON Backup/Restore:**
   * **Instant Conversation Search:** Filter past discussions in real-time by title or message contents.
   * **Chat Pinning:** Pin your essential conversations (`📌`) to keep them at the top of your sidebar.
   * **Complete Workspace Backup & Restore:** Export all chats, memory profiles, settings, and arcade scores into a single portable `.json` file, and restore it with one click on any machine.

5. **📱 Progressive Web App (PWA) & Offline Service Worker:**
   * Fully installable on Desktop (Chrome/Edge) and Mobile home screens.
   * Cache-first service worker (`sw.js`) guarantees 100% offline access to the Periodic Table Studio, Coding Tutor, Code Writer, and Arcade Game.

6. **🧪 Automated Test Harness (`npm test`):**
   * Integrated zero-dependency test suite in `tests/test-suite.js` testing endpoints, security headers, path traversal guards, and dataset integrity.

---

## 🔬 Core Studios & Features

1. **🔬 Integrated NLP Studio & Tokenizer:**
   * **Visual Token Segmentation:** Color-coded token pills illustrating how modern LLMs (BPE/WordPiece) segment words, punctuation, and subwords.
   * **Sentiment & Polarity Analysis:** Real-time sentiment detector (Positive, Neutral, Negative) with emotional signal extraction.
   * **Readability & Complexity Metrics:** Automated reading grade levels and estimated reading duration.
   * **Live Input NLP Stats:** Real-time word and token counter updating dynamically as you type.

2. **🧪 Interactive Periodic Table of Elements Studio (118 Elements):**
   * **Full IUPAC 18-Column Grid:** Standard periods 1 to 7 with Lanthanides (57-71) and Actinides (89-103) f-block rows.
   * **Comprehensive Element Dossiers:** Atomic mass, electron configuration, Bohr shell distributions (K through Q), electronegativity (Pauling), melting/boiling points, density, oxidation states, and discovery dates for all 118 elements.
   * **Real-Time Chemical Filtering:** Instant filtering by chemical category and standard state (Solid, Liquid, Gas, Synthetic).
   * **Audio Pronunciation & AI Querying:** Listen to element names and details read aloud or click *"Ask AI"* for chemical bonding and industrial applications.

3. **🎮 Offline Arcade: Runner Zero Gravity (100% Offline Game):**
   * **Automatic Disconnect Detection:** When your network drops, an animated offline banner slides into view with a one-click launcher to play.
   * **60 FPS Canvas Physics Engine:** Endless cyber runner featuring double jump, crouch mechanics, glitch drones, and laser spikes.
   * **Synthesized Retro Audio (Web Audio API):** Procedural 8-bit sound effects generated live without external sound files.

4. **🎙️ Voice Recognition & Text-to-Speech (Audio NLP):**
   * **Speech-to-Text (STT - Fully Automatic Auto-Send):** Transcribes speech in real-time and automatically sends your prompt when you stop speaking.
   * **Text-to-Speech (TTS):** High-fidelity voice playback of assistant answers.

5. **💬 Conversational Understanding & Natural Context (NasInfinity-CI):**
   * **Dialogue Memory & Anaphora:** Resolves follow-up queries referencing previous context.
   * **Personal Profile Memory:** Remembers your name, vocation, and preferences in `localStorage`.
   * **Conversational Math & Conversions:** Instant calculations, percentages, and metric/imperial conversions.

6. **🧮 Interactive Code Sandboxes:**
   * **HTML/JS Live Preview:** Execute interactive web apps, calendars, calculators, and games inside the browser sandbox.
   * **Python Wasm Execution:** Execute Python scripts directly inside the client terminal.

---

## 🔒 Privacy Notice & Data Security

NasInfinity AI is engineered with a strict **Local-First, Client-Side Privacy Model**:
1. **Zero Server-Side Logging:** The included server ([server.js](server.js)) stores no cookies, collects no analytics, and maintains zero chat logs.
2. **Client-Side Storage:** Chat histories and user memory profiles reside exclusively in your browser's private `localStorage`.
3. **API Key Security:** Personal keys for Gemini or OpenAI remain strictly inside your browser sandbox.

---

## 🚀 Deployment & Running

### 1. Instant Local Launch
Double-click [index.html](index.html) to open the app directly in any modern browser.

### 2. Local Node.js Server
```powershell
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Automated Test Suite
```powershell
npm test
```

---

## 📁 Repository Structure

* [index.html](index.html) — Streamlined single-page application core with multimodal attachments and PWA manifest.
* [style.css](style.css) — Custom styles, periodic table theme classes, and responsive drawer animations.
* [manifest.json](manifest.json) — Progressive Web App manifest for desktop and mobile installation.
* [sw.js](sw.js) — Cache-first service worker for instant offline loading.
* `js/` — Modular feature engines & studios:
  * [js/app.js](js/app.js) — Core chat application logic, workspace search, backup/restore, and streaming dispatcher.
  * [js/document-processor.js](js/document-processor.js) — Drag-and-drop file attachment and image vision processor.
  * [js/python-runner.js](js/python-runner.js) — In-browser Python WebAssembly runner powered by Pyodide.
  * [js/periodic-table.js](js/periodic-table.js) — Interactive Periodic Table of Elements Studio (118 elements).
  * [js/game.js](js/game.js) — Offline Arcade Runner Game physics engine (Canvas 60 FPS & Web Audio API).
  * [js/nlp.js](js/nlp.js) — NLP Studio Tokenizer, sentiment analysis, TTS read-aloud, and sandbox modal.
  * [js/code-generators.js](js/code-generators.js) — Interactive code sandbox generators and offline fallback engines.
  * [js/coding-tutor.js](js/coding-tutor.js) — Universal Programming Academy tutorials.
  * [js/code-writer.js](js/code-writer.js) — Step-by-Step Code Writing guides.
  * [js/conversational-ai.js](js/conversational-ai.js) — Dialogue memory, multimodal API handlers, and Wikipedia search.
* [server.js](server.js) — Production-ready, zero-dependency Node.js HTTP server.
* `tests/test-suite.js` — Automated regression and endpoint test suite.
* [LICENSE](LICENSE) — Official MIT License.
* [README.md](README.md) — Documentation and release notes.
