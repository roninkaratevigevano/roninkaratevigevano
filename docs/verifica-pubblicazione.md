# Verifica prima della pubblicazione — 2 novembre 2026

Le modifiche sono locali. Nessun messaggio è stato inviato e nessuna pubblicazione è stata eseguita.

Revisione successiva con le skill `privacy-policy-review`, `cookie-tracker-audit` e `gdpr-check`: vedere [revisione-legale.md](revisione-legale.md) per tabella degli esiti, priorità, formulazioni di completamento e suggerimenti. Le preferenze cookie sono state portate a 185 giorni; aggiunte origine dei dati dei minori, perimetro distinto per i trattamenti associativi e tempi di riscontro alle richieste privacy.

## Contenuti e contatti

- Otto insegnanti, con i ruoli e i gradi forniti; Roberto de Vincenzi è anche direttore tecnico e Stefano Lombardi è laureato in Scienze Motorie.
- Dichiarazione comune sui percorsi abilitanti FIJLKAM e/o CSI, senza attribuire affiliazioni individuali non confermate.
- Rimossa la sezione “Dalla bianca alla nera” dalla home e dal dojo, insieme al componente e agli stili dedicati.
- WhatsApp e chiamate nella navigazione, nel menu mobile, nei contatti e nel footer; email secondaria.
- Social con icone, sezione dedicata in home e accesso dal menu mobile, contatti e footer. Solo link esterni: nessun feed o pixel.
- Modulo: nome ed età obbligatori, destinatario del corso, corso, testo libero facoltativo e presa visione privacy. Anteprima locale e due bozze: WhatsApp principale, email secondaria con destinatario/oggetto/testo. Nessun invio dal sito. Nessun server form, token o dato personale nel repository.

## Inventario cookie e servizi

| Nome | Fornitore/dominio | Finalità | Durata | Categoria | Consenso |
|---|---|---|---|---|---|
| `ronin_consensi` | Dominio del sito | Ricorda le preferenze | 185 giorni | Tecnico | Non richiesto |
| `ronin-intro` (sessionStorage) | Dominio del sito | Non ripete l'introduzione | Sessione della scheda | Tecnico | Non richiesto |
| Google Maps | Google e domini collegati | Mappa integrata | Secondo i cookie effettivamente impostati dal servizio | Esterno facoltativo | Categoria Maps, disattivata inizialmente |
| YouTube | youtube-nocookie.com e domini collegati | Video richiesti dall'utente | Secondo gli strumenti effettivamente impostati dal servizio | Esterno facoltativo | Categoria video + clic sul video |

Il vecchio `localStorage['ronin-mappa']` viene eliminato senza convertirlo in consenso.

Inventario iniziale in browser pulito: nessun cookie, nessuna richiesta esterna; presente solo `ronin-intro` dopo la visita alla home con animazioni abilitate. Le preferenze successive si registrano in `ronin_consensi`. Le categorie facoltative restano bloccate fino alla scelta. Il banner consente rifiuto, X equivalente a rifiuto, accettazione e scelta separata. Il footer riapre sempre le preferenze. La revoca rimuove gli iframe, ma i cookie già presenti su domini esterni si cancellano dalle impostazioni del browser.

## DA VERIFICARE con il titolare

Le pagine `/privacy/`, `/cookie-policy/` e `/termini/` sono bozze basate sul codice e sui dati presenti, da validare con l'associazione o il suo consulente prima della pubblicazione.

