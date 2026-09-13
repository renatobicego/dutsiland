# Correcciones y mejoras — Sitio Dutsiland

Este documento es un brief de trabajo para un agente de IA. Describe un conjunto de
correcciones y mejoras sobre el sitio de **Estudio Dutsiland**. Cada punto incluye el
síntoma, el archivo/código involucrado, el resultado esperado y las restricciones a
respetar.

Leé primero la sección **Contexto técnico** para entender la arquitectura, porque
muchos de los problemas nacen de cómo está armada la experiencia de scroll con GSAP.
Después seguí los puntos en el orden propuesto en el **Plan de ejecución**: hay
dependencias entre ellos (el rediseño de rutas condiciona el menú, las anclas y el
loader).

---

## Contexto técnico

**Stack**: Next.js 13.5.6 (App Router), React 18, TypeScript, Tailwind 3, GSAP 3.15
(con los plugins de club `ScrollTrigger`, `ScrollSmoother`, `CustomEase`). No hay
librería de UI ni de formularios instalada. Todo el texto visible vive en
`src/content/site.ts`.

**Estructura relevante**:

```
src/
  app/
    layout.tsx                 # <html>/<body>, fuentes locales, metadata
    page.tsx                   # Home: compone Header, Hero, History, Process, Portfolio, Footer + experiencia
    globals.css                # TODA la hoja de estilos (~895 líneas), sin CSS Modules
    proyectos/[slug]/page.tsx  # Ficha de proyecto (generateStaticParams + generateMetadata)
  components/
    Header.tsx        # Header + menú (nav.menu)
    Hero.tsx          # Hero de la home: dos "D" (blobs) que se transforman + Services embebido
    Services.tsx      # "Qué hacemos" (vive DENTRO del panel izquierdo del hero, .blob-left2)
    History.tsx       # "Nuestra historia"
    Process.tsx       # "Cómo trabajamos"
    Portfolio.tsx     # "Proyectos destacados" (marquesina de tarjetas)
    Footer.tsx        # Footer (contacto actual = ancla #contacto)
    ProjectView.tsx   # Cuerpo de la ficha de proyecto
    ProjectExperience.tsx  # 'use client' — GSAP de la ficha
    HomeExperience.tsx     # 'use client' — GSAP de la home (el archivo más importante)
    DMark.tsx, Button.tsx, Cookies.tsx, ScrollTop.tsx
  lib/
    loader.ts       # Preloader: máquina de estados body[data-load] loading->leaving->done
    menu.ts         # Apertura/cierre de menú + navegación por anclas (scrollToTarget, goToHash)
    device.ts       # getDevice(): isPhone/isTablet/isMobile/isDesktop
    scrollState.ts  # body[data-scroll-*] + initSectionWatcher (header[data-get-section] = data-set-section debajo)
    reveal.ts, marquee.ts, cursor.ts, aos.ts, splitting.ts
```

**Cómo funciona la experiencia de la home** (esto es clave para no romper nada):

- `HomeExperience.tsx` es un componente cliente que en `useEffect` monta toda la
  coreografía GSAP. En **desktop** usa `ScrollSmoother` (scroll suave) y **fija (pin)**
  el hero, la historia y el proceso. En **mobile/tablet** usa scroll nativo y solo fija
  el hero.
- El **hero** son dos siluetas de "D" (`.blob-left`, `.blob-right`, más un panel
  `.blob-left2`) recortadas con `clip-path` animado vía variables CSS. La sección
  "Qué hacemos" (`Services.tsx`) **no es una sección propia**: vive dentro de
  `.blob-left2`, el panel negro que se abre cuando la frase se va a la derecha.
- Las anclas del hero (`#servicios`, `#sobre-nosotros`) no tienen posición propia
  porque el contenido lo revela el scroll del pin. Por eso `initHeroScroll` deja un
  `data-hero-progress` en cada ancla y `menu.ts` lo usa para saltar a la altura
  correcta. **Este mecanismo se elimina en gran parte con el rediseño de rutas** (ver
  puntos 4 y 5).
- El **preloader** (`loader.ts`) corre en la primera carga: `body[data-load]` pasa por
  `first-loading` → `first-leaving` → `first-done`. Al navegar entre páginas del sitio
  (client-side) ya está en `first-done` y no se vuelve a mostrar.
- `initSectionWatcher` (`scrollState.ts`) copia a `#header[data-get-section]` el
  `data-set-section` de la sección que está debajo del header (`"dark"` o `""`). Hoy el
  header **solo** reacciona a esto en desktop (regla dentro de `@media (min-width:
1025.1px)` en `globals.css`).

**Endpoint de contacto existente**: la rama `main` (versión anterior del sitio) usa
Formspree en `src/app/utils/sendMail.js` con el endpoint
`https://formspree.io/f/xnqenpeb` y los campos `name`, `email`, `message`. Reutilizar
ese endpoint.

**Convenciones a respetar**:

- Todo el texto visible se agrega/edita en `src/content/site.ts`, nunca hardcodeado en
  componentes.
