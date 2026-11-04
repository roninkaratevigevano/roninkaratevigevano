# Revisione delle pagine legali e del trattamento dati

2 novembre 2026 — revisione 1.1

Skill applicate: `pagine-legali-it`, `privacy-policy-review`, `cookie-tracker-audit`, `gdpr-check`.

La revisione riguarda il testo integrale delle pagine locali, il codice che compone i messaggi e le verifiche browser sulla build statica. Non certifica i processi interni dell'associazione o la conformità del futuro hosting. Le parti che dipendono da informazioni non disponibili restano **DA VERIFICARE**: nessun accordo, dato fiscale, nomina o termine di cancellazione è stato inventato.

## Esito per elemento

| Elemento | Stato | Riscontro e intervento | Priorità / riferimento |
|---|---|---|---|
| Identità e contatti del titolare | Presente | Denominazione, sede, P. IVA, email e telefono presenti. DA VERIFICARE correttezza e eventuale C.F. distinto/PEC. | Media — art. 13.1.a GDPR |
| Eventuale DPO | Mancante, se applicabile | Nessuna nomina risulta dai dati disponibili. Non è stato affermato che un DPO sia obbligatorio o che esista. DA VERIFICARE con ASD. | Media, condizionata all'applicabilità — art. 13.1.b |
| Finalità e basi giuridiche | Presente | Corsi/prova su richiesta: art. 6.1.b; altre comunicazioni e sicurezza: art. 6.1.f; servizi esterni facoltativi: consenso. L'interesse alla sicurezza è spiegato. | Bassa — artt. 6 e 13.1.c–d |
| Conferimento obbligatorio e conseguenze | Presente | Nome ed età necessari nel modulo, altri campi facoltativi; spiegate alternative e conseguenze dell'assenza di informazioni. | Bassa — art. 13.2.e |
| Dati dei minori e loro origine | Presente dopo integrazione | È esplicitato che il genitore/tutore fornisce i dati relativi al minore. Si richiede il nome dell'adulto e solo l'età del minore, senza dati sanitari. Diritti esercitabili tramite chi ne ha titolo. | Media, risolta nel testo — artt. 5.1.c, 13–14 |
| Destinatari e ruoli | Debole | Vercel, Google/Gmail, WhatsApp e GitHub sono descritti secondo l'uso risultante dal progetto. Hosting definitivo, account e ruoli contrattuali non sono verificabili dal codice. GitHub non raccoglie il form. | Alta per completamento — artt. 13.1.e e 28 |
| Trasferimenti extra SEE | Debole | La pagina descrive le possibili garanzie, ma non può attestare quali siano state effettivamente adottate. Verificare accordi e configurazioni; una semplice lista di link alle privacy dei fornitori non risolve questo punto. | Alta per completamento — artt. 13.1.f e 44–49 |
| Conservazione | Debole | Sono indicati criteri e durata della preferenza tecnica; per messaggi e log manca conferma della procedura realmente adottata. Definire il termine o il criterio concreto, il momento da cui decorre e chi applica la cancellazione. | Media — artt. 5.1.e e 13.2.a |
| Diritti, reclamo e tempi di risposta | Presente dopo integrazione | Diritti e contatto già presenti. Aggiunti oggetto email dedicato, regola del mese per il riscontro e proroga nei casi previsti, senza richiedere preventivamente documenti di identità. | Media, risolta nel testo — artt. 12 e 15–22 |
| Decisioni automatizzate/profilazione | Presente | Dichiarate assenti sul sito; il comportamento del codice è coerente. | Bassa — art. 13.2.f |
| Cookie e consenso | Presente nei controlli locali | Nessun embed prima dell'autorizzazione; X e rifiuto; scelte separate Maps/YouTube; revoca dal footer; cookie con categorie e date. Durata corretta da 182 a 185 giorni per non anticipare il termine di almeno sei mesi. | Media, corretta — art. 122 Codice Privacy e Linee guida Garante |
| Inventario dei cookie esterni | Debole / DA VERIFICARE sul dominio finale | Nei test con Maps è stato osservato solo il cookie proprietario. Le righe Google sono indicate come servizi, senza inventare nomi e durate dei loro cookie. Ripetere la rilevazione sul dominio pubblico, anche dopo la riproduzione video, con browser/account differenti. | Media — trasparenza cookie |
| Versione, chiarezza e accesso | Presente | Privacy e cookie versione 1.1, data visibile, link nel footer e nel modulo, frasi sui due canali coerenti con il comportamento reale. | Bassa — art. 12 |
| Tesseramento, salute e safeguarding | Fuori dal perimetro di questa informativa | Esplicitata la distinzione dalle richieste sui corsi. Le informative specifiche e le basi per dati particolari/segnalazioni vanno verificate con ASD. Il modulo corsi non va usato per certificati o segnalazioni sensibili. | Alta se questi trattamenti vengono svolti — artt. 9, 10 e 13 |
| Foto/video e PDF pubblici | Non verificato documentalmente | Sono presenti immagini e documenti. Non risultano nel progetto prove delle autorizzazioni o una verifica delle copie pubblicabili. Questo non dimostra un illecito: verificare titoli all'uso, minori riconoscibili, firme e dati non necessari prima di pubblicare. | Alta per controllo editoriale — artt. 5–6; tutele dei minori |
| Termini d'uso | Presente | Richiesta di prova distinta da conferma/iscrizione. Il sito non esegue vendite o pagamenti: i testi non simulano condizioni di vendita. Rivedere il perimetro se si aggiungono prenotazioni vincolanti o pagamenti. | Bassa, salvo nuove funzionalità |

