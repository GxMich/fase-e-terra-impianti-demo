import { Phone, FileText, MapPin } from 'lucide-react';
import { Contenitore, Bottone, Etichetta } from './elementi';
import TelaCalce from './TelaCalce';
import SchedaIntervento from './SchedaIntervento';
import { azienda, schede, zone } from '../data/contenuti';

export default function PrimaSchermata() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Sfondo WebGL: decorativo, sotto c'è già il fondo calce del body */}
      <TelaCalce className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      <Contenitore className="relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-28">
        <div>
          <h1
            className="posa font-display text-[length:var(--text-display)] font-bold
              [font-stretch:92%] leading-[0.98] tracking-[-0.035em] text-balance text-ghisa"
            style={{ animationDelay: '60ms' }}
          >
            Prima l’impianto sotto, poi i pannelli sul tetto.
          </h1>

          <p
            className="posa misura mt-7 text-[length:var(--text-guida)] leading-[1.55] text-ghisa-media"
            style={{ animationDelay: '180ms' }}
          >
            Sono {azienda.titolare}, elettricista a {azienda.citta} dal {azienda.annoInizio}.
            Rifaccio impianti elettrici e monto fotovoltaico partendo dalle bollette di chi abita
            la casa. Dal sopralluogo alla dichiarazione di conformità parli sempre con me.
          </p>

          <div
            className="posa mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: '280ms' }}
          >
            <Bottone href="contatti.html" icona={FileText}>
              Chiedi un preventivo scritto
            </Bottone>
            <Bottone href={`tel:${azienda.telefonoHref}`} variante="fantasma" icona={Phone}>
              {azienda.telefono}
            </Bottone>
          </div>

          <p
            className="posa mt-8 flex items-start gap-2.5 text-[0.9rem] leading-[1.5] text-ghisa-tenue"
            style={{ animationDelay: '360ms' }}
          >
            <MapPin size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-terra" aria-hidden="true" />
            <span>
              Lavoro a {azienda.citta} e nelle frazioni: {zone.slice(1, 5).join(', ')} e
              le case sparse.
            </span>
          </p>
        </div>

        <div className="posa" style={{ animationDelay: '440ms' }}>
          <SchedaIntervento scheda={schede[0]} elevata />
          <p className="mt-4 text-[0.86rem] leading-[1.5] text-ghisa-tenue">
            Ogni lavoro che chiudo diventa una scheda come questa. Nessuna foto di repertorio:
            cosa c’era, cosa ho fatto, cosa ti resta in mano.
          </p>
        </div>
      </Contenitore>

      <div className="filo-terra" aria-hidden="true" />
    </section>
  );
}