- Los estilos van en `src/app/globals.css` (no hay CSS Modules). Seguir el sistema de
  variables ya existente (`--white-1`, `--black-1`, `--red-1`, `--d-color`, etc.) y los
  breakpoints ya usados: móvil `max-width: 767.98px`, tablet `min-width: 767.98px` y
  `max-width: 1025px`, desktop `min-width: 1025.1px`.
- Navegación interna con `<Link>` de `next/link` (client-side), nunca `<a>`, para no
  disparar el preloader de nuevo.
- Mantener el estilo visual: "D" como contenedor, antetítulo con la D roja
  (`<DIcon/>`), pastillas crema, botón `<Button/>`.
- Después de cada cambio correr `npm run typecheck`, `npm run lint` y `npm run build`.

---

## Plan de ejecución (orden sugerido)

1. **Migración a Next.js 16** (punto 1) — hacerla primero: cambia APIs que después vas
   a tocar igual (`params` async en la ficha).
2. **Rediseño de rutas** (puntos 4, 5, 6): crear `/sobre`, `/proyectos` (grid),
   `/contacto`; recortar el menú; quitar los `id` navegables del home. Esto reordena
   varias piezas, conviene hacerlo temprano.
3. **Contenido** (puntos 7, 8, 9): sacar "Software a Medida" del header, quitar la
   mención a la demo en "Cómo trabajamos", ajustar el copy del home de "Sobre".
4. **Header y logo** (puntos 10, 11, 12): D visible en mobile, color según fondo,
   sin fondo negro en mobile.
5. **Menú** (puntos 13, 14): bloqueo de scroll y footer por encima del menú (z-index).
6. **Hero / Servicios** (puntos 15, 16): línea blanca por encima del botón + animación
   de trazado.
7. **Loader** (punto 17): animación de aparición cuando se entra con scroll avanzado.
8. **Loader mobile** (punto 18): tamaño de la D constante.

Cada punto es autónomo salvo donde se indique. Verificá en desktop **y** en mobile
(usar el responsive del navegador, breakpoint < 768px y 768–1025px).

---

## 1. Migrar Next.js 13 → Next.js 16

**Objetivo**: actualizar el proyecto a Next.js 16.

**Contexto**: hoy `package.json` fija `next: 13.5.6`, `eslint-config-next: 13.5.6`,
`react: ^18`, `react-dom: ^18`.

**Qué implica** (Next 16 tiene breaking changes que afectan este repo):

- **React 19**: subir `react` y `react-dom` a `^19` y `@types/react`/`@types/react-dom`
  a las versiones de 19. Verificar compatibilidad de GSAP (no depende de React, no
  debería haber problema).
- **Node**: asegurar Node ≥ 20.9 en el entorno de build (actualizar CI/Vercel si
  aplica).
- **Async Request APIs (breaking)**: en Next 16 `params` y `searchParams` de las
  páginas son **Promises**. Hay que actualizar `src/app/proyectos/[slug]/page.tsx`:
  - `generateMetadata({ params })` → `params: Promise<Params>` y `await params`.
  - El componente `ProjectPage({ params })` → `async` y `await params`.
  - `generateStaticParams` sigue devolviendo el array de params de forma síncrona.
- Revisar `next.config.js` por opciones deprecadas.
- Correr el codemod oficial si ayuda: `npx @next/codemod@canary upgrade latest`.

**Verificación**: `npm run build` sin warnings de APIs deprecadas; la home y una ficha
(`/proyectos/publicite`) renderizan y animan igual que antes.

**Nota**: fijar versiones exactas conocidas y estables al momento de ejecutar; no usar
rangos abiertos para `next`.

---

## 2. (reservado — ver plan)

_No aplica; la numeración de puntos sigue la lista funcional de abajo._

---

## Rediseño de rutas y navegación

### 3. Sacar secciones del home a URLs propias — mapa de rutas

**Objetivo**: el sitio deja de ser una sola página con anclas y pasa a tener rutas
dedicadas. Mapa final:

| Menú            | Ruta         | Qué contiene                                                            |
| --------------- | ------------ | ----------------------------------------------------------------------- |
| Sobre Dutsiland | `/sobre`     | La sección "Nuestra historia" renombrada, ampliada con fotos del equipo |
| Proyectos       | `/proyectos` | Grid de todos los proyectos; cada uno linkea a `/proyectos/[slug]`      |
| Contacto        | `/contacto`  | Formulario de contacto (Formspree)                                      |

- **"Qué hacemos"** y **"Cómo trabajamos"** siguen existiendo como secciones dentro del
  home, pero **no** tienen entrada en el menú ni URL propia (ver puntos 13 y 6).
- Las fichas de proyecto siguen en `/proyectos/[slug]`.
- El menú final tiene exactamente 3 ítems: Sobre Dutsiland, Proyectos, Contacto.

Los puntos 4, 5 y 6 detallan cada ruta. El punto 13 detalla el menú.

---

### 4. Nueva ruta `/sobre` (ex "Nuestra historia")

**Síntoma / pedido**: "Nuestra historia" hoy es una sección fijada dentro del home
(`History.tsx`, `.home-history`, `id="historia"`). Se quiere:

