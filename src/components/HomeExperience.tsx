"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CustomEase } from "gsap/CustomEase";
import { getDevice } from "@/lib/device";
import { runSplitting } from "@/lib/splitting";
import { refreshAOS, destroyAOS } from "@/lib/aos";
import { initMarquees } from "@/lib/marquee";
import type { Cleanup } from "@/lib/marquee";
import { initCursor } from "@/lib/cursor";
import { runLoader } from "@/lib/loader";
import { anclarArriba, revelarEntrada } from "@/lib/entrada";
import { initScrollState, initSectionWatcher } from "@/lib/scrollState";
import { initMenu } from "@/lib/menu";
import {
  initRevealOnEnter,
  initFooterReveal,
  protegerRevelados,
  refrescarAlCargarMedios,
} from "@/lib/reveal";
import type { Smoother } from "@/lib/menu";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);

declare global {
  interface Window {
    __gsap?: typeof gsap;
    __ScrollTrigger?: typeof ScrollTrigger;
  }
}

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  // Acceso desde la consola para depurar los triggers de scroll
  window.__gsap = gsap;
  window.__ScrollTrigger = ScrollTrigger;
}

type Animation = gsap.core.Timeline | gsap.core.Tween;

/* Estados de las "D" del hero: inset (%) + radios (vh).
   Cada número viaja en su propia variable CSS y el clip-path se compone en la hoja
   de estilos (ver .blob en globals.css). Dos motivos:
   - Animar el string completo no sirve: el navegador lo re-serializa y GSAP pierde
     la correspondencia de números al interpolar.
   - Escribirlo a mano desde un onUpdate tampoco: en cada refresh ScrollTrigger
     re-renderiza con los eventos suprimidos, el onUpdate no se dispara y la silueta
     se queda con lo último que alguien alcanzó a escribir —a mitad de camino— mientras
     el contenido sigue de largo. Animando variables, el estilo del elemento ES el
     objetivo y cualquier render lo deja bien. */
/* t/b son los insets de arriba y abajo (en vertical hacen falta: la D del logo ocupa
   la parte alta de la pantalla). `u` es la unidad de los radios: vh en apaisado, vw en
   vertical, donde el ancho es lo que manda. Dentro de una misma D todas las fases usan
   la misma unidad: GSAP no convierte unidades en una variable CSS. */
type ClipState = {
  t?: number;
  r: number;
  b?: number;
  l: number;
  tl: number;
  tr: number;
  br: number;
  bl: number;
  u?: "vh" | "vw";
};

type ClipName =
  | "leftFull"
  | "leftRounded"
  | "leftHero"
  | "rightHidden"
  | "rightHero"
  | "rightClaim"
  | "rightSplit"
  | "rightGone"
  | "left2Hidden"
  | "left2Split"
  | "left2Full";

