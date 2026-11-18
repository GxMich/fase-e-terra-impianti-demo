import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

/* Sito multipagina: ogni file HTML è un ingresso a sé.
   Ogni indirizzo ha i suoi meta, i link profondi funzionano su hosting
   condiviso senza regole di rewrite, e non si paga il bundle di un router.
   Per aggiungere una pagina: modifica scripts/genera-pagine.mjs, rilancialo,
   e aggiungi la voce qui sotto. */
const pagine = [
  'index', 'fotovoltaico', 'servizi', 'lavori', 'chi-sono', 'contatti', 'privacy',
];

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: Object.fromEntries(
        pagine.map((p) => [p, resolve(import.meta.dirname, `${p}.html`)])
      ),
    },
  },
});
