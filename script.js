(function () {
  "use strict";


  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sections = $$(".experience-section");
  const dots = $$(".progress-dot");
  let currentSection = 0;
  let transitioning = false;

  
  function showSection(index, focusTarget) {
    if (transitioning || index === currentSection) return;
    transitioning = true;

    const leaving = sections[currentSection];
    const entering = sections[index];
    currentSection = index;

  
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-current", i === index ? "step" : "false");
    });

    leaving.classList.remove("visible");

    setTimeout(() => {
      leaving.classList.remove("active");

      
      if (leaving.id === "birthday" && birthdayVideo && !birthdayVideo.paused) birthdayVideo.pause();

      entering.classList.add("active");
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

      
      void entering.offsetWidth;
      entering.classList.add("visible");

     
      if (index === 1 && !showSection._celebrated) {
        showSection._celebrated = true;
        launchConfetti(120);
      }
      if (index === 5 && !showSection._finalBurst) {
        showSection._finalBurst = true;
        launchConfetti(90);
        launchFloatingHearts(8);
      }

      if (focusTarget) focusTarget.focus();
      transitioning = false;
    }, prefersReducedMotion ? 0 : 480);
  }

  function goNext() { showSection(Math.min(currentSection + 1, sections.length - 1)); }
  function goBack() { showSection(Math.max(currentSection - 1, 0)); }

 
  $("#btn-open-surprise").addEventListener("click", (e) => {
    e.currentTarget.disabled = true; 
    goNext();
    setTimeout(() => { e.currentTarget.disabled = false; }, 1200);
  });
  $("#btn-to-story").addEventListener("click", goNext);
  $("#btn-to-shoot").addEventListener("click", goNext);
  $("#btn-shoot-to-letter").addEventListener("click", goNext);
  $("#btn-to-final").addEventListener("click", goNext);


  $$(".btn-back").forEach((btn) => btn.addEventListener("click", goBack));

 
  $("#btn-replay").addEventListener("click", resetExperience);
  $("#btn-letter-again").addEventListener("click", () => {
    openLetterInstantly();
    showSection(4, $("#letter-card"));
  });
  $("#btn-celebrate").addEventListener("click", () => {
    launchConfetti(140);
    launchFloatingHearts(10);
  });

  function resetExperience() {
    const envelope = $(".envelope");
    envelope.classList.remove("open");
    $("#envelope-stage").hidden = false;
    $("#letter-card").hidden = true;

   
    showSection._celebrated = false;
    showSection._finalBurst = false;

    showSection(0, $("#btn-open-surprise"));
  }

  
  const CONFETTI_COLORS = ["#D4AF70", "#E8B9C5", "#F5DCE3", "#6D2038", "#FFF9F3", "#E4C68D"];

  function launchConfetti(count) {
    if (prefersReducedMotion) return;
    const layer = $("#confetti-layer");
    const duration = 3200; 

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      const size = 6 + Math.random() * 8;
      piece.style.width = size + "px";
      piece.style.height = size * (0.5 + Math.random()) + "px";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDuration = 2200 + Math.random() * 1800 + "ms";
      piece.style.animationDelay = Math.random() * 500 + "ms";
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      layer.appendChild(piece);

    
      setTimeout(() => piece.remove(), duration + 800);
    }
  }

 
  function launchFloatingHearts(extraCount) {
    if (prefersReducedMotion) return;
    const container = $(".floating-hearts");
    const count = extraCount || 10;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = "♡";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 0.7 + Math.random() * 1.1 + "rem";
      heart.style.animationDuration = 9 + Math.random() * 9 + "s";
      heart.style.animationDelay = Math.random() * 10 + "s";
      container.appendChild(heart);
    }
  }
  launchFloatingHearts(10); 

  
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");
  const lightboxCaption = $("#lightbox-caption");
  const lightboxClose = $("#lightbox-close");
  let lastFocusedElement = null;

 
  $$(".photo-card").forEach((card) => {
    const img = $("img", card);
    if (!img) return;
    img.addEventListener("error", () => {
      const caption = card.dataset.caption || "Our next memory goes here. ♡";
      card.classList.add("placeholder");
      card.innerHTML =
        `<span class="placeholder-heart" aria-hidden="true">♡</span>` +
        `<span>Our next memory goes here. ♡</span>`;
      card.setAttribute("role", "img");
      card.setAttribute("aria-label", caption);
      card.style.cursor = "default";
    });
  });

  $$(".photo-card img").forEach((img) => {
    img.style.cursor = "pointer";
    img.setAttribute("tabindex", "0");
    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  function openLightbox(img) {
    lastFocusedElement = document.activeElement;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    const card = img.closest(".photo-card");
    lightboxCaption.textContent = card ? card.dataset.caption : "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    requestAnimationFrame(() => lightbox.classList.add("open"));
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    setTimeout(() => {
      lightbox.hidden = true;
      lightboxImg.src = "";
    }, prefersReducedMotion ? 0 : 300);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

 
  const envelope = $(".envelope");
  const envelopeStage = $("#envelope-stage");
  const letterCard = $("#letter-card");
  let letterOpening = false;

  $("#btn-open-letter").addEventListener("click", () => {
    if (letterOpening) return; 
    letterOpening = true;

    envelope.classList.add("open");

    const delay = prefersReducedMotion ? 50 : 900;
    setTimeout(() => {
      envelopeStage.hidden = true;
      letterCard.hidden = false;
      letterCard.focus(); 
      letterOpening = false;
    }, delay);
  });

  function openLetterInstantly() {
    envelope.classList.add("open");
    envelopeStage.hidden = true;
    letterCard.hidden = false;
  }

  
  const birthdayVideo = $("#birthday-video");
  const videoFrame = $("#video-frame");
  const videoMissing = $("#video-missing");

  
  birthdayVideo.addEventListener("error", () => {
    videoFrame.hidden = true;
    videoMissing.hidden = false;
  });

 
  birthdayVideo.addEventListener("play", () => {
    if (audioAvailable && !audio.paused) {
      audio.pause();
      musicToggle.setAttribute("aria-pressed", "false");
      musicLabel.textContent = "Play music";
    }
  });

  
  const musicToggle = $("#music-toggle");
  const musicLabel = $(".music-label", musicToggle);
  const audio = new Audio("assets/audio/scape-goat.mp3");
  audio.loop = true;
  let audioAvailable = false;

  
  audio.addEventListener("canplaythrough", () => {
    audioAvailable = true;
    musicToggle.hidden = false;
  }, { once: true });
  audio.addEventListener("error", () => {
    musicToggle.hidden = true; 
  });
  audio.load();

  musicToggle.addEventListener("click", () => {
    if (!audioAvailable) return;
    if (audio.paused) {
      audio.play().then(() => {
        musicToggle.setAttribute("aria-pressed", "true");
        musicLabel.textContent = "Pause music";
      }).catch(() => { /* playback blocked; leave paused */ });
    } else {
      audio.pause();
      musicToggle.setAttribute("aria-pressed", "false");
      musicLabel.textContent = "Play music";
    }
  });

  $("#current-year").textContent = new Date().getFullYear();
  sections[0].classList.add("visible");
  dots[0].classList.add("active");
})();