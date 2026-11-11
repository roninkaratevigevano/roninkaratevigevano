import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

// Google Analytics 4: attivo solo se su Vercel è impostato PUBLIC_GA_ID (es. G-ABC123XYZ)
// e solo dopo il consenso alla categoria "Statistiche". Senza ID il banner non la mostra.
const GA_ID = (import.meta.env.PUBLIC_GA_ID || "").trim();
const analytics = /^G-[A-Z0-9]+$/.test(GA_ID);
let gaCaricato = false;

function aggiornaAnalytics() {
  if (!analytics) return;
  const consentito = CookieConsent.acceptedCategory("analytics");
  window[`ga-disable-${GA_ID}`] = !consentito;
  if (!consentito) {
    if (gaCaricato) window.gtag("consent", "update", { analytics_storage: "denied" });
    return;
  }
  if (gaCaricato) return window.gtag("consent", "update", { analytics_storage: "granted" });
  gaCaricato = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

// La vecchia scelta per Maps non era revocabile: non viene migrata a consenso.
try { localStorage.removeItem("ronin-mappa"); } catch { /* archivio non disponibile */ }

const mappe = [...document.querySelectorAll(".mappa[data-src]")];
const segnaposti = new Map(mappe.map((box) => [box, box.innerHTML]));
const video = [...document.querySelectorAll(".yt[data-yt]")];
const richiesti = new Set();

function preparaMappa(box) {
  box.innerHTML = segnaposti.get(box);
  box.querySelector("[data-attiva-mappa]")?.addEventListener("click", () => CookieConsent.showPreferences());
}

function caricaVideo(box) {
  if (!CookieConsent.acceptedCategory("videos") || box.querySelector("iframe")) return;
  const id = box.dataset.yt;
  if (!/^[\w-]{11}$/.test(id)) return;
  const frame = document.createElement("iframe");
  frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  frame.title = "Video YouTube";
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  box.replaceChildren(frame);
}

function preparaVideo(box) {
  const consentito = CookieConsent.acceptedCategory("videos");
  box.innerHTML = `<button type="button" class="consenso"><span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span><strong>${consentito ? "Guarda il video" : "Scegli e guarda il video"}</strong><span class="video-nota">${consentito ? "Il video si aprirà su questo sito tramite YouTube." : "YouTube è disattivato. Per guardare il video puoi autorizzare i suoi cookie nelle preferenze."}</span></button>`;
  box.querySelector("button").addEventListener("click", () => {
    if (CookieConsent.acceptedCategory("videos")) caricaVideo(box);
    else { richiesti.add(box); CookieConsent.showPreferences(); }
  });
}

function aggiornaContenuti() {
  aggiornaAnalytics();
  mappe.forEach((box) => {
    if (CookieConsent.acceptedCategory("maps")) {
      if (box.querySelector("iframe")) return;
      const frame = document.createElement("iframe");
      frame.src = box.dataset.src;
      frame.title = `Mappa: ${box.dataset.titolo || "palestra"}`;
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer";
      box.replaceChildren(frame);
    } else preparaMappa(box);
  });
  video.forEach((box) => {
    if (CookieConsent.acceptedCategory("videos")) {
      if (richiesti.has(box)) caricaVideo(box);
      else if (!box.querySelector("iframe")) preparaVideo(box);
    } else {
      richiesti.delete(box);
      preparaVideo(box);
    }
  });
}

mappe.forEach(preparaMappa);
video.forEach(preparaVideo);

CookieConsent.run({
  // Nuova versione quando si attivano le statistiche: chi aveva già scelto riceve di nuovo il banner
  revision: analytics ? 2 : 1,
  mode: "opt-in",
  hideFromBots: false,
  cookie: { name: "ronin_consensi", expiresAfterDays: 185, sameSite: "Lax" },
  guiOptions: {
    consentModal: { layout: "box", position: "bottom left", equalWeightButtons: true, flipButtons: false },
    preferencesModal: { layout: "box", equalWeightButtons: true, flipButtons: false },
  },
  categories: {
    necessary: { enabled: true, readOnly: true },
    ...(analytics ? { analytics: { enabled: false, autoClear: { cookies: [{ name: /^_ga/ }] } } } : {}),
    maps: { enabled: false },
    videos: { enabled: false },
  },
  onConsent: aggiornaContenuti,
  onChange: aggiornaContenuti,
  onModalReady: ({ modal }) => modal.setAttribute("data-lenis-prevent", ""),
  language: {
    default: "it",
    translations: {
      it: {
        consentModal: {
          title: "Cookie: scegli tu",
          description: analytics
            ? 'Usiamo strumenti tecnici per il sito. Con il tuo consenso usiamo anche Google Analytics per contare le visite in forma aggregata. Google Maps e YouTube restano disattivati finché non li autorizzi. Nessun pixel pubblicitario. Puoi rifiutare o scegliere i singoli servizi. <a href="/cookie-policy/">Cookie policy</a> · <a href="/privacy/">Privacy policy</a>.'
            : 'Usiamo strumenti tecnici per il sito. Google Maps e YouTube restano disattivati finché non li autorizzi e possono usare cookie di terze parti. Nessuna statistica o pixel pubblicitario è installato dal sito. Puoi rifiutare o scegliere i singoli servizi. <a href="/cookie-policy/">Cookie policy</a> · <a href="/privacy/">Privacy policy</a>.',
          acceptAllBtn: "Accetta tutti",
          acceptNecessaryBtn: "Rifiuta",
          showPreferencesBtn: "Personalizza",
          closeIconLabel: "Rifiuta e chiudi",
        },
        preferencesModal: {
          title: "Preferenze cookie",
          acceptAllBtn: "Accetta tutti",
          acceptNecessaryBtn: "Rifiuta tutti",
          savePreferencesBtn: "Salva le scelte",
          closeIconLabel: "Chiudi preferenze",
          sections: [
            { title: "La tua scelta, in ogni momento", description: 'Puoi usare il sito e contattarci anche rifiutando i servizi facoltativi. Per modificare o revocare il consenso usa il link “Preferenze cookie” nel footer. La scelta dura 185 giorni.' },
            { title: "Strumenti tecnici", description: "Il cookie ronin_consensi ricorda le preferenze per 185 giorni. La memoria di sessione ronin-intro evita di ripetere l'introduzione animata. Non vengono usati per profilarti.", linkedCategory: "necessary" },
            ...(analytics ? [{ title: "Statistiche (Google Analytics)", description: 'Ci aiuta a capire quante persone visitano il sito e quali pagine leggono, in forma aggregata. Google Analytics usa i cookie _ga e _ga_* (fino a 13 mesi). Segnali pubblicitari e personalizzazione degli annunci sono disattivati. <a href="https://policies.google.com/technologies/partner-sites?hl=it" target="_blank" rel="noopener noreferrer">Come Google usa i dati</a>.', linkedCategory: "analytics" }] : []),
            { title: "Google Maps", description: 'Permette di caricare le mappe integrate di Google, che riceve dati di navigazione e può usare cookie propri. Senza consenso resta disponibile il link alle indicazioni. <a href="https://policies.google.com/privacy?hl=it" target="_blank" rel="noopener noreferrer">Privacy di Google</a>.', linkedCategory: "maps" },
            { title: "Video YouTube", description: 'Permette di riprodurre, quando li selezioni, i video integrati di YouTube in modalità privacy avanzata. Google può usare cookie e altri identificatori durante la riproduzione. <a href="https://policies.google.com/technologies/cookies?hl=it" target="_blank" rel="noopener noreferrer">Cookie di Google</a>.', linkedCategory: "videos" },
            { title: "Maggiori informazioni", description: '<a href="/privacy/">Privacy policy</a> · <a href="/cookie-policy/">Cookie policy</a>. La revoca rimuove mappe e video dalla pagina, interrompe le statistiche e ne impedisce i nuovi caricamenti. Per eliminare cookie già impostati su domini di terzi usa le impostazioni del browser.' },
          ],
        },
      },
    },
  },
});