1. Renombrarla **"Sobre Dutsiland"**.
2. Moverla a una URL propia `/sobre`, ampliada con **fotos del equipo** y algo más de
   contenido ("que chimi más" = que tenga más cuerpo/desarrollo).
3. En el **home**, dejar solo **título + subtítulo + un botón "Conocé más"** que lleve
   a `/sobre`.

**Cómo hacerlo**:

- Crear `src/app/sobre/page.tsx`. Puede reutilizar el patrón de la ficha de proyecto:
  `Header base="/"`, `Footer base="/"`, `ScrollTop`, `Cookies`, y una experiencia
  cliente propia o el `initRevealOnEnter` genérico de `lib/reveal.ts` para revelar
  bloques al entrar (no hace falta pin). Mirar `proyectos/[slug]/page.tsx` como
  molde de página secundaria.
- Contenido: agregar a `site.ts` una estructura `about` (o extender `history`) con
  título "Sobre Dutsiland", subtítulo, párrafos ampliados y un array de fotos del
  equipo. Dejar los textos ampliados como placeholders claros marcados con
  `TODO(Dutsiland)` y las imágenes apuntando a `public/img/equipo/` (crear la carpeta;
  si no hay fotos aún, usar placeholders y dejarlo anotado).
- En el **home**: reemplazar el cuerpo de `History.tsx` por una versión reducida —
  kicker + título ("Sobre Dutsiland") + subtítulo + `<Button href="/sobre">Conocé
más</Button>`. Mantener el estilo visual (kicker con `<DIcon/>`, tipografías).
- **Importante (interacción con GSAP)**: hoy `HomeExperience.tsx` fija la historia en
  desktop vía `initHistoryScroll()` y en mobile la revela con `initRevealOnEnter([...])`.
  Al reducir la sección a título+subtítulo+botón, `initHistoryScroll` ya no tiene
  sentido como pin largo. Simplificar: quitar el pin de la historia (sacar `data-sticky`
  de la versión reducida) y revelarla con `initRevealOnEnter` en ambos layouts, o
  dejar un reveal simple. Ajustar `initHistoryScroll` en consecuencia (puede eliminarse
  o reducirse a un reveal). No dejar selectores muertos que rompan la timeline.
- La página `/sobre` mantiene el estilo de la web (misma paleta, tipografías, D roja,
  secciones claras/oscuras con `data-set-section`).

**Verificación**: `/sobre` carga, revela su contenido al scrollear, y el home muestra
el bloque reducido con el botón que navega a `/sobre` sin recargar (usar `<Link>`).

---

### 5. Nueva ruta `/proyectos` con grid

**Síntoma / pedido**: hoy los proyectos viven solo en el home (`Portfolio.tsx`), en una
marquesina de tarjetas. Se quiere una **URL padre `/proyectos`** con una **grid** de
todos los proyectos; al tocar cada uno lleva a `/proyectos/[slug]`.

**Cómo hacerlo**:

- Crear `src/app/proyectos/page.tsx` (index de la ruta padre; hoy solo existe
  `proyectos/[slug]/page.tsx`). Estructura de página secundaria (Header base="/",
  Footer base="/", etc.), con una **grid** de tarjetas de proyecto.
- La grid muestra **todos** los proyectos de `site.projects` (los 7), tengan o no
  `detail`. Los que tienen `detail` linkean a `/proyectos/[slug]` con `<Link>`; los que
  todavía no tienen ficha se muestran igual pero **no son clickeables** (o linkean a
  algo neutro). Esto es a propósito: después se les agregan fichas.
- Diseño: acorde al resto del sitio. Reutilizar el look de las tarjetas de
  `Portfolio.tsx` (`.card`, `img` de `project.cover`, `figcaption` con `card__name` y,
  si tiene ficha, `card__case` con `<ArrowDiagonal/>`). Grid responsive (p. ej. 2–3
  columnas en desktop, 1–2 en mobile) con la estética de la web (fondo oscuro o crema
  coherente, pastillas, tipografías). Agregar los estilos de la grid en `globals.css`.
- Metadata propia de la página (`generateMetadata` o `metadata` export) con título
  "Proyectos — Dutsiland".

**Verificación**: `/proyectos` muestra la grid; las tarjetas con ficha navegan a su
página; las sin ficha no navegan; el estilo es consistente con el sitio.

---

### 6. Home: "Proyectos destacados" con botón y tarjetas no clickeables

**Síntoma / pedido**: en el home, la sección "Proyectos destacados" (`Portfolio.tsx`)
debe:

1. Tener un **botón** que lleve a `/proyectos`.
2. Que los proyectos que aparecen detrás **no sean clickeables** (hoy los que tienen
   `detail` son `<Link>` navegables).

**Cómo hacerlo** (en `Portfolio.tsx`):

- Cambiar todas las tarjetas para que sean elementos **no interactivos** (`<figure>` sin
  `<Link>`), independientemente de si tienen `detail`. Quitar `data-cursor-title`/estado
  hover de "ver caso" si corresponde, o dejarlo como puro decorado. La marquesina sigue
  corriendo (es visual), pero no navega.
