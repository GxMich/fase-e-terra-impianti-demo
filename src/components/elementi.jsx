/* ============================================================
   Elementi condivisi.
   Primitivi minimi: contenitore, sezione, bottone, etichetta dato.
   ============================================================ */

export function Contenitore({ className = '', children }) {
  return (
    <div className={`mx-auto w-[min(100%-2.5rem,76rem)] ${className}`}>
      {children}
    </div>
  );
}

/**
 * Sezione con ritmo verticale coerente.
 * Lo spazio sopra un titolo è sempre maggiore di quello sotto:
 * il respiro appartiene allo stacco fra i blocchi, non al titolo.
 */
export function Sezione({ id, fondo = 'calce', className = '', children }) {
  const fondi = {
    calce: 'bg-calce',
    alta: 'bg-calce-alta',
    ghisa: 'bg-ghisa text-calce-alta',
  };
  return (
    <section
      id={id}
      className={`py-20 md:py-28 lg:py-32 ${fondi[fondo]} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Titolo di sezione. Nessuna sopra-etichetta: il titolo si regge da solo.
 */
export function TitoloSezione({ children, guida, className = '' }) {
  return (
    <header className={`mb-12 md:mb-16 ${className}`}>
      <h2 className="font-display text-[length:var(--text-titolo)] font-bold [font-stretch:88%] tracking-[-0.025em] text-balance leading-[1.06]">
        {children}
      </h2>
      {guida && (
        <p className="misura mt-5 text-[length:var(--text-guida)] leading-[1.5] text-ghisa-media">
          {guida}
        </p>
      )}
    </header>
  );
}

const varianti = {
  primario:
    'bg-rame text-calce-alta hover:bg-rame-scuro active:translate-y-0 hover:-translate-y-0.5 shadow-lieve hover:shadow-media',
  fantasma:
    'bg-transparent text-ghisa border border-linea hover:border-ghisa hover:bg-calce-alta active:translate-y-0 hover:-translate-y-0.5',
  chiaro:
    'bg-calce-alta text-ghisa hover:bg-white active:translate-y-0 hover:-translate-y-0.5 shadow-lieve hover:shadow-media',
};

export function Bottone({
  as = 'a',
  variante = 'primario',
  className = '',
  children,
  icona: Icona,
  disabled,
  ...resto
}) {
  const Tag = disabled ? 'button' : as;
  return (
    <Tag
      {...resto}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5
        font-sans text-[0.97rem] font-semibold no-underline
        transition-[background-color,box-shadow,transform,border-color] duration-200
        [transition-timing-function:var(--ease-uscita)]
        disabled:pointer-events-none disabled:opacity-45
        ${varianti[variante]} ${className}`}
    >
      {Icona && <Icona size={18} strokeWidth={1.75} aria-hidden="true" />}
      {children}
    </Tag>
  );
}

/**
 * Etichetta di un dato. Vive dentro schede e tabelle,
 * mai sopra un titolo di sezione.
 */
export function Etichetta({ children, tono = 'tenue', className = '' }) {
  const toni = {
    tenue: 'text-ghisa-tenue',
    terra: 'text-terra',
    rame: 'text-rame',
    calce: 'text-calce-bassa',
  };
  return (
    <span
      className={`font-display text-[0.68rem] font-semibold uppercase
        [font-stretch:80%] tracking-[0.13em] ${toni[tono]} ${className}`}
    >
      {children}
    </span>
  );
}
