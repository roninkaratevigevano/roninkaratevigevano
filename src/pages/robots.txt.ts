import type { APIRoute } from "astro";

// Sull'indirizzo provvisorio di Vercel i motori di ricerca restano fuori (il vecchio sito è ancora online)
export const GET: APIRoute = ({ site }) => {
  const provvisorio = site?.hostname.endsWith("vercel.app");
  const testo = provvisorio
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site)}\n`;
  return new Response(testo, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
