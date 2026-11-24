// =========================================================================
// NasInfinity AI v1.2.0 - Automated Test Suite
// Zero-dependency test harness for backend endpoints, security & datasets
// =========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
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

function fetchLocal(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runAllTests() {
  console.log('\n====================================================');
  console.log('🧪 NasInfinity AI v1.2.0 - Automated Test Suite');
  console.log('====================================================\n');

  // Test 1: Codebase Files Exist
  console.log('📦 1. Verifying Core Architecture Files...');
  const requiredFiles = [
    'index.html',
    'style.css',
    'server.js',
    'package.json',
    'manifest.json',
    'sw.js',
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

  // Test 2: Verify PWA Manifest & App Version Consistency
  console.log('\n📱 2. Verifying PWA Manifest & Version Consistency...');
  report('manifest.json is valid JSON with v1.2.0 configuration', () => {
    const raw = fs.readFileSync(path.join(__dirname, '..', 'manifest.json'), 'utf8');
    const json = JSON.parse(raw);
    assert.strictEqual(json.short_name, 'NasInfinity AI');
    assert.strictEqual(json.version, '1.2.0');
    assert.strictEqual(json.display, 'standalone');
  });

  report('index.html contains v1.2.0 meta and link tags', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert(html.includes('<meta name="version" content="1.2.0">'), 'Version meta missing');
    assert(html.includes('manifest.json'), 'Manifest link missing');
    assert(html.includes('js/document-processor.js'), 'document-processor.js not included');
    assert(html.includes('js/python-runner.js'), 'python-runner.js not included');
    assert(html.includes('js/app.js'), 'app.js not included');
  });

  report('package.json specifies version 1.2.0', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    assert.strictEqual(pkg.version, '1.2.0');
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

  // Test 4: HTTP Server Endpoints & Security Headers
  console.log('\n🌐 4. Verifying Local HTTP Server Endpoints...');
  try {
    await reportAsync('GET / serves index.html with 200 OK & Security Headers', async () => {
      const res = await fetchLocal('/');
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
      assert.strictEqual(res.headers['x-frame-options'], 'SAMEORIGIN');
      assert(res.body.includes('NasInfinity AI'), 'index.html body missing title');
      assert(res.body.includes('v1.2.0'), 'index.html body missing v1.2.0');
    });

    await reportAsync('GET /manifest.json returns valid JSON', async () => {
      const res = await fetchLocal('/manifest.json');
      assert.strictEqual(res.statusCode, 200);
      const manifest = JSON.parse(res.body);
      assert.strictEqual(manifest.version, '1.2.0');
    });

    await reportAsync('GET /api/version returns valid JSON with status online', async () => {
      const res = await fetchLocal('/api/version');
      assert.strictEqual(res.statusCode, 200);
      const json = JSON.parse(res.body);
      assert.strictEqual(json.name, 'NasInfinity AI');
      assert.strictEqual(json.status, 'online');
    });

    await reportAsync('Security: Path traversal attempts are blocked', async () => {
      const res = await fetchLocal('/..%2f..%2fpackage.json');
      assert(res.statusCode === 403 || res.statusCode === 404, `Expected 403 or 404, got ${res.statusCode}`);
    });
  } catch (netErr) {
    console.warn('  ⚠️ Server connectivity note:', netErr.message);
  }

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
