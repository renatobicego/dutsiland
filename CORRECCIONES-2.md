# Correcciones — Sitio Dutsiland (segunda tanda)

Segundo brief de trabajo sobre el sitio de **Estudio Dutsiland**. Recoge lo que quedó
mal o a medias después de aplicar el primer documento (`CORRECCIONES.md`). Para cada
punto va el síntoma, dónde se manifiesta y qué se espera como resultado. La solución
técnica queda a criterio de quien implemente.

Antes de empezar, conviene entender la arquitectura general (ver `CORRECCIONES.md`): es
una landing en Next.js con animaciones de scroll con GSAP, un hero muy elaborado hecho de
dos siluetas de "D", un preloader propio, y rutas dedicadas para Sobre, Proyectos y
Contacto además de las fichas de cada proyecto.

## Estado actual (después de la primera tanda)

- Ya se migró a la versión nueva de Next y React.
- Existen las rutas `/sobre`, `/proyectos` (índice) y `/contacto`; las fichas siguen en
  `/proyectos/<slug>`.
- Las páginas que no son la home comparten un mismo armazón y una misma "experiencia"
  de animación.
- Hay una lógica nueva de entrada al sitio: al cargar se fuerza el arranque desde arriba
  y el preloader se disuelve con una animación en lugar de cortarse.
- "Sobre Dutsiland" en el home es solo un anuncio (título, subtítulo y un botón que
  lleva a `/sobre`); el contenido completo vive en `/sobre`.
- La página `/sobre` reutiliza el diseño de la ficha de proyecto.
- En el home, las tarjetas de proyectos del carrusel ya no navegan y se agregó un botón
  hacia el índice `/proyectos`.
- "Qué hacemos" ahora tiene cuatro frentes (antes eran tres) y su línea ya está pensada
  para trazarse con el scroll.

---

## 1. "Qué hacemos": el botón sigue tapado — el blob debe ser más alto (imagen 1)

**Síntoma**: en el cierre de "Qué hacemos", cuando los cuatro frentes se acomodan como
índice, el contenido queda pegado al botón "Hablá con nosotros"; el botón se ve apretado
contra las filas de arriba.

**Contexto**: "Qué hacemos" no es una sección con alto propio, vive dentro del panel
negro del hero, cuyo alto está limitado por la pantalla. Ese panel se dimensionó cuando
los frentes eran tres; ahora son cuatro y, sumado al botón, no entran con aire.

**Qué se espera**: el panel negro debe ser más alto (o ganar alto útil interno) para que
los cuatro frentes en índice y el botón entren con separación clara. Ninguna línea ni
fila debe quedar pegada o encima del botón. Verificar especialmente en pantallas anchas y
de poca altura, donde el espacio vertical es más escaso.

---

## 2. Entrar directo a una URL no carga el contenido (hay que recargar)

**Síntoma**: al abrir directamente una URL que no es la home (por ejemplo `/sobre`,
`/proyectos`, `/contacto` o una ficha), el contenido no aparece: se ve solo la
portada/el "blob". Recién recargando la página aparece el contenido. Está relacionado con
la imagen 3.

**Contexto**: los bloques de contenido de estas páginas arrancan ocultos y se revelan al
entrar en pantalla mediante animaciones atadas al scroll. En la carga directa de una URL,
esos bloques no se están revelando de forma confiable (parece un problema de coordinación
entre la lógica de "arrancar desde arriba", el scroll suave y el momento en que se
calculan las animaciones). Al recargar, el resultado es distinto y sí aparecen.

**Qué se espera**: entrar por URL directa a cualquier página secundaria (tanto en
desarrollo como en el build de producción, en escritorio y en móvil) debe mostrar todo el
contenido sin necesidad de recargar. Como criterio de robustez: si por lo que sea una
animación de aparición no llega a ejecutarse, el contenido no debería quedar invisible.

**Verificación**: abrir en la barra de direcciones `/sobre`, `/proyectos`, `/contacto` y
una ficha, y también recargar cada una, comprobando que el contenido siempre esté visible.

---

## 3. `/sobre`: el texto debe ser más ancho (imagen 2)

**Síntoma**: en `/sobre`, el bloque de portada (antetítulo, título y subtítulo) queda
comprimido en una columna angosta a la izquierda, con mucho espacio negro vacío a la
derecha.

**Contexto**: `/sobre` reutiliza el diseño de la portada de la ficha de proyecto. En las
fichas, ese espacio de la derecha está reservado a propósito para la captura de portada
del proyecto. Pero `/sobre` no tiene esa captura, así que el espacio reservado solo sirve
para apretar el texto sin motivo.

**Qué se espera**: en `/sobre` el título y el subtítulo deben usar el ancho útil del
panel, coherente con el resto del sitio, sin heredar la reserva de espacio de las fichas.
No debe afectarse el diseño de la ficha de proyecto. Verificar en escritorio, tablet y
móvil.

---

## 4. `/sobre`: hay un botón "colgado" en el medio (imagen 3)

**Síntoma**: en `/sobre` aparece el botón "Trabajemos juntos" flotando en el medio de la
nada, sin contexto alrededor.

**Contexto**: son dos cosas juntas. Una es el bug del punto 2 (el texto del cuerpo no se
reveló y quedó invisible, por eso solo se ve el botón). La otra es de diseño: el cierre de
`/sobre` reutiliza la sección de "siguiente proyecto" de las fichas pero dejando
únicamente el botón, sin antetítulo ni título, así que aun con todo visible queda un botón
solo en una sección grande y vacía. Además, la sección de equipo hoy no se muestra si no
hay fotos cargadas, con lo cual la página queda muy corta.

