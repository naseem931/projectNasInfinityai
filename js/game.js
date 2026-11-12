// =========================================================================
// NasInfinity AI - Offline Arcade Runner Game Engine (Zero Gravity)
// =========================================================================

    // =========================================================================
    // 🎮 Runner (Ultra-High Frame Rate Arcade Engine)
    // =========================================================================
    const gameModal = document.getElementById('gameModal');
    const gameCanvas = document.getElementById('gameCanvas');
    const gameScoreDisplay = document.getElementById('gameScoreDisplay');
    const gameHighScoreDisplay = document.getElementById('gameHighScoreDisplay');
    const gameFpsDisplay = document.getElementById('gameFpsDisplay');
    const gameSpeedBtn = document.getElementById('gameSpeedBtn');
    const gameSpeedIcon = document.getElementById('gameSpeedIcon');
    const gameSpeedLabel = document.getElementById('gameSpeedLabel');
    const gameAudioBtn = document.getElementById('gameAudioBtn');
    const gameAudioIcon = document.getElementById('gameAudioIcon');
    const touchJumpBtn = document.getElementById('touchJumpBtn');
    const touchDuckBtn = document.getElementById('touchDuckBtn');
    const offlineBanner = document.getElementById('offlineBanner');

    // Retro Sound Synthesizer (Zero Audio Files - Web Audio API)
    class ArcadeAudio {
      constructor() {
        this.ctx = null;
        this.muted = localStorage.getItem('nasinfinity_game_muted') === 'true';
      }
      init() {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }
      toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('nasinfinity_game_muted', this.muted);
        if (gameAudioIcon) gameAudioIcon.textContent = this.muted ? '🔇' : '🔊';
        return this.muted;
      }
      playJump() {
        if (this.muted || !this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'square';
          osc.frequency.setValueAtTime(170, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(620, this.ctx.currentTime + 0.11);
          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.11);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.11);
        } catch (e) {}
      }
      playDoubleJump() {
        if (this.muted || !this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(920, this.ctx.currentTime + 0.14);
          gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.14);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.14);
        } catch (e) {}
      }
      playCollect() {
        if (this.muted || !this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.035);
            gain.gain.setValueAtTime(0.14, now + idx * 0.035);
            gain.gain.exponentialRampToValueAtTime(0.01, now + (idx + 1) * 0.035 + 0.06);
            osc.start(now + idx * 0.035);
            osc.stop(now + (idx + 1) * 0.035 + 0.06);
          });
        } catch (e) {}
      }
      playShield() {
        if (this.muted || !this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.linearRampToValueAtTime(840, now + 0.22);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.22);
        } catch (e) {}
      }
      playCrash() {
        if (this.muted || !this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.exponentialRampToValueAtTime(25, now + 0.32);
          gain.gain.setValueAtTime(0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
          osc.start(now);
          osc.stop(now + 0.32);
        } catch (e) {}
      }
    }

    const gameAudio = new ArcadeAudio();

    // High-Performance Butter-Smooth Runner Engine with Multi-Tier Speed & Live FPS
    const runner = {
      canvas: null,
      ctx: null,
      width: 800,
      height: 400,
      groundY: 330,
      groundScroll: 0,
      isRunning: false,
      isPaused: false,
      isGameOver: false,
      score: 0,
      lastScoreInt: -1,
      highScore: parseInt(localStorage.getItem('nasinfinity_runner_high') || '0', 10),
      orbsCollected: 0,
      frame: 0,
      screenShake: 0,
      lastTime: 0,
      animId: null,

      // Live Real-Time FPS Measurement
      fps: 60,
      fpsFrames: 0,
      fpsLastTime: 0,

      // High-Velocity Speed Modes
      speedModes: [
        { name: 'Normal', mult: 1.0, icon: '🏃', baseSpeed: 8.0 },
        { name: 'Turbo', mult: 1.3, icon: '⚡', baseSpeed: 10.5 },
        { name: 'Hyper', mult: 1.6, icon: '🚀', baseSpeed: 13.5 }
      ],
      speedModeIndex: 1, // Start on Turbo (1.3x) for ultra-fast, fluid arcade experience
      speed: 10.5,

      toggleSpeedMode() {
        this.speedModeIndex = (this.speedModeIndex + 1) % this.speedModes.length;
        const currentMode = this.speedModes[this.speedModeIndex];
        this.speed = currentMode.baseSpeed;
        if (gameSpeedIcon) gameSpeedIcon.textContent = currentMode.icon;
        if (gameSpeedLabel) gameSpeedLabel.textContent = currentMode.name + ' (' + currentMode.mult + 'x)';
      },

      stars: [],
      buildings: [],
      obstacles: [],
      orbs: [],
      particles: [],

      // Player Entity
      player: {
        x: 80,
        y: 284,
        w: 34,
        h: 46,
        vy: 0,
        gravity: 0.72,
        isGrounded: true,
        jumpCount: 0,
        isDucking: false,
        hasShield: false,
        runCycle: 0,
        trail: []
      },

      createBuilding(x) {
        const w = Math.floor(Math.random() * 45 + 36);
        const h = Math.floor(Math.random() * 110 + 60);
        const winColor = Math.random() > 0.5 ? '#38bdf8' : '#c084fc';
        // Pre-generate fixed window offsets relative to building to prevent flicker/vibration
        const windows = [];
        for (let wy = 10; wy < h - 12; wy += 14) {
          for (let wx = 6; wx < w - 6; wx += 10) {
            if (Math.random() > 0.35) {
              windows.push({ rx: wx, ry: wy });
            }
          }
        }
        this.buildings.push({ x, w, h, winColor, windows });
      },

      init(canvasEl) {
        this.canvas = canvasEl;
        // Low-latency desynchronized 2D canvas context
        try {
          this.ctx = canvasEl.getContext('2d', {
            alpha: false,
            desynchronized: true
          });
        } catch (e) {
          this.ctx = canvasEl.getContext('2d', { alpha: false });
        }
        if (this.ctx) {
          this.ctx.imageSmoothingEnabled = false;
        }
        this.resize();

        // Generate stars
        this.stars = [];
        for (let i = 0; i < 45; i++) {
          this.stars.push({
            x: Math.random() * this.width,
            y: Math.random() * (this.groundY - 110),
            size: Math.random() * 1.8 + 0.8,
            speed: Math.random() * 0.5 + 0.3,
            alpha: Math.random() * 0.5 + 0.4
          });
        }

        // Generate initial city skyline
        this.buildings = [];
        let curX = 0;
        while (curX < this.width + 250) {
          this.createBuilding(curX);
          const lastB = this.buildings[this.buildings.length - 1];
          curX = lastB.x + lastB.w + Math.floor(Math.random() * 16 + 8);
        }

        this.updateScoreUI(true);
        if (gameAudioIcon) {
          gameAudioIcon.textContent = gameAudio.muted ? '🔇' : '🔊';
        }
      },

      resize() {
        if (!this.canvas) return;
        this.width = 800;
        this.height = 400;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.groundY = 330;
      },

      reset() {
        this.score = 0;
        this.lastScoreInt = -1;
        this.orbsCollected = 0;
        const currentMode = this.speedModes[this.speedModeIndex];
        this.speed = currentMode.baseSpeed;
        this.frame = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.screenShake = 0;
        this.groundScroll = 0;
        this.lastTime = 0;
        this.fpsFrames = 0;
        this.fpsLastTime = performance.now();

        const p = this.player;
        p.y = this.groundY - 46;
        p.vy = 0;
        p.isGrounded = true;
        p.jumpCount = 0;
        p.isDucking = false;
        p.hasShield = false;
        p.runCycle = 0;
        p.trail = [];

        this.obstacles = [];
        this.orbs = [];
        this.particles = [];
        this.updateScoreUI(true);
      },

      updateScoreUI(force = false) {
        const curScore = Math.floor(this.score);
        if (force || curScore !== this.lastScoreInt) {
          this.lastScoreInt = curScore;
          if (gameScoreDisplay) gameScoreDisplay.textContent = curScore;
          if (gameHighScoreDisplay) gameHighScoreDisplay.textContent = this.highScore;
        }
      },

      triggerJump() {
        if (this.isGameOver) {
          this.reset();
          return;
        }
        gameAudio.init();

        const p = this.player;
        if (p.isGrounded) {
          p.vy = -13.2;
          p.isGrounded = false;
          p.jumpCount = 1;
          gameAudio.playJump();
          this.spawnJumpSparks(p.x + p.w / 2, p.y + p.h, '#38bdf8');
        } else if (p.jumpCount === 1) {
          p.vy = -11.2;
          p.jumpCount = 2;
          gameAudio.playDoubleJump();
          this.spawnJumpSparks(p.x + p.w / 2, p.y + p.h, '#c084fc');
        }
      },

      triggerDuck(active) {
        if (this.isGameOver) return;
        this.player.isDucking = active;
        // Fast-drop if holding duck in mid-air for crisp platformer responsiveness
        if (active && !this.player.isGrounded) {
          this.player.vy = Math.max(this.player.vy, 9.0);
        }
      },

      spawnJumpSparks(x, y, color) {
        for (let i = 0; i < 7; i++) {
          this.particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 1,
            size: Math.floor(Math.random() * 3 + 2),
            color: color || '#38bdf8',
            alpha: 1.0,
            decay: 0.06
          });
        }
      },

      spawnExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = Math.random() * 6 + 2;
          this.particles.push({
            x,
            y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            size: Math.floor(Math.random() * 4 + 2),
            color: Math.random() > 0.5 ? '#f43f5e' : '#fbbf24',
            alpha: 1.0,
            decay: 0.04
          });
        }
      },

      spawnObstacle() {
        const rand = Math.random();
        if (rand < 0.45) {
          // Ground spikes (Laser Spike)
          this.obstacles.push({
            type: 'spike',
            x: this.width + 20,
            y: this.groundY - 30,
            w: 26,
            h: 30
          });
        } else if (rand < 0.75) {
          // Floating Glitch Drone (Duck or jump over)
          this.obstacles.push({
            type: 'drone',
            x: this.width + 20,
            y: this.groundY - 56,
            w: 32,
            h: 22,
            floatY: 0
          });
        } else {
          // Tall firewall pillar
          this.obstacles.push({
            type: 'firewall',
            x: this.width + 20,
            y: this.groundY - 48,
            w: 20,
            h: 48
          });
        }
      },

      spawnOrb() {
        const isShield = Math.random() < 0.16;
        this.orbs.push({
          type: isShield ? 'shield' : 'crystal',
          x: this.width + 25,
          y: this.groundY - (Math.random() * 65 + 40),
          size: isShield ? 11 : 8,
          pulse: 0
        });
      },

      update(dt) {
        if (!this.isRunning || this.isPaused || this.isGameOver) return;
        this.frame++;

        // Increase score & speed smoothly
        this.score += 0.22 * dt;
        if (this.frame % 300 === 0 && this.speed < 16.0) {
          this.speed += 0.25;
        }

        // Screen shake decay (integer rounded)
        if (this.screenShake > 0.2) {
          this.screenShake *= 0.82;
        } else {
          this.screenShake = 0;
        }

        // Player physics
        const p = this.player;
        const curH = p.isDucking ? 24 : 46;

        if (!p.isGrounded) {
          p.vy += p.gravity * dt;
          p.y += p.vy * dt;

          if (p.y >= this.groundY - curH) {
            p.y = this.groundY - curH;
            p.vy = 0;
            p.isGrounded = true;
            p.jumpCount = 0;
          }
        } else {
          // Rock-solid ground anchor: zero subpixel vertical oscillation
          p.y = this.groundY - curH;
          p.vy = 0;
          p.jumpCount = 0;
          if (!p.isDucking) {
            p.runCycle += 0.32 * dt;
          }
        }

        // Trail updates
        if (this.frame % 3 === 0) {
          p.trail.unshift({ x: p.x, y: p.y, h: curH, alpha: 0.5 });
          if (p.trail.length > 5) p.trail.pop();
        }

        // Smooth parallax starfield
        const starScroll = (this.speed * 0.1) * dt;
        for (let i = 0; i < this.stars.length; i++) {
          const st = this.stars[i];
          st.x -= st.speed * starScroll;
          if (st.x < -10) {
            st.x = this.width + Math.random() * 20;
            st.y = Math.random() * (this.groundY - 110);
          }
        }

        // Smooth skyline scroll
        const bScroll = (this.speed * 0.18) * dt;
        for (let i = 0; i < this.buildings.length; i++) {
          this.buildings[i].x -= bScroll;
        }
        if (this.buildings.length > 0 && this.buildings[0].x + this.buildings[0].w < -20) {
          this.buildings.shift();
          const lastB = this.buildings[this.buildings.length - 1];
          const newX = lastB ? lastB.x + lastB.w + Math.floor(Math.random() * 16 + 8) : this.width + 10;
          this.createBuilding(newX);
        }

        // Spawn obstacles
        const minGap = Math.max(90, 160 - Math.floor(this.speed * 3.5));
        const lastObs = this.obstacles[this.obstacles.length - 1];
        if (!lastObs || (this.width - lastObs.x > minGap && Math.random() < 0.028)) {
          this.spawnObstacle();
        }

        // Spawn orbs
        if (Math.random() < 0.016) {
          this.spawnOrb();
        }

        // Update obstacles & collision
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          const obs = this.obstacles[i];
          obs.x -= this.speed * dt;

          if (obs.type === 'drone') {
            obs.floatY = Math.sin(this.frame * 0.09) * 6;
          }

          const obsY = obs.type === 'drone' ? obs.y + obs.floatY : obs.y;
          // Forgiving 3px hitbox padding for pleasant arcade feel
          const pad = 3;
          const hit = (
            p.x + pad < obs.x + obs.w - pad &&
            p.x + p.w - pad > obs.x + pad &&
            p.y + pad < obsY + obs.h - pad &&
            p.y + curH > obsY + pad
          );

          if (hit) {
            if (p.hasShield) {
              p.hasShield = false;
              gameAudio.playShield();
              this.spawnExplosion(obs.x + obs.w / 2, obsY + obs.h / 2);
              this.obstacles.splice(i, 1);
              continue;
            } else {
              this.isGameOver = true;
              this.screenShake = 10;
              gameAudio.playCrash();
              this.spawnExplosion(p.x + p.w / 2, p.y + curH / 2);

              if (this.score > this.highScore) {
                this.highScore = Math.floor(this.score);
                localStorage.setItem('nasinfinity_runner_high', this.highScore);
              }
              this.updateScoreUI(true);
              return;
            }
          }

          if (obs.x + obs.w < -30) {
            this.obstacles.splice(i, 1);
          }
        }

        // Update orbs & collect
        for (let i = this.orbs.length - 1; i >= 0; i--) {
          const orb = this.orbs[i];
          orb.x -= this.speed * dt;
          orb.pulse = Math.sin(this.frame * 0.12) * 3;

          const dist = Math.hypot((p.x + p.w / 2) - orb.x, (p.y + curH / 2) - (orb.y + orb.pulse));
          if (dist < 26) {
            if (orb.type === 'shield') {
              p.hasShield = true;
              gameAudio.playShield();
            } else {
              this.score += 50;
              this.orbsCollected++;
              gameAudio.playCollect();
            }
            this.spawnJumpSparks(orb.x, orb.y, orb.type === 'shield' ? '#2dd4bf' : '#fbbf24');
            this.orbs.splice(i, 1);
            continue;
          }

          if (orb.x < -30) {
            this.orbs.splice(i, 1);
          }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const pt = this.particles[i];
          pt.x += pt.vx * dt;
          pt.y += pt.vy * dt;
          pt.alpha -= pt.decay * dt;
          if (pt.alpha <= 0) {
            this.particles.splice(i, 1);
          }
        }

        this.updateScoreUI();
      },

      draw() {
        const ctx = this.ctx;
        ctx.save();

        // Screen shake (integer translation prevents canvas anti-aliasing blur)
        if (this.screenShake > 0.5) {
          const sx = Math.round((Math.random() - 0.5) * this.screenShake);
          const sy = Math.round((Math.random() - 0.5) * this.screenShake);
          ctx.translate(sx, sy);
        }

        // Clear Background with Deep Cyber Space Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
        bgGrad.addColorStop(0, '#04060d');
        bgGrad.addColorStop(0.7, '#080d1a');
        bgGrad.addColorStop(1, '#0e1726');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw Stars (crisp integer coordinates)
        for (let i = 0; i < this.stars.length; i++) {
          const st = this.stars[i];
          ctx.fillStyle = 'rgba(224, 231, 255, ' + st.alpha + ')';
          ctx.fillRect(Math.floor(st.x), Math.floor(st.y), st.size, st.size);
        }

        // Draw Skyline Silhouettes with Pre-Generated Fixed Windows (Zero Strobe/Flicker)
        for (let i = 0; i < this.buildings.length; i++) {
          const b = this.buildings[i];
          const bx = Math.floor(b.x);
          const by = this.groundY - b.h;

          ctx.fillStyle = '#0b1120';
          ctx.fillRect(bx, by, b.w, b.h);
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 1;
          ctx.strokeRect(bx, by, b.w, b.h);

          // Windows
          ctx.fillStyle = b.winColor;
          ctx.globalAlpha = 0.35;
          for (let w = 0; w < b.windows.length; w++) {
            const win = b.windows[w];
            ctx.fillRect(bx + win.rx, by + win.ry, 4, 6);
          }
          ctx.globalAlpha = 1.0;
        }

        // Ground Horizon Neon Rails
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, this.groundY);
        ctx.lineTo(this.width, this.groundY);
        ctx.stroke();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, this.groundY);
        ctx.lineTo(this.width, this.groundY);
        ctx.stroke();

        // Dark cyber highway asphalt
        ctx.fillStyle = '#060a12';
        ctx.fillRect(0, this.groundY + 1, this.width, this.height - this.groundY);

        // Perspective speed grid lines
        this.groundScroll = (this.groundScroll + this.speed * 0.95) % 36;
        const gOff = Math.floor(this.groundScroll);

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let gx = -gOff; gx < this.width + 40; gx += 36) {
          ctx.moveTo(gx, this.groundY);
          ctx.lineTo(gx - 26, this.height);
        }
        ctx.stroke();

        // Glowing neon dashed center line
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2;
        ctx.setLineDash([14, 14]);
        ctx.lineDashOffset = -this.groundScroll * 1.4;
        ctx.beginPath();
        ctx.moveTo(0, this.groundY + 34);
        ctx.lineTo(this.width, this.groundY + 34);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Orbs & Shields
        for (let i = 0; i < this.orbs.length; i++) {
          const orb = this.orbs[i];
          const cx = Math.floor(orb.x);
          const cy = Math.floor(orb.y + orb.pulse);

          if (orb.type === 'shield') {
            ctx.strokeStyle = 'rgba(45, 212, 191, 0.4)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(cx, cy, orb.size + 2, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#14b8a6';
            ctx.beginPath();
            ctx.arc(cx, cy, orb.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🛡️', cx, cy);
          } else {
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(cx, cy, orb.size + 1, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(cx, cy, orb.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(cx - 2, cy - 2, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw Obstacles (Clean Dual-Stroke Vector Graphics, Zero CPU Blur)
        for (let i = 0; i < this.obstacles.length; i++) {
          const obs = this.obstacles[i];
          const ox = Math.floor(obs.x);

          if (obs.type === 'spike') {
            const oy = Math.floor(obs.y);
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(ox, oy + obs.h);
            ctx.lineTo(ox + obs.w / 2, oy);
            ctx.lineTo(ox + obs.w, oy + obs.h);
            ctx.closePath();
            ctx.stroke();

            ctx.fillStyle = '#f43f5e';
            ctx.fill();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else if (obs.type === 'firewall') {
            const oy = Math.floor(obs.y);
            ctx.strokeStyle = 'rgba(251, 146, 60, 0.4)';
            ctx.lineWidth = 4;
            ctx.strokeRect(ox, oy, obs.w, obs.h);

            ctx.fillStyle = '#ea580c';
            ctx.fillRect(ox, oy, obs.w, obs.h);

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(ox + 6, oy + 4, obs.w - 12, obs.h - 8);
          } else if (obs.type === 'drone') {
            const oy = Math.floor(obs.y + obs.floatY);
            // Thrusters
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(ox - 3, oy + 6, 4, 10);
            ctx.fillRect(ox + obs.w - 1, oy + 6, 4, 10);

            // Chassis
            ctx.fillStyle = '#6b21a8';
            ctx.fillRect(ox, oy, obs.w, obs.h);
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 2;
            ctx.strokeRect(ox, oy, obs.w, obs.h);

            // Red scanner eye
            ctx.fillStyle = '#f43f5e';
            ctx.beginPath();
            ctx.arc(ox + obs.w / 2, oy + obs.h / 2, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(ox + obs.w / 2 - 1, oy + obs.h / 2 - 1, 2, 2);
          }
        }

        // Draw Player Cyber Bot
        const p = this.player;
        const px = Math.floor(p.x);
        const py = Math.floor(p.y);
        const curH = p.isDucking ? 24 : 46;

        // Ghost speed trail
        for (let t = 0; t < p.trail.length; t++) {
          const tr = p.trail[t];
          ctx.fillStyle = 'rgba(99, 102, 241, ' + (tr.alpha * 0.25) + ')';
          ctx.fillRect(Math.floor(tr.x), Math.floor(tr.y), p.w, tr.h);
        }

        if (!this.isGameOver) {
          // Shield Aura
          if (p.hasShield) {
            const pulse = Math.sin(this.frame * 0.1) * 2;
            ctx.strokeStyle = 'rgba(45, 212, 191, 0.35)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(px + p.w / 2, py + curH / 2, 30 + pulse, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = '#2dd4bf';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Bot Chassis
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(px, py, p.w, curH);
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2;
          ctx.strokeRect(px, py, p.w, curH);

          // Cyan Glowing Visor
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(px + 14, py + (p.isDucking ? 5 : 8), 16, 6);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(px + 18, py + (p.isDucking ? 6 : 9), 6, 4);

          // Arc Reactor Chest Core
          ctx.fillStyle = p.hasShield ? '#2dd4bf' : '#6366f1';
          ctx.beginPath();
          ctx.arc(px + p.w / 2, py + (p.isDucking ? 16 : 24), 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Thruster flames / Mechanical Running Legs
          if (!p.isGrounded) {
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(px + 8, py + curH, 5, 8 + Math.floor(Math.random() * 5));
            ctx.fillRect(px + p.w - 13, py + curH, 5, 8 + Math.floor(Math.random() * 5));
          } else if (!p.isDucking) {
            const swing = Math.sin(p.runCycle) * 8;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            // Left leg
            ctx.beginPath();
            ctx.moveTo(px + 8, py + curH);
            ctx.lineTo(px + 8 - swing, py + curH + 6);
            ctx.stroke();
            // Right leg
            ctx.beginPath();
            ctx.moveTo(px + p.w - 8, py + curH);
            ctx.lineTo(px + p.w - 8 + swing, py + curH + 6);
            ctx.stroke();
            ctx.lineCap = 'butt';
          }
        }

        // Draw Particles
        for (let i = 0; i < this.particles.length; i++) {
          const pt = this.particles[i];
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = Math.max(0, pt.alpha);
          ctx.fillRect(Math.floor(pt.x), Math.floor(pt.y), pt.size, pt.size);
        }
        ctx.globalAlpha = 1.0;

        // In-Game HUD (Crisp Canvas Font Rendering with Live FPS)
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 13px ui-monospace, monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('FPS: ' + this.fps + '  •  DIST: ' + Math.floor(this.score) + 'm', 16, 16);

        if (this.orbsCollected > 0) {
          ctx.fillStyle = '#fbbf24';
          ctx.fillText('💎 ' + this.orbsCollected, 215, 16);
        }

        if (p.hasShield) {
          ctx.fillStyle = '#2dd4bf';
          ctx.fillText('🛡️ SHIELD ACTIVE', 275, 16);
        }

        // Speed indicator with active mode
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 11px ui-monospace, monospace';
        ctx.textAlign = 'right';
        const mode = this.speedModes[this.speedModeIndex];
        ctx.fillText(mode.icon + ' ' + (this.speed).toFixed(1) + 'x (' + mode.name + ')', this.width - 16, 16);

        // Game Over Banner
        if (this.isGameOver) {
          ctx.fillStyle = 'rgba(5, 7, 14, 0.85)';
          ctx.fillRect(0, 0, this.width, this.height);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#f43f5e';
          ctx.font = '900 32px ui-monospace, monospace';
          ctx.fillText('SYSTEM CRASHED', this.width / 2, this.height / 2 - 36);

          ctx.fillStyle = '#e2e8f0';
          ctx.font = 'bold 15px ui-monospace, monospace';
          ctx.fillText('Score: ' + Math.floor(this.score) + 'm  •  High Score: ' + this.highScore + 'm', this.width / 2, this.height / 2 + 6);

          ctx.fillStyle = '#38bdf8';
          ctx.font = '13px sans-serif';
          ctx.fillText('PRESS SPACEBAR OR TAP TO REBOOT', this.width / 2, this.height / 2 + 42);
        }

        ctx.restore();
      },

      loop(timestamp) {
        if (!this.isRunning) return;

        if (!this.lastTime) {
          this.lastTime = timestamp;
          this.fpsLastTime = timestamp;
        }
        const elapsed = timestamp - this.lastTime;
        this.lastTime = timestamp;

        // Live Real-Time FPS Measurement
        this.fpsFrames++;
        if (timestamp - this.fpsLastTime >= 400) {
          this.fps = Math.round((this.fpsFrames * 1000) / (timestamp - this.fpsLastTime));
          this.fpsFrames = 0;
          this.fpsLastTime = timestamp;
          if (gameFpsDisplay) {
            gameFpsDisplay.textContent = this.fps;
            if (this.fps >= 90) {
              gameFpsDisplay.className = 'font-bold text-cyan-400';
            } else if (this.fps >= 55) {
              gameFpsDisplay.className = 'font-bold text-emerald-400';
            } else {
              gameFpsDisplay.className = 'font-bold text-amber-400';
            }
          }
        }

        // Normalized delta time where 1.0 represents 16.667ms (60 FPS)
        // Fluidly adapts to 60Hz, 120Hz, 144Hz, and 240Hz monitors
        const dt = Math.min(Math.max(elapsed / 16.6667, 0.1), 2.0);

        this.update(dt);
        this.draw();

        this.animId = requestAnimationFrame((ts) => this.loop(ts));
      },

      start() {
        if (!this.isRunning) {
          this.isRunning = true;
          this.reset();
          this.lastTime = 0;
          this.fpsLastTime = performance.now();
          this.animId = requestAnimationFrame((ts) => this.loop(ts));
        }
      },

      stop() {
        this.isRunning = false;
        if (this.animId) {
          cancelAnimationFrame(this.animId);
          this.animId = null;
        }
      }
    };

    window.openOfflineGameModal = function() {
      if (!gameModal) return;
      gameModal.classList.remove('hidden');
      if (!runner.canvas) {
        runner.init(gameCanvas);
      }
      runner.start();
    };

    window.closeOfflineGameModal = function() {
      if (!gameModal) return;
      gameModal.classList.add('hidden');
      runner.stop();
    };

    window.toggleGameAudio = function() {
      gameAudio.init();
      gameAudio.toggleMute();
    };

    // Keyboard handlers for arcade
    window.addEventListener('keydown', (e) => {
      if (!gameModal || gameModal.classList.contains('hidden')) return;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        runner.triggerJump();
      } else if (e.code === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        runner.triggerDuck(true);
      } else if (e.key === 'Escape') {
        closeOfflineGameModal();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (!gameModal || gameModal.classList.contains('hidden')) return;
      if (e.code === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        runner.triggerDuck(false);
      }
    });

    // Touch controls for mobile
    if (touchJumpBtn) {
      touchJumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        runner.triggerJump();
      });
      touchJumpBtn.addEventListener('click', () => {
        runner.triggerJump();
      });
    }

    if (touchDuckBtn) {
      touchDuckBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        runner.triggerDuck(true);
      });
      touchDuckBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        runner.triggerDuck(false);
      });
      touchDuckBtn.addEventListener('mousedown', () => {
        runner.triggerDuck(true);
      });
      touchDuckBtn.addEventListener('mouseup', () => {
        runner.triggerDuck(false);
      });
    }

    if (gameCanvas) {
      gameCanvas.addEventListener('click', () => {
        runner.triggerJump();
      });
      gameCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        runner.triggerJump();
      });
    }
