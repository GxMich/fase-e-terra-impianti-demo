import { useState } from 'react';
import { Check, AlertCircle, Send, Phone, Mail, MapPin } from 'lucide-react';
import { Contenitore, Sezione, Bottone, Etichetta } from './elementi';
import { azienda, fotovoltaico, serviziMinori } from '../data/contenuti';

const opzioni = [
  fotovoltaico.titolo.split(' ').slice(0, 1).join(' '),
  ...serviziMinori.map((s) => s.titolo),
  'Guasto o urgenza',
  'Non so ancora',
];

const vuoto = { nome: '', telefono: '', email: '', servizio: '', messaggio: '' };

function Campo({ id, etichetta, errore, obbligatorio, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.88rem] font-semibold text-ghisa">
        {etichetta}
        {obbligatorio && <span className="ml-1 text-rame" aria-hidden="true">*</span>}
      </label>
      {children}
      {errore && (
        <p
          id={`${id}-errore`}
          className="mt-1.5 flex items-start gap-1.5 text-[0.82rem] leading-[1.4] text-segnale"
        >
          <AlertCircle size={14} strokeWidth={2} className="mt-[2px] shrink-0" aria-hidden="true" />
          {errore}
        </p>
      )}
    </div>
  );
}

const stileCampo = (haErrore) =>
  `w-full rounded-lg border bg-calce px-3.5 py-2.5 text-[1rem] text-ghisa
   placeholder:text-ghisa-tenue/70 transition-[border-color,box-shadow] duration-150
   focus:bg-calce-alta focus:outline-none focus:ring-[3px]
   ${haErrore
      ? 'border-segnale focus:border-segnale focus:ring-segnale/20'
      : 'border-linea focus:border-rame focus:ring-rame/20'}`;

