import { defineConfig } from "astro/config";

export default defineConfig({
  // Indirizzo pubblico per canonical e sitemap. Aggiornare SITE_URL se si cambia dominio.
  // Il sito di produzione è indicizzabile anche su vercel.app; le anteprime restano escluse.
  site: process.env.SITE_URL || "https://roninkaratevigevano.vercel.app",
  trailingSlash: "always",
  build: { format: "directory" },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
});
