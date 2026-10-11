// Comportamenti comuni a tutte le pagine
import { gsap, ScrollTrigger, SplitText, lenis, ridotto, puntatoreFine, vaiA } from "./motore.js";

const root = document.documentElement;

/* ---------- Menu mobile ---------- */
const bottone = document.querySelector(".menu-btn");
const menu = document.getElementById("menu-mobile");
const sotto = () => document.querySelectorAll("main, .footer, .wa-fisso, .nav-link");
let aperto = false;

function apriMenu() {
  aperto = true;
  root.classList.add("menu-aperto");
  bottone.setAttribute("aria-expanded", "true");
  bottone.querySelector(".testo").textContent = "Chiudi";
  menu.inert = false;
  sotto().forEach((el) => (el.inert = true));
  lenis?.stop();
  setTimeout(() => menu.querySelector("a")?.focus({ preventScroll: true }), 50);
}
function chiudiMenu({ rimettiFocus = true } = {}) {
  if (!aperto) return;
  aperto = false;
  root.classList.remove("menu-aperto");
  bottone.setAttribute("aria-expanded", "false");
  bottone.querySelector(".testo").textContent = "Menu";
  menu.inert = true;
  sotto().forEach((el) => (el.inert = false));
  lenis?.start();
  if (rimettiFocus) bottone.focus({ preventScroll: true });
}
bottone?.addEventListener("click", () => (aperto ? chiudiMenu() : apriMenu()));
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => chiudiMenu({ rimettiFocus: false })));
addEventListener("keydown", (e) => { if (e.key === "Escape") chiudiMenu(); });
// se si ruota il telefono o si allarga la finestra oltre il breakpoint, il menu si chiude
matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) chiudiMenu({ rimettiFocus: false }); });
// tornando indietro con il browser la pagina può essere ripristinata dalla cache con il menu aperto
addEventListener("pageshow", () => chiudiMenu({ rimettiFocus: false }));

/* ---------- Isola di navigazione: più compatta dopo lo scroll ---------- */
const nav = document.querySelector(".nav");
const aggiornaNav = () => nav.classList.toggle("piena", scrollY > 40);
addEventListener("scroll", aggiornaNav, { passive: true });
aggiornaNav();

/* ---------- Link alle ancore nella stessa pagina ---------- */
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href*="#"]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
  const el = document.querySelector(url.hash);
  if (!el) return;
  e.preventDefault();
  vaiA(el);
  history.replaceState(null, "", url.hash);
});
// arrivando da un'altra pagina con un'ancora, considera l'altezza della nav
if (location.hash) {
  addEventListener("load", () => { const el = document.querySelector(location.hash); if (el) setTimeout(() => vaiA(el), 60); });
}

/* ---------- Pulsante WhatsApp fisso (telefono) ---------- */
const waFisso = document.querySelector(".wa-fisso");
if (waFisso) {
  const visibili = new Set();
  const io = new IntersectionObserver((voci) => {
    voci.forEach((v) => (v.isIntersecting ? visibili.add(v.target) : visibili.delete(v.target)));
    waFisso.classList.toggle("via", visibili.size > 0);
  });
  document.querySelectorAll("[data-nascondi-wa]").forEach((el) => io.observe(el));
}

