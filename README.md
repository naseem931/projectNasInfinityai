# NasInfinity AI

A modern, high-performance, browser-native AI assistant and developer workspace with live internet intelligence, an integrated **Natural Language Processing (NLP) Studio**, **Interactive Periodic Table of Elements Studio (118 Elements)**, speech synthesis/recognition, Markdown tables, live interactive code sandboxes, and a **Local-First, Zero-Telemetry Privacy Architecture**.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: Production Ready](https://img.shields.io/badge/Status-Commercial%20Ready-emerald.svg)]()
[![Privacy: Zero Telemetry](https://img.shields.io/badge/Privacy-100%25%20Local--First-indigo.svg)]()

---

## 🌟 Key Features

1. **🔬 Integrated NLP Studio & Tokenizer:**
   * **Visual Token Segmentation:** Color-coded token pills illustrating how modern LLMs (BPE/WordPiece) segment words, punctuation, and subwords.
   * **Sentiment & Polarity Analysis:** Real-time sentiment detector (Positive, Neutral, Negative) with emotional signal extraction.
   * **Readability & Complexity Metrics:** Automated reading grade levels and estimated reading duration.
   * **Live Input NLP Stats:** Real-time word and token counter updating dynamically as you type.

2. **🧪 Interactive Periodic Table of Elements Studio (118 Elements):**
   * **Full IUPAC 18-Column Grid:** Standard periods 1 to 7 with Lanthanides (57-71) and Actinides (89-103) f-block rows.
   * **Comprehensive Element Dossiers:** Atomic mass, electron configuration, Bohr shell distributions (K through Q), electronegativity (Pauling), melting/boiling points, density, oxidation states, and discovery dates for all 118 elements.
   * **Real-Time Chemical Filtering:** Instant filtering by chemical category (Alkali, Alkaline Earth, Transition, Post-Transition, Metalloids, Nonmetals, Halogens, Noble Gases, Lanthanides, Actinides) and standard state (Solid, Liquid, Gas, Synthetic).
   * **Dual View Mode:** Standard 18-column Table Grid or responsive Card/List View with multi-property sorting.
   * **Conversational Chemical Intelligence (NasInfinity-CI):** Ask any element question directly in chat (e.g., *"Tell me about Gold"*, *"Element 79"*, *"What is Titanium?"*) for structured scientific dossiers with zero delay.
   * **Audio Pronunciation & AI Querying:** Listen to element names and details read aloud or click *"Ask AI"* to delve into deep chemical bonding, thermodynamics, and real-world industrial applications.

3. **🎙️ Voice Recognition & Text-to-Speech (Audio NLP):**
   * **Speech-to-Text (STT):** Click the microphone button (`🎙️`) to speak prompts naturally into the chat input.
   * **Text-to-Speech (TTS):** Click the speaker button (`🔊`) below any message to have the assistant read the text aloud.

4. **💬 Conversational Understanding & Natural Context (NasInfinity-CI):**
   * **Dialogue Memory & Anaphora:** Resolves follow-up queries referencing previous context (e.g., *"What is recursion?"* &rarr; *"Give me an example"* delivers code).
   * **Personal Profile Memory:** Remembers your name, vocation, and favorite programming language across sessions using client-side `localStorage`.
   * **Conversational Math & Conversions:** Instant calculation of percentages, arithmetic expressions, and metric/imperial unit conversions (°C/°F, mi/km, kg/lbs).
   * **Emotional Empathy:** Detects stress, celebrations, boredom, and offers calming, practical frameworks (such as the 4-7-8 breathing method or study techniques).
   * **Technical & Scientific Knowledge:** Deep explanations for Core CS (Recursion, OOP, Big-O, Docker, APIs, SQL vs NoSQL, Git) and science (Rayleigh scattering, aerodynamics, photosynthesis, GPS).

5. **🧮 Interactive Code Sandbox:**
   * Full Markdown table support (`<table>`) and code highlighting.
   * One-click **"Copy Code"** and **"▶ Run / Preview Live"** interactive sandbox modal to execute HTML/CSS/JavaScript components instantly without leaving the browser.

6. **🌐 Multi-Engine Online AI:**
   * **Online First (Zero-Login):** Free, instant public text generation powered by Pollinations.ai.
   * **Google Gemini API:** Direct browser integration with Gemini 2.5 Flash using your personal API key.
   * **OpenAI API:** Direct browser integration with GPT-4o mini using your personal API key.
   * **Curated Encyclopedic Knowledge:** Instant Wikipedia search summaries with full CC BY-SA 4.0 live source links.

---

## 🔒 Privacy Notice & Data Security (Commercial & Public Hosting)

NasInfinity AI is engineered with a strict **Local-First, Client-Side Privacy Model**:

1. **Zero Server-Side Logging:**
   * The included HTTP server ([server.js](server.js)) is a lightweight, zero-dependency static file server.
   * It stores **no tracking cookies**, collects **no analytics telemetry**, and maintains **zero database logs** of your prompts or conversations.
2. **Client-Side Storage:**
   * All chat histories, user profile memories, and API keys are stored exclusively in your browser's private `localStorage` (`nasinfinity_chats`, `nasinfinity_user_profile`, etc.).
3. **Encrypted Third-Party AI Transmission:**
   * When using online AI features or encyclopedic search, query text is sent directly via encrypted HTTPS to your selected provider:
     * **Online First:** [Pollinations.ai](https://pollinations.ai)
     * **Google Gemini:** [Google Generative AI](https://ai.google.dev/terms)
     * **OpenAI:** [OpenAI API](https://openai.com/policies/terms-of-use)
     * **Wikipedia:** [Wikimedia Foundation REST API](https://wikimediafoundation.org) (CC BY-SA 4.0)
4. **API Key Security:**
   * Personal API keys for Google Gemini or OpenAI are stored solely in your local browser sandbox and are **never** proxied, logged, or shared with unauthorized third parties.
5. **Instant Data Erasure:**
   * You maintain full ownership of your data. Click **"Clear all chats"** in the sidebar, or say *"Forget my name"* / *"Reset memory"* to purge your data instantly.

---

## ⚖️ Legal & Open Source Licensing

* **Brand & Trademark Safety:**
  * **NasInfinity AI** is an independent, original brand. It has zero prior trademark filings in Class 9 or 42 and has no corporate conflicts with third-party software firms.
* **Open Source Licensing:**
  * The software source code is released under the **[MIT License](LICENSE)**. You are free to use, modify, distribute, sublicense, and deploy it commercially.
* **Attributions:**
  * **Tailwind CSS:** Licensed under the [MIT License](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE).
  * **Wikipedia Knowledge:** All factual excerpts are retrieved under the [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) license, with direct source citations included in each response.

---

## 🚀 Deployment & Running

### 1. Instant Local Launch
Simply double-click [index.html](index.html) to open the app directly in any modern web browser (Chrome, Edge, Firefox, Safari).

### 2. Local Node.js Server (with Production Security Headers)
```powershell
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Public Cloud Hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages)
Because NasInfinity AI is 100% self-contained in [index.html](index.html), you can drag-and-drop or push the folder to any static hosting provider with zero build steps:
* **Vercel / Netlify:** Connect your repository or run `netlify deploy` / `vercel`.
* **GitHub Pages:** Enable GitHub Pages in your repo settings pointing to `/ (root)`.
* **Render / Railway / Docker:** Run `node server.js` with `PORT` set by your cloud environment.

---

## 📁 Repository Structure

* [index.html](index.html) — Single-file, self-contained web app with chat UI, NLP Studio, code preview sandbox, and conversational engine.
* [server.js](server.js) — Production-ready, zero-dependency Node.js HTTP server equipped with security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, etc.).
* [LICENSE](LICENSE) — Official MIT License.
* [README.md](README.md) — Documentation, legal disclaimers, and deployment instructions.
