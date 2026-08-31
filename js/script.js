/* =========================================================
   BIANCA LIMA ADVOCACIA FAMILIARISTA
   JavaScript principal
   ========================================================= */

/*
 * ALTERE SOMENTE ESTA VARIÁVEL PARA CONFIGURAR O WHATSAPP.
 * Use o número no formato internacional, sem espaços, parênteses
 * ou sinais. Exemplo: 5511999999999
 */
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

function toggleMenu() {
    if (!menuToggle || !mainNav) return;

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
}

function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
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
