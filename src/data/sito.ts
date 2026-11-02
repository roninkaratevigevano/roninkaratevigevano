// Dati dell'associazione usati in tutto il sito: modificali qui una volta sola.

export const associazione = {
  nome: "A.S.D. Ronin Karate Vigevano",
  breve: "Ronin Karate Vigevano",
  piva: "02646740189",
  sedeLegale: "via Oltrepò 18, 27029 Vigevano (PV)",
  email: "roninkaratevigevano@gmail.com",
  motto: "Non pensare che si pratichi karate solamente nel dojo.",
  palestra: {
    nome: "Centro sportivo H2 Sport",
    via: "via Mondetti 15",
    citta: "27029 Vigevano (PV)",
    mappe: "https://maps.google.com/?q=Via+Mondetti+15,+27029+Vigevano+PV",
    embed: "https://www.google.com/maps?q=Via%20Mondetti%2015%2C%2027029%20Vigevano%20PV&output=embed",
    lat: 45.32695,
    lng: 8.86022,
  },
  social: [
    { nome: "Instagram", url: "https://www.instagram.com/roninkaratevigevano", descrizione: "Allenamenti e vita di squadra", account: "@roninkaratevigevano" },
    { nome: "Facebook", url: "https://www.facebook.com/roninkaratevigevano", descrizione: "Notizie e appuntamenti del Ronin", account: "Ronin Karate Vigevano" },
    { nome: "TikTok", url: "https://www.tiktok.com/@ronin.karate.vige", descrizione: "Il karate, un video alla volta", account: "@ronin.karate.vige" },
  ],
};

export const contatti = {
  principale: { nome: "Gabriele Miceli", ruolo: "Corsi e tesseramenti", telefono: "392 735 8939", wa: "393927358939" },
  didattica: { nome: "Roberto de Vincenzi", ruolo: "Didattica e materiali", telefono: "333 937 5407", wa: "393339375407" },
};

export const safeguarding = {
  responsabile: "Daniele Palermo",
  email: "danielepalermo1988@gmail.com",
  documenti: [
    { titolo: "Verbale di assemblea", file: "/media/2024-12-verbale-assemblea-2.pdf", nota: "Nomina del Responsabile Safeguarding" },
    { titolo: "Codice di condotta", file: "/media/2024-12-codice-di-condotta.pdf", nota: "13 pagine" },
    { titolo: "Modello organizzativo e di controllo", file: "/media/2024-12-modello-organizzativo-e-di-controllo.pdf", nota: "7 pagine" },
    { titolo: "Regolamento Safeguarding Policy", file: "/media/2024-12-regolamento-safeguarding-policy.pdf", nota: "12 pagine" },
  ],
};

export const staff = [
  { nome: "Gabriele Miceli", ruolo: "Presidente ASD · Insegnante tecnico", dan: 5 },
  { nome: "Roberto de Vincenzi", ruolo: "Insegnante e direttore tecnico", dan: 5 },
  { nome: "Daniele Palermo", ruolo: "Insegnante tecnico · Responsabile safeguarding", dan: 5 },
  { nome: "Luca Del Moro", ruolo: "Insegnante tecnico", dan: 3 },
  { nome: "Andrea Colognese", ruolo: "Insegnante tecnico", dan: 3 },
  { nome: "Stefano Piacentini", ruolo: "Insegnante tecnico", dan: 3 },
  { nome: "Stefano Lombardi", ruolo: "Insegnante tecnico · Laureato in Scienze Motorie", dan: 3 },
  { nome: "Alessandro Lombardo", ruolo: "Insegnante tecnico", dan: 2 },
];