/* ---------- Video YouTube e mappa: si caricano solo al clic ---------- */
const iconaPlay = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
document.querySelectorAll(".yt[data-yt]").forEach((box) => {
  const id = box.dataset.yt;
  box.innerHTML = `<button type="button" class="consenso"><span class="play">${iconaPlay}</span><strong>Guarda il video</strong><p>Il video viene caricato da YouTube, che potrebbe usare cookie.</p></button>`;
  box.querySelector("button").addEventListener("click", () => {
    box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Video YouTube" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  }, { once: true });
});

function leggi(chiave) { try { return localStorage.getItem(chiave); } catch { return null; } }
function scrivi(chiave, valore) { try { localStorage.setItem(chiave, valore); } catch { /* archivio non disponibile */ } }
function caricaMappa(box) {
  box.innerHTML = `<iframe src="${box.dataset.src}" title="Mappa: ${box.dataset.titolo || "palestra"}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}
document.querySelectorAll(".mappa[data-src]").forEach((box) => {
  if (leggi("ronin-mappa") === "si") return caricaMappa(box);
  box.querySelector("button")?.addEventListener("click", () => {
    scrivi("ronin-mappa", "si");
    document.querySelectorAll(".mappa[data-src]").forEach(caricaMappa);
  });
});

/* ---------- Animazioni ---------- */
if (!ridotto) {
  // cursore e pulsanti magnetici solo con mouse
  if (puntatoreFine) {
    // puntatore del sito: punto rosso preciso + anello che lo segue; sostituisce quello di sistema
    const cur = document.querySelector(".cursore");
    const punto = cur.querySelector(".punto");
    const anello = cur.querySelector(".anello");
    root.classList.add("cursore-attivo");
    const px = gsap.quickSetter(punto, "x", "px"), py = gsap.quickSetter(punto, "y", "px");
    const ax = gsap.quickTo(anello, "x", { duration: 0.45, ease: "power3" }), ay = gsap.quickTo(anello, "y", { duration: 0.45, ease: "power3" });
    addEventListener("mousemove", (e) => { cur.classList.add("visibile"); px(e.clientX); py(e.clientY); ax(e.clientX); ay(e.clientY); }, { passive: true });
    // uscendo dalla finestra o entrando in una mappa/video torna quello di sistema
    document.addEventListener("mouseout", (e) => { if (!e.relatedTarget || e.relatedTarget.tagName === "IFRAME") cur.classList.remove("visibile"); });
    document.addEventListener("mouseover", (e) => {
      const t = e.target;
      cur.classList.toggle("testo", !!t.closest("input:not([type=range]),textarea,select,iframe"));
      cur.classList.toggle("su", !!t.closest("a,button,label,summary,input[type=range],.corso,[data-cursore]"));
    });
    addEventListener("mousedown", () => cur.classList.add("premuto"));
    addEventListener("mouseup", () => cur.classList.remove("premuto"));
    document.querySelectorAll(".magnete").forEach((b) => {
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: "power3" });
      });
      b.addEventListener("mouseleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,.4)" }));
    });
  }

  // elementi che salgono entrando nello schermo
  ScrollTrigger.batch("[data-rivela]", {
    start: "top 88%",
    once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.9, ease: "power3.out", overwrite: true }),
  });

  // titoli di sezione: righe che emergono da una maschera (dopo il caricamento dei font)
  document.fonts.ready.then(() => {
    document.querySelectorAll(".titolo-sez h2, [data-righe]").forEach((h) => {
      const s = SplitText.create(h, { type: "lines", mask: "lines", linesClass: "riga-titolo" });
      gsap.from(s.lines, { yPercent: 100, duration: 1, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: h, start: "top 90%" } });
    });
  });

  // intestazione delle pagine interne
  const testata = document.querySelector(".testata");
  if (testata) {
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .from(".testata .sole-piccolo", { scale: 0, duration: 1.2 })
      .from(".testata .kanji-testata", { autoAlpha: 0, y: 30, duration: 1 }, "-=.9")
      .from(".testata .briciole, .testata p.intro", { autoAlpha: 0, y: 20, duration: .8, stagger: .1 }, "-=.8");
    gsap.to(".testata .sole-piccolo", { yPercent: 30, ease: "none", scrollTrigger: { trigger: testata, start: "top top", end: "bottom top", scrub: true } });
  }
}

// Le sezioni bloccate vanno calcolate nell'ordine in cui compaiono nella pagina,
// anche se gli script dei componenti le creano in un ordine diverso
function riordina() {
  ScrollTrigger.sort((a, b) => {
    if (!a.trigger || !b.trigger || a.trigger === b.trigger) return 0;
    return a.trigger.compareDocumentPosition(b.trigger) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
  ScrollTrigger.refresh();
}
queueMicrotask(riordina);
addEventListener("load", riordina);
document.fonts.ready.then(riordina);