**Qué se espera**: `/sobre` debe leerse como una página completa y con cuerpo: portada
con su texto, contenido, y un cierre con contexto (no un botón huérfano). El contenido
faltante debe definirse (lo que necesite validación del cliente, dejarlo marcado como
pendiente).

---

## 5. Color del logo y del botón de menú: según lo que hay debajo de cada uno (imagen 2)

**Síntoma**: en `/sobre` (y en cualquier vista donde el header cruce una sección que no
ocupa todo el ancho), el botón "menu" de arriba a la derecha no se ve. Ejemplo concreto:
arriba de `/sobre` la portada es una "D" negra que no llega hasta la derecha; justo debajo
del botón el fondo real es crema, pero el botón se pinta claro (como si tuviera negro
debajo) y queda invisible sobre el crema.

**Contexto**: hoy el color del header (logo y botón) se decide con un único criterio para
todo el header, tomado más o menos por el centro. No contempla que el logo (a la
izquierda) y el botón (a la derecha) puedan tener fondos distintos debajo, que es lo que
pasa cuando la forma de arriba es una "D"/blob que no cubre el ancho.

**Qué se espera**: el color del logo y el del botón de menú deben decidirse según el
fondo real que tiene cada uno justo debajo, no según un único valor para todo el header.
Debe funcionar en escritorio y en móvil. Verificar arriba de `/sobre` y de una ficha, y
scrolleando por secciones donde el fondo bajo el logo y bajo el botón difieran.

---

## 6. "Qué hacemos": la línea blanca no se traza con el scroll

**Síntoma**: la línea blanca de cada frente se ve ya dibujada (completa) en vez de irse
dibujando de izquierda a derecha acompañando el scroll.

**Contexto**: la línea ya está preparada para trazarse (es un elemento propio y la
animación existe). El problema es que no se percibe: en el estado de índice del cierre las
cuatro líneas ya están completas, y el intercambio de frentes es tan rápido que el trazado
casi no se ve. Conviene también confirmar que la línea que se ve es efectivamente la que
está pensada para animarse y no un borde estático residual.

**Qué se espera**: al scrollear "Qué hacemos", cada línea debe dibujarse de izquierda a
derecha de forma perceptible, incluido el momento en que los frentes se acomodan como
índice. Que se lea como un trazado que avanza, igual que las líneas de la sección "Cómo
trabajamos", que sí se perciben.

---

## 7. Home: el botón "Ver todos los proyectos" no es clickeable; las cards de atrás no deben ser interactuables

**Síntoma**: en el home, el botón de la sección "Proyectos destacados" no responde al
click.

**Contexto**: el botón está dentro del contenedor del titular, que tiene desactivada la
interacción (se desactivó para que el titular no tape el carrusel que corre detrás). Esa
desactivación también anula los clicks del botón.

**Estado de las cards**: ya están bien, son decorativas y no navegan. Solo confirmar que
siguen así.

**Qué se espera**: el botón "Ver todos los proyectos" debe ser clickeable y llevar a
`/proyectos` sin recargar la página; el carrusel de tarjetas detrás debe seguir sin
responder a clicks.

---

## 8. Hero móvil: rehacer según el diseño (reenviar la imagen de diseño mobile)

> **Acción requerida antes de implementar**: reenviar la **imagen de diseño mobile del
> hero** (las referencias que el cliente llama imagen 4 e imagen 5). Hay que trabajar
> sobre esa imagen, porque el diseño actual de móvil no la respeta.

**Síntoma**: el hero del home en móvil está mal, no sigue el diseño.

**Qué pide el diseño** (según las referencias, a confirmar con la imagen que se reenvíe):

- Se mantienen los dos blobs del escritorio, pero en móvil quedan apilados en vertical:
  uno arriba y otro abajo (imagen 4). En la referencia, el de arriba lleva un texto tipo
  "estudio de diseño y desarrollo web" y el de abajo la "D" grande del logo con el nombre
  y el mail.
- Después ocurre una animación análoga a la de escritorio: el blob que tiene el logo se
  achica y el blob que tiene el texto se agranda y cambia su texto (imagen 5), pasando a
  la frase principal.

**Contexto**: el móvil hoy resuelve el hero con otro esquema distinto al de dos blobs
apilados que crecen y se achican. Hay que rehacer esa parte para que coincida con el
diseño.

**Qué se espera**: en móvil el hero debe arrancar con los dos blobs apilados como en la
imagen de diseño y, al scrollear, el blob del logo se achica mientras el del texto crece y
cambia su contenido, igual que en escritorio pero en sentido vertical. Verificar en un
teléfono real, no solo en el modo responsive del navegador. El resultado debe coincidir
con la imagen de diseño reenviada.

---

## Checklist final

- [ ] "Qué hacemos": los cuatro frentes en índice y el botón entran con aire; nada tapa
      el botón (probar en pantallas anchas y bajas).
- [ ] Entrar por URL directa (en desarrollo y en producción) a `/sobre`, `/proyectos`,
      `/contacto` y una ficha, en escritorio y móvil: el contenido aparece sin recargar.
- [ ] `/sobre`: texto de portada ancho; página con cuerpo; sin botón huérfano.
- [ ] Logo y botón de menú legibles según el fondo real bajo cada uno (probar arriba de
      `/sobre`).
- [ ] "Qué hacemos": la línea se traza de forma perceptible con el scroll.
- [ ] Home: botón "Ver todos los proyectos" clickeable hacia `/proyectos`; cards del
      carrusel no interactuables.
- [ ] Hero móvil rehecho según la imagen de diseño reenviada (dos blobs apilados + la
      animación de crecer/achicar).
