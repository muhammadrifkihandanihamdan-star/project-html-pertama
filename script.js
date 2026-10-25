
/* ==========================================
   COSMIC PORTFOLIO — SCRIPT.JS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- 1. GENERATE BINTANG ----------
  const starsContainer = document.getElementById("stars");

  if (starsContainer) {
    const totalStars = 120;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalStars; i++) {
      const star = document.createElement("span");
      const size = Math.random() * 2.5 + 0.5;

      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty(
        "--duration",
        `${2 + Math.random() * 4}s`
      );
      star.style.setProperty(
        "--delay",
        `${-Math.random() * 5}s`
      );

      fragment.appendChild(star);
    }

    starsContainer.appendChild(fragment);
  }

  // ---------- 2. ANIMASI MENGETIK ----------
  const typingElement = document.getElementById("typingText");

  if (typingElement) {
    const roles = [
      "Junior Developer",
      "UI/UX Designer",
      "Python Programmer",
      "Web Developer",
      "Creative Learner"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingElement.textContent =
        currentRole.substring(0, charIndex);

      let delay = deleting ? 45 : 95;

      if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }

      window.setTimeout(typeEffect, delay);
    }

    typeEffect();
  }

  // ---------- 3. TOMBOL GANTI TEMA ----------
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  function updateThemeButton() {
    const isLight = body.classList.contains("light-theme");

    if (themeToggle) {
      themeToggle.textContent = isLight ? "☾" : "☀";
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Aktifkan tema gelap" : "Aktifkan tema terang"
      );
      themeToggle.title = isLight
        ? "Aktifkan tema gelap"
        : "Aktifkan tema terang";
    }
  }

  // Pulihkan tema yang dipilih jika tersedia.
  try {
    if (localStorage.getItem("cosmic-theme") === "light") {
      body.classList.add("light-theme");
    }
  } catch (error) {
    // Website tetap berfungsi jika penyimpanan tidak tersedia.
  }

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-theme");

      const isLight = body.classList.contains("light-theme");

      try {
        localStorage.setItem(
          "cosmic-theme",
          isLight ? "light" : "dark"
        );
      } catch (error) {
        // Tema tetap berubah selama halaman dibuka.
      }

      updateThemeButton();
    });
  }

  // ---------- 4. MENU HAMBURGER ----------
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    menuToggle.textContent = "☰";
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu" : "Buka menu"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navItems.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }

  // ---------- 5. NAVBAR AKTIF SAAT SCROLL ----------
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;

            navItems.forEach((link) => {
              const isActive =
                link.getAttribute("href") === `#${currentId}`;

              link.classList.toggle("active", isActive);

              if (isActive) {
                link.setAttribute("aria-current", "location");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ---------- 6. ANIMASI ANGKA STATISTIK ----------
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateCounter(element) {
    const target = Number(element.dataset.target);

    if (!Number.isFinite(target)) return;

    const duration = 1300;
    const startTime = performance.now();

    function updateCounter(now) {
      const progress = Math.min(
        (now - startTime) / duration,
        1
      );

      // Ease-out agar angka melambat menjelang akhir.
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  if ("IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((number) => {
      statObserver.observe(number);
    });
  } else {
    statNumbers.forEach(animateCounter);
  }

  // ---------- 7. TAHUN FOOTER ----------
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ---------- 8. EFEK GERAK BINTANG SAAT MOUSE ----------
  // Efek dibatasi pada perangkat yang mendukung hover.
  const canHover = window.matchMedia("(hover: hover)").matches;

  if (canHover) {
    document.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;

      const planet = document.querySelector(".planet");

      if (planet) {
        planet.style.setProperty("--mouse-x", `${x}px`);
        planet.style.setProperty("--mouse-y", `${y}px`);
      }
    });
  }

  console.log("🚀 Cosmic Portfolio berhasil dijalankan!");
});


  // ---------- 9. FORM KONTAK ----------
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");

  if (contactForm && contactMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const address = document
        .getElementById("contactAddress").value.trim();

      const email = document
        .getElementById("contactEmail").value.trim();

      const phone = document
        .getElementById("contactPhone").value.trim();

      if (!address && !email && !phone) {
        contactMessage.textContent =
          "Silakan isi minimal satu informasi kontak.";
        return;
      }

      contactMessage.textContent =
        "Informasi berhasil diperiksa! Data ini belum dikirim ke mana pun.";
    });
  }
