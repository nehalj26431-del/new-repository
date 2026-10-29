/**
 * ============================================================
 * NEHAL // HIGH-TECH CYBER PORTFOLIO SCRIPT ENGINE
 * Web Audio Synthesizer, Neural Particle Canvas, CLI Terminal
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // 1. WEB AUDIO API SYNTHESIZER & SOUND FX ENGINE
  // ==========================================================
  class CyberAudioEngine {
    constructor() {
      this.ctx = null;
      this.isMusicPlaying = false;
      this.isSfxEnabled = true;
      this.musicInterval = null;
      this.musicStep = 0;
      this.masterGain = null;
      this.musicGain = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.35;
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = 0.15;
        this.musicGain.connect(this.masterGain);
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Play subtle hover blip
    playHover() {
      if (!this.isSfxEnabled) return;
      this.init();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {}
    }

    // Play crisp futuristic click
    playClick() {
      if (!this.isSfxEnabled) return;
      this.init();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    }

    // Harmonic chord chime for theme switches
    playChime() {
      if (!this.isSfxEnabled) return;
      this.init();
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

          gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.4);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(this.ctx.currentTime + idx * 0.06);
          osc.stop(this.ctx.currentTime + idx * 0.06 + 0.45);
        });
      } catch (e) {}
    }

    // Terminal key click
    playKeyClick() {
      if (!this.isSfxEnabled) return;
      this.init();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(1400 + Math.random() * 400, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
      } catch (e) {}
    }

    // Ambient Cyber Synth Loop (Dorian Ambient Chords)
    toggleMusic(onStateChange) {
      this.init();
      this.isMusicPlaying = !this.isMusicPlaying;

      if (this.isMusicPlaying) {
        // Pentatonic ambient chord sequence (Frequencies in Hz)
        const sequence = [
          [293.66, 349.23, 440.00, 523.25], // Dm7
          [261.63, 329.63, 392.00, 493.88], // Cmaj7
          [220.00, 261.63, 329.63, 392.00], // Am7
          [349.23, 440.00, 523.25, 659.25]  // Fmaj7
        ];

        let chordIndex = 0;
        let noteIndex = 0;

        const playNextArp = () => {
          if (!this.isMusicPlaying) return;
          const currentChord = sequence[chordIndex];
          const freq = currentChord[noteIndex];

          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const noteGain = this.ctx.createGain();

          osc.type = noteIndex % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

          noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.7);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(this.musicGain);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.75);

          noteIndex = (noteIndex + 1) % currentChord.length;
          if (noteIndex === 0) {
            chordIndex = (chordIndex + 1) % sequence.length;
          }
        };

        playNextArp();
        this.musicInterval = setInterval(playNextArp, 280);
      } else {
        clearInterval(this.musicInterval);
      }

      if (onStateChange) {
        onStateChange(this.isMusicPlaying);
      }
    }
  }

  const audio = new CyberAudioEngine();

  // Attach Audio SFX to Buttons and Links
  const interactiveElements = document.querySelectorAll('button, .cyber-btn, .nav-item-link, .theme-pill, .cmd-pill, .holo-center-orb');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => audio.playHover());
    el.addEventListener('click', () => audio.playClick());
  });

  // Audio Toggle Button in Nav
  const audioBtn = document.getElementById('audio-controller-btn');
  const audioStatusText = document.getElementById('audio-status-text');

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      audio.toggleMusic((isPlaying) => {
        if (isPlaying) {
          audioBtn.classList.add('playing');
          if (audioStatusText) audioStatusText.textContent = 'MUSIC: ON';
        } else {
          audioBtn.classList.remove('playing');
          if (audioStatusText) audioStatusText.textContent = 'MUSIC: OFF';
        }
      });
    });
  }


  // ==========================================================
  // 2. INTERACTIVE NEURAL CONSTELLATION CANVAS
  // ==========================================================
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const mouse = { x: -1000, y: -1000, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Ripple shockwave on canvas click
    let shockwaves = [];
    window.addEventListener('click', (e) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 160,
        alpha: 0.8
      });
    });

    // Dynamic color palettes for particles
    function getParticleColors() {
      const theme = document.body.getAttribute('data-theme') || 'cyberpunk';
      switch (theme) {
        case 'quantum':
          return ['#38bdf8', '#818cf8', '#06b6d4', '#34d399'];
        case 'matrix':
          return ['#00ff87', '#60efff', '#10b981', '#a3e635'];
        case 'solar':
          return ['#ffb703', '#fb8500', '#ff0054', '#ffd166'];
        case 'cyberpunk':
        default:
          return ['#00f2fe', '#ff007f', '#7928ca', '#00ff87'];
      }
    }

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 85);

    function initParticles() {
      particles = [];
      const colors = getParticleColors();
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Render shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 4;
        sw.alpha -= 0.02;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${sw.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction / deflection
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            const alpha = (1 - dist2 / 110) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Re-assign particle colors when theme changes
    window.updateParticleColors = () => {
      const colors = getParticleColors();
      particles.forEach(p => {
        p.color = colors[Math.floor(Math.random() * colors.length)];
      });
    };
  }


  // ==========================================================
  // 3. COLOR SPECTRUM THEME PICKER
  // ==========================================================
  const themePills = document.querySelectorAll('.theme-pill');
  const savedTheme = localStorage.getItem('nehal-cyber-theme') || 'cyberpunk';
  document.body.setAttribute('data-theme', savedTheme);

  themePills.forEach(pill => {
    if (pill.getAttribute('data-theme') === savedTheme) {
      pill.classList.add('active');
    }

    pill.addEventListener('click', () => {
      const newTheme = pill.getAttribute('data-theme');
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('nehal-cyber-theme', newTheme);

      themePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      audio.playChime();
      if (window.updateParticleColors) window.updateParticleColors();
    });
  });


  // ==========================================================
  // 4. DYNAMIC TYPEWRITER HUD
  // ==========================================================
  const typewriterElement = document.getElementById('typewriter-hud');
  const phrases = [
    '1st Year B.Tech CS & AI Undergrad',
    'Insatiable Hunger for Learning New Things',
    'Passionate Coder & Creative Builder',
    'Competitive Chess Strategist & Thinker',
    'Endurance Swimmer with Relentless Focus',
    'Very Curious Mind Exploring AI Horizons'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function handleTypewriter() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 75;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 1900;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 350;
    }

    setTimeout(handleTypewriter, typeSpeed);
  }

  handleTypewriter();


  // ==========================================================
  // 5. INTERACTIVE CYBER TERMINAL (CLI)
  // ==========================================================
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');
  const cmdPills = document.querySelectorAll('.cmd-pill');

  const termCommands = {
    help: () => `AVAILABLE COMMANDS:
- about       : Dossier & academic profile of Nehal
- curiosity   : The Curiosity Engine & learning hunger
- hobbies     : Coding, Chess tactics, and Swimming
- skills      : Technical & computational arsenal
- education   : B.Tech CS & AI at Rishihood / NST
- theme [val] : Switch theme (cyberpunk, quantum, matrix, solar)
- music       : Toggle cyber synthesizer soundtrack
- contact     : Communication channels & location
- clear       : Wipe terminal log`,

    about: () => `[DOSSIER: NEHAL]
• Name          : Nehal
• Age           : 17 Years
• Program       : B.Tech Computer Science & Artificial Intelligence (CS & AI)
• Academic Year : 1st Year (Class of 2030)
• University    : Rishihood University (Newton School of Technology)
• Location      : Kota, Rajasthan, India
• Core Trait    : Intense curiosity & hunger to learn everything new.`,

    curiosity: () => `[CURIOSITY REACTOR: STATUS ACTIVE]
"Hunger for learning new things — Very Curious."
• Why it matters : Technology evolves faster than formal curricula.
• Current focus : Neural Networks, Heuristic Search, LLM APIs, and C++ Optimization.
• Mindset       : Questioning defaults, reading papers, building proofs-of-concept.`,

    hobbies: () => `[TRINITY OF PASSIONS]
1. 💻 Coding   : Crafting algorithms, clean code, building web apps and AI tools.
2. ♟️ Chess    : 5 moves ahead foresight, calculating branch variations, composure.
3. 🏊‍♂️ Swimming : Lung capacity, mental reboot, enduring rhythm lap after lap.`,

    skills: () => `[ARSENAL & PROFICIENCIES]
• Programming : Python, C++, HTML5, CSS3, JavaScript
• CS / AI     : Data Structures & Algorithms, Machine Learning Foundations
• Tools       : Git, GitHub, VS Code, Linux/Bash, Terminal`,

    education: () => `[ACADEMIC CREDENTIALS]
• Degree      : Bachelor of Technology (B.Tech)
• Branch      : Computer Science & Artificial Intelligence (CS & AI)
• Term        : 1st Year Undergrad (2026 - 2030)
• Institution : Newton School of Technology × Rishihood University`,

    contact: () => `[COMMUNICATION FREQUENCIES]
• Location : Kota, Rajasthan / Rishihood University Campus (Delhi NCR)
• Email    : nehaljain@example.com
• GitHub   : github.com
• LinkedIn : linkedin.com`,

    music: () => {
      if (audioBtn) audioBtn.click();
      return `Toggled cyber background audio stream.`;
    },

    clear: () => {
      if (termOutput) termOutput.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    audio.playKeyClick();

    // Print command line
    const userLine = document.createElement('div');
    userLine.className = 'term-line prompt';
    userLine.textContent = `guest@nehal-os:~$ ${rawCmd}`;
    termOutput.appendChild(userLine);

    // Handle theme argument (e.g. "theme matrix")
    if (cmd.startsWith('theme')) {
      const parts = cmd.split(' ');
      const themeArg = parts[1];
      if (['cyberpunk', 'quantum', 'matrix', 'solar'].includes(themeArg)) {
        document.body.setAttribute('data-theme', themeArg);
        localStorage.setItem('nehal-cyber-theme', themeArg);
        themePills.forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-theme') === themeArg);
        });
        audio.playChime();
        if (window.updateParticleColors) window.updateParticleColors();
        printTermOutput(`Color spectrum shifted to [${themeArg.toUpperCase()}].`);
      } else {
        printTermOutput(`Unknown theme. Choose: cyberpunk | quantum | matrix | solar`);
      }
      return;
    }

    if (termCommands[cmd]) {
      const result = termCommands[cmd]();
      if (result) printTermOutput(result);
    } else {
      printTermOutput(`Command not recognized: "${rawCmd}". Type "help" for command matrix.`);
    }

    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function printTermOutput(text) {
    const outLine = document.createElement('div');
    outLine.className = 'term-line output';
    outLine.textContent = text;
    termOutput.appendChild(outLine);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      audio.playKeyClick();
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        executeCommand(val);
      }
    });
  }

  cmdPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (termInput) termInput.value = cmd;
      executeCommand(cmd);
      if (termInput) termInput.value = '';
    });
  });


  // ==========================================================
  // 6. 3D TILT EFFECT ON CARDS
  // ==========================================================
  const tiltCards = document.querySelectorAll('.cyber-card, .holo-center-orb');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });


  // ==========================================================
  // 7. MOBILE NAVIGATION MENU
  // ==========================================================
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navLinksMenu = document.getElementById('nav-links-menu');
  const navLinks = document.querySelectorAll('.nav-item-link');

  if (navToggleBtn && navLinksMenu) {
    navToggleBtn.addEventListener('click', () => {
      navLinksMenu.classList.toggle('open');
      audio.playClick();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksMenu.classList.remove('open');
      });
    });
  }


  // ==========================================================
  // 8. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // ==========================================================
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navItem = document.querySelector(`.nav-item-link[href*="${id}"]`);
      if (navItem) {
        if (scrollPos >= top && scrollPos < top + height) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });


  // ==========================================================
  // 9. CONTACT FORM TRANSMISSION
  // ==========================================================
  const contactForm = document.getElementById('cyber-contact-form');
  const feedback = document.getElementById('transmission-feedback');

  if (contactForm && feedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      audio.playChime();

      const name = document.getElementById('sender-name').value;
      const email = document.getElementById('sender-email').value;
      const message = document.getElementById('sender-message').value;

      feedback.textContent = `[TRANSMISSION COMPILED] Dispatching signal from ${name}...`;

      const mailto = `mailto:nehaljain@example.com?subject=Transmission%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nSender: ' + name + ' (' + email + ')')}`;

      setTimeout(() => {
        window.location.href = mailto;
        feedback.textContent = `[SIGNAL DISPATCHED] Mail client launched. Thank you!`;
      }, 800);

      contactForm.reset();
    });
  }

  // Footer Year
  const yearEl = document.getElementById('cyber-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
