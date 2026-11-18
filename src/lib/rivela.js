import { useEffect, useRef } from 'react';

/* ============================================================
   COMPARSA ALLO SCROLL — versione attiva, 0 KB di dipendenze
   ------------------------------------------------------------
   Stesso risultato visivo della versione GSAP (`rivela-gsap.js`),
   con IntersectionObserver e una transizione CSS.

   Misurato su questo progetto:
     con GSAP + ScrollTrigger   105 KB gzip di JS sulla home
     con questa                  57 KB gzip

   GSAP vale i suoi 45 KB quando serve lo *scrubbing*, cioè
   un'animazione agganciata alla posizione della barra di scorrimento
   e reversibile fotogramma per fotogramma. Per una comparsa in
   entrata, una volta sola, non li vale. Se un domani servisse lo
   scrubbing, la sostituzione è una riga:

     import { useRivela } from '../lib/rivela-gsap';

   Regole comuni alle due versioni:
   1. Un solo osservatore per sezione, non uno per elemento.
   2. Una volta sola: allo scroll all'indietro non si ri-anima.
   3. Spostamento piccolo (18px), durata breve.
   4. Lo stato di partenza nel CSS è VISIBILE. La classe che
      nasconde la mette JS: senza JS il contenuto c'è comunque.
   5. `prefers-reduced-motion` esce prima di toccare il DOM.
   ============================================================ */

const RIDOTTO = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function rivelaInLotto(radice, opzioni = {}) {
  const { selettore = '[data-rivela]', scaglione = 70, margine = '0px 0px -12% 0px' } = opzioni;

  if (!radice || RIDOTTO() || !('IntersectionObserver' in window)) return () => {};

  const elementi = [...radice.querySelectorAll(selettore)];
  if (!elementi.length) return () => {};

  elementi.forEach((el) => el.classList.add('da-rivelare'));

  const osservatore = new IntersectionObserver(
    (voci) => {
      // Scaglionamento calcolato sul lotto entrato insieme, non
      // sull'indice globale: chi arriva dopo non eredita ritardi lunghi.
      const entrati = voci.filter((v) => v.isIntersecting);
      entrati.forEach((v, i) => {
        v.target.style.transitionDelay = `${i * scaglione}ms`;
        v.target.classList.add('rivelato');
        osservatore.unobserve(v.target);
      });
    },
    { rootMargin: margine, threshold: 0.08 }
  );

  elementi.forEach((el) => osservatore.observe(el));

  // Rete di sicurezza. Se dopo 1,5 s non è comparso niente, l'osservatore
  // non sta funzionando (pagina non composita, browser esotico, bug futuro):
  // meglio mostrare tutto subito che lasciare contenuto invisibile.
  // È il caso di guasto peggiore di questo pattern e va chiuso.
  const salvagente = setTimeout(() => {
    if (radice.querySelector('.rivelato')) return;
    elementi.forEach((el) => el.classList.add('rivelato'));
  }, 1500);

  return () => {
    clearTimeout(salvagente);
    osservatore.disconnect();
    // Se il componente si smonta a metà transizione, non lasciare
    // nodi bloccati nello stato nascosto.
    elementi.forEach((el) => {
      el.classList.remove('da-rivelare');
      el.style.transitionDelay = '';
    });
  };
}

/**
 * Hook React.
 *
 *   const rif = useRivela();
 *   <div ref={rif}><article data-rivela>…</article></div>
 */
export function useRivela(opzioni) {
  const rif = useRef(null);

  useEffect(() => {
    const pulisci = rivelaInLotto(rif.current, opzioni);
    return pulisci;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rif;
}
