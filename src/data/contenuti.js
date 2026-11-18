/* ============================================================
   Contenuti del sito.
   Stessa forma dei dati del pannello admin della v1: quando si
   collega il pannello, questo file viene rigenerato da lì.
   ============================================================ */

export const azienda = {
  // Attività di fantasia: nome, titolare, indirizzo e recapiti sono inventati.
  ragioneSociale: 'Fase e Terra Impianti',
  nomeBreve: 'Fase e Terra',
  titolare: 'Stefano',
  partitaIva: '00000000000',
  annoInizio: 2019,
  indirizzo: 'Via del Mulino 7, Montebrina (Piemonte)',
  citta: 'Montebrina',
  provincia: 'Piemonte',
  telefono: '+39 000 000 0000',
  telefonoHref: '+390000000000',
  email: 'info@fase-e-terra-impianti.example',
};

export const zone = [
  'Montebrina centro', 'Pieve', 'Molini', 'Cascine Basse',
  'Borgata Alta', 'Ronchi', 'Case Sparse', 'Zona artigianale',
];

export const navigazione = [
  { href: 'fotovoltaico.html', testo: 'Fotovoltaico' },
  { href: 'servizi.html', testo: 'Impianti e luce' },
  { href: 'lavori.html', testo: 'Lavori fatti' },
  { href: 'chi-sono.html', testo: 'Chi sono' },
  { href: 'contatti.html', testo: 'Contatti' },
];

/* Servizio principale: occupa la cella grande della griglia */
export const fotovoltaico = {
  id: 'fotovoltaico',
  titolo: 'Fotovoltaico dimensionato sulle tue bollette, non sul tuo tetto',
  sommario:
    'Partiamo dai consumi degli ultimi dodici mesi. Se i conti non tornano te lo dico prima di farti spendere un euro.',
  immagine: './img/cantiere-fotovoltaico.jpg',
  alt: 'Tecnico che posa un modulo fotovoltaico sul tetto di una casa',
  esempio: {
    contesto: 'Villetta in frazione Pieve, 4 persone, 4.100 kWh/anno',
    righe: [
      { voce: 'Potenza installata', valore: '4,2', unita: 'kWp' },
      { voce: 'Produzione stimata', valore: '4.900', unita: 'kWh/anno' },
      { voce: 'Autoconsumo con accumulo', valore: '71', unita: '%' },
      { voce: 'Rientro stimato', valore: '6,5', unita: 'anni' },
    ],
  },
  /* Contenuto della pagina dedicata */
  fasi: [
    {
      titolo: 'Leggo le tue bollette',
      testo:
        'Dodici mesi di consumi reali, divisi per fascia oraria. È da qui che esce la potenza giusta, non dai metri quadri di tetto disponibili.',
    },
    {
      titolo: 'Guardo il tetto',
      testo:
        'Esposizione, inclinazione, ombreggiamenti veri alle diverse ore. Salgo e misuro: le stime da satellite sbagliano di brutto sulle cascine.',
    },
    {
      titolo: 'Ti do due configurazioni',
      testo:
        'Una con accumulo e una senza, con produzione stimata e rientro per entrambe. Scegli sui numeri, non sulla mia parola.',
    },
    {
      titolo: 'Installo e allaccio',
      testo:
        'Moduli, inverter, eventuale batteria. Poi seguo la pratica di connessione con il distributore fino alla messa in servizio.',
    },
  ],
  verita: [
    {
      titolo: 'Quando conviene',
      testo:
        'Consumi sopra i 2.500 kWh l’anno, tetto esposto fra sud-est e sud-ovest, e qualcuno in casa di giorno o un accumulo che sposti l’energia alla sera.',
    },
    {
      titolo: 'Quando non conviene',
      testo:
        'Tetto a nord o pesantemente ombreggiato, consumi bassi, o una copertura da rifare entro pochi anni: prima si sistema il tetto, poi si parla di moduli.',
    },
    {
      titolo: 'Cosa non ti prometto',
      testo:
        'Bolletta a zero. L’allaccio resta, e i mesi bui producono poco. Ti do una stima annua e i mesi peggiori, così non ci sono sorprese a gennaio.',
    },
  ],
};

