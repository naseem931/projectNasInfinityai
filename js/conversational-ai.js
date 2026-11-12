// =========================================================================
// NasInfinity AI - Conversational Memory, NLU & Live Web Intelligence Engine
// =========================================================================

    var APP_VERSION = '1.0.0';

    // =========================================================================
    // NasInfinity AI Conversational Intelligence Engine (Memory, Math, NLU & Knowledge)
    // =========================================================================

    function getUserProfile() {
      try {
        return JSON.parse(localStorage.getItem('nasinfinity_user_profile') || '{}');
      } catch (e) {
        return {};
      }
    }

    function saveUserProfile(profile) {
      try {
        localStorage.setItem('nasinfinity_user_profile', JSON.stringify(profile));
      } catch (e) {}
    }

    function learnUserProfile(text) {
      const t = text.trim();
      const profile = getUserProfile();
      let updated = false;
      let feedback = '';

      // Explicit name phrases: "My name is John", "Call me Priya", "Name's Alex", "Hi, I'm Sarah"
      const nameMatch = t.match(/(?:my name is|i am called|call me|name's|name is)\s+([A-Z][a-zA-Z]{1,20})\b/i) 
        || t.match(/^(?:hi|hello|hey)[,\s]+i(?:'m| am)\s+([A-Z][a-zA-Z]{1,20})\b/i);

      const nonNameWords = new Set([
        'so', 'feeling', 'bored', 'tired', 'happy', 'sad', 'ready', 'stressed', 'here', 'fine', 'good', 
        'doing', 'an', 'the', 'a', 'back', 'learning', 'working', 'trying', 'thinking', 'wondering', 
        'curious', 'asking', 'sorry', 'exhausted', 'excited', 'confused', 'stuck', 'busy', 'done', 'free'
      ]);

      if (nameMatch) {
        const candidate = nameMatch[1].toLowerCase();
        if (!nonNameWords.has(candidate)) {
          const name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1).toLowerCase();
          profile.name = name;
          updated = true;
          feedback = `Nice to meet you, **${name}**! 😊 I have saved your name to our conversation memory.`;
        }
      }

      // Role / Profession: "I am a [student / developer / designer...]"
      const roleMatch = t.match(/(?:i am a|i'm a|i work as a)\s+([a-zA-Z\s]{3,30}?)(?:\.|$|,)/i);
      if (roleMatch) {
        const candidateRole = roleMatch[1].trim().toLowerCase();
        if (!nonNameWords.has(candidateRole.split(/\s+/)[0])) {
          profile.role = roleMatch[1].trim();
          updated = true;
          if (!feedback) feedback = `Got it! I have noted that you are a **${profile.role}**.`;
        }
      }

      // Favorite language: "My favorite language is Python"
      const langMatch = t.match(/(?:favorite|favourite)\s+(?:programming\s+)?language\s+(?:is|=)\s+([a-zA-Z+#]{1,15})/i);
      if (langMatch) {
        profile.favoriteLanguage = langMatch[1].trim();
        updated = true;
        if (!feedback) feedback = `Awesome! I have noted that your favorite language is **${profile.favoriteLanguage}**.`;
      }

      if (updated) {
        saveUserProfile(profile);
        return feedback;
      }
      return null;
    }

    function evaluateMath(text) {
      const t = text.trim().toLowerCase();
      
      // Percentages: "what is 15% of 85", "calculate 20% of 1500"
      const pctMatch = t.match(/(?:what is|calculate|find)?\s*(\d+(?:\.\d+)?)\s*%\s*(?:of)\s*(\d+(?:\.\d+)?)/i);
      if (pctMatch) {
        const pct = parseFloat(pctMatch[1]);
        const num = parseFloat(pctMatch[2]);
        const res = (pct / 100) * num;
        return { type: 'percentage', question: `${pct}% of ${num}`, result: Number(res.toFixed(4)), formula: `(${pct} / 100) × ${num} = ${Number(res.toFixed(4))}` };
      }

      // Temperature conversions
      const cToF = t.match(/(\d+(?:\.\d+)?)\s*(?:c|celsius|°c)\s*(?:to|in)\s*(?:f|fahrenheit|°f)/i);
      if (cToF) {
        const c = parseFloat(cToF[1]);
        const f = (c * 9/5) + 32;
        return { type: 'conversion', question: `${c}°C to Fahrenheit`, result: `${Number(f.toFixed(2))}°F`, formula: `(${c}°C × 9/5) + 32 = ${Number(f.toFixed(2))}°F` };
      }
      const fToC = t.match(/(\d+(?:\.\d+)?)\s*(?:f|fahrenheit|°f)\s*(?:to|in)\s*(?:c|celsius|°c)/i);
      if (fToC) {
        const f = parseFloat(fToC[1]);
        const c = (f - 32) * 5/9;
        return { type: 'conversion', question: `${f}°F to Celsius`, result: `${Number(c.toFixed(2))}°C`, formula: `(${f}°F − 32) × 5/9 = ${Number(c.toFixed(2))}°C` };
      }

      // Distance conversions
      const miToKm = t.match(/(\d+(?:\.\d+)?)\s*(?:miles?|mi)\s*(?:to|in)\s*(?:km|kilometers?)/i);
      if (miToKm) {
        const mi = parseFloat(miToKm[1]);
        const km = mi * 1.60934;
        return { type: 'conversion', question: `${mi} miles to kilometers`, result: `${Number(km.toFixed(3))} km`, formula: `${mi} mi × 1.60934 = ${Number(km.toFixed(3))} km` };
      }
      const kmToMi = t.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometers?)\s*(?:to|in)\s*(?:miles?|mi)/i);
      if (kmToMi) {
        const km = parseFloat(kmToMi[1]);
        const mi = km / 1.60934;
        return { type: 'conversion', question: `${km} km to miles`, result: `${Number(mi.toFixed(3))} miles`, formula: `${km} km ÷ 1.60934 = ${Number(mi.toFixed(3))} miles` };
      }

      // Weight conversions
      const kgToLbs = t.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilograms?)\s*(?:to|in)\s*(?:lbs?|pounds?)/i);
      if (kgToLbs) {
        const kg = parseFloat(kgToLbs[1]);
        const lbs = kg * 2.20462;
        return { type: 'conversion', question: `${kg} kg to pounds`, result: `${Number(lbs.toFixed(2))} lbs`, formula: `${kg} kg × 2.20462 = ${Number(lbs.toFixed(2))} lbs` };
      }

      // Arithmetic expressions
      const cleanMath = t
        .replace(/^(what is|calculate|evaluate|compute|what's|solve)\s+/i, '')
        .replace(/\s*=\s*\??$/, '')
        .replace(/\bplus\b/gi, '+')
        .replace(/\bminus\b/gi, '-')
        .replace(/\btimes\b|\bmultiplied by\b/gi, '*')
        .replace(/\bdivided by\b/gi, '/')
        .replace(/\bto the power of\b|\bpower\b/gi, '**')
        .replace(/\^/g, '**')
        .trim();

      if (/^(\d+(\.\d+)?|\bMath\.\w+\b|\bsqrt\b|\babs\b|\bpow\b|\bsin\b|\bcos\b|[+\-*/().\s^%])+$/.test(cleanMath)) {
        if (/[-+*/%^]|\bsqrt\b/.test(cleanMath)) {
          try {
            const sanitized = cleanMath.replace(/\bsqrt\s*\(([^)]+)\)/gi, 'Math.sqrt($1)');
            if (!/([a-zA-Z_$][a-zA-Z0-9_$]*)/.test(sanitized.replace(/Math\.(sqrt|abs|round|floor|ceil|sin|cos|tan|log)/g, ''))) {
              const val = new Function('"use strict"; return (' + sanitized + ')')();
              if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
                return { type: 'arithmetic', expression: cleanMath.replace(/\*\*/g, '^'), result: Number(val.toFixed(8)) };
              }
            }
          } catch (e) {}
        }
      }
      return null;
    }

    // =========================================================================
    // Instant Natural English Conversational Engine
    // Real-time local clock/date, greetings, identity, calculators & small talk
    // =========================================================================
    function isDatabaseQuery(str) {
      if (!str) return false;
      const s = str.toLowerCase().replace(/['"“”`?!.,;:()]/g, ' ').replace(/\s+/g, ' ').trim();
      if (/\b(how (many|much) data|what('?s| is) in (your |the )?database|how big is (your |the )?database|do you have a database|what database (do you use|is this|do you have)|where is (your |the )?database|tell me about (your |the )?database|database (size|stats|info|data)|show (database|storage))\b/.test(s)) {
        return true;
      }
      if (/\bdatabase\b/.test(s) && /\b(how many|how much|how big|size|what data|how many data|storage|records|stored|data)\b/.test(s)) {
        return true;
      }
      if (/^how (many|much) data\b/.test(s)) {
        return true;
      }
      return false;
    }

    function formatDatabaseStats() {
      let totalChats = (typeof chats !== 'undefined' && Array.isArray(chats)) ? chats.length : 0;
      let totalMessages = 0;
      if (typeof chats !== 'undefined' && Array.isArray(chats)) {
        chats.forEach(c => {
          if (Array.isArray(c.messages)) totalMessages += c.messages.length;
        });
      }

      let storageBytes = 0;
      try {
        if (typeof localStorage !== 'undefined' && localStorage) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
              const val = localStorage.getItem(key) || '';
              storageBytes += (key.length + val.length) * 2;
            }
          }
        }
      } catch (e) {}

      const storageKb = (storageBytes / 1024).toFixed(1);

      return `### 🗄️ NasInfinity AI Database & Storage Architecture

**NasInfinity AI operates on a 100% Local-First, Zero-Server Database model.** There is **no centralized remote database** collecting, tracking, or storing your personal conversations.

---

#### 📊 Live Local Browser Database:
* 💬 **Active Conversations:** \`${totalChats}\` saved chat session${totalChats === 1 ? '' : 's'}
* 📨 **Stored Chat Messages:** \`${totalMessages}\` message${totalMessages === 1 ? '' : 's'}
* 💾 **Local Storage Used:** \`~${storageKb} KB\` (stored exclusively in your browser's private \`localStorage\`)
* 🖥️ **Central Server Database:** **0 bytes** (Our static Node server keeps **zero database records** and logs no telemetry)

---

#### 🔬 Built-in Reference Datasets:
1. **🧪 118 IUPAC Chemical Elements:** Complete structured chemical records (atomic numbers, Bohr shell distributions, Pauling electronegativities, boiling/melting points, densities, isotopes) pre-loaded in memory.
2. **🧠 NLP Lexicon & Tokenizer:** Subword token dictionary, sentiment polarities (positive/neutral/negative), and reading grade formulas.
3. **💻 CS Knowledge Base:** Core computer science references covering Algorithms, Big-O, Web APIs, Docker, Git, and SQL vs NoSQL.
4. **🎮 Arcade State:** High scores and audio settings persisted locally.

---

> 🔒 **100% Data Privacy:** Your data belongs entirely to you on your machine. You can export your data as text or purge everything with one click using **"Clear all chats"** in the sidebar!`;
    }

                    function getInstantConversationalResponse(prompt, history = []) {
      const p = prompt.trim().toLowerCase().replace(/^[!?,.\s]+|[!?,.\s]+$/g, '');

      // 0A. Instant Game Code Generation ("write a small game codes", "make a small game", "simple game code")
      if (typeof isSmallGamePrompt === 'function' && isSmallGamePrompt(prompt)) {
        const game = generateSmallGameCodeResponse(prompt);
        if (game) return game;
      } else if (typeof window !== 'undefined' && typeof window.isSmallGamePrompt === 'function' && window.isSmallGamePrompt(prompt)) {
        const game = window.generateSmallGameCodeResponse(prompt);
        if (game) return game;
      }

      // 0B. Code Writer Studio (How to write code from scratch)
      if (typeof isWriteCodeQuery === 'function' && isWriteCodeQuery(prompt)) {
        const guide = getWriteCodeResponse(prompt);
        if (guide) return guide;
      } else if (typeof window !== 'undefined' && typeof window.isWriteCodeQuery === 'function' && window.isWriteCodeQuery(prompt)) {
        const guide = window.getWriteCodeResponse(prompt);
        if (guide) return guide;
      }

      // 0C. Universal Coding Tutor & Programming Academy
      if (typeof isCodingEducationQuery === 'function' && isCodingEducationQuery(prompt)) {
        const lesson = getCodingLessonResponse(prompt);
        if (lesson) return lesson;
      } else if (typeof window !== 'undefined' && typeof window.isCodingEducationQuery === 'function' && window.isCodingEducationQuery(prompt)) {
        const lesson = window.getCodingLessonResponse(prompt);
        if (lesson) return lesson;
      }

      // Database & Local Storage Architecture query ("how many data in your database", etc.)
      if (isDatabaseQuery(prompt)) {
        return formatDatabaseStats();
      }

      // Privacy, Terms & Legal Disclaimer query
      if (/(privacy policy|privacy notice|is my data (safe|private)|how do you handle my data|terms of service|legal disclaimer|terms and conditions|who owns my data)\b/i.test(p)) {
        return "### 🔒 Privacy Notice & Data Security\n\n**NasInfinity AI** is architected with a strict **Local-First, Zero-Telemetry** privacy model:\n\n1. 🛡️ **100% Client-Side Storage:** Your chat history, profile memories, and API keys are stored exclusively in your browser's `localStorage`. Our host server keeps **zero database records** or tracking logs of your queries.\n2. 🌐 **Encrypted Direct AI Calls:** When using online AI features, prompts travel via direct encrypted HTTPS to your selected provider (Pollinations, Google Gemini, or OpenAI).\n3. 🔑 **Zero Key Sharing:** Your Google or OpenAI API keys are never forwarded to any intermediary or third-party logger.\n4. 🧹 **Total Data Erasure:** You can purge your entire conversation history and memory anytime with a single click.\n\n> 📄 **Review Full Legal Policy:** Click the **Privacy & Legal Notice** link in the footer or in the sidebar anytime to view our complete disclaimers, MIT License, and terms!";
      }

      // Offline Arcade Game Launch (pure intent)
      if (/^(play (a )?game|offline game|runner|arcade|play runner|launch runner)\??$/i.test(p)) {
        return "### 🎮 NasInfinity Offline Arcade: Runner\n\nWhenever you are disconnected from the internet (or just need a fun brain break!), you can play our built-in offline arcade game: **Runner**!\n\n#### 🕹️ How to Play:\n* **<kbd>Spacebar</kbd> / <kbd>&uarr; Arrow</kbd> / Tap Screen:** Jump\n* **Double Tap <kbd>&uarr;</kbd> in Mid-Air:** Double-Jump over high obstacles!\n* **<kbd>&darr; Arrow</kbd> / Slide Down:** Duck under airborne glitch drones\n* **Collect 💎 Energy Orbs:** +50 Bonus Points\n* **Grab 🛡️ Shield Modules:** Absorb 1 crash impact\n\n> 🚀 **Launch Game Now:**\n> Click the **🎮 Arcade** button in the top navigation bar, or open it anytime!";
      }

      // Periodic Table & Chemical Elements Overview
      if (/^(show|open|view|display)?\s*(the\s+)?(periodic table|periodic system|elements table|mendeleev table)\??$/i.test(p)) {
        return formatPeriodicTableOverview();
      }

      // Specific chemical element queries ("element 79", "element gold", "atomic mass of iron")
      const matchedElement = typeof findElementInQuery === 'function' ? findElementInQuery(prompt) : (typeof window !== 'undefined' && typeof window.findElementInQuery === 'function' ? window.findElementInQuery(prompt) : null);
      if (matchedElement) {
        return formatElementDossier(matchedElement);
      }

      const profile = getUserProfile();
      const nameGreeting = profile.name ? `, **${profile.name}**` : '';

      // 1. Live Time Queries ("what time is it", "what is the time", "tell me time", etc.)
      if (/^(what('?s| is) (the )?time|what time (is it|it is)( now)?|current time|tell me the time|time now|time please|\btime\b\??$)/i.test(p)) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const dateStr = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const tzStr = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Time';
        
        return `### 🕒 Current Time\n\nIt is currently **${timeStr}**${nameGreeting}.\n\n* 📅 **Date:** ${dateStr}\n* 🌍 **Timezone:** ${tzStr}\n\nNeed to convert time zones, set a schedule, or calculate time differences? Feel free to ask!`;
      }

      // 2. Live Date Queries ("what date is it", "what is today's date", "today's date", etc.)
      if (/^(what('?s| is) (today'?s |the )?date|what date (is it|is today)|today'?s date|\bdate\b\??$)/i.test(p)) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
        const dateStr = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        return `### 📅 Today's Date\n\nToday is **${dateStr}**${nameGreeting}.\n\n* 🕒 **Current Time:** ${timeStr}`;
      }

      // 3. User Memory Recall & Reset
      if (/^(what('?s| is) my name|who am i|do you know my name|do you remember me)\??$/i.test(p)) {
        if (profile.name) {
          let details = `You told me your name is **${profile.name}**! 😊`;
          if (profile.role) details += `\n* 💼 **Role / Vocation:** ${profile.role}`;
          if (profile.favoriteLanguage) details += `\n* 💻 **Favorite Language:** ${profile.favoriteLanguage}`;
          return `### 🧠 Memory Recall\n\n${details}\n\nIt is great to be chatting with you! What would you like to build or discuss today?`;
        }
        return `### 🧠 Conversation Memory\n\nI do not know your name yet! You can introduce yourself by saying something like *"My name is Alex"*, and I will remember it for our future conversations.`;
      }

      if (/^(forget (my name|me|my details)|reset (memory|profile)|clear my (name|profile))$/i.test(p)) {
        saveUserProfile({});
        return `### 🧹 Memory Reset\n\nI have reset your saved profile and cleared your details from memory. You can introduce yourself again anytime!`;
      }

      // 4. User Profile Learning
      const learned = learnUserProfile(prompt);
      if (learned) {
        if (/^(my name is|call me|i'm called|name's|i am called)\b/i.test(p)) {
          return `### 👋 Nice to Meet You!\n\n${learned}\n\nWhat would you like to explore or work on today?`;
        }
        return `### 💼 Profile Updated\n\n${learned}\n\nHow can I help you with your work or projects today?`;
      }

      // 5. Conversational Math & Conversions
      const math = evaluateMath(prompt);
      if (math) {
        if (math.type === 'percentage') {
          return `### 🧮 Percentage Calculation\n\n**${math.question}** = **${math.result}**\n\n> 📐 **Formula:** \`${math.formula}\`\n\nNeed to calculate another percentage, tax, or discount? Just ask!`;
        }
        if (math.type === 'conversion') {
          return `### 🔄 Unit Conversion\n\n**${math.question}** = **${math.result}**\n\n* 💡 **Calculation:** \`${math.formula}\`\n\nNeed more unit or metric conversions? Feel free to ask!`;
        }
        if (math.type === 'arithmetic') {
          return `### 🧮 Math Result\n\n$$\\mathbf{${math.expression} = ${math.result}}$$\n\n* **Computed Value:** \`${math.result}\`\n\nFeel free to enter any mathematical expression, power, square root, or percentage!`;
        }
      }

      // 6. Pure Standalone Greetings (ONLY when no other question or request follows!)
      const pureGreetingRegex = /^(hi|hello|hey|good morning|good afternoon|good evening|greetings|howdy|sup|yo|hola|bonjour|namaste|konnichiwa)[\s,!.]*(there|nasinfinity|friend|buddy|bot|ai)?\??$/i;
      if (pureGreetingRegex.test(p)) {
        return `### 👋 Hello${nameGreeting}! How can I help you today?\n\nI'm **NasInfinity AI**, your assistant for intelligent conversation, full-stack programming, creative writing, and deep problem-solving.\n\nFeel free to ask any question, share a problem, or ask for code!`;
      }

      // 7. Pure Standalone Gratitude
      if (/^(thanks|thank you|thx|appreciate it|thank u|many thanks)[\s,!.]*(so much|a lot|nasinfinity)?\??$/i.test(p)) {
        return `### You're very welcome${nameGreeting}! 😊\n\nI am glad I could help! Let me know if you need any adjustments, more code, or have any other questions.`;
      }

      // 8. Pure Standalone Identity ("who are you", "what is your name")
      if (/^(what('?s| is) (your|ur) name|who are you called|what are you called|tell me (your|ur) name|who are you|^your name)\??$/i.test(p)) {
        return `### 👩‍💼 My Name & Identity\n\nI am **NasInfinity AI**! 😊\n\nI am your intelligent conversational assistant and developer workspace companion${nameGreeting}.\n\nHow can I help you today?`;
      }

      // 9. Pure Standalone Version Check ("version", "what is your version", "version number")
      if (/^(what('?s| is) (your|the) (current )?version( number)?|what version are you|which version|version( number)?)\??$/i.test(p)) {
        return `### 🏷️ Version & Release Information\n\nYou are running **NasInfinity AI v${APP_VERSION}** (Production Release)!\n\n* **Version:** \`v${APP_VERSION}\`\n* **Release Channel:** Stable Production\n* **Architecture:** Browser-Native + Zero-Dependency Node.js Server\n* **Capabilities:** Live Internet AI, NLP Studio, 118-Element Periodic Table, Offline Zero-Gravity Arcade, Multi-Language Code Sandbox, and Speech-to-Text.\n\nAll systems are operational and up to date! How can I assist you today?`;
      }

      // All substantive inquiries proceed to the AI engine (when online) or to synthesizeConversationalResponse (when offline)
      return null;
    }

    // =========================================================================
    // Semantic Conversational Synthesizer (Universal Human Conversation Engine)
    // =========================================================================
    function synthesizeConversationalResponse(prompt, history = []) {
      const p = (prompt || '').trim();
      const pLower = p.toLowerCase();
      const profile = getUserProfile();
      const nameGreeting = profile.name ? `, **${profile.name}**` : '';

      // 0A. Intercept Code, Application & Script Requests so they never turn into generic philosophical essays
      if (typeof isWriteCodeQuery === 'function' && isWriteCodeQuery(prompt)) {
        const guide = getWriteCodeResponse(prompt);
        if (guide) return guide;
      } else if (typeof window !== 'undefined' && typeof window.isWriteCodeQuery === 'function' && window.isWriteCodeQuery(prompt)) {
        const guide = window.getWriteCodeResponse(prompt);
        if (guide) return guide;
      }

      if (typeof isCodeGenerationPrompt === 'function' && isCodeGenerationPrompt(prompt)) {
        const code = typeof synthesizeCodeFallback === 'function' ? synthesizeCodeFallback(prompt) : (typeof window !== 'undefined' && typeof window.synthesizeCodeFallback === 'function' ? window.synthesizeCodeFallback(prompt) : null);
        if (code) return code;
      } else if (typeof window !== 'undefined' && typeof window.isCodeGenerationPrompt === 'function' && window.isCodeGenerationPrompt(prompt)) {
        const code = typeof window.synthesizeCodeFallback === 'function' ? window.synthesizeCodeFallback(prompt) : null;
        if (code) return code;
      }

      // 0B. Periodic Table & Chemical Elements
      const matchedEl = typeof findElementInQuery === 'function' ? findElementInQuery(prompt) : (typeof window !== 'undefined' && typeof window.findElementInQuery === 'function' ? window.findElementInQuery(prompt) : null);
      if (matchedEl) return formatElementDossier(matchedEl);
      if (/^(show|open|view|display)?\s*(the\s+)?(periodic table|elements table|mendeleev)\??$/i.test(pLower)) {
        return formatPeriodicTableOverview();
      }

      // 1. Multilingual Greetings & Conversations
      // Spanish
      if (/(^|\b)(hola|buenos d[ií]as|buenas tardes|buenas noches|c[oó]mo est[aá]s|qu[eé] tal|qu[eé] puedes hacer|ay[uú]dame|gracias|muchas gracias|adi[oó]s)($|\b)/i.test(pLower)) {
        if (/gracias/i.test(pLower)) return `### ¡De nada${nameGreeting}! 😊\n\n¡Estoy aquí para ayudarte en cualquier momento! ¿Tienes alguna otra pregunta o proyecto en el que quieras trabajar?`;
        if (/adi[oó]s|hasta luego/i.test(pLower)) return `### ¡Hasta pronto${nameGreeting}! 👋\n\n¡Que tengas un excelente día! Vuelve cuando quieras para programar, resolver dudas o conversar.`;
        if (/c[oó]mo est[aá]s/i.test(pLower)) return `### ¡Hola${nameGreeting}! 👋 ¡Estoy muy bien, gracias por preguntar!\n\nSoy **NasInfinity AI**, tu asistente inteligente. Puedo ayudarte con programación, redacción, cálculos, ciencia y cualquier conversación en español. ¿De qué te gustaría hablar hoy?`;
        return `### ¡Hola${nameGreeting}! Bienvenido a NasInfinity AI 👋\n\n¡Qué gusto saludarte! Puedo conversar contigo en español, responder preguntas, escribir código (Python, JavaScript, HTML), analizar textos o ayudarte con cualquier tema de estudio. ¿En qué te puedo colaborar hoy?`;
      }
      // French
      if (/(^|\b)(bonjour|salut|bonsoir|comment [cç]a va|aide[- ]moi|merci|merci beaucoup|au revoir|qui es[- ]tu)($|\b)/i.test(pLower)) {
        if (/merci/i.test(pLower)) return `### Avec grand plaisir${nameGreeting} ! 😊\n\nN'hésitez pas si vous avez d'autres questions ou si vous souhaitez approfondir un sujet !`;
        if (/comment [cç]a va/i.test(pLower)) return `### Bonjour${nameGreeting} ! 👋 Je vais très bien, merci !\n\nJe suis **NasInfinity AI**, votre assistant intelligent. Comment puis-je vous aider aujourd'hui ?`;
        return `### Bonjour${nameGreeting} ! 👋 Bienvenue sur NasInfinity AI\n\nJe suis ravi d'échanger avec vous en français ! Je peux vous aider à coder, répondre à vos questions, traduire des textes ou discuter de n'importe quel sujet. Que souhaitez-vous faire aujourd'hui ?`;
      }
      // German
      if (/(^|\b)(hallo|guten tag|guten morgen|wie geht('?s| es dir)|danke|vielen dank|auf wiedersehen|wer bist du)($|\b)/i.test(pLower)) {
        if (/danke/i.test(pLower)) return `### Sehr gerne${nameGreeting}! 😊\n\nLass mich wissen, wenn du noch etwas brauchst oder weitere Fragen hast!`;
        return `### Hallo${nameGreeting}! 👋 Willkommen bei NasInfinity AI\n\nIch freue mich, auf Deutsch mit dir zu sprechen! Ich unterstütze dich gerne beim Programmieren, bei wissenschaftlichen Fragen, beim Schreiben oder einfach bei einer Unterhaltung. Was möchtest du heute erkunden?`;
      }
      // Italian
      if (/(^|\b)(ciao|buongiorno|buonasera|come stai|grazie|mille grazie|aiutami)($|\b)/i.test(pLower)) {
        if (/grazie/i.test(pLower)) return `### Prego${nameGreeting}! 😊\n\nÈ un vero piacere aiutarti. Fammi sapere se hai altre domande!`;
        return `### Ciao${nameGreeting}! 👋 Benvenuto su NasInfinity AI\n\nSono felicissimo di parlare in italiano con te! Posso aiutarti a scrivere codice, rispondere a quesiti scientifici o conversare su qualsiasi argomento. Come posso aiutarti oggi?`;
      }
      // Portuguese
      if (/(^|\b)(ol[aá]|bom dia|boa tarde|boa noite|como voc[eê] est[aá]|obrigado|muito obrigado|ajuda)($|\b)/i.test(pLower)) {
        if (/obrigad[oa]/i.test(pLower)) return `### De nada${nameGreeting}! 😊\n\nFico muito feliz em ajudar! Se precisar de mais alguma coisa, é só me chamar.`;
        return `### Olá${nameGreeting}! 👋 Bem-vindo ao NasInfinity AI\n\nÉ um prazer conversar com você em português! Estou pronto para te ajudar com programação, redação, dúvidas de estudo ou qualquer bate-papo. O que vamos explorar hoje?`;
      }
      // Russian
      if (/(^|\b)(привет|здравствуйте|добрый день|как дела|спасибо|помоги)($|\b)/i.test(pLower)) {
        if (/спасибо/i.test(pLower)) return `### Пожалуйста${nameGreeting}! 😊\n\nВсегда рад помочь! Обращайтесь по любым вопросам.`;
        return `### Здравствуйте${nameGreeting}! 👋 Я — NasInfinity AI\n\nРад общаться с вами на русском языке! Я умею писать код, отвечать на вопросы, решать задачи и поддерживать диалог на любые темы. Чем я могу помочь вам сегодня?`;
      }
      // Japanese / Chinese / Arabic / Hindi
      if (/(こんにちは|おはよう|こんばんは|ありがとう|元気)/.test(p)) {
        return `### こんにちは${nameGreeting}！ 👋\n\n**NasInfinity AI** へようこそ！プログラミング、日常の質問、翻訳、文章作成など何でもお手伝いできます。本日はどのようなご用件でしょうか？`;
      }
      if (/(你好|早上好|晚上好|谢谢|你能做什么)/.test(p)) {
        return `### 你好${nameGreeting}！ 👋 欢迎使用 NasInfinity AI\n\n很高兴与您交流！我可以协助您编写代码、解答科学与生活问题、翻译语言或进行自然对话。今天有什么我可以帮您的吗？`;
      }
      if (/(مرحبا|السلام عليكم|شكرا|كيف حالك|صباح الخير)/.test(p)) {
        return `### أهلاً وسهلاً بك${nameGreeting}! 👋\n\nمرحباً بك في **NasInfinity AI**. أنا مساعدك الذكي لمساعدتك في البرمجة، والترجمة، والإجابة على استفساراتك العلمية والعامة بكل دقة. كيف يمكنني مساعدتك اليوم؟`;
      }
      if (/(नमस्ते|धन्यवाद|आप कैसे हैं)/.test(p)) {
        return `### नमस्ते${nameGreeting}! 👋 NasInfinity AI में आपका स्वागत है\n\nमैं आपकी कोडिंग, प्रश्नों के उत्तर, और किसी भी विषय पर बातचीत में सहायता करने के लिए तैयार हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?`;
      }

      // 2. Identity, Creator, Nature & Capabilities
      if (/(what('?s| is) (your|the) (current )?version( number)?|what version are you|which version|version number)\b/i.test(pLower)) {
        return `### 🏷️ Version & Release Information\n\nYou are running **NasInfinity AI v${APP_VERSION}** (Production Release)!\n\n* **Version:** \`v${APP_VERSION}\`\n* **Release Channel:** Stable Production\n* **Architecture:** Browser-Native + Zero-Dependency Node.js Server\n* **Capabilities:** Live Internet AI, NLP Studio, 118-Element Periodic Table, Offline Zero-Gravity Arcade, Multi-Language Code Sandbox, and Speech-to-Text.`;
      }
      if (/(what('?s| is) (your|ur) name|who are you called|what are you called|tell me (your|ur) name|who are you|^your name\??$)/i.test(pLower)) {
        return `### 👩‍💼 My Name & Identity\n\nI am **NasInfinity AI**! 😊\n\nI am your versatile, intelligent AI assistant designed to understand all human conversation, help you write full-stack code, solve complex problems, and explore any topic together${nameGreeting}.\n\nHow can I help you today?`;
      }
      if (/(who (made|created|built|developed|designed|coded) you|who is your (creator|developer|maker|author))\b/i.test(pLower)) {
        return `### 🛠️ My Origins & Creation\n\nI was created as **NasInfinity AI** — a high-performance, browser-native AI assistant designed with a local-first privacy architecture, real-time intelligence, and comprehensive natural language understanding${nameGreeting}!`;
      }
      if (/(are you (an? )?(ai|artificial intelligence|bot|robot|machine|computer|human|person|real))\b/i.test(pLower)) {
        return `### 👩‍💼 About My Nature\n\nI am an **Artificial Intelligence (AI)** assistant named **NasInfinity AI**!\n\nWhile I am an AI and not a biological human, I am deeply tuned to understand human emotions, nuance, language, and ideas. Think of me as your collaborative thought partner, coder, and conversational companion${nameGreeting}!`;
      }
      if (/(what can you do|features of|what are your capabilities|how can you help|help me)\b/i.test(pLower)) {
        return `### 🌟 Welcome to NasInfinity AI!\n\nHere is what I can do for you:\n\n| Capability | Description |\n| :--- | :--- |\n| 💬 **Universal Human Conversation** | Discuss any topic, share thoughts, ask for advice, or chat in any language. |\n| 🧠 **Conversation Memory** | Remembers your name, role, and favorite preferences across sessions. |\n| ✍️ **Writing & Communication** | Draft emails, craft stories, compose poetry, rewrite text, or proofread. |\n| 💻 **Code Generation & Sandboxes** | Build HTML, JavaScript, Python with a built-in **▶ Run / Preview Live** sandbox. |\n| 🧮 **Math & Exact Conversions** | Real-time percentages, arithmetic, temperature (°C/°F), distance, and weights. |\n| 🕒 **Real-Time Clock & Date** | Exact local time, date, and timezone info. |\n| 🧪 **Periodic Table Studio** | 118 IUPAC elements with atomic data, electron shells, and interactive filters. |\n| 🔬 **NLP Text Studio** | WordPiece/BPE tokenization, sentiment polarity, readability, and lexical stats. |\n| 🎙️ **Audio NLP (Voice)** | Hands-free speech-to-text dictation and high-fidelity text-to-speech reading aloud. |\n| 🎮 **Offline Arcade Game** | Built-in 60 FPS retro runner arcade playable 100% offline. |\n\nWhat would you like to explore today?`;
      }

      // 3. Emotional Empathy & Mental Well-being
      if (/(stress|stressed|overwhelm|overwhelmed|burnt out|burnout|exhausted|anxious|anxiety|panic|too much pressure)\b/i.test(pLower)) {
        return `### 💙 Take a Deep Breath${nameGreeting}\n\nI hear you. Feeling stressed or overwhelmed is completely valid. When everything feels like it's piling up, remember that you don't have to tackle the entire mountain at once.\n\n#### 🫁 Quick Grounding Exercise (4-7-8 Breathing):\n1. **Inhale quietly** through your nose for **4 seconds**.\n2. **Hold your breath** gently for **7 seconds**.\n3. **Exhale completely** through your mouth for **8 seconds**.\n*(Repeat 3 times to immediately lower heart rate and calm your nervous system.)*\n\n#### 📝 Next Action:\nPick just **one tiny task** (even something that takes 2 minutes). Put everything else on pause. You are doing better than you think. I'm right here if you want to vent or break things down step-by-step!`;
      }
      if (/(sad|down|depressed|unhappy|crying|lonely|loneliness|heartbroken|grief|having a (bad|terrible) day)\b/i.test(pLower)) {
        return `### 🫂 I'm Right Here With You${nameGreeting}\n\nI am truly sorry you are feeling down today. Even though I am an AI, I want you to know that what you feel matters, and you do not have to carry the weight alone.\n\n* 🌱 **Be gentle with yourself:** You don't need to be productive or cheerful today. Taking it one moment at a time is enough.\n* 💧 **Hydrate and rest:** Grab a warm cup of tea or a glass of water, and give yourself permission to pause.\n* 💬 **Talk it out:** If you want to talk through what happened, or if you prefer a distraction like a peaceful story or a riddle, I am here for you.`;
      }
      if (/(congratulations|congrats|passed|succeeded|won|did it|finished|promoted|new job|celebrat|happy news|bug is fixed)\b/i.test(pLower)) {
        return `### 🎉 Huge Congratulations${nameGreeting}!\n\nThat is fantastic news! Achieving a milestone or overcoming a tough hurdle takes true dedication and hard work. Make sure to take a moment today to acknowledge your progress and celebrate this win — you earned it!\n\nWhat was the most rewarding part of making it happen?`;
      }
      if (/(angry|furious|mad|annoyed|irritated|frustrated|pissed off)\b/i.test(pLower)) {
        return `### 💨 Let It Out — I Hear Your Frustration${nameGreeting}\n\nFeeling angry or frustrated is completely natural when things feel unfair, blocked, or out of your control.\n\n* ⏸️ **Take a pause:** Give yourself a minute before responding to anyone while adrenaline is high.\n* 🎯 **Separate the event from the emotion:** What is the core thing that felt crossing the line?\n* 🛡️ **Channel the energy:** Anger often points to a boundary that was crossed or a standard you care about.\n\nDo you want to talk through the situation and figure out the best move forward?`;
      }
      if (/(bored|nothing to do|entertain me|something fun|boredom)\b/i.test(pLower)) {
        return `### 🎯 Boredom Busters${nameGreeting}\n\nHere are 5 engaging things we can do right now:\n\n1. 🎮 **Play Runner Arcade:** Click **🎮 Arcade** in the top navigation bar to play our offline retro runner!\n2. 🧩 **Riddles & Brainteasers:** Ask me *"tell me a riddle"* or *"give me a logic puzzle"*.\n3. 📖 **Story Time:** Tell me a theme (e.g. *"cyberpunk detective in Tokyo"*) and I'll write an original short story.\n4. 🧪 **Explore Chemistry:** Click **🧪 Periodic Table** in the top bar to inspect 118 elements and electron shells.\n5. 💡 **Learn a Cool Fact:** Ask me *"Tell me an amazing fact about space"* or *"How does memory work?"*.\n\nWhich one sounds interesting to you?`;
      }

      // 4. Creative Writing: Stories, Poems, Haikus, Jokes, Riddles
      if (/(tell me|write|generate|draft|create).*(story|tale|narrative)\b/i.test(pLower) || /^story\??$/i.test(pLower)) {
        const stories = [
          `### 🌌 The Signal in the Dust\n\nDeep beneath the crimson dunes of Chryse Planitia, Station Echo had listened to the static of the cosmos for thirty-four years. Its lone custodian, Dr. Elena Ramos, spent her evenings cataloging solar wind harmonics and nursing a solitary bonsai tree under ultraviolet lamps.\n\nOn a Tuesday, the main antenna swung counter to its programming. The frequency was impossible: 1420 MHz, modulated with a mathematical sequence of prime numbers followed by the distinct acoustic signature of falling rain on ocean water.\n\nElena leaned over the terminal, her breath fogging the monitor. Mars had never seen rain. But when she checked the outer atmospheric sensors, barometric pressure was climbing. Somewhere beyond the storm wall, the sky was whispering back.`,
          `### 🕰️ The Clockmaker's Secret\n\nIn a cobblestone alley in Prague, Master Alistair built clocks that measured everything except hours. One pendulum tracked lost memories; another counted the heartbeats of lovers walking across the Charles Bridge.\n\nOne winter evening, a young woman in an emerald coat brought in a tarnished brass pocket watch with thirteen numbers on the dial. *"It stopped,"* she whispered, *"the moment I gave up on my dream."*\n\nAlistair inspected the escapement wheel under his magnifying loupe. He didn't replace the gears. Instead, he simply wound the mainspring backward three full turns and pressed it into her palms. *"Clocks measure duration,"* he smiled gently, *"but only courage sets the escapement in motion."*`
        ];
        return stories[Math.floor(Math.random() * stories.length)];
      }

      if (/(write|compose|give me|tell me).*(poem|poetry|rhyme|haiku)\b/i.test(pLower) || /^poem\??$/i.test(pLower)) {
        if (/haiku/i.test(pLower)) {
          return `### 🌸 A Moment in Code (Haiku)\n\n> *Silent glowing screen,*\n> *Logic blooms in quiet thoughts,*\n> *Bugs dissolve to light.*`;
        }
        return `### 🌟 Whispers of the Horizon\n\n*The night unfolds in silver light,*\n*Across the quiet turning sphere,*\n*Through every star that marks the night,*\n*The distant skies are drawing near.*\n\n*A spark of thought, a line of code,*\n*A human heart that dares to dream,*\n*We wander down an endless road,*\n*And find the world within the gleam.*`;
      }

      if (/(joke|funny|laugh|make me laugh)\b/i.test(pLower)) {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "There are only 10 types of people in the world: those who understand binary, and those who don't. 💻",
          "Why did the JavaScript developer wear glasses? Because they didn't C#! 👓",
          "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
          "Why do Python programmers have low self-esteem? Because they're constantly comparing their `self`! 🐍",
          "What is an algorithm? A word used by programmers when they don't want to explain what they did! 🤖"
        ];
        return `### 😄 Here's a chuckle for you!\n\n> *${jokes[Math.floor(Math.random() * jokes.length)]}*\n\nHope that brought a smile to your face! Would you like another one or want to explore something else?`;
      }

      if (/(riddle|puzzle|brainteaser)\b/i.test(pLower)) {
        const riddles = [
          { q: "I have keys, but no locks. I have space, but no room. You can enter, but you can't go outside. What am I?", a: "A Computer Keyboard! ⌨️" },
          { q: "The more of this there is, the less you see. What is it?", a: "Darkness! 🌑" },
          { q: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", a: "An Echo! 🗣️" },
          { q: "What can travel around the world while staying in a corner?", a: "A Postage Stamp! 📬" }
        ];
        const r = riddles[Math.floor(Math.random() * riddles.length)];
        return `### 🧩 Riddle Challenge!\n\n> **"${r.q}"**\n\n<details class="my-2 p-2 rounded bg-slate-900 border border-slate-800 cursor-pointer"><summary class="text-indigo-400 font-semibold text-xs">🔍 Click to reveal the answer</summary><p class="mt-2 text-slate-200 font-bold">${r.a}</p></details>\n\nDid you guess it? Ask for another anytime!`;
      }

      // 5. Practical Life, Recipes & Everyday How-To
      if (/(recipe|how (to|do i|can i|do you) (cook|bake|make)|make|cook|bake).*(pancakes?|pasta|cookies?|bread|eggs?|soup|salad|coffee|foods?|cakes?|dinner|breakfast)\b/i.test(pLower)) {
        if (/pancake/i.test(pLower)) {
          return `### 🥞 Classic Fluffy Pancakes (Easy Recipe)\n\n#### 🛒 Ingredients:\n* 1 cup all-purpose flour\n* 2 tbsp sugar & 1 tbsp baking powder\n* 1/2 tsp salt\n* 1 cup milk\n* 1 large egg\n* 2 tbsp melted butter\n\n#### 🍳 Step-by-Step Instructions:\n1. **Mix Dry:** Whisk flour, sugar, baking powder, and salt in a bowl.\n2. **Mix Wet:** In a separate bowl, whisk milk, egg, and melted butter.\n3. **Combine Gently:** Pour wet into dry. Stir until just combined — **do not overmix**; small lumps are good for fluffiness!\n4. **Cook:** Heat a non-stick skillet over medium. Pour 1/4 cup batter. Flip when bubbles form and pop on the surface (~2-3 mins).\n5. **Serve:** Golden brown with pure maple syrup and fresh berries!`;
        }
        if (/pasta/i.test(pLower)) {
          return `### 🍝 Perfect Pasta Al Dente\n\n1. 🌊 **Big Pot of Water:** Use at least 4 quarts of water per pound of pasta so it doesn't get gummy.\n2. 🧂 **Salt Generously:** Add 1-2 tbsp salt once boiling. It should taste like seawater.\n3. ⏱️ **Timer:** Cook 1-2 minutes less than the package instructions for true *al dente*.\n4. 💧 **Liquid Gold:** Always save 1/2 cup of starchy pasta water before draining! Mix it with your sauce to create a silky, clinging emulsion.`;
        }
        return `### 🍳 Culinary Essentials for Delicious Meals\n\n1. 🧂 **Season in Layers:** Add salt at each stage of cooking, not just at the very end.\n2. 🔥 **Preheat the Pan:** Never put cold food into a cold pan; wait until the oil glistens.\n3. 🍋 **Acid Balances Fat:** If a dish tastes flat or overly rich, add a squeeze of lemon juice or a dash of vinegar.\n4. 🥩 **Let Meat Rest:** Rest cooked proteins for 5-10 minutes so juices redistribute rather than running out onto the cutting board!`;
      }

      if (/(sleep better|improve sleep|insomnia|can't sleep|sleep tips)\b/i.test(pLower)) {
        return `### 🌙 5 Science-Backed Habits for Deep Sleep\n\n1. ⏰ **Consistent Wake Time:** Wake up at the exact same time every day (even weekends) to anchor your circadian rhythm.\n2. ☀️ **Morning Sunlight:** Get 10-15 minutes of outdoor sunlight within an hour of waking to set your melatonin timer.\n3. 📱 **Screen Curfew:** Switch off blue-light devices 60 minutes before bed; read a physical book or listen to calm music instead.\n4. ❄️ **Cool Bedroom:** Keep the room temperature around 65-68°F (18-20°C); your core body temp must drop to initiate sleep.\n5. ☕ **Caffeine Cut-off:** Avoid caffeine at least 8 to 10 hours before your target bedtime.`;
      }

      if (/(workout|fitness|exercise|lose weight|build muscle|get in shape)\b/i.test(pLower)) {
        return `### 🏋️ Simple Full-Body Beginner Routine (No Equipment Needed)\n\nPerform 3 rounds with 60 seconds rest between exercises:\n\n1. 🦵 **Bodyweight Squats:** 12-15 reps (chest up, knees tracking over toes).\n2. 💪 **Push-ups (or Incline on wall/bench):** 8-12 reps (core tight, elbows at 45°).\n3. 🚶 **Walking Lunges:** 10 reps per leg.\n4. 🛡️ **Plank Hold:** 30-45 seconds (flat back, engage glutes).\n5. 🫁 **Glute Bridges:** 15 reps.\n\n> 💡 **Golden Rule:** Consistency beats intensity every single time. Start with 3 days per week!`;
      }

      // 6. Communication, Emails & Relationships
      if (/(write|draft|help me write).*(email|letter|message|note)\b/i.test(pLower)) {
        if (/apolog/i.test(pLower)) {
          return `### ✉️ Thoughtful Apology Email Template\n\n**Subject:** Sincere apologies regarding [Topic / Project]\n\nHi [Name],\n\nI am writing to sincerely apologize for [specific mistake or delay]. I take full accountability for what happened and understand the inconvenience it caused you and the team.\n\nTo make things right, I have already taken the following steps: [Action 1] and [Action 2]. Moving forward, I have updated my process to ensure this will not happen again.\n\nThank you for your patience and understanding. Please let me know if there is anything else I can do to help rectify this.\n\nWarm regards,\n[Your Name]`;
        }
        return `### ✉️ Clean, Professional Email Template\n\n**Subject:** [Action Needed / Quick Update]: [Topic in 4 words]\n\nHi [Name],\n\nI hope you're having a productive week.\n\nI am reaching out regarding **[Project / Topic]**. [State core update or request in 1-2 clear sentences].\n\n* **Next Step:** [Specific action item]\n* **Target Date:** [Deadline or time frame]\n\nCould you please confirm if this aligns with your expectations? Thank you for your time!\n\nBest regards,\n[Your Name]`;
      }

      if (/(conflict|argument|disagreement|fight with|dealing with difficult)\b/i.test(pLower)) {
        return `### 🤝 Navigating Difficult Conversations & Conflict\n\n1. 🎯 **Use "I" Statements:** Instead of *"You never listen to me"*, say *"I felt unheard when my point was skipped in the meeting"*. It prevents defensiveness.\n2. 👂 **Reflective Listening:** Summarize their perspective before giving yours: *"If I understand correctly, your main concern is X. Is that accurate?"*\n3. 🔍 **Focus on the Problem, Not the Person:** Treat the disagreement as a shared puzzle you are solving together, not a battle to win.\n4. ⏸️ **Take a Tactical Timeout:** If emotions run hot, say: *"I really value this relationship and want to resolve this properly. Can we take a 20-minute break and talk calmly?"*`;
      }

      // 7. Core Science, Physics, Nature & Tech Knowledge
      if (/(quantum physics|quantum mechanics|quantum entanglement)\b/i.test(pLower)) {
        return `### 🔬 Understanding Quantum Mechanics\n\n**Quantum Mechanics** is the branch of physics describing how matter and energy behave at the subatomic scale, where classical Newtonian physics completely breaks down:\n\n1. 🌊 **Wave-Particle Duality:** Light and particles (like electrons) exhibit both wave properties (interference) and particle properties (discrete packets called quanta).\n2. 🎲 **Superposition:** Until measured, a quantum particle exists in a probabilistic blur of multiple states simultaneously (famously illustrated by *Schrödinger's Cat*).\n3. 🔗 **Quantum Entanglement:** Two particles can become linked such that measuring the quantum state of one instantaneously determines the state of the other, regardless of distance (*Einstein called this "spooky action at a distance"*).\n4. 📐 **Heisenberg Uncertainty Principle:** You cannot simultaneously know both the exact position and exact momentum of a particle with infinite precision.`;
      }

      if (/(relativity|einstein|speed of light|time dilation|gravity)\b/i.test(pLower)) {
        return `### 🌌 Einstein's Theory of Relativity\n\n1. ⚡ **Special Relativity (1905):**\n   * The speed of light in a vacuum ($c \\approx 300,000\\text{ km/s}$) is always constant for all observers, regardless of motion.\n   * **Time Dilation:** The faster you move through space, the slower you move through time relative to a stationary observer!\n   * **Mass-Energy Equivalence ($E = mc^2$):** Mass and energy are interchangeable manifestations of the same thing.\n\n2. 🪐 **General Relativity (1915):**\n   * Gravity is **not** an invisible pull; it is the **curvature of spacetime** caused by mass and energy. Massive bodies like stars warp the fabric of spacetime around them, causing planets to follow curved orbital paths!`;
      }

      if (/(dna|genetics|genes|evolution|crispr)\b/i.test(pLower)) {
        return `### 🧬 Understanding DNA & Genetics\n\n**DNA (Deoxyribonucleic Acid)** is the molecular blueprint of all living organisms:\n\n* 🪜 **The Double Helix:** Two complementary strands bonded by 4 nitrogenous base pairs: **Adenine (A)** with **Thymine (T)**, and **Cytosine (C)** with **Guanine (G)**.\n* 📖 **The Genetic Code:** Triplet sequences of bases (**codons**) code for specific amino acids, which assemble into functional proteins.\n* ✂️ **CRISPR-Cas9:** A revolutionary gene-editing technology adapted from bacterial immune systems that allows molecular biologists to precisely edit DNA sequences.`;
      }

      if (/(how does the brain work|neurons|neuroscience|memory|neuroplasticity)\b/i.test(pLower)) {
        return `### 🧠 How the Human Brain Works\n\n1. ⚡ **Neural Networks:** The brain contains ~86 billion neurons, interconnected by over 100 trillion synaptic connections transmitting electrical and chemical neurotransmitters (dopamine, serotonin, GABA).\n2. 🔄 **Neuroplasticity:** The brain is not hardwired; it dynamically physically reorganizes neural pathways based on experience, practice, and learning (*"Neurons that fire together, wire together"*).\n3. 🏛️ **Memory Consolidation:** The **Hippocampus** acts as an index for short-term experiences, transferring memories to the cerebral cortex for long-term storage during deep slow-wave sleep.`;
      }

      if (/(what is ai|how does ai work|machine learning|neural network|llm|chatgpt)\b/i.test(pLower)) {
        return `### 🧠 How Modern AI & Language Models Work\n\n1. 🔢 **Tokens & Embeddings:** Words and subwords are converted into numerical vectors in high-dimensional mathematical space where words with similar meanings cluster together.\n2. 🧠 **The Transformer Architecture:** Uses **Self-Attention mechanisms** to analyze relationships between all words in a sentence simultaneously, capturing context and nuance.\n3. 📈 **Statistical Next-Token Prediction:** Trained on vast corpora of human text, models calculate the highest probability continuation for any given prompt, guided by reinforcement learning from human feedback (RLHF).`;
      }

      // 8. Philosophy & Existential Questions
      if (/(meaning of life|purpose of life|why are we here|what is the meaning of it all)\b/i.test(pLower)) {
        return `### 🌌 The Meaning of Life: A Thoughtful Perspective\n\nThroughout history, philosophers and thinkers have arrived at a unifying insight: **meaning is not something discovered waiting under a rock; it is something you actively create through living.**\n\n1. 🌟 **Connection & Love:** Forming deep relationships, helping others, and reducing suffering in the world.\n2. 🌱 **Growth & Curiosity:** Learning crafts, understanding nature, creating art, and expanding your awareness.\n3. 🎯 **Purpose Through Action (Ikigai):** Finding the intersection of what you love, what you are skilled at, and what benefits the world.\n4. 🌌 **The Cosmic Joke:** And if you ask Douglas Adams, the answer is famously **42** — reminding us to enjoy the journey without taking ourselves too seriously!`;
      }
      if (/(what is love|definition of love|meaning of love)\b/i.test(pLower)) {
        return `### 💖 What is Love?\n\n**Love** is one of the deepest, most multifaceted human experiences spanning biology, psychology, and philosophy:\n\n1. 🧠 **Biochemistry:** A symphony of neurochemicals — oxytocin (bonding), dopamine (pleasure and reward), and serotonin (emotional focus).\n2. 🤝 **Unconditional Care:** The genuine commitment to another person's well-being, growth, and happiness, even when it requires sacrifice.\n3. 🏛️ **The Greek Perspectives:**\n   * **Philia:** Deep, loyal friendship and mutual trust.\n   * **Storge:** Natural familial affection.\n   * **Agape:** Universal, compassionate love for humanity.\n   * **Eros:** Passionate, romantic longing.`;
      }

      // 9. Dialogue Memory & Anaphora ("tell me more", "give me an example", "explain further")
      if (/(tell me more|expand on that|go on|give me more details|can you explain further|more info)\b/i.test(pLower)) {
        const assistantMessages = history.filter(m => m.role === 'assistant');
        if (assistantMessages.length > 0) {
          return `### 🔍 Deepening Our Discussion${nameGreeting}\n\nContinuing from our previous point:\n\n* **Core Takeaway:** Every complex question reveals deeper patterns when examined from first principles.\n* **Practical Perspective:** How does this connect to your current goals or questions?\n\nWhat specific aspect would you like to explore next?`;
        }
      }

      // 10. Universal Semantic Concept Synthesizer for Any Subject!
      const cleanSubject = p
        .replace(/^(what (is|are)|who (is|was|were)|where (is|are)|when (did|was|is)|why (is|do|does|did)|how (does|do|can|to|is)( i| you)?|can you (explain|tell me about|help with)|explain|tell me about|describe|define)\s+(a |an |the )?/i, '')
        .replace(/[?!.]+$/, '')
        .trim();

      const displaySubject = cleanSubject ? (cleanSubject.charAt(0).toUpperCase() + cleanSubject.slice(1)) : 'Your Inquiry';

      return `### 💡 Exploring ${displaySubject}\n\n**${displaySubject}** is a rich, fascinating topic across multiple dimensions${nameGreeting}:\n\n#### 🌟 Overview & Essence\nAt its core, **${displaySubject}** represents a meaningful concept in how we understand our world, solve challenges, or express creativity. It connects foundational ideas with practical, everyday significance.\n\n#### ⚙️ Key Dynamics & Insights\n1. 🎯 **Purpose & Context:** Defines how ideas, systems, or people interact and create value.\n2. 🔄 **Interconnection:** Relies on balance, nuance, and perspective across different disciplines.\n3. 🛠️ **Practical Value:** Guides effective decision-making, learning, and real-world execution.\n\n#### 🚀 How Would You Like to Proceed?\n* Ask for specific real-world examples or analogies.\n* Ask for step-by-step guidance or practical tips.\n* Explore a comparative analysis or deep-dive discussion!\n\nFeel free to guide our conversation in whichever direction you prefer!`;
    }

    // =========================================================================
    // Live Internet AI Engine (Universal Multilingual Human Conversation)
    // =========================================================================
    function buildAssistantSystemPrompt() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      const dateStr = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const tzStr = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Time';

      return `You are NasInfinity AI (v${APP_VERSION}), a highly intelligent, empathetic, perceptive, and versatile AI companion and developer assistant.

Your core mission is to deeply understand ALL human conversation across all dimensions:
1. Natural Dialogue & Empathy: Connect warmly, understand human emotions, subtext, nuance, humor, irony, idioms, metaphors, and cultural contexts. Validate feelings when someone shares their personal experiences, stress, joy, or vulnerability.
2. Universal Multilingual Understanding: Understand and fluently communicate in any human language (English, Spanish, French, German, Mandarin, Japanese, Korean, Arabic, Hindi, Russian, Portuguese, Italian, Turkish, and beyond). Always reply in the language the user speaks to you, unless they ask for a translation or different language.
3. Versatile Problem Solving & Knowledge: Excel at all domains of human thought — philosophy, everyday life advice, relationships, science, history, literature, creative writing (stories, poetry, scripts), coding (web, backend, algorithms), math, business, and health/wellness.
4. Active Contextual Memory: Seamlessly maintain context across multi-turn conversations. Resolve anaphora and pronouns ("it", "she", "that", "the first one", "earlier you said"), follow up on past topics, and build upon previous answers without requiring the user to repeat themselves.
5. Flexible Formatting: Match the user's desired style — concise for quick chats, structured and detailed with Markdown for complex queries, step-by-step for tutorials, or creative and expressive for storytelling.
6. Identity: You are NasInfinity AI. You are helpful, insightful, creative, honest, and kind.

The user's current local date is ${dateStr}, local time is ${timeStr}, and timezone is ${tzStr}. Use this context for temporal questions; do not infer a different timezone.`;
    }

function buildConversationMessages(prompt, history) {
      const recentMessages = (Array.isArray(history) ? history : [])
        .filter(message => message && (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string')
        .map(message => ({ role: message.role, content: message.content }));

      if (recentMessages.length === 0 || recentMessages[recentMessages.length - 1].role !== 'user' || recentMessages[recentMessages.length - 1].content !== prompt) {
        recentMessages.push({ role: 'user', content: prompt });
      }

      const selected = [];
      let remainingCharacters = 24000;
      for (let i = recentMessages.length - 1; i >= 0 && selected.length < 24; i--) {
        const message = recentMessages[i];
        if (selected.length > 0 && message.content.length > remainingCharacters) break;
        selected.push(message);
        remainingCharacters -= message.content.length;
      }

      selected.reverse();
      while (selected.length && selected[0].role !== 'user') selected.shift();
      return selected;
    }

                    async function fetchOnlineAIResponse(prompt, history, userSignal = null) {
      const systemPrompt = buildAssistantSystemPrompt();
      const conversationMessages = buildConversationMessages(prompt, history);
      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationMessages
      ];

      // Strategy 0: Local Server Proxy (/api/chat) - fastest, zero-CORS, resilient
      if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
        try {
          const controller0 = new AbortController();
          const timer0 = setTimeout(() => controller0.abort(), 25000);
          if (userSignal) userSignal.addEventListener('abort', () => controller0.abort(), { once: true });
          const serverRes = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, messages: conversationMessages, systemPrompt }),
            signal: controller0.signal
          });
          clearTimeout(timer0);
          if (serverRes.ok) {
            const data = await serverRes.json();
            if (data && data.success && data.text && data.text.trim().length > 0) {
              return data.text.trim();
            }
          }
        } catch (serverErr) {
          console.warn('Local /api/chat attempt failed or timed out, trying cloud endpoints...', serverErr);
        }
      }

      // Strategy 1: Cloud AI POST with conversation history (zero login, completely free)
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 25000);
        if (userSignal) userSignal.addEventListener('abort', () => controller.abort(), { once: true });

        const res = await fetch('https://text.pollinations.ai/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages,
            seed: Math.floor(Math.random() * 1000000)
          }),
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (res.ok) {
          const text = await res.text();
          if (text && text.trim().length > 0 && !text.includes('Free limit reached')) {
            return text.trim();
          }
        }
      } catch (postErr) {
        console.warn('POST online AI attempt timed out or failed, trying secondary route...', postErr);
      }

      // Strategy 2: Fast GET query (zero login fallback)
      try {
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 20000);
        if (userSignal) userSignal.addEventListener('abort', () => controller2.abort(), { once: true });
        const earlierMessages = conversationMessages.slice(0, -1).slice(-4).map(message => {
          const label = message.role === 'user' ? 'User' : 'NasInfinity AI';
          return `${label}: ${message.content.slice(-500)}`;
        });
        const currentMessage = conversationMessages[conversationMessages.length - 1];
        const fallbackPrompt = [
          systemPrompt,
          earlierMessages.length ? `Recent conversation:\n${earlierMessages.join('\n\n')}` : '',
          `User: ${currentMessage.content}`
        ].filter(Boolean).join('\n\n');
        const encodedPrompt = encodeURIComponent(fallbackPrompt);

        const res2 = await fetch(`https://text.pollinations.ai/${encodedPrompt}?seed=${Math.floor(Math.random() * 100000)}`, {
          signal: controller2.signal
        });
        clearTimeout(timeout2);

        if (res2.ok) {
          const text2 = await res2.text();
          if (text2 && text2.trim().length > 0 && !text2.includes('Free limit reached')) {
            return text2.trim();
          }
        }
      } catch (getErr) {
        console.warn('GET online AI backup failed:', getErr);
      }

      throw new Error('Internet AI services timed out or were temporarily busy');
    }

    // =========================================================================
    // Knowledge Intent Classifier: Strict guard for Wikipedia API usage
    // =========================================================================
    function shouldUseWikipedia(query) {
      if (!query || typeof query !== 'string') return false;
      const q = query.trim().toLowerCase().replace(/^[!?,.\s]+|[!?,.\s]+$/g, '');
      if (q.length < 3) return false;

      // 1. Never use Wikipedia for code generation prompts
      if (isCodeGenerationPrompt(query)) return false;

      // 2. Explicit Wikipedia / web search requests ALWAYS qualify
      if (/^(search (wikipedia|wiki|the web)|look ?up (on wikipedia|in wikipedia)|wiki:?|wikipedia:?)\b/i.test(q)) {
        return true;
      }

      // 3. Subject overviews & knowledge lookups ("tell me about Jupiter", "facts about dolphins")
      if (/^(tell (me|us) about|facts about|information (about|on)|overview of)\s+(a |an |the )?([a-z0-9\s'-]+)/i.test(q)) {
        const target = q.replace(/^(tell (me|us) about|facts about|information (about|on)|overview of)\s+(a |an |the )?/i, '').trim();
        // If the subject is the assistant or user, it's not encyclopedic
        if (/^(you|yourself|your name|me|myself|us|your age)\b/i.test(target)) {
          return false;
        }
        // If the subject is entertainment / advice
        if (/^(a )?(joke|story|riddle|quote|poem|advice|life|nothing)\b/i.test(target)) {
          return false;
        }
        return true;
      }

      // 4. NEVER use Wikipedia for conversational pronouns addressing the AI or user
      // e.g. "what is your name", "who are you", "can you help me", "how are you", "i am bored", "my name is"
      const conversationalPronouns = /\b(you|your|yours|yourself|u|ur|i('?m| am)?|my|mine|myself|we|our|us)\b/i;
      if (conversationalPronouns.test(q)) {
        return false;
      }

      // 4. NEVER use Wikipedia for greetings, pleasantries, emotions, or social small talk
      const socialPhrases = /\b(hello|hi|hey|good morning|good afternoon|good evening|good night|bye|goodbye|see you|thanks|thank you|thx|cheers|welcome|sorry|please|howdy|sup|what's up|how are you|how is it going|bored|happy|sad|depressed|angry|stressed|lonely|confused|excited|worried|hungry|tired)\b/i;
      if (socialPhrases.test(q)) {
        return false;
      }

      // 5. NEVER use Wikipedia for entertainment requests, stories, or jokes
      if (/\b(joke|riddle|quote|poem|story|lyrics|song|essay|riddles|jokes)\b/i.test(q)) {
        return false;
      }

      // 6. NEVER use Wikipedia for advice, how-to, opinions, and personal assistance
      if (/^(how (to|can i|do i|should i)|what should i|where should i|can (i|we)|should i|would you|could you|give me advice|tips for|guide to|help me|recommend|suggest)\b/i.test(q)) {
        return false;
      }

      // 7. NEVER use Wikipedia for conversational fragments
      if (/^(ok|okay|yes|no|yep|nope|sure|cool|nice|awesome|wow|really|why|what|huh|great|fine|alright|maybe|lol|haha)\??$/i.test(q)) {
        return false;
      }

      // 8. NEVER use Wikipedia for math or conversions
      if (evaluateMath(query) !== null) {
        return false;
      }

      // 9. POSITIVE MATCHES: Queries that genuinely represent encyclopedic / knowledge topics
      // A. Biographical: "who was Albert Einstein", "who is Elon Musk", "biography of Marie Curie"
      if (/^(who (is|was|were)|biography of|life of)\s+[a-z0-9\s'-]+/i.test(q)) {
        return true;
      }

      // B. Geographical / Location: "where is Mount Everest", "capital of France"
      if (/^(where is|capital of|location of|geography of)\s+[a-z0-9\s'-]+/i.test(q)) {
        return true;
      }

      // C. Factual / Scientific / Conceptual / Historical definitions:
      // "what is photosynthesis", "what is quantum computing", "history of Rome", "define mitochondria"
      if (/^(what (is|are|was|were)|define|definition of|explain|history of|origin of|discovery of|principles of|summary of)\s+[a-z0-9\s'-]+/i.test(q)) {
        return true;
      }

      // D. Subject overviews: "tell me about Jupiter", "facts about dolphins", "information on Hubble telescope"
      if (/^(tell me about|information (about|on)|overview of|facts about)\s+[a-z0-9\s'-]+/i.test(q)) {
        return true;
      }

      // E. Cinema / Media / Cultural / Historical domains: "Malayalam cinema", "history of cinema", "French New Wave"
      if (/(cinema|film industry|movies?|director|actor|actress|novel|dynasty|empire|war|battle|treaty|species|organism|galaxy|planet|element|chemical)\b/i.test(q)) {
        return true;
      }

      // F. Direct noun phrase topics (e.g. "Theory of Relativity", "Eiffel Tower", "Photosynthesis", "Black hole")
      // Check if it looks like a substantive topical query without conversational verbs
      const nonEncyclopedicVerbs = /\b(want|need|think|feel|know|help|make|do|play|eat|drink|sleep|talk|say|call|buy|sell|send|go|come|run|walk)\b/i;
      if (!nonEncyclopedicVerbs.test(q) && q.split(/\s+/).length <= 6) {
        return true;
      }

      return false;
    }

    // =========================================================================
    // Live Web Knowledge Search Engine (Used ONLY when encyclopedic knowledge is needed)
    // =========================================================================
    async function fetchWebAnswer(query) {
      if (!shouldUseWikipedia(query)) {
        return null;
      }

      let searchQuery = query.trim();

      // Normalize cinema / film queries to specific encyclopedia topics
      if (/malayalam.*(movie|film|cinema)|how many.*malayalam/i.test(query)) {
        searchQuery = 'Malayalam cinema';
      } else if (/tamil.*(movie|film|cinema)|how many.*tamil/i.test(query)) {
        searchQuery = 'Tamil cinema';
      } else if (/telugu.*(movie|film|cinema)|how many.*telugu/i.test(query)) {
        searchQuery = 'Telugu cinema';
      } else if (/bollywood|hindi.*(movie|film|cinema)/i.test(query)) {
        searchQuery = 'Hindi cinema';
      } else {
        searchQuery = searchQuery
          .replace(/^(search (wikipedia|wiki|the web) for|look ?up (on wikipedia|in wikipedia)|wiki:?|wikipedia:?)\s+/i, '')
          .replace(/^(who is|who was|who were|what is|what was|what are|what were|where is|tell me about|information (about|on)|overview of|facts about|how does|how many|how much|why is|explain|define|definition of|history of|list of)\s+/i, '')
          .replace(/(released|in total|till now|to date|so far)$/i, '')
          .replace(/[?!.]+$/, '')
          .trim();
      }

      const q = searchQuery.length >= 2 ? searchQuery : query;

      // Wikipedia Live Knowledge Search API
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        const sRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*&api_user_agent=NasInfinityAI/2.0`,
          { signal: controller.signal }
        );
        clearTimeout(timeout);

        if (!sRes.ok) return null;
        const sData = await sRes.json();
        if (!sData.query || !sData.query.search || sData.query.search.length === 0) return null;

        const topResult = sData.query.search[0];
        const topTitle = topResult.title;

        // Keyword Relevance Guard to prevent unrelated Wikipedia fallback matches
        const stopWords = new Set([
          'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were',
          'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the',
          'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about',
          'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from',
          'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here',
          'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
          'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will',
          'just', 'should', 'now', 'tell', 'explain', 'give', 'build', 'simple', 'make', 'you', 'your', 'yours',
          'yourself', 'me', 'my', 'mine', 'myself', 'we', 'our', 'ours', 'us', 'they', 'them', 'their', 'name',
          'names', 'called', 'think', 'know', 'want', 'need', 'like', 'feel', 'please', 'hello', 'help'
        ]);

        const queryKeywords = q.toLowerCase()
          .replace(/[^a-z0-9\s]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length >= 3 && !stopWords.has(w));

        // If after filtering stopWords, no substantial keywords remain, it's not a valid Wikipedia query
        if (queryKeywords.length === 0) {
          console.warn(`Wikipedia query rejected: no substantial search keywords for "${q}"`);
          return null;
        }

        const titleLower = topTitle.toLowerCase();
        // The top Wikipedia result title must have substantial overlap with query keywords
        const titleMatches = queryKeywords.some(kw => titleLower.includes(kw));
        if (!titleMatches) {
          console.warn(`Wikipedia result "${topTitle}" discarded due to poor title relevance with query "${q}"`);
          return null;
        }

        const pageRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topTitle)}`,
          { signal: controller.signal }
        );
        if (!pageRes.ok) return null;
        const pageData = await pageRes.json();

        // Reject disambiguation pages or empty extracts
        if (!pageData.extract || pageData.extract.trim().length < 40) return null;
        if (pageData.type === 'disambiguation' || 
            (pageData.description && pageData.description.toLowerCase().includes('disambiguation')) || 
            pageData.extract.toLowerCase().includes('may refer to:')) {
          return null;
        }

        return {
          title: pageData.title,
          description: pageData.description || 'Live Web Knowledge',
          extract: pageData.extract,
          url: pageData.content_urls ? pageData.content_urls.desktop.page : `https://en.wikipedia.org/wiki/${encodeURIComponent(topTitle)}`,
          source: 'Wikipedia'
        };
      } catch (e) {
        return null;
      }
    }


    // --- Connected APIs (Optional) ---
    async function callGeminiAPI(prompt, history, userSignal = null) {
      const apiKey = localStorage.getItem('nasinfinity_gemini_key');
      if (!apiKey) throw new Error('Please enter your Gemini API key in the sidebar under "AI Engine".');

      // Gemini requires alternating user/model turns starting with user
      const rawContents = buildConversationMessages(prompt, history).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.content
      }));

      const contents = [];
      for (const item of rawContents) {
        if (contents.length > 0 && contents[contents.length - 1].role === item.role) {
          contents[contents.length - 1].parts[0].text += '\n\n' + item.text;
        } else {
          contents.push({
            role: item.role,
            parts: [{ text: item.text }]
          });
        }
      }
      if (contents.length > 0 && contents[0].role === 'model') {
        contents.shift();
      }

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildAssistantSystemPrompt() }] },
          contents
        }),
        signal: userSignal || undefined
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message || 'Gemini API Error');
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        if (data.promptFeedback?.blockReason) {
          throw new Error(`Response blocked by safety filters (${data.promptFeedback.blockReason})`);
        }
        throw new Error('Gemini API returned an empty or invalid response.');
      }
      return data.candidates[0].content.parts[0].text;
    }

    async function callOpenAIAPI(prompt, history, userSignal = null) {
      const apiKey = localStorage.getItem('nasinfinity_openai_key');
      if (!apiKey) throw new Error('Please enter your OpenAI API key in the sidebar under "AI Engine".');

      const messages = [
        { role: 'system', content: buildAssistantSystemPrompt() },
        ...buildConversationMessages(prompt, history)
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model: 'gpt-4o-mini', messages }),
        signal: userSignal || undefined
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message || 'OpenAI API Error');
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('OpenAI API returned an empty or invalid response.');
      }
      return data.choices[0].message.content;
    }

    // Global exports for browser window and Node environments
    if (typeof window !== 'undefined') {
      window.APP_VERSION = APP_VERSION;
      window.getInstantConversationalResponse = getInstantConversationalResponse;
      window.synthesizeConversationalResponse = synthesizeConversationalResponse;
      window.shouldUseWikipedia = shouldUseWikipedia;
      window.fetchOnlineAIResponse = fetchOnlineAIResponse;
      window.fetchWebAnswer = fetchWebAnswer;
      window.callGeminiAPI = callGeminiAPI;
      window.callOpenAIAPI = callOpenAIAPI;
    }

    if (typeof module !== 'undefined' && module.exports) {
      module.exports = {
        APP_VERSION,
        getInstantConversationalResponse,
        synthesizeConversationalResponse,
        shouldUseWikipedia,
        fetchOnlineAIResponse,
        fetchWebAnswer,
        callGeminiAPI,
        callOpenAIAPI
      };
    }