// main.js
document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // Mobile navigation
  // =======================
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      mainNav.classList.toggle("open");
    });

    // Close nav when clicking a link (mobile)
    mainNav.addEventListener("click", (e) => {
      if (e.target.matches(".nav-link")) {
        navToggle.classList.remove("open");
        mainNav.classList.remove("open");
      }
    });
  }

  // =======================
  // Light/Dark mode toggle
  // =======================
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  const setTheme = (mode) => {
    if (mode === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
    localStorage.setItem("theme", mode);
    updateThemeToggleLabel(mode);
  };

  const updateThemeToggleLabel = (mode) => {
    if (!themeToggle) return;
    const iconSpan = themeToggle.querySelector(".theme-icon");
    if (mode === "dark") {
      themeToggle.innerHTML = '<span class="theme-icon">☀</span><span>Light</span>';
    } else {
      themeToggle.innerHTML = '<span class="theme-icon">☾</span><span>Dark</span>';
    }
  };

  // Initial theme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? "dark" : "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    });
  }

  // =======================
  // Scroll to top button
  // =======================
  const scrollBtn = document.getElementById("scrollToTop");
  const footerEl = document.querySelector(".site-footer");

  if (scrollBtn) {
    let baseBottom = null; // px value of the default bottom offset

    const updateScrollBtnPosition = () => {
      if (!baseBottom) {
        // Read the default bottom value from CSS (in px)
        baseBottom = parseFloat(getComputedStyle(scrollBtn).bottom) || 26;
      }

      // Show / hide button based on scroll
      if (window.scrollY > 250) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }

      if (!footerEl) {
        scrollBtn.style.bottom = `${baseBottom}px`;
        return;
      }

      const footerRect = footerEl.getBoundingClientRect();
      const btnRect = scrollBtn.getBoundingClientRect();
      const buttonHeight = btnRect.height;

      // Button position if we leave it at its baseBottom from CSS
      const buttonTopAtBase = window.innerHeight - baseBottom - buttonHeight;

      // If the footer is high enough that the button would overlap it,
      // move the button up so only half of its height enters the footer area.
      if (footerRect.top < buttonTopAtBase + buttonHeight / 2) {
        // Desired top so that half the button overlaps into the footer
        const desiredTop = footerRect.top - buttonHeight / 2;
        const newBottom = window.innerHeight - desiredTop - buttonHeight;

        scrollBtn.style.bottom = `${Math.max(newBottom, baseBottom)}px`;
      } else {
        // Reset to original CSS position
        scrollBtn.style.bottom = `${baseBottom}px`;
      }
    };

    window.addEventListener("scroll", updateScrollBtnPosition);
    window.addEventListener("resize", () => {
      baseBottom = null; // recalc on resize
      updateScrollBtnPosition();
    });

    updateScrollBtnPosition();

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // =======================
  // Reveal-on-scroll animation
  // =======================
  const revealEls = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show all
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // =======================
  // Portfolio tabs (sub-pages)
  // =======================
  const tabButtons = document.querySelectorAll("[data-portfolio-tab]");
  const tabSections = document.querySelectorAll("[data-portfolio-section]");

  if (tabButtons.length && tabSections.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.portfolioTab;

        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        tabSections.forEach((sec) => {
          if (sec.dataset.portfolioSection === target) {
            sec.classList.add("active");
          } else {
            sec.classList.remove("active");
          }
        });

        // Smooth scroll to top of portfolio section on small screens
        const portfolioTop = document.querySelector("#portfolioMain");
        if (portfolioTop && window.innerWidth < 768) {
          portfolioTop.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }
});