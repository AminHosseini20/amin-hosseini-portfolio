const CONFIG = {
  logo: "assets/images/amin-logo.png",
  avatar: "assets/images/amin-portrait.jpg",
  photo: "assets/images/amin-team.jpg",
  video: "[PERSONAL_VIDEO]",
  videoPoster: "assets/images/amin-video-thumbnail.jpg",
};

function isAsset(value) {
  return value && !value.startsWith("[");
}

// When a real asset URL/path is supplied, it gracefully replaces the art direction fallback.
if (isAsset(CONFIG.logo)) {
  document.querySelectorAll("[data-logo]").forEach((logo) => {
    logo.style.background = `center / 155% auto no-repeat url("${CONFIG.logo}")`;
    logo.textContent = "";
  });
}
if (isAsset(CONFIG.avatar)) {
  const avatar = document.querySelector("[data-avatar]");
  avatar.style.background = `center / cover no-repeat url("${CONFIG.avatar}")`;
  avatar
    .querySelectorAll(":scope > *")
    .forEach((part) => (part.style.display = "none"));
}
if (isAsset(CONFIG.photo)) {
  const photo = document.querySelector("[data-photo]");
  photo.style.background = `center / cover no-repeat url("${CONFIG.photo}")`;
  photo
    .querySelectorAll(":scope > *")
    .forEach((part) => (part.style.display = "none"));
}
if (isAsset(CONFIG.videoPoster)) {
  document.querySelector("[data-video]").style.background =
    `center / cover no-repeat url("${CONFIG.videoPoster}")`;
}

window.addEventListener("load", () => {
  window.setTimeout(
    () => document.querySelector("#loader").classList.add("done"),
    1550,
  );
});

const header = document.querySelector(".site-header");
window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 15),
  { passive: true },
);

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});
document.querySelectorAll(".nav-links a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }),
);

const modal = document.querySelector("#connect-modal");
const openers = document.querySelectorAll(".open-modal");
const closeButton = document.querySelector(".modal-close");
let lastFocused;
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lastFocused?.focus();
}
openers.forEach((button) =>
  button.addEventListener("click", () => {
    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }),
);
closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("open")) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "Tab") {
    const focusable = [...modal.querySelectorAll("button, a[href]")];
    const first = focusable[0],
      last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

const journeyTabs = [...document.querySelectorAll("[data-journey-stage]")];
const journeyPanels = [...document.querySelectorAll(".journey-panel")];

function activateJourneyStage(stage) {
  const panelId = stage.getAttribute("aria-controls");

  journeyTabs.forEach((tab) => {
    const isActive = tab === stage;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", isActive);
    tab.tabIndex = isActive ? 0 : -1;
  });

  journeyPanels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });
}

if (journeyTabs.length) activateJourneyStage(journeyTabs[0]);

journeyTabs.forEach((stage, index) => {
  stage.addEventListener("click", () => activateJourneyStage(stage));
  stage.addEventListener("keydown", (event) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % journeyTabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + journeyTabs.length) % journeyTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = journeyTabs.length - 1;

    const nextStage = journeyTabs[nextIndex];
    activateJourneyStage(nextStage);
    nextStage.focus();
  });
});

const inquiryForm = document.querySelector("#inquiry-form");
if (inquiryForm) {
  const inquiryFields = [...inquiryForm.querySelectorAll("[required]")];
  const inquiryStatus = document.querySelector("#inquiry-status");

  function validateInquiryField(field) {
    const error = document.querySelector(`#${field.id}-error`);
    const fieldName = field.closest(".form-field").querySelector("label").childNodes[0].textContent.trim();
    let message = "";

    if (field.validity.valueMissing) message = `${fieldName} is required.`;
    if (field.validity.typeMismatch) message = "Enter a valid email address.";

    field.closest(".form-field").classList.toggle("is-invalid", Boolean(message));
    field.setAttribute("aria-invalid", Boolean(message));
    if (error) error.textContent = message;
    return !message;
  }

  inquiryFields.forEach((field) => {
    field.addEventListener("blur", () => validateInquiryField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-field").classList.contains("is-invalid")) validateInquiryField(field);
    });
  });

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = inquiryFields.map(validateInquiryField).every(Boolean);

    if (!isValid) {
      inquiryStatus.textContent = "Please review the highlighted fields.";
      inquiryForm.querySelector(".is-invalid input, .is-invalid textarea")?.focus();
      return;
    }

    inquiryStatus.textContent = "Your inquiry is ready. A delivery service has not been connected to this portfolio yet.";
  });
}

const video = document.querySelector("#intro-video");
const videoShell = document.querySelector(".about-video");
document.querySelector("#play-video").addEventListener("click", () => {
  if (CONFIG.video.startsWith("[")) {
    return;
  }
  video.src = CONFIG.video;
  videoShell.classList.add("playing");
  video.play();
});

// Replace the placeholder strings in CONFIG with actual asset paths/URLs when ready.