export default function Preventivo() {
  const [dati, setDati] = useState(vuoto);
  const [errori, setErrori] = useState({});
  const [stato, setStato] = useState('pronto'); // pronto | invio | inviato | errore

  const cambia = (campo) => (e) => {
    setDati((d) => ({ ...d, [campo]: e.target.value }));
    if (errori[campo]) setErrori((x) => ({ ...x, [campo]: null }));
  };

  const valida = () => {
    const e = {};
    if (!dati.nome.trim()) e.nome = 'Serve un nome per poterti richiamare.';
    if (!dati.telefono.trim()) e.telefono = 'Il telefono è il modo più veloce per risponderti.';
    else if (dati.telefono.replace(/\D/g, '').length < 8)
      e.telefono = 'Questo numero sembra incompleto.';
    if (dati.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dati.email))
      e.email = 'Controlla l’indirizzo: manca qualcosa.';
    if (!dati.messaggio.trim()) e.messaggio = 'Scrivi due righe su cosa ti serve.';
    return e;
  };

  const invia = (ev) => {
    ev.preventDefault();
    const e = valida();
    setErrori(e);
    if (Object.keys(e).length) {
      const primo = document.getElementById(Object.keys(e)[0]);
      primo?.focus();
      return;
    }

    setStato('invio');
    // Sito dimostrativo: il modulo valida i campi e mostra la conferma, ma non invia niente.
    // In un sito vero qui partirebbe la richiesta verso un servizio di invio moduli.
    setTimeout(() => setStato('inviato'), 600);
  };

  const recapiti = [
    { Icona: Phone, voce: 'Telefono', valore: azienda.telefono, href: `tel:${azienda.telefonoHref}` },
    { Icona: Mail, voce: 'Email', valore: azienda.email, href: null },
    { Icona: MapPin, voce: 'Sede', valore: azienda.indirizzo, href: null },
  ];

  return (
    <Sezione id="preventivo" fondo="calce">
      <Contenitore>
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[length:var(--text-titolo)] font-bold
              [font-stretch:88%] leading-[1.06] tracking-[-0.025em] text-balance text-ghisa">
              Raccontami il lavoro
            </h2>
            <p className="misura mt-5 text-[length:var(--text-guida)] leading-[1.55] text-ghisa-media">
              Sopralluogo e preventivo scritto sono gratuiti e non impegnano a niente.
              Più dettagli mi dai — metratura, stato dell’impianto, tempi — più la
              risposta è precisa dal primo scambio.
            </p>

            <dl className="mt-10 grid gap-5">
              {recapiti.map(({ Icona, voce, valore, href }) => (
                <div key={voce} className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-rame-tenue text-rame">
                    <Icona size={18} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <div>
                    <dt><Etichetta>{voce}</Etichetta></dt>
                    <dd className="m-0 mt-0.5 text-[0.97rem] font-semibold text-ghisa">
                      {href ? (
                        <a href={href} className="text-ghisa no-underline hover:text-rame hover:underline">
                          {valore}
                        </a>
                      ) : valore}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[var(--radius-scheda)] border border-linea bg-calce-alta p-6 shadow-media md:p-8">
            {stato === 'inviato' ? (
              <div className="py-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-terra-tenue text-terra">
                  <Check size={26} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[1.3rem] font-bold [font-stretch:90%] text-ghisa">
                  Richiesta pronta
                </h3>
                <p className="mx-auto mt-2.5 max-w-[38ch] text-[0.95rem] leading-[1.55] text-ghisa-media">
                  Questo è un sito dimostrativo: il modulo funziona, ma la richiesta non è stata
                  inviata a nessuno e i dati non sono stati salvati.
                </p>
                <Bottone
                  as="button"
                  type="button"
                  variante="fantasma"
                  className="mt-6"
                  onClick={() => { setDati(vuoto); setStato('pronto'); }}
                >
                  Scrivi un’altra richiesta
                </Bottone>
              </div>
            ) : (
              <form onSubmit={invia} noValidate className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Campo id="nome" etichetta="Nome e cognome" obbligatorio errore={errori.nome}>
                    <input
                      id="nome" name="nome" type="text" autoComplete="name"
                      value={dati.nome} onChange={cambia('nome')}
                      aria-invalid={!!errori.nome}
                      aria-describedby={errori.nome ? 'nome-errore' : undefined}
                      className={stileCampo(!!errori.nome)} placeholder="Mario Rossi"
                    />
                  </Campo>
                  <Campo id="telefono" etichetta="Telefono" obbligatorio errore={errori.telefono}>
                    <input
                      id="telefono" name="telefono" type="tel" autoComplete="tel"
                      value={dati.telefono} onChange={cambia('telefono')}
                      aria-invalid={!!errori.telefono}
                      aria-describedby={errori.telefono ? 'telefono-errore' : undefined}
                      className={stileCampo(!!errori.telefono)} placeholder="333 1234567"
                    />
                  </Campo>
                </div>

                <Campo id="email" etichetta="Email (se preferisci scriverti)" errore={errori.email}>
                  <input
                    id="email" name="email" type="email" autoComplete="email"
                    value={dati.email} onChange={cambia('email')}
                    aria-invalid={!!errori.email}
                    aria-describedby={errori.email ? 'email-errore' : undefined}
                    className={stileCampo(!!errori.email)} placeholder="mario.rossi@email.it"
                  />
                </Campo>

                <Campo id="servizio" etichetta="Di cosa hai bisogno">
                  <select
                    id="servizio" name="servizio" value={dati.servizio}
                    onChange={cambia('servizio')} className={stileCampo(false)}
                  >
                    <option value="">Scegli…</option>
                    {opzioni.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Campo>

                <Campo id="messaggio" etichetta="Due righe sul lavoro" obbligatorio errore={errori.messaggio}>
                  <textarea
                    id="messaggio" name="messaggio" rows={5}
                    value={dati.messaggio} onChange={cambia('messaggio')}
                    aria-invalid={!!errori.messaggio}
                    aria-describedby={errori.messaggio ? 'messaggio-errore' : undefined}
                    className={`${stileCampo(!!errori.messaggio)} resize-y`}
                    placeholder="Villetta di 120 mq a Montebrina, impianto anni Ottanta da mettere a norma. Vorrei valutare anche il fotovoltaico sul tetto a sud."
                  />
                </Campo>

                <Bottone
                  as="button"
                  type="submit"
                  icona={Send}
                  disabled={stato === 'invio'}
                  className="w-full"
                >
                  {stato === 'invio' ? 'Un attimo…' : 'Manda la richiesta'}
                </Bottone>

                <p className="text-[0.82rem] leading-[1.45] text-ghisa-tenue">
                  I campi con <span className="text-rame">*</span> sono obbligatori. Uso i tuoi
                  dati solo per risponderti: niente newsletter, niente liste.
                </p>
              </form>
            )}
          </div>
        </div>
      </Contenitore>
    </Sezione>
  );
}
