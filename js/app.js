// =========================================================================
// NasInfinity AI v1.2.0 - Core Application Controller
// Multimodal Vision, Real-Time Streaming, Wasm Python Sandbox & Workspace Mgmt
// =========================================================================

(function(window) {
  'use strict';

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
  let chatSearchQuery = '';

  const messageContainer = document.getElementById('messageContainer');
  const welcomeHero = document.getElementById('welcomeHero');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const newChatBtn = document.getElementById('newChatBtn');
  const chatHistoryList = document.getElementById('chatHistoryList');
  const chatSearchInput = document.getElementById('chatSearchInput');
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
  const backupWorkspaceBtn = document.getElementById('backupWorkspaceBtn');
  const restoreWorkspaceBtn = document.getElementById('restoreWorkspaceBtn');
  const restoreFileInput = document.getElementById('restoreFileInput');
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
  if (engineSelector) {
    engineSelector.addEventListener('change', () => {
      const mode = engineSelector.value;
      if (mode === 'online_first') {
        updateNetworkStatus();
        if (apiKeySection) apiKeySection.classList.add('hidden');
      } else if (mode === 'gemini') {
        activeEngineBadge.textContent = 'Gemini 2.5 Flash API';
        activeEngineBadge.className = 'hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium shrink-0';
        activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-indigo-400"></span> Streaming API';
        if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-indigo-400';
        if (apiKeyLabel) apiKeyLabel.textContent = 'Google AI Gemini API Key';
        if (apiKeyHelp) apiKeyHelp.href = 'https://aistudio.google.com/app/apikey';
        if (apiKeyInput) apiKeyInput.value = localStorage.getItem('nasinfinity_gemini_key') || '';
        if (apiKeySection) apiKeySection.classList.remove('hidden');
      } else if (mode === 'openai') {
        activeEngineBadge.textContent = 'OpenAI GPT-4o mini API';
        activeEngineBadge.className = 'hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium shrink-0';
        activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-purple-400"></span> Streaming API';
        if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-purple-400';
        if (apiKeyLabel) apiKeyLabel.textContent = 'OpenAI API Key';
        if (apiKeyHelp) apiKeyHelp.href = 'https://platform.openai.com/api-keys';
        if (apiKeyInput) apiKeyInput.value = localStorage.getItem('nasinfinity_openai_key') || '';
        if (apiKeySection) apiKeySection.classList.remove('hidden');
      }
    });
  }

  if (apiKeyInput) {
    apiKeyInput.addEventListener('input', () => {
      const mode = engineSelector.value;
      if (mode === 'gemini') localStorage.setItem('nasinfinity_gemini_key', apiKeyInput.value.trim());
      if (mode === 'openai') localStorage.setItem('nasinfinity_openai_key', apiKeyInput.value.trim());
    });
  }

  // --- Live Word & Token NLP Stats ---
  function updateInputStats() {
    if (!userInput) return;
    const text = userInput.value.trim();
    if (!text) {
      if (inputNlpStats) inputNlpStats.textContent = '0 words • ~0 tokens';
      return;
    }
    const words = text.split(/\s+/).filter(Boolean).length;
    const tokens = Math.ceil(words * 1.33) + (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    if (inputNlpStats) inputNlpStats.textContent = `${words} word${words !== 1 ? 's' : ''} • ~${tokens} token${tokens !== 1 ? 's' : ''}`;
  }

  if (userInput) {
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
  }

  // --- Voice Input (Speech-to-Text - Audio NLP & Auto-Send) ---
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

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      if (isGenerating) {
        stopGeneration();
      } else {
        handleSendMessage();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isGenerating) {
      e.preventDefault();
      stopGeneration();
    }
  });

  if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
      createNewChat();
      if (isMobileOrTablet()) closeSidebar();
    });
  }

  if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', toggleSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (!isMobileOrTablet()) {
      sidebar.classList.remove('sidebar-open');
      sidebarBackdrop.classList.add('hidden');
    }
  });

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all chat history?')) {
        chats = [];
        localStorage.removeItem('nasinfinity_chats');
        createNewChat();
      }
    });
  }

  if (exportChatBtn) exportChatBtn.addEventListener('click', exportCurrentChat);

  // --- Workspace Search & Filtering ---
  if (chatSearchInput) {
    chatSearchInput.addEventListener('input', (e) => {
      chatSearchQuery = e.target.value.trim().toLowerCase();
      renderChatHistory();
    });
  }

  // --- Workspace Backup & Restore ---
  if (backupWorkspaceBtn) {
    backupWorkspaceBtn.addEventListener('click', () => {
      const backupData = {
        version: '1.2.0',
        exportedAt: new Date().toISOString(),
        chats: chats,
        userProfile: JSON.parse(localStorage.getItem('nasinfinity_user_profile') || '{}'),
        runnerHighScore: localStorage.getItem('nasinfinity_runner_high') || 0
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      const dateStr = new Date().toISOString().split('T')[0];
      a.download = `nasinfinity-workspace-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      showToast('Workspace backup exported successfully.', 'success');
    });
  }

  if (restoreWorkspaceBtn && restoreFileInput) {
    restoreWorkspaceBtn.addEventListener('click', () => restoreFileInput.click());
    restoreFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && Array.isArray(parsed.chats)) {
            chats = parsed.chats;
            localStorage.setItem('nasinfinity_chats', JSON.stringify(chats));
            if (parsed.userProfile) {
              localStorage.setItem('nasinfinity_user_profile', JSON.stringify(parsed.userProfile));
            }
            if (parsed.runnerHighScore) {
              localStorage.setItem('nasinfinity_runner_high', String(parsed.runnerHighScore));
            }
            if (chats.length > 0) {
              loadChat(chats[0].id);
            } else {
              createNewChat();
            }
            renderChatHistory();
            showToast('Workspace restored successfully!', 'success');
          } else {
            showToast('Invalid backup file format.', 'error');
          }
        } catch (parseErr) {
          showToast('Could not parse backup file: ' + parseErr.message, 'error');
        }
        restoreFileInput.value = '';
      };
      reader.readAsText(file);
    });
  }

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

    // Register Progressive Web App Service Worker for offline resilience
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
          console.debug('Service Worker registration note:', err);
        });
      });
    }
  }

  function createNewChat() {
    const newChat = {
      id: 'chat_' + Date.now(),
      title: 'New Conversation',
      messages: [],
      timestamp: Date.now(),
      isPinned: false
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

    if (chatTitleHeader) chatTitleHeader.textContent = chat.title;
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
      console.warn('Unable to persist chats to localStorage:', err);
    }
  }

  function renderChatHistory() {
    if (!chatHistoryList) return;
    chatHistoryList.innerHTML = '';

    let filtered = chats;
    if (chatSearchQuery) {
      filtered = chats.filter(c => {
        const titleMatch = (c.title || '').toLowerCase().includes(chatSearchQuery);
        const msgMatch = Array.isArray(c.messages) && c.messages.some(m => (m.content || '').toLowerCase().includes(chatSearchQuery));
        return titleMatch || msgMatch;
      });
    }

    // Sort pinned conversations to the top
    const sorted = [...filtered].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.timestamp || 0) - (a.timestamp || 0);
    });

    if (sorted.length === 0) {
      chatHistoryList.innerHTML = `<div class="px-2.5 py-3 text-[11px] text-slate-500 text-center italic">No conversations found</div>`;
      return;
    }

    sorted.forEach(chat => {
      const item = document.createElement('button');
      const isActive = chat.id === currentChatId;
      item.className = `w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between group transition ${
        isActive ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
      }`;

      const pinIcon = chat.isPinned ? '📌' : '📍';
      const pinTitle = chat.isPinned ? 'Unpin chat' : 'Pin chat to top';

      item.innerHTML = `
        <div class="flex items-center gap-1.5 min-w-0 flex-1 pr-1.5">
          ${chat.isPinned ? '<span class="text-[10px] shrink-0 text-amber-400" title="Pinned conversation">📌</span>' : ''}
          <span class="truncate">${chat.title || 'Conversation'}</span>
        </div>
        <div class="flex items-center gap-0.5 shrink-0 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition">
          <span class="text-[11px] text-slate-400 hover:text-amber-400 px-1 py-0.5 rounded transition" title="${pinTitle}" onclick="togglePinChat(event, '${chat.id}')">${pinIcon}</span>
          <span class="text-[11px] text-slate-400 hover:text-red-400 px-1 py-0.5 rounded transition" title="Delete chat" onclick="deleteChat(event, '${chat.id}')">&times;</span>
        </div>
      `;
      item.addEventListener('click', () => {
        loadChat(chat.id);
        if (isMobileOrTablet()) closeSidebar();
      });
      chatHistoryList.appendChild(item);
    });
  }

  window.togglePinChat = function(e, id) {
    e.stopPropagation();
    const chat = chats.find(c => c.id === id);
    if (chat) {
      chat.isPinned = !chat.isPinned;
      saveChats();
      renderChatHistory();
    }
  };

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

  // --- In-Browser Python WebAssembly Execution ---
  window.runPythonCodeFromCard = function(buttonEl, outputContainerId) {
    const card = buttonEl.closest('.code-card');
    if (!card) return;
    const codeEl = card.querySelector('code');
    if (!codeEl) return;
    const code = codeEl.textContent;
    if (typeof window.runPythonSnippet === 'function') {
      window.runPythonSnippet(code, outputContainerId);
    } else {
      showToast('Python runner engine is initializing...', 'info');
    }
  };

  // --- Markdown, Code & Table Formatting ---
  function formatMarkdown(text) {
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const blocks = [];

    // 1. Code blocks with syntax copy, live HTML preview & in-browser Python runner
    formatted = formatted.replace(/```([a-z0-9_-]*)\r?\n([\s\S]*?)```/g, (match, lang, code) => {
      const l = (lang || '').toLowerCase();
      const unescapedCode = code
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      const isWebExecutable = l === 'html' || unescapedCode.includes('<!DOCTYPE html>') || (unescapedCode.includes('<html') && unescapedCode.includes('</html>'));
      const isPythonExecutable = l === 'python' || l === 'py';
      const pyOutId = `pyOut_${Math.random().toString(36).substring(2, 9)}`;

      let actionBtn = '';
      if (isWebExecutable) {
        actionBtn = `<button onclick="previewCode(this)" class="px-2 sm:px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 font-semibold text-[10px] sm:text-[11px] border border-emerald-500/30 flex items-center gap-1 transition active:scale-95"><span>▶</span> <span class="hidden xs:inline">Run / </span>Preview Live</button>`;
      } else if (isPythonExecutable) {
        actionBtn = `<button onclick="runPythonCodeFromCard(this, '${pyOutId}')" class="px-2 sm:px-2.5 py-1 rounded bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 font-semibold text-[10px] sm:text-[11px] border border-amber-500/30 flex items-center gap-1 transition active:scale-95"><span>▶</span> <span class="hidden xs:inline">Run </span>Python (Wasm)</button>`;
      }

      const pythonOutputContainer = isPythonExecutable 
        ? `<div id="${pyOutId}" class="hidden p-3 bg-slate-900 border-t border-slate-800"></div>`
        : '';

      const html = `
        <div class="code-card relative my-3 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
          <div class="flex flex-wrap items-center justify-between gap-1.5 px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
            <span class="font-mono text-indigo-400 font-semibold text-[11px] sm:text-xs">${l || 'code'}</span>
            <div class="flex items-center gap-1.5 sm:gap-2">
              ${actionBtn}
              <button onclick="copyCode(this)" class="px-2 sm:px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] sm:text-[11px] border border-slate-700 transition active:scale-95">Copy<span class="hidden xs:inline"> Code</span></button>
            </div>
          </div>
          <pre class="!m-0 !p-3 sm:!p-3.5 !bg-slate-950 !border-0 overflow-x-auto"><code class="code-font text-slate-200 text-xs leading-relaxed">${code.trim()}</code></pre>
          ${pythonOutputContainer}
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

    // 6. Lists
    formatted = formatted.replace(/^[\*\-] (.*$)/gim, '<li class="ml-4 list-disc text-slate-200">$1</li>');

    // 7. Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-slate-800/80 text-indigo-300 px-1.5 py-0.5 rounded text-xs code-font">$1</code>');
    
    // 8. Bold & Italic
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    formatted = formatted.replace(/(?<!\*)\*([^\s\*][^*]*[^\s\*]|\w)\*(?!\*)/g, '<em class="text-slate-300 italic">$1</em>');

    // 9. Paragraphs and line breaks
    formatted = formatted.replace(/\n\n/g, '<br><br>');
    formatted = formatted.replace(/\n/g, '<br>');

    // Restore protected blocks
    formatted = formatted.replace(/%%%BLOCK_(\d+)%%%/g, (match, id) => blocks[Number(id)] || '');

    return formatted;
  }

  function appendMessageElement(role, content) {
    if (welcomeHero && welcomeHero.parentNode === messageContainer) {
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
      if (content !== 'Thinking...' && typeof attachNlpToolbar === 'function') {
        attachNlpToolbar(bubble, content);
      }
    }

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    messageContainer.appendChild(msgDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    return bubble;
  }

  // --- Main Prompt Submission & Dispatcher ---
  async function handleSendMessage() {
    const rawText = userInput.value.trim();
    const activeAtts = [...(window.activeAttachments || [])];

    if ((!rawText && activeAtts.length === 0) || isGenerating) return;
    if (isListening) stopVoiceRecognition();

    userInput.value = '';
    userInput.style.height = 'auto';
    updateInputStats();

    // Prepare full prompt with text attachments if present
    let promptWithAttachments = rawText;
    const textAtts = activeAtts.filter(a => !a.isImage);
    const imageAtts = activeAtts.filter(a => a.isImage);

    if (textAtts.length > 0) {
      const docHeader = textAtts.map(t => `--- Attached Document (${t.name}) ---\n${t.content}\n--- End Document ---`).join('\n\n');
      promptWithAttachments = docHeader + (rawText ? `\n\n${rawText}` : '\n\nPlease analyze and explain the attached documents.');
    } else if (!rawText && imageAtts.length > 0) {
      promptWithAttachments = 'Please analyze this attached image in detail.';
    }

    // Clear attachment tray
    if (typeof window.clearAttachments === 'function') {
      window.clearAttachments();
    }

    let chat = chats.find(c => c.id === currentChatId);
    if (!chat) {
      createNewChat();
      chat = chats.find(c => c.id === currentChatId);
    }
    if (!chat) return;

    if (chat.messages.length === 0) {
      chat.title = (rawText || 'Multimodal Query').slice(0, 32) + (rawText.length > 32 ? '...' : '');
      if (chatTitleHeader) chatTitleHeader.textContent = chat.title;
      renderChatHistory();
    }

    // Display user bubble with image thumbnails if attached
    let displayContent = rawText;
    if (imageAtts.length > 0) {
      displayContent = `[Attached ${imageAtts.length} Image${imageAtts.length > 1 ? 's' : ''}] ${rawText}`;
    }
    chat.messages.push({ role: 'user', content: promptWithAttachments });
    appendMessageElement('user', displayContent || promptWithAttachments);
    saveChats();

    isGenerating = true;
    stopRequested = false;
    activeAbortController = new AbortController();
    updateSendButtonUI('stop');
    if (typingIndicator) typingIndicator.classList.remove('hidden');

    const responseBubble = appendMessageElement('assistant', 'Thinking...');
    let fullResponse = '';
    let responseStreamedLive = false;
    const mode = (engineSelector && engineSelector.value) || 'online_first';
    const isOnline = navigator.onLine;

    // Real-Time Streaming Callback
    const onStreamChunk = (accumulated, chunk) => {
      responseStreamedLive = true;
      fullResponse = accumulated;
      responseBubble.innerHTML = formatMarkdown(accumulated);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    };

    try {
      const instantResponse = (typeof getInstantConversationalResponse === 'function')
        ? getInstantConversationalResponse(rawText, chat.messages)
        : null;

      if (instantResponse && activeAtts.length === 0) {
        fullResponse = instantResponse;
      } else {
        if (mode === 'online_first') {
          if (!isOnline) {
            const offlineFallback = (typeof isCodeGenerationPrompt === 'function' && isCodeGenerationPrompt(promptWithAttachments))
              ? synthesizeCodeFallback(promptWithAttachments)
              : synthesizeConversationalResponse(promptWithAttachments, chat.messages, false);
            fullResponse = offlineFallback || synthesizeConversationalResponse(promptWithAttachments, chat.messages, false);
          } else {
            responseBubble.innerHTML = '<span class="text-indigo-400 flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Querying Live Internet AI...</span>';
            try {
              fullResponse = await fetchOnlineAIResponse(promptWithAttachments, chat.messages, activeAbortController ? activeAbortController.signal : null);
            } catch (onlineErr) {
              console.warn('Online AI failed, evaluating fallback strategy:', onlineErr);
              if (typeof isCodeGenerationPrompt === 'function' && isCodeGenerationPrompt(promptWithAttachments)) {
                const codeFallback = synthesizeCodeFallback(promptWithAttachments);
                fullResponse = codeFallback || synthesizeConversationalResponse(promptWithAttachments, chat.messages, true);
              } else if (typeof shouldUseWikipedia === 'function' && shouldUseWikipedia(promptWithAttachments)) {
                const webAnswer = await fetchWebAnswer(promptWithAttachments);
                if (webAnswer) {
                  fullResponse = `### 🌐 ${webAnswer.title}\n*${webAnswer.description}*\n\n${webAnswer.extract}\n\n---\n🔗 **Live Web Source:** [Read more on Wikipedia](${webAnswer.url})`;
                } else {
                  fullResponse = synthesizeConversationalResponse(promptWithAttachments, chat.messages, true);
                }
              } else {
                fullResponse = synthesizeConversationalResponse(promptWithAttachments, chat.messages, true);
              }
            }
          }
        } else if (mode === 'gemini') {
          if (!isOnline) {
            if (typeof window.showToast === 'function') window.showToast('Offline Mode: Switched to Offline Knowledge Engine.', 'info');
            fullResponse = (typeof isCodeGenerationPrompt === 'function' && isCodeGenerationPrompt(promptWithAttachments))
              ? synthesizeCodeFallback(promptWithAttachments)
              : synthesizeConversationalResponse(promptWithAttachments, chat.messages, false);
          } else {
            try {
              fullResponse = await callGeminiAPI(
                promptWithAttachments, 
                chat.messages, 
                activeAbortController ? activeAbortController.signal : null,
                onStreamChunk,
                imageAtts
              );
            } catch (geminiErr) {
              console.warn('Gemini API call failed, falling back to conversational handler:', geminiErr);
              if (typeof window.showToast === 'function') window.showToast(`Gemini: ${geminiErr.message}`, 'warning');
              fullResponse = synthesizeConversationalResponse(promptWithAttachments, chat.messages, true);
            }
          }
        } else if (mode === 'openai') {
          if (!isOnline) {
            if (typeof window.showToast === 'function') window.showToast('Offline Mode: Switched to Offline Knowledge Engine.', 'info');
            fullResponse = (typeof isCodeGenerationPrompt === 'function' && isCodeGenerationPrompt(promptWithAttachments))
              ? synthesizeCodeFallback(promptWithAttachments)
              : synthesizeConversationalResponse(promptWithAttachments, chat.messages, false);
          } else {
            try {
              fullResponse = await callOpenAIAPI(
                promptWithAttachments, 
                chat.messages, 
                activeAbortController ? activeAbortController.signal : null,
                onStreamChunk,
                imageAtts
              );
            } catch (openaiErr) {
              console.warn('OpenAI API call failed, falling back to conversational handler:', openaiErr);
              if (typeof window.showToast === 'function') window.showToast(`OpenAI: ${openaiErr.message}`, 'warning');
              fullResponse = synthesizeConversationalResponse(promptWithAttachments, chat.messages, true);
            }
          }
        }
      }

      // Smooth simulated typewriter for non-streamed responses
      if (!responseStreamedLive && fullResponse) {
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
      }

      const finalMsg = stopRequested 
        ? (fullResponse + '\n\n*(Generation stopped by user)*') 
        : fullResponse;
      responseBubble.innerHTML = formatMarkdown(finalMsg);
      if (typeof attachNlpToolbar === 'function') {
        attachNlpToolbar(responseBubble, finalMsg);
      }
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
      if (typingIndicator) typingIndicator.classList.add('hidden');
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

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
