// =========================================================================
// NasInfinity AI v2.0.0 - Multimodal File & Folder Attachment Engine
// Supports individual files, images, unified popover, and recursive folders
// =========================================================================

(function(window) {
  'use strict';

  const MAX_STANDALONE_FILES = 10;
  const MAX_FOLDER_FILES = 25;
  const MAX_IMAGE_BYTES = 12 * 1024 * 1024; // 12 MB
  const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10 MB
  const MAX_SINGLE_TEXT_FILE_BYTES = 200 * 1024; // 200 KB
  const MAX_FOLDER_TEXT_CHARS = 150000; // ~150 KB combined text context

  const BINARY_EXTENSIONS = new Set([
    'exe', 'dll', 'zip', 'tar', 'gz', '7z', 'rar', 'wasm', 'bin',
    'pyc', 'class', 'so', 'dylib', 'mp3', 'mp4', 'mov', 'avi',
    'woff', 'woff2', 'ttf', 'eot', 'otf', 'ico', 'dmg', 'iso',
    'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'
  ]);

  const IGNORED_DIR_SEGMENTS = new Set([
    'node_modules', '.git', '.next', '.nuxt', '__pycache__',
    '.venv', 'venv', 'dist', 'build', 'coverage', '.cache', '.idea', '.vscode'
  ]);

  const ALLOWED_TEXT_EXTENSIONS = new Set([
    'txt', 'md', 'markdown', 'js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx',
    'py', 'html', 'htm', 'css', 'scss', 'sass', 'less', 'json', 'csv',
    'yaml', 'yml', 'xml', 'svg', 'sql', 'sh', 'bash', 'ps1', 'bat',
    'java', 'c', 'cpp', 'cc', 'h', 'hpp', 'cs', 'go', 'rs', 'php', 'rb',
    'toml', 'ini', 'cfg', 'conf', 'log', 'graphql', 'gql', 'vue', 'svelte'
  ]);

  const ALLOWED_EXTENSIONLESS_FILES = new Set([
    'dockerfile', 'license', 'makefile', 'readme', '.gitignore',
    '.dockerignore', '.env.example', '.editorconfig', 'procfile'
  ]);

  function safeEscape(str) {
    if (typeof window.escapeHtml === 'function') return window.escapeHtml(str);
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  window.activeAttachments = [];
  const expandedFolders = new Set();

  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function getFileIcon(fileName, isImage) {
    if (isImage) return '🖼️';
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    switch (ext) {
      case 'py': return '🐍';
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx': return '📜';
      case 'html':
      case 'htm': return '🌐';
      case 'css':
      case 'scss': return '🎨';
      case 'json': return '📋';
      case 'csv': return '📊';
      case 'md':
      case 'markdown': return '📝';
      case 'pdf': return '📕';
      case 'cpp':
      case 'c':
      case 'h': return '⚙️';
      case 'java': return '☕';
      default: return '📄';
    }
  }

  function normalizeRelativePath(file) {
    const raw = file._relativePath || file.webkitRelativePath || file.name || 'file';
    return String(raw).replace(/\\/g, '/').replace(/^\/+/, '');
  }

  function hasIgnoredDirSegment(relPath) {
    const segments = relPath.split('/').slice(0, -1); // directory segments only
    return segments.some(seg => IGNORED_DIR_SEGMENTS.has(seg.toLowerCase()));
  }

  function isReadableFolderFile(file, relPath) {
    if (file.type && file.type.startsWith('image/')) return true;
    if (hasIgnoredDirSegment(relPath)) return false;

    const baseName = (relPath.split('/').pop() || file.name || '').toLowerCase();
    if (ALLOWED_EXTENSIONLESS_FILES.has(baseName)) return true;

    const dotIdx = baseName.lastIndexOf('.');
    if (dotIdx > 0) {
      const ext = baseName.slice(dotIdx + 1);
      if (ALLOWED_TEXT_EXTENSIONS.has(ext)) return true;
    }

    if (file.type && (file.type.startsWith('text/') || file.type === 'application/json' || file.type === 'application/javascript')) {
      return true;
    }

    return false;
  }

  function buildFileChipElement(att, globalIndex, displayLabel) {
    const item = document.createElement('div');
    item.className = 'glass-panel flex items-center gap-2 px-2.5 py-1.5 rounded-2xl text-xs text-slate-200 shadow-sm animate-in fade-in duration-150';
    const safeLabel = safeEscape(displayLabel || att.name);

    if (att.isImage && att.preview) {
      item.innerHTML = `
        <div class="h-7 w-7 rounded-lg overflow-hidden bg-slate-900 ring-1 ring-white/10 shrink-0">
          <img src="${att.preview}" alt="${safeLabel}" class="h-full w-full object-cover">
        </div>
        <div class="flex flex-col min-w-0 max-w-[140px] sm:max-w-[180px]">
          <span class="truncate font-medium text-[11px]" title="${safeLabel}">${safeLabel}</span>
          <span class="text-[9px] text-slate-400 font-mono">${formatBytes(att.size)}</span>
        </div>
        <button type="button" class="remove-att-btn p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-rose-400 transition ml-0.5" title="Remove attachment">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      `;
    } else {
      item.innerHTML = `
        <span class="text-sm shrink-0">${getFileIcon(att.name, false)}</span>
        <div class="flex flex-col min-w-0 max-w-[140px] sm:max-w-[190px]">
          <span class="truncate font-medium text-[11px]" title="${safeLabel}">${safeLabel}</span>
          <span class="text-[9px] text-slate-400 font-mono">${formatBytes(att.size)}</span>
        </div>
        <button type="button" class="remove-att-btn p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-rose-400 transition ml-0.5" title="Remove attachment">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      `;
    }

    const rmBtn = item.querySelector('.remove-att-btn');
    if (rmBtn) {
      rmBtn.addEventListener('click', () => window.removeAttachment(globalIndex));
    }
    return item;
  }

  function renderAttachmentTray() {
    const tray = document.getElementById('attachmentTray');
    if (!tray) return;

    if (window.activeAttachments.length === 0) {
      tray.classList.add('hidden');
      tray.innerHTML = '';
      expandedFolders.clear();
      return;
    }

    tray.classList.remove('hidden');
    tray.innerHTML = '';

    // Separate grouped folders from standalone attachments
    const folderGroups = new Map();
    const standalone = [];

    window.activeAttachments.forEach((att, idx) => {
      if (att.folderName) {
        if (!folderGroups.has(att.folderName)) {
          folderGroups.set(att.folderName, []);
        }
        folderGroups.get(att.folderName).push({ att, idx });
      } else {
        standalone.push({ att, idx });
      }
    });

    // Render grouped folder capsules
    folderGroups.forEach((entries, folderName) => {
      const totalBytes = entries.reduce((sum, entry) => sum + (entry.att.size || 0), 0);
      const isExpanded = expandedFolders.has(folderName);
      const safeFolder = safeEscape(folderName);

      const groupWrap = document.createElement('div');
      groupWrap.className = 'w-full flex flex-col gap-1.5';

      const pill = document.createElement('div');
      pill.className = 'glass-panel inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-2xl text-xs text-slate-200 shadow-sm w-full sm:w-auto';
      pill.innerHTML = `
        <button type="button" class="toggle-folder-btn flex items-center gap-2 min-w-0 text-left flex-1">
          <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/></svg>
          <span class="font-semibold text-[11px] truncate">${safeFolder}/</span>
          <span class="text-[10px] font-mono text-cyan-400 shrink-0">${entries.length} file${entries.length !== 1 ? 's' : ''}</span>
          <span class="text-[10px] font-mono text-slate-400 shrink-0">&bull; ${formatBytes(totalBytes)}</span>
          <svg class="w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
        </button>
        <button type="button" class="remove-folder-btn p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-rose-400 transition shrink-0" title="Remove folder">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      `;

      const toggleBtn = pill.querySelector('.toggle-folder-btn');
      const removeFolderBtn = pill.querySelector('.remove-folder-btn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          if (expandedFolders.has(folderName)) expandedFolders.delete(folderName);
          else expandedFolders.add(folderName);
          renderAttachmentTray();
        });
      }
      if (removeFolderBtn) {
        removeFolderBtn.addEventListener('click', () => window.removeFolderGroup(folderName));
      }

      groupWrap.appendChild(pill);

      if (isExpanded) {
        const subGrid = document.createElement('div');
        subGrid.className = 'flex flex-wrap gap-1.5 pl-2 max-h-36 overflow-y-auto py-0.5';
        entries.forEach(({ att, idx }) => {
          const shortRel = att.relativePath && att.relativePath.startsWith(folderName + '/')
            ? att.relativePath.slice(folderName.length + 1)
            : (att.relativePath || att.name);
          subGrid.appendChild(buildFileChipElement(att, idx, shortRel));
        });
        groupWrap.appendChild(subGrid);
      }

      tray.appendChild(groupWrap);
    });

    // Render standalone file pills
    standalone.forEach(({ att, idx }) => {
      tray.appendChild(buildFileChipElement(att, idx, att.name));
    });
  }

  window.removeAttachment = function(index) {
    if (index >= 0 && index < window.activeAttachments.length) {
      window.activeAttachments.splice(index, 1);
      renderAttachmentTray();
    }
  };

  window.removeFolderGroup = function(folderName) {
    window.activeAttachments = window.activeAttachments.filter(att => att.folderName !== folderName);
    expandedFolders.delete(folderName);
    renderAttachmentTray();
  };

  window.clearAttachments = function() {
    window.activeAttachments = [];
    expandedFolders.clear();
    renderAttachmentTray();
    const fileInput = document.getElementById('fileAttachmentInput');
    if (fileInput) fileInput.value = '';
    const folderInput = document.getElementById('folderAttachmentInput');
    if (folderInput) folderInput.value = '';
  };

  window.buildFolderTreeSummary = function(attachments) {
    const paths = (attachments || [])
      .map(a => a.relativePath || a.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    if (paths.length === 0) return '';
    return '[Folder Structure]\n' + paths.map(p => `- ${p}`).join('\n');
  };

  async function processFile(file, options = {}) {
    const { isFolderMode = false, relativePath = '', folderName = '' } = options;
    const isImage = Boolean(file.type && file.type.startsWith('image/'));
    const ext = (file.name && file.name.includes('.')) ? file.name.split('.').pop().toLowerCase() : '';
    const isPdf = file.type === 'application/pdf' || ext === 'pdf';

    if (isImage && file.size > MAX_IMAGE_BYTES) {
      if (!isFolderMode && typeof window.showToast === 'function') {
        window.showToast(`"${file.name}" exceeds the 12MB image limit.`, 'warning');
      }
      return { skipped: 'size' };
    }

    if (isPdf) {
      if (isFolderMode) return { skipped: 'binary' };
      if (file.size > MAX_PDF_BYTES) {
        if (typeof window.showToast === 'function') {
          window.showToast(`"${file.name}" exceeds the 10MB PDF limit.`, 'warning');
        }
        return { skipped: 'size' };
      }
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = String(e.target.result || '');
          resolve({
            attachment: {
              name: file.name,
              relativePath: relativePath || file.name,
              folderName: folderName || '',
              size: file.size,
              type: 'application/pdf',
              isImage: false,
              isPdf: true,
              base64: dataUrl.split(',')[1] || '',
              mimeType: 'application/pdf'
            }
          });
        };
        reader.onerror = () => resolve({ skipped: 'read' });
        reader.readAsDataURL(file);
      });
    }

    if (!isImage && BINARY_EXTENSIONS.has(ext)) {
      if (!isFolderMode && typeof window.showToast === 'function') {
        window.showToast(`Binary file "${file.name}" cannot be analyzed as plain text.`, 'warning');
      }
      return { skipped: 'binary' };
    }

    if (!isImage && isFolderMode && file.size > MAX_SINGLE_TEXT_FILE_BYTES) {
      return { skipped: 'size' };
    }

    if (!isImage && !isFolderMode && file.size > MAX_IMAGE_BYTES) {
      if (typeof window.showToast === 'function') {
        window.showToast(`"${file.name}" exceeds the 12MB attachment limit.`, 'warning');
      }
      return { skipped: 'size' };
    }

    if (isImage) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          resolve({
            attachment: {
              name: file.name,
              relativePath: relativePath || file.name,
              folderName: folderName || '',
              size: file.size,
              type: file.type,
              isImage: true,
              preview: dataUrl,
              base64: dataUrl.split(',')[1] || '',
              mimeType: file.type
            }
          });
        };
        reader.onerror = () => resolve({ skipped: 'read' });
        reader.readAsDataURL(file);
      });
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = String(e.target.result || '');
        // Heuristic check for accidental binary payload (null bytes)
        if (content.includes('\u0000')) {
          resolve({ skipped: 'binary' });
          return;
        }
        resolve({
          attachment: {
            name: file.name,
            relativePath: relativePath || file.name,
            folderName: folderName || '',
            size: file.size,
            type: file.type || 'text/plain',
            isImage: false,
            content
          }
        });
      };
      reader.onerror = () => {
        if (!isFolderMode && typeof window.showToast === 'function') {
          window.showToast(`Could not read file "${file.name}".`, 'error');
        }
        resolve({ skipped: 'read' });
      };
      reader.readAsText(file);
    });
  }

  window.handleFolderFilesSelection = async function(files) {
    if (!files || files.length === 0) return;

    const fileArr = Array.from(files);
    let loadedCount = 0;
    let skippedIgnoredOrBinary = 0;
    let skippedBudget = 0;
    let currentFolderTextChars = window.activeAttachments
      .filter(a => !a.isImage)
      .reduce((sum, a) => sum + (a.content ? a.content.length : 0), 0);

    let rootFolderName = '';

    for (const file of fileArr) {
      const relPath = normalizeRelativePath(file);
      const topSegment = relPath.includes('/') ? relPath.split('/')[0] : 'Uploaded Folder';
      if (!rootFolderName) rootFolderName = topSegment;

      if (!isReadableFolderFile(file, relPath)) {
        skippedIgnoredOrBinary++;
        continue;
      }

      if (loadedCount >= MAX_FOLDER_FILES) {
        skippedBudget++;
        continue;
      }

      const res = await processFile(file, {
        isFolderMode: true,
        relativePath: relPath,
        folderName: topSegment
      });

      if (!res || !res.attachment) {
        if (res && res.skipped === 'size') skippedBudget++;
        else skippedIgnoredOrBinary++;
        continue;
      }

      const att = res.attachment;
      if (!att.isImage) {
        if (currentFolderTextChars + att.content.length > MAX_FOLDER_TEXT_CHARS) {
          skippedBudget++;
          continue;
        }
        currentFolderTextChars += att.content.length;
      }

      window.activeAttachments.push(att);
      loadedCount++;
    }

    renderAttachmentTray();

    if (typeof window.showToast === 'function') {
      if (loadedCount === 0) {
        window.showToast(`No readable source/text files found in "${rootFolderName || 'folder'}".`, 'warning');
      } else {
        const notes = [];
        if (skippedIgnoredOrBinary > 0) notes.push(`${skippedIgnoredOrBinary} ignored/binary skipped`);
        if (skippedBudget > 0) notes.push(`${skippedBudget} over ${MAX_FOLDER_FILES}-file/150KB cap`);
        const suffix = notes.length > 0 ? ` (${notes.join(', ')})` : '';
        window.showToast(`Loaded ${loadedCount} file${loadedCount !== 1 ? 's' : ''} from "${rootFolderName}/"${suffix}.`, 'success');
      }
    }
  };

  window.handleFilesSelection = async function(files) {
    if (!files || files.length === 0) return;

    const fileArr = Array.from(files);
    const hasDirectoryPaths = fileArr.some(f => {
      const rel = f._relativePath || f.webkitRelativePath || '';
      return rel.includes('/');
    });

    if (hasDirectoryPaths) {
      return window.handleFolderFilesSelection(fileArr);
    }

    const standaloneCount = () => window.activeAttachments.filter(a => !a.folderName).length;
    for (const file of fileArr) {
      if (standaloneCount() >= MAX_STANDALONE_FILES) {
        if (typeof window.showToast === 'function') {
          window.showToast(`Maximum ${MAX_STANDALONE_FILES} standalone files can be attached at once.`, 'info');
        }
        break;
      }
      const res = await processFile(file, { isFolderMode: false });
      if (res && res.attachment) {
        window.activeAttachments.push(res.attachment);
      }
    }
    renderAttachmentTray();
  };

  // Recursive Drag-and-Drop Traversal (Chrome-safe 100-entry batch reader)
  async function readAllDirectoryEntries(dirReader) {
    const entries = [];
    while (true) {
      const batch = await new Promise((resolve, reject) => dirReader.readEntries(resolve, reject));
      if (!batch || batch.length === 0) break;
      entries.push(...batch);
    }
    return entries;
  }

  async function traverseEntry(entry, pathPrefix = '') {
    if (!entry) return [];
    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => entry.file(resolve, reject));
      const cleanRel = (entry.fullPath || (pathPrefix + entry.name)).replace(/^\/+/, '');
      file._relativePath = cleanRel;
      return [file];
    }
    if (entry.isDirectory) {
      if (IGNORED_DIR_SEGMENTS.has((entry.name || '').toLowerCase())) {
        return [];
      }
      const dirReader = entry.createReader();
      const children = await readAllDirectoryEntries(dirReader);
      const nested = [];
      for (const child of children) {
        const childFiles = await traverseEntry(child, `${pathPrefix}${entry.name}/`);
        nested.push(...childFiles);
      }
      return nested;
    }
    return [];
  }

  async function collectFilesFromDataTransfer(dataTransfer) {
    if (!dataTransfer) return { files: [], hasDirectory: false };

    if (dataTransfer.items && dataTransfer.items.length > 0) {
      const entries = [];
      let hasDirectory = false;

      for (let i = 0; i < dataTransfer.items.length; i++) {
        const item = dataTransfer.items[i];
        if (typeof item.webkitGetAsEntry === 'function') {
          const entry = item.webkitGetAsEntry();
          if (entry) {
            if (entry.isDirectory) hasDirectory = true;
            entries.push(entry);
          }
        }
      }

      if (entries.length > 0 && hasDirectory) {
        const allFiles = [];
        for (const entry of entries) {
          const collected = await traverseEntry(entry);
          allFiles.push(...collected);
        }
        return { files: allFiles, hasDirectory: true };
      }
    }

    return {
      files: dataTransfer.files ? Array.from(dataTransfer.files) : [],
      hasDirectory: false
    };
  }

  // Setup Unified Attachment Menu Popover & Drag-and-Drop
  function initAttachmentControls() {
    const dropZone = document.getElementById('composerDropZone') || document.body;

    ['dragenter', 'dragover'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropZone && dropZone.classList) dropZone.classList.add('drop-active');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropZone && dropZone.classList) dropZone.classList.remove('drop-active');
      }, false);
    });

    window.addEventListener('drop', async (e) => {
      const { files, hasDirectory } = await collectFilesFromDataTransfer(e.dataTransfer);
      if (files && files.length > 0) {
        if (hasDirectory) {
          await window.handleFolderFilesSelection(files);
        } else {
          await window.handleFilesSelection(files);
        }
      }
    });

    const attachBtn = document.getElementById('attachBtn');
    const menuWrapper = document.getElementById('attachMenuWrapper');
    const menuPopover = document.getElementById('attachMenuPopover');
    const filesOption = document.getElementById('attachFilesOption');
    const folderOption = document.getElementById('attachFolderOption');
    const fileInput = document.getElementById('fileAttachmentInput');
    const folderInput = document.getElementById('folderAttachmentInput');

    function closeAttachMenu() {
      if (menuPopover) menuPopover.classList.add('hidden');
      if (attachBtn) attachBtn.setAttribute('aria-expanded', 'false');
    }

    function toggleAttachMenu() {
      if (!menuPopover) return;
      const isHidden = menuPopover.classList.contains('hidden');
      menuPopover.classList.toggle('hidden', !isHidden);
      if (attachBtn) attachBtn.setAttribute('aria-expanded', String(isHidden));
    }

    if (attachBtn && menuPopover) {
      attachBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAttachMenu();
      });
    } else if (attachBtn && fileInput) {
      attachBtn.addEventListener('click', () => fileInput.click());
    }

    if (filesOption && fileInput) {
      filesOption.addEventListener('click', () => {
        closeAttachMenu();
        fileInput.click();
      });
    }

    if (folderOption && folderInput) {
      folderOption.addEventListener('click', () => {
        closeAttachMenu();
        folderInput.click();
      });
    }

    document.addEventListener('click', (e) => {
      if (menuWrapper && menuPopover && !menuPopover.classList.contains('hidden') && !menuWrapper.contains(e.target)) {
        closeAttachMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuPopover && !menuPopover.classList.contains('hidden')) {
        closeAttachMenu();
      }
    });

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const picked = Array.from(e.target.files);
          e.target.value = '';
          window.handleFilesSelection(picked);
        }
      });
    }

    if (folderInput) {
      folderInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const picked = Array.from(e.target.files);
          e.target.value = '';
          window.handleFolderFilesSelection(picked);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAttachmentControls);
  } else {
    initAttachmentControls();
  }

})(window);
