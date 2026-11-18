import { Contenitore, Sezione, Etichetta } from './elementi';
import { azienda } from '../data/contenuti';

/**
 * Il vantaggio strutturale di una ditta individuale è che
 * il titolare è il servizio. Qui si dice in prima persona.
 */
export default function Persona() {
  const dati = [
    ['Ragione sociale', azienda.ragioneSociale],
    ['Partita IVA', `${azienda.partitaIva} (fittizia)`],
    ['Sede', azienda.indirizzo],
    ['Attiva dal', `Giugno ${azienda.annoInizio}`],
  ];

  return (
    <Sezione id="titolare" fondo="alta">
      <Contenitore>
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <figure className="m-0">
            <div className="overflow-hidden rounded-[var(--radius-scheda)] border border-linea shadow-media">
              <img
                src="./img/elettricista-presa.jpg"
                alt="Elettricista che misura una linea con il multimetro dentro un quadro"
                loading="lazy"
                width="900"
                height="1600"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.8rem] leading-[1.45] text-ghisa-tenue">
              Foto illustrativa da Pexels: il titolare di questa ditta di fantasia non esiste.
            </figcaption>
          </figure>

          <div>
            <h2 className="font-display text-[length:var(--text-titolo)] font-bold
              [font-stretch:88%] leading-[1.06] tracking-[-0.025em] text-balance text-ghisa">
              Sono io che vengo, e sono io che rispondo dopo
            </h2>

            <div className="misura mt-6 grid gap-4 text-[1.01rem] leading-[1.62] text-ghisa-media">
              <p>
                Ho aperto la ditta nel {azienda.annoInizio}, dopo dieci anni da dipendente in
                un’impresa di impianti. Lavoro da solo: chi viene a fare il sopralluogo è la stessa
                persona che tira i cavi, chiude il quadro e ti richiama sei mesi dopo se serve
                una presa in più.
              </p>
              <p>
                Quasi tutti i clienti arrivano dal passaparola. Il sito serve a chi non mi conosce:
                qui trova cosa faccio, come lavoro e quali carte gli lascio a fine lavoro.
              </p>
              <p>
                Se una cosa non conviene farla, te lo dico. Se il fotovoltaico sul tuo tetto non
                rientra in tempi ragionevoli, te lo dico prima del preventivo, non dopo.
              </p>
            </div>

            <dl className="mt-9 grid gap-x-8 gap-y-4 border-t border-linea pt-6 sm:grid-cols-2">
              {dati.map(([voce, valore]) => (
                <div key={voce}>
                  <dt><Etichetta>{voce}</Etichetta></dt>
                  <dd className="m-0 mt-1 text-[0.93rem] leading-[1.45] text-ghisa-media">
                    {valore}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Contenitore>
    </Sezione>
  );
}
