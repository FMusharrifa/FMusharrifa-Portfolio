/* ============================================
   Mobile Menu
   ============================================ */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("open") && !e.target.closest(".nav")) {
    closeMenu();
  }
});

/* ============================================
   Active Nav Highlight on Scroll
   ============================================ */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a:not(.nav-contact)");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((section) => observer.observe(section));

/* ============================================
   Project Modals
   ============================================ */
const modals = document.querySelectorAll(".modal");
const detailButtons = document.querySelectorAll("[data-modal]");

function openModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

detailButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.modal);
    if (target) openModal(target);
  });
});

modals.forEach((modal) => {
  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => closeModal(modal));
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("open")) closeModal(modal);
    });
  }
});