- DA VERIFICARE: denominazione legale, sede, P. IVA, eventuale codice fiscale distinto e PEC. Nessun dato mancante è stato inventato.
- DA VERIFICARE: hosting effettivo Vercel e titolarità degli account. GitHub risulta il repository del codice; non è il destinatario dei moduli. Se si sceglie GitHub Pages o un altro hosting, aggiornare l'informativa prima del cambio.
- DA VERIFICARE: accordi art. 28 GDPR con chi gestisce hosting, manutenzione e accesso ai messaggi, ove applicabili; ruolo dello sviluppatore se accede a dati o backup.
- DA VERIFICARE: condizioni della casella Gmail, strumenti WhatsApp effettivamente usati e garanzie per trasferimenti extra SEE. I testi non attestano accordi o certificazioni non verificati.
- DA VERIFICARE: tempi reali di conservazione della corrispondenza e dei log dell'hosting. L'informativa indica i criteri; non sono stati inventati termini numerici per i dati gestiti dall'associazione.
- DA VERIFICARE sul dominio definitivo: cookie introdotti dall'hosting, eventuali strumenti aggiunti fuori dal repository, comportamento dei servizi Google in base a browser e account, nomi e durate dei loro cookie. Ripetere il controllo dopo ogni nuovo embed/analytics.
- DA VERIFICARE: eventuale nomina DPO e relativo contatto, se applicabile; l'informativa non afferma nomine o esenzioni.
- DA VERIFICARE: disponibilità dei corsi e orari, ancora ricavati dalla stagione 2025/26, prima di avviare la stagione corrente.

La checkbox del modulo è presa visione, non consenso marketing. La gestione delle richieste sui corsi si basa sull'art. 6.1.b GDPR; la checkbox non è indicata come base giuridica. Non è richiesta l'accettazione di condizioni di vendita: non ci sono pagamenti o contratti online. I termini d'uso chiariscono che la richiesta di prova va confermata dall'associazione.

## Verifiche eseguite

- `npm run build`: 110 pagine generate correttamente.
- 4.453 riferimenti interni a pagine e file controllati nella build: nessun elemento mancante.
- 68 verifiche browser sulla build statica: dati obbligatori, età fuori intervallo, presa visione, anteprima e testo identico per WhatsApp/email, accenti/righe/caratteri speciali, assenza di dati del modulo in storage/URL e uso sicuro del testo libero.
- Privacy: assenza di richieste esterne/cookie prima della scelta, X equivalente al rifiuto, scelta ricordata per 185 giorni, abilitazione separata di Maps e YouTube, revoca e ripristino dei segnaposto.
- Layout controllato a 360, 768, 1024 e 1440 px su home, dojo, contatti e tutte le pagine legali, senza overflow orizzontale. Esaminate immagini di desktop e mobile per staff, modulo e social.
- Menu mobile, accesso ai social e chiusura con Escape verificati. Nessun errore JavaScript nella sessione di verifica.
- Verificati anche rifiuto/accettazione del primo livello, pulsanti di uguale peso visivo, focus tastiera nelle preferenze e percorsi alternativi con JavaScript disattivato.
- I collegamenti di invio sono stati intercettati nei test: nessun messaggio è stato inviato. La consegna effettiva dipende dall'app WhatsApp o dal programma email configurato dall'utente.
- Nella sessione con Maps autorizzato è stato osservato il solo cookie proprietario delle preferenze; ciò non dimostra l'assenza di cookie Google con altri browser/account. La tabella distingue gli strumenti proprietari dai servizi esterni facoltativi senza inventare nomi o durate non osservati.

## Dipendenze

`npm audit` segnala 7 dipendenze vulnerabili (1 bassa, 1 moderata, 4 alte, 1 critica), già nella catena di Astro 5.18.2. Le voci includono Astro, sharp, zod/zod-to-ts, undici, vite ed esbuild. L'audit propone anche un passaggio di versione principale ad Astro 7.4.5: non è stato applicato un aggiornamento forzato come parte di queste modifiche ai contenuti e al modulo.

La build è statica: in produzione non espone il dev server né un endpoint di ottimizzazione immagini o di invio form. Questo non equivale alla risoluzione delle segnalazioni. Prima della pubblicazione programmare l'aggiornamento compatibile del toolchain e ripetere audit/build/verifiche. Il rapporto completo si rigenera con `npm audit`.

## Fonti

- [Garante: FAQ cookie](https://www.garanteprivacy.it/faq/cookie)
- [Garante: Linee guida cookie del 10 giugno 2021](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876)
- [CookieConsent: configurazione e API](https://cookieconsent.orestbida.com/reference/configuration-reference.html)
- [Google: privacy e servizi](https://policies.google.com/privacy?hl=it)
- [Vercel: informativa](https://vercel.com/legal/privacy-notice)
- [GitHub: informativa](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