/* Apaisado (desktop): las dos D se reparten el ancho. */
const CLIP: Record<ClipName, ClipState> = {
  leftFull: { r: 0, l: 0, tl: 0, tr: 0, br: 0, bl: 0 }, // rectángulo = fondo del loader
  leftRounded: { r: 0, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // cuadro 3
  leftHero: { r: 56, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // cuadro 5
  rightHidden: { r: 0, l: 100, tl: 0, tr: 0, br: 0, bl: 0 },
  rightHero: { r: 0, l: 46, tl: 50, tr: 0, br: 0, bl: 50 }, // cuadro 5
  rightClaim: { r: 0, l: 0, tl: 50, tr: 0, br: 0, bl: 50 }, // cuadro 7
  rightSplit: { r: 0, l: 52, tl: 50, tr: 0, br: 0, bl: 50 }, // cuadro 8
  rightGone: { r: 0, l: 100, tl: 50, tr: 0, br: 0, bl: 50 }, // la frase termina de irse a la derecha
  left2Hidden: { r: 100, l: 0, tl: 0, tr: 0, br: 0, bl: 0 },
  left2Split: { r: 51, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // cuadro 8
  left2Full: { r: 0, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // el panel se abre para "qué hacemos"
};

/* Vertical (teléfono y tablet), según la referencia móvil del diseñador.
 *
 * En apaisado las dos D se reparten el ANCHO; en vertical se reparten el ALTO, una
 * arriba y otra abajo, y por eso se miran: el blob de arriba es una D al revés
 * —redondeada a la izquierda y a sangre por la derecha— y el de abajo es una D
 * —a sangre por la izquierda y redondeada a la derecha—. En el reposo del hero el de
 * arriba lleva el titular y el de abajo el logotipo con el mail; al scrollear el de
 * abajo se va y el de arriba crece a toda la pantalla con la frase, que es el mismo
 * movimiento del apaisado girado 90 grados.
 *
 * Todas las siluetas dejan aire arriba (t: 3): el negro no llega al borde de la
 * pantalla. El botón de menú queda entonces sobre el crema y se pinta oscuro solo,
 * porque el tono de cada pieza del header se mide contra lo que tiene debajo
 * (initSectionWatcher). Antes de eso había que llevar el negro hasta el borde para que
 * el botón no se perdiera.
 *
 * Radios en vw: 26vw es el redondeo grande de la referencia y 29vw equivale al
 * --blob-radius de móvil (12rem). */
const MCLIP: Record<ClipName, ClipState> = {
  leftFull: { t: 0, r: 0, b: 0, l: 0, tl: 0, tr: 0, br: 0, bl: 0, u: "vw" }, // el fondo del loader
  leftRounded: {
    t: 3,
    r: 4,
    b: 3,
    l: 0,
    tl: 0,
    tr: 26,
    br: 26,
    bl: 0,
    u: "vw",
  }, // imagen 1: la D grande con el lockup
  leftHero: { t: 48, r: 7, b: 3, l: 0, tl: 0, tr: 26, br: 26, bl: 0, u: "vw" }, // imagen 2: el blob de abajo
  // El blob de arriba. Arranca sin alto (t + b = 100) y baja su borde inferior hasta el
  // 45% en la intro; después sigue bajando hasta el piso cuando entra la frase.
  rightHidden: {
    t: 3,
    r: 0,
    b: 97,
    l: 7,
    tl: 26,
    tr: 0,
    br: 0,
    bl: 26,
    u: "vw",
  },
  rightHero: { t: 3, r: 0, b: 55, l: 7, tl: 26, tr: 0, br: 0, bl: 26, u: "vw" }, // imagen 2: con el titular
  rightClaim: { t: 3, r: 0, b: 3, l: 7, tl: 26, tr: 0, br: 0, bl: 26, u: "vw" }, // imagen 4: crecido, con la frase
  rightSplit: {
    t: 3,
    r: 0,
    b: 3,
    l: 45,
    tl: 26,
    tr: 0,
    br: 0,
    bl: 26,
    u: "vw",
  }, // imagen 5: empieza a irse
  rightGone: {
    t: 3,
    r: 0,
    b: 3,
    l: 100,
    tl: 26,
    tr: 0,
    br: 0,
    bl: 26,
    u: "vw",
  },
  // "Qué hacemos" (imagen 7) ya estaba aprobado: el panel se abre a pantalla completa
  left2Hidden: {
    t: 0,
    r: 100,
    b: 0,
    l: 0,
    tl: 0,
    tr: 0,
    br: 29,
    bl: 0,
    u: "vw",
  },
  left2Split: { t: 0, r: 55, b: 0, l: 0, tl: 0, tr: 0, br: 29, bl: 0, u: "vw" },
  left2Full: { t: 0, r: 0, b: 0, l: 0, tl: 0, tr: 0, br: 29, bl: 0, u: "vw" },
};

/* Todo lo que cambia entre apaisado y vertical, junto. El resto de la secuencia
   —fases, tiempos, la secuencia de qué hacemos— es la misma. */
type Layout = {
  clip: Record<ClipName, ClipState>;
  /** Cómo sale de escena la D del logo cuando arranca el scroll */
  leftExit: gsap.TweenVars;
  /** De dónde a dónde se mueve el lockup durante la intro */
  logoFrom: gsap.TweenVars;
  logoTo: gsap.TweenVars;
  /** En apaisado la D derecha entra en la intro llevando el titular; en vertical el
   *  titular vive sobre el crema y la D derecha recién aparece con el scroll */
  rightEntersInIntro: boolean;
  /** Cómo sale la D del logo y cómo entra la tarjeta en la fase A (ver initHeroScroll) */
  exitEase: string;
  enterEase: string;
};

const DESKTOP: Layout = {
  clip: CLIP,
  // Se va desplazándose (no contrayéndose): contraerla dejaba una franja con forma
  // rara pegada al borde izquierdo.
  leftExit: { xPercent: -60 },
  logoFrom: { left: "50%" },
  logoTo: { left: "22%" },
  rightEntersInIntro: true,
  exitEase: "none",
  enterEase: "none",
};

const MOBILE: Layout = {
  clip: MCLIP,
  // Se va hacia abajo mientras el blob de arriba baja encima: el mismo cruce que en
  // apaisado, donde una sale por la izquierda y la otra crece desde la derecha.
  leftExit: { yPercent: 70 },
  // El lockup arranca centrado en la pantalla —para que el paso desde la D del loader
  // sea un fundido— y termina centrado en el blob de abajo, que va del 48% al 97%.
  logoFrom: { top: "50%" },
  logoTo: { top: "70%" },
  // Sí: en el diseño nuevo los dos blobs ya están en su lugar cuando termina la intro
  rightEntersInIntro: true,
  exitEase: "power2.in",
  enterEase: "power2.out",
};

function clipVars(s: ClipState): gsap.TweenVars {
  const u = s.u ?? "vh";
  return {
    "--ct": `${s.t ?? 0}%`,
    "--cr": `${s.r}%`,
    "--cb": `${s.b ?? 0}%`,
    "--cl": `${s.l}%`,
    "--ctl": `${s.tl}${u}`,
    "--ctr": `${s.tr}${u}`,
    "--cbr": `${s.br}${u}`,
    "--cbl": `${s.bl}${u}`,
  };
}

function setClip(selector: string, state: ClipState) {
  gsap.set(selector, clipVars(state));
}

/* Cada fase declara sus dos extremos. Es importante que los declare: si solo dijera
   "hasta acá", GSAP tomaría como punto de partida lo que dejó otra fase, y una "D"
   con varias fases (el panel izquierdo tiene dos, la D derecha tres) termina
   arrancando desde donde no debe en cuanto algo invalida la timeline. */
function clipTween(
  selector: string,
  from: ClipState,
  to: ClipState,
  vars: gsap.TweenVars = {},
): gsap.core.Tween {
  return gsap.fromTo(selector, clipVars(from), {
    ...clipVars(to),
    ...vars,
    immediateRender: false,
  });
}

/* ---------- "D" del loader y del menú: pulso suave ---------- */
function animateDMark(
  root: Element | null,
  timeScale = 1,
): gsap.core.Timeline | null {
  if (!root) return null;
  const d = root.querySelector(".d-mark__d");
  const hole = root.querySelector(".d-mark__hole");
  const ease = CustomEase.create("dmark-ease", "M0,0 C0.8,0 0.2,1 1,1");
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: { duration: 1.2, ease },
    paused: true,
  });
  tl.fromTo(d, { scale: 1 }, { scale: 1.06 }, 0);
  if (hole) tl.fromTo(hole, { scale: 2.3 }, { scale: 0.7 }, 0);
  tl.timeScale(timeScale);
  return tl;
}

/* ---------- secciones "pegadas" (pin) ----------
   `root` acota qué se fija: en vertical sólo el hero. Historia y proceso siguen
   revelándose al entrar, que en un teléfono se lee mejor que otro tramo fijado. */
function initSticky(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-sticky]").forEach((el) => {
    let start: string | (() => string) = el.dataset.start || "top top";
    let end: string | (() => string) = el.dataset.end || "bottom top";
    let trigger: Element | null = el.dataset.trigger
      ? document.querySelector(el.dataset.trigger)
      : el;
    if (el.dataset.trigger === "parent") trigger = el.parentElement;
    const endTrigger = el.dataset.endTrigger
      ? document.querySelector(el.dataset.endTrigger)
      : trigger;
    if (el.dataset.trigger === "parent") {
      start = () => "top top";
      end = () => `bottom-=${el.offsetHeight} top`;
    }
    ScrollTrigger.create({
      trigger,
      endTrigger,
      start,
      end,
      pin: el,
      pinSpacing: false,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });
  });
}

