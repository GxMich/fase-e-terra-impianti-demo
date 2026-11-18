import { ArrowRight, Check, Phone, Sun } from 'lucide-react';
import { Contenitore, Sezione, TitoloSezione, Bottone, Etichetta } from './elementi';
import { useRivela } from '../lib/rivela';
import { azienda, fotovoltaico, serviziMinori, zone } from '../data/contenuti';

/* Ogni cella della griglia porta un tipo di contenuto diverso:
   un calcolo, un elenco, un'immagine, una mappa di zone, un'azione.
   Non è la stessa scheda ripetuta a misure diverse. */

function CellaFotovoltaico() {
  const s = fotovoltaico;
  return (
    <article data-rivela
      id="fotovoltaico"
      className="group flex flex-col overflow-hidden rounded-[var(--radius-scheda)]
        border border-linea bg-calce-alta shadow-lieve transition-shadow duration-300
        hover:shadow-media lg:col-span-2 lg:row-span-2"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-calce-bassa lg:aspect-[16/8]">
        <img
          src={s.immagine}
          alt={s.alt}
          loading="eager"
          width="1280"
          height="853"
          className="h-full w-full object-cover transition-transform duration-700
            [transition-timing-function:var(--ease-uscita)] group-hover:scale-[1.03]"
        />
        <span
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full
            bg-calce-alta/95 px-3 py-1.5 shadow-lieve backdrop-blur-sm"
        >
          <Sun size={15} strokeWidth={1.9} className="text-rame" aria-hidden="true" />
          <Etichetta tono="rame">Servizio principale</Etichetta>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-display text-[length:var(--text-sottotit)] font-bold
          [font-stretch:90%] leading-[1.18] tracking-[-0.02em] text-balance text-ghisa">
          {s.titolo}
        </h3>
        <p className="mt-3 max-w-[52ch] text-[0.97rem] leading-[1.55] text-ghisa-media">
          {s.sommario}
        </p>

        {/* Un dimensionamento vero, non numeri da brochure */}
        <div className="mt-6 rounded-lg border border-linea bg-calce p-4 md:p-5">
          <Etichetta>Esempio di dimensionamento</Etichetta>
          <p className="mt-1.5 text-[0.88rem] text-ghisa-tenue">{s.esempio.contesto}</p>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {s.esempio.righe.map((r) => (
              <div key={r.voce}>
                <dt className="text-[0.76rem] leading-[1.3] text-ghisa-tenue">{r.voce}</dt>
                <dd className="m-0 mt-1 font-display text-[1.55rem] font-bold leading-none
                  tabular-nums [font-stretch:88%] tracking-[-0.02em] text-ghisa">
                  {r.valore}
                  <span className="ml-1 text-[0.78rem] font-semibold text-ghisa-tenue">
                    {r.unita}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <a
          href="contatti.html"
          className="mt-6 inline-flex items-center gap-2 self-start text-[0.95rem]
            font-semibold text-rame no-underline transition-colors hover:text-rame-scuro"
        >
          Facciamo il conto sul tuo tetto
          <ArrowRight
            size={17}
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </div>
    </article>
  );
}

function CellaElenco({ servizio }) {
  return (
    <article data-rivela
      className="flex flex-col rounded-[var(--radius-scheda)] border border-linea
        bg-calce-alta p-6 shadow-lieve transition-shadow duration-300
        hover:shadow-media md:p-7 lg:row-span-2"
    >
      <h3 className="font-display text-[1.28rem] font-bold [font-stretch:90%]
        leading-[1.2] tracking-[-0.02em] text-ghisa">
        {servizio.titolo}
      </h3>
      <p className="mt-2.5 text-[0.94rem] leading-[1.55] text-ghisa-media">
        {servizio.sommario}
      </p>
      <ul className="mt-6 grid gap-3">
        {servizio.lavorazioni.map((l) => (
          <li key={l} className="flex gap-2.5 text-[0.91rem] leading-[1.45] text-ghisa-media">
            <Check
              size={16}
              strokeWidth={2.2}
              className="mt-[3px] shrink-0 text-terra"
              aria-hidden="true"
            />
            {l}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CellaImmagine({ servizio }) {
  return (
    <article data-rivela
      className="group relative overflow-hidden rounded-[var(--radius-scheda)]
        border border-linea shadow-lieve transition-shadow duration-300 hover:shadow-media"
    >
      <img
        src={servizio.immagine}
        alt={servizio.alt}
        loading="lazy"
        width="960"
        height="620"
        className="h-full min-h-[13rem] w-full object-cover transition-transform duration-700
          [transition-timing-function:var(--ease-uscita)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ghisa/92 via-ghisa/55 to-transparent p-5 pt-14">
        <h3 className="font-display text-[1.16rem] font-bold [font-stretch:90%]
          leading-tight tracking-[-0.015em] text-calce-alta">
          {servizio.titolo}
        </h3>
        <p className="mt-1.5 text-[0.87rem] leading-[1.45] text-calce-bassa">
          {servizio.sommario}
        </p>
      </div>
    </article>
  );
}

function CellaZone() {
  return (
    <article data-rivela
      className="flex flex-col rounded-[var(--radius-scheda)] border border-linea
        bg-calce-alta p-6 shadow-lieve"
    >
      <Etichetta tono="terra">Dove arrivo</Etichetta>
      <p className="mt-2 font-display text-[1.16rem] font-bold [font-stretch:90%]
        leading-tight tracking-[-0.015em] text-ghisa">
        {azienda.citta} e frazioni
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {zone.map((z) => (
          <li
            key={z}
            className="rounded-[var(--radius-etichetta)] border border-linea
              bg-calce px-2.5 py-1 text-[0.8rem] text-ghisa-media"
          >
            {z}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.84rem] leading-[1.45] text-ghisa-tenue">
        Abiti appena fuori? Chiedi lo stesso, valuto caso per caso.
      </p>
    </article>
  );
}

function CellaUrgenza() {
  return (
    <article data-rivela
      className="flex flex-col items-start gap-6 rounded-[var(--radius-scheda)]
        bg-ghisa p-6 shadow-media md:flex-row md:items-center md:justify-between
        md:p-8 lg:col-span-4"
    >
      <div>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-segnale opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-segnale" />
          </span>
          <Etichetta tono="calce">Guasti e urgenze</Etichetta>
        </div>
        <h3 className="mt-3 font-display text-[length:var(--text-sottotit)] font-bold
          [font-stretch:88%] leading-[1.15] tracking-[-0.02em] text-balance text-calce-alta">
          Senza corrente adesso? Chiama, non compilare un modulo.
        </h3>
        <p className="mt-2.5 max-w-[58ch] text-[0.94rem] leading-[1.5] text-calce-bassa">
          Per i guasti che lasciano una casa o un’attività al buio cerco sempre di
          intervenire in giornata nella zona di {azienda.citta}.
        </p>
      </div>
      <Bottone
        href={`tel:${azienda.telefonoHref}`}
        variante="chiaro"
        icona={Phone}
        className="shrink-0"
      >
        {azienda.telefono}
      </Bottone>
    </article>
  );
}

export default function GrigliaServizi() {
  const rif = useRivela();

  return (
    <Sezione id="servizi" fondo="calce">
      <Contenitore>
        <TitoloSezione guida="Tre mestieri che si incrociano di continuo. Seguirli con la stessa persona evita rimpalli, doppi sopralluoghi e lavori rifatti due volte.">
          Cosa faccio
        </TitoloSezione>

        {/* Un solo osservatore in lotto per tutte e cinque le celle */}
        <div ref={rif} className="grid gap-4 md:gap-5 lg:grid-cols-4 lg:auto-rows-min">
          <CellaFotovoltaico />
          <CellaElenco servizio={serviziMinori[0]} />
          <CellaImmagine servizio={serviziMinori[1]} />
          <CellaZone />
          <CellaUrgenza />
        </div>
      </Contenitore>
    </Sezione>
  );
}