- Agregar un `<Button href="/proyectos">` (usar el `Button` del proyecto) con un label
  tipo "Ver todos los proyectos" (agregar el texto a `site.portfolio` en `site.ts`).
- El botón sí navega con client-side (`Button` renderiza un `<a>`; para navegación
  interna sin recargar preferir `<Link>` — evaluar convertir `Button` para que acepte
  navegación con `next/link`, o usar `<Link>` directamente estilado como botón). Lo
  importante: no debe dispararse el preloader al ir a `/proyectos`.

**Verificación**: en el home las tarjetas no responden al click; el botón lleva a
`/proyectos` sin recargar.

---

### 7. Nueva ruta `/contacto` con formulario (Formspree)

**Síntoma / pedido**: hoy "Contacto" es un ancla (`#contacto`) que apunta al footer.
Se quiere una **URL propia `/contacto`** con un **formulario** que use **Formspree**.

**Cómo hacerlo**:

- Crear `src/app/contacto/page.tsx` (página secundaria con Header/Footer/etc.).
- Formulario **cliente** (`'use client'`) con campos **Nombre**, **Email**, **Mensaje**
  (mismos que la rama main). **Validación simple y nativa** (atributos `required`,
  `type="email"`, `minLength`), **sin** sumar Formik/Yup/SweetAlert2 ni ninguna
  dependencia nueva.
- Envío por `fetch` POST a `https://formspree.io/f/xnqenpeb` con headers
  `Accept: application/json` y `Content-Type: application/json`, body
  `{ name, email, message }`. Manejar estados: enviando, éxito ("¡Solicitud de contacto
  enviada!") y error (mostrar el mail de contacto como fallback,
  `contacto@dutsiland.com`). Mensajes de estado con el estilo del sitio (no alerts del
  navegador).
- Texto y labels a `site.ts` (agregar `site.contact`).
- Diseño coherente con la web (paleta, tipografías, botón `<Button/>` o botón estilado
  igual). Estilos del form en `globals.css`.
- Metadata "Contacto — Dutsiland".

**Verificación**: `/contacto` envía a Formspree y muestra el estado de éxito/error; la
validación nativa impide enviar vacío o con email inválido.

---

## Contenido

### 8. "Cómo trabajamos": eliminar el paso de la demo

**Síntoma / pedido**: en la sección "Cómo trabajamos" hay un paso que dice que
construimos una demo. **Nunca hacemos eso**, hay que eliminarlo.

**Dónde**: `src/content/site.ts`, `site.process.steps`. Es el paso:

```
{ n: '04', title: 'Construimos una demo', text: 'Armamos una versión navegable para que veas y uses el producto antes de decidir.' }
```

**Cómo hacerlo**: eliminar ese objeto del array y **renumerar** los `n` de los pasos
siguientes (05→04, 06→05), de modo que queden 5 pasos correlativos 01–05. Verificar que
el título general y cualquier texto que hable de "ver el producto antes de invertir"
siga teniendo sentido tras quitar la demo (ajustar el copy si quedara incoherente,
marcando con `TODO(Dutsiland)` si hace falta validación).

**Interacción con GSAP**: `initProcess` en `HomeExperience.tsx` itera sobre
`.home-process .step` dinámicamente (`steps.forEach`), así que soporta cualquier
cantidad de pasos sin cambios. Solo verificar que la grid de `.process-steps`
(`repeat(3, ...)` en `globals.css:598`) se vea bien con 5 items.

---

### 9. Header: eliminar "Software a Medida"

**Síntoma / pedido**: quitar el texto "Software a Medida" que aparece en el header (el
slogan, arriba a la derecha en desktop / centrado en mobile).

**Dónde**: `Header.tsx`, bloque `.column-slogan` / `.slogan-img` que renderiza
`{site.slogan}`.

**Cómo hacerlo**: eliminar el bloque `.column-slogan` del header (el `<div
className="col-lg-2 offset-lg-6 ...">`). Ajustar el grid del header si al sacar esa
columna se descuadra el layout (las columnas usan `col-lg-*` con `offset`). Dejar
`site.slogan` en `site.ts` si se usa en otro lado (el footer también lo usa,
`.footer-slogan` — **no** tocar el footer). Revisar `globals.css` por reglas
`.column-slogan`/`.slogan-img` que queden sin uso en el header (se pueden dejar si el
footer las comparte; confirmar).

**Verificación**: el header no muestra el slogan en desktop ni en mobile; el footer lo
sigue mostrando.

---

## Header y logo

### 10. Mobile: mostrar la "D" del logo (hoy no se ve)

**Síntoma / pedido**: en mobile el logo del header no se ve. Debería verse la **D**,
como en desktop.

**Contexto** (`globals.css` ~236–245): en mobile el header oculta `.logo-d` y
`.logo-rest` y muestra `.logo-lockup` (un isologo `logo-dark.png`). Con el header de
fondo negro (ver punto 12) y el lockup en su versión `is-dark`, el logo queda invisible
o mal contrastado. El markup del logo está en `Header.tsx` (`.container-logo` con
`.logo-d`, `.logo-rest`, `.logo-lockup`).