/* ---------- intro del hero (cuadros 2 → 5), en tiempo, tras el loader ---------- */

/** El hueco entre la D y "UTSILAND", tal como lo dejó el CSS antes de que la intro
 *  aplaste la máscara. Lo lee setHeroInitialState y lo devuelve playHeroIntro. */
let huecoLockup = "2.2vh";

function setHeroInitialState(layout: Layout) {
  const S = layout.clip;
  setClip(".blob-left", S.leftFull);
  setClip(".blob-right", S.rightHidden);
  setClip(".blob-left2", S.left2Hidden);
  gsap.set(".blob-left", { xPercent: 0, yPercent: 0 });
  gsap.set(".hero-logo", layout.logoFrom);
  // El hueco entre la D y "UTSILAND" lo fija el CSS y no vale lo mismo en apaisado que
  // en vertical, donde el lockup se mide contra el lado más chico (--d-hero). Se anota
  // antes de aplastar la máscara para que la intro lo devuelva tal cual; con un valor
  // escrito a mano acá, en vertical el lockup terminaba unos píxeles más ancho de lo
  // que el CSS había calculado para que entrara en el blob.
  const mascara = document.querySelector<HTMLElement>(".hero-logo__rest-mask");
  if (mascara) {
    // Se borra el inline ANTES de leer. React monta el efecto dos veces en desarrollo, y
    // sin esto la segunda lectura tomaba el 0 que había escrito la primera: el hueco
    // quedaba en cero y la D terminaba pegada a "UTSILAND".
    mascara.style.marginLeft = "";
    huecoLockup = getComputedStyle(mascara).marginLeft;
  }
  gsap.set(".hero-logo__rest-mask", { width: 0, marginLeft: 0 });
  gsap.set(".hero-mail", { autoAlpha: 0, y: "2rem" });
  gsap.set("#header", { autoAlpha: 0 });
  // El punto de partida del titular se declara acá con las dos componentes (yPercent
  // e y). Si se lo deja al `transform: translateY(100%)` del CSS, GSAP lo convierte a
  // píxeles y lo guarda en `y`: animar solo yPercent no mueve nada y las palabras
  // quedan abajo, tapadas por la máscara de .word.
  gsap.set(".hero-headline .word > span", { opacity: 0, yPercent: 100, y: 0 });
  // La frase arranca oculta en los dos layouts. En apaisado además lo dice el CSS; en
  // vertical no, y sin esto se vería dentro de la tarjeta apenas la tarjeta asoma.
  gsap.set(".hero-claim", { autoAlpha: 0, y: "6rem" });
}

