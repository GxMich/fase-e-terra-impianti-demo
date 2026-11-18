import { Contenitore } from './elementi';
import { azienda, zone } from '../data/contenuti';

const colonne = [
  {
    titolo: 'Cosa faccio',
    voci: [
      ['Fotovoltaico', 'fotovoltaico.html'],
      ['Impianti elettrici', 'servizi.html#impianti-elettrici'],
      ['Illuminazione', 'servizi.html#illuminazione'],
      ['Guasti e manutenzione', 'servizi.html#manutenzione'],
    ],
  },
  {
    titolo: 'Il sito',
    voci: [
      ['Lavori fatti', 'lavori.html'],
      ['Chi sono', 'chi-sono.html'],
      ['Contatti', 'contatti.html'],
      ['Privacy e cookie', 'privacy.html'],
    ],
  },
];

export default function PiePagina() {
  return (
    <footer className="bg-ghisa text-calce-bassa">
      <div className="filo-terra" aria-hidden="true" />
      <Contenitore className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-[1.15rem] font-bold [font-stretch:90%] tracking-[-0.02em] text-calce-alta">
              {azienda.nomeBreve}
            </p>
            <p className="mt-3 max-w-[42ch] text-[0.92rem] leading-[1.6] text-calce-bassa/85">
              {azienda.titolare} — impianti elettrici e fotovoltaici a {azienda.citta} e
              nelle frazioni. Ditta individuale attiva dal {azienda.annoInizio}.
            </p>
            <div className="mt-6 grid gap-1.5 text-[0.92rem]">
              <a href={`tel:${azienda.telefonoHref}`} className="text-calce-alta no-underline hover:text-rame">
                {azienda.telefono}
              </a>
              <span className="text-calce-alta">{azienda.email}</span>
            </div>
          </div>

          {colonne.map((c) => (
            <nav key={c.titolo} aria-label={c.titolo}>
              <p className="font-display text-[0.7rem] font-semibold uppercase [font-stretch:80%] tracking-[0.13em] text-calce-bassa/60">
                {c.titolo}
              </p>
              <ul className="mt-4 grid gap-2.5">
                {c.voci.map(([testo, href]) => (
                  <li key={testo}>
                    <a href={href} className="text-[0.93rem] text-calce-alta no-underline hover:text-rame">
                      {testo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 text-[0.86rem] leading-[1.6] text-calce-bassa/70">
          Zone servite: {zone.join(' · ')}
        </p>

        <div className="mt-8 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-calce-bassa/15 pt-6 text-[0.84rem] text-calce-bassa/60">
          <span>
            Attività di fantasia: nomi, recapiti, prezzi e recensioni sono inventati. Sito
            dimostrativo realizzato da{' '}
            <a href="https://www.modicamichele.it" className="text-calce-alta underline hover:text-rame">Michele Modica</a>.
          </span>
          <span>{azienda.ragioneSociale} · {azienda.indirizzo}</span>
        </div>
      </Contenitore>
    </footer>
  );
}
