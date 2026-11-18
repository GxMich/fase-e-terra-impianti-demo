import Intestazione from './components/Intestazione';
import PiePagina from './components/PiePagina';
import { Contenitore } from './components/elementi';

/**
 * Impalcatura condivisa da tutte le pagine.
 * Il sito è multipagina: ogni file HTML monta questo con dentro
 * la propria pagina, così ogni indirizzo ha i suoi meta e il suo titolo.
 */
export default function Impianto({ children }) {
  return (
    <>
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]
          focus:rounded-b-lg focus:bg-rame focus:px-5 focus:py-3 focus:font-semibold focus:text-calce-alta"
      >
        Vai al contenuto
      </a>
      <Intestazione />
      <main id="contenuto">{children}</main>
      <PiePagina />
    </>
  );
}

/**
 * Testata delle pagine interne: briciole di pane, titolo, guida.
 * Nessuna sopra-etichetta: il titolo si regge da solo.
 */
export function Testata({ briciola, titolo, guida, azioni }) {
  return (
    <section className="border-b border-linea bg-calce-alta">
      <Contenitore className="py-14 md:py-20">
        <nav aria-label="Percorso" className="mb-5">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.85rem] text-ghisa-tenue">
            <li>
              <a href="index.html" className="text-ghisa-tenue no-underline hover:text-rame hover:underline">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ghisa-media">{briciola}</li>
          </ol>
        </nav>

        <h1 className="max-w-[22ch] font-display text-[length:var(--text-titolo)] font-bold
          [font-stretch:88%] leading-[1.04] tracking-[-0.03em] text-balance text-ghisa
          md:max-w-[26ch]">
          {titolo}
        </h1>

        {guida && (
          <p className="misura mt-5 text-[length:var(--text-guida)] leading-[1.55] text-ghisa-media">
            {guida}
          </p>
        )}

        {azioni && <div className="mt-8 flex flex-wrap gap-3">{azioni}</div>}
      </Contenitore>
    </section>
  );
}
