// =========================================================================
// NasInfinity AI v1.2.0 - Multimodal Document & Image Attachment Engine
// Enables drag-and-drop & file selection for images, PDFs & source code files
// =========================================================================

(function(window) {
  'use strict';

  window.activeAttachments = [];

  function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 B';
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
      case 'ts': return '📜';
      case 'html': return '🌐';
      case 'css': return '🎨';
      case 'json': return '📋';
      case 'csv': return '📊';
      case 'md': return '📝';
      case 'pdf': return '📕';
      case 'cpp':
      case 'c': return '⚙️';
      case 'java': return '☕';
      default: return '📄';
    }
  }

  function renderAttachmentTray() {
    const tray = document.getElementById('attachmentTray');
    if (!tray) return;

    if (window.activeAttachments.length === 0) {
      tray.classList.add('hidden');
      tray.innerHTML = '';
      return;
    }

    tray.classList.remove('hidden');
    tray.innerHTML = '';

    window.activeAttachments.forEach((att, idx) => {
      const item = document.createElement('div');
      item.className = 'flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs text-slate-200 shadow-sm animate-in fade-in duration-150';
      
      if (att.isImage && att.preview) {
        item.innerHTML = `
          <div class="h-6 w-6 rounded-md overflow-hidden bg-slate-900 shrink-0">
            <img src="${att.preview}" alt="${att.name}" class="h-full w-full object-cover">
          </div>
          <div class="flex flex-col min-w-0 max-w-[120px] sm:max-w-[160px]">
            <span class="truncate font-medium text-[11px]">${att.name}</span>
            <span class="text-[9px] text-slate-400">${formatBytes(att.size)}</span>
          </div>
          <button type="button" onclick="removeAttachment(${idx})" class="p-0.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition ml-1" title="Remove attachment">✕</button>
        `;
      } else {
        item.innerHTML = `
          <span class="text-sm shrink-0">${getFileIcon(att.name, false)}</span>
          <div class="flex flex-col min-w-0 max-w-[120px] sm:max-w-[160px]">
            <span class="truncate font-medium text-[11px]">${att.name}</span>
            <span class="text-[9px] text-slate-400">${formatBytes(att.size)}</span>
          </div>
          <button type="button" onclick="removeAttachment(${idx})" class="p-0.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition ml-1" title="Remove attachment">✕</button>
        `;
      }
      tray.appendChild(item);
    });
  }

  window.removeAttachment = function(index) {
    if (index >= 0 && index < window.activeAttachments.length) {
      window.activeAttachments.splice(index, 1);
      renderAttachmentTray();
    }
  };

  window.clearAttachments = function() {
    window.activeAttachments = [];
    renderAttachmentTray();
    const fileInput = document.getElementById('fileAttachmentInput');
    if (fileInput) fileInput.value = '';
  };

  async function processFile(file) {
    const isImage = file.type.startsWith('image/');
    const MAX_SIZE = 12 * 1024 * 1024; // 12 MB limit

    if (file.size > MAX_SIZE) {
      if (typeof window.showToast === 'function') {
        window.showToast(`"${file.name}" exceeds the 12MB attachment limit.`, 'warning');
      }
      return null;
    }

    if (isImage) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            isImage: true,
            preview: dataUrl,
            base64: dataUrl.split(',')[1] || '',
            mimeType: file.type
          });
        };
        reader.readAsDataURL(file);
      });
    } else {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type || 'text/plain',
            isImage: false,
            content: e.target.result
          });
        };
        reader.onerror = () => {
          if (typeof window.showToast === 'function') {
            window.showToast(`Could not read file "${file.name}".`, 'error');
          }
          resolve(null);
        };
        reader.readAsText(file);
      });
    }
  }

  window.handleFilesSelection = async function(files) {
    if (!files || files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
      if (window.activeAttachments.length >= 5) {
        if (typeof window.showToast === 'function') {
          window.showToast('Maximum 5 files can be attached at a time.', 'info');
        }
        break;
      }
      const processed = await processFile(files[i]);
      if (processed) {
        window.activeAttachments.push(processed);
      }
    }
    renderAttachmentTray();
  };

  // Setup Drag-and-Drop on whole document & Input Area
  function initDragAndDrop() {
    const dropZone = document.querySelector('.relative.bg-slate-900') || document.body;
    
    ['dragenter', 'dragover'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    window.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        window.handleFilesSelection(e.dataTransfer.files);
      }
    });

    const fileInput = document.getElementById('fileAttachmentInput');
    const attachBtn = document.getElementById('attachBtn');
    if (attachBtn && fileInput) {
      attachBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        if (e.target.files) {
          window.handleFilesSelection(e.target.files);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDragAndDrop);
  } else {
    initDragAndDrop();
  }

})(window);
