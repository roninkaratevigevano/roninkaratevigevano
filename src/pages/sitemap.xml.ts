import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const pagine = ["/", "/il-dojo/", "/corsi/", "/karate-bambini-vigevano/", "/difesa-personale-vigevano/", "/news/", "/contatti/", "/safeguarding/", "/privacy/"];
  const news = await getCollection("news");
  const url = [
    ...pagine.map((p) => `<url><loc>${new URL(p, site)}</loc></url>`),
    ...news.map((n) => `<url><loc>${new URL(`/news/${n.id}/`, site)}</loc><lastmod>${n.data.date.toISOString().slice(0, 10)}</lastmod></url>`),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${url.join("")}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
