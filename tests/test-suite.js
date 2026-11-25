// =========================================================================
// NasInfinity AI v2.0.0 - Automated Production & Security Test Suite
// Zero-dependency test harness for backend endpoints, security & datasets
// =========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const vm = require('vm');
const assert = require('assert');

let passedTests = 0;
let failedTests = 0;

function report(testName, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

async function reportAsync(testName, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

function requestLocal(urlPath, { method = 'GET', headers = {}, body = null } = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      method,
      headers
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const rawBuffer = Buffer.concat(chunks);
        let textBody = rawBuffer.toString('utf8');
        if (res.headers['content-encoding'] === 'gzip') {
          textBody = zlib.gunzipSync(rawBuffer).toString('utf8');
        }
        resolve({ statusCode: res.statusCode, headers: res.headers, rawBuffer, body: textBody });
      });
    });
    req.on('error', reject);
    if (body !== null) req.write(body);
    req.end();
  });
}

async function runAllTests() {
  console.log('\n====================================================');
  console.log('🧪 NasInfinity AI v2.0.0 - Production Test Suite');
  console.log('====================================================\n');

  // Test 1: Codebase & Deployment Files Exist
  console.log('📦 1. Verifying Core & Deployment Files...');
  const requiredFiles = [
    'index.html',
    'style.css',
    'server.js',
    'package.json',
    'manifest.json',
    'sw.js',
    'favicon.svg',
    'robots.txt',
    'Dockerfile',
    '.dockerignore',
    '.env.example',
    'README.md',
    'js/app.js',
    'js/document-processor.js',
    'js/python-runner.js',
    'js/periodic-table.js',
    'js/game.js',
    'js/nlp.js',
    'js/coding-tutor.js',
    'js/code-writer.js',
    'js/code-generators.js',
    'js/conversational-ai.js'
  ];

  requiredFiles.forEach(f => {
    report(`File exists: ${f}`, () => {
      assert.strictEqual(fs.existsSync(path.join(__dirname, '..', f)), true, `${f} does not exist`);
    });
  });

  // Test 2: Verify PWA Manifest & App Version 2.0.0 Consistency
  console.log('\n📱 2. Verifying v2.0.0 Version Consistency & PWA Config...');
  report('manifest.json is valid JSON with v2.0.0 configuration', () => {
    const raw = fs.readFileSync(path.join(__dirname, '..', 'manifest.json'), 'utf8');
    const json = JSON.parse(raw);
    assert.strictEqual(json.short_name, 'NasInfinity AI');
    assert.strictEqual(json.version, '2.0.0');
    assert.strictEqual(json.display, 'standalone');
  });

  report('index.html contains v2.0.0 tags, favicon, and sandboxed previewIframe', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert(html.includes('<meta name="version" content="2.0.0">'), 'Version meta missing 2.0.0');
    assert(html.includes('manifest.json'), 'Manifest link missing');
    assert(html.includes('favicon.svg'), 'Favicon link missing');
    assert(html.includes('id="previewIframe" sandbox="allow-scripts allow-forms allow-modals"'), 'previewIframe missing sandbox attribute');
    assert(html.includes('js/app.js?v=2.0.0'), 'app.js missing v=2.0.0');
  });

  report('package.json specifies version 2.0.0 and Node engines', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    assert.strictEqual(pkg.version, '2.0.0');
    assert(pkg.engines && pkg.engines.node, 'Missing engines.node field');
  });

  // Test 2b: Verify Spatial Design & Frontend XSS Escaping
  console.log('\n✨ 2b. Verifying Spatial Design & Frontend XSS Escaping...');
  report('UI and docs contain no Oct 2026 / Oct \'26 branding strings', () => {
    const filesToCheck = ['index.html', 'style.css', 'README.md', path.join('js', 'app.js')];
    filesToCheck.forEach(rel => {
      const text = fs.readFileSync(path.join(__dirname, '..', rel), 'utf8');
      assert(!/Oct '26|2026 Oct|October 2026/i.test(text), `Found Oct 2026 text in ${rel}`);
    });
  });
  report('style.css defines Obsidian/Daylight tokens and has no stray </style> tag', () => {
    const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
    assert(!css.includes('</style>'), 'Stray </style> tag found in style.css');
    assert(css.includes('--bg-canvas'), 'Missing --bg-canvas CSS token');
    assert(css.includes('[data-theme="light"]'), 'Missing Daylight light-mode theme selector');
    assert(css.includes('.composer-capsule'), 'Missing floating capsule composer class');
  });

  report('js/app.js and js/document-processor.js implement escapeHtml XSS protection & unified folder upload', () => {
    const appJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
    const docJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'document-processor.js'), 'utf8');
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert(appJs.includes('function escapeHtml('), 'Missing escapeHtml in js/app.js');
    assert(appJs.includes('escapeHtml(chat.title'), 'Chat title not escaped');
    assert(appJs.includes('buildFolderTreeSummary'), 'Missing buildFolderTreeSummary integration in js/app.js');
    assert(appJs.includes('t.relativePath'), 'Missing relativePath prompt formatting in js/app.js');
    assert(docJs.includes('safeEscape(att.name)') || docJs.includes('safeEscape(displayLabel'), 'Attachment filename not escaped');
    assert(docJs.includes('readAllDirectoryEntries'), 'Missing recursive readAllDirectoryEntries');
    assert(docJs.includes('webkitGetAsEntry'), 'Missing drag-and-drop webkitGetAsEntry');
    assert(docJs.includes('node_modules'), 'Missing node_modules ignore filter');
    assert(docJs.includes('removeFolderGroup'), 'Missing removeFolderGroup');
    assert(html.includes('id="attachMenuPopover"'), 'Missing #attachMenuPopover');
    assert(html.includes('id="attachFilesOption"'), 'Missing #attachFilesOption');
    assert(html.includes('id="attachFolderOption"'), 'Missing #attachFolderOption');
    assert(html.includes('id="folderAttachmentInput" webkitdirectory'), 'Missing #folderAttachmentInput with webkitdirectory');
    assert(!html.includes('id="attachFolderBtn"'), 'Unexpected separate #attachFolderBtn present');
  });

  await reportAsync('Folder Upload Engine filters bloat dirs, preserves relative paths & builds tree', async () => {
    const docJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'document-processor.js'), 'utf8');
    const toasts = [];
    const mockWindow = {
      addEventListener: () => {},
      showToast: (msg, type) => toasts.push({ msg, type })
    };
    const mockDocument = {
      readyState: 'complete',
      getElementById: () => null,
      addEventListener: () => {}
    };
    class MockFileReader {
      readAsText(file) {
        this.result = file._mockText || '';
        if (this.onload) this.onload({ target: { result: this.result } });
      }
      readAsDataURL(file) {
        this.result = 'data:image/png;base64,AAAA';
        if (this.onload) this.onload({ target: { result: this.result } });
      }
    }
    const sandbox = {
      window: mockWindow,
      document: mockDocument,
      FileReader: MockFileReader,
      console
    };
    vm.runInNewContext(docJs, sandbox);

    const mockFiles = [
      { name: 'app.js', size: 120, type: 'text/javascript', webkitRelativePath: 'my-app/src/app.js', _mockText: 'console.log(1);' },
      { name: 'README.md', size: 80, type: 'text/markdown', webkitRelativePath: 'my-app/README.md', _mockText: '# My App' },
      { name: 'react.js', size: 500, type: 'text/javascript', webkitRelativePath: 'my-app/node_modules/react/react.js', _mockText: 'ignored' },
      { name: 'HEAD', size: 20, type: '', webkitRelativePath: 'my-app/.git/HEAD', _mockText: 'ref: refs/heads/main' },
      { name: 'app.exe', size: 4096, type: 'application/octet-stream', webkitRelativePath: 'my-app/bin/app.exe', _mockText: 'MZ\u0000' }
    ];

    await mockWindow.handleFolderFilesSelection(mockFiles);
    assert.strictEqual(mockWindow.activeAttachments.length, 2, 'Expected 2 valid files after filtering node_modules/.git/exe');
    assert.strictEqual(mockWindow.activeAttachments[0].folderName, 'my-app');
    assert.strictEqual(mockWindow.activeAttachments[0].relativePath, 'my-app/src/app.js');

    const tree = mockWindow.buildFolderTreeSummary(mockWindow.activeAttachments);
    assert(tree.includes('[Folder Structure]'), 'Tree header missing');
    assert(tree.includes('- my-app/README.md'), 'README missing from tree');
    assert(tree.includes('- my-app/src/app.js'), 'src/app.js missing from tree');
    assert(!tree.includes('node_modules'), 'node_modules leaked into tree');

    mockWindow.removeFolderGroup('my-app');
    assert.strictEqual(mockWindow.activeAttachments.length, 0, 'removeFolderGroup should clear folder files');

    // Test standalone binary rejection, PDF base64 handling, and image preview
    await mockWindow.handleFilesSelection([
      { name: 'payload.exe', size: 1024, type: 'application/octet-stream', _mockText: 'MZ' },
      { name: 'spec.pdf', size: 2048, type: 'application/pdf' },
      { name: 'photo.jpg', size: 4096, type: 'image/jpeg' }
    ]);
    assert.strictEqual(mockWindow.activeAttachments.length, 2, 'Expected PDF + Image accepted and .exe binary rejected');
    assert.strictEqual(mockWindow.activeAttachments[0].isPdf, true, 'PDF should set isPdf: true');
    assert.strictEqual(mockWindow.activeAttachments[1].isImage, true, 'Image should set isImage: true');
    assert(toasts.some(t => t.msg.includes('payload.exe') && t.type === 'warning'), 'Expected warning toast for .exe');
  });

  report('Upload pipeline supports input reset, PDF accept, rawText fallback & 160KB history budget', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const docJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'document-processor.js'), 'utf8');
    const appJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
    const convMod = require(path.join(__dirname, '..', 'js', 'conversational-ai.js'));

    assert(html.includes('.pdf'), 'Missing .pdf in #fileAttachmentInput accept');
    assert(docJs.includes("e.target.value = ''"), 'Missing input value reset on change event');
    assert(appJs.includes('buildLocalAttachmentSummary'), 'Missing buildLocalAttachmentSummary offline/multimodal helper');
    assert(appJs.includes('isCodeGenerationPrompt(rawText)'), 'Fallback should inspect rawText rather than full file payload');

    const bigHistory = [
      { role: 'user', content: 'A'.repeat(40000) },
      { role: 'assistant', content: 'Summary ok' }
    ];
    const trimmedPollinations = convMod.buildConversationMessages('follow up', bigHistory, 24000);
    const retainedGemini = convMod.buildConversationMessages('follow up', bigHistory, 160000);
    assert.strictEqual(trimmedPollinations.length, 1, '24KB cap trims 40KB first turn (and shifts orphan assistant reply)');
    assert.strictEqual(retainedGemini.length, 3, '160KB cap retains 40KB first turn across follow-ups');
  });

  report('Studio modals use valid glass classes without invalid bg-slate-850', () => {
    const tutor = fs.readFileSync(path.join(__dirname, '..', 'js', 'coding-tutor.js'), 'utf8');
    const writer = fs.readFileSync(path.join(__dirname, '..', 'js', 'code-writer.js'), 'utf8');
    assert(!tutor.includes('bg-slate-850'), 'Invalid bg-slate-850 still in coding-tutor.js');
    assert(!writer.includes('bg-slate-850'), 'Invalid bg-slate-850 still in code-writer.js');
  });

  // Test 3: Verify Periodic Table Dataset Integrity
  console.log('\n🧪 3. Verifying Periodic Table Dataset (118 Elements)...');
  report('Periodic Table contains 118 chemical elements', () => {
    const ptContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'periodic-table.js'), 'utf8');
    const matches = ptContent.match(/"num":\s*(\d+)/g);
    assert(matches && matches.length >= 118, `Expected at least 118 elements, found ${matches ? matches.length : 0}`);
    assert(ptContent.includes('Oganesson'), 'Oganesson (Element 118) missing');
    assert(ptContent.includes('Hydrogen'), 'Hydrogen (Element 1) missing');
  });

  // Test 4: HTTP Server Endpoints, Security, Compression & Healthcheck
  console.log('\n🌐 4. Verifying Production HTTP Server Endpoints & Hardening...');
  await reportAsync('GET / serves index.html with 200 OK, CSP, Security Headers & Gzip', async () => {
    const res = await requestLocal('/', { headers: { 'Accept-Encoding': 'gzip' } });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.headers['content-encoding'], 'gzip');
    assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
    assert.strictEqual(res.headers['x-frame-options'], 'SAMEORIGIN');
    assert(res.headers['content-security-policy'], 'Missing Content-Security-Policy header');
    assert(res.headers['etag'], 'Missing ETag header');
    assert(res.body.includes('NasInfinity AI'), 'index.html body missing title');
    assert(res.body.includes('v2.0.0'), 'index.html body missing v2.0.0');

    // Verify 304 Not Modified on conditional ETag request
    const cachedRes = await requestLocal('/', { headers: { 'If-None-Match': res.headers['etag'] } });
    assert.strictEqual(cachedRes.statusCode, 304);
  });

  await reportAsync('GET /api/health returns 200 OK with v2.0.0 readiness metrics', async () => {
    const res = await requestLocal('/api/health');
    assert.strictEqual(res.statusCode, 200);
    const json = JSON.parse(res.body);
    assert.strictEqual(json.status, 'ok');
    assert.strictEqual(json.version, '2.0.0');
    assert.strictEqual(typeof json.uptimeSeconds, 'number');
  });

  await reportAsync('GET /api/version?check=1 returns valid JSON with v2.0.0', async () => {
    const res = await requestLocal('/api/version?check=1');
    assert.strictEqual(res.statusCode, 200);
    const json = JSON.parse(res.body);
    assert.strictEqual(json.name, 'NasInfinity AI');
    assert.strictEqual(json.version, '2.0.0');
    assert.strictEqual(json.status, 'online');
  });

  await reportAsync('GET /favicon.svg and /robots.txt return 200 OK', async () => {
    const fav = await requestLocal('/favicon.svg');
    const rob = await requestLocal('/robots.txt');
    assert.strictEqual(fav.statusCode, 200);
    assert.strictEqual(rob.statusCode, 200);
  });

  await reportAsync('Security: Path traversal and sensitive internal files are blocked (403)', async () => {
    const blockedPaths = [
      '/..%2f..%2fpackage.json',
      '/server.js',
      '/package.json',
      '/.gitignore',
      '/.git/HEAD',
      '/tests/test-suite.js'
    ];
    for (const p of blockedPaths) {
      const res = await requestLocal(p);
      assert.strictEqual(res.statusCode, 403, `Expected 403 for ${p}, got ${res.statusCode}`);
    }
  });

  await reportAsync('POST /api/chat validates JSON and rejects empty payloads cleanly (400)', async () => {
    const badJson = await requestLocal('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{invalid-json'
    });
    assert.strictEqual(badJson.statusCode, 400);

    const emptyPayload = await requestLocal('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.strictEqual(emptyPayload.statusCode, 400);
  });

  // Summary
  console.log('\n====================================================');
  console.log(`Results: ${passedTests} Passed | ${failedTests} Failed`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAllTests();
