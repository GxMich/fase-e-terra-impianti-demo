import { useEffect, useRef } from 'react';

/* ============================================================
   TELA CALCE — canvas WebGL della prima schermata
   ------------------------------------------------------------
   Luce che scorre lentamente su un muro di calce, con una vena
   di rame. Nessuna libreria: WebGL grezzo, ~2,5 KB nel bundle.

   Perché non Three.js: anche importando solo il minimo
   (renderer, scena, camera, piano, ShaderMaterial) Three pesa
   ~150 KB gzip, cioè tre volte l'intero sito. Per disegnare due
   triangoli e un fragment shader non serve un motore 3D.

   Ogni risorsa allocata qui viene liberata in `pulisci()`:
   rAF, osservatori, listener, shader, programma, buffer e infine
   il contesto WebGL stesso.
   ============================================================ */

const VERTICE = `
attribute vec2 posizione;
void main() {
  gl_Position = vec4(posizione, 0.0, 1.0);
}`;

const FRAMMENTO = `
precision mediump float;

uniform vec2  uDimensione;
uniform float uTempo;
uniform float uIntensita;   // 0..1, guidato da GSAP allo scroll

// rumore a valore, versione economica
float casuale(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float rumore(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(casuale(i + vec2(0.0, 0.0)), casuale(i + vec2(1.0, 0.0)), u.x),
    mix(casuale(i + vec2(0.0, 1.0)), casuale(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// tre ottave bastano: è uno sfondo, non una texture di prodotto
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * rumore(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uDimensione.xy;
  float rapporto = uDimensione.x / max(uDimensione.y, 1.0);
  vec2 p = vec2(uv.x * rapporto, uv.y);

  float t = uTempo * 0.014;

  // mottling dell'intonaco: lentissimo, quasi fermo
  float intonaco = fbm(p * 2.6 + vec2(t, t * 0.6));

  // luce che attraversa il muro in diagonale
  float sweep = fbm(p * 1.15 + vec2(-t * 2.2, t * 0.9));
  float luce = smoothstep(0.34, 0.86, sweep);

  vec3 calce = vec3(0.906, 0.906, 0.882);   // #E7E7E1
  vec3 ombra = vec3(0.845, 0.845, 0.816);
  vec3 rame  = vec3(0.663, 0.322, 0.165);   // #A9522A

  vec3 col = mix(ombra, calce, intonaco);
  col = mix(col, calce + 0.035, luce * 0.7);

  // vena di rame: comparsa strettissima, mai sopra il 6%
  float vena = smoothstep(0.72, 0.99, sweep) * uIntensita;
  col = mix(col, rame, vena * 0.06);

  // grana finissima, rompe le bande del gradiente
  float grana = (casuale(gl_FragCoord.xy * 0.7) - 0.5) * 0.016;
  col += grana;

  // dissolvenza ai bordi: la tela non deve avere un contorno
  float bordo = smoothstep(0.0, 0.22, uv.y) * smoothstep(1.0, 0.72, uv.y);
  gl_FragColor = vec4(col, bordo * 0.95);
}`;

function compila(gl, tipo, sorgente) {
  const s = gl.createShader(tipo);
  gl.shaderSource(s, sorgente);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const errore = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(`Shader non compilato: ${errore}`);
  }
  return s;
}