// gare: "si" = solo per chi vuole gareggiare, "no" = senza gare, "tutti" = entrambi
export const corsi = [
  {
    id: "ragazzi", nome: "Ragazzi", eta: "6 – 14 anni", min: 6, max: 14, gare: "tutti", segno: "6–14", turno: "18:00",
    breve: "Fino a 7 anni si impara giocando, curando coordinazione motoria e spaziale. Dagli 8 anni postura, tecnica, kata di base e kumite con bersagli.",
    dettagli: [
      "Dai 6 ai 7 anni i concetti base passano dal gioco, con particolare attenzione alla coordinazione motoria e spaziale.",
      "Dagli 8 ai 14 anni lavoriamo sulla postura e sulla tecnica, con lo studio dei kata di base e del kumite, all'inizio con bersagli fittizi.",
    ],
  },
  {
    id: "agonisti", nome: "Agonisti", eta: "dai 14 anni", min: 14, max: 99, gare: "si", segno: "14+", turno: "19:00",
    breve: "Kata di base e superiori, kumite tra allievi con le protezioni, preparazione atletica per le gare.",
    dettagli: [
      "Studio tecnico approfondito, con kata di base e superiori.",
      "Kumite tra allievi con le adeguate protezioni e preparazione atletica per le competizioni.",
    ],
  },
  {
    id: "amatori", nome: "Amatori", eta: "dai 14 anni", min: 14, max: 99, gare: "no", segno: "14+", turno: "19:00",
    breve: "Lo studio tecnico completo del karate, senza l'obbligo delle competizioni.",
    dettagli: ["Lo stesso percorso tecnico, per chi vuole praticare con continuità senza dover gareggiare."],
  },
  {
    id: "adulti", nome: "Adulti", eta: "adulti", min: 18, max: 99, gare: "no", segno: "18+", turno: "19:00",
    breve: "Per chi ha già praticato e per chi parte da zero: preparazione fisica, tecnica accurata, storia e cultura della disciplina.",
    dettagli: [
      "Lo studio è commisurato alle potenzialità di ognuno in base a età e struttura.",
      "Adatto sia a chi ha trascorsi agonistici nel karate o in altre discipline, sia a chi non ha mai praticato alcuna attività.",
      "Curiamo la preparazione fisica senza tralasciare la tecnica, affrontando anche i risvolti culturali e storici della disciplina.",
    ],
  },
  {
    id: "specifico", nome: "Specifico esami e gare", eta: "su indicazione", min: 8, max: 99, gare: "si", segno: "型",
    breve: "Preparazione mirata agli esami di grado e alle competizioni.",
    dettagli: ["Un corso dedicato per preparare esami di grado e gare, su indicazione degli insegnanti."],
  },
  {
    id: "kata", nome: "Approfondimento kata", eta: "avanzato", min: 14, max: 99, gare: "tutti", segno: "道",
    breve: "Lo studio dei kata superiori, per chi ha già esperienza.",
    dettagli: ["Un corso avanzato di approfondimento dei kata, per chi ha già una buona base tecnica."],
  },
  {
    id: "mga", nome: "Difesa personale MGA", eta: "dai 15 anni", min: 15, max: 99, gare: "no", segno: "護身", turno: "da concordare",
    breve: "Metodo Globale Autodifesa: difesa personale pratica per adulti, uomini e donne, anche senza esperienza.",
    dettagli: [
      "Il Metodo Globale Autodifesa insegna a riconoscere e gestire le situazioni di pericolo con tecniche semplici ed efficaci.",
      "Il corso si attiva con almeno 2 partecipanti: scrivici per sapere quando parte il prossimo gruppo.",
    ],
  },
];

// Orari ricavati dal registro presenze della stagione 2025/26: da confermare a inizio stagione
export const orari = {
  giorni: ["Lunedì", "Martedì", "Giovedì", "Venerdì"],
  turni: [
    { ora: "18:00", per: "Bambini e ragazzi", eta: "6 – 14 anni" },
    { ora: "19:00", per: "Ragazzi grandi e adulti", eta: "dai 14 anni" },
  ],
  nota: "Si sceglie quante volte venire: da 1 a 4 lezioni a settimana.",
};

export const numeri = { allievi: "Quasi 90", cintureNere: staff.length, maestri5dan: staff.filter((p) => p.dan === 5).length };

export const fasce = [
  { titolo: "6 – 7 anni", testo: "Concetti base con un approccio ludico, curando la coordinazione motoria e spaziale." },
  { titolo: "8 – 14 anni", testo: "Postura e tecnica, kata di base e kumite, all'inizio con bersagli fittizi." },
  { titolo: "Dai 14 anni", testo: "Kata di base e superiori, kumite tra allievi con le protezioni, preparazione atletica." },
  { titolo: "Adulti", testo: "Pratica su misura per età e struttura, con preparazione fisica, tecnica, storia e cultura." },
];

export const dojoKun = [
  { kanji: "人格", titolo: "Cerca di perfezionare il tuo carattere.", testo: "Il karate allena il corpo per formare la persona.", romaji: "Hitotsu, jinkaku kansei ni tsutomuru koto" },
  { kanji: "誠", titolo: "Difendi la via della sincerità.", testo: "Essere leali con gli altri e con se stessi, dentro e fuori dal dojo.", romaji: "Hitotsu, makoto no michi o mamoru koto" },
  { kanji: "努力", titolo: "Coltiva lo spirito dell'impegno.", testo: "La costanza conta più del talento: ogni lezione è un passo.", romaji: "Hitotsu, doryoku no seishin o yashinau koto" },
  { kanji: "礼儀", titolo: "Rispetta gli altri.", testo: "Il saluto apre e chiude ogni allenamento: rispetto per il maestro, i compagni e il luogo.", romaji: "Hitotsu, reigi o omonzuru koto" },
  { kanji: "血気", titolo: "Trattieni la violenza.", testo: "Chi sa combattere impara per primo a non farlo.", romaji: "Hitotsu, kekki no yū o imashimuru koto" },
];

export const waLink = (numero: string, testo?: string) =>
  `https://wa.me/${numero}${testo ? `?text=${encodeURIComponent(testo)}` : ""}`;

export const provaWhatsApp = waLink(contatti.principale.wa, "Ciao Gabriele, vorrei informazioni sui corsi e prenotare una lezione di prova di karate. Grazie!");
export const telLink = (numero: string) => `tel:+${numero}`;

export const dataItaliana = (d: Date, opzioni: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  d.toLocaleDateString("it-IT", { ...opzioni, timeZone: "Europe/Rome" });
