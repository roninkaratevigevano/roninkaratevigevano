import type { APIRoute } from "astro";

// Configurazione del pannello /admin/ (Sveltia CMS). Il file è JSON, che è YAML valido.
// Repository e ramo vengono letti dalle variabili di sistema di Vercel, così il pannello scrive
// sempre nel repository collegato al progetto. In locale si usano i valori di riserva.
// I campi devono restare allineati allo schema in src/content.config.ts.
export const GET: APIRoute = ({ site }) => {
  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const slug = process.env.VERCEL_GIT_REPO_SLUG;
  const repo = process.env.CMS_REPO || (owner && slug ? `${owner}/${slug}` : "GxMich/ronin-karate-vigevano");
  const branch = process.env.CMS_BRANCH || "main";
  const sito = site!.href.replace(/\/$/, "");

  const data = { label: "", name: "", widget: "datetime", time_format: false, date_format: "DD/MM/YYYY", format: "YYYY-MM-DD" };

  const config = {
    backend: {
      name: "github",
      repo,
      branch,
      base_url: sito,
      auth_endpoint: "api/auth",
      commit_messages: {
        create: "Nuovo post: {{slug}}",
        update: "Aggiorna post: {{slug}}",
        delete: "Elimina post: {{slug}}",
        uploadMedia: "Carica foto {{path}}",
        deleteMedia: "Elimina foto {{path}}",
      },
    },
    app_title: "Ronin Karate · Bacheca",
    logo: { src: "/img/logo-192.png" },
    site_url: sito,
    display_url: sito,
    media_folder: "public/media/uploads",
    public_folder: "/media/uploads",
    media_libraries: {
      default: {
        config: {
          max_file_size: 25_000_000,
          slugify_filename: true,
          // Le foto del telefono vengono ridotte e convertite in WebP prima del caricamento
          transformations: { raster_image: { format: "webp", quality: 82, width: 1800, height: 1800 } },
        },
      },
    },
    slug: { encoding: "ascii", clean_accents: true },
    collections: [
      {
        name: "news",
        label: "Post e avvisi",
        label_singular: "post",
        description: "Avvisi, esami e notizie pubblicati nella sezione News del sito. Dopo il salvataggio il sito si aggiorna da solo in 1-2 minuti.",
        folder: "src/content/news",
        extension: "md",
        format: "frontmatter",
        create: true,
        delete: true,
        slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
        summary: "{{title}} · {{date | date('DD/MM/YYYY')}}",
        preview_path: "news/{{slug}}/",
        sortable_fields: { fields: ["date", "title"], default: { field: "date", direction: "descending" } },
        view_filters: [
          { label: "Avvisi", field: "categorie", pattern: "News" },
          { label: "Esami", field: "categorie", pattern: "Esami" },
          { label: "In evidenza", field: "inEvidenza", pattern: true },
        ],
        fields: [
          { label: "Titolo", name: "title", widget: "string", hint: "Breve e chiaro, per esempio: Esami di graduazione di febbraio." },
          { ...data, label: "Data di pubblicazione", name: "date", default: "{{now}}" },
          {
            label: "Sezione",
            name: "categorie",
            widget: "select",
            multiple: true,
            min: 1,
            default: ["News"],
            hint: "Gli avvisi compaiono anche in home page. Per un post sugli esami seleziona sia Avvisi sia Esami.",
            options: [
              { label: "Avvisi e notizie", value: "News" },
              { label: "Esami", value: "Esami" },
              { label: "Karate", value: "Karate" },
              { label: "Kata", value: "Kata" },
              { label: "Storia", value: "Storia" },
            ],
          },
          { label: "Fissa in evidenza", name: "inEvidenza", widget: "boolean", default: false, required: false, hint: "Mostra il post in cima a home page e News, per avvisi importanti (chiusure, esami, eventi)." },
          { ...data, label: "In evidenza fino al", name: "evidenzaFino", required: false, hint: "Facoltativo. Dopo questa data il post resta tra le news ma non è più in cima." },
          { label: "Foto principale", name: "foto", widget: "image", required: false, hint: "Facoltativa. Compare in alto nel post." },
          { label: "Descrizione della foto", name: "fotoAlt", widget: "string", required: false, hint: "Cosa si vede nella foto, per chi usa lettori di schermo. Esempio: Allievi in fila sul tatami durante gli esami." },
          { label: "Riassunto", name: "estratto", widget: "text", required: false, hint: "Facoltativo: una o due frasi mostrate negli elenchi e su Google. Se lo lasci vuoto viene usato l'inizio del testo." },
          { label: "Testo", name: "body", widget: "markdown", buttons: ["bold", "italic", "link", "heading-two", "heading-three", "bulleted-list", "numbered-list", "quote"], editor_components: ["image"] },
          {
            label: "Galleria foto",
            name: "galleria",
            widget: "list",
            required: false,
            label_singular: "foto",
            summary: "{{fields.didascalia}}",
            hint: "Facoltativa. Aggiungi le foto della giornata: si aprono a schermo intero.",
            fields: [
              { label: "Foto", name: "src", widget: "image" },
              { label: "Didascalia", name: "didascalia", widget: "string", required: false },
            ],
          },
          // Campi dei post importati da WordPress: conservati quando si modifica un vecchio post
          { label: "Copertina (vecchio sito)", name: "copertina", widget: "hidden" },
          { label: "Video", name: "video", widget: "hidden" },
          { label: "Indirizzo originale", name: "originale", widget: "hidden" },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(config, null, 2), {
    headers: { "Content-Type": "text/yaml; charset=utf-8" },
  });
};