function playHeroIntro(
  layout: Layout,
  onComplete: () => void,
): gsap.core.Timeline {
  const S = layout.clip;
  const mask = document.querySelector(".hero-logo__rest-mask");
  const rest = document.querySelector(".hero-logo__rest");
  const restWidth = rest ? rest.getBoundingClientRect().width : 0;
  const tl = gsap.timeline({ onComplete });
  // 1. el fondo negro del loader se vuelve una D gigante
  tl.add(
    clipTween(".blob-left", S.leftFull, S.leftRounded, {
      duration: 0.8,
      ease: "power2.inOut",
    }),
    0,
  );
  // 2. "UTSILAND" sale de atrás de la D
  tl.to(
    mask,
    {
      width: restWidth,
      marginLeft: huecoLockup,
      duration: 0.9,
      ease: "power3.out",
    },
    0.55,
  );
  // 3. la D se achica (a la izquierda en apaisado, hacia arriba en vertical) y, en
  //    apaisado, entra la D derecha con el titular
  tl.add(
    clipTween(".blob-left", S.leftRounded, S.leftHero, {
      duration: 1.1,
      ease: "power3.inOut",
    }),
    1.5,
  );
  tl.to(
    ".hero-logo",
    { ...layout.logoTo, duration: 1.1, ease: "power3.inOut" },
    1.5,
  );
  if (layout.rightEntersInIntro) {
    tl.add(
      clipTween(".blob-right", S.rightHidden, S.rightHero, {
        duration: 1.1,
        ease: "power3.inOut",
      }),
      1.6,
    );
  }
  // Mismo movimiento que tenía la animación CSS slide-up (1s, la misma curva y 70ms
  // de stagger), pero con GSAP: escribe estilos inline y no se reinicia cuando
  // ScrollTrigger re-inserta el hero fijado en cada refresh.
  tl.to(
    ".hero-headline .word > span",
    {
      opacity: 1,
      yPercent: 0,
      y: 0,
      duration: 1,
      stagger: 0.07,
      ease: CustomEase.create("headline-ease", "M0,0 C0.645,0.045 0.355,1 1,1"),
    },
    2.2,
  );
  tl.to(
    ".hero-mail",
    { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
    2.5,
  );
  tl.to("#header", { autoAlpha: 1, duration: 0.7, ease: "power2.out" }, 2.4);
  return tl;
}

/* La secuencia de "qué hacemos" se escribió con su propio ritmo de scroll (~485px por
   unidad). Metida en la timeline del hero, que corre a ~900px por unidad, hay que
   comprimirla con timeScale para que cada paso cueste el mismo scroll que antes. */
const SERVICES_TIMESCALE = 1.85;

/* Posición en la timeline del hero desde la que cada ancla tiene sentido: el menú las
   lee de data-hero-progress para saber a qué altura del tramo fijado saltar. */
function markHeroAnchor(selector: string, position: number, total: number) {
  const el = document.querySelector<HTMLElement>(selector);
  if (el) el.dataset.heroProgress = (position / total).toFixed(4);
}

/* ---------- scroll del hero (cuadros 5 → 8 + qué hacemos), fijado al scroll ----------
   Fase A: la frase entra. Fase B: se parte en dos D. Fase C: la frase termina de irse
   a la derecha y, mientras tanto, el panel negro de la izquierda se abre a todo el
   ancho y muestra adentro los tres frentes. Después sigue nuestra historia. */
function initHeroScroll(
  header: HTMLElement | null,
  layout: Layout,
): gsap.core.Timeline {
  const S = layout.clip;
  const base = { markers: false, anticipatePin: 1, invalidateOnRefresh: true };
  const t = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      ...base,
      onEnterBack: () => {
        if (header) header.dataset.getSection = "dark";
      },
    },
  });
  // Fase A: la D del logo sale de escena (hacia la izquierda en apaisado, hacia arriba
  // en vertical) y la D derecha ocupa el lugar y muestra la frase.
  // Las curvas no son decorativas en vertical: la tarjeta tiene que llegar al borde de
  // arriba ANTES de que la D termine de destaparlo, o queda una ventana en la que la
  // franja del header es crema de un lado y negra del otro, y el logo o el botón —que
  // se pintan de un solo tono— se pierden encima. La tarjeta entra apurada y la D se
  // toma su tiempo para irse, así siempre hay una de las dos cubriendo.
  t.to(
    ".blob-left",
    { ...layout.leftExit, duration: 1, ease: layout.exitEase },
    0,
  );
  t.add(
    clipTween(
      ".blob-right",
      layout.rightEntersInIntro ? S.rightHero : S.rightHidden,
      S.rightClaim,
      {
        duration: 1,
        ease: layout.enterEase,
      },
    ),
    0,
  );
  t.to(".hero-headline", { autoAlpha: 0, duration: 0.35, ease: "none" }, 0);
  t.to(".hero-mail", { autoAlpha: 0, duration: 0.3, ease: "none" }, 0);
  t.fromTo(
    ".hero-claim",
    { autoAlpha: 0, y: "6rem" },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      ease: "none",
      immediateRender: false,
    },
    0.55,
  );

  // Pausa: una vez que la frase terminó de entrar (en 1), la dejamos quieta un tramo
  // de scroll antes de que se parta. Así no se encadena de una con la Fase B: el
  // usuario sigue scrolleando pero la frase se queda leyéndose un momento. Subir HOLD
  // alarga esa pausa; bajarlo la acorta.
  const HOLD = 0.6;

  // Fase B: la frase se parte en dos D. El texto queda recortado por las siluetas,
  // nítido y sin desvanecer, como en el cuadro 8 del storyboard.
  t.add(
    clipTween(".blob-right", S.rightClaim, S.rightSplit, {
      duration: 1,
      ease: "none",
    }),
    1 + HOLD,
  );
  t.add(
    clipTween(".blob-left2", S.left2Hidden, S.left2Split, {
      duration: 1,
      ease: "none",
    }),
    1 + HOLD,
  );

  // Fase C: la frase termina de irse por la derecha y, mientras tanto, el panel negro
  // de la izquierda se abre a todo el ancho. Ese panel es el contenedor de "qué
  // hacemos": una vez abierto, los cuatro frentes se muestran adentro.
  const OPEN = 0.85;
  t.add(
    clipTween(".blob-right", S.rightSplit, S.rightGone, {
      duration: OPEN,
      ease: "power2.inOut",
    }),
    2 + HOLD,
  );
  t.add(
    clipTween(".blob-left2", S.left2Split, S.left2Full, {
      duration: OPEN,
      ease: "power2.inOut",
    }),
    2 + HOLD,
  );

  const servicesAt = 2 + HOLD + OPEN + 0.05;
  const services = buildServicesSequence();
  if (services) {
    services.timeScale(SERVICES_TIMESCALE);
    t.add(services, servicesAt);
  }

  const total = t.duration();
  markHeroAnchor('[data-ancla="servicios"]', servicesAt, total);

  return t;
}

