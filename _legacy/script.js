
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('loaded');
    });

    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
      'Développeur Full-Stack',
      'Java / Spring Boot',
      'Angular 17',
      'Python / Django',
      'PHP / MySQL'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      // Passage à la phrase suivante ou suppression
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause avant suppression
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause avant nouvelle phrase
      }

      setTimeout(typeWriter, typeSpeed);
    }

    // Démarrer l'effet typewriter après le chargement
    setTimeout(typeWriter, 1000);

    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      // Effet glassmorphism sur le header
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTop.classList.add('visible');
      } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('visible');
      }

      // Mise à jour du lien actif dans la navigation
      updateActiveNavLink();
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Délai progressif pour un effet en cascade
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Envoi en cours...';
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        const result = await response.json();

        if (response.ok && result.success) {
          formStatus.textContent = 'Message envoyé avec succès ! Je vous répondrai rapidement.';
          formStatus.className = 'form-status success';
          contactForm.reset();
        } else {
          // Affiche le vrai message d'erreur renvoyé par Web3Forms
          throw new Error(result.message || 'Erreur lors de l\'envoi');
        }
      } catch (error) {
        formStatus.textContent = 'Une erreur est survenue. Veuillez réessayer ou m\'envoyer un email directement.';
        formStatus.className = 'form-status error';
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Envoyer';
      }
    });

    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Redimensionner le canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Classe Particule
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Réapparition de l'autre côté
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialiser les particules (nombre adapté à la taille de l'écran)
    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    // Dessiner les connexions entre particules proches
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.08 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Boucle d'animation des particules
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Pause l'animation si l'onglet n'est pas visible (performance)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animateParticles();
      }
    });

    // Réinitialiser les particules au redimensionnement
    window.addEventListener('resize', () => {
      initParticles();
    });