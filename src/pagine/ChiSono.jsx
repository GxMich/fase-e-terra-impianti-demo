import Impianto, { Testata } from '../Impianto';
import Persona from '../components/Persona';
import Metodo from '../components/Metodo';
import Richiamo from '../components/Richiamo';
import { Contenitore, Sezione, TitoloSezione } from '../components/elementi';

const principi = [
  {
    titolo: 'Preventivi scritti',
    testo:
      'Dettagliati, con i materiali indicati per modello. Se durante i lavori salta fuori un imprevisto ne parliamo prima di procedere, non a fattura fatta.',
  },
  {
    titolo: 'Sicurezza prima dell’estetica',
    testo:
      'Un impianto che funziona non è per forza un impianto sicuro. Verifiche strumentali, protezioni corrette e documentazione a norma fanno parte del lavoro, non sono un extra da pagare a parte.',
  },
  {
    titolo: 'Tempi dichiarati',
    testo:
      'Ti dico quando inizio e quando finisco. Se qualcosa slitta lo sai subito: il tuo cantiere non è l’unico, ma quando sono lì sono lì.',
  },
  {
    titolo: 'Dico anche i no',
    testo:
      'Se una cosa non conviene farla, te lo dico. Se il fotovoltaico sul tuo tetto non rientra in tempi ragionevoli, lo scopri prima del preventivo.',
  },
];

export default function ChiSono() {
  return (
    <Impianto>
      <Testata
        briciola="Chi sono"
        titolo="Una ditta di una persona sola, e si vede in meglio"
        guida="Chi fa il sopralluogo è la stessa persona che esegue il lavoro e che risponde al telefono sei mesi dopo. Nessun centralino, nessun passaggio di consegne."
      />

      <Persona />

      <Sezione fondo="calce">
        <Contenitore>
          <TitoloSezione guida="Quattro cose su cui non tratto. Non sono valori da brochure: sono il motivo per cui i clienti mi richiamano.">
            Come lavoro
          </TitoloSezione>
          <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
            {principi.map((p) => (
              <div key={p.titolo}>
                <h3 className="font-display text-[1.2rem] font-bold [font-stretch:90%]
                  leading-tight tracking-[-0.02em] text-ghisa">
                  {p.titolo}
                </h3>
                <p className="mt-2.5 max-w-[52ch] text-[0.96rem] leading-[1.6] text-ghisa-media">
                  {p.testo}
                </p>
              </div>
            ))}
          </div>
        </Contenitore>
      </Sezione>

      <Metodo />
      <Richiamo
        titolo="Il modo migliore per capirsi è il sopralluogo"
        testo="È gratuito e non impegna a niente. In mezz’ora sul posto si capisce più che in tre telefonate."
      />
    </Impianto>
  );
}
