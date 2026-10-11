import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Ogni news è un file .md in src/content/news. Il nome del file diventa l'indirizzo: /news/<nome-file>/
const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categorie: z.array(z.enum(["News", "Karate", "Kata", "Storia"])).default(["News"]),
    estratto: z.string().default(""),
    copertina: z.string().optional(),
    video: z.boolean().default(false),
    originale: z.string().optional(),
  }),
});

export const collections = { news };
