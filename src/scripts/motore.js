// Motore condiviso: GSAP, ScrollTrigger, SplitText e lo scroll morbido (Lenis).
// Importato da tutte le pagine: i moduli sono condivisi, quindi esiste una sola istanza.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const ridotto = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const puntatoreFine = matchMedia("(hover: hover) and (pointer: fine)").matches;

export let lenis = null;
if (!ridotto) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
window.__lenis = lenis;

export const altezzaNav = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--altezza-nav")) || 70;

export function vaiA(destinazione) {
  const el = typeof destinazione === "string" ? document.querySelector(destinazione) : destinazione;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -altezzaNav() + 1 });
  else el.scrollIntoView({ behavior: ridotto ? "auto" : "smooth" });
}

export { gsap, ScrollTrigger, SplitText };
