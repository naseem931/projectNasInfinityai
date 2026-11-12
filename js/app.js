// =========================================================================

    // NasInfinity AI - Core Application Logic & Basic Chat Features

    // =========================================================================

    window.showToast = function(message, type = 'info') {
      let container = document.getElementById('toastContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm';
        document.body.appendChild(container);
      }
      const toast = document.createElement('div');
      const bgColors = {
        info: 'bg-slate-900/95 border-indigo-500/40 text-indigo-200',
        success: 'bg-emerald-950/95 border-emerald-500/40 text-emerald-200',
        warning: 'bg-amber-950/95 border-amber-500/40 text-amber-200',
        error: 'bg-rose-950/95 border-rose-500/40 text-rose-200'
      };
      const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
      };
      toast.className = `p-3 rounded-xl border shadow-2xl text-xs flex items-center gap-2.5 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200 pointer-events-auto ${bgColors[type] || bgColors.info}`;
      toast.innerHTML = `<span class="text-sm shrink-0">${icons[type] || 'ℹ️'}</span><span class="flex-1 font-medium leading-relaxed">${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    };

    let currentChatId = null;
    let chats = [];
    try {
      chats = JSON.parse(localStorage.getItem('nasinfinity_chats') || '[]');
      if (!Array.isArray(chats)) chats = [];
    } catch (e) {
      console.warn('Could not parse stored chats, initializing empty:', e);
      chats = [];
    }
    let isGenerating = false;

    const messageContainer = document.getElementById('messageContainer');
    const welcomeHero = document.getElementById('welcomeHero');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const newChatBtn = document.getElementById('newChatBtn');
    const chatHistoryList = document.getElementById('chatHistoryList');
    const chatTitleHeader = document.getElementById('chatTitleHeader');
    const engineSelector = document.getElementById('engineSelector');
    const activeEngineBadge = document.getElementById('activeEngineBadge');
    const activeStatusBadge = document.getElementById('activeStatusBadge');
    const apiKeySection = document.getElementById('apiKeySection');
    const apiKeyLabel = document.getElementById('apiKeyLabel');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const apiKeyHelp = document.getElementById('apiKeyHelp');
    const typingIndicator = document.getElementById('typingIndicator');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const exportChatBtn = document.getElementById('exportChatBtn');
    const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const sidebar = document.getElementById('sidebar');

    function isMobileOrTablet() {
      return window.innerWidth < 1024;
    }

    function openSidebar() {
      if (isMobileOrTablet()) {
        sidebar.classList.add('sidebar-open');
        sidebarBackdrop.classList.remove('hidden');
      } else {
        sidebar.classList.remove('sidebar-collapsed');
      }
    }

    function closeSidebar() {
      if (isMobileOrTablet()) {
        sidebar.classList.remove('sidebar-open');
        sidebarBackdrop.classList.add('hidden');
      } else {
        sidebar.classList.add('sidebar-collapsed');
      }
    }

    function toggleSidebar() {
      if (isMobileOrTablet()) {
        if (sidebar.classList.contains('sidebar-open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      } else {
        sidebar.classList.toggle('sidebar-collapsed');
      }
    }

    window.isMobileOrTablet = isMobileOrTablet;
    window.openSidebar = openSidebar;
    window.closeSidebar = closeSidebar;
    window.toggleSidebar = toggleSidebar;

    const inputNlpStats = document.getElementById('inputNlpStats');
    const voiceInputBtn = document.getElementById('voiceInputBtn');
    const micIcon = document.getElementById('micIcon');

    const netStatusDot = document.getElementById('netStatusDot');

    function updateNetworkStatus() {
      const isOnline = navigator.onLine;
      const mode = (engineSelector && engineSelector.value) || 'online_first';
      const banner = document.getElementById('offlineBanner');

      if (mode === 'online_first') {
        if (isOnline) {
          activeEngineBadge.textContent = 'Live Internet AI 🌐';
          activeEngineBadge.className = 'hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium shrink-0';
          activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Online';
          if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-emerald-400 animate-pulse';
          if (banner) banner.classList.add('hidden');
          activeEngineBadge.onclick = null;
          activeEngineBadge.style.cursor = 'default';
        } else {
          activeEngineBadge.textContent = 'Offline • Play Game 🎮';
          activeEngineBadge.className = 'hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-medium shrink-0 cursor-pointer hover:bg-rose-500/30';
          activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-rose-400"></span> Disconnected';
          if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-rose-400 animate-ping';
          if (banner) banner.classList.remove('hidden');
          activeEngineBadge.onclick = (typeof openOfflineGameModal === 'function') ? openOfflineGameModal : (window.openOfflineGameModal || null);
          activeEngineBadge.style.cursor = 'pointer';
        }
      }
    }

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Engine switch
    engineSelector.addEventListener('change', () => {
      const mode = engineSelector.value;
      if (mode === 'online_first') {
        updateNetworkStatus();
        apiKeySection.classList.add('hidden');
      } else if (mode === 'gemini') {
        activeEngineBadge.textContent = 'Gemini API';
        activeEngineBadge.className = 'hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium shrink-0';
        activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-indigo-400"></span> Online API';
        if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-indigo-400';
        apiKeyLabel.textContent = 'Google AI Gemini API Key';
        apiKeyHelp.href = 'https://aistudio.google.com/app/apikey';
        apiKeyInput.value = localStorage.getItem('nasinfinity_gemini_key') || '';
        apiKeySection.classList.remove('hidden');
      } else if (mode === 'openai') {
        activeEngineBadge.textContent = 'OpenAI API';
        activeEngineBadge.className = 'hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium shrink-0';
        activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-purple-400"></span> Online API';
        if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-purple-400';
        apiKeyLabel.textContent = 'OpenAI API Key';
        apiKeyHelp.href = 'https://platform.openai.com/api-keys';
        apiKeyInput.value = localStorage.getItem('nasinfinity_openai_key') || '';
        apiKeySection.classList.remove('hidden');
      }
    });

    apiKeyInput.addEventListener('input', () => {
      const mode = engineSelector.value;
      if (mode === 'gemini') localStorage.setItem('nasinfinity_gemini_key', apiKeyInput.value.trim());
      if (mode === 'openai') localStorage.setItem('nasinfinity_openai_key', apiKeyInput.value.trim());
    });

    // --- NLP Input Stats (Live Words & Tokens) ---
    function updateInputStats() {
      const text = userInput.value.trim();
      if (!text) {
        if (inputNlpStats) inputNlpStats.textContent = '0 words • ~0 tokens';
        return;
      }
      const words = text.split(/\s+/).filter(Boolean).length;
      const tokens = Math.ceil(words * 1.33) + (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
      if (inputNlpStats) inputNlpStats.textContent = `${words} word${words !== 1 ? 's' : ''} • ~${tokens} token${tokens !== 1 ? 's' : ''}`;
    }

    userInput.addEventListener('input', () => {
      userInput.style.height = 'auto';
      userInput.style.height = Math.min(userInput.scrollHeight, 140) + 'px';
      updateInputStats();
    });

    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!isGenerating) handleSendMessage();
      }
    });


    // --- Voice Input (Speech-to-Text - Audio NLP & Fully Automatic Auto-Send) ---
    let speechRecognition = null;
    let isListening = false;
    let voiceAutoSendTimer = null;
    let voiceHasCapturedSpeech = false;
    let isVoiceAutoSubmitting = false;
    let speechInitialText = '';

    function initSpeechRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (voiceInputBtn) voiceInputBtn.title = 'Speech recognition not supported in this browser';
        return;
      }
      speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';

      speechRecognition.onstart = () => {
        isListening = true;
        voiceHasCapturedSpeech = false;
        speechInitialText = userInput.value.trim();
        if (voiceInputBtn) {
          voiceInputBtn.classList.add('bg-rose-600', 'text-white', 'border-rose-500', 'animate-pulse', 'shadow-md', 'shadow-rose-600/40');
          voiceInputBtn.classList.remove('bg-slate-800', 'text-slate-300');
          voiceInputBtn.title = 'Listening hands-free... Click to send now, or stop speaking to auto-send';
        }
        if (micIcon) micIcon.textContent = '⏹️';
        userInput.placeholder = '🎙️ Listening hands-free... Speak now! (Auto-sends when done)';
      };

      speechRecognition.onresult = (e) => {
        let transcript = '';
        for (let i = 0; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }

        const fullText = speechInitialText ? (speechInitialText + ' ' + transcript.trim()) : transcript;
        userInput.value = fullText;
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 140) + 'px';
        updateInputStats();

        if (transcript.trim().length > 0) {
          voiceHasCapturedSpeech = true;
          userInput.placeholder = '🎙️ Listening... (Auto-sending when you finish speaking)';

          // Silence debounce: If user stops speaking for 1.4 seconds, automatically trigger send
          if (voiceAutoSendTimer) clearTimeout(voiceAutoSendTimer);
          voiceAutoSendTimer = setTimeout(() => {
            if (isListening && voiceHasCapturedSpeech && userInput.value.trim().length > 0) {
              triggerVoiceAutoSend();
            }
          }, 1400);
        }
      };

      speechRecognition.onerror = (e) => {
        if (e.error !== 'no-speech') {
          console.warn('Speech recognition error:', e.error);
        }
        if (e.error === 'not-allowed') {
          showToast('Microphone access was denied. Please allow microphone permissions in browser settings.', 'warning');
        }
        if (voiceAutoSendTimer) {
          clearTimeout(voiceAutoSendTimer);
          voiceAutoSendTimer = null;
        }
        voiceHasCapturedSpeech = false;
        stopVoiceRecognition();
      };

      speechRecognition.onend = () => {
        if (voiceAutoSendTimer) {
          clearTimeout(voiceAutoSendTimer);
          voiceAutoSendTimer = null;
        }
        // If speech was captured and we haven't already initiated send, auto-send now!
        if (voiceHasCapturedSpeech && userInput.value.trim().length > 0 && !isVoiceAutoSubmitting) {
          triggerVoiceAutoSend();
        } else {
          stopVoiceRecognition();
        }
      };
    }

    function triggerVoiceAutoSend() {
      if (isVoiceAutoSubmitting) return;
      isVoiceAutoSubmitting = true;
      if (voiceAutoSendTimer) {
        clearTimeout(voiceAutoSendTimer);
        voiceAutoSendTimer = null;
      }
      voiceHasCapturedSpeech = false;
      stopVoiceRecognition();

      const textToSend = userInput.value.trim();
      if (textToSend && !isGenerating) {
        userInput.placeholder = '🚀 Auto-sending prompt...';
        handleSendMessage();
      }
      setTimeout(() => {
        isVoiceAutoSubmitting = false;
      }, 500);
    }

    function stopVoiceRecognition() {
      isListening = false;
      if (voiceAutoSendTimer) {
        clearTimeout(voiceAutoSendTimer);
        voiceAutoSendTimer = null;
      }
      if (voiceInputBtn) {
        voiceInputBtn.classList.remove('bg-rose-600', 'text-white', 'border-rose-500', 'animate-pulse', 'shadow-md', 'shadow-rose-600/40');
        voiceInputBtn.classList.add('bg-slate-800', 'text-slate-300');
        voiceInputBtn.title = 'Voice Input (Speech-to-Text • Fully Automatic Auto-Send)';
      }
      if (micIcon) micIcon.textContent = '🎙️';
      userInput.placeholder = 'Ask anything, write code, research topics, or explore ideas... (Enter to send)';
      if (speechRecognition) {
        try { speechRecognition.stop(); } catch (err) {}
      }
    }

    if (voiceInputBtn) {
      voiceInputBtn.addEventListener('click', () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          return showToast('Voice recognition (Speech-to-Text) is not supported in this browser. Please use Chrome or Edge.', 'warning');
        }
        if (isListening) {
          if (voiceHasCapturedSpeech && userInput.value.trim().length > 0) {
            triggerVoiceAutoSend();
          } else {
            voiceHasCapturedSpeech = false;
            stopVoiceRecognition();
          }
        } else {
          try {
            if (!speechRecognition) initSpeechRecognition();
            voiceHasCapturedSpeech = false;
            isVoiceAutoSubmitting = false;
            speechRecognition.start();
          } catch (err) {
            stopVoiceRecognition();
          }
        }
      });
    }

    sendBtn.addEventListener('click', () => {
      if (isGenerating) {
        stopGeneration();
      } else {
        handleSendMessage();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isGenerating) {
        e.preventDefault();
        stopGeneration();
      }
    });
    newChatBtn.addEventListener('click', () => {
      createNewChat();
      if (isMobileOrTablet()) closeSidebar();
    });
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

    // Close modals on background backdrop click

    window.addEventListener('resize', () => {
      if (!isMobileOrTablet()) {
        sidebar.classList.remove('sidebar-open');
        sidebarBackdrop.classList.add('hidden');
      }
    });

    clearAllBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all chat history?')) {
        chats = [];
        localStorage.removeItem('nasinfinity_chats');
        createNewChat();
      }
    });

    exportChatBtn.addEventListener('click', exportCurrentChat);

    let activeAbortController = null;
    let stopRequested = false;

    const SEND_ICON_HTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;

    const STOP_ICON_HTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <rect x="5" y="5" width="14" height="14" rx="2.5"></rect>
      </svg>
    `;

    function updateSendButtonUI(state) {
      if (!sendBtn) return;
      if (state === 'stop') {
        sendBtn.innerHTML = STOP_ICON_HTML;
        sendBtn.title = 'Stop generating response (Esc)';
        sendBtn.setAttribute('aria-label', 'Stop generating response');
        sendBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-500', 'shadow-indigo-600/30');
        sendBtn.classList.add('bg-rose-600', 'hover:bg-rose-500', 'shadow-rose-600/40', 'ring-2', 'ring-rose-400/30');
        sendBtn.disabled = false;
      } else {
        sendBtn.innerHTML = SEND_ICON_HTML;
        sendBtn.title = 'Send prompt (Enter)';
        sendBtn.setAttribute('aria-label', 'Send prompt');
        sendBtn.classList.remove('bg-rose-600', 'hover:bg-rose-500', 'shadow-rose-600/40', 'ring-2', 'ring-rose-400/30');
        sendBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-500', 'shadow-indigo-600/30');
        sendBtn.disabled = false;
      }
    }

    function stopGeneration() {
      if (!isGenerating) return;
      stopRequested = true;
      if (activeAbortController) {
        try {
          activeAbortController.abort();
        } catch (e) {
          console.warn('Error aborting active request:', e);
        }
      }
    }
    window.stopGeneration = stopGeneration;

    function init() {
      updateNetworkStatus();
      updateInputStats();
      initSpeechRecognition();
      if (chats.length === 0) createNewChat();
      else loadChat(chats[0].id);
      renderChatHistory();
    }

    function createNewChat() {
      const newChat = {
        id: 'chat_' + Date.now(),
        title: 'New Conversation',
        messages: [],
        timestamp: Date.now()
      };
      chats.unshift(newChat);
      saveChats();
      loadChat(newChat.id);
      renderChatHistory();
    }

    function loadChat(id) {
      currentChatId = id;
      const chat = chats.find(c => c.id === id);
      if (!chat) return;

      chatTitleHeader.textContent = chat.title;
      messageContainer.innerHTML = '';

      if (chat.messages.length === 0) {
        messageContainer.appendChild(welcomeHero);
        welcomeHero.classList.remove('hidden');
      } else {
        welcomeHero.classList.add('hidden');
        chat.messages.forEach(msg => appendMessageElement(msg.role, msg.content, false));
      }
      messageContainer.scrollTop = messageContainer.scrollHeight;
      renderChatHistory();
    }

    function saveChats() {
      try {
        localStorage.setItem('nasinfinity_chats', JSON.stringify(chats));
      } catch (err) {
        console.warn('Unable to persist chats to localStorage (storage full or restricted):', err);
      }
    }

    function renderChatHistory() {
      chatHistoryList.innerHTML = '';
      chats.forEach(chat => {
        const item = document.createElement('button');
        const isActive = chat.id === currentChatId;
        item.className = `w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between group transition ${
          isActive ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
        }`;
        item.innerHTML = `
          <span class="truncate pr-2">${chat.title || 'Conversation'}</span>
          <span class="text-[11px] text-slate-400 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:text-red-400 px-1.5 py-0.5 rounded transition" onclick="deleteChat(event, '${chat.id}')">&times;</span>
        `;
        item.addEventListener('click', () => {
          loadChat(chat.id);
          if (isMobileOrTablet()) closeSidebar();
        });
        chatHistoryList.appendChild(item);
      });
    }

    window.deleteChat = function(e, id) {
      e.stopPropagation();
      chats = chats.filter(c => c.id !== id);
      saveChats();
      if (chats.length === 0) createNewChat();
      else if (currentChatId === id) loadChat(chats[0].id);
      else renderChatHistory();
    };

    window.sendQuickPrompt = function(promptText) {
      userInput.value = promptText;
      handleSendMessage();
    };

    // --- Markdown & Code Formatting ---
    function formatMarkdown(text) {
      let formatted = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Placeholders for code blocks and tables to prevent <br> injection
      const blocks = [];

      // 1. Code blocks with syntax copy and live preview
      formatted = formatted.replace(/```([a-z0-9_-]*)\r?\n([\s\S]*?)```/g, (match, lang, code) => {
        const l = (lang || '').toLowerCase();
        const unescapedCode = code
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');

        const isWebExecutable = l === 'html' || unescapedCode.includes('<!DOCTYPE html>') || (unescapedCode.includes('<html') && unescapedCode.includes('</html>'));
        const previewBtn = isWebExecutable 
          ? `<button onclick="previewCode(this)" class="px-2 sm:px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 font-semibold text-[10px] sm:text-[11px] border border-emerald-500/30 flex items-center gap-1 transition active:scale-95"><span>▶</span> <span class="hidden xs:inline">Run / </span>Preview Live</button>` 
          : '';

        const html = `
          <div class="code-card relative my-3 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
            <div class="flex flex-wrap items-center justify-between gap-1.5 px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
              <span class="font-mono text-indigo-400 font-semibold text-[11px] sm:text-xs">${l || 'code'}</span>
              <div class="flex items-center gap-1.5 sm:gap-2">
                ${previewBtn}
                <button onclick="copyCode(this)" class="px-2 sm:px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] sm:text-[11px] border border-slate-700 transition active:scale-95">Copy<span class="hidden xs:inline"> Code</span></button>
              </div>
            </div>
            <pre class="!m-0 !p-3 sm:!p-3.5 !bg-slate-950 !border-0 overflow-x-auto"><code class="code-font text-slate-200 text-xs leading-relaxed">${code.trim()}</code></pre>
          </div>
        `;
        const idx = blocks.length;
        blocks.push(html);
        return `%%%BLOCK_${idx}%%%`;
      });

      // 2. Markdown Tables
      formatted = formatted.replace(/(?:(?:^|\n)\|[^\n]+\|\r?\n(?:\|[\s:-]+)+\|\r?\n(?:\|[^\n]+\|\r?\n?)+)/g, (tableText) => {
        const lines = tableText.trim().split('\n').filter(l => l.trim().startsWith('|'));
        if (lines.length < 2) return tableText;
        
        const headers = lines[0].split('|').slice(1, -1).map(c => c.trim());
        const rows = lines.slice(2).map(line => line.split('|').slice(1, -1).map(c => c.trim()));
        
        let html = '<div class="overflow-x-auto my-3 rounded-xl border border-slate-700/80 bg-slate-950/80 shadow-md">';
        html += '<table class="min-w-full divide-y divide-slate-800 text-xs text-left">';
        html += '<thead class="bg-slate-800/90 text-indigo-300 font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]"><tr>';
        headers.forEach(h => {
          html += `<th class="px-2.5 sm:px-3.5 py-2 sm:py-2.5 whitespace-nowrap">${h}</th>`;
        });
        html += '</tr></thead>';
        html += '<tbody class="divide-y divide-slate-800/50 text-slate-300">';
        rows.forEach(r => {
          html += '<tr class="hover:bg-slate-800/40 transition">';
          r.forEach(cell => {
            html += `<td class="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs">${cell}</td>`;
          });
          html += '</tr>';
        });
        html += '</tbody></table></div>';
        
        const idx = blocks.length;
        blocks.push(html);
        return `\n%%%BLOCK_${idx}%%%\n`;
      });

      // 3. Markdown Links [text](url)
      formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 underline font-medium inline-flex items-center gap-1">$1 ↗</a>');

      // 4. Headers
      formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-white mt-3 mb-1">$1</h3>');
      formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-white mt-4 mb-2">$1</h2>');
      formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold text-white mt-4 mb-2">$1</h1>');

      // 5. Horizontal rules
      formatted = formatted.replace(/^---$/gim, '<hr class="border-slate-800 my-3">');

      // 6. Lists (processed before bold/italic)
      formatted = formatted.replace(/^[\*\-] (.*$)/gim, '<li class="ml-4 list-disc text-slate-200">$1</li>');

      // 7. Inline code
      formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-slate-800/80 text-indigo-300 px-1.5 py-0.5 rounded text-xs code-font">$1</code>');
      
      // 8. Bold
      formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

      // 9. Italic
      formatted = formatted.replace(/(?<!\*)\*([^\s\*][^*]*[^\s\*]|\w)\*(?!\*)/g, '<em class="text-slate-300 italic">$1</em>');

      // 10. Paragraphs and line breaks
      formatted = formatted.replace(/\n\n/g, '<br><br>');
      formatted = formatted.replace(/\n/g, '<br>');

      // Restore protected blocks
      formatted = formatted.replace(/%%%BLOCK_(\d+)%%%/g, (match, id) => blocks[Number(id)] || '');

      return formatted;
    }

    function appendMessageElement(role, content) {
      if (welcomeHero.parentNode === messageContainer) {
        welcomeHero.classList.add('hidden');
      }

      const isUser = role === 'user';
      const msgDiv = document.createElement('div');
      msgDiv.className = `flex gap-2 sm:gap-3 max-w-3xl w-full mx-auto ${isUser ? 'justify-end' : 'justify-start'}`;

      const avatar = document.createElement('div');
      if (isUser) {
        avatar.className = 'h-7 w-7 sm:h-8 sm:w-8 rounded-xl flex items-center justify-center shrink-0 text-xs sm:text-sm shadow-sm select-none bg-indigo-600 text-white order-2';
        avatar.textContent = '👤';
      } else {
        avatar.className = 'h-7 w-7 sm:h-8 sm:w-8 rounded-xl overflow-hidden shadow-sm shrink-0 select-none';
        avatar.innerHTML = '<img src="/assets/avatars/woman-3d-avatar.jpg" alt="AI" class="h-full w-full object-cover" onerror="this.parentElement.textContent=\'👩‍💻\'">';
      }

      const bubble = document.createElement('div');
      bubble.className = `message-bubble max-w-[88%] sm:max-w-[85%] md:max-w-[80%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm leading-relaxed overflow-hidden break-words shadow-sm ${
        isUser ? 'bg-indigo-600/90 text-white rounded-br-none shadow-md' : 'bg-slate-900 border border-slate-800/90 text-slate-200 rounded-bl-none'
      }`;

      if (isUser) {
        bubble.textContent = content;
      } else {
        bubble.innerHTML = formatMarkdown(content);
        if (content !== 'Thinking...') {
          attachNlpToolbar(bubble, content);
        }
      }

      msgDiv.appendChild(avatar);
      msgDiv.appendChild(bubble);
      messageContainer.appendChild(msgDiv);
      messageContainer.scrollTop = messageContainer.scrollHeight;

      return bubble;
    }


    async function handleSendMessage() {
      const text = userInput.value.trim();
      if (!text || isGenerating) return;
      if (isListening) stopVoiceRecognition();

      userInput.value = '';
      userInput.style.height = 'auto';
      updateInputStats();

      let chat = chats.find(c => c.id === currentChatId);
      if (!chat) {
        createNewChat();
        chat = chats.find(c => c.id === currentChatId);
      }
      if (!chat) return;

      if (chat.messages.length === 0) {
        chat.title = text.slice(0, 32) + (text.length > 32 ? '...' : '');
        chatTitleHeader.textContent = chat.title;
        renderChatHistory();
      }

      chat.messages.push({ role: 'user', content: text });
      appendMessageElement('user', text);
      saveChats();

      isGenerating = true;
      stopRequested = false;
      activeAbortController = new AbortController();
      updateSendButtonUI('stop');
      typingIndicator.classList.remove('hidden');

      const responseBubble = appendMessageElement('assistant', 'Thinking...');
      let fullResponse = '';
      const mode = (engineSelector && engineSelector.value) || 'online_first';
      const isOnline = navigator.onLine;

      try {
        const instantResponse = getInstantConversationalResponse(text, chat.messages);
        if (instantResponse) {
          fullResponse = instantResponse;
        } else {
          if (mode === 'online_first') {
            if (!isOnline) {
              const offlineFallback = isCodeGenerationPrompt(text)
                ? synthesizeCodeFallback(text)
                : synthesizeConversationalResponse(text, chat.messages);
              if (offlineFallback) {
                fullResponse = offlineFallback;
              } else {
                throw new Error('You are currently offline. Connect to the internet or ask any coding, conversational, or general science question!');
              }
            } else {
              responseBubble.innerHTML = '<span class="text-indigo-400 flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Querying Live Internet AI...</span>';
              try {
                fullResponse = await fetchOnlineAIResponse(text, chat.messages, activeAbortController ? activeAbortController.signal : null);
              } catch (onlineErr) {
                console.warn('Online AI failed, evaluating fallback strategy:', onlineErr);
                if (isCodeGenerationPrompt(text)) {
                  const codeFallback = synthesizeCodeFallback(text);
                  if (codeFallback) {
                    fullResponse = codeFallback;
                  } else {
                    fullResponse = synthesizeConversationalResponse(text, chat.messages) || 'The online AI service timed out while processing your code request. Please try again or switch to Gemini/OpenAI in the sidebar.';
                  }
                } else if (shouldUseWikipedia(text)) {
                  // Only use Wikipedia API when the query actually requires an encyclopedic / factual lookup!
                  const webAnswer = await fetchWebAnswer(text);
                  if (webAnswer) {
                    fullResponse = `### 🌐 ${webAnswer.title}\n*${webAnswer.description}*\n\n${webAnswer.extract}\n\n---\n🔗 **Live Web Source:** [Read more on Wikipedia](${webAnswer.url})`;
                  } else {
                    const convFallback = synthesizeConversationalResponse(text, chat.messages);
                    if (convFallback) {
                      fullResponse = convFallback;
                    } else {
                      throw new Error('Unable to reach live AI services and no matching encyclopedic knowledge was found. Please check your internet connection or try again.');
                    }
                  }
                } else {
                  // For conversational, assistant identity, advice, greetings, or dialogue queries:
                  const convFallback = synthesizeConversationalResponse(text, chat.messages);
                  if (convFallback) {
                    fullResponse = convFallback;
                  } else {
                    throw new Error('Internet AI services timed out. Please try again or switch to Gemini/OpenAI in the sidebar.');
                  }
                }
              }
            }
          } else if (mode === 'gemini') {
            fullResponse = await callGeminiAPI(text, chat.messages, activeAbortController ? activeAbortController.signal : null);
          } else if (mode === 'openai') {
            fullResponse = await callOpenAIAPI(text, chat.messages, activeAbortController ? activeAbortController.signal : null);
          }
        }
          responseBubble.innerHTML = '';
          let charsShown = 0;
          const total = fullResponse.length;
          const chunkSize = total > 6000 ? 120 : total > 2000 ? 60 : total > 500 ? 20 : 6;

          while (charsShown < total) {
            if (stopRequested) break;
            charsShown = Math.min(charsShown + chunkSize, total);
            responseBubble.innerHTML = formatMarkdown(fullResponse.slice(0, charsShown));
            messageContainer.scrollTop = messageContainer.scrollHeight;
            await new Promise(r => setTimeout(r, 8));
          }
        const finalMsg = stopRequested ? (fullResponse.slice(0, charsShown) + (charsShown > 0 ? '\n\n' : '') + '*(Generation stopped by user)*') : fullResponse;
        responseBubble.innerHTML = formatMarkdown(finalMsg);
        attachNlpToolbar(responseBubble, finalMsg);
        messageContainer.scrollTop = messageContainer.scrollHeight;

        chat.messages.push({ role: 'assistant', content: finalMsg });
        saveChats();

      } catch (err) {
        if (stopRequested || (err && (err.name === 'AbortError' || err.message.includes('aborted')))) {
          const stoppedMsg = '*(Generation stopped by user)*';
          responseBubble.innerHTML = `<span class="text-slate-400 italic font-medium flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-rose-400"></span> Generation stopped by user</span>`;
          chat.messages.push({ role: 'assistant', content: stoppedMsg });
          saveChats();
        } else {
          responseBubble.innerHTML = `<span class="text-rose-400 font-medium">⚠️ Error: ${err.message}</span>`;
        }
      } finally {
        isGenerating = false;
        stopRequested = false;
        activeAbortController = null;
        updateSendButtonUI('send');
        typingIndicator.classList.add('hidden');
      }
    }
    window.handleSendMessage = handleSendMessage;


    function exportCurrentChat() {
      const chat = chats.find(c => c.id === currentChatId);
      if (!chat || chat.messages.length === 0) return showToast('No messages to export.', 'info');

      let textContent = `# ${chat.title}\nDate: ${new Date(chat.timestamp).toLocaleString()}\n\n`;
      chat.messages.forEach(m => {
        textContent += `### ${m.role === 'user' ? 'User' : 'NasInfinity AI'}\n${m.content}\n\n`;
      });

      const blob = new Blob([textContent], { type: 'text/markdown;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      const safeTitle = (chat.title || 'conversation').replace(/[^a-zA-Z0-9_-]/g, '_').replace(/^_+|_+$/g, '') || 'conversation';
      a.download = `${safeTitle}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }

    init();