/* Servizi di supporto: celle minori, ognuna con un tipo di contenuto diverso */
export const serviziMinori = [
  {
    id: 'impianti-elettrici',
    titolo: 'Impianti elettrici',
    sommario: 'Nuovi impianti, rifacimenti e messa a norma per case, uffici e capannoni.',
    lavorazioni: [
      'Impianti completi per ristrutturazioni',
      'Quadri, salvavita e protezioni differenziali',
      'Messa a norma di impianti anni Ottanta',
      'Cablaggi industriali e linee di potenza',
    ],
    descrizione:
      'Progetto e realizzo impianti partendo da come si vive davvero la casa: quante prese servono dove, che carichi ci saranno, cosa conviene predisporre adesso per non rompere i muri fra cinque anni. Ogni intervento si chiude con le verifiche strumentali e la dichiarazione di conformità.',
    immagine: './img/quadro-elettrico.jpg',
    alt: 'Elettricista al lavoro su un quadro elettrico aperto',
  },
  {
    id: 'illuminazione',
    titolo: 'Illuminazione',
    sommario:
      'Studio della luce e posa di corpi illuminanti per interni, giardini e facciate.',
    immagine: './img/illuminazione.jpg',
    alt: 'Lampade a sospensione sopra il tavolo di una cucina',
    lavorazioni: [
      'Faretti a incasso, strip LED e sospensioni',
      'Illuminazione di giardini, vialetti e facciate',
      'Sensori di movimento e crepuscolari',
      'Lampade di emergenza e illuminazione di sicurezza',
    ],
    descrizione:
      'La luce giusta cambia come si vive una stanza e incide sulla bolletta più di quanto sembri. Ragiono su posizione, temperatura di colore e comandi, poi monto: dai faretti del controsoffitto ai proiettori del giardino.',
  },
  {
    id: 'manutenzione',
    titolo: 'Guasti e manutenzione',
    sommario: 'Ricerca guasti, riparazioni e controlli periodici per case e aziende.',
    immagine: './img/impianti-elettrici.jpg',
    alt: 'Mani che collegano una presa a parete con le pinze',
    lavorazioni: [
      'Ricerca guasti su impianti civili e industriali',
      'Sostituzione di prese, interruttori e punti luce',
      'Verifica dei quadri e serraggio dei collegamenti',
      'Controlli programmati per aziende e condomini',
    ],
    descrizione:
      'Un differenziale che scatta senza motivo, una presa che scalda, una linea che salta a ogni avvio del compressore. Sono i lavori che nessuno programma e che vanno risolti in fretta: a Montebrina e nelle frazioni cerco di intervenire in giornata.',
  },
];