**Cómo hacerlo**: en mobile mostrar la **misma D** que usa desktop (`.logo-d`, que tiene
`wide-D-dark.png` / `wide-D-light.png`) en vez del lockup, o adaptar `.logo-lockup` para
que muestre una D visible. Debe respetar el color según el fondo (ver punto 11): D crema
sobre fondo oscuro, D negra sobre fondo claro. Ajustar las reglas del `@media
(max-width: 1025px)` del logo.

**Verificación**: en mobile (< 768px y 768–1025px) se ve una D nítida y bien
contrastada contra el fondo del momento.

---

### 11. Logo y botón de menú: color según el fondo (desktop y mobile)

**Síntoma / pedido**: la **D del logo** debe elegir su color (negro o crema) según el
**fondo de la sección** que tiene debajo en ese momento. Igual con el **botón de menú**
(el círculo + texto "menu"). Esto debe funcionar en **desktop y mobile**.

**Contexto**: ya existe la maquinaria: `initSectionWatcher` (`scrollState.ts`) pone
`#header[data-get-section="dark"]` cuando debajo hay una sección con
`data-set-section="dark"`. En `globals.css:246–250` esto **solo** cambia el color del
logo en desktop:

```
@media (min-width: 1025.1px) {
  body:not(.menu-active):not(.menu-leave) #header[data-get-section='dark'] { --color: var(--white-1); }
  ... .logo img.is-dark { opacity: 0 } / img.is-light { opacity: 1 }
}
```

**Cómo hacerlo**:

- Extender esa lógica a **mobile/tablet** (que hoy fuerza `#header { background: negro;
--color: blanco }` de forma fija, ver punto 12). Una vez que el header mobile deje de
  tener fondo negro (punto 12), el color del logo, del texto y del botón de menú debe
  derivar de `data-get-section` igual que en desktop, usando la variable `--color`.
- El botón `#bt-menu` ya usa `var(--color)` para su círculo (`:before`) y su texto, así
  que si `--color` cambia con la sección, el botón acompaña. Verificar que no haya un
  `--color` fijo pisándolo en mobile.
- El logo mobile (punto 10) debe alternar `is-dark`/`is-light` según
  `data-get-section`, igual que el desktop.

**Verificación**: al scrollear por secciones oscuras y claras, la D del logo y el botón
"menu" invierten su color correctamente, en desktop y en mobile.

---

### 12. Mobile: el header no debe tener fondo negro

**Síntoma / pedido**: en mobile el header tiene un fondo negro fijo. No debería.

**Dónde** (`globals.css:212`):

```
@media (max-width: 1025px) { #header { padding-top: 2.5rem; padding-bottom: 2.5rem; background: var(--black-1); --color: var(--white-1); } }
```

**Cómo hacerlo**: quitar `background: var(--black-1)` y el `--color: var(--white-1)`
fijo de esa regla, dejando el header transparente en mobile (como en desktop, donde el
fondo solo aparece con el menú abierto vía `#header:before`). El color pasa a
depender de `data-get-section` (punto 11). Mantener los paddings.

**Ojo**: esto está acoplado a los puntos 10 y 11 — hacerlos juntos y verificar que el
logo y el botón queden legibles sobre cualquier sección (la hero arranca oscura, así
que sobre ella el logo/botón deben ser crema).

**Verificación**: en mobile el header es transparente; el contenido de las secciones se
ve pasar por detrás; logo y botón legibles en todo momento.

---

## Menú

### 13. Recortar los ítems del menú

**Síntoma / pedido**: eliminar del menú **"Qué hacemos"** y **"Cómo trabajamos"**. El
menú final tiene: **Sobre Dutsiland**, **Proyectos**, **Contacto** (ver punto 3).

**Dónde**: `site.ts`, `site.menu`. Hoy:

```
{ label: 'Nuestra historia', href: '#historia' },
{ label: 'Qué hacemos',      href: '#servicios' },
{ label: 'Cómo trabajamos',  href: '#proceso' },
{ label: 'Proyectos',        href: '#proyectos' },
{ label: 'Contacto',         href: '#contacto' },
```

**Cómo hacerlo**: dejar el menú como:

```
{ label: 'Sobre Dutsiland', href: '/sobre' },
{ label: 'Proyectos',       href: '/proyectos' },
{ label: 'Contacto',        href: '/contacto' },
```

Los `href` ahora son **rutas** (`/...`), no anclas. `Header.tsx` prependea `base` a
cada href — con las rutas absolutas conviene revisar que `base` no las rompa (en la home
`base=''`, en páginas secundarias `base='/'`; con hrefs que ya empiezan con `/`, no hay
que prependear nada — ajustar `Header.tsx` y `Footer.tsx` para no duplicar). El footer
(`Footer.tsx`) también itera `site.menu`, así que hereda el nuevo menú.

