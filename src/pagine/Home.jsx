import Impianto from '../Impianto';
import PrimaSchermata from '../components/PrimaSchermata';
import GrigliaServizi from '../components/GrigliaServizi';
import Metodo from '../components/Metodo';
import Richiamo from '../components/Richiamo';
import { Contenitore, Sezione, TitoloSezione, Bottone } from '../components/elementi';
import SchedaIntervento from '../components/SchedaIntervento';
import { schede } from '../data/contenuti';

export default function Home() {
  return (
    <Impianto>
      <PrimaSchermata />
      <GrigliaServizi />

      <Sezione id="lavori" fondo="alta">
        <Contenitore>
          <TitoloSezione guida="Non ho una galleria di foto patinate. Ho l’elenco di quello che ho sistemato, con dentro cosa non andava e cosa ho lasciato al cliente.">
            Gli ultimi lavori
          </TitoloSezione>
          <div className="grid gap-5 md:grid-cols-2">
            {schede.slice(1, 3).map((s) => (
              <SchedaIntervento key={s.numero} scheda={s} />
            ))}
          </div>
          <div className="mt-9">
            <Bottone href="lavori.html" variante="fantasma">
              Vedi tutte le schede
            </Bottone>
          </div>
        </Contenitore>
      </Sezione>

      <Metodo />
      <Richiamo />
    </Impianto>
  );
}
