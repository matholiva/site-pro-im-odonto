const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");
const conversionLinks = document.querySelectorAll("[data-conversion]");
const conversionForm = document.querySelector("[data-conversion-form]");

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function trackLeadConversion() {
  if (typeof gtag !== "function") {
    return;
  }

  gtag("event", "conversion", {
    send_to: "AW-18487854777/dAyCCPnblo0dELmN2e9E",
  });
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

conversionLinks.forEach((link) => {
  link.addEventListener("click", trackLeadConversion);
});

if (conversionForm) {
  conversionForm.addEventListener("submit", trackLeadConversion);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => observer.observe(item));
updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
