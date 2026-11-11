# Ronin Karate: pannello post, Google Analytics e Search Console

Tutto gratuito: codice su GitHub, sito su Vercel (piano Hobby), pannello Sveltia CMS, Google Analytics 4 e Search Console.

## Come funziona

```text
Istruttore ──► /admin/ (login GitHub) ──► salva il post nel repository GitHub
                                               │
                                               ▼
                              Vercel ricostruisce il sito in 1-2 minuti
                                               │
                                               ▼
                      il post compare in News, in home e nella sitemap per Google
```

- Il pannello è su **https://roninkaratevigevano.vercel.app/admin/** (noindex, escluso da robots e sitemap).
- Possono entrare solo gli account GitHub con permesso di scrittura sul repository.
- Ogni post diventa un file in `src/content/news/`; le foto vanno in `public/media/uploads/`, ridotte a max 1800 px e convertite in WebP già nel browser, così le foto del telefono non appesantiscono il sito.
- Non c'è database né server da pagare: le uniche parti "server" sono due piccole funzioni Vercel (`api/auth.js`, `api/callback.js`) per l'accesso con GitHub.

## 1. Attivare l'accesso al pannello (una volta sola)

### 1a. Crea l'OAuth App su GitHub

Con l'account proprietario del repository:

1. GitHub → foto profilo → **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Compila:
   - **Application name**: `Ronin Karate Bacheca`
   - **Homepage URL**: `https://roninkaratevigevano.vercel.app`
   - **Authorization callback URL**: `https://roninkaratevigevano.vercel.app/api/callback`
3. **Register application**, poi **Generate a new client secret**. Copia subito Client ID e Client secret: il secret si vede una sola volta.

### 1b. Inserisci le chiavi su Vercel

Progetto Vercel → **Settings → Environment Variables**, ambiente **Production**:

| Nome | Valore |
| --- | --- |
| `GITHUB_CLIENT_ID` | Client ID dell'OAuth App |
| `GITHUB_CLIENT_SECRET` | Client secret dell'OAuth App |

Poi **Deployments → ⋯ → Redeploy** sull'ultima pubblicazione di produzione.

Il pannello scrive automaticamente nel repository e nel ramo collegati a Vercel (variabili di sistema `VERCEL_GIT_REPO_OWNER`/`VERCEL_GIT_REPO_SLUG`): lascia attivo **Automatically expose System Environment Variables**. Solo se serve forzarli, imposta `CMS_REPO` (es. `proprietario/ronin-karate-vigevano`) e `CMS_BRANCH`.

### 1c. Prova

1. Apri `/admin/` → **Accedi con GitHub** → autorizza.
2. Se compare un errore, apri `https://roninkaratevigevano.vercel.app/api/auth`: deve portarti su GitHub. Se risponde 404, le funzioni non sono state pubblicate: controlla che la cartella `api/` sia nel repository, nella stessa cartella di `package.json`.

**Riserva senza OAuth**: dal pannello si può usare **Accedi con Token di Accesso**. Crea un token in GitHub → Settings → Developer settings → **Fine-grained tokens**, limitato al solo repository del sito, permesso **Contents: Read and write**. Il token resta salvato in quel browser.

### 1d. Aggiungere altri istruttori

Ognuno crea un account GitHub gratuito. Il proprietario apre il repository → **Settings → Collaborators → Add people** e lo invita. Per togliere l'accesso basta rimuoverlo da lì.

**Importante, piano Vercel Hobby:** se il repository è privato, Vercel pubblica solo i commit del proprietario dell'account Vercel; i post salvati da altri istruttori resterebbero bloccati ("commit author does not have contributing access"). Per usare il pannello con più persone senza pagare, il repository deve essere **pubblico**. Le chiavi (`GITHUB_CLIENT_SECRET`) stanno solo su Vercel, mai nel repository.

## 2. Pubblicare un post (istruzioni per chi scrive)

1. Vai su `/admin/` (anche da telefono) e accedi.
2. **Post e avvisi → Nuovo post**.
3. Compila:
   - **Titolo** e **Data** (precompilata a oggi).
   - **Sezione**: *Avvisi e notizie* compare anche in home; per gli esami scegli **Avvisi e notizie + Esami**.
   - **Fissa in evidenza**: per chiusure, esami, eventi. Il post resta in cima a home e News fino alla data **In evidenza fino al** (facoltativa), poi torna un post normale da solo.
   - **Foto principale** (facoltativa) e **Descrizione della foto**.
   - **Riassunto** (facoltativo): se vuoto si usa l'inizio del testo.
   - **Testo**: grassetto, elenchi, link, titoletti.
   - **Galleria foto** (facoltativa): una o più foto con didascalia; sul sito si aprono a schermo intero.
