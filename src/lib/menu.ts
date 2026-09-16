import type gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Cleanup } from "./marquee";
import type { ScrollSmoother } from "gsap/ScrollSmoother";

// Menú y anclas. Lo usan las dos vistas (la home y la ficha de proyecto), por eso
// vive acá y no dentro de HomeExperience.

export type Smoother = ReturnType<typeof ScrollSmoother.create>;

export type MenuOptions = {
  smoother: Smoother | null;
  menuMark: gsap.core.Timeline | null;
};

/** Lleva el scroll a un ancla. `0` es el principio de la página.
 *
 *  Las anclas que caen dentro del hero de la home no tienen una posición propia: el
 *  hero está fijado y su contenido lo va mostrando el scroll, así que initHeroScroll
 *  deja en cada una un data-hero-progress con el punto del tramo en el que se ve. */
export function scrollToTarget(
  target: Element | 0,
  smoother: Smoother | null,
): void {
  if (target === 0) {
    if (smoother) smoother.scrollTo(0, true);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  // El hero está fijado en los dos layouts (con scroll suave en apaisado, con scroll
  // nativo en vertical), así que la altura de sus anclas se calcula igual en ambos.
  const hero = target.closest(".home-hero");
  if (hero instanceof HTMLElement && target instanceof HTMLElement) {
    const p = parseFloat(target.dataset.heroProgress ?? "");
    const span = Math.max(0, hero.offsetHeight - window.innerHeight);
    const y =
      hero.offsetTop + (Number.isFinite(p) ? p * span : window.innerHeight);
    if (smoother) smoother.scrollTo(y, true);
    else window.scrollTo({ top: y, behavior: "smooth" });
    return;
  }
  if (smoother) smoother.scrollTo(target, true, "top top");
  else target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function initMenu({ smoother, menuMark }: MenuOptions): Cleanup {
  const body = document.body;
  const ACTIVE = "menu-active";
  const LEAVE = "menu-leave";

  /* Con el menú abierto el fondo no se mueve. Son dos frenos distintos según el
     layout: en apaisado manda el scroll suave, y alcanza con pausarlo; en vertical el
     scroll es nativo pero lo maneja el normalizador de ScrollTrigger, que intercepta
     el táctil, así que overflow: hidden en el body no alcanza y hay que desactivarlo. */
  // El normalizador de ScrollTrigger solo existe si alguna vista lo activó con
  // normalizeScroll(true) —lo hace la home en vertical—. En las demás páginas mobile el
  // scroll es nativo y normalizeScroll() no devuelve un Observer: puede ser null (nunca
  // se creó) o `false` (una vista lo apagó al desmontarse con normalizeScroll(false),
  // que deja esa marca como estado global). En esos casos no hay nada que pausar y el
  // freno lo pone el CSS (body.menu-active { overflow: hidden; touch-action: none }), así
  // que solo tocamos el normalizador cuando de verdad expone enable/disable.
  const normalizer = () => {
    const n = ScrollTrigger.normalizeScroll();
    return n &&
      typeof n.enable === "function" &&
      typeof n.disable === "function"
      ? n
      : null;
  };
  const bloquearScroll = () => {
    if (smoother) smoother.paused(true);
    else normalizer()?.disable();
  };
  const soltarScroll = () => {
    if (smoother) smoother.paused(false);
    else normalizer()?.enable();
  };
  const api = {
    get isOpen() {
      return body.classList.contains(ACTIVE);
    },
    open() {
      body.classList.add(ACTIVE);
      setTimeout(() => menuMark && menuMark.play(), 500);
      bloquearScroll();
    },
    close() {
      if (!api.isOpen) return;
      soltarScroll();
      body.classList.remove(ACTIVE);
      body.classList.add(LEAVE);
      setTimeout(() => {
        body.classList.remove(LEAVE);
        if (menuMark) menuMark.pause(0);
      }, 800);
    },
  };

  const bt = document.getElementById("bt-menu");
  const onBt = () => (api.isOpen ? api.close() : api.open());
  if (bt) bt.addEventListener("click", onBt);

  const onAnchor = (e: Event) => {
    const a = e.currentTarget;
    if (!(a instanceof HTMLAnchorElement)) return;
    const href = a.getAttribute("href") || "";
    const wasOpen = api.isOpen;
    if (a.hasAttribute("data-menu-close")) api.close();
    // Los href que empiezan con "/" son rutas: los deja pasar para que navegue Next.
    if (!href.startsWith("#")) return;
    e.preventDefault();
    // Las secciones del home ya no llevan id —no son direcciones, no se visitan— así
    // que el destino se busca por data-ancla. El href queda como pista de "es acá
    // mismo": el que navega es este handler.
    const target =
      href === "#top"
        ? 0
        : document.querySelector(`[data-ancla="${href.slice(1)}"]`);
    if (target === null) return;
    setTimeout(() => scrollToTarget(target, smoother), wasOpen ? 450 : 0);
  };
  const anchors = Array.from(
    document.querySelectorAll('a[href^="#"], a[data-menu-close]'),
  );
  anchors.forEach((a) => a.addEventListener("click", onAnchor));

  return () => {
    if (bt) bt.removeEventListener("click", onBt);
    anchors.forEach((a) => a.removeEventListener("click", onAnchor));
    soltarScroll();
    body.classList.remove(ACTIVE, LEAVE);
  };
}
