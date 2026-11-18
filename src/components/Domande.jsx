import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Contenitore, Sezione, TitoloSezione } from './elementi';
import { domande } from '../data/contenuti';

/**
 * Domande frequenti. Un solo pannello aperto per volta:
 * la pagina non salta sotto le dita mentre si legge.
 */
export default function Domande({ fondo = 'alta', quali = domande }) {
  const [aperta, setAperta] = useState(null);

  return (
    <Sezione id="domande" fondo={fondo}>
      <Contenitore>
        <TitoloSezione guida="Le cose che mi chiedono più spesso, con la risposta che darei al telefono.">
          Domande frequenti
        </TitoloSezione>

        <div className="mx-auto grid max-w-[52rem] gap-2.5">
          {quali.map((v, i) => {
            const apertaQui = aperta === i;
            return (
              <div
                key={v.d}
                className={`overflow-hidden rounded-[var(--radius-scheda)] border bg-calce-alta
                  transition-colors duration-200
                  ${apertaQui ? 'border-rame' : 'border-linea'}`}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setAperta(apertaQui ? null : i)}
                    aria-expanded={apertaQui}
                    aria-controls={`risposta-${i}`}
                    id={`domanda-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left
                      font-sans text-[1rem] font-semibold text-ghisa transition-colors
                      hover:bg-calce md:px-6"
                  >
                    {v.d}
                    <Plus
                      size={19}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={`shrink-0 text-rame transition-transform duration-300
                        [transition-timing-function:var(--ease-uscita)]
                        ${apertaQui ? 'rotate-45' : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={`risposta-${i}`}
                  role="region"
                  aria-labelledby={`domanda-${i}`}
                  hidden={!apertaQui}
                  className="px-5 pb-5 md:px-6"
                >
                  <p className="misura m-0 text-[0.96rem] leading-[1.6] text-ghisa-media">
                    {v.r}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Contenitore>
    </Sezione>
  );
}