/* ---------- Qué hacemos: los tres frentes se intercambian dentro del panel ----------
   No tiene scrollTrigger propio: devuelve una timeline suelta que initHeroScroll
   engancha a la del hero, porque "qué hacemos" vive dentro del panel izquierdo y
   comparte el mismo tramo fijado. */
/* El hueco donde se intercambian los frentes tiene que aguantar al más alto, y eso
   depende del ancho, del alto de la pantalla y de cuántas pastillas tenga cada uno:
   se mide en vivo y se vuelve a medir antes de cada refresh. El CSS sólo pone el piso
   (que en apaisado también cubre las cuatro filas del índice del cierre). */
let fitServicesStack: (() => number) | null = null;
let stackObserver: ResizeObserver | null = null;

function buildServicesSequence(): gsap.core.Timeline | null {
  const services = gsap.utils.toArray<HTMLElement>(".services-stack .service");
  if (!services.length) return null;
  const stack = document.querySelector<HTMLElement>(".services-stack");
  if (stack) {
    fitServicesStack = () => {
      stack.style.minHeight = "";
      const piso = parseFloat(getComputedStyle(stack).minHeight) || 0;
      const masAlto = Math.max(...services.map((s) => s.offsetHeight));
      const alto = Math.max(piso, masAlto);
      stack.style.minHeight = `${alto}px`;
      return alto;
    };
    let ultimo = fitServicesStack();
    ScrollTrigger.addEventListener("refreshInit", fitServicesStack);
    // Cuántas filas ocupan las pastillas depende del ancho del hueco, y ese ancho
    // cambia sin que nadie avise: la barra de scroll que aparece al terminar la intro,
    // la barra de direcciones del teléfono, un giro de pantalla. Cada vez que el hueco
    // cambia de tamaño se vuelve a medir; y si el alto resultante cambió, se refresca
    // ScrollTrigger para que el índice del cierre recalcule sus filas.
    stackObserver = new ResizeObserver(() => {
      if (!fitServicesStack) return;
      const alto = fitServicesStack();
      if (Math.abs(alto - ultimo) > 1) {
        ultimo = alto;
        ScrollTrigger.refresh();
      }
    });
    stackObserver.observe(stack);
  }

  // Alto de una fila del índice del cierre: con el detalle oculto, de cada frente
  // solo queda el número y el título. Se mide en vivo (y se recalcula en cada
  // refresh) porque el rem escala con el ancho de la ventana.
  const rowStep = () => {
    if (!stack) return 0;
    const first = services[0];
    const title = first.querySelector<HTMLElement>(".service__title");
    const pad = parseFloat(getComputedStyle(first).paddingTop) || 0;
    const natural =
      pad + (title ? title.offsetHeight : 0) + 2 + stack.offsetHeight * 0.05;
    // Repartido entre los frentes que haya: así las filas entran siempre, sean tres o cuatro
    return Math.min(natural, stack.offsetHeight / services.length);
  };

  // Estado inicial explícito, por el mismo motivo que en initHistoryScroll
  gsap.set(".services-head .section-kicker", { autoAlpha: 0, y: "2rem" });
  gsap.set(".services-title .word > span", { autoAlpha: 0, yPercent: 110 });
  gsap.set(".services-intro", { autoAlpha: 0, y: "3rem" });
  gsap.set(".services-cta", { autoAlpha: 0, y: "3rem" });
  // El que aparece y desaparece es el CONTENIDO de cada frente, no el frente entero: la
  // línea es hermana suya y se anima aparte. Si se desvaneciera con él, su trazado
  // quedaría tapado por el propio fundido y no se vería (ver más abajo).
  const contenido = (s: HTMLElement) =>
    s.querySelectorAll(".service__n, .service__body");
  services.forEach((s) => gsap.set(contenido(s), { autoAlpha: 0, y: "6rem" }));
  gsap.set(services, { y: 0 });
  gsap.set(".services-stack .pill", { autoAlpha: 0, y: "2rem" });
  // Estado inicial explícito también para la línea: un fromTo en posición > 0 dentro de
  // una timeline con scrub no aplica su "from" hasta que la playhead llega.
  gsap.set(".services-stack .service__line", { scaleX: 0 });

  const t = gsap.timeline();

  // Primero el encabezado
  t.to(
    ".services-head .section-kicker",
    { autoAlpha: 1, y: 0, duration: 0.3, ease: "none" },
    0,
  );
  t.to(
    ".services-title .word > span",
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.7,
      stagger: 0.05,
      ease: "power3.out",
    },
    0.15,
  );
  t.to(
    ".services-intro",
    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
    0.6,
  );

  // Después los frentes: entran de a uno y siempre en el mismo lugar.
  //
  // La línea abre cada frente: se traza sola de izquierda a derecha y el texto llega
  // atrás. Los cuatro frentes comparten lugar, así que sus cuatro líneas caen en el
  // mismo píxel: si la de uno se quedara dibujada, la del siguiente se trazaría encima
  // de una línea ya hecha y no se vería ningún trazado. Por eso cada una se retrae
  // cuando su frente se va, y la de al lado arranca de cero sobre el panel limpio.
  const start = 1.3;
  const hold = 1.1;
  services.forEach((service, i) => {
    const at = start + i * hold;
    const linea = service.querySelector(".service__line");
    t.to(linea, { scaleX: 1, duration: 0.6, ease: "power2.out" }, at);
    t.to(
      contenido(service),
      { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" },
      at + 0.2,
    );
    t.to(
      service.querySelectorAll(".pill"),
      { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
      at + 0.32,
    );
    if (i < services.length - 1) {
      t.to(
        contenido(service),
        { autoAlpha: 0, y: "-5rem", duration: 0.4, ease: "power2.in" },
        at + hold - 0.35,
      );
      t.to(
        linea,
        { scaleX: 0, duration: 0.4, ease: "power2.in" },
        at + hold - 0.35,
      );
    }
  });

  // Cierre: el detalle se repliega y los cuatro frentes se alinean como índice, así
  // la sección se ve completa (los cuatro juntos) y no suelta el pin a mitad de camino.
  // Acá cada fila llega con su línea trazándose: es el momento en que el índice se
  // arma, y es donde el trazado se lee mejor porque las cuatro quedan a la vista.
  const recap = start + services.length * hold + 0.25;
  t.to(
    ".services-stack .service__lead, .services-stack .services-pills",
    { autoAlpha: 0, duration: 0.35, ease: "power2.in" },
    recap,
  );
  services.forEach((service, i) => {
    const cuando = recap + 0.1 + i * 0.08;
    t.to(
      service,
      { y: () => i * rowStep(), duration: 0.7, ease: "power3.out" },
      cuando,
    );
    t.to(
      contenido(service),
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
      cuando,
    );
    // El último ya tiene la suya dibujada: es el frente que estaba en pantalla
    if (i < services.length - 1) {
      t.to(
        service.querySelector(".service__line"),
        { scaleX: 1, duration: 0.6, ease: "power2.out" },
        cuando,
      );
    }
  });
  t.to(
    ".services-cta",
    { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
    recap + 0.95,
  );
  // Tramo final quieto: deja leer los tres frentes antes de soltar el pin
  t.to({}, { duration: 0.8 });
  return t;
}

/* ---------- Cómo trabajamos: los seis pasos se encadenan de 01 a 06 ----------
   Cada paso traza su línea de izquierda a derecha y recién entonces sube su
   contenido, así se lee como un recorrido que avanza y no como seis bloques
   que aparecen juntos. */
function initProcess(
  pinned: boolean,
): gsap.core.Timeline | gsap.core.Timeline[] | null {
  const steps = gsap.utils.toArray<HTMLElement>(".home-process .step");
  if (!steps.length) return null;

  // Estado inicial explícito: dentro de una timeline un fromTo en posición > 0 no
  // aplica su "from" hasta que la playhead llega, y el texto se vería antes de entrar.
  const contents = steps.map((s) =>
    s.querySelectorAll(".step__n, .step__title, .step__text"),
  );
  contents.forEach((c) => gsap.set(c, { y: "3.2rem", autoAlpha: 0 }));

  const draw = (
    step: HTMLElement,
    content: NodeListOf<Element>,
    tl: gsap.core.Timeline,
    at: number,
    dur: number,
  ) => {
    tl.to(
      step.querySelector(".step__line"),
      { scaleX: 1, duration: dur * 0.55, ease: "power2.inOut" },
      at,
    );
    tl.to(
      content,
      {
        y: 0,
        autoAlpha: 1,
        duration: dur * 0.6,
        ease: "power3.out",
        stagger: dur * 0.06,
      },
      at + dur * 0.18,
    );
  };

  // Sin pin (móvil / tablet): cada paso se anima al entrar en pantalla. Con una sola
  // cascada, los últimos se animarían fuera de vista y el usuario los vería ya puestos.
  if (!pinned) {
    return steps.map((step, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
      draw(step, contents[i], tl, 0, 1);
      return tl;
    });
  }

  // Fijada: el scroll traza un paso por vez, así se avanza el proceso de 01 a 06
  gsap.set(".process-head .section-kicker", { autoAlpha: 0, y: "2rem" });
  gsap.set(".process-title .word > span", { autoAlpha: 0, yPercent: 110 });
  gsap.set(".process-cta", { autoAlpha: 0, y: "3rem" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-process",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
  tl.to(
    ".process-head .section-kicker",
    { autoAlpha: 1, y: 0, duration: 0.3, ease: "none" },
    0,
  );
  tl.to(
    ".process-title .word > span",
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.7,
      stagger: 0.05,
      ease: "power3.out",
    },
    0.15,
  );

  const start = 0.95;
  const step = 0.85; // cuánto scroll cuesta cada paso
  steps.forEach((s, i) => draw(s, contents[i], tl, start + i * step, step));
  tl.to(
    ".process-cta",
    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
    start + steps.length * step - 0.3,
  );
  // Tramo final quieto: deja ver los seis pasos juntos antes de soltar la sección
  tl.to({}, { duration: 0.6 });
  return tl;
}

export default function HomeExperience() {
  useEffect(() => {
    const device = getDevice();
    const cleanups: Cleanup[] = [];
    let smoother: Smoother | null = null;
    let marqueeCleanup: Cleanup | null = null;
    let intro: gsap.core.Timeline | null = null;
    let process: gsap.core.Timeline | gsap.core.Timeline[] | null = null;
    const sections: (Animation | null)[] = [];
    const header = document.querySelector<HTMLElement>("#header");

    if (device.isMobile) {
      const setVh = () =>
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`,
        );
      setVh();
      setTimeout(setVh, 1000);
    }

    runSplitting();
    // Antes de armar nada: si se recargó con el scroll a mitad, el hero fijado y las
    // timelines arrancarían descoordinados. Se entra siempre desde arriba.
    cleanups.push(anclarArriba());
    cleanups.push(initScrollState());
    cleanups.push(initCursor());

    const loaderMark = animateDMark(
      document.querySelector("#loader .d-mark"),
      1,
    );
    const menuMark = animateDMark(document.querySelector(".menu .d-mark"), 1);
    if (loaderMark) loaderMark.play();

    const layout = device.isDesktop ? DESKTOP : MOBILE;
    setHeroInitialState(layout);
    if (device.isDesktop) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#pg-home",
        smooth: 2,
        normalizeScroll: true,
        ignoreMobileResize: true,
        effects: true,
      });
      smoother.paused(true); // sin scroll hasta que termine la intro
      initSticky();
      initFooterReveal();
    } else {
      // Vertical: la misma secuencia, con el hero fijado sobre el scroll nativo. Sin
      // scroll suave, que no está pensado para táctil. ignoreMobileResize: la barra de
      // direcciones que aparece y desaparece cambia el alto de la ventana, y sin esto
      // cada cambio dispara un refresh que re-fija el hero a los saltos.
      ScrollTrigger.config({ ignoreMobileResize: true });
      initSticky(document.querySelector(".home-hero") ?? document);
      // Sin scroll mientras corre la intro: el trigger del hero recién se crea al
      // terminar, y si el usuario scrollea antes el tramo fijado arranca a mitad.
      document.documentElement.classList.add("intro-running");
    }
    cleanups.push(initSectionWatcher());
    cleanups.push(initMenu({ smoother, menuMark }));

    const startMarquees = () => {
      setTimeout(() => {
        marqueeCleanup = initMarquees();
      }, 600);
    };
    // Volver desde una ficha de proyecto es navegación dentro del sitio: el preloader
    // ya se vio al entrar y repetirlo es tapar la página por gusto. Y si además se
    // vuelve a un ancla, tampoco corresponde la intro: el usuario quiere ir a ese
    // punto, no ver la presentación de nuevo, así que la timeline se salta al final.
    const yaEntro = document.body.dataset.load === "first-done";
    const conAncla =
      Boolean(window.location.hash) && window.location.hash !== "#top";

    const arrancar = () => {
      intro = playHeroIntro(layout, () => {
        initHeroScroll(header, layout);
        if (smoother) smoother.paused(false);
        else {
          document.documentElement.classList.remove("intro-running");
          // Toma el control del scroll táctil: evita el tirón de la barra de
          // direcciones y mantiene el pin estable mientras se arrastra con el dedo.
          ScrollTrigger.normalizeScroll(true);
        }
        ScrollTrigger.refresh();
        refreshAOS();
      });
      if (yaEntro && conAncla) intro.progress(1);
      // "Qué hacemos" no lleva su propia timeline: la arma initHeroScroll porque vive
      // dentro del panel izquierdo del hero, en los dos layouts.
      // "Sobre Dutsiland" en el home es sólo el anuncio (título, subtítulo y el botón a
      // /sobre): no se fija, se revela al entrar, en los dos layouts.
      const revelados = initRevealOnEnter([
        ".history-kicker",
        ".history-title",
        ".history-subtitle",
        ".history-cta",
      ]);
      sections.push(...revelados);
      cleanups.push(protegerRevelados(revelados));
      // Solo en desktop la sección se fija (ver .home-process en globals.css)
      process = initProcess(device.isDesktop);
      ScrollTrigger.refresh();
    };

    if (yaEntro) {
      startMarquees();
      arrancar();
    } else {
      cleanups.push(
        runLoader({
          onLeaving: () => {
            document.dispatchEvent(new CustomEvent("load:leaving"));
            if (loaderMark) loaderMark.pause();
            gsap.to("#loader .d-mark__d", { scale: 1, duration: 0.35 });
            startMarquees();
          },
          onDone: () => {
            revelarEntrada();
            arrancar();
          },
        }),
      );
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    // Las fuentes y las imágenes pueden llegar después del load: las fuentes cambian las
    // métricas del texto y con ellas cuántas filas ocupan las pastillas, o sea el alto
    // del frente más alto, que es lo que dimensiona el hueco del panel.
    cleanups.push(refrescarAlCargarMedios());

    return () => {
      window.removeEventListener("load", onLoad);
      cleanups.forEach((fn) => fn());
      if (marqueeCleanup) marqueeCleanup();
      destroyAOS();
      if (intro) intro.kill();
      if (Array.isArray(process)) process.forEach((t) => t.kill());
      else if (process) process.kill();
      sections.forEach((t) => t && t.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (loaderMark) loaderMark.kill();
      if (menuMark) menuMark.kill();
      if (smoother) smoother.kill();
      else {
        ScrollTrigger.normalizeScroll(false);
        document.documentElement.classList.remove("intro-running");
      }
      if (fitServicesStack) {
        ScrollTrigger.removeEventListener("refreshInit", fitServicesStack);
        fitServicesStack = null;
      }
      if (stackObserver) {
        stackObserver.disconnect();
        stackObserver = null;
      }
    };
  }, []);

  return null;
}
