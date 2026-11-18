import { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Contenitore, Bottone } from './elementi';
import { azienda, navigazione as voci } from '../data/contenuti';

/** Pagina corrente in un sito multipagina: confronto sul nome del file. */
function paginaCorrente() {
  if (typeof window === 'undefined') return 'index.html';
  const f = window.location.pathname.split('/').pop();
  return f === '' ? 'index.html' : f;
}

/**
 * Marchio: monogramma inciso, non il fulmine di categoria.
 * La C contiene una barra di rame che allude al conduttore.
 */
function Monogramma() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
      <rect width="40" height="40" rx="8" className="fill-ghisa" />
      <path
        d="M14 28V12h13"
        fill="none"
        className="stroke-calce-alta"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 20h10" className="stroke-rame" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Intestazione() {
  const [attaccato, setAttaccato] = useState(false);
  const [aperto, setAperto] = useState(false);
  const corrente = paginaCorrente();

  useEffect(() => {
    const suScroll = () => setAttaccato(window.scrollY > 8);
    suScroll();
    window.addEventListener('scroll', suScroll, { passive: true });
    return () => window.removeEventListener('scroll', suScroll);
  }, []);

  useEffect(() => {
    const suEsc = (e) => e.key === 'Escape' && setAperto(false);
    document.addEventListener('keydown', suEsc);
    return () => document.removeEventListener('keydown', suEsc);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-calce/85 backdrop-blur-md backdrop-saturate-150
        transition-[border-color,box-shadow] duration-300
        ${attaccato ? 'border-b border-linea shadow-lieve' : 'border-b border-transparent'}`}
    >
      <Contenitore className="flex min-h-[4.5rem] items-center gap-6">
        <a
          href="index.html"
          className="flex shrink-0 items-center gap-3 no-underline"
          aria-label="Fase e Terra Impianti, vai alla home"
        >
          <Monogramma />
          <span className="font-display text-[1.02rem] font-bold [font-stretch:90%] tracking-[-0.02em] leading-none text-ghisa">
            Fase e Terra
            <span className="mt-1 block font-sans text-[0.7rem] font-medium tracking-normal text-ghisa-tenue">
              Impianti · {azienda.citta}
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden lg:block" aria-label="Navigazione principale" id="nav-desktop">
          <ul className="flex items-center gap-1">
            {voci.map((v) => {
              const qui = v.href === corrente;
              return (
                <li key={v.href}>
                  <a
                    href={v.href}
                    aria-current={qui ? 'page' : undefined}
                    className={`block rounded-full px-3.5 py-2 text-[0.95rem] no-underline
                      transition-colors duration-150 hover:bg-calce-bassa hover:text-ghisa
                      ${qui ? 'bg-calce-bassa font-semibold text-ghisa' : 'font-medium text-ghisa-media'}`}
                  >
                    {v.testo}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* La visibilità sta sul contenitore: `hidden` e `inline-flex` sono
            entrambe utility di display e si annullerebbero a vicenda. */}
        <div className="hidden lg:block">
          <Bottone
            href={`tel:${azienda.telefonoHref}`}
            icona={Phone}
            className="!px-5 !py-2.5 !text-[0.9rem]"
          >
            Chiama {azienda.titolare}
          </Bottone>
        </div>

        <button
          type="button"
          onClick={() => setAperto((a) => !a)}
          aria-expanded={aperto}
          aria-controls="menu-mobile"
          className="ml-auto grid h-11 w-11 place-items-center rounded-lg border border-linea
            bg-calce-alta text-ghisa transition-colors hover:bg-calce-bassa lg:hidden"
        >
          <span className="sr-only">{aperto ? 'Chiudi il menu' : 'Apri il menu'}</span>
          {aperto ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </Contenitore>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!aperto}
        className="border-t border-linea bg-calce-alta lg:hidden"
      >
        <Contenitore className="py-4">
          <ul className="grid gap-1">
            {voci.map((v) => (
              <li key={v.href}>
                <a
                  href={v.href}
                  aria-current={v.href === corrente ? 'page' : undefined}
                  onClick={() => setAperto(false)}
                  className={`block border-b border-linea-tenue py-3.5 text-[1.05rem]
                    no-underline ${v.href === corrente ? 'font-bold text-rame' : 'font-medium text-ghisa'}`}
                >
                  {v.testo}
                </a>
              </li>
            ))}
          </ul>
          <Bottone
            href={`tel:${azienda.telefonoHref}`}
            icona={Phone}
            className="mt-5 w-full"
          >
            Chiama {azienda.titolare}
          </Bottone>
        </Contenitore>
      </div>
    </header>
  );
}
