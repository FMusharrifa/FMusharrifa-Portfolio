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

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close menu with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("open") && !e.target.closest(".nav")) {
    closeMenu();
  }
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a:not(.nav-contact)");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          link.style.color = link.getAttribute("href") === `#${id}` ? "var(--blue)" : "";
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));
