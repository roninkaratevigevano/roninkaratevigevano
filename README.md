# Ronin Karate Vigevano · sito

Sito statico costruito con [Astro](https://astro.build). Animazioni con GSAP e Lenis, caratteri ospitati in locale (nessun servizio esterno caricato senza consenso).

Indirizzo Vercel: https://roninkaratevigevano.vercel.app/ (dominio aggiunto al progetto esistente `ronin-karate-vigevano`).

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
| Telefoni, e-mail, indirizzo, social, staff, corsi, dōjō kun | `src/data/sito.ts` |
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

- **Corsi**: il cercatore propone i corsi in base all'età. Preparazione esami e approfondimento kata rimangono disponibili su indicazione degli insegnanti e non vengono consigliati automaticamente a chi inizia. L'offerta attuale non include un corso agonisti o preparazione alle gare; le notizie storiche rimangono nell'archivio.
- **Menu mobile**: è fuori dall'header (un elemento fixed dentro un genitore con transform o blur verrebbe tagliato), blocca lo scroll della pagina, rende inerte il contenuto sotto e si chiude con Esc, con un link o allargando la finestra.
- **Privacy**: banner e preferenze con vanilla-cookieconsent, ospitato localmente. Maps e YouTube sono categorie distinte, disattivate per impostazione predefinita. La revoca rimuove gli iframe. Preferenze salvate per 185 giorni; nessun analytics o pixel.
- **Modulo contatti**: nome ed età obbligatori, scelta per sé/figlio/figlia, corso, domanda facoltativa (massimo 1.000 caratteri), presa visione privacy. L'anteprima è composta nel browser; WhatsApp è il canale principale, l'email un'alternativa tramite `mailto:`. Entrambi aprono una bozza, senza invio automatico. Non servono backend, servizi form o credenziali. L'email richiede un client di posta configurato. I campi non sono memorizzati in cookie/storage né pubblicati su GitHub.
- **Animazioni**: si disattivano se il dispositivo chiede movimento ridotto. Se gli script non partono, i contenuti compaiono comunque. L'intro con il preloader parte solo alla prima visita della sessione.
- **Telefono**: niente sezioni bloccate durante lo scroll, solo animazioni brevi; pulsante WhatsApp fisso, che si nasconde vicino al modulo e al footer.

## Prima della pubblicazione

Leggere `docs/verifica-pubblicazione.md`: include le verifiche tecniche, l'inventario cookie e i dati organizzativi da confermare con l'associazione. Privacy, cookie e termini sono bozze da validare dal titolare. GitHub ospita il codice; la configurazione corrente usa Vercel per l'hosting. Il progetto rimane statico e il modulo funziona senza endpoint di invio.
