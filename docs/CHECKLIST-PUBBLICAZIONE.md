# Checklist di pubblicazione e indicizzazione

Ordine consigliato, dall'inizio alla fine. Tutto gratuito. I dettagli dei singoli passaggi sono in [GUIDA-ADMIN-E-GOOGLE.md](GUIDA-ADMIN-E-GOOGLE.md).

Sito: https://roninkaratevigevano.vercel.app/ · Il progetto Vercel pubblica dal **repository GitHub dell'amico/associazione**, ramo `main`.

## 1. Portare il codice nel repository collegato a Vercel

- [ ] Il proprietario del repository aggiunge lo sviluppatore come collaboratore: **Settings → Collaborators → Add people** (in un repository personale il collaboratore ha sempre permesso di scrittura). Lo sviluppatore accetta l'invito ricevuto per email.
- [ ] **Vercel Hobby e repository privato**: Vercel pubblica solo i commit del proprietario dell'account Vercel; quelli di altri account GitHub (sviluppatore, istruttori dal pannello `/admin/`) vengono bloccati. Soluzione gratuita consigliata: rendere il repository **pubblico** (Settings → General → Danger Zone → Change visibility). Il codice di un sito statico non contiene segreti: le chiavi stanno solo nelle variabili di Vercel. In alternativa, con repository privato: lo sviluppatore apre una pull request e il proprietario la unisce con **Create a merge commit**, ma il pannello `/admin/` funzionerebbe solo per il proprietario.
- [ ] Lo sviluppatore collega il repository e confronta il contenuto prima di caricare (il repository contiene già i file della consegna Google):

```bash
git remote add amico https://github.com/<PROPRIETARIO>/<REPOSITORY>.git
git fetch amico
git diff --stat amico/main
```

- [ ] Carica il lavoro (commit sul ramo `main` del repository dell'amico). Vercel pubblica da solo in 1-2 minuti.
- [ ] In **Vercel → Deployments** la pubblicazione risulta **Ready** e **Production**.

## 2. Variabili su Vercel (Settings → Environment Variables, ambiente Production)

| Variabile | Serve per | Obbligatoria |
| --- | --- | --- |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | Accesso al pannello `/admin/` | Sì, per il pannello |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Verifica Search Console con meta tag | Sì, per Search Console |
| `PUBLIC_GA_ID` | Google Analytics 4 (dopo consenso cookie) | No |
| `SITE_URL` | Solo se si passa a un dominio proprio | No |

- [ ] Lasciare attivo **Automatically expose System Environment Variables** (serve a distinguere produzione e anteprime).
- [ ] Dopo ogni modifica alle variabili: **Deployments → ⋯ → Redeploy** sulla produzione.

## 3. Controlli sul sito online (5 minuti)

- [ ] `/robots.txt` mostra `Allow: /`, `Disallow: /admin/`, `Disallow: /api/` e la riga `Sitemap:`.
- [ ] `/sitemap.xml` si apre e gli indirizzi iniziano con `https://roninkaratevigevano.vercel.app/`.
- [ ] Homepage → **Ctrl+U**: c'è `index, follow, max-image-preview:large`, **non** c'è `noindex`.
- [ ] Un vecchio indirizzo WordPress, es. `/2019/10/24/1-novembre-2/`, porta a `/news/1-novembre-2/`.
- [ ] `/api/auth` porta alla pagina di login GitHub (se dice "Accesso non configurato" mancano le variabili del punto 2).
- [ ] `/admin/` → **Accedi con GitHub** funziona e si vede l'elenco dei post.
- [ ] Test dati strutturati della homepage e di una news: https://search.google.com/test/rich-results

## 4. Google Search Console

- [ ] https://search.google.com/search-console → **Aggiungi proprietà → Prefisso URL** → `https://roninkaratevigevano.vercel.app/`.
- [ ] Metodo **Tag HTML** → copiare solo il valore `content` in `PUBLIC_GOOGLE_SITE_VERIFICATION` → Redeploy → **Verifica**.
- [ ] **Sitemap** → `sitemap.xml` → **Invia**.
- [ ] **Controllo URL** → homepage, `/corsi/`, `/contatti/`, `/karate-bambini-vigevano/` → **Richiedi indicizzazione**.
- [ ] Usare l'account Google dell'associazione e aggiungere lo sviluppatore come utente, così la proprietà resta all'associazione.

## 5. Bing (alimenta anche DuckDuckGo, Ecosia e diversi assistenti AI)

- [ ] https://www.bing.com/webmasters → **Importa da Google Search Console**: importa sito e sitemap senza altra verifica.

## 6. Profilo dell'attività su Google (Google Maps)

È il canale che porta più contatti per ricerche come "karate Vigevano".

- [ ] Rivendicare o creare il profilo su https://business.google.com con l'account dell'associazione.
- [ ] Categoria principale: **Scuola di karate** (secondaria: Scuola di arti marziali / Corso di autodifesa).
- [ ] Indirizzo **della palestra** (Centro sportivo H2 Sport, via Mondetti 15, Vigevano), identico a quello del sito.
- [ ] Sito web: `https://roninkaratevigevano.vercel.app/`; telefono `392 735 8939`; orari confermati della stagione.
- [ ] Qualche foto della palestra e degli allenamenti, solo con le liberatorie.
- [ ] Chiedere ai genitori soddisfatti una recensione.

## 7. Vecchio sito WordPress e link esterni

- [ ] Sul vecchio `roninkaratevigevano.wordpress.com`: avviso ben visibile in home con il link al nuovo sito (gratis). Il redirect automatico **Site Redirect** è a pagamento: facoltativo.
- [ ] Aggiornare il link al sito su Instagram, Facebook, TikTok, profilo FIJLKAM/CSI e ovunque compaia il vecchio indirizzo.

## 8. Dopo 1-2 settimane

- [ ] Search Console → **Indicizzazione → Pagine**: controllare quante pagine sono indicizzate e i motivi delle esclusioni.
- [ ] Search Console → **Rendimento**: le prime ricerche che portano al sito.
- [ ] Google è libero di non indicizzare tutte le 100 news storiche: è normale, contano soprattutto home, corsi e contatti.

## Se in futuro si compra un dominio (es. roninkaratevigevano.it)

Vercel → Domains → aggiungere il dominio; impostare `SITE_URL`; aggiornare callback dell'OAuth App GitHub; nuova proprietà in Search Console con **Cambio di indirizzo**; aggiornare il profilo Google e i social. Il vecchio indirizzo vercel.app va reindirizzato al nuovo.
