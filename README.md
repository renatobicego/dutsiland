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

### Secciones fijadas (solo desktop)

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

En móvil y tablet nada se fija: los bloques se revelan al entrar en pantalla.

## Dónde está cada cosa

| Qué                                                      | Dónde                               |
| -------------------------------------------------------- | ----------------------------------- |
| Todos los textos, links, servicios, pasos y proyectos    | `src/content/site.ts`               |
| Secciones                                                | `src/components/*.tsx`              |
| Qué hacemos (panel izquierdo del hero, no una sección)   | `src/components/Services.tsx`       |
| Intro, animaciones de scroll, loader, menú               | `src/components/HomeExperience.tsx` |
| Utilidades (reveals, marquesina, cursor, split de texto) | `src/lib/*.ts`                      |
| Estilos (todo el sistema visual)                         | `src/app/globals.css`               |
| Logos (D, UTSILAND, letras del logotipo)                 | `public/brand/`                     |
| Imágenes de los proyectos                                | `public/img/`                        |
| Tipografía (Montserrat, OFL)                             | `src/fonts/` + `src/app/layout.tsx` |

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