La checkbox del modulo è **presa visione**, non consenso al marketing, non prova dell'invio e non base giuridica del trattamento. Per la sola risposta a una richiesta non occorre aggiungere un consenso promozionale; eventuale marketing futuro richiederebbe una scelta separata. Il sito non registra sul server questa checkbox, perché la comunicazione viene completata nella piattaforma scelta dall'utente.

## Inventario tecnico: prima e dopo la scelta

| Elemento | Categoria / fornitore | Parte prima del consenso? | Paesi e trasferimenti | Esito o azione |
|---|---|---|---|---|
| Font, JS, immagini | Risorse del sito | Sì, necessarie alla pagina | Dipende dall'hosting definitivo | Nessun CDN di font o libreria esterno nel client. |
| `ronin_consensi` | Tecnico, dominio del sito | Non presente prima della prima scelta; poi ricorda anche il rifiuto | Archiviato nel browser | 185 giorni, categorie/date/versione; nessun invio a un servizio di analytics. |
| `ronin-intro` / sessionStorage | Memoria funzionale dell'introduzione, dominio del sito | Sì nella home con movimento abilitato | Browser dell'utente | Nessun identificatore cross-site; si esaurisce con la sessione della scheda. |
| Google Maps | Servizio esterno facoltativo, Google | No | Possibili trattamenti extra SEE: DA VERIFICARE negli accordi | Iframe dopo consenso Maps; rimosso alla revoca. |
| Video YouTube | Servizio esterno facoltativo, Google/YouTube | No | Possibili trattamenti extra SEE: DA VERIFICARE negli accordi | Consenso categoria video più selezione del video; dominio embed privacy avanzata. |
| Instagram/Facebook/TikTok | Link esterni | No richieste dal collegamento durante la semplice navigazione | Dipende dal servizio visitato | Nessun feed o pixel incorporato. |
| WhatsApp | Link esterno con bozza | Solo dopo scelta dell'utente di aprire il canale | Possibili trattamenti extra SEE: DA VERIFICARE | Il testo è trasmesso al servizio scelto; ricevuto dall'ASD soltanto dopo invio. |
| Email | `mailto:` al programma scelto dall'utente | No invio dal sito | Dipende da client e provider mittente/destinatario | Destinatario, oggetto e testo precompilati; nessun endpoint form. |
| GitHub | Repository e pubblicazione del codice | Nessuna richiesta client verso GitHub per far funzionare il modulo | Non è destinatario dei campi del form nella configurazione corrente | Se il sito passa a GitHub Pages cambia il ruolo dell'hosting e va aggiornata l'informativa. |
| Banner e preferenze | Gestore locale del consenso | Banner iniziale | Nessun CMP remoto | Accetta/rifiuta allo stesso livello; scelte non preselezionate e revoca disponibile. |

Le verifiche di navigazione prima e dopo la scelta sono state eseguite sulla build locale. Non provano i trattamenti interni dei fornitori, la conservazione della posta, la copertura di tutte le configurazioni browser né eventuali strumenti aggiunti dal provider di produzione.

## Come chiudere i punti aperti

