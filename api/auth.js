// Vercel Function: avvia l'accesso con GitHub per il pannello /admin/.
// Richiede le variabili d'ambiente GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET (OAuth App su GitHub).
import { randomBytes } from "node:crypto";

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("Accesso non configurato: manca GITHUB_CLIENT_ID nelle variabili d'ambiente di Vercel.");
    return;
  }
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const stato = randomBytes(24).toString("hex");
  const ambito = String(req.query.scope || "repo,user").replace(/[^\w,:]/g, "");

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", `https://${host}/api/callback`);
  url.searchParams.set("scope", ambito);
  url.searchParams.set("state", stato);

  res.setHeader("Set-Cookie", `ronin_cms_stato=${stato}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  res.setHeader("Cache-Control", "no-store");
  res.redirect(302, url.toString());
}
