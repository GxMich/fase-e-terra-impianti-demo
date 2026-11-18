import { Etichetta } from './elementi';

/**
 * Scheda intervento: il dispositivo di marca.
 * Compare già nella prima schermata, perché è la prova —
 * non una promessa da mantenere più in basso.
 */
export default function SchedaIntervento({ scheda, elevata = false }) {
  const righe = [
    ['Dove', scheda.dove],
    ['Com’era', scheda.situazione],
    ['Cos’ho fatto', scheda.fatto],
    ['Durata', scheda.durata],
    ['Consegnato', scheda.consegnato],
  ];

  return (
    <article
      className={`overflow-hidden rounded-[var(--radius-scheda)] border border-linea
        bg-calce-alta ${elevata ? 'shadow-alta' : 'shadow-lieve'}`}
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-linea bg-calce-bassa px-5 py-3">
        <Etichetta>Scheda intervento</Etichetta>
        <span className="font-display text-[0.8rem] font-semibold tabular-nums [font-stretch:85%] text-ghisa-media">
          № {scheda.numero}
        </span>
      </div>
      <dl className="divide-y divide-linea-tenue">
        {righe.map(([voce, valore]) => (
          <div key={voce} className="grid gap-1 px-5 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
            <dt className="pt-0.5">
              <Etichetta>{voce}</Etichetta>
            </dt>
            <dd className="m-0 text-[0.94rem] leading-[1.5] text-ghisa-media">{valore}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
