import { useMemo, useState } from 'react';
import Impianto, { Testata } from '../Impianto';
import Richiamo from '../components/Richiamo';
import SchedaIntervento from '../components/SchedaIntervento';
import { Contenitore, Sezione } from '../components/elementi';
import { schede } from '../data/contenuti';

export default function Lavori() {
  const tipi = useMemo(
    () => ['Tutti', ...Array.from(new Set(schede.map((s) => s.tipo)))],
    []
  );
  const [filtro, setFiltro] = useState('Tutti');
  const visibili = filtro === 'Tutti' ? schede : schede.filter((s) => s.tipo === filtro);

  return (
    <Impianto>
      <Testata
        briciola="Lavori fatti"
        titolo="L’archivio degli interventi, non una galleria di foto"
        guida="Ogni lavoro che chiudo diventa una scheda: cosa c’era prima, cosa ho fatto, quanto è durato e cosa è rimasto in mano al cliente. È il modo più onesto che conosco per farti capire come lavoro."
      />

      <Sezione fondo="calce">
        <Contenitore>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtra per tipo di intervento">
            {tipi.map((t) => {
              const attivo = filtro === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFiltro(t)}
                  aria-pressed={attivo}
                  className={`rounded-full border px-4 py-2 text-[0.9rem] font-medium
                    transition-colors duration-150
                    ${attivo
                      ? 'border-ghisa bg-ghisa text-calce-alta'
                      : 'border-linea bg-calce-alta text-ghisa-media hover:border-ghisa hover:text-ghisa'}`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-[0.88rem] text-ghisa-tenue" aria-live="polite">
            {visibili.length} {visibili.length === 1 ? 'scheda' : 'schede'}
            {filtro !== 'Tutti' && ` di tipo “${filtro}”`}.
          </p>

          {visibili.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {visibili.map((s) => (
                <SchedaIntervento key={s.numero} scheda={s} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[var(--radius-scheda)] border border-dashed border-linea
              bg-calce-alta p-10 text-center">
              <p className="m-0 font-display text-[1.1rem] font-bold [font-stretch:90%] text-ghisa">
                Nessuna scheda di questo tipo, per ora
              </p>
              <p className="mx-auto mt-2 max-w-[42ch] text-[0.93rem] leading-[1.55] text-ghisa-media">
                L’archivio cresce a ogni lavoro chiuso. Se ti serve un intervento simile,
                chiedimi pure: te lo racconto al telefono.
              </p>
            </div>
          )}

          <p className="misura mt-10 text-[0.9rem] leading-[1.6] text-ghisa-tenue">
            Le schede partono dal numero 001 e crescono a ogni lavoro chiuso. Se stai
            valutando un intervento simile al tuo, chiedimi la scheda completa: te la mando
            com’è, con i numeri veri e senza ritocchi.
          </p>
        </Contenitore>
      </Sezione>

      <Richiamo
        titolo="Il tuo caso somiglia a una di queste?"
        testo="Mandami due righe e qualche foto: spesso basta quello per capire come muoversi e quanto può costare."
      />
    </Impianto>
  );
}
