/* Genera i file HTML di ingresso e le entrate React del sito multipagina.
   Unica fonte di verità per titoli, descrizioni e indirizzi delle pagine. */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const radice = join(dirname(fileURLToPath(import.meta.url)), '..');

// Attività di fantasia: tutte le pagine hanno noindex (vedi il modello HTML qui sotto).
export const pagine = [
  { file: 'index', comp: 'Home', titolo: 'Fase e Terra Impianti — Fotovoltaico e impianti elettrici a Montebrina (sito dimostrativo)',
    desc: 'Sito dimostrativo di una ditta di impianti elettrici e fotovoltaici di fantasia a Montebrina. Sopralluogo e preventivo scritto gratuiti.' },
  { file: 'fotovoltaico', comp: 'Fotovoltaico', titolo: 'Impianti fotovoltaici a Montebrina — Fase e Terra Impianti',
    desc: 'Fotovoltaico dimensionato sui consumi reali: lettura delle bollette, sopralluogo sul tetto, due configurazioni con produzione stimata e rientro.' },
  { file: 'servizi', comp: 'Servizi', titolo: 'Impianti elettrici, illuminazione e guasti — Fase e Terra Impianti',
    desc: 'Nuovi impianti, messa a norma, illuminazione a LED e ricerca guasti per case e aziende. Dichiarazione di conformità inclusa.' },
  { file: 'lavori', comp: 'Lavori', titolo: 'Lavori fatti — le schede degli interventi | Fase e Terra Impianti',
    desc: 'L’archivio degli interventi: cosa c’era prima, cosa è stato fatto, quanto è durato e cosa è stato consegnato al cliente.' },
  { file: 'chi-sono', comp: 'ChiSono', titolo: 'Chi sono — Fase e Terra Impianti, elettricista a Montebrina',
    desc: 'Ditta individuale di fantasia. Chi fa il sopralluogo è la stessa persona che esegue il lavoro e che risponde al telefono dopo.' },
  { file: 'contatti', comp: 'Contatti', titolo: 'Contatti e preventivo gratuito — Fase e Terra Impianti, Montebrina',
    desc: 'Chiedi un preventivo scritto o segnala un guasto. Recapiti dimostrativi, modulo simulato.' },
  { file: 'privacy', comp: 'Privacy', titolo: 'Privacy e cookie — Fase e Terra Impianti', desc: 'Informativa del sito dimostrativo.' },
];

for (const p of pagine) {
  writeFileSync(join(radice, 'src', 'entrate', `${p.file}.jsx`),
`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Pagina from '../pagine/${p.comp}.jsx';
import '../index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pagina />
  </StrictMode>
);
`);

  writeFileSync(join(radice, `${p.file}.html`),
`<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${p.titolo}</title>
  <meta name="description" content="${p.desc}">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#E7E7E1">
  <link rel="icon" href="./favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${p.titolo}">
  <meta property="og:description" content="${p.desc}">
  <meta property="og:locale" content="it_IT">
  <link rel="preload" href="./fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="./fonts/public-sans.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/entrate/${p.file}.jsx"></script>
</body>
</html>
`);
}
console.log(`Generate ${pagine.length} pagine:`, pagine.map((p) => p.file).join(', '));
