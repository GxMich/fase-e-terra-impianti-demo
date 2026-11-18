# Fase e Terra Impianti — sito dimostrativo

> **Attività di fantasia.** Fase e Terra Impianti non esiste: il titolare, l'indirizzo a Montebrina, il
> telefono, l'email, la partita IVA e gli interventi descritti sono inventati. Il dominio `.example` è
> riservato e non appartiene a nessuno. Tutte le pagine hanno `noindex` e `robots.txt` blocca i motori di
> ricerca. Sito realizzato da [Michele Modica](https://www.modicamichele.it).

Demo online: https://gxmich.github.io/fase-e-terra-impianti-demo/

## Cosa mostra

Il sito di un elettricista che lavora da solo e monta anche fotovoltaico, scritto in prima persona.

- **Identità "calce e rame"**: i colori vengono dai conduttori elettrici (rame per la fase, giallo-verde
  per la terra) invece che dal solito blu e giallo dei siti di categoria.
- **Schede intervento** al posto della galleria fotografica: per ogni lavoro dove, com'era, cosa è stato
  fatto, quanto è durato e cosa è stato consegnato.
- **Griglia dei servizi** a celle di contenuto diverso: un esempio di dimensionamento fotovoltaico, un
  elenco di lavorazioni, un'immagine, le zone servite, la fascia per le urgenze.
- **Pagina fotovoltaico** con il percorso in quattro passaggi e la parte che quasi nessuno scrive: quando
  conviene, quando non conviene, cosa non viene promesso.
- **Modulo di preventivo** con validazione e messaggi di errore accanto ai campi. È simulato: mostra la
  conferma ma non invia e non salva niente.
- **Prima schermata** con una texture di luce su calce disegnata in WebGL, senza librerie.

## Tecnologie

- React 18 e Vite 6, sito multipagina: sette file HTML, ognuno con i propri meta, senza router.
- Tailwind CSS 4 con i colori e le misure del sistema definiti come token in `src/index.css`.
- Canvas WebGL scritto a mano (circa 2,5 KB), comparsa allo scroll con IntersectionObserver.
- Icone Lucide, font Archivo e Public Sans in locale.
- Nessun backend, nessun cookie, nessun tracker. Pubblicato su GitHub Pages con GitHub Actions.

## Avvio in locale

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview
```

`vite.config.js` usa `base: './'`, quindi `dist/` funziona anche dentro una sottocartella.

## Dove modificare

- `src/data/contenuti.js`: dati della ditta, zone, servizi, schede intervento, metodo, domande frequenti.
- `src/pagine/`: una pagina per file. `src/components/`: le sezioni riutilizzate.
- `scripts/genera-pagine.mjs`: titoli e descrizioni delle pagine; rigenera i file HTML di ingresso.

Crediti delle immagini: [CREDITI-FOTO.md](CREDITI-FOTO.md).
