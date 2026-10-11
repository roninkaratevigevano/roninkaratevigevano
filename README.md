# Ronin Karate Vigevano · sito

Sito statico costruito con [Astro](https://astro.build). Animazioni con GSAP e Lenis, caratteri ospitati in locale (nessun servizio esterno caricato senza consenso).

## Comandi

```bash
npm install        # la prima volta
npm run dev        # anteprima mentre si lavora: http://localhost:4321
npm run build      # genera il sito finale nella cartella dist/
npm run preview    # prova il sito finale in locale
```

Per pubblicare basta caricare la cartella `dist/` su un qualsiasi hosting statico (Netlify, Cloudflare Pages, GitHub Pages, hosting tradizionale). Prima della pubblicazione aggiornare il dominio in `astro.config.mjs` (`site`).

## Cosa si modifica e dove

| Cosa | File |
|---|---|
| Telefoni, e-mail, indirizzo, social, staff, corsi, cinture, dōjō kun | `src/data/sito.ts` |
| Orari dei turni | `src/data/sito.ts` → `orari` |
| News e articoli | `src/content/news/*.md` |
| Immagini degli articoli e PDF | `public/media/` |
| Pagine | `src/pages/` |
| Colori e stile generale | `src/styles/global.css` |

### Aggiungere una news

Creare un file in `src/content/news/`, per esempio `esami-giugno-2026.md`: il nome del file diventa l'indirizzo (`/news/esami-giugno-2026/`).

```markdown
---
title: "Esami di graduazione di giugno"
date: 2026-06-10
categorie: ["News"]          # News, Karate, Kata, Storia
estratto: "Due righe che compaiono negli elenchi."
---

Testo dell'articolo. Si può scrivere in Markdown.

<div class="yt" data-yt="ID_VIDEO_YOUTUBE"></div>
```

Le immagini vanno in `public/media/` e si inseriscono con `![descrizione](/media/nome-file.jpg)`.

## Importazione dal vecchio sito

Gli articoli sono stati importati una sola volta da WordPress con `npm run importa` (script in `scripts/`). Non va rilanciato: sovrascriverebbe le modifiche fatte ai file `.md`.

## Scelte tecniche

- **Menu mobile**: è fuori dall'header (un elemento fixed dentro un genitore con transform o blur verrebbe tagliato), blocca lo scroll della pagina, rende inerte il contenuto sotto e si chiude con Esc, con un link o allargando la finestra.
- **Privacy**: Google Maps e YouTube si caricano solo dopo il clic. Il modulo WhatsApp prepara il testo nel browser e non salva nulla.
- **Animazioni**: si disattivano se il dispositivo chiede movimento ridotto. Se gli script non partono, i contenuti compaiono comunque. L'intro con il preloader parte solo alla prima visita della sessione.
- **Telefono**: niente sezioni bloccate durante lo scroll, solo animazioni brevi; pulsante WhatsApp fisso, che si nasconde vicino al modulo e al footer.
