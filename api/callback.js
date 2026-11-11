// Vercel Function: riceve il codice da GitHub, lo scambia con un token e lo consegna al pannello
// /admin/ con il protocollo dei popup di Decap/Sveltia CMS. Il token resta nel browser di chi accede.

// JSON sicuro dentro <script>: niente "</script>" anche se GitHub restituisse testo inatteso
const js = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

const pagina = (stato, contenuto, origini) => `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Accesso al pannello</title></head>
<body style="font-family:system-ui,sans-serif;padding:24px">
<p>${stato === "success" ? "Accesso eseguito, puoi chiudere questa finestra." : "Accesso non riuscito. Chiudi la finestra e riprova."}</p>
<script>
(() => {
  const consentite = ${js(origini)};
  const messaggio = "authorization:github:${stato}:" + ${js(JSON.stringify(contenuto))};
  if (!window.opener) return;
  window.addEventListener("message", (e) => {
    if (e.data !== "authorizing:github" || !consentite.includes(e.origin)) return;
    window.opener.postMessage(messaggio, e.origin);
  }, { once: true });
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
  const { code, state } = req.query;
  if (!code || !state || state !== leggiCookie(req, "ronin_cms_stato")) return errore("Richiesta non valida o scaduta.");

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
