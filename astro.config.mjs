import { defineConfig } from "astro/config";

export default defineConfig({
  // Indirizzo del sito: impostare SITE_URL con il dominio definitivo (su Vercel: Environment Variables).
  // Con l'indirizzo provvisorio *.vercel.app il sito non viene indicizzato dai motori di ricerca.
  site: process.env.SITE_URL || "https://roninkaratevigevano.vercel.app",
  trailingSlash: "always",
  build: { format: "directory" },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
});