1. **ASD / hosting (Alta):** confermare hosting, intestatario degli account, eventuale soggetto che gestisce i dati; controllare accordi e garanzie per ciascun fornitore effettivo.
2. **ASD / archivio messaggi (Media):** stabilire una regola di cancellazione applicata anche a posta, chat e copie. Non basta modificare una frase nel sito.
3. **ASD / foto e documenti (Alta):** verificare autorizzazioni e versioni pubblicabili, con particolare attenzione ai minori. La privacy del visitatore e la checkbox del form non autorizzano la pubblicazione di immagini degli atleti.
4. **ASD / informativa specifica (Alta se pertinente):** verificare quella per iscritti, salute e safeguarding prima di raccogliere queste informazioni attraverso altri canali.
5. **Sviluppatore / sito online (Media):** ripetere inventario e controlli sul dominio definitivo; aggiornare la tabella solo con cookie realmente rilevati o identificati dalla documentazione applicabile.

Formulazioni di completamento, da usare soltanto dopo verifica dei fatti:

- Destinatari: «Il sito è ospitato da [fornitore effettivo]; [soggetto] svolge [attività] nel ruolo di [ruolo verificato] sulla base di [accordo applicabile].»
- Conservazione: «Le richieste che non danno seguito a iscrizione sono eliminate dopo [periodo approvato] dalla [conclusione della richiesta/ultimo contatto]; restano soltanto i dati necessari per [eccezioni specifiche].»
- Trasferimenti: «Per il servizio [nome], i trasferimenti verso [paesi verificati] si fondano su [garanzia effettivamente applicabile]. Informazioni o copia delle garanzie sono richiedibili a [contatto].»
- DPO, solo se nominato: «Il Responsabile della protezione dei dati è contattabile a [recapito verificato].»

I segnaposto restano in questo rapporto di lavoro, non nelle pagine pubbliche.

## Cosa aggiungerei al sito, in ordine

1. **Orari e prova della stagione corrente.** Confermare i turni attuali e precisare durata della prima lezione, eventuale costo e cosa portare. Le FAQ esistono già: completarle con dati confermati, portando in home un riepilogo utile.
2. **Alternativa “Copia messaggio”.** Permette di recuperare il testo se il dispositivo non ha un programma email configurato o non apre l'app. Mantiene WhatsApp come azione principale.
3. **Ritratti veri dello staff.** Aiutano a riconoscere gli insegnanti prima di arrivare in palestra. Usare foto autorizzate, senza inventare ritratti o qualifiche.
4. **Indicazioni pratiche per arrivare.** Un riferimento all'ingresso della palestra, parcheggio e accessibilità, soltanto se confermati. Una foto locale dell'ingresso evita nuovi embed.
5. **Preparazione del dominio definitivo.** La configurazione attuale lascia `noindex` e `robots.txt` restrittivo sugli indirizzi provvisori Vercel; impostare `SITE_URL` correttamente al lancio e verificare canonical/sitemap.
6. **Aggiornamento delle dipendenze già segnalate.** Resta la segnalazione tecnica del rapporto `verifica-pubblicazione.md`: pianificare l'aggiornamento compatibile e i test prima del lancio.

Per le FAQ fiscali è stata sostituita la risposta automatica «sì, con bonifico o assegno» con una formulazione condizionata ai requisiti, alla tracciabilità e alla documentazione, senza garantire benefici fiscali al singolo visitatore.

## Fonti primarie consultate

- [Garante: principi, informativa, diritti e tempi di riscontro](https://www.garanteprivacy.it/home/principi-fondamentali-del-trattamento)
- [Garante: doveri e informativa per dati ricevuti da terzi](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/8981258)
- [Garante: FAQ cookie, compreso il termine di almeno sei mesi](https://www.garanteprivacy.it/faq/cookie)
- [Garante: Linee guida cookie del 10 giugno 2021](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876)
- [Garante: provvedimento del 13 novembre 2024 sulle immagini dei minori](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10076481)
- [Agenzia delle Entrate: spese per istruzione e sport](https://infoprecompilata.agenziaentrate.gov.it/portale/web/guest/semplificata-mod-istruzione-e-sport)
- [Vercel: accordo per il trattamento dei dati](https://vercel.com/legal/dpa)

I link ai fornitori descrivono documentazione pubblica; non dimostrano da soli che l'ASD abbia stipulato uno specifico accordo o scelto una determinata configurazione.
