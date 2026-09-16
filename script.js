const yearNode = document.querySelector("#year");
const themeToggle = document.querySelector(".theme-toggle");

const setTheme = (isDark) => {
  document.body.classList.toggle("dark-mode", isDark);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
};

let savedTheme = null;

try {
  savedTheme = window.localStorage?.getItem("theme");
} catch {
  // Theme selection still works when browser storage is unavailable.
}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

setTheme(savedTheme ? savedTheme === "dark" : prefersDark);

themeToggle?.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  setTheme(isDark);

  try {
    window.localStorage?.setItem("theme", isDark ? "dark" : "light");
  } catch {
    // Keep the selected theme for the current session without persistence.
  }
});

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
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
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  reveals.forEach((section, index) => {
    section.style.transitionDelay = `${index * 80}ms`;
    observer.observe(section);
  });
} else {
  reveals.forEach((section) => {
    section.classList.add("is-visible");
  });
}
