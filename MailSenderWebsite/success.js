// ===== success.js =====
(function() {
  'use strict';

  const countdownEl = document.getElementById('countdownText');
  const backBtn = document.getElementById('backBtn');

  // Confetti
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let confettiActive = true;
  let animationFrame;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.size = Math.random() * 6 + 3;
      this.speedY = Math.random() * 3 + 2;
      this.speedX = (Math.random() - 0.5) * 2;
      this.color = `hsl(${Math.random() * 60 + 120}, 80%, 60%)`;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 6;
      this.opacity = Math.random() * 0.8 + 0.5;
      this.wobble = Math.random() * 0.05 + 0.02;
      this.phase = Math.random() * Math.PI * 2;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.phase) * this.wobble * 2;
      this.phase += 0.02;
      this.rotation += this.rotationSpeed;
      if (this.y > height + 20) {
        this.y = -20;
        this.x = Math.random() * width;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.color = `hsl(${Math.random() * 60 + 120}, 80%, 60%)`;
      }
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
      ctx.restore();
    }
  }

  function initConfetti(count = 180) {
    particles = [];
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.y = Math.random() * height * 0.8 - height * 0.2;
      particles.push(p);
    }
  }

  function animateConfetti() {
    if (!confettiActive) {
      ctx.clearRect(0, 0, width, height);
      return;
    }
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    animationFrame = requestAnimationFrame(animateConfetti);
  }

  initConfetti(200);
  animateConfetti();

  setTimeout(() => {
    confettiActive = false;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    setTimeout(() => {
      ctx.clearRect(0, 0, width, height);
    }, 400);
  }, 4000);

  // Countdown
  let secondsLeft = 10;
  const redirectUrl = 'index.html';

  function updateCountdown() {
    countdownEl.textContent = `Redirecting to Home in ${secondsLeft} second${secondsLeft > 1 ? 's' : ''}...`;
    if (secondsLeft <= 0) {
      window.location.href = redirectUrl;
      return;
    }
    secondsLeft--;
    setTimeout(updateCountdown, 1000);
  }

  setTimeout(updateCountdown, 800);

  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = redirectUrl;
  });

  console.log('✅ Success page ready – confetti, countdown, redirect.');
})();