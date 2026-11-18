import { FileText, Phone } from 'lucide-react';
import { Contenitore, Bottone } from './elementi';
import { azienda } from '../data/contenuti';

/**
 * Fascia di chiusura per le pagine che non ospitano il modulo.
 * Fondo ghisa: nel sistema compare solo qui e nel piè di pagina,
 * ed è per questo che pesa.
 */
export default function Richiamo({
  titolo = 'Parliamone davanti al lavoro',
  testo = 'Sopralluogo e preventivo scritto sono gratuiti e non impegnano a niente. Ti rispondo entro un giorno lavorativo.',
}) {
  return (
    <section className="bg-calce py-16 md:py-20">
      <Contenitore>
        <div className="grid items-center gap-8 rounded-[var(--radius-scheda)] bg-ghisa p-8 shadow-media md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="max-w-[20ch] font-display text-[length:var(--text-sottotit)] font-bold
              [font-stretch:88%] leading-[1.14] tracking-[-0.02em] text-balance text-calce-alta
              md:text-[2rem]">
              {titolo}
            </h2>
            <p className="mt-3 max-w-[52ch] text-[0.98rem] leading-[1.55] text-calce-bassa">
              {testo}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Bottone href="contatti.html" icona={FileText}>
              Chiedi un preventivo
            </Bottone>
            <Bottone
              href={`tel:${azienda.telefonoHref}`}
              variante="chiaro"
              icona={Phone}
            >
              Chiama
            </Bottone>
          </div>
        </div>
      </Contenitore>
    </section>
  );
}
