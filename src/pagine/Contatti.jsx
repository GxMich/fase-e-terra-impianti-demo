import { Phone, Clock } from 'lucide-react';
import Impianto, { Testata } from '../Impianto';
import Preventivo from '../components/Preventivo';
import Domande from '../components/Domande';
import { Contenitore, Sezione, Bottone, Etichetta } from '../components/elementi';
import { azienda } from '../data/contenuti';

const orari = [
  ['Lunedì – Venerdì', '08:00 – 12:30 · 14:00 – 18:00'],
  ['Sabato', 'Su appuntamento'],
  ['Domenica', 'Chiuso'],
];

export default function Contatti() {
  return (
    <Impianto>
      <Testata
        briciola="Contatti"
        titolo="Scrivimi cosa ti serve"
        guida="Sopralluogo e preventivo scritto sono gratuiti e non impegnano a niente. Rispondo entro un giorno lavorativo."
      />

      {/* Urgenze in cima: chi ha un guasto non deve scorrere fino al modulo */}
      <section className="bg-calce pt-12 md:pt-16">
        <Contenitore>
          <div className="flex flex-col items-start gap-5 rounded-[var(--radius-scheda)]
            border-2 border-segnale bg-segnale-tenue p-6 md:flex-row md:items-center
            md:justify-between md:p-7">
            <div>
              <Etichetta className="!text-segnale">Hai un guasto adesso?</Etichetta>
              <p className="mt-2 max-w-[54ch] text-[0.98rem] leading-[1.5] text-ghisa">
                Non compilare il modulo: chiama. Nella zona di {azienda.citta} cerco di
                intervenire in giornata.
              </p>
            </div>
            <Bottone href={`tel:${azienda.telefonoHref}`} icona={Phone} className="shrink-0">
              {azienda.telefono}
            </Bottone>
          </div>
        </Contenitore>
      </section>

      <Preventivo />

      <Sezione fondo="alta">
        <Contenitore>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <h2 className="font-display text-[1.5rem] font-bold [font-stretch:90%]
                tracking-[-0.02em] text-ghisa">
                Quando mi trovi
              </h2>
              <table className="mt-5 w-full border-collapse text-[0.95rem]">
                <tbody>
                  {orari.map(([giorni, ore]) => (
                    <tr key={giorni} className="border-b border-linea last:border-b-0">
                      <th scope="row" className="py-3 text-left font-semibold text-ghisa">
                        {giorni}
                      </th>
                      <td className="py-3 text-right text-ghisa-media">{ore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 flex items-start gap-2.5 text-[0.88rem] leading-[1.5] text-ghisa-tenue">
                <Clock size={16} strokeWidth={1.9} className="mt-0.5 shrink-0 text-terra" aria-hidden="true" />
                <span>
                  Se chiamo io e non rispondi, riprovo. Se chiami tu e sono su un tetto,
                  ti richiamo appena scendo.
                </span>
              </p>
            </div>

            <div>
              <h2 className="font-display text-[1.5rem] font-bold [font-stretch:90%]
                tracking-[-0.02em] text-ghisa">
                Dove sono
              </h2>
              <p className="mt-3 text-[0.95rem] leading-[1.55] text-ghisa-media">
                {azienda.indirizzo}. È la sede della ditta, non un negozio aperto al
                pubblico: lavoro a domicilio in tutta la zona.
              </p>
              {/* Attività di fantasia: al posto della mappa c'è un riquadro statico, senza servizi esterni. */}
              <div
                className="mt-5 grid aspect-[16/10] w-full place-items-center rounded-[var(--radius-scheda)]
                  border border-linea bg-calce-bassa p-6 text-center"
              >
                <p className="max-w-[34ch] text-[0.9rem] leading-[1.5] text-ghisa-tenue">
                  Montebrina è un paese di fantasia: in un sito vero qui ci sarebbe la mappa della sede.
                </p>
              </div>
            </div>
          </div>
        </Contenitore>
      </Sezione>

      <Domande fondo="calce" />
    </Impianto>
  );
}
