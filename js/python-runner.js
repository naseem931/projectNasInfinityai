// =========================================================================
// NasInfinity AI v2.0.0 - In-Browser Python WebAssembly Runner (Pyodide)
// Executes Python code directly in the client browser with zero server latency
// =========================================================================

(function(window) {
  'use strict';

  let pyodide = null;
  let isPyodideLoading = false;
  let pyodideLoadPromise = null;

  async function loadPyodideEngine(progressCallback) {
    if (pyodide) return pyodide;
    if (pyodideLoadPromise) return pyodideLoadPromise;

    isPyodideLoading = true;
    if (progressCallback) progressCallback('Loading Pyodide WebAssembly runtime...');

    pyodideLoadPromise = new Promise((resolve, reject) => {
      // Check if script is already present
      if (!window.loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
        script.onload = async () => {
          try {
            if (progressCallback) progressCallback('Initializing Python virtual environment...');
            pyodide = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/'
            });
            isPyodideLoading = false;
            resolve(pyodide);
          } catch (err) {
            isPyodideLoading = false;
            reject(err);
          }
        };
        script.onerror = () => {
          isPyodideLoading = false;
          reject(new Error('Failed to load Pyodide WebAssembly engine from CDN. Check your internet connection.'));
        };
        document.head.appendChild(script);
      } else {
        window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/'
        }).then(instance => {
          pyodide = instance;
          isPyodideLoading = false;
          resolve(pyodide);
        }).catch(reject);
      }
    });

    return pyodideLoadPromise;
  }

  window.runPythonSnippet = async function(code, outputElementId) {
    const outputEl = document.getElementById(outputElementId);
    if (!outputEl) return;

    outputEl.classList.remove('hidden');
    outputEl.innerHTML = `
      <div class="flex items-center gap-2 text-indigo-400 font-mono text-[11px] animate-pulse">
        <span class="h-2 w-2 rounded-full bg-indigo-400"></span>
        <span>Initializing Python WebAssembly environment...</span>
      </div>
    `;

    try {
      const py = await loadPyodideEngine((msg) => {
        outputEl.innerHTML = `<div class="text-indigo-400 font-mono text-[11px] animate-pulse">${msg}</div>`;
      });

      let stdoutText = '';
      let stderrText = '';

      py.setStdout({
        batched: (str) => {
          stdoutText += str + '\n';
        }
      });
      py.setStderr({
        batched: (str) => {
          stderrText += str + '\n';
        }
      });

      const startTime = performance.now();
      const result = await py.runPythonAsync(code);
      const duration = ((performance.now() - startTime) / 1000).toFixed(2);

      let outputHtml = '';
      if (stdoutText.trim()) {
        outputHtml += `<pre class="text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">${escapeHtml(stdoutText.trim())}</pre>`;
      }
      if (stderrText.trim()) {
        outputHtml += `<pre class="text-rose-300 font-mono text-xs whitespace-pre-wrap leading-relaxed mt-1">${escapeHtml(stderrText.trim())}</pre>`;
      }
      if (result !== undefined && result !== null && String(result) !== 'None' && !stdoutText.includes(String(result))) {
        outputHtml += `<div class="text-indigo-300 font-mono text-xs mt-1 pt-1 border-t border-slate-800">Return: <code>${escapeHtml(String(result))}</code></div>`;
      }
      if (!outputHtml) {
        outputHtml = '<div class="text-slate-400 font-mono text-xs italic">Program executed successfully (no output).</div>';
      }

      outputEl.innerHTML = `
        <div class="flex items-center justify-between text-[10px] text-slate-500 font-mono border-b border-slate-800/80 pb-1 mb-1.5">
          <span>🐍 Python 3.12 (Wasm) Output</span>
          <span>⚡ ${duration}s</span>
        </div>
        ${outputHtml}
      `;
    } catch (err) {
      outputEl.innerHTML = `
        <div class="flex items-center justify-between text-[10px] text-rose-400 font-mono border-b border-slate-800/80 pb-1 mb-1.5">
          <span>❌ Python Runtime Error</span>
        </div>
        <pre class="text-rose-400 font-mono text-xs whitespace-pre-wrap">${escapeHtml(err.message || String(err))}</pre>
      `;
    }
  };

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})(window);
