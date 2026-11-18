import { Contenitore, Sezione, TitoloSezione } from './elementi';
import { metodo } from '../data/contenuti';

/**
 * Qui la numerazione porta informazione: è una sequenza reale,
 * e l'ordine è esattamente ciò che il cliente vuole sapere.
 */
export default function Metodo() {
  return (
    <Sezione id="metodo" fondo="calce">
      <Contenitore>
        <TitoloSezione guida="Quattro passaggi, sempre gli stessi. Così sai in ogni momento a che punto siamo e cosa succede dopo.">
          Come lavoro
        </TitoloSezione>

        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {metodo.map((p, i) => (
            <li key={p.titolo} className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full
                    bg-ghisa font-display text-[0.92rem] font-bold tabular-nums
                    [font-stretch:88%] text-rame"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                {i < metodo.length - 1 && (
                  <span
                    className="hidden h-px flex-1 bg-linea lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className="mt-5 font-display text-[1.14rem] font-bold [font-stretch:92%]
                leading-tight tracking-[-0.015em] text-ghisa">
                {p.titolo}
              </h3>
              <p className="mt-2 text-[0.93rem] leading-[1.55] text-ghisa-media">
                {p.testo}
              </p>
            </li>
          ))}
        </ol>
      </Contenitore>
    </Sezione>
  );
}
