# Dutsiland — landing

Landing de [Estudio Dutsiland](https://dutsiland.com) construida con Next.js 13 (App Router), TypeScript y GSAP.
El foco es la software factory: desarrollo de software a medida, además de diseño de producto y web.

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

## Secciones, en orden

| Sección          | Qué muestra                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| Hero             | Intro animada, la frase, y **qué hacemos** dentro del panel izquierdo         |
| Nuestra historia | Año de arranque y cómo empezó el estudio                                      |
| Cómo trabajamos  | Los seis pasos de la software factory, de la primera reunión al soporte       |
| Proyectos        | Marquesina con los seis trabajos publicados                                   |
| Footer           | Panel claro con navegación, mail, legales y el logotipo                       |

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
  punto del tramo en el que se ve, y el menú lo usa para saber a qué altura saltar. Si movés una fase,
  las anclas se reacomodan solas.

### Secciones fijadas

Hero (con qué hacemos adentro), historia y cómo trabajamos se **fijan** mientras el scroll alimenta su
animación, para que no se pasen de largo en dos ruedazos. En cómo trabajamos el scroll traza un paso
por vez, de 01 a 06.

Las tres cierran con un tramo quieto: si la última pieza de la animación aterriza justo en el último
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
historia y proceso siguen revelándose al entrar, que en un teléfono se lee mejor.

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
  y `ProjectExperience`) saltean el preloader si `body[data-load]` ya está en
  `first-done`, y la home además saltea la intro cuando se vuelve a un ancla: quien
  toca "volver a proyectos" quiere ir ahí, no ver la presentación otra vez.
- **`--btn-color` es lo que pinta `.btn-underlined`.** Si no se define, el texto cae al
  negro por defecto; sobre fondo negro queda invisible.

## Dónde está cada cosa

| Qué                                                      | Dónde                               |
| -------------------------------------------------------- | ----------------------------------- |
| Todos los textos, links, servicios, pasos y proyectos    | `src/content/site.ts`               |
| Secciones                                                | `src/components/*.tsx`              |
| Qué hacemos (panel izquierdo del hero, no una sección)   | `src/components/Services.tsx`       |
| Fichas de proyecto                                       | `src/app/proyectos/[slug]/page.tsx` |
| Layout y animación de la ficha                           | `ProjectView.tsx` + `ProjectExperience.tsx` |
| Capturas de los casos                                    | `public/img/proyectos/<slug>/`      |
| Intro, animaciones de scroll, loader, menú               | `src/components/HomeExperience.tsx` |
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

- **Año de arranque** (`site.history.year`, hoy `2023`): es el número grande de la sección de historia.
- **Historia**: falta la ciudad de origen y algún hito concreto (primer cliente, primer sistema propio).
  Los dos párrafos actuales están redactados con lo que se sabe y marcados con `TODO` en el archivo.
- **Destinos de "Política de privacidad" y "Términos y condiciones"** (`site.footer.legal`): hoy apuntan
  al contacto del sitio actual.
- **Cómo contamos el problema en cada ficha**: está redactado a partir de lo que hace el producto y de
  lo que decía el sitio actual, no de un brief del cliente. Publicité y Mahatu están marcados con `TODO`;
  los otros cinco salen de las fichas de `dutsiland.com/#trabajos`, que cuentan el trabajo pero no el
  problema previo.
- **El stack de cinco proyectos** (AMA, Cucha, Medialuna, Mimpronta y Wonder): el sitio actual solo
  listaba servicios, no tecnologías. Mientras `stack` esté vacío, la ficha no muestra ese bloque.