**Interacción con menu.ts**: `initMenu` intercepta clicks en anclas `#`. Con hrefs de
ruta, esos clicks deben ser navegación normal de `next/link`. Verificar que
`onAnchor` deje pasar los `href` que empiezan con `/` (hoy ya hace `if
(!href.startsWith('#')) return`, lo cual está bien) y que el menú se cierre al navegar
(`data-menu-close`).

**Verificación**: el menú muestra 3 ítems y cada uno navega a su ruta cerrando el menú.

---

### 14. Al abrir el menú: bloquear el scroll y poner el menú por encima del footer

**Síntoma / pedido**: (a) al abrir el menú debe **bloquearse el scroll**; (b) hoy el
**footer queda por encima del menú** (ver foto 1).

**Contexto**:

- `menu.ts` `open()` hace `smoother && smoother.paused(true)` — eso frena el scroll
  suave **en desktop**, pero en **mobile** no hay smoother, así que el scroll nativo
  sigue. Existe `body.menu-active { overflow: hidden }` (`globals.css:56`), pero con el
  layout de scroll (wrapper con overflow propio / normalizeScroll) puede no alcanzar en
  mobile.
- El menú vive dentro del header (`nav.menu` en `Header.tsx`). El footer
  (`#footer`) y el menú están en distintos stacking contexts; el `z-index` del footer o
  del panel del footer termina por encima del menú.

**Cómo hacerlo**:

- **Bloqueo de scroll robusto en mobile**: además de `overflow: hidden` en `body`,
  bloquear el scroll táctil. Opciones: fijar el `body`/`html`
  (`position: fixed; width: 100%; top: -scrollY`) mientras el menú está abierto y
  restaurar el scroll al cerrar; o aplicar `overflow: hidden` al contenedor real que
  scrollea. Implementarlo en `menu.ts` `open()`/`close()` (guardar la posición de
  scroll al abrir y restaurarla al cerrar). Contemplar el layout con `#smooth-wrapper` /
  scroll nativo según device (`getDevice`).
- **z-index**: el menú (`nav.menu` / `.menu--wrapper` / el `#header`) debe quedar por
  encima del footer. Revisar los `z-index` en `globals.css`: `#header` tiene `z-index:
99`; buscar el `z-index` de `#footer`/`.footer-panel` y del overlay del menú y
  asegurar que el menú abierto (`body.menu-active`) tenga un `z-index` mayor que
  cualquier cosa del contenido, incluido el footer. El overlay `#header:before` (fondo
  del menú) también debe cubrir el footer.

**Verificación**: con el menú abierto, en mobile y desktop, la página de fondo no
scrollea y ninguna parte del footer se ve por encima del menú.

---

### 14b. Eliminar los `id` navegables de las secciones del home

**Síntoma / pedido**: no debe poder visitarse una sección del home a través de su `id`.
Hay que eliminar los `id` que hoy sirven de destino de anclas.

**Dónde** (en los componentes de la home):

- `Hero.tsx`: `id="top"` (sección), `id="sobre-nosotros"` (`.hero-claim`), y `Services`
  con `id="servicios"`.
- `History.tsx`: `id="historia"`.
- `Process.tsx`: `id="proceso"`.
- `Portfolio.tsx`: `id="proyectos"`.
- `Footer.tsx`: `id="contacto"` (el ancla de contacto actual).

**Cómo hacerlo**:

- Quitar los `id` que existían **solo** para navegación por anclas (`#historia`,
  `#servicios`, `#proceso`, `#proyectos`, `#sobre-nosotros`, `#contacto`). El contenido
  de esas secciones ahora vive en rutas propias o ya no se navega por ancla.
- **Excepción `#top`**: el botón "volver arriba" (`ScrollTop.tsx`) usa `href="#top"` y
  `menu.ts` trata `#top` como "ir al principio de la página" (posición 0), no como un
  ancla de sección. Se puede conservar `#top` **o** cambiar `ScrollTop` para que llame a
  `scrollToTarget(0, ...)` sin depender del `id`. Preferir no dejar `id="top"` en la
  sección si se puede resolver el "volver arriba" sin él.
- Después de quitar los `id`, **limpiar `menu.ts`**: la maquinaria de `data-hero-progress`
  / `scrollToTarget` sobre anclas del hero (`goToHash`, `markHeroAnchor` en
  `HomeExperience.tsx`) queda mayormente sin uso al pasar a rutas. Eliminar el código
  muerto con cuidado de no romper el "volver arriba" ni la navegación a rutas.
- Verificar que ningún `href="#..."` quede apuntando a un `id` eliminado (buscar en
  `site.ts`, `Header.tsx`, `Footer.tsx`, `Cookies.tsx`, `ProjectView.tsx`). Nota:
  `ProjectView.tsx` y `site.projectView.cta` usan `/#proyectos` y `/#contacto` — al
  existir `/proyectos` y `/contacto` como rutas, cambiar esos destinos a las rutas
  nuevas (`/proyectos`, `/contacto`).

**Verificación**: no hay navegación por `id` de secciones del home; el "volver arriba"
sigue funcionando; no quedan enlaces rotos a anclas.

---

