import type { APIRoute } from "astro";

// La produzione è pubblica anche su vercel.app; le anteprime Vercel restano escluse.
export const GET: APIRoute = ({ site }) => {
  const indicizza = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  const testo = indicizza
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${new URL("/sitemap.xml", site)}\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(testo, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
