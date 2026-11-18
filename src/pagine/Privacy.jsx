import Impianto, { Testata } from '../Impianto';
import { Contenitore, Sezione } from '../components/elementi';
import { azienda } from '../data/contenuti';

const sezioni = [
  {
    t: 'Un sito dimostrativo',
    c: [
      `${azienda.ragioneSociale} è un’attività di fantasia: titolare, indirizzo (${azienda.indirizzo}), telefono ed email sono inventati. Il sito è una demo realizzata da Michele Modica (www.modicamichele.it).`,
    ],
  },
  {
    t: 'Quali dati raccoglie',
    c: [
      'Nessuno. Il modulo della pagina Contatti controlla i campi e mostra una conferma, ma non invia la richiesta a nessuno e non salva quello che scrivi.',
      'Il servizio che ospita queste pagine (GitHub Pages) può registrare nei propri log dati tecnici come l’indirizzo IP, secondo la propria informativa.',
    ],
  },
  {
    t: 'Cookie e strumenti di terze parti',
    c: [
      'Il sito non usa cookie, statistiche, pixel o banner pubblicitari. Al posto della mappa c’è un riquadro statico, quindi non viene caricato nessun servizio esterno.',
    ],
  },
  {
    t: 'In un sito vero',
    c: [
      'Qui andrebbero il titolare del trattamento, le finalità e le basi giuridiche, i tempi di conservazione, i destinatari e i diritti dell’interessato, scritti insieme al consulente privacy della ditta.',
    ],
  },
  {
    t: 'Crediti delle immagini',
    c: [
      'Le fotografie provengono da Unsplash e Pexels, con le rispettive licenze. L’elenco completo con autori e link è nel file CREDITI-FOTO.md del repository.',
    ],
  },
];

export default function Privacy() {
  return (
    <Impianto>
      <Testata
        briciola="Privacy e cookie"
        titolo="Come tratto i tuoi dati"
        guida="Informativa del sito dimostrativo: cosa succede ai dati di chi lo visita."
      />

      <Sezione fondo="calce">
        <Contenitore>
          <div className="misura">
            {sezioni.map((s, i) => (
              <section key={s.t} className={i > 0 ? 'mt-12' : ''}>
                <h2 className="font-display text-[1.32rem] font-bold [font-stretch:90%]
                  leading-tight tracking-[-0.02em] text-ghisa">
                  {s.t}
                </h2>
                {s.c.map((p, j) => (
                  <p key={j} className="mt-3 text-[1rem] leading-[1.65] text-ghisa-media">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Contenitore>
      </Sezione>
    </Impianto>
  );
}
