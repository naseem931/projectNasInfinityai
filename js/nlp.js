// =========================================================================
// NasInfinity AI - NLP Studio, Audio Tools & Sandbox Preview Modals
// =========================================================================

    // NLP Studio Elements & Code Preview Modals
    const nlpModal = document.getElementById('nlpModal');
    const nlpInputText = document.getElementById('nlpInputText');
    const nlpTokenCount = document.getElementById('nlpTokenCount');
    const nlpWordCharCount = document.getElementById('nlpWordCharCount');
    const nlpSentiment = document.getElementById('nlpSentiment');
    const nlpSentimentScore = document.getElementById('nlpSentimentScore');
    const nlpReadingLevel = document.getElementById('nlpReadingLevel');
    const nlpReadingTime = document.getElementById('nlpReadingTime');
    const nlpTokenContainer = document.getElementById('nlpTokenContainer');
    const nlpPosKeywords = document.getElementById('nlpPosKeywords');
    const nlpNegKeywords = document.getElementById('nlpNegKeywords');
    const previewModal = document.getElementById('previewModal');
    const previewIframe = document.getElementById('previewIframe');

    // --- NLP Studio & Tokenizer Engine ---
    const nlpTokenColors = [
      'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'bg-teal-500/20 text-teal-300 border-teal-500/30',
      'bg-amber-500/20 text-amber-300 border-amber-500/30',
      'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    ];

    function runNlpAnalysis(rawText) {
      const text = (rawText || '').trim();
      if (!text) {
        if (nlpTokenCount) nlpTokenCount.textContent = '0';
        if (nlpWordCharCount) nlpWordCharCount.textContent = '0 w / 0 c';
        if (nlpSentiment) {
          nlpSentiment.textContent = 'Neutral 😐';
          nlpSentiment.className = 'text-sm font-bold text-slate-300';
        }
        if (nlpSentimentScore) nlpSentimentScore.textContent = 'Polarity: 0';
        if (nlpReadingLevel) nlpReadingLevel.textContent = 'Standard';
        if (nlpReadingTime) nlpReadingTime.textContent = '~0 sec read';
        if (nlpTokenContainer) nlpTokenContainer.innerHTML = '<span class="text-slate-500 italic">No text analyzed yet.</span>';
        if (nlpPosKeywords) nlpPosKeywords.textContent = 'None';
        if (nlpNegKeywords) nlpNegKeywords.textContent = 'None';
        return;
      }

      // 1. Tokenizer (BPE subword & punctuation segmentation)
      const tokens = [];
      const regex = /([a-zA-Z0-9]+|[.,!?;:()\[\]{}"'\-—/\\+*&^%$#@`~<>=_]+|\s+)/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match[0].trim().length > 0) {
          tokens.push(match[0]);
        }
      }

      // 2. Lexical Metrics
      const words = text.split(/\s+/).filter(Boolean);
      const charCount = text.length;
      const sentenceCount = (text.match(/[.!?]+(?:\s+|$)/g) || [1]).length;

      if (nlpTokenCount) nlpTokenCount.textContent = tokens.length;
      if (nlpWordCharCount) nlpWordCharCount.textContent = `${words.length} w / ${charCount} c`;

      const sec = Math.max(1, Math.round((words.length / 200) * 60));
      if (nlpReadingTime) nlpReadingTime.textContent = sec < 60 ? `~${sec} sec read` : `~${Math.round(sec / 60)} min read`;

      // 3. Sentiment Analysis Lexicon
      const positiveWords = new Set(['good', 'great', 'excellent', 'amazing', 'best', 'wonderful', 'fast', 'love', 'happy', 'clean', 'brilliant', 'success', 'helpful', 'positive', 'enjoy', 'recommend', 'nice', 'smooth', 'modern', 'clear', 'reliable', 'superb', 'effective', 'perfect', 'valuable']);
      const negativeWords = new Set(['bad', 'terrible', 'horrible', 'worst', 'slow', 'fail', 'error', 'bug', 'hate', 'sad', 'broken', 'issue', 'problem', 'negative', 'wrong', 'ugly', 'pain', 'difficult', 'poor', 'confusing', 'flaw', 'risk', 'danger']);

      let polarity = 0;
      const foundPos = [];
      const foundNeg = [];

      words.forEach(w => {
        const clean = w.toLowerCase().replace(/[^a-z]/g, '');
        if (positiveWords.has(clean)) { polarity += 1; if (!foundPos.includes(clean)) foundPos.push(clean); }
        if (negativeWords.has(clean)) { polarity -= 1; if (!foundNeg.includes(clean)) foundNeg.push(clean); }
      });

      if (nlpSentiment) {
        if (polarity > 0) {
          nlpSentiment.textContent = 'Positive 😄';
          nlpSentiment.className = 'text-sm font-bold text-emerald-400';
        } else if (polarity < 0) {
          nlpSentiment.textContent = 'Negative 🙁';
          nlpSentiment.className = 'text-sm font-bold text-rose-400';
        } else {
          nlpSentiment.textContent = 'Neutral 😐';
          nlpSentiment.className = 'text-sm font-bold text-slate-300';
        }
      }
      if (nlpSentimentScore) nlpSentimentScore.textContent = `Polarity: ${polarity > 0 ? '+' : ''}${polarity}`;

      // 4. Readability
      const avgWps = words.length / Math.max(1, sentenceCount);
      if (nlpReadingLevel) {
        if (avgWps > 22) nlpReadingLevel.textContent = 'Advanced / Academic';
        else if (avgWps > 14) nlpReadingLevel.textContent = 'Standard / Conversational';
        else nlpReadingLevel.textContent = 'Easy / Accessible';
      }

      // 5. Render Tokens
      if (nlpTokenContainer) {
        nlpTokenContainer.innerHTML = '';
        tokens.forEach((t, i) => {
          const span = document.createElement('span');
          const color = nlpTokenColors[i % nlpTokenColors.length];
          span.className = `px-1.5 py-0.5 rounded text-[11px] font-mono border ${color} transition hover:scale-105 inline-block`;
          span.textContent = t;
          nlpTokenContainer.appendChild(span);
        });
      }

      // Render Keyword signals
      if (nlpPosKeywords) {
        nlpPosKeywords.innerHTML = foundPos.length ? foundPos.map(k => `<span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">${k}</span>`).join('') : '<span class="text-slate-500">None detected</span>';
      }
      if (nlpNegKeywords) {
        nlpNegKeywords.innerHTML = foundNeg.length ? foundNeg.map(k => `<span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">${k}</span>`).join('') : '<span class="text-slate-500">None detected</span>';
      }
    }

    window.openPrivacyModal = function() {
      const modal = document.getElementById('privacyModal');
      if (modal) modal.classList.remove('hidden');
    };

    window.closePrivacyModal = function() {
      const modal = document.getElementById('privacyModal');
      if (modal) modal.classList.add('hidden');
    };

    window.openNlpModal = function() {
      const modal = nlpModal || document.getElementById('nlpModal');
      if (!modal) return;
      modal.classList.remove('hidden');
      const input = nlpInputText || document.getElementById('nlpInputText');
      if (input && !input.value.trim()) {
        const ui = document.getElementById('userInput');
        const defaultText = (ui && ui.value.trim()) || 'NasInfinity AI delivers an incredibly fast, intelligent and modern natural language processing experience!';
        input.value = defaultText;
        runNlpAnalysis(defaultText);
      }
    };

    window.closeNlpModal = function() {
      const modal = nlpModal || document.getElementById('nlpModal');
      if (modal) modal.classList.add('hidden');
    };

    if (nlpInputText) {
      nlpInputText.addEventListener('input', () => {
        runNlpAnalysis(nlpInputText.value);
      });
    }

    // --- Message NLP Actions Toolbar ---
    function attachNlpToolbar(bubble, rawContent) {
      if (bubble.querySelector('.nlp-toolbar')) return;

      const toolbar = document.createElement('div');
      toolbar.className = 'nlp-toolbar flex items-center flex-wrap gap-1.5 sm:gap-2 mt-2.5 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 select-none';
      toolbar.innerHTML = `
        <button onclick="speakMessage(this)" class="px-2 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-indigo-400 active:scale-95 transition flex items-center gap-1 font-medium" title="Text-to-Speech (Read aloud)">
          <span>🔊</span> <span>Speak</span>
        </button>
        <button onclick="inspectNlpText(this)" class="px-2 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-purple-400 active:scale-95 transition flex items-center gap-1 font-medium" title="Inspect Tokens & Sentiment in NLP Studio">
          <span>🔬</span> <span>NLP Stats</span>
        </button>
        <button onclick="summarizeResponse(this)" class="px-2 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-emerald-400 active:scale-95 transition flex items-center gap-1 font-medium" title="Summarize into 2 bullets">
          <span>📝</span> <span>Summarize</span>
        </button>
        <button onclick="copyMessageText(this)" class="px-2 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-slate-200 active:scale-95 transition flex items-center gap-1 font-medium" title="Copy text">
          <span>📋</span> <span>Copy</span>
        </button>
      `;
      bubble.dataset.rawContent = rawContent;
      bubble.appendChild(toolbar);
    }
    window.attachNlpToolbar = attachNlpToolbar;

    // --- Speech Synthesis (TTS - Audio NLP) ---
    let currentSpeechBtn = null;

    window.speakMessage = function(btn) {
      if (!('speechSynthesis' in window)) {
        return showToast('Text-to-speech is not supported in this browser.', 'warning');
      }

      if (window.speechSynthesis.speaking && currentSpeechBtn === btn) {
        window.speechSynthesis.cancel();
        btn.innerHTML = '<span>🔊</span> <span>Speak</span>';
        currentSpeechBtn = null;
        return;
      }

      window.speechSynthesis.cancel();
      if (currentSpeechBtn) {
        currentSpeechBtn.innerHTML = '<span>🔊</span> <span>Speak</span>';
      }

      const bubble = btn.closest('.nlp-toolbar').parentElement;
      const rawText = bubble.dataset.rawContent || bubble.innerText;
      const cleanText = rawText
        .replace(/```[\s\S]*?```/g, ' Code block omitted. ')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/[*#_~`|]/g, '')
        .trim();

      if (!cleanText) return;

      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.rate = 1.0;
      utter.pitch = 1.0;

      btn.innerHTML = '<span class="text-indigo-400 animate-pulse">⏹️</span> <span class="text-indigo-400">Stop</span>';
      currentSpeechBtn = btn;

      utter.onend = () => {
        btn.innerHTML = '<span>🔊</span> <span>Speak</span>';
        currentSpeechBtn = null;
      };

      utter.onerror = () => {
        btn.innerHTML = '<span>🔊</span> <span>Speak</span>';
        currentSpeechBtn = null;
      };

      window.speechSynthesis.speak(utter);
    };

    window.inspectNlpText = function(btn) {
      const bubble = btn.closest('.nlp-toolbar').parentElement;
      const rawText = bubble.dataset.rawContent || bubble.innerText;
      if (nlpInputText) nlpInputText.value = rawText;
      runNlpAnalysis(rawText);
      openNlpModal();
    };

    window.summarizeResponse = function(btn) {
      const bubble = btn.closest('.nlp-toolbar').parentElement;
      const rawText = bubble.dataset.rawContent || bubble.innerText;
      const snippet = rawText.slice(0, 350).replace(/\n+/g, ' ');
      const ui = document.getElementById('userInput');
      if (ui) ui.value = `Provide a concise 2-bullet TL;DR summary of this: "${snippet}..."`;
      if (typeof handleSendMessage === 'function') handleSendMessage();
      else if (typeof window.handleSendMessage === 'function') window.handleSendMessage();
    };

    window.copyMessageText = function(btn) {
      const bubble = btn.closest('.nlp-toolbar').parentElement;
      const rawText = bubble.dataset.rawContent || bubble.innerText;
      navigator.clipboard.writeText(rawText).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<span class="text-emerald-400">✓</span> <span class="text-emerald-400">Copied</span>';
        setTimeout(() => { btn.innerHTML = original; }, 1800);
      }).catch(err => {
        console.warn('Clipboard copy error:', err);
      });
    };


    window.previewCode = function(btn) {
      const block = btn.closest('.code-card').querySelector('pre code');
      const rawCode = block.textContent;
      const iframe = previewIframe || document.getElementById('previewIframe');
      const modal = previewModal || document.getElementById('previewModal');
      if (iframe) iframe.srcdoc = rawCode;
      if (modal) modal.classList.remove('hidden');
    };

    window.closePreviewModal = function() {
      const modal = previewModal || document.getElementById('previewModal');
      const iframe = previewIframe || document.getElementById('previewIframe');
      if (modal) modal.classList.add('hidden');
      if (iframe) iframe.srcdoc = '';
    };

    window.copyCode = function(btn) {
      const block = btn.closest('.code-card').querySelector('pre code');
      navigator.clipboard.writeText(block.textContent).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.classList.add('text-emerald-400');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('text-emerald-400');
        }, 2000);
      }).catch(err => {
        console.warn('Clipboard copy error:', err);
      });
    };


    if (previewModal) {
      previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) closePreviewModal();
      });
    }
    if (nlpModal) {
      nlpModal.addEventListener('click', (e) => {
        if (e.target === nlpModal) closeNlpModal();
      });
    }

    // Keyboard accessibility: Escape closes modals & mobile drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (typeof closePreviewModal === 'function') closePreviewModal();
        if (typeof closeNlpModal === 'function') closeNlpModal();
        if (typeof closePrivacyModal === 'function') closePrivacyModal();
        if (typeof isMobileOrTablet === 'function' && isMobileOrTablet() && typeof closeSidebar === 'function') {
          closeSidebar();
        } else if (typeof window.isMobileOrTablet === 'function' && window.isMobileOrTablet() && typeof window.closeSidebar === 'function') {
          window.closeSidebar();
        }
      }
    });