## Hero / "Qué hacemos"

### 15. La línea blanca queda por encima del botón (foto 2)

**Síntoma / pedido**: en "Qué hacemos", una **línea blanca** queda por **encima del
botón** "Hablá con nosotros" (foto 2).

**Contexto**: cada frente (`.service`) tiene `border-top: 2px solid rgba(246,240,225,
.24)` (`globals.css:515`). En el cierre de la secuencia (`buildServicesSequence` en
`HomeExperience.tsx`, fase "recap"), los frentes se reacomodan como índice y aparece la
`.services-cta` (el botón). La línea (borde superior de un `.service`) queda visualmente
pegada arriba del botón porque el layout absoluto (`.services-stack .service { position:
absolute }`) y el `translateY` del recap dejan un borde a la altura del CTA.

**Cómo hacerlo**: ajustar el layout/espaciado para que ninguna línea de `.service`
quede sobre `.services-cta`. Posibles caminos (elegir el más limpio sin romper la
animación):

- Dar a `.services-cta` un fondo/margen o un `z-index`/posición que la separe de las
  líneas, o
- Asegurar que el último `.service` del índice no dibuje su borde a la altura del botón
  (ajustar `rowStep()` / el `y` final del recap en `buildServicesSequence`), o
- Cambiar el `border-top` de `.service` por un elemento de línea propio (ver punto 16),
  que además da control fino para no pisar el CTA.

Coordinar con el punto 16 (conviene resolverlos juntos, porque ambos tocan la línea).

**Verificación**: en desktop, al llegar al cierre de "Qué hacemos", el botón "Hablá con
nosotros" no tiene ninguna línea encima; se ve limpio como el resto del índice.

---

### 16. La línea blanca debe trazarse con el scroll (foto 3)

**Síntoma / pedido**: esa misma línea blanca de los frentes debería **trazarse**
(dibujarse de izquierda a derecha) mientras se scrollea, en vez de estar ya dibujada. La
foto 3 muestra el problema: la línea ya está completa y lo único que se anima es el
contenedor negro que la va tapando.

**Contexto**: hoy la línea es un `border-top` **estático** (`globals.css:515`), no se
puede animar su trazado. **Ya existe el patrón correcto** en "Cómo trabajamos":
`.step__line` es un elemento propio con `transform: scaleX(0); transform-origin: left
center` (`globals.css:600`) que GSAP anima a `scaleX(1)` en `initProcess` (función
`draw`), justamente "para poder trazarla con GSAP" (comentario en `globals.css:599`).

**Cómo hacerlo**:

- Reemplazar el `border-top` de `.service` por un **elemento de línea propio** análogo a
  `.step__line`: agregar en `Services.tsx` un `<span className="service__line"
aria-hidden="true" />` dentro de cada `.service`, y en `globals.css` estilarlo como
  línea absoluta arriba (`height: 2px; background: rgba(246,240,225,.24); transform:
scaleX(0); transform-origin: left center`). Quitar el `border-top` de `.service`.
- En `buildServicesSequence` (`HomeExperience.tsx`), al entrar cada frente, animar su
  `.service__line` de `scaleX(0)` a `scaleX(1)` (mismo enfoque que `draw` en
  `initProcess`). El trazado acompaña el scroll porque la timeline de servicios está
  enganchada al pin del hero (scrub).
- Mantener el estado inicial explícito (`gsap.set(..., { scaleX: 0 })`) por el mismo
  motivo documentado en el resto del archivo (los `fromTo` en posición > 0 dentro de una
  timeline con scrub no aplican su "from" hasta que la playhead llega).
- Contemplar mobile: en mobile los frentes quedan apilados (no hay recap con índice);
  decidir si la línea se traza también al entrar cada frente o se deja estática. Preferir
  trazarla al entrar, consistente con el proceso.

**Verificación**: en desktop, al scrollear por "Qué hacemos", la línea de cada frente se
dibuja de izquierda a derecha a medida que entra, no aparece ya completa.

---

## Loader

### 17. Entrada con scroll avanzado: animación de aparición (global)

**Síntoma / pedido**: si el usuario está parado en una parte del sitio que no es el
hero, **recarga** la página y aparece de golpe en ese punto — se ve muy raro. El loader
debería contemplar una **animación de aparición** del contenido para esos casos.
Referencia de inspiración: https://www.defprojetos.com/ (transición de entrada suave).
Debe ser **global** (home, /sobre, /proyectos, ficha, /contacto).

**Contexto**:

- El navegador restaura el scroll a la posición previa tras un reload
  (`history.scrollRestoration = 'auto'` por defecto). En la home el hero está **fijado**
  (pin): si el scroll se restaura a mitad, el pin y las timelines de GSAP arrancan
  descoordinados y el resultado es el salto feo.
- El preloader (`loader.ts`) hoy solo corre en la primera carga y sale con un fade.
- `HomeExperience.tsx` maneja el caso "volver desde una ficha con ancla" saltando la
  intro (`intro.progress(1)`), pero no el caso "reload con scroll a mitad".

**Cómo hacerlo** (definir un comportamiento global y consistente):

