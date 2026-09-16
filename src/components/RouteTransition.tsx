"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

// Transición entre rutas del sitio. Al navegar por un link interno —botones, menú,
// footer— un blob negro entra desde la izquierda hasta tapar la pantalla, y a su paso va
// destapando la D que está fija en el centro: el blob es su máscara. Recién ahí se cambia
// de ruta por detrás. Cuando la ruta nueva ya está montada, el blob se retira de vuelta
// hacia la izquierda, vuelve a tapar la D y descubre la página.
//
// No hay animación de opacidad en ningún lado: todo es el barrido del panel (translateX)
// y el recorte de su borde. El panel es más ancho que el viewport (sangrado, --rt-bleed)
// para que su borde de ataque redondeado —la cabeza del blob— entre y salga por fuera de
// la pantalla y no asomen esquinas. La D vive dentro del panel (que tiene overflow
// hidden) pero contra-trasladada para quedar quieta en el centro del viewport, así el
// panel la va calando a medida que pasa.
//
// No toca la máquina del preloader de primera carga (body[data-load] / runLoader): ese
// es el que se ve al abrir el sitio. Este overlay es otra capa, sólo para el ir y venir
// entre páginas ya cargadas.

const EXIT = 2; // s: el blob barre hasta tapar
const ENTER = 2; // s: el blob sigue y sale por la izquierda
const EASE = "power2.inOut";
const BLEED = 0.55; // fracción del ancho de sobreancho a cada lado; sigue a --rt-bleed (55vw)

// Puntos del recorrido del panel, en px de translateX. El borde de ataque es el derecho:
//   guardado -> el borde derecho pega contra el borde IZQUIERDO del viewport (por entrar)
//   cubierto -> x:0, el panel tapa toda la pantalla
//   salido   -> el panel entero salió por la izquierda
const bleedPx = () => window.innerWidth * BLEED;
const stash = () => -(window.innerWidth + bleedPx());
const gone = () => -(window.innerWidth * 2 + bleedPx() * 2);

export default function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  // La ruta que estábamos mostrando. Distingue la primera carga (de la que se ocupa el
  // preloader) de una navegación real dentro del sitio.
  const shownPath = useRef<string | null>(null);
  // Con un exit en curso quedamos esperando a que monte la ruta nueva para hacer el
  // enter. Evita relanzar la salida con clics repetidos.
  const navigating = useRef(false);

  // ---- Entrada: el blob sigue su barrido y sale cuando la ruta nueva ya está montada --
  useEffect(() => {
    const first = shownPath.current === null;
    shownPath.current = pathname;
    // La primerísima vez no hay de dónde salir: de eso se ocupa el preloader. Dejamos el
    // panel guardado fuera de vista, listo para el próximo exit, y salimos.
    if (first) {
      gsap.set(".route-transition", { x: stash(), visibility: "hidden" });
      gsap.set(".route-transition__mark", { x: -stash() });
      return;
    }
    // Sólo destapamos si venimos de un exit (navegación por link). Un cambio de ruta por
    // back/forward del navegador cae acá sin panel encima: no hay nada que retirar.
    if (!navigating.current) return;
    navigating.current = false;

    const overlay = document.querySelector(".route-transition");
    if (!overlay) return;

    // El home tiene su propia entrada: al llegar corre la intro del hero (no un fade,
    // ver HomeExperience en la rama yaEntro). Si acá además barriéramos el panel, se
    // verían las dos animaciones encimadas. Así que hacia el home el panel se quita de
    // una: la única entrada visible es la del hero.
    if (pathname === "/") {
      gsap.set(".route-transition", { visibility: "hidden", x: stash() });
      gsap.set(".route-transition__mark", { x: -stash() });
      return;
    }

    let tl: gsap.core.Timeline | null = null;
    // Un par de frames para que el navegador pinte la ruta nueva por debajo del panel
    // antes de destaparla: si no, se asoma la página a medio montar. Las páginas son
    // estáticas, así que alcanza con esperar el primer pintado.
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        tl = gsap.timeline({
          onComplete: () => {
            // Fuera de vista y guardado al inicio del recorrido, listo para otro viaje.
            gsap.set(".route-transition", { visibility: "hidden", x: stash() });
            gsap.set(".route-transition__mark", { x: -stash() });
          },
        });
        // El panel sigue de largo hacia la izquierda; la D queda quieta en el centro
        // (contra-traslación) y el borde del panel la va tapando al pasar.
        tl.to(
          ".route-transition",
          { x: gone(), duration: ENTER, ease: EASE },
          0,
        );
        tl.to(
          ".route-transition__mark",
          { x: -gone(), duration: ENTER, ease: EASE },
          0,
        );
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      tl?.kill();
    };
  }, [pathname]);

  // ---- Salida: intercepta los clics en links internos ----
  useEffect(() => {
    const go = (url: string) => {
      if (navigating.current) return;
      navigating.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          // Tapados del todo: cambiamos de ruta por detrás. El enter lo dispara el
          // cambio de pathname en el otro efecto.
          router.push(url);
        },
      });
      // Punto de partida garantizado: panel por entrar desde la izquierda, visible (sin
      // fade), y la D quieta en el centro del viewport por la contra-traslación.
      tl.set(".route-transition", { visibility: "visible", x: stash() }, 0);
      tl.set(".route-transition__mark", { x: -stash() }, 0);
      // El blob barre de izquierda a derecha hasta tapar; su borde va revelando la D.
      tl.to(".route-transition", { x: 0, duration: EXIT, ease: EASE }, 0);
      tl.to(".route-transition__mark", { x: 0, duration: EXIT, ease: EASE }, 0);
    };

    const onClick = (e: MouseEvent) => {
      // Respeta abrir en pestaña nueva, con teclas modificadoras o botón del medio.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const el = e.target as Element | null;
      const a = el?.closest("a");
      if (!(a instanceof HTMLAnchorElement)) return;
      // target=_blank, descargas y rel externos siguen su curso normal.
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      const href = a.getAttribute("href") || "";
      // Anclas (#...), mailto, tel, protocolos: no son navegación de ruta. Las anclas
      // del home las maneja initMenu con su scroll suave.
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;
      // Sólo rutas del mismo sitio. Un http(s) externo se deja pasar.
      let dest: URL;
      try {
        dest = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (dest.origin !== window.location.origin) return;
      // Mismo destino que la ruta actual: nada que transicionar.
      if (dest.pathname === window.location.pathname) return;

      e.preventDefault();
      go(dest.pathname + dest.search + dest.hash);
    };

    // Captura: corre antes que el handler de <Link> de Next, así ganamos la navegación.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