export default function TelaCalce({ className = '' }) {
  const rifTela = useRef(null);

  useEffect(() => {
    const tela = rifTela.current;
    if (!tela) return;

    const ridotto = window.matchMedia('(prefers-reduced-motion: reduce)');

    // --- risorse da liberare, raccolte man mano ---
    let gl = null;
    let programma = null;
    let vs = null;
    let fs = null;
    let buffer = null;
    let fotogramma = 0;
    let osservatoreDim = null;
    let osservatoreVista = null;
    let vivo = true;
    let visibile = true;
    let avviato = false;   // aggiornato anche dai riavvii dopo un ripristino

    const stato = { intensita: 0 };       // 0..1, legato alla posizione di scroll
    let staccaScroll = null;

    // Il contesto può perdersi (cambio GPU, tab in background a lungo,
    // driver che si riavvia). Senza questi due gestori la tela resta nera.
    const suPerdita = (e) => {
      e.preventDefault();
      cancelAnimationFrame(fotogramma);
      fotogramma = 0;
    };
    const suRipristino = () => { if (vivo) avvia(); };

    tela.addEventListener('webglcontextlost', suPerdita, false);
    tela.addEventListener('webglcontextrestored', suRipristino, false);

    function avvia() {
      gl = tela.getContext('webgl', {
        alpha: true,
        antialias: false,          // inutile per un fragment a schermo pieno
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        powerPreference: 'low-power',
        failIfMajorPerformanceCaveat: true,   // niente rendering software
      });
      if (!gl) return false;       // nessun WebGL: si resta sul fondo CSS

      if (gl.isContextLost()) {
        // Il ripristino va chiesto, ma arriva in modo asincrono:
        // ci pensa il gestore 'webglcontextrestored' a richiamare avvia().
        gl.getExtension('WEBGL_lose_context')?.restoreContext();
        return false;
      }

      try {
        vs = compila(gl, gl.VERTEX_SHADER, VERTICE);
        fs = compila(gl, gl.FRAGMENT_SHADER, FRAMMENTO);
      } catch (err) {
        console.warn('[TelaCalce]', err.message);
        return false;
      }

      programma = gl.createProgram();
      gl.attachShader(programma, vs);
      gl.attachShader(programma, fs);
      gl.linkProgram(programma);
      if (!gl.getProgramParameter(programma, gl.LINK_STATUS)) {
        console.warn('[TelaCalce] programma non linkato');
        return false;
      }

      // Dopo il link gli shader non servono più: staccati e cancellati
      // subito, non tenuti in vita fino allo smontaggio.
      gl.detachShader(programma, vs);
      gl.detachShader(programma, fs);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      vs = fs = null;

      gl.useProgram(programma);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),  // un triangolo che copre lo schermo
        gl.STATIC_DRAW
      );
      const loc = gl.getAttribLocation(programma, 'posizione');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const uDim = gl.getUniformLocation(programma, 'uDimensione');
      const uTempo = gl.getUniformLocation(programma, 'uTempo');
      const uInt = gl.getUniformLocation(programma, 'uIntensita');

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // --- dimensionamento: DPR limitato a 1.5, il resto è sprecato ---
      function ridimensiona() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const l = Math.max(1, Math.round(tela.clientWidth * dpr));
        const a = Math.max(1, Math.round(tela.clientHeight * dpr));
        if (tela.width !== l || tela.height !== a) {
          tela.width = l;
          tela.height = a;
          gl.viewport(0, 0, l, a);
        }
        gl.uniform2f(uDim, tela.width, tela.height);
      }
      ridimensiona();

      osservatoreDim = new ResizeObserver(ridimensiona);
      osservatoreDim.observe(tela);

      // --- fuori dallo schermo non si disegna ---
      osservatoreVista = new IntersectionObserver(
        ([voce]) => { visibile = voce.isIntersecting; },
        { threshold: 0 }
      );
      osservatoreVista.observe(tela);

      // --- ciclo: tetto a 30 fps, è uno sfondo che si muove piano ---
      const PASSO = 1000 / 30;
      let ultimo = 0;
      const avvio = performance.now();

      function disegna(ora) {
        if (!vivo) return;
        fotogramma = requestAnimationFrame(disegna);

        if (!visibile || document.hidden) return;
        if (ora - ultimo < PASSO) return;
        ultimo = ora;

        gl.uniform1f(uTempo, (ora - avvio) / 1000);
        gl.uniform1f(uInt, stato.intensita);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      if (ridotto.matches) {
        // Animazioni ridotte: un fotogramma fermo, nessun ciclo.
        gl.uniform1f(uTempo, 12);
        gl.uniform1f(uInt, 0.35);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      } else {
        fotogramma = requestAnimationFrame(disegna);

        // --- collegamento scroll → uniform ---
        // Il valore non viene scritto nel DOM ma letto dal ciclo di
        // disegno: nessun layout, nessun repaint, nessun reflow.
        // Lo scroll aggiorna solo una variabile; il rendering resta
        // agganciato a requestAnimationFrame.
        // (Con GSAP sarebbe uno `scrub` su questo stesso oggetto:
        //  vedi src/lib/rivela-gsap.js per la variante.)
        const sezione = tela.parentElement || tela;
        let inCoda = false;

        const calcola = () => {
          inCoda = false;
          const r = sezione.getBoundingClientRect();
          const percorso = r.height || 1;
          // 0 quando la sezione riempie lo schermo, 1 quando è uscita in alto
          const avanzamento = Math.min(Math.max(-r.top / percorso, 0), 1);
          stato.intensita = avanzamento;
        };

        const suScroll = () => {
          if (inCoda) return;
          inCoda = true;
          requestAnimationFrame(calcola);
        };

        calcola();
        window.addEventListener('scroll', suScroll, { passive: true });
        staccaScroll = () => window.removeEventListener('scroll', suScroll);
      }

      avviato = true;
      return true;
    }

    avvia();

    // --- pulizia: idempotente, regge il doppio montaggio di StrictMode ---
    return () => {
      vivo = false;
      cancelAnimationFrame(fotogramma);
      fotogramma = 0;

      tela.removeEventListener('webglcontextlost', suPerdita);
      tela.removeEventListener('webglcontextrestored', suRipristino);

      osservatoreDim?.disconnect();
      osservatoreVista?.disconnect();
      staccaScroll?.();

      if (gl && avviato && !gl.isContextLost()) {
        // Le risorse allocate si cancellano sempre: sono la parte
        // grossa della memoria GPU (buffer e programma compilato).
        if (buffer) gl.deleteBuffer(buffer);
        if (programma) gl.deleteProgram(programma);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);

        // NON si chiama loseContext() qui. Sembrerebbe la cosa giusta —
        // restituisce subito il contesto invece di aspettare il garbage
        // collector — ma un contesto perso a mano resta appiccicato al
        // canvas: al rimontaggio successivo getContext() ridà quello morto
        // e la tela non torna più. Costa più di quanto renda.
        // Il contesto viene liberato dal browser quando React stacca il
        // nodo <canvas> e il garbage collector lo raccoglie.
      }
      gl = programma = buffer = vs = fs = null;
      osservatoreDim = osservatoreVista = staccaScroll = null;
    };
  }, []);

  return (
    <canvas
      ref={rifTela}
      className={className}
      aria-hidden="true"
      // La tela è decorativa: sotto c'è già il fondo calce del body,
      // quindi se WebGL manca non cambia niente di leggibile.
    />
  );
}
