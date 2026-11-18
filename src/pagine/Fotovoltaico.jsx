import { FileText, Phone, Check, X, AlertTriangle } from 'lucide-react';
import Impianto, { Testata } from '../Impianto';
import Domande from '../components/Domande';
import Richiamo from '../components/Richiamo';
import SchedaIntervento from '../components/SchedaIntervento';
import { Contenitore, Sezione, TitoloSezione, Bottone, Etichetta } from '../components/elementi';
import { azienda, fotovoltaico as fv, schede, domande } from '../data/contenuti';

const iconeVerita = [Check, X, AlertTriangle];
const toniVerita = ['text-terra', 'text-segnale', 'text-rame'];

export default function Fotovoltaico() {
  const scheda = schede.find((s) => s.tipo === 'Fotovoltaico');

  return (
    <Impianto>
      <Testata
        briciola="Fotovoltaico"
        titolo="Prima leggo le bollette, poi guardo il tetto"
        guida="Un impianto ha senso quando è dimensionato sui consumi reali di chi ci abita. Se i conti non tornano te lo dico prima del preventivo, non dopo."
        azioni={
          <>
            <Bottone href="contatti.html" icona={FileText}>
              Fammi vedere le bollette
            </Bottone>
            <Bottone href={`tel:${azienda.telefonoHref}`} variante="fantasma" icona={Phone}>
              {azienda.telefono}
            </Bottone>
          </>
        }
      />

      {/* Il caso reale, in apertura: è la prova prima della spiegazione */}
      <Sezione fondo="calce">
        <Contenitore>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h2 className="font-display text-[length:var(--text-titolo)] font-bold
                [font-stretch:88%] leading-[1.06] tracking-[-0.025em] text-balance text-ghisa">
                Un impianto vero, con i suoi numeri
              </h2>
              <p className="misura mt-5 text-[length:var(--text-guida)] leading-[1.55] text-ghisa-media">
                {fv.esempio.contesto}. Questi non sono numeri da brochure: sono quelli
                usciti dal sopralluogo e dalle bollette di dodici mesi.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
                {fv.esempio.righe.map((r) => (
                  <div key={r.voce}>
                    <dt className="text-[0.8rem] leading-[1.3] text-ghisa-tenue">{r.voce}</dt>
                    <dd className="m-0 mt-1.5 font-display text-[2rem] font-bold leading-none
                      tabular-nums [font-stretch:88%] tracking-[-0.025em] text-ghisa">
                      {r.valore}
                      <span className="ml-1 text-[0.85rem] font-semibold text-ghisa-tenue">
                        {r.unita}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 overflow-hidden rounded-[var(--radius-scheda)] border border-linea shadow-media">
                <img
                  src={fv.immagine}
                  alt={fv.alt}
                  loading="lazy"
                  width="1280"
                  height="853"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            </div>

            {scheda && (
              <div>
                <SchedaIntervento scheda={scheda} elevata />
                <p className="mt-4 text-[0.86rem] leading-[1.5] text-ghisa-tenue">
                  La scheda dell’intervento da cui vengono quei numeri.
                </p>
              </div>
            )}
          </div>
        </Contenitore>
      </Sezione>

      {/* Le quattro fasi: sequenza reale, numerazione guadagnata */}
      <Sezione fondo="alta">
        <Contenitore>
          <TitoloSezione guida="Quattro passaggi nell’ordine in cui succedono. Il terzo è quello che quasi nessuno ti dà per iscritto.">
            Come arrivo al preventivo
          </TitoloSezione>
          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {fv.fasi.map((f, i) => (
              <li key={f.titolo}>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ghisa
                      font-display text-[0.92rem] font-bold tabular-nums [font-stretch:88%] text-rame"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {i < fv.fasi.length - 1 && (
                    <span className="hidden h-px flex-1 bg-linea lg:block" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-[1.14rem] font-bold [font-stretch:92%]
                  leading-tight tracking-[-0.015em] text-ghisa">
                  {f.titolo}
                </h3>
                <p className="mt-2 text-[0.93rem] leading-[1.55] text-ghisa-media">{f.testo}</p>
              </li>
            ))}
          </ol>
        </Contenitore>
      </Sezione>

      {/* Quando conviene / quando no: la sezione che nessun concorrente scrive */}
      <Sezione fondo="calce">
        <Contenitore>
          <TitoloSezione guida="Vendere un impianto a chi non gli serve è il modo più veloce per perdere un cliente e il passaparola che porta con sé.">
            Quando conviene e quando no
          </TitoloSezione>
          <div className="grid gap-5 md:grid-cols-3">
            {fv.verita.map((v, i) => {
              const Icona = iconeVerita[i];
              return (
                <article
                  key={v.titolo}
                  className="rounded-[var(--radius-scheda)] border border-linea bg-calce-alta
                    p-6 shadow-lieve md:p-7"
                >
                  <Icona
                    size={22}
                    strokeWidth={2}
                    className={toniVerita[i]}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-[1.16rem] font-bold [font-stretch:90%]
                    leading-tight tracking-[-0.015em] text-ghisa">
                    {v.titolo}
                  </h3>
                  <p className="mt-2.5 text-[0.94rem] leading-[1.55] text-ghisa-media">
                    {v.testo}
                  </p>
                </article>
              );
            })}
          </div>

          <p className="misura mt-8 flex items-start gap-2.5 rounded-lg border border-linea
            bg-calce-alta p-4 text-[0.9rem] leading-[1.55] text-ghisa-media">
            <Etichetta tono="terra" className="mt-0.5 shrink-0">Nota</Etichetta>
            <span>
              Molti interventi rientrano nelle detrazioni fiscali previste. Ti dico quali
              requisiti servono e preparo la documentazione tecnica di mia competenza; per la
              parte fiscale conviene sempre sentire il commercialista.
            </span>
          </p>
        </Contenitore>
      </Sezione>

      <Domande fondo="alta" quali={domande.filter((d) => /fotovoltaico|detrazioni|sopralluogo/i.test(d.d + d.r))} />

      <Richiamo
        titolo="Mandami una bolletta e una foto del tetto"
        testo="Con quelle due cose ti dico già se ha senso continuare. Il sopralluogo e il preventivo restano gratuiti."
      />
    </Impianto>
  );
}