4. **Salva**. Dopo 1-2 minuti il post è online. Per modificarlo o eliminarlo, aprilo dall'elenco.

Sul sito i visitatori trovano i post in **News**, con i filtri *Avvisi e notizie* ed *Esami* (`/news/?cat=Esami`), e gli ultimi avvisi in home nella sezione "Dalla palestra".

Non pubblicare dati sanitari, documenti o foto di minori senza il consenso dei genitori: l'associazione deve avere le liberatorie per immagini e nomi pubblicati.

## 3. Google Analytics 4

1. https://analytics.google.com con l'account Google dell'associazione → **Amministrazione → Crea → Proprietà**: nome `Ronin Karate Vigevano`, fuso orario Italia, valuta Euro.
2. **Stream di dati → Web**: URL `https://roninkaratevigevano.vercel.app`, nome `Sito`. Copia l'**ID di misurazione** (`G-XXXXXXXXXX`).
3. **Amministrazione → Raccolta e conservazione dei dati → Conservazione dei dati**: imposta **14 mesi** (è il periodo indicato nella privacy policy).
4. Lascia **disattivati** Google Signals e la personalizzazione degli annunci.
5. Su Vercel aggiungi `PUBLIC_GA_ID` = `G-XXXXXXXXXX` solo per **Production** e fai **Redeploy**.

Cosa succede quando l'ID è impostato:

- Il banner cookie mostra la nuova categoria **Statistiche (Google Analytics)**, disattivata finché il visitatore non la accetta. Chi aveva già scelto riceve di nuovo il banner una volta.
- Lo script di Google viene caricato solo dopo il consenso; alla revoca le statistiche si fermano e i cookie `_ga` vengono cancellati.
- Privacy policy e cookie policy aggiungono da sole la parte su Google Analytics. Senza ID il sito torna esattamente com'era: nessuna statistica e testi invariati.
- Le anteprime Vercel non vengono conteggiate, perché la variabile vale solo in Production.

Con il consenso preventivo Analytics conta solo chi accetta: i numeri saranno inferiori alle visite reali. È il prezzo della conformità alle linee guida del Garante.

Per vedere i dati: Analytics → **Report → Tempo reale** (prova subito accettando i cookie dal tuo telefono), poi **Acquisizione** e **Coinvolgimento → Pagine e schermate**.

## 4. Google Search Console e sitemap

Già pronti nel sito: `robots.txt` (con `Disallow` per `/admin/` e `/api/`), `sitemap.xml` con tutte le pagine e i post (si aggiorna da sola a ogni nuovo post), canonical, Open Graph e dati strutturati (SportsActivityLocation in home, Article nei post).

Verifica della proprietà, metodo più semplice (senza caricare file):

1. https://search.google.com/search-console → **Aggiungi proprietà → Prefisso URL** → `https://roninkaratevigevano.vercel.app/`.
2. Scegli **Tag HTML**. Google mostra `<meta name="google-site-verification" content="ABC123..." />`: copia **solo** il valore di `content`.
3. Su Vercel aggiungi `PUBLIC_GOOGLE_SITE_VERIFICATION` = quel valore (Production) → **Redeploy**.
4. Torna in Search Console → **Verifica**. Lascia la variabile anche dopo, altrimenti la verifica decade.
5. **Sitemap** → scrivi `sitemap.xml` → **Invia**.
6. **Controllo URL** → incolla la homepage → **Richiedi indicizzazione**.
7. Facoltativo: in Analytics → Amministrazione → **Collegamenti a Search Console**, per vedere le ricerche Google nei report.

In alternativa resta valido il metodo con file HTML descritto in `consegna-google/GUIDA-GOOGLE.md`, che contiene anche i passi per reindirizzare il vecchio sito WordPress.

## 5. Se in futuro si passa a un dominio proprio

1. Aggiungi il dominio su Vercel (Settings → Domains) e imposta `SITE_URL=https://www.nuovodominio.it`.
2. Aggiorna Homepage URL e callback URL nell'OAuth App GitHub (`https://www.nuovodominio.it/api/callback`).
3. Aggiungi il dominio allo stream di Analytics e crea in Search Console una nuova proprietà, poi usa **Cambio di indirizzo**.

## Promemoria

- **Vercel Hobby** è gratuito ma pensato per uso non commerciale: per il sito di un'ASD senza scopo di lucro va normalmente bene; se il sito iniziasse a vendere qualcosa andrebbe valutato il piano Pro.
- I testi di privacy e cookie policy sono bozze da far confermare all'associazione (vedi `docs/verifica-pubblicazione.md`), anche nella parte su Google Analytics.
- Le variabili `PUBLIC_*` finiscono nel codice pubblico del sito (non sono segreti). `GITHUB_CLIENT_SECRET` invece va solo su Vercel, mai nel repository.