- Mientras el loader está visible (`body[data-load]` != `first-done`), **forzar el
  scroll arriba** para que la coreografía arranque desde un estado conocido: setear
  `history.scrollRestoration = 'manual'` (en `layout.tsx` o en un pequeño script/efecto
  de arranque) y `window.scrollTo(0,0)` antes de correr las intros. Así se elimina el
  "aparecer a mitad".
- Reemplazar/complementar la salida del loader por una **animación de aparición del
  contenido**: cuando el loader se va (`onLeaving`/`onDone`), animar la entrada del
  contenido (fade + leve `y`/clip) tomando como inspiración la transición de defprojetos
  (entrada limpia, no un corte). Puede hacerse a nivel de `#main-transition` /
  `.container-wrapper` con GSAP, disparado en `arrancar()` de `HomeExperience` y en el
  equivalente de las páginas secundarias.
- Debe aplicar a **todas** las vistas. Extraer la animación de entrada a un helper de
  `lib/` reutilizable por `HomeExperience`, `ProjectExperience`, y las nuevas páginas
  `/sobre`, `/proyectos`, `/contacto` (que deben tener su propia experiencia cliente o
  reutilizar el loader + reveal).
- Cuidado: no romper el caso ya contemplado de "volver desde ficha con ancla". Con
  `scrollRestoration = 'manual'`, la navegación a anclas internas queda del lado del
  código (ya se resuelve con `goToHash`/`scrollToTarget`); revisar que siga andando tras
  el rediseño de rutas (que reduce mucho el uso de anclas).

**Verificación**: recargar la página estando scrolleado a mitad (en cada vista) arranca
desde arriba con una animación de aparición suave, sin el salto abrupto actual.

---

### 18. Loader en mobile: la "D" no debe cambiar de tamaño

**Síntoma / pedido**: en el loader de **mobile**, la D **cambia de tamaño de golpe**
cuando aparece el logo completo. Debería tener **siempre el mismo tamaño** en mobile.

**Contexto**:

- El loader muestra `#loader .d-mark { height: 35vh }` (`globals.css:149`) — una D
  grande centrada.
- Al terminar la intro, el contenido del hero toma protagonismo. La D del logo del hero
  (`.hero-logo__d`, imagen `D-light.png`) y la coreografía de `.blob-left` tienen otro
  tamaño. En mobile, la transición del tamaño de la D del loader al de la D del hero se
  percibe como un salto.
- La intro (`playHeroIntro` en `HomeExperience.tsx`) anima el blob (`clipTween`) y el
  lockup; el "salto" es la discontinuidad de tamaño entre la D del preloader y la D con
  la que arranca el hero en mobile.

**Cómo hacerlo**:

- Igualar el tamaño de la D del loader en mobile con el tamaño con el que aparece la D
  del hero, para que la transición sea continua. Es decir: la altura de `#loader
.d-mark` en mobile debe coincidir con la altura efectiva de la D del hero al inicio de
  la intro (revisar `--blob-radius` mobile = `12rem` y los estados `leftFull`/`leftHero`
  de `MCLIP` en `HomeExperience.tsx`, y el tamaño de `.hero-logo__d` en `globals.css`).
- Alternativa/más robusto: hacer que la D no cambie de tamaño entre el loader y el
  primer frame del hero (misma altura/posición), de modo que el paso loader→hero sea un
  crossfade sin reescalado. Agregar una media query específica para mobile en `#loader
.d-mark` si hace falta un valor distinto al `35vh` de desktop.
- Verificar en teléfono real / responsive < 768px, contemplando la barra de direcciones
  (el proyecto ya maneja `--vh` para eso; usar `--vh` en vez de `vh` puro si el salto se
  debe al cambio de alto de viewport).

**Verificación**: en mobile, al pasar del preloader al hero, la D mantiene un tamaño
constante (sin salto perceptible).

---

## Checklist final

- [ ] `npm run typecheck` sin errores
- [ ] `npm run lint` sin errores nuevos
- [ ] `npm run build` OK (Next 16)
- [ ] Home: título/subtítulo/botón "Conocé más" → `/sobre`; proyectos no clickeables +
      botón → `/proyectos`; menú de 3 ítems; sin slogan en header; "Cómo trabajamos" sin
      el paso de la demo; línea de "Qué hacemos" trazándose y sin pisar el botón.
- [ ] `/sobre`, `/proyectos`, `/contacto` existen, con estilo consistente y navegación
      client-side.
- [ ] `/contacto` envía a Formspree con validación nativa.
- [ ] Header mobile: sin fondo negro, D visible, color de logo/botón según la sección.
- [ ] Menú: scroll bloqueado al abrir (desktop y mobile) y menú por encima del footer.
- [ ] Loader: entrada suave al recargar con scroll avanzado (todas las vistas); D del
      loader de tamaño constante en mobile.
- [ ] Ningún `id` navegable de secciones del home quedó en uso desde el menú (las
      secciones internas pueden conservar `id` solo si algo del layout lo necesita, pero
      no deben ser destino de navegación).

```

```
