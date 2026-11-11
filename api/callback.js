// Vercel Function: riceve il codice da GitHub, lo scambia con un token e lo consegna al pannello
// /admin/ con il protocollo dei popup di Decap/Sveltia CMS. Il token resta nel browser di chi accede.

// JSON sicuro dentro <script>: niente "</script>" anche se GitHub restituisse testo inatteso
const js = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

// Testo sicuro dentro l'HTML
const html = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const pagina = (stato, contenuto, origini) => `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Accesso al pannello</title></head>
<body style="font-family:system-ui,sans-serif;padding:24px;line-height:1.5">
<p id="esito">${stato === "success" ? "Collegamento al pannello in corso…" : "Accesso non riuscito."}</p>
${stato === "success" ? "" : `<p>Motivo: <strong>${html(contenuto.error)}</strong></p><p>Chiudi la finestra e riprova. Se si ripete, manda questo messaggio a chi gestisce il sito.</p>`}
<script>
(() => {
  const consentite = ${js(origini)};
  const messaggio = "authorization:github:${stato}:" + ${js(JSON.stringify(contenuto))};
  const esito = document.getElementById("esito");
  if (!window.opener) {
    if (${js(stato === "success")}) esito.textContent = "Questa finestra ha perso il collegamento con il pannello. Chiudila, ricarica la pagina /admin/ e riprova senza aprire altre schede.";
    return;
  }
  // Niente { once: true }: altri messaggi (es. estensioni del browser) non devono consumare l'ascolto
  const ascolta = (e) => {
    if (e.data !== "authorizing:github" || !consentite.includes(e.origin)) return;
    window.removeEventListener("message", ascolta);
    clearTimeout(attesa);
    window.opener.postMessage(messaggio, e.origin);
    if (${js(stato === "success")}) esito.textContent = "Accesso eseguito, puoi chiudere questa finestra.";
  };
  window.addEventListener("message", ascolta);
  const attesa = setTimeout(() => {
    if (${js(stato === "success")}) esito.textContent = "Il pannello non ha risposto. Chiudi la finestra, ricarica /admin/ e riprova (se usi estensioni del browser, prova in una finestra di navigazione in incognito).";
  }, 8000);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`;

function leggiCookie(req, nome) {
  const riga = (req.headers.cookie || "").split(/;\s*/).find((c) => c.startsWith(`${nome}=`));
  return riga ? decodeURIComponent(riga.slice(nome.length + 1)) : "";
}

export default async function handler(req, res) {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  // Il token viene consegnato solo al pannello di questo sito (ed eventuali domini aggiuntivi in CMS_ORIGINI)
  const origini = [`https://${host}`, ...(process.env.CMS_ORIGINI || "").split(",").map((o) => o.trim()).filter(Boolean)];
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Set-Cookie", "ronin_cms_stato=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0");

  const errore = (testo) => res.status(400).send(pagina("error", { error: testo }, origini));
  const { code, state, error, error_description } = req.query;
  // GitHub rimanda qui anche quando l'accesso viene negato o l'OAuth App è configurata male
  if (error) return errore(`GitHub: ${error_description || error}`);
  if (!code || !state) return errore("GitHub non ha inviato il codice di accesso.");
  const statoSalvato = leggiCookie(req, "ronin_cms_stato");
  if (!statoSalvato) return errore("Cookie di sicurezza mancante (scaduto dopo 10 minuti o bloccato dal browser).");
  if (state !== statoSalvato) return errore("Codice di sicurezza non corrispondente: chiudi le altre finestre di accesso e riprova.");

  try {
    const risposta = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `https://${host}/api/callback`,
      }),
    });
    const dati = await risposta.json();
    if (!dati.access_token) return errore(dati.error_description || "GitHub non ha restituito un token.");
    res.status(200).send(pagina("success", { token: dati.access_token, provider: "github" }, origini));
  } catch {
    errore("GitHub non raggiungibile, riprova tra poco.");
  }
}
