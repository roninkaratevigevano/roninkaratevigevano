// Importa gli articoli del vecchio sito WordPress in file Markdown per Astro.
// Uso: npm run importa   (legge ../originale/dati/posts.json, scrive src/content/news/*.md)
// Va lanciato una sola volta: dopo l'importazione le news si modificano direttamente nei file .md.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const qui = dirname(fileURLToPath(import.meta.url));
const SORGENTE = join(qui, "../../originale/dati/posts.json");
const DESTINAZIONE = join(qui, "../src/content/news");
const MEDIA = join(qui, "../public/media");

const CATEGORIE = { 103: "News", 32069: "Karate", 133657: "Kata", 22065556: "Storia" };
const SIGLE = ["CSI", "MGA", "FIJLKAM", "CONI", "DPCM", "ASD"];

const entita = { nbsp: " ", amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", hellip: "…", ndash: "–", mdash: "—", laquo: "«", raquo: "»", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”" };
function decodifica(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => entita[n.toLowerCase()] ?? m)
    .replace(/ /g, " ")
    .replace(/﻿/g, "");
}

// Titoli scritti tutti in maiuscolo diventano normali, conservando le sigle
function sistemaTitolo(t) {
  t = decodifica(t).replace(/\s+/g, " ").trim();
  const lettere = t.replace(/[^A-Za-zÀ-ÿ]/g, "");
  const maiuscole = lettere.replace(/[^A-ZÀ-Þ]/g, "");
  if (lettere.length > 4 && maiuscole.length / lettere.length > 0.8) {
    t = t.toLowerCase().replace(/^(\p{L})/u, (c) => c.toUpperCase());
  }
  for (const s of SIGLE) t = t.replace(new RegExp(`\\b${s}\\b`, "gi"), s);
  t = t.replace(/\b(posticipati)\b/i, "posticipati").replace(/graduzione/i, "graduazione");
  return t;
}

