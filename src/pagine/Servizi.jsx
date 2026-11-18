import { Check, Phone, FileText } from 'lucide-react';
import Impianto, { Testata } from '../Impianto';
import Domande from '../components/Domande';
import Richiamo from '../components/Richiamo';
import { Contenitore, Sezione, Bottone, Etichetta } from '../components/elementi';
import { useRivela } from '../lib/rivela';
import { azienda, serviziMinori, zone } from '../data/contenuti';

function Servizio({ servizio, indice }) {
  const pari = indice % 2 === 1;
  return (
    <article
      data-rivela
      id={servizio.id}
      className="grid scroll-mt-28 items-center gap-8 border-t border-linea py-12
        first:border-t-0 first:pt-0 md:gap-14 md:py-16 lg:grid-cols-2"
    >
      <div className={`overflow-hidden rounded-[var(--radius-scheda)] border border-linea
        shadow-media ${pari ? 'lg:order-2' : ''}`}>
        <img
          src={servizio.immagine}
          alt={servizio.alt}
          loading="lazy"
          width="960"
          height="640"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div>
        <h2 className="font-display text-[length:var(--text-sottotit)] font-bold
          [font-stretch:90%] leading-[1.14] tracking-[-0.02em] text-balance text-ghisa
          md:text-[2rem]">
          {servizio.titolo}
        </h2>
        <p className="misura mt-4 text-[1.02rem] leading-[1.6] text-ghisa-media">
          {servizio.descrizione}
        </p>
        <ul className="mt-7 grid gap-3">
          {servizio.lavorazioni.map((l) => (
            <li key={l} className="flex gap-3 text-[0.96rem] leading-[1.5] text-ghisa-media">
              <Check size={17} strokeWidth={2.2} className="mt-[3px] shrink-0 text-terra" aria-hidden="true" />
              {l}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Bottone href="contatti.html" variante="fantasma">
            Chiedi un preventivo
          </Bottone>
        </div>
      </div>
    </article>
  );
}

export default function Servizi() {
  const rifRivela = useRivela({ spostamento: 24, scaglione: 0.1 });

  return (
    <Impianto>
      <Testata
        briciola="Impianti e luce"
        titolo="Quello che faccio quando non sto sul tetto"
        guida="Impianti elettrici, illuminazione e guasti. Sono i tre lavori che si incrociano di continuo: seguirli con la stessa persona evita rimpalli e sopralluoghi doppi."
        azioni={
          <>
            <Bottone href="contatti.html" icona={FileText}>Chiedi un preventivo</Bottone>
            <Bottone href={`tel:${azienda.telefonoHref}`} variante="fantasma" icona={Phone}>
              {azienda.telefono}
            </Bottone>
          </>
        }
      />

      <Sezione fondo="calce">
        <Contenitore>
          <div ref={rifRivela}>
            {serviziMinori.map((s, i) => (
              <Servizio key={s.id} servizio={s} indice={i} />
            ))}
          </div>
        </Contenitore>
      </Sezione>

      {/* Urgenze: fondo ghisa, l'unico altro punto del sistema in cui compare */}
      <section className="bg-calce pb-16 md:pb-20">
        <Contenitore>
          <div className="flex flex-col items-start gap-6 rounded-[var(--radius-scheda)]
            bg-ghisa p-8 shadow-media md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-segnale opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-segnale" />
                </span>
                <Etichetta tono="calce">Urgenze</Etichetta>
              </div>
              <h2 className="mt-3 max-w-[22ch] font-display text-[length:var(--text-sottotit)]
                font-bold [font-stretch:88%] leading-[1.15] tracking-[-0.02em] text-balance text-calce-alta">
                Se sei senza corrente adesso, chiama e basta
              </h2>
              <p className="mt-2.5 max-w-[56ch] text-[0.95rem] leading-[1.5] text-calce-bassa">
                Nella zona di {azienda.citta} cerco di intervenire in giornata. Il modulo va
                bene per i lavori programmati, non per un guasto in corso.
              </p>
            </div>
            <Bottone href={`tel:${azienda.telefonoHref}`} variante="chiaro" icona={Phone} className="shrink-0">
              {azienda.telefono}
            </Bottone>
          </div>
        </Contenitore>
      </section>

      <Sezione fondo="alta" className="!py-16">
        <Contenitore>
          <h2 className="font-display text-[1.4rem] font-bold [font-stretch:90%]
            tracking-[-0.02em] text-ghisa">
            Dove intervengo
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {zone.map((z) => (
              <li key={z} className="rounded-[var(--radius-etichetta)] border border-linea
                bg-calce px-3 py-1.5 text-[0.88rem] text-ghisa-media">
                {z}
              </li>
            ))}
          </ul>
          <p className="misura mt-5 text-[0.9rem] leading-[1.55] text-ghisa-tenue">
            Abiti fuori Montebrina? Chiedi lo stesso: fuori zona valuto caso per caso,
            soprattutto per i lavori che durano più di una giornata.
          </p>
        </Contenitore>
      </Sezione>

      <Domande fondo="calce" />
      <Richiamo />
    </Impianto>
  );
}
