# Dutsiland — landing

Landing de [Estudio Dutsiland](https://dutsiland.com) construida con Next.js 16 (App Router), React 19,
TypeScript y GSAP. El foco es la software factory: desarrollo de software a medida, además de diseño de
producto, web e implementación de IA.

Sigue el storyboard `v2.pdf` (dos "D" negras que se transforman, la D como contenedor, pastillas,
botón con la D roja) sobre el sistema de animación de la referencia [defprojetos.com](https://www.defprojetos.com/):
preloader, scroll suave, sección fijada, texto partido, marquesina, cursor y menú.

## Correr el proyecto

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000>.

Chequeo de tipos y de lint (todo el proyecto es TypeScript en modo `strict`):

```bash
npm run typecheck
npm run lint
```

> Importante: no correr `next build` mientras el servidor de desarrollo está activo. El build
> sobrescribe la carpeta `.next` que usa el modo desarrollo y la página queda sin estilos ni scripts.
> Si pasa, parar el servidor, borrar `.next` y volver a levantarlo.

## Rutas

El sitio no es una sola página con anclas: cada cosa que el menú ofrece tiene su URL.

| Ruta                 | Qué contiene                                                            |
| -------------------- | ----------------------------------------------------------------------- |
| `/`                  | La home (abajo)                                                         |
| `/sobre`             | Sobre Dutsiland: cómo empezó el estudio, el año y el equipo             |
| `/proyectos`         | Grid con todos los casos; cada uno linkea a su ficha                    |
| `/proyectos/<slug>`  | La ficha de un caso                                                     |
| `/contacto`          | Formulario (Formspree) con validación nativa                            |

**El menú tiene exactamente tres ítems**: Sobre Dutsiland, Proyectos y Contacto. "Qué hacemos" y "Cómo
trabajamos" siguen siendo secciones de la home, pero no son direcciones: no están en el menú ni se
puede caer en ellas escribiendo una URL. Por eso ninguna sección de la home lleva `id` de navegación —
el único punto al que se salta desde adentro es "qué hacemos", y va por `data-ancla` (ver más abajo).

Todas las páginas que no son la home comparten armazón (`PageShell.tsx`) y coreografía
(`PageExperience.tsx`): ninguna fija secciones, cada bloque entra al aparecer y la portada abre con la
misma apertura en D del hero.

## La home, en orden

| Sección          | Qué muestra                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| Hero             | Intro animada, la frase, y **qué hacemos** dentro del panel izquierdo         |
| Sobre Dutsiland  | Sólo el anuncio: título, bajada y el botón a `/sobre`                         |
| Cómo trabajamos  | Los cinco pasos de la software factory, de la primera reunión al soporte      |
| Proyectos        | Marquesina con los trabajos publicados y el botón a `/proyectos`              |
| Footer           | Panel claro con navegación, mail, legales y el logotipo                       |

Las tarjetas de la marquesina **no son clickeables**: se entra a los casos por `/proyectos`.

En el scroll del hero la D izquierda sale de escena, la derecha ocupa todo con la frase y su botón,
y después se parte en dos D (cuadros 7 y 8 del storyboard).

### "Qué hacemos" no es una sección: es el panel izquierdo del hero

Cuando la frase termina de irse por la derecha, la sombra negra que entró por la izquierda se abre a
todo el ancho y los tres frentes se muestran **adentro de ese panel**: entran de a uno en el mismo
lugar y al final se alinean como índice (número y título de los tres juntos). Todo eso lo alimenta el
mismo tramo fijado del hero, así que `Services.tsx` no devuelve un `<section>` sino el contenido que
va dentro de `.blob-left2`, y su animación no tiene ScrollTrigger propio: `buildServicesSequence()`
arma una timeline suelta que `initHeroScroll` engancha a la del hero.

Dos consecuencias al tocar esto:

- **La secuencia se comprime con `timeScale`.** Está escrita a ~485px de scroll por unidad y la
  timeline del hero corre a ~900px, así que `SERVICES_TIMESCALE` la ajusta para que cada paso cueste
  el mismo scroll que cuando era una sección aparte.
- **Las anclas de adentro del hero no tienen posición propia.** El hero está fijado y su contenido lo
  va mostrando el scroll, así que `initHeroScroll` deja en cada ancla un `data-hero-progress` con el
  punto del tramo en el que se ve, y `menu.ts` lo usa para saber a qué altura saltar. Si movés una
  fase, las anclas se reacomodan solas. El destino se busca por `data-ancla` y no por `id`: el botón
  del hero necesita un punto al que saltar, pero la sección no es una dirección.
- **La línea de cada frente se traza con el scroll.** No es un `border-top` sino un `.service__line`
  propio, como `.step__line` en cómo trabajamos, y `buildServicesSequence` lo dibuja con `scaleX`
  cuando ese frente entra.

### Secciones fijadas

Hero (con qué hacemos adentro) y cómo trabajamos se **fijan** mientras el scroll alimenta su
animación, para que no se pasen de largo en dos ruedazos. En cómo trabajamos el scroll traza un paso
por vez, de 01 a 05.

Las dos cierran con un tramo quieto: si la última pieza de la animación aterriza justo en el último
píxel del pin, la sección se suelta antes de que se termine de leer y el movimiento queda colgado. El
alto en `vh` de la sección (`globals.css`) es lo que compra ese margen, así que al sumar pasos a una
animación fijada hay que subirlo también.

Dos cosas a tener en cuenta al tocar estas secciones:

- **El fijado va con `data-sticky`, no con `position: sticky`.** El scroll suave desplaza el contenido
  con una transformación, y dentro de un elemento transformado el sticky de CSS no retiene nada.
- **Las medidas usan `min(rem, vh)`.** El `rem` de este proyecto escala con el ANCHO de la pantalla, así
  que en pantallas anchas y bajas el contenido no entraba en una pantalla y se cortaba por arriba,
  encimándose con el header. El tope en `vh` hace que cada pieza ceda cuando falta alto. Esos bloques
  van al final de cada sección en `globals.css` para ganarle por orden a las reglas de base.

### Vertical (teléfono y tablet)

Sigue la referencia móvil del diseñador: **la misma secuencia del hero, en vertical**. La D del
logo ocupa el 58% de arriba con el lockup y el mail; el titular va debajo, negro sobre el crema;
la frase entra desde abajo como una tarjeta redondeada a la derecha; la partida en dos, el panel
que se abre y los cuatro frentes son iguales que en apaisado. Sólo el hero se fija en vertical:
el anuncio de sobre Dutsiland y el proceso siguen revelándose al entrar, que en un teléfono se lee mejor.

Lo que cambia por debajo, y conviene saber al tocarlo:

- **Sin scroll suave en táctil** (no está pensado para eso). El hero se fija sobre el scroll
  nativo con `ScrollTrigger.normalizeScroll(true)`, que evita el tirón de la barra de direcciones,
  y `ignoreMobileResize`, porque esa barra al aparecer y desaparecer cambia el alto de la ventana
  y cada cambio dispararía un refresh que re-fija el hero a los saltos. El alto del escenario lo
  fija `--vh` una sola vez al arrancar, por el mismo motivo.
- **Mientras corre la intro no hay scroll** (`html.intro-running`): el trigger del hero recién se
  crea al terminar, y si el usuario scrollea antes el tramo fijado arranca a mitad.
- **Las siluetas son las mismas variables CSS, con otro juego de estados** (`MCLIP` contra `CLIP`
  en `HomeExperience`): insets arriba/abajo, que en apaisado no hacen falta, y radios en `vw`,
  porque en vertical el ancho es lo que manda. Dentro de una misma D todas las fases usan la misma
  unidad: GSAP no convierte unidades en una variable CSS.
- **El hero mide 500vh en vertical contra 840vh en apaisado** — a propósito. En un teléfono se
  scrollea a flicks y un tramo fijado largo se siente trabado; el ritmo queda en ~460px por unidad
  de timeline contra ~900px en desktop.
- **El hueco donde se intercambian los frentes lo dimensiona JS** con el frente más alto
  (`fitServicesStack`), y se vuelve a medir con un `ResizeObserver` cada vez que el hueco cambia de
  ancho: cuántas filas ocupan las pastillas depende del ancho, y ese ancho cambia sin avisar (la
  barra de scroll que aparece al terminar la intro, la barra de direcciones, un giro de pantalla).
  El CSS sólo pone el piso.
- En teléfonos (≤ 767px) la bajada de "qué hacemos" no se muestra dentro del panel: no hay alto
  para ella, y el título ya dice lo mismo. En tablet sí entra.

## Fichas de proyecto (`/proyectos/<slug>`)

Cada caso tiene su propia URL, así se puede mandar un link a un cliente y cada caso se
indexa por separado. La ficha cuenta **el problema que había que resolver**, qué
construimos, con qué, y las capturas del producto.

A diferencia de la home, acá **no se fija ninguna sección**: es un documento que
scrollea y cada bloque entra al aparecer (`[data-reveal]`). Solo la portada tiene
entrada propia, la misma apertura en D del hero. Por eso la ficha es de bajo riesgo:
no toca el sistema de pins.

Las fichas salen de `site.projects`. Un proyecto **sin `detail` no tiene página**: se
muestra en la marquesina como tarjeta y nada más, y su URL da 404 (`generateStaticParams`
solo genera los que tienen ficha). Para publicar un caso nuevo alcanza con escribirle
el `detail`.

Dos cosas a tener en cuenta:

- **La navegación interna va con `next/link`**, no con `<a>`. Con un `<a>` la página se
  recarga entera y el preloader vuelve a aparecer. Las dos experiencias (`HomeExperience`
  y `PageExperience`) saltean el preloader si `body[data-load]` ya está en
  `first-done`, y la home además saltea la intro cuando se vuelve a un ancla: quien
  toca "volver a proyectos" quiere ir ahí, no ver la presentación otra vez.
- **`--btn-color` es lo que pinta `.btn-underlined`.** Si no se define, el texto cae al
  negro por defecto; sobre fondo negro queda invisible.

## Header, menú y la entrada al sitio

- **El color del logo y del botón de menú lo decide la sección de abajo.** Cada sección declara
  `data-set-section` y el header lee el valor en `data-get-section`. Lo resuelve un ScrollTrigger por
  sección (`initSectionWatcher`) y no un listener de scroll: con el scroll suave la posición visual
  sigue cambiando después del evento, así que un listener medía a mitad del recorrido y el header
  terminaba claro sobre fondo claro.
- **Con el menú abierto el fondo no se mueve.** Son dos frenos distintos: en apaisado alcanza con
  pausar el scroll suave; en vertical el scroll es nativo pero lo intercepta el normalizador de
  ScrollTrigger, así que `overflow: hidden` no alcanza y hay que desactivarlo.
- **Se entra al sitio siempre desde arriba** (`anclarArriba`, en `lib/entrada.ts`). El navegador
  restaura el scroll donde estaba antes de recargar, y en la home eso rompe todo: el hero está fijado
  y la coreografía arrancaba desde un punto que no era el suyo. Un script en `layout.tsx` pasa
  `scrollRestoration` a `'manual'` antes de la hidratación —que es cuando el navegador restaura— y el
  ancla mantiene el scroll en cero por frame mientras el loader está arriba, porque la restauración
  puede llegar tarde. Al terminar vuelve a `'auto'`, y no hace nada si el loader ya corrió: ir y
  volver dentro del sitio no recarga el documento y ahí el scroll sí debe recordarse.
- **El loader no se corta, se disuelve** (`revelarEntrada`). Se sostiene el negro al pasar a
  `first-done` y el contenido aparece debajo. En móvil la D del loader mide lo mismo que la D del
  hero (20vh) y comparte centro, así que el paso de una a la otra es un fundido y no un salto.

## Dónde está cada cosa

| Qué                                                      | Dónde                               |
| -------------------------------------------------------- | ----------------------------------- |
| Todos los textos, links, servicios, pasos y proyectos    | `src/content/site.ts`               |
| Secciones                                                | `src/components/*.tsx`              |
| Qué hacemos (panel izquierdo del hero, no una sección)   | `src/components/Services.tsx`       |
| Rutas                                                    | `src/app/<ruta>/page.tsx`           |
| Armazón y coreografía de todo lo que no es la home       | `PageShell.tsx` + `PageExperience.tsx` |
| Layout de la ficha de proyecto                           | `ProjectView.tsx`                   |
| Formulario de contacto (Formspree)                       | `src/components/ContactForm.tsx`    |
| Capturas de los casos                                    | `public/img/proyectos/<slug>/`      |
| Intro, animaciones de scroll y menú de la home           | `src/components/HomeExperience.tsx` |
| Preloader y entrada al sitio                             | `src/lib/loader.ts` + `src/lib/entrada.ts` |
| Utilidades (reveals, marquesina, cursor, split de texto) | `src/lib/*.ts`                      |
| Estilos (todo el sistema visual)                         | `src/app/globals.css`               |
| Logos (D, UTSILAND, letras del logotipo)                 | `public/brand/`                     |
| Imágenes de los proyectos                                | `public/img/`                        |
| Tipografía (Montserrat y Montserrat Subrayada, OFL)      | `src/fonts/` + `src/app/layout.tsx` |

Montserrat Subrayada la pide el diseñador para todo botón con tipografía subrayada: la etiqueta del
botón con la D y los links `.btn-underlined`. Trae el subrayado en los propios glifos, así que ahí no
se dibuja ninguna línea aparte y el hover es un cambio de opacidad. Los `.btn-underline`, que sólo
se subrayan al pasar el mouse, siguen en Montserrat.

El tipo `Site` en `src/content/site.ts` describe la forma de todo el contenido, así que si falta un
campo o cambia la estructura salta en el chequeo de tipos y no en pantalla. Las utilidades de
`src/lib/` exportan `Cleanup` (`() => void`): toda función de init devuelve su propia limpieza y
`HomeExperience` las junta para desmontar todo en el `useEffect`.

## Pendientes de confirmar con el estudio

- **Año de arranque** (`site.about.year`, hoy `2023`): es el número grande de `/sobre`.
- **Sobre Dutsiland**: falta la ciudad de origen y algún hito concreto (primer cliente, primer sistema
  propio). Los párrafos actuales están redactados con lo que se sabe y marcados con `TODO` en el archivo.
- **El equipo de `/sobre`**: faltan los nombres, los roles y las fotos (van en `public/img/equipo/`).
  Mientras `site.about.team` esté vacío la sección directamente no se muestra.
- **El título de "Cómo trabajamos"**: se reescribió al sacar el paso de la demo y queda por validar
  (marcado con `TODO` en `site.ts`).
- **Destinos de "Política de privacidad" y "Términos y condiciones"** (`site.footer.legal`): hoy apuntan
  al contacto del sitio actual.
- **Cómo contamos el problema en cada ficha**: está redactado a partir de lo que hace el producto y de
  lo que decía el sitio actual, no de un brief del cliente. Publicité y Mahatu están marcados con `TODO`;
  los otros cinco salen de las fichas de `dutsiland.com/#trabajos`, que cuentan el trabajo pero no el
  problema previo.
- **El stack de cinco proyectos** (AMA, Cucha, Medialuna, Mimpronta y Wonder): el sitio actual solo
  listaba servicios, no tecnologías. Mientras `stack` esté vacío, la ficha no muestra ese bloque.