/* Il dispositivo di marca: ogni lavoro è un documento, non una foto patinata */
export const schede = [
  {
    numero: '037',
    dove: 'Villetta anni Ottanta — frazione Pieve',
    situazione:
      'Quadro senza differenziale, sezioni sottodimensionate, nessuna documentazione.',
    fatto:
      'Nuovo quadro con protezioni separate, rifatte quattro linee critiche, mantenute le dorsali recuperabili.',
    durata: '3 giorni',
    consegnato: 'Dichiarazione di conformità DM 37/08 e schema del quadro',
    tipo: 'Impianto elettrico',
  },
  {
    numero: '041',
    dove: 'Capannone artigiano — zona artigianale di Montebrina',
    situazione:
      'Linea del compressore che faceva scattare il generale a ogni avvio.',
    fatto:
      'Separata la linea di potenza, sostituito il magnetotermico con curva adatta agli spunti.',
    durata: 'Mezza giornata',
    consegnato: 'Verifica strumentale e aggiornamento dello schema esistente',
    tipo: 'Guasto',
  },
  {
    numero: '045',
    dove: 'Cascina ristrutturata — Cascine Basse',
    situazione:
      'Tetto rifatto da poco, esposizione a sud, bollette da 2.900 kWh l’anno.',
    fatto:
      'Impianto da 3,6 kWp con accumulo da 5 kWh, predisposizione per la colonnina.',
    durata: '2 giorni',
    consegnato: 'Pratica di connessione e monitoraggio della produzione',
    tipo: 'Fotovoltaico',
  },
  {
    numero: '048',
    dove: 'Appartamento in centro — Montebrina',
    situazione:
      'Controsoffitto nuovo e nessuna predisposizione per i faretti già acquistati.',
    fatto:
      'Dodici punti luce a incasso su tre accensioni separate, dimmer sul soggiorno.',
    durata: '1 giorno e mezzo',
    consegnato: 'Schema delle accensioni e ricambi dei driver',
    tipo: 'Illuminazione',
  },
  {
    numero: '052',
    dove: 'Negozio di alimentari — frazione Molini',
    situazione:
      'Banco frigo su una linea condivisa con l’illuminazione, salti ricorrenti d’estate.',
    fatto:
      'Linea dedicata per i frigoriferi, quadro rifatto con protezioni separate per reparto.',
    durata: '2 giorni, lavorando dopo la chiusura',
    consegnato: 'Dichiarazione di conformità e schema per reparto',
    tipo: 'Impianto elettrico',
  },
];

/* Sequenza reale: qui la numerazione porta informazione */
export const metodo = [
  {
    titolo: 'Mi chiami',
    testo:
      'Mi racconti cosa serve. Se bastano due parole al telefono ti do già un’idea di massima.',
  },
  {
    titolo: 'Vengo a vedere',
    testo:
      'Sopralluogo sul posto: misuro, verifico l’esistente, guardo le bollette. Gratuito.',
  },
  {
    titolo: 'Ti scrivo il preventivo',
    testo:
      'Lavorazioni, materiali per modello, tempi e prezzo. Quello che leggi è quello che paghi.',
  },
  {
    titolo: 'Lavoro e ti consegno le carte',
    testo:
      'Eseguo nei tempi concordati e chiudo con verifiche e dichiarazione di conformità.',
  },
];

export const domande = [
  {
    d: 'Il sopralluogo e il preventivo sono davvero gratuiti?',
    r: 'Sì. Vengo a vedere il lavoro, prendo le misure e ti scrivo un preventivo dettagliato senza costi e senza impegno. Paghi solo se decidi di affidarmi l’intervento.',
  },
  {
    d: 'Cos’è la dichiarazione di conformità e quando serve?',
    r: 'È il documento previsto dal DM 37/2008 con cui certifico che l’impianto è fatto a regola d’arte. Serve per l’agibilità, per vendere o affittare casa e per molte pratiche con il distributore. La rilascio a fine lavori, inclusa nel prezzo.',
  },
  {
    d: 'Quanto costa un impianto fotovoltaico?',
    r: 'Dipende da potenza, tipo di tetto e presenza di un accumulo, per questo non pubblico listini. Dopo il sopralluogo e la lettura delle bollette ricevi un preventivo con produzione stimata e tempo di rientro: valuti sui numeri del tuo caso.',
  },
  {
    d: 'Lavori anche per aziende e condomini?',
    r: 'Sì. Faccio cablaggi, quadri e linee di potenza per capannoni e attività commerciali, e seguo controlli periodici programmati per condomini e aziende.',
  },
  {
    d: 'In quanto tempo intervieni per un guasto?',
    r: 'Rispondo entro un giorno lavorativo. Per i guasti che lasciano senza corrente cerco sempre di intervenire in giornata a Montebrina e nelle frazioni.',
  },
  {
    d: 'Posso avere le detrazioni fiscali?',
    r: 'Molti interventi di rifacimento, efficientamento e fotovoltaico rientrano nelle detrazioni previste. Ti dico quali requisiti servono e preparo la documentazione tecnica di mia competenza; per la parte fiscale conviene sempre sentire il commercialista.',
  },
];
