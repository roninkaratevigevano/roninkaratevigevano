import { getCollection, type CollectionEntry } from "astro:content";

export type Voce = CollectionEntry<"news">;

export const etichette: Record<string, string> = {
  News: "Avvisi e notizie",
  Esami: "Esami",
  Karate: "Karate",
  Kata: "Kata",
  Storia: "Storia",
};

export async function tutteLeNews() {
  return (await getCollection("news")).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Testo semplice dal corpo Markdown/HTML, per estratti automatici. */
export function testoSemplice(md: string) {
  return md
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Estratto scritto a mano oppure, se manca, le prime righe del testo. */
export function estrattoDi(voce: Voce, max = 160) {
  if (voce.data.estratto.trim()) return voce.data.estratto.trim();
  const testo = testoSemplice(voce.body ?? "");
  if (testo.length <= max) return testo;
  return testo.slice(0, testo.lastIndexOf(" ", max)).replace(/[,;:.]$/, "") + "…";
}

/** Etichetta breve mostrata negli elenchi. */
export function etichettaBreve(categorie: readonly string[]) {
  if (categorie.includes("Esami")) return "Esami";
  if (categorie.includes("News")) return "Avviso";
  return categorie.join(" e ");
}

/** Data ISO (giorno) usata per nascondere gli avvisi scaduti anche senza una nuova pubblicazione. */
export const giornoIso = (d: Date) => d.toISOString().slice(0, 10);

/** In evidenza al momento della build. Il componente Evidenza ricontrolla la scadenza nel browser. */
export function inEvidenza(voce: Voce, oggi = new Date()) {
  const { inEvidenza, evidenzaFino } = voce.data;
  if (!inEvidenza) return false;
  return !evidenzaFino || giornoIso(evidenzaFino) >= giornoIso(oggi);
}

/** Immagine per anteprime social e dati strutturati: prima la foto del post, poi la vecchia copertina. */
export function immagineDi(voce: Voce) {
  const { foto, copertina } = voce.data;
  if (foto) return foto;
  return copertina && !/logo/.test(copertina) ? copertina : undefined;
}
