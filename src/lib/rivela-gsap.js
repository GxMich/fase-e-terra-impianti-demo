import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PATTERN DI COMPARSA ALLO SCROLL
   ------------------------------------------------------------
   Regole che questo pattern si dà, e il motivo:

   1. UNA sola animazione per sezione, in lotto (`batch`), non
      un trigger per elemento. Dieci card = un osservatore, non dieci.
   2. `once: true`. Il contenuto non ri-anima allo scroll all'indietro:
      la seconda volta è rumore, non informazione.
   3. Spostamento piccolo (18px) e durata breve. Serve a dire
      "questo blocco è arrivato", non a fare spettacolo.
   4. Parte da uno stato GIÀ VISIBILE nel CSS. Se GSAP non carica,
      se il JS fallisce o se l'utente ha le animazioni ridotte,
      il contenuto è lì. Nessun rischio di pagina bianca.
   5. `prefers-reduced-motion` esce subito senza registrare niente.

   Costo: ~35 KB gzip (gsap + ScrollTrigger). Se ti servisse solo
   questo, IntersectionObserver + una transizione CSS fanno lo stesso
   a costo zero — vedi `rivelaSenzaGsap` in fondo al file.
   ============================================================ */

const RIDOTTO = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Registra la comparsa in lotto per i figli marcati `[data-rivela]`
 * dentro `radice`. Restituisce la funzione di pulizia.
 */
export function rivelaInLotto(radice, opzioni = {}) {
  if (!radice || RIDOTTO()) return () => {};

  const {
    selettore = '[data-rivela]',
    spostamento = 18,
    durata = 0.62,
    scaglione = 0.07,
    inizio = 'top 88%',
  } = opzioni;

  // `gsap.context` raccoglie ogni animazione e ogni ScrollTrigger creato
  // qui dentro: una sola revert() li smonta tutti, senza dimenticanze.
  const ctx = gsap.context(() => {
    const elementi = gsap.utils.toArray(selettore);
    if (!elementi.length) return;

    ScrollTrigger.batch(elementi, {
      start: inizio,
      once: true,
      onEnter: (lotto) =>
        gsap.from(lotto, {
          y: spostamento,
          opacity: 0,
          duration: durata,
          ease: 'power2.out',
          stagger: scaglione,
          overwrite: true,
          // Non lasciare trasformazioni residue sul nodo a fine corsa:
          // un `transform` fermo crea un contesto di impilamento e
          // rompe `position: sticky` dei figli.
          clearProps: 'transform,opacity',
        }),
    });
  }, radice);

  return () => ctx.revert();
}

/**
 * Hook React. Lo `scope` limita i selettori al sottoalbero del ref,
 * così due sezioni non si rubano gli elementi a vicenda.
 *
 *   const rif = useRivela();
 *   <section ref={rif}><article data-rivela>…</article></section>
 */
export function useRivela(opzioni) {
  const rif = useRef(null);

  useEffect(() => {
    const pulisci = rivelaInLotto(rif.current, opzioni);
    // Le immagini pigre cambiano l'altezza della pagina dopo il primo
    // calcolo: un refresh al load rimette i trigger al posto giusto.
    const alCarico = () => ScrollTrigger.refresh();
    window.addEventListener('load', alCarico);

    return () => {
      window.removeEventListener('load', alCarico);
      pulisci();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rif;
}

/* ------------------------------------------------------------
   ALTERNATIVA A COSTO ZERO
   Stesso effetto senza GSAP: ~40 righe, 0 KB di dipendenze.
   Da usare se il budget di velocità conta più dello scrubbing.
   ------------------------------------------------------------ */
export function rivelaSenzaGsap(radice, selettore = '[data-rivela]') {
  if (!radice || RIDOTTO() || !('IntersectionObserver' in window)) return () => {};

  const elementi = [...radice.querySelectorAll(selettore)];
  elementi.forEach((el) => el.classList.add('da-rivelare'));

  const osservatore = new IntersectionObserver(
    (voci) => {
      const entrati = voci.filter((v) => v.isIntersecting);
      entrati.forEach((v, i) => {
        v.target.style.transitionDelay = `${i * 70}ms`;
        v.target.classList.add('rivelato');
        osservatore.unobserve(v.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
  );

  elementi.forEach((el) => osservatore.observe(el));
  return () => osservatore.disconnect();
}