// Mappa i file media scaricati: "2017-04-heianyondan.jpg" ecc.
const mediaDisponibili = new Set(existsSync(MEDIA) ? readdirSync(MEDIA) : []);
function mediaLocale(url) {
  const m = url.match(/roninkaratevigevano\.[^/]+\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^?"#\s]+)/);
  if (!m) {
    // immagini che il vecchio sito prendeva da altri siti: scaricate come "ext-<nome>"
    const est = "ext-" + decodeURIComponent(url.split("?")[0].split("/").pop()).replace(/\s+/g, "-");
    return mediaDisponibili.has(est) ? `/media/${est}` : null;
  }
  const nome = `${m[1]}-${m[2]}-${decodeURIComponent(m[3])}`;
  return mediaDisponibili.has(nome) ? `/media/${nome}` : null;
}

function idYoutube(src) {
  const m = src.match(/(?:embed\/|watch\?v=|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function pulisci(html, slugValidi) {
  let h = html;
  // rimuove script, stili, blocchi di condivisione Jetpack
  h = h.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  h = h.replace(/<div[^>]*(sharedaddy|jp-relatedposts|wpcnt)[\s\S]*$/i, "");
  // video YouTube -> segnaposto che si carica solo al clic (niente cookie finché non serve)
  h = h.replace(/<span class="embed-youtube"[\s\S]*?<iframe[^>]*src="([^"]+)"[\s\S]*?<\/span>/gi, (_, src) => {
    const id = idYoutube(decodifica(src));
    return id ? `\n<div class="yt" data-yt="${id}"></div>\n` : "";
  });
  h = h.replace(/<iframe[^>]*src="([^"]*youtube[^"]*)"[^>]*><\/iframe>/gi, (_, src) => {
    const id = idYoutube(decodifica(src));
    return id ? `\n<div class="yt" data-yt="${id}"></div>\n` : "";
  });
  // blocchi file (PDF)
  h = h.replace(/<div class="wp-block-file">\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/div>/gi, (_, href, testo) => {
    const locale = mediaLocale(href) ?? href;
    return `\n<p><a class="file" href="${locale}" download>${decodifica(testo.replace(/<[^>]+>/g, ""))}</a></p>\n`;
  });
  // immagini: percorso locale, niente srcset/data-*
  h = h.replace(/<img\b[^>]*>/gi, (tag) => {
    const orig = (tag.match(/data-orig-file="([^"]+)"/) || tag.match(/\ssrc="([^"]+)"/) || [])[1];
    if (!orig) return "";
    const src = mediaLocale(decodifica(orig));
    if (!src) return ""; // immagine esterna non più disponibile
    const alt = decodifica((tag.match(/\salt="([^"]*)"/) || [, ""])[1]).replace(/\.(jpe?g|png|gif)$/i, "");
    const altPulito = /^(img|image|logo-karate|\d|[\w-]+_n$)/i.test(alt) ? "" : alt;
    const w = (tag.match(/data-orig-size="(\d+),(\d+)"/) || [])[1];
    const hh = (tag.match(/data-orig-size="(\d+),(\d+)"/) || [])[2];
    const dim = w && hh ? ` width="${w}" height="${hh}"` : "";
    return `<img src="${src}" alt="${altPulito.replace(/"/g, "&quot;")}"${dim} loading="lazy" decoding="async">`;
  });
  // link interni del vecchio sito
  h = h.replace(/href="https?:\/\/roninkaratevigevano\.wordpress\.com\/(\d{4})\/(\d{2})\/(\d{2})\/([^/"]+)\/?"/gi, (m, y, mo, d, slug) => {
    const s = decodeURIComponent(slug).replace(/﻿/g, "");
    return slugValidi.has(s) ? `href="/news/${s}/"` : m;
  });
  h = h.replace(/href="https?:\/\/roninkaratevigevano\.wordpress\.com\/(contatti|dove-siamo)\/?"/gi, 'href="/contatti/"');
  h = h.replace(/href="https?:\/\/roninkaratevigevano\.wordpress\.com\/le-nostre-attivita\/?"/gi, 'href="/corsi/"');
  h = h.replace(/href="https?:\/\/roninkaratevigevano\.wordpress\.com\/chi-siamo\/?"/gi, 'href="/il-dojo/"');
  h = h.replace(/href="https?:\/\/roninkaratevigevano\.wordpress\.com\/?"/gi, 'href="/"');
  h = h.replace(/href="(https?:\/\/roninkaratevigevano\.wordpress\.com\/wp-content\/uploads\/[^"]+)"/gi, (m, u) => {
    const l = mediaLocale(decodifica(u));
    return l ? `href="${l}"` : m;
  });
  // toglie attributi di presentazione e classi WordPress
  h = h.replace(/\s(style|align|class|id|data-[\w-]+|aria-describedby|target|rel)="[^"]*"/gi, (m, attr) => {
    if (/^class$/i.test(attr) && /class="(yt|file)"/.test(m)) return m;
    if (/^data-yt$/i.test(attr)) return m;
    return "";
  });
  // link esterni in nuova scheda, in modo sicuro
  h = h.replace(/<a href="(https?:\/\/[^"]+)"/gi, '<a href="$1" target="_blank" rel="noopener"');
  // span, u, font senza significato
  h = h.replace(/<\/?(span|u|font)>/gi, "");
  h = h.replace(/<span>/gi, "");
  // grassetti vuoti e paragrafi vuoti
  h = h.replace(/<(strong|b|em)>\s*(&nbsp;| )?\s*<\/\1>/gi, "");
  h = h.replace(/<p>(\s|&nbsp;| |<br\s*\/?>)*<\/p>/gi, "");
  // paragrafi non chiusi del vecchio editor
  h = h.replace(/<p>\s*(?=<p>)/gi, "");
  h = h.replace(/&nbsp;/g, " ");
  // video fuori dai paragrafi, entità tipografiche in caratteri veri
  h = h.replace(/<p>\s*(<div class="yt"[^>]*><\/div>)\s*<\/p>/gi, "$1");
  h = h.replace(/&#(\d+);/g, (m, n) => ([38, 60, 62].includes(+n) ? m : String.fromCodePoint(+n)));
  h = h.replace(/&(rsquo|lsquo|ldquo|rdquo|laquo|raquo|hellip|ndash|mdash);/g, (m, n) => entita[n]);
  // righe vuote multiple
  h = h.replace(/\n{3,}/g, "\n\n").trim();
  return h;
}

function estratto(html) {
  const t = decodifica(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
    .replace(/^Photo by [^.]+? on Pexels\.com\s*/i, "");
  if (t.length <= 170) return t;
  return t.slice(0, 170).replace(/\s+\S*$/, "") + "…";
}

const yaml = (s) => JSON.stringify(s); // le stringhe JSON sono YAML valido

const posts = JSON.parse(readFileSync(SORGENTE, "utf8"));
const slugValidi = new Set(posts.map((p) => decodeURIComponent(p.slug).replace(/﻿/g, "")));
mkdirSync(DESTINAZIONE, { recursive: true });

let n = 0;
for (const p of posts) {
  const slug = decodeURIComponent(p.slug).replace(/﻿/g, "");
  const corpo = pulisci(p.content.rendered, slugValidi);
  const copertina = (corpo.match(/<img src="(\/media\/[^"]+)"/) || [])[1];
  const categorie = p.categories.map((c) => CATEGORIE[c]).filter(Boolean);
  const fm = [
    "---",
    `title: ${yaml(sistemaTitolo(p.title.rendered))}`,
    `date: ${p.date.slice(0, 10)}`,
    `categorie: ${yaml(categorie.length ? categorie : ["News"])}`,
    `estratto: ${yaml(estratto(corpo))}`,
    copertina ? `copertina: ${yaml(copertina)}` : null,
    `video: ${/class="yt"/.test(corpo)}`,
    `originale: ${yaml(p.link)}`,
    "---",
  ].filter(Boolean).join("\n");
  writeFileSync(join(DESTINAZIONE, `${slug}.md`), `${fm}\n\n${corpo}\n`, "utf8");
  n++;
}
console.log(`Importati ${n} articoli in ${DESTINAZIONE}`);
