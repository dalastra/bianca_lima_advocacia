/* =========================================================
   BIANCA LIMA ADVOCACIA FAMILIARISTA
   JavaScript principal
   ========================================================= */

const WHATSAPP_NUMBER = "5511921315354";

const WHATSAPP_MESSAGE =
    "Olá, Bianca! Gostaria de obter informações sobre atendimento jurídico.";


/* =========================================================
   WHATSAPP
   ========================================================= */

function createWhatsAppLink() {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

function setupWhatsAppLinks() {
    const links = document.querySelectorAll(".js-whatsapp");
    const whatsappLink = createWhatsAppLink();

    links.forEach((link) => {
        link.href = whatsappLink;
    });
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const navLinks = document.querySelectorAll(".nav__link");
const mobileWhatsApp = mainNav?.querySelector(".js-whatsapp");

function openMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.add("open");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("menu-open");
}

function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
}

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        if (mainNav.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

mobileWhatsApp?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav?.classList.contains("open")) {
        closeMenu();
        menuToggle?.focus();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        closeMenu();
    }
});

/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const accordionItems = document.querySelectorAll(".accordion__item");

accordionItems.forEach((item) => {
    const question = item.querySelector(".accordion__question");

    question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        accordionItems.forEach((otherItem) => {
            otherItem.classList.remove("active");

            const otherQuestion =
                otherItem.querySelector(".accordion__question");

            otherQuestion.setAttribute("aria-expanded", "false");
        });

        if (!isActive) {
            item.classList.add("active");
            question.setAttribute("aria-expanded", "true");
        }
    });
});


/* =========================================================
   REVEAL ON SCROLL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* =========================================================
   ANO DO FOOTER
   ========================================================= */

const currentYear = document.querySelector("#currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER AO ROLAR
   ========================================================= */

const header = document.querySelector("#header");

function updateHeader() {
    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add("header--scrolled");
    } else {
        header.classList.remove("header--scrolled");
    }
}

window.addEventListener("scroll", updateHeader, {
    passive: true,
});

updateHeader();


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    setupWhatsAppLinks();
});
