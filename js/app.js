// =========================================================================
// NasInfinity AI v2.0.0 — Core Application Controller
// Spatial Theme, Command Palette, Editorial Streaming, Vision & Python Wasm
// =========================================================================

(function(window) {
  'use strict';

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  window.escapeHtml = escapeHtml;

  const SVG_ICONS = {
    micIdle: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg>`,
    micActive: `<svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2.5"/></svg>`,
    send: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    stop: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2.5"></rect></svg>`,
    pin: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"/></svg>`,
    pinFilled: `<svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75h9z"/></svg>`,
    trash: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
    play: `<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></svg>`
  };

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
      info: 'glass-panel border-indigo-500/40 text-indigo-200',
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
    toast.className = `p-3 rounded-2xl border shadow-2xl text-xs flex items-center gap-2.5 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200 pointer-events-auto ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `<span class="text-sm shrink-0">${icons[type] || 'ℹ️'}</span><span class="flex-1 font-medium leading-relaxed">${escapeHtml(message)}</span>`;
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
  const customModelInput = document.getElementById('customModelInput');
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
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeSunIcon = document.getElementById('themeSunIcon');
  const themeMoonIcon = document.getElementById('themeMoonIcon');
  const commandPaletteModal = document.getElementById('commandPaletteModal');
  const commandPaletteInput = document.getElementById('commandPaletteInput');
  const commandPaletteList = document.getElementById('commandPaletteList');

  // --- Theme Management (Obsidian Dark & Daylight Paper Light) ---
  function applyTheme(theme) {
    const isLight = theme === 'light';
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', isLight ? '#f4f6fb' : '#06070b');
    if (themeSunIcon && themeMoonIcon) {
      themeSunIcon.classList.toggle('hidden', !isLight);
      themeMoonIcon.classList.toggle('hidden', isLight);
    }
    try {
      localStorage.setItem('nasinfinity_theme', isLight ? 'light' : 'dark');
    } catch (e) {}
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    showToast(`Switched to ${next === 'light' ? 'Daylight Paper' : 'Obsidian Spatial'} theme`, 'info');
  }
  window.toggleTheme = toggleTheme;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // --- Command Palette (Ctrl+K / ⌘K) ---
  const COMMAND_ACTIONS = [
    { id: 'cmd_new_chat', title: 'New Conversation Thread', subtitle: 'Start a fresh context window', tag: 'Action', run: () => createNewChat() },
    { id: 'cmd_periodic', title: 'Periodic Table of Elements Studio', subtitle: 'Explore 118 IUPAC elements & atomic shells', tag: 'Studio', run: () => typeof openPeriodicModal === 'function' && openPeriodicModal() },
    { id: 'cmd_nlp', title: 'NLP Inspector & Tokenizer', subtitle: 'Analyze tokens, sentiment & readability', tag: 'Studio', run: () => typeof openNlpModal === 'function' && openNlpModal() },
    { id: 'cmd_tutor', title: 'NasInfinity Coding Academy', subtitle: 'Interactive lessons across 15+ languages', tag: 'Studio', run: () => typeof openCodingTutorModal === 'function' && openCodingTutorModal() },
    { id: 'cmd_writer', title: 'Code Writer Blueprints', subtitle: 'Step-by-step code construction guides', tag: 'Studio', run: () => typeof openCodeWriterModal === 'function' && openCodeWriterModal() },
    { id: 'cmd_arcade', title: 'Runner Zero Gravity Arcade', subtitle: '60 FPS offline retro runner game', tag: 'Arcade', run: () => typeof openOfflineGameModal === 'function' && openOfflineGameModal() },
    { id: 'cmd_theme', title: 'Toggle Light / Dark Theme', subtitle: 'Switch between Obsidian Dark & Daylight Paper', tag: 'Theme', run: () => toggleTheme() },
    { id: 'cmd_export', title: 'Export Current Thread (.md)', subtitle: 'Download active conversation as Markdown', tag: 'Export', run: () => exportCurrentChat() }
  ];

  function renderCommandPalette(filterText = '') {
    if (!commandPaletteList) return;
    const q = filterText.trim().toLowerCase();
    commandPaletteList.innerHTML = '';

    const matchedActions = COMMAND_ACTIONS.filter(a =>
      !q || a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q)
    );

    const matchedChats = chats
      .filter(c => !q || (c.title || '').toLowerCase().includes(q))
      .slice(0, 5)
      .map(c => ({
        id: c.id,
        title: c.title || 'Conversation',
        subtitle: `${c.messages ? c.messages.length : 0} messages`,
        tag: 'Thread',
        run: () => loadChat(c.id)
      }));

    const combined = [...matchedActions, ...matchedChats];
    if (combined.length === 0) {
      commandPaletteList.innerHTML = `<div class="px-4 py-6 text-center text-xs text-slate-500">No studios or threads match "${escapeHtml(filterText)}"</div>`;
      return;
    }

    combined.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'w-full px-3.5 py-2.5 rounded-2xl hover:bg-white/10 text-left flex items-center justify-between gap-3 transition group';
      btn.innerHTML = `
        <div class="min-w-0">
          <div class="text-xs font-semibold text-slate-100 group-hover:text-indigo-400 transition truncate">${escapeHtml(item.title)}</div>
          <div class="text-[11px] text-slate-400 truncate">${escapeHtml(item.subtitle)}</div>
        </div>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded-full glass-panel text-slate-400 shrink-0">${escapeHtml(item.tag)}</span>
      `;
      btn.addEventListener('click', () => {
        closeCommandPalette();
        item.run();
      });
      commandPaletteList.appendChild(btn);
    });
  }

  window.openCommandPalette = function() {
    if (!commandPaletteModal) return;
    commandPaletteModal.classList.remove('hidden');
    if (commandPaletteInput) {
      commandPaletteInput.value = '';
      renderCommandPalette('');
      setTimeout(() => commandPaletteInput.focus(), 30);
    }
  };

  window.closeCommandPalette = function() {
    if (!commandPaletteModal) return;
    commandPaletteModal.classList.add('hidden');
  };

  if (commandPaletteInput) {
    commandPaletteInput.addEventListener('input', (e) => {
      renderCommandPalette(e.target.value);
    });
  }

  // --- Sidebar Responsive Drawer Helpers ---
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

  function getActiveModelDisplayName() {
    const mode = (engineSelector && engineSelector.value) || 'online_first';
    if (mode === 'gemini') {
      return localStorage.getItem('nasinfinity_custom_gemini_model') || 'Gemini 2.5 Flash';
    }
    if (mode === 'openai') {
      return localStorage.getItem('nasinfinity_custom_openai_model') || 'GPT-4o mini';
    }
    return 'Live Internet AI';
  }

  function updateNetworkStatus() {
    const isOnline = navigator.onLine;
    const mode = (engineSelector && engineSelector.value) || 'online_first';
    const banner = document.getElementById('offlineBanner');

    if (mode === 'online_first') {
      if (isOnline) {
        activeEngineBadge.textContent = 'Live Internet AI';
        activeEngineBadge.className = 'hidden sm:inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium shrink-0';
        activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Online';
        if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0';
        if (banner) banner.classList.add('hidden');
        activeEngineBadge.onclick = null;
        activeEngineBadge.style.cursor = 'default';
      } else {
        activeEngineBadge.textContent = 'Offline • Play Runner';
        activeEngineBadge.className = 'hidden sm:inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-medium shrink-0 cursor-pointer hover:bg-rose-500/30';
        activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-rose-400"></span> Offline';
        if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-rose-400 animate-ping shrink-0';
        if (banner) banner.classList.remove('hidden');
        activeEngineBadge.onclick = (typeof openOfflineGameModal === 'function') ? openOfflineGameModal : (window.openOfflineGameModal || null);
        activeEngineBadge.style.cursor = 'pointer';
      }
    }
  }

  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);

  function syncEngineSelectorUI() {
    if (!engineSelector) return;
    const mode = engineSelector.value;
    if (mode === 'online_first') {
      updateNetworkStatus();
      if (apiKeySection) apiKeySection.classList.add('hidden');
    } else if (mode === 'gemini') {
      const modelLabel = localStorage.getItem('nasinfinity_custom_gemini_model') || 'Gemini 2.5 Flash';
      activeEngineBadge.textContent = modelLabel;
      activeEngineBadge.className = 'hidden sm:inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-medium shrink-0';
      activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-indigo-400"></span> Streaming';
      if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-indigo-400 shrink-0';
      if (apiKeyLabel) apiKeyLabel.textContent = 'Google Gemini API Key';
      if (apiKeyHelp) apiKeyHelp.href = 'https://aistudio.google.com/app/apikey';
      if (apiKeyInput) apiKeyInput.value = localStorage.getItem('nasinfinity_gemini_key') || '';
      if (customModelInput) {
        customModelInput.placeholder = 'gemini-2.5-flash';
        customModelInput.value = localStorage.getItem('nasinfinity_custom_gemini_model') || '';
      }
      if (apiKeySection) apiKeySection.classList.remove('hidden');
    } else if (mode === 'openai') {
      const modelLabel = localStorage.getItem('nasinfinity_custom_openai_model') || 'GPT-4o mini';
      activeEngineBadge.textContent = modelLabel;
      activeEngineBadge.className = 'hidden sm:inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25 font-medium shrink-0';
      activeStatusBadge.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-purple-400"></span> Streaming';
      if (netStatusDot) netStatusDot.className = 'h-2 w-2 rounded-full bg-purple-400 shrink-0';
      if (apiKeyLabel) apiKeyLabel.textContent = 'OpenAI API Key';
      if (apiKeyHelp) apiKeyHelp.href = 'https://platform.openai.com/api-keys';
      if (apiKeyInput) apiKeyInput.value = localStorage.getItem('nasinfinity_openai_key') || '';
      if (customModelInput) {
        customModelInput.placeholder = 'gpt-4o-mini';
        customModelInput.value = localStorage.getItem('nasinfinity_custom_openai_model') || '';
      }
      if (apiKeySection) apiKeySection.classList.remove('hidden');
    }
  }

  if (engineSelector) {
    engineSelector.addEventListener('change', syncEngineSelectorUI);
  }

  if (apiKeyInput) {
    apiKeyInput.addEventListener('input', () => {
      const mode = engineSelector.value;
      if (mode === 'gemini') localStorage.setItem('nasinfinity_gemini_key', apiKeyInput.value.trim());
      if (mode === 'openai') localStorage.setItem('nasinfinity_openai_key', apiKeyInput.value.trim());
    });
  }

  if (customModelInput) {
    customModelInput.addEventListener('input', () => {
      const mode = engineSelector.value;
      const val = customModelInput.value.trim();
      if (mode === 'gemini') {
        if (val) localStorage.setItem('nasinfinity_custom_gemini_model', val);
        else localStorage.removeItem('nasinfinity_custom_gemini_model');
      } else if (mode === 'openai') {
        if (val) localStorage.setItem('nasinfinity_custom_openai_model', val);
        else localStorage.removeItem('nasinfinity_custom_openai_model');
      }
      syncEngineSelectorUI();
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
        voiceInputBtn.classList.remove('bg-white/5', 'text-slate-300');
        voiceInputBtn.title = 'Listening hands-free... Click to send now, or stop speaking to auto-send';
      }
      if (micIcon) micIcon.innerHTML = SVG_ICONS.micActive;
      userInput.placeholder = 'Listening hands-free... Speak now (auto-sends when done)';
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
        userInput.placeholder = 'Listening... Auto-sending when you pause';

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
      userInput.placeholder = 'Auto-sending prompt...';
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
      voiceInputBtn.classList.add('bg-white/5', 'text-slate-300');
      voiceInputBtn.title = 'Voice Input (Hands-free Speech-to-Text)';
    }
    if (micIcon) micIcon.innerHTML = SVG_ICONS.micIdle;
    userInput.placeholder = 'Message NasInfinity AI, drop files, or press ⌘K for studios...';
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

  // Global Keyboard Shortcuts (Ctrl+K / ⌘K for Command Palette, Esc for Stop/Close)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (commandPaletteModal && commandPaletteModal.classList.contains('hidden')) {
        openCommandPalette();
      } else {
        closeCommandPalette();
      }
      return;
    }
    if (e.key === 'Escape') {
      if (commandPaletteModal && !commandPaletteModal.classList.contains('hidden')) {
        e.preventDefault();
        closeCommandPalette();
        return;
      }
      if (isGenerating) {
        e.preventDefault();
        stopGeneration();
      }
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
        version: '2.0.0',
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

  function updateSendButtonUI(state) {
    if (!sendBtn) return;
    if (state === 'stop') {
      sendBtn.innerHTML = SVG_ICONS.stop;
      sendBtn.title = 'Stop generating response (Esc)';
      sendBtn.setAttribute('aria-label', 'Stop generating response');
      sendBtn.className = 'keep-white h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white flex items-center justify-center transition shadow-md shadow-rose-600/40 ring-2 ring-rose-400/30';
      sendBtn.disabled = false;
    } else {
      sendBtn.innerHTML = SVG_ICONS.send;
      sendBtn.title = 'Send prompt (Enter)';
      sendBtn.setAttribute('aria-label', 'Send prompt');
      sendBtn.className = 'keep-white h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 text-white flex items-center justify-center transition disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-indigo-600/35';
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
    const savedTheme = localStorage.getItem('nasinfinity_theme') || 'dark';
    applyTheme(savedTheme);
    updateNetworkStatus();
    updateInputStats();
    initSpeechRecognition();
    if (chats.length === 0) createNewChat();
    else loadChat(chats[0].id);
    renderChatHistory();

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
      if (err && (err.name === 'QuotaExceededError' || String(err.message).toLowerCase().includes('quota'))) {
        showToast('Browser chat storage is nearly full; consider exporting or clearing old threads.', 'warning');
      }
    }
  }

  function renderChatGroup(label, items) {
    if (items.length === 0) return;

    const header = document.createElement('div');
    header.className = 'text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2.5 pt-2 pb-0.5';
    header.textContent = label;
    chatHistoryList.appendChild(header);

    items.forEach(chat => {
      const item = document.createElement('button');
      const isActive = chat.id === currentChatId;
      item.className = `w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between group transition ${
        isActive
          ? 'bg-indigo-500/15 text-indigo-300 font-semibold border border-indigo-500/30'
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
      }`;

      const pinIconHtml = chat.isPinned ? SVG_ICONS.pinFilled : SVG_ICONS.pin;
      const pinTitle = chat.isPinned ? 'Unpin thread' : 'Pin thread to top';

      item.innerHTML = `
        <div class="flex items-center gap-1.5 min-w-0 flex-1 pr-1.5">
          ${chat.isPinned ? `<span class="shrink-0" title="Pinned">${SVG_ICONS.pinFilled}</span>` : ''}
          <span class="truncate">${escapeHtml(chat.title || 'Conversation')}</span>
        </div>
        <div class="flex items-center gap-0.5 shrink-0 opacity-75 sm:opacity-0 sm:group-hover:opacity-100 transition">
          <span class="pin-chat-btn text-slate-400 hover:text-amber-400 p-1 rounded-lg hover:bg-white/10 transition" title="${pinTitle}">${pinIconHtml}</span>
          <span class="delete-chat-btn text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 transition" title="Delete thread">${SVG_ICONS.trash}</span>
        </div>
      `;
      const pinBtn = item.querySelector('.pin-chat-btn');
      const deleteBtn = item.querySelector('.delete-chat-btn');
      if (pinBtn) pinBtn.addEventListener('click', (e) => window.togglePinChat(e, chat.id));
      if (deleteBtn) deleteBtn.addEventListener('click', (e) => window.deleteChat(e, chat.id));
      item.addEventListener('click', () => {
        loadChat(chat.id);
        if (isMobileOrTablet()) closeSidebar();
      });
      chatHistoryList.appendChild(item);
    });
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

    if (filtered.length === 0) {
      chatHistoryList.innerHTML = `<div class="px-2.5 py-4 text-[11px] text-slate-500 text-center italic">No matching threads</div>`;
      return;
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayTs = startOfToday.getTime();

    const pinned = filtered.filter(c => c.isPinned).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    const today = filtered.filter(c => !c.isPinned && (c.timestamp || 0) >= todayTs).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    const earlier = filtered.filter(c => !c.isPinned && (c.timestamp || 0) < todayTs).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    renderChatGroup('Pinned', pinned);
    renderChatGroup('Today', today);
    renderChatGroup('Earlier', earlier);
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

  function formatInlineMarkdown(str) {
    return str
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 underline font-medium inline-flex items-center gap-1">$1 ↗</a>')
      .replace(/`([^`]+)`/g, '<code class="bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.5 rounded-md text-xs code-font">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/(?<!\*)\*([^\s\*][^*]*[^\s\*]|\w)\*(?!\*)/g, '<em class="text-slate-300 italic">$1</em>');
  }

  // --- Markdown, IDE Code Cards & Table Formatting ---
  function formatMarkdown(text) {
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const blocks = [];

    // 1. Code blocks with IDE window header, syntax copy, live HTML preview & Python Wasm runner
    formatted = formatted.replace(/```([a-z0-9_-]*)\r?\n([\s\S]*?)```/g, (match, lang, code) => {
      const l = (lang || '').toLowerCase();
      const unescapedCode = code
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      const isWebExecutable = l === 'html' || unescapedCode.includes('<!DOCTYPE html>') || (unescapedCode.includes('<html') && unescapedCode.includes('</html>'));
      const isPythonExecutable = (l === 'python' || l === 'py');
      const pyOutId = `pyOut_${Math.random().toString(36).substring(2, 9)}`;

      let actionBtn = '';
      if (isWebExecutable) {
        actionBtn = `<button onclick="previewCode(this)" class="px-2.5 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-semibold text-[10px] sm:text-[11px] border border-emerald-500/30 flex items-center gap-1 transition active:scale-95">${SVG_ICONS.play} <span class="hidden xs:inline">Run / </span>Preview</button>`;
      } else if (isPythonExecutable) {
        actionBtn = `<button onclick="runPythonCodeFromCard(this, '${pyOutId}')" class="px-2.5 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-semibold text-[10px] sm:text-[11px] border border-amber-500/30 flex items-center gap-1 transition active:scale-95">${SVG_ICONS.play} <span class="hidden xs:inline">Run </span>Python (Wasm)</button>`;
      }

      const pythonOutputContainer = isPythonExecutable
        ? `<div id="${pyOutId}" class="hidden p-3 bg-slate-950 border-t border-white/10"></div>`
        : '';

      const html = `
        <div class="code-card code-card-shell relative my-3.5 rounded-2xl overflow-hidden">
          <div class="code-card-header flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 text-xs text-slate-400">
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1.5 opacity-75">
                <span class="h-2 w-2 rounded-full bg-rose-500/70"></span>
                <span class="h-2 w-2 rounded-full bg-amber-500/70"></span>
                <span class="h-2 w-2 rounded-full bg-emerald-500/70"></span>
              </div>
              <span class="font-mono text-indigo-400 font-semibold text-[11px] uppercase tracking-wider ml-1">${l || 'code'}</span>
            </div>
            <div class="flex items-center gap-1.5">
              ${actionBtn}
              <button onclick="copyCode(this)" class="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] sm:text-[11px] border border-white/10 transition active:scale-95">Copy</button>
            </div>
          </div>
          <pre class="!m-0 !p-3.5 !bg-transparent !border-0 overflow-x-auto"><code class="code-font text-slate-200 text-xs leading-relaxed">${code.trim()}</code></pre>
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

      let html = '<div class="overflow-x-auto my-3.5 rounded-2xl glass-panel shadow-md">';
      html += '<table class="min-w-full divide-y divide-white/10 text-xs text-left">';
      html += '<thead class="bg-white/5 text-indigo-400 font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]"><tr>';
      headers.forEach(h => {
        html += `<th class="px-3.5 py-2.5 whitespace-nowrap">${formatInlineMarkdown(h)}</th>`;
      });
      html += '</tr></thead>';
      html += '<tbody class="divide-y divide-white/5 text-slate-300">';
      rows.forEach(r => {
        html += '<tr class="hover:bg-white/5 transition">';
        r.forEach(cell => {
          html += `<td class="px-3.5 py-2 text-[11px] sm:text-xs">${formatInlineMarkdown(cell)}</td>`;
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
    formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-white mt-3.5 mb-1.5">$1</h3>');
    formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-white mt-4 mb-2">$1</h2>');
    formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold text-white mt-4 mb-2">$1</h1>');

    // 5. Horizontal rules & Blockquotes
    formatted = formatted.replace(/^---$/gim, '<hr class="border-white/10 my-3.5">');
    formatted = formatted.replace(/^[ \t]*&gt;\s?(.*$)/gim, '<blockquote class="border-l-2 border-indigo-400/70 pl-3.5 py-1 my-2 text-slate-300 bg-indigo-500/5 rounded-r-xl italic">$1</blockquote>');

    // 6. Lists (Bullet & Numbered, supporting indented items)
    formatted = formatted.replace(/^[ \t]*[\*\-] (.*$)/gim, '<li class="ml-5 list-disc text-slate-200 my-0.5">$1</li>');
    formatted = formatted.replace(/^[ \t]*(\d+)\.\s+(.*$)/gim, '<div class="ml-1 my-0.5"><span class="font-semibold text-indigo-400 mr-1.5">$1.</span>$2</div>');

    // 7. Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.5 rounded-md text-xs code-font">$1</code>');

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

  // --- Editorial Message Stream Renderer ---
  function appendMessageElement(role, content) {
    if (welcomeHero && welcomeHero.parentNode === messageContainer) {
      welcomeHero.classList.add('hidden');
    }

    const isUser = role === 'user';
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg-enter max-w-3xl w-full mx-auto ${isUser ? 'flex justify-end' : 'flex flex-col gap-2'}`;

    if (isUser) {
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble user-capsule max-w-[85%] sm:max-w-[78%] rounded-3xl rounded-br-md px-4 py-2.5 text-xs sm:text-sm leading-relaxed break-words';
      bubble.textContent = content;
      msgDiv.appendChild(bubble);
      messageContainer.appendChild(msgDiv);
      messageContainer.scrollTop = messageContainer.scrollHeight;
      return bubble;
    }

    // Editorial Assistant Header (Avatar + Brand + Active Model Tag)
    const authorRow = document.createElement('div');
    authorRow.className = 'flex items-center gap-2.5 select-none';
    authorRow.innerHTML = `
      <div class="h-6 w-6 rounded-xl overflow-hidden shadow-sm ring-1 ring-white/15 shrink-0">
        <img src="/assets/avatars/woman-3d-avatar.jpg" alt="AI" class="h-full w-full object-cover" onerror="this.parentElement.textContent='✨'">
      </div>
      <span class="text-xs font-bold text-slate-100 tracking-tight">NasInfinity AI</span>
      <span class="text-[10px] font-mono px-2 py-0.5 rounded-full glass-panel text-slate-400">${escapeHtml(getActiveModelDisplayName())}</span>
    `;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble editorial-assistant pl-0 sm:pl-8 text-xs sm:text-[14px] leading-relaxed overflow-hidden break-words';

    if (content === 'Thinking...') {
      bubble.innerHTML = `
        <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-panel text-xs text-indigo-300">
          <span class="h-2.5 w-2.5 rounded-full thinking-orb"></span>
          <span>Thinking &amp; synthesizing response...</span>
        </div>
      `;
    } else {
      bubble.innerHTML = formatMarkdown(content);
      if (typeof attachNlpToolbar === 'function') {
        attachNlpToolbar(bubble, content);
      }
    }

    msgDiv.appendChild(authorRow);
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

    let promptWithAttachments = rawText;
    const textAtts = activeAtts.filter(a => !a.isImage);
    const imageAtts = activeAtts.filter(a => a.isImage);
    const folderNames = [...new Set(activeAtts.map(a => a.folderName).filter(Boolean))];

    if (textAtts.length > 0) {
      const treeBlock = (folderNames.length > 0 && typeof window.buildFolderTreeSummary === 'function')
        ? window.buildFolderTreeSummary(activeAtts) + '\n\n'
        : '';
      const docHeader = textAtts.map(t => `--- Attached File: ${t.relativePath || t.name} ---\n${t.content}\n--- End File ---`).join('\n\n');
      promptWithAttachments = treeBlock + docHeader + (rawText ? `\n\n${rawText}` : '\n\nPlease analyze and explain the attached files.');
    } else if (!rawText && imageAtts.length > 0) {
      promptWithAttachments = 'Please analyze this attached image in detail.';
    }

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
      const defaultTitle = folderNames.length > 0 ? `Folder: ${folderNames[0]}` : 'Multimodal Query';
      const titleSource = rawText || defaultTitle;
      chat.title = titleSource.slice(0, 32) + (titleSource.length > 32 ? '...' : '');
      if (chatTitleHeader) chatTitleHeader.textContent = chat.title;
      renderChatHistory();
    }

    const summaryTags = [];
    if (folderNames.length > 0) {
      folderNames.forEach(fn => {
        const count = activeAtts.filter(a => a.folderName === fn).length;
        summaryTags.push(`[📁 Folder: ${fn}/ (${count} file${count !== 1 ? 's' : ''})]`);
      });
    }
    const standaloneDocs = textAtts.filter(a => !a.folderName);
    if (standaloneDocs.length > 0) {
      summaryTags.push(`[📄 ${standaloneDocs.map(d => d.name).join(', ')}]`);
    }
    if (imageAtts.length > 0) {
      summaryTags.push(`[🖼️ ${imageAtts.length} Image${imageAtts.length > 1 ? 's' : ''}]`);
    }
    const displayContent = [summaryTags.join(' '), rawText].filter(Boolean).join('\n\n');
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

    const onStreamChunk = (accumulated) => {
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
            responseBubble.innerHTML = `
              <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-panel text-xs text-emerald-300">
                <span class="h-2.5 w-2.5 rounded-full thinking-orb"></span>
                <span>Querying Live Internet AI...</span>
              </div>
            `;
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
        responseBubble.innerHTML = `<span class="text-rose-400 font-medium">⚠️ Error: ${escapeHtml(err && err.message ? err.message : 'Unexpected error')}</span>`;
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
