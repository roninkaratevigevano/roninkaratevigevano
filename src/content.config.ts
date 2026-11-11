import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Ogni news è un file .md in src/content/news. Il nome del file diventa l'indirizzo: /news/<nome-file>/
// I post nuovi si scrivono dal pannello /admin/ (Sveltia CMS): i campi qui sotto devono restare
// allineati con src/pages/admin/config.yml.ts.
export const categorieNews = ["News", "Esami", "Karate", "Kata", "Storia"] as const;

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categorie: z.array(z.enum(categorieNews)).default(["News"]),
    estratto: z.string().nullish().transform((v) => v ?? ""),
    // Foto principale mostrata in testa all'articolo (post scritti dal pannello admin)
    foto: z.string().nullish(),
    fotoAlt: z.string().nullish(),
    galleria: z.array(z.object({ src: z.string(), didascalia: z.string().nullish() })).nullish(),
    // Avviso fissato in cima a home e news fino alla data indicata (inclusa)
    inEvidenza: z.boolean().nullish().transform((v) => v ?? false),
    evidenzaFino: z.preprocess((v) => (v === "" ? null : v), z.coerce.date().nullish()),
    // Campi ereditati dall'importazione WordPress: copertina usata solo per l'anteprima social
    copertina: z.string().nullish(),
    video: z.boolean().nullish().transform((v) => v ?? false),
    originale: z.string().nullish(),
  }),
});

export const collections = { news };
