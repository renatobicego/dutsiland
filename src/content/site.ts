// Contenido de la landing de Dutsiland.
// Estructura y piezas visuales según el storyboard v2.pdf.
// Proyectos y servicios tomados del sitio actual (https://dutsiland.com).
// Todo el texto visible vive acá para poder ajustarlo sin tocar componentes.

export type Link = {
  label: string
  href: string
  /** Etiqueta corta para la barra del header, donde "Sobre Dutsiland" no entra al lado
   *  del logotipo. El menú a pantalla completa y el footer siguen usando `label`. */
  short?: string
  /** El destino que en el header va como botón sólido en vez de como texto. Uno solo:
   *  si hubiera dos, ninguno sería el que importa. */
  cta?: boolean
}

export type ServiceGroup = {
  /** Número que se muestra al costado: '01', '02', '03' */
  n: string
  title: string
  /** La línea que diferencia este frente de los otros dos */
  lead: string
  items: string[]
}

export type ProcessStep = {
  n: string
  title: string
  text: string
}

export type TeamPhoto = {
  src: string
  alt: string
  /** Nombre y rol, debajo de la foto */
  name: string
  role: string
}

export type ProjectPhoto = {
  src: string
  alt: string
  /** Pie de foto: qué se está viendo en esa pantalla */
  caption: string
}

/** Un bloque de "qué construimos": el titular y la línea que lo explica */
export type BuiltItem = {
  title: string
  text: string
}

/** La ficha del proyecto. Los proyectos que todavía no la tienen van sin `detail`:
 *  la tarjeta se muestra igual en la marquesina, pero no linkea a ninguna parte. */
export type ProjectDetail = {
  /** Antetítulo de la ficha: el rubro o el tipo de producto */
  kicker: string
  /** Logo del cliente, para la portada. Publicité no tiene. */
  logo?: string
  /** La problemática que resolvemos, en dos o tres párrafos */
  problem: string[]
  built: BuiltItem[]
  photos: ProjectPhoto[]
}

/* La ficha tiene cinco partes y nada más: la portada con el nombre, la línea que dice
   qué es el proyecto, qué había que resolver, qué construimos y cómo se ve.
   No lleva "qué hicimos" —los proyectos se hacen enteros, no por partes— ni enlaces:
   la mayoría son sistemas privados de cada cliente y no se publican. */

export type Project = {
  /** Va en la URL: /proyectos/<slug> */
  slug: string
  /** Se muestra sobre la tarjeta y como título del cursor */
  name: string
  /** Una línea: qué es el producto */
  lead: string
  /** Portada cuadrada de la marquesina */
  cover: string
  coverAlt: string
  detail?: ProjectDetail
}

export type Site = {
  name: string
  shortName: string
  url: string
  description: string
  slogan: string
  email: string
  social: Link[]
  menu: Link[]
  hero: {
    /** Una línea del titular por elemento */
    headline: string[]
  }
  claim: {
    text: string
    cta: Link
  }
  /** Los síntomas con los que el visitante se reconoce, antes de contarle qué hacemos.
   *  Se leen como tickets abiertos: cada uno con su número y su estado. */
  problems: {
    /** La pregunta abre la sección y va sola: antes había un antetítulo chico
     *  —"TE SUENA CONOCIDO"— y debajo un titular, y los dos decían lo mismo. */
    title: string
    items: { n: string; quote: string }[]
    /** El cierre, al pie: primero por qué ninguna de las cuatro se arregla comprando
     *  otra cosa, y debajo el remate. Va después de las fichas y no antes —ahí estaba
     *  el párrafo hasta ahora—: la tensión la hacen las cuatro quejas seguidas, y
     *  soltarla antes de que caigan la desarma. */
    cierre: { texto: string; remate: string }
  }
  services: {
    kicker: string
    title: string
    intro: string
    groups: ServiceGroup[]
    cta: Link
  }
  process: {
    kicker: string
    title: string
    steps: ProcessStep[]
    cta: Link
  }
  portfolio: {
    titleLines: string[]
    subtitle: string
    /** Lo que dice la tarjeta cuando el proyecto sí tiene ficha */
    caseLabel: string
    /** El botón del visor del home, y el rótulo del cursor sobre cada tarjeta */
    verLabel: string
    /** Botón del home que lleva a /proyectos */
    cta: Link
  }
  /** Índice de /proyectos */
  projectsIndex: {
    kicker: string
    title: string
    intro: string
    /** Lo que dice una tarjeta que todavía no tiene ficha */
    sinFicha: string
  }
  /** Página /sobre. El home ya no la anuncia: se entra por el menú y por el pie */
  about: {
    /** El titular de /sobre. No se ve —la página abre en el recorrido— pero es el h1:
     *  sin él la página arranca su esquema en h2 y no se sabe de qué trata. */
    pageTitle: string
    /** Sólo para Google y para el link cuando se comparte: no se ve en la página.
     *  Antes acá iba el subtítulo de la portada, y era una frase que no decía nada. */
    metaDescription: string
    /** Cuerpo de /sobre: la historia contada como recorrido. Cada hito lleva su
     *  etapa (la etiqueta chica), su titular y el párrafo. */
    year: string
    hitos: { etapa: string; title: string; text: string }[]
    /** Qué nos define: le da cuerpo a la página y no depende de tener fotos */
    traitsKicker: string
    traitsTitle: string
    traits: { n: string; title: string; text: string }[]
    teamKicker: string
    teamTitle: string
    team: TeamPhoto[]
    /** Cierre de /sobre: el botón solo quedaba colgado en una sección vacía */
    finalKicker: string
    finalTitle: string
    finalText: string
    ctaFinal: Link
  }
  /** Página /contacto */
  contact: {
    kicker: string
    title: string
    intro: string
    fields: { name: string; email: string; message: string }
    submit: string
    sending: string
    success: string
    error: string
    /** Qué pasa después de enviar. Va al lado del formulario porque es lo que frena a
     *  cualquiera antes de escribirle a un proveedor que no conoce. */
    nextTitle: string
    next: { n: string; title: string; text: string }[]
    /** Encabeza el mail y las redes, para el que prefiere no llenar un formulario */
    directLabel: string
  }
  projects: Project[]
  /** Copys fijos de la ficha de proyecto */
  projectView: {
    back: string
    problemKicker: string
    problemTitle: string
    builtKicker: string
    builtTitle: string
    photosKicker: string
    photosTitle: string
    /** Lo que dice el cursor sobre una captura. El sitio apaga el cursor del sistema,
     *  así que sin esto no aparece la manito y nada avisa que la imagen se puede abrir. */
    photosHint: string
    /** La misma aclaración, escrita debajo del título: el rótulo del cursor sólo lo ve
     *  el que ya puso el puntero encima, y en el teléfono no existe. */
    photosNota: string
    nextKicker: string
    cta: Link
  }
  footer: {
    legal: Link[]
  }
  cookies: {
    text: string
    linkLabel: string
    accept: string
  }
}

export const site: Site = {
  name: 'Estudio Dutsiland',
  shortName: 'Dutsiland',
  url: 'https://dutsiland.com',
  description:
    'Software factory: desarrollamos software a medida, sistemas de gestión y productos web. Tu idea merece algo mejor que una plantilla.',
  slogan: 'SOFTWARE A MEDIDA',

  email: 'contacto@dutsiland.com',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/dutsiland.estudio/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/dutsiland' },
  ],

  // Tres rutas. "Qué hacemos" y "Cómo trabajamos" siguen siendo secciones del home,
  // pero no tienen entrada en el menú ni URL propia.
  menu: [
    { label: 'Sobre Dutsiland', href: '/sobre', short: 'Sobre' },
    { label: 'Proyectos', href: '/proyectos' },
    // TODO(Dutsiland): "Hablemos" es la palabra del botón del header; el menú a pantalla
    // completa y el footer siguen diciendo "Contacto". Si se prefiere una sola palabra
    // en todos lados, se borra este `short`.
    { label: 'Contacto', href: '/contacto', short: 'Hablemos', cta: true },
  ],

  hero: {
    headline: ['DESARROLLO', 'DE SOFTWARE', 'A MEDIDA'],
  },

  claim: {
    text: 'Tu idea merece algo mejor que una plantilla. Nosotros la construimos de cero',
    cta: { label: 'Conocé qué hacemos', href: '#servicios' },
  },

  // ---------- Problemas comunes ----------
  // Va antes de "qué hacemos" a propósito: primero el visitante se reconoce en el
  // síntoma y recién después le contamos qué hacemos. Cada punto está escrito como lo
  // diría alguien de la operación, no como lo diría un vendedor de software: lo que
  // tiene que pasar acá es que el que lee piense "esto lo dije yo la semana pasada".
  // TODO(Dutsiland): validar las cuatro frases con lo que de verdad escuchan en las
  // primeras reuniones, y cambiar las que no suenen a algo que un cliente diría.
  problems: {
    title: '¿Te suenan algunas de estas situaciones?',
    items: [
      { n: '01', quote: 'Quiero hacer algo y el sistema no me deja' },
      { n: '02', quote: 'La mitad del trabajo lo hacemos en planillas aparte' },
      { n: '03', quote: 'Eso no se puede tocar, lo hizo alguien que ya no está' },
      { n: '04', quote: 'Lo pedimos hace meses y todavía estamos esperando' },
    ],
    cierre: {
      texto: 'Ninguna se arregla cambiando de licencia. Se arreglan construyendo el sistema que esa operación necesita.',
      remate: 'Nosotros lo resolvemos.',
    },
  },

  // ---------- Qué hacemos (tres frentes diferenciados) ----------
  services: {
    kicker: 'QUÉ HACEMOS',
    title: 'Cuatro frentes, un mismo equipo',
    intro:
      'No vendemos horas de diseño y horas de código por separado. Definimos cómo se usa el producto y lo construimos nosotros mismos.',
    // El orden de este array ES el orden en el que se ven los frentes, en apaisado y en
    // vertical: la secuencia del panel recorre los .service tal como están en el DOM.
    // IA va primera a pedido del estudio, por ser lo más nuevo del mercado.
    groups: [
      {
        n: '01',
        title: 'IA Y AUTOMATIZACIÓN',
        lead: 'Que el sistema resuelva solo lo que hoy resuelve alguien a mano.',
        items: [
          'Implementación de IA en procesos',
          'Agentes de IA',
          'Bots y asistentes',
          'Automatización de procesos',
          'Integración con modelos',
        ],
      },
      {
        n: '02',
        title: 'SOFTWARE A MEDIDA',
        lead: 'El sistema que tu operación necesita, escrito desde cero.',
        items: ['Sistemas de gestión', 'Aplicaciones web', 'Integraciones y APIs', 'Paneles y reportes'],
      },
      {
        n: '03',
        title: 'DISEÑO DE PRODUCTO',
        lead: 'Antes de escribir código, definimos cómo se usa.',
        items: [
          'Arquitectura de la información',
          'Prototipado de aplicación',
          'Interfaz de usuario',
          'Diseño responsive',
        ],
      },
      {
        n: '04',
        title: 'WEB Y ECOMMERCE',
        lead: 'Tu presencia online, rápida y hecha a medida.',
        items: ['Diseño y desarrollo web', 'Landing pages', 'Tiendas online', 'Web interactiva 3D · WebGL'],
      },
    ],
    cta: { label: 'Hablá con nosotros', href: '/contacto' },
  },

  // ---------- Cómo trabajamos ----------
  process: {
    kicker: 'CÓMO TRABAJAMOS',
    // El título anterior era "Ves el producto antes de invertir en él", y se apoyaba en
    // el paso de la demo, que se eliminó porque no es algo que el estudio haga. Lo que
    // sí pasa antes de presupuestar es que el alcance queda documentado.
    // TODO(Dutsiland): validar este título.
    title: 'Sabés qué se construye antes de empezar',
    steps: [
      { n: '01', title: 'Nos reunimos', text: 'Nos sentamos con vos a escuchar el problema, sin fórmulas armadas de antes.' },
      { n: '02', title: 'Entendemos la necesidad', text: 'Analizamos cómo funciona tu operación hoy y dónde el software puede ahorrarte tiempo.' },
      { n: '03', title: 'Definimos requerimientos', text: 'Documentamos juntos el alcance: qué entra, qué queda para después y con qué prioridad.' },
      { n: '04', title: 'Presupuestamos', text: 'Con el alcance validado, pasamos precio y plazos claros. Sin sorpresas a mitad de camino.' },
      { n: '05', title: 'Desarrollamos', text: 'Construimos, entregamos por etapas y acompañamos el sistema una vez en producción.' },
    ],
    cta: { label: 'Empecemos tu proyecto', href: '/contacto' },
  },

  // En el home las tarjetas son decorado: no navegan. El que quiere ver los proyectos
  // va por el botón, a /proyectos.
  portfolio: {
    titleLines: ['PROYECTOS', 'DESTACADOS'],
    subtitle: 'Una selección de nuestros trabajos más apasionantes',
    caseLabel: 'Ver el caso',
    verLabel: 'Ver proyecto',
    cta: { label: 'Ver todos los proyectos', href: '/proyectos' },
  },

  projectsIndex: {
    kicker: 'PROYECTOS',
    title: 'Lo que construimos',
    intro:
      'Sistemas de gestión, plataformas y sitios para empresas que necesitaban algo que una plantilla o un sistema enlatado no resolvía.',
    sinFicha: 'Ficha en preparación',
  },

  // ---------- Sobre Dutsiland ----------
  about: {
    pageTitle: 'Sacamos de las planillas el trabajo que no debería hacer una persona',
    metaDescription: 'El origen del estudio, cómo encaramos cada proyecto y qué nos define.',
    // TODO(Dutsiland): confirmar el año exacto de arranque del estudio.
    year: '2023',
    /* El hilo de los tres hitos no es la tecnología, es el relevamiento: lo que el
       estudio hace es siempre lo mismo —mirar cómo trabaja una empresa y sacarle el
       trabajo que no debería estar haciendo alguien a mano— y lo que cambia es con qué.
       Así la IA entra como continuación y no como moda, que es la diferencia entre
       sonar oportunista y sonar con criterio.

       Los tres anteriores decían lo mismo tres veces: el origen, que ese origen se
       volvió método, y que el método lo hace el mismo equipo. Sin progresión no hay
       historia, y el botón promete una.

       En el home sólo se ven la etapa y el titular, así que cada titular tiene que
       sostenerse solo. Los párrafos existen únicamente en /sobre.

       Lo que NO va acá ni en ninguna otra parte del sitio: cuántos son y cuántos
       proyectos toman. "Equipo chico" y "pocos proyectos por vez" se leen como falta de
       capacidad para una empresa que está evaluando a quién confiarle un sistema; la
       continuidad —el mismo equipo de punta a punta— es la misma virtud contada por el
       lado que suma, y vive en `traits`. */
    hitos: [
      {
        etapa: 'El problema de siempre',
        title: 'Casi todo lo que hace una empresa pasa primero por una planilla',
        text: 'Turnos en un cuaderno, stock en tres depósitos que no coinciden, asistencia en papel, el pedido en la cabeza del que atiende. Ninguna de esas empresas estaba parada: todas funcionaban. El problema es que funcionaban a fuerza de que alguien hiciera a mano, todos los días, lo que un sistema podía hacer solo.',
      },
      {
        etapa: 'Cómo lo resolvemos',
        title: 'Primero relevamos, después escribimos',
        text: 'Nunca empezamos por la herramienta. Empezamos mirando cómo trabaja la empresa hoy, paso por paso, hasta encontrar dónde se pierde el tiempo y por qué. Recién ahí se decide qué construir. Por eso los sistemas se parecen a la operación y no al revés: salen de haberla mirado, no de haberla supuesto.',
      },
      {
        etapa: 'Hoy',
        title: 'La IA no cambió qué hacemos, cambió con qué',
        text: 'Hay tareas que hasta hace poco había que programar una por una y hoy las resuelve un modelo: leer un documento, clasificar un pedido, responder una consulta, estimar un precio. Lo que no cambió es lo de antes: entender la operación antes de tocarla. Automatizar un proceso que nadie revisó sólo lo hace más rápido, no mejor.',
      },
    ],
    // Este bloque no dice nada nuevo: ordena en tres puntos lo que ya afirman los
    // párrafos de arriba. Le da cuerpo a la página sin depender de las fotos del equipo.
    // TODO(Dutsiland): validar la redacción de los tres puntos.
    traitsKicker: 'QUÉ NOS DEFINE',
    traitsTitle: 'El mismo equipo, desde el primer relevamiento hasta el último ajuste',
    traits: [
      {
        n: '01',
        title: 'Escribimos desde cero',
        text: 'No adaptamos una plantilla a los tirones: partimos del problema y construimos el sistema que esa operación necesita.',
      },
      {
        n: '02',
        title: 'El mismo equipo de principio a fin',
        text: 'El equipo que releva es el que diseña y el que desarrolla. Sin traspasos entre áreas no se pierde contexto en el camino, y eso se traduce en la calidad de lo que se entrega.',
      },
      {
        n: '03',
        title: 'Acompañamos todo el ciclo de vida',
        text: 'La entrega no cierra el trabajo. El sistema se sigue usando y el negocio sigue cambiando, así que seguimos al lado para evolucionarlo: ajustes, funciones nuevas y soporte, con el equipo que lo construyó.',
      },
    ],
    teamKicker: 'EL EQUIPO',
    teamTitle: 'Quiénes lo hacemos',
    // TODO(Dutsiland): faltan las fotos reales del equipo (van en public/img/equipo/)
    // y los nombres y roles de cada uno.
    team: [],
    // TODO(Dutsiland): validar el copy del cierre.
    finalKicker: 'EMPECEMOS',
    finalTitle: 'Soluciones a medida para tu empresa',
    finalText: 'Contanos cómo funciona tu operación hoy y vemos juntos qué se puede construir.',
    ctaFinal: { label: 'Trabajemos juntos', href: '/contacto' },
  },

  // ---------- Contacto ----------
  contact: {
    kicker: 'CONTACTO',
    title: 'Contanos qué necesitás',
    intro: 'Escribinos y coordinamos una primera reunión para entender tus necesidades y tus ideas.',
    fields: { name: 'Nombre y apellido', email: 'Correo electrónico', message: 'Mensaje' },
    submit: 'Enviar',
    sending: 'Enviando…',
    success: '¡Solicitud de contacto enviada! Te respondemos a la brevedad.',
    error: 'No pudimos enviar el mensaje. Escribinos directo a',
    nextTitle: 'Qué pasa después',
    // TODO(Dutsiland): confirmar el plazo real de respuesta. Si son 24 o 48 horas,
    // decirlo con el número: un plazo concreto convence mucho más que "a la brevedad".
    next: [
      { n: '01', title: 'Te respondemos', text: 'Leemos lo que nos contás y te escribimos para coordinar una primera charla.' },
      { n: '02', title: 'Nos reunimos', text: 'Una reunión para entender cómo funciona tu operación hoy y en qué puntos el software puede aportar más valor.' },
      { n: '03', title: 'Te pasamos alcance y precio', text: 'Con el problema definido, documentamos qué incluye el desarrollo, qué se deja planificado para una etapa posterior, en cuánto tiempo y a qué costo.' },
    ],
    directLabel: 'O escribinos directo',
  },

  projectView: {
    back: 'Volver a proyectos',
    problemKicker: 'EL PROBLEMA',
    problemTitle: 'Qué había que resolver',
    builtKicker: 'QUÉ CONSTRUIMOS',
    // Antes decía "Lo que hicimos", que repetía el antetítulo y además era la misma
    // frase que sacamos de la portada.
    builtTitle: 'Pieza por pieza',
    photosKicker: 'EL PRODUCTO',
    photosTitle: 'Así se ve',
    photosHint: 'Ampliar',
    // Sin "click" ni "tocá": en el teléfono no se hace click y en el escritorio no se
    // toca, y la nota se ve en los dos.
    photosNota: 'Ampliá cualquier captura',
    nextKicker: 'SIGUIENTE PROYECTO',
    cta: { label: 'Queremos hacer el tuyo', href: '/contacto' },
  },

  // ---------- Proyectos ----------
  // Los que tienen `detail` linkean a /proyectos/<slug>; los demás son solo tarjeta.
  projects: [
    {
      slug: 'publicite',
      name: 'Publicité',
      lead: 'Marketplace y red social para publicar, conectar y vender.',
      cover: '/img/publicite.jpg',
      coverAlt: 'Publicité',
      detail: {
        kicker: 'MARKETPLACE CON IA',
        // TODO(Dutsiland): validar con el cliente cómo contamos el problema.
        // Está redactado a partir de lo que hace el producto, no de un brief.
        problem: [
          'Publicar en un clasificado tradicional es tirar una botella al mar. El que publica no sabe cuánto vale lo que ofrece y le pone un precio a ojo; el que busca tiene que recorrer cientos de avisos para encontrar uno que le sirva. Los dos lados pierden tiempo y la mayoría de las publicaciones no llega a nadie.',
          'La idea no era hacer otra lista de avisos, sino una comunidad: que la publicación encuentre a quien la necesita en lugar de esperar a que alguien la encuentre, y que el precio salga de comparables reales y no de la intuición.',
        ],
        built: [
          {
            title: 'Anuncios geolocalizados',
            text: 'Bienes, servicios y necesidades, con búsqueda por ubicación y filtros.',
          },
          {
            title: 'Cubito, el asistente de IA',
            text: 'Valúa publicaciones con informes y comparables reales, cruza necesidades con anuncios y ayuda a armar una publicación conversando.',
          },
          {
            title: 'Comunidad',
            text: 'Relaciones entre usuarios, grupos y revistas donde guardan publicaciones en conjunto.',
          },
          {
            title: 'Suscripciones y pagos',
            text: 'Planes con distintos beneficios, integrados con Mercado Pago.',
          },
          {
            title: 'Notificaciones en tiempo real',
            text: 'Los avisos llegan solos, sin recargar la página, más sorteos para la comunidad.',
          },
          {
            title: 'Un backend que aguanta el crecimiento',
            text: 'Preparado para crecer sin rehacerse: cada parte se puede cambiar sin tocar el resto, y los cambios entran con tests que los respaldan.',
          },
        ],
        photos: [
          { src: '/img/proyectos/publicite/publicite-1.webp', alt: 'Publicité — inicio', caption: 'El inicio, con los anuncios cerca tuyo' },
          { src: '/img/proyectos/publicite/publicite-2.webp', alt: 'Publicité — anuncios', caption: 'Búsqueda por ubicación y filtros' },
          { src: '/img/proyectos/publicite/publicite-3.webp', alt: 'Publicité — Cubito', caption: 'Cubito valuando una publicación' },
          { src: '/img/proyectos/publicite/publicite-4.webp', alt: 'Publicité — comunidad', caption: 'Grupos y revistas de la comunidad' },
        ],
      },
    },
    {
      slug: 'mahatu-consultorios',
      name: 'Mahatu Consultorios',
      lead: 'Sistema de gestión de turnos online para un consultorio de psicopedagogía.',
      cover: '/img/mahatu.jpg',
      coverAlt: 'Mahatu Consultorios',
      detail: {
        kicker: 'SALUD',
        // TODO(Dutsiland): confirmar con Mahatu cómo era la operación antes del sistema.
        problem: [
          'El consultorio coordinaba los turnos por teléfono y a mano. Cada cambio de agenda había que avisarlo, el historial de cada paciente estaba en papel y los ingresos se seguían aparte, así que nadie tenía el panorama completo en un solo lugar.',
          'Lo que hacía falta no era una agenda digital más, sino que el paciente pudiera reservar solo, sobre la disponibilidad real de la profesional, y que el consultorio viera en el mismo sistema la atención y la facturación.',
        ],
        built: [
          {
            title: 'Turnos online',
            text: 'El paciente reserva según la disponibilidad real de la agenda, y la profesional también puede asignar turnos ella misma.',
          },
          {
            title: 'Agenda de la profesional',
            text: 'Asignar, reprogramar o eliminar turnos desde un calendario.',
          },
          {
            title: 'Fichas de pacientes',
            text: 'Historial detallado, con la información de cada paciente en un solo lugar.',
          },
          {
            title: 'Anotaciones por turno',
            text: 'Notas específicas de cada atención, para no depender de la memoria.',
          },
          {
            title: 'Control de facturación',
            text: 'Registro de pagos, medios de pago e información de obras sociales, con una vista para seguir los ingresos.',
          },
        ],
        photos: [
          { src: '/img/proyectos/mahatu/mahatu-3.webp', alt: 'Mahatu — turnos', caption: 'La reserva de turnos del paciente' },
          { src: '/img/proyectos/mahatu/mahatu-4.webp', alt: 'Mahatu — calendario', caption: 'El calendario del profesional' },
          { src: '/img/proyectos/mahatu/mahatu-1.webp', alt: 'Mahatu — pacientes', caption: 'La ficha del paciente y su historial' },
          { src: '/img/proyectos/mahatu/mahatu-2.webp', alt: 'Mahatu — facturación', caption: 'El control de pagos e ingresos' },
        ],
      },
    },
    // Estos cinco salen de las fichas del sitio actual (dutsiland.com/#trabajos).
    {
      slug: 'ama',
      name: 'Asociación Mendocina de Atletismo',
      lead: 'Noticias, inscripciones y federaciones para la asociación.',
      cover: '/img/ama.jpg',
      coverAlt: 'Asociación Mendocina de Atletismo',
      detail: {
        kicker: 'DEPORTE',
        problem: [
          'La asociación publicaba sus noticias y manejaba inscripciones y federaciones por fuera de la web, cada cosa por su lado. No había un lugar donde un atleta o un club encontrara todo junto.',
          'Y había una restricción que condicionaba todo el diseño: buena parte de los usuarios son personas mayores. Cualquier fricción de más —un formulario largo, un menú escondido— los deja afuera. Arrancamos con una etapa de investigación para entender dónde estaban los puntos de dolor reales antes de dibujar una pantalla.',
        ],
        built: [
          { title: 'Noticias de la asociación', text: 'Un lugar propio para publicar y que la información no dependa de las redes.' },
          { title: 'Inscripciones online', text: 'Los atletas se inscriben a los torneos desde la web, federados y no federados.' },
          { title: 'Gestión de torneos', text: 'El alta de un torneo con sus pruebas, categorías y fechas, desde el panel.' },
          { title: 'Federaciones y clubes', text: 'El padrón de clubes miembros y la gestión de las federaciones.' },
          { title: 'Una interfaz sin obstáculos', text: 'Diseño responsive pensado para que un usuario mayor llegue rápido a lo que busca, con la investigación previa como guía.' },
        ],
        // La primera hace de portada en la ficha, por eso va el sitio y no la guía de estilos
        photos: [
          { src: '/img/proyectos/ama/2.webp', alt: 'AMA — portada', caption: 'La portada, con las noticias de la asociación' },
          { src: '/img/proyectos/ama/3.webp', alt: 'AMA — torneos', caption: 'El alta de un torneo, con sus pruebas y categorías' },
          { src: '/img/proyectos/ama/4.webp', alt: 'AMA — campeones', caption: 'Los campeones nacionales, en la portada' },
          { src: '/img/proyectos/ama/1.webp', alt: 'AMA — diseño', caption: 'La guía de estilos y el mapa de pantallas' },
        ],
      },
    },
    {
      slug: 'cucha-repuestos',
      name: 'Cucha Repuestos',
      lead: 'El sitio de una empresa de repuestos para camiones Iveco.',
      cover: '/img/cucha.jpg',
      coverAlt: 'Cucha Repuestos',
      detail: {
        kicker: 'REPUESTOS',
        problem: [
          'Cucha Repuestos vende repuestos importados para camiones Iveco y es referente en la Patagonia, pero toda su operación vivía fuera de línea: para saber si había una pieza, o con qué marcas trabajaban, había que llamar o pasar por el local.',
          'El sitio tenía que hacer dos cosas a la vez: poner el catálogo completo online, para el que está lejos del local y no puede pasar a preguntar, y dejar claro por qué comprarles a ellos —envíos a todo el país, garantía, repuestos originales y alternativos—.',
        ],
        built: [
          { title: 'La línea completa de repuestos', text: 'El catálogo de productos Iveco, navegable por categoría.' },
          { title: 'Las tres promesas, arriba de todo', text: 'Comodidad y seguridad, envíos a todo el país, garantía y calidad: lo primero que ve quien entra.' },
          { title: 'La sucursal en el mapa', text: 'Dirección, horarios y contacto directo por WhatsApp desde cualquier pantalla.' },
          { title: 'Las marcas con las que trabajan', text: 'El respaldo de los proveedores, visible para quien no los conoce.' },
        ],
        photos: [
          { src: '/img/proyectos/cucha/1.webp', alt: 'Cucha — el sitio', caption: 'El sitio en escritorio y en el teléfono' },
          { src: '/img/proyectos/cucha/2.webp', alt: 'Cucha — portada', caption: 'La portada, con las tres promesas del negocio' },
          { src: '/img/proyectos/cucha/3.webp', alt: 'Cucha — sucursal', caption: 'La sucursal en el mapa y las marcas con las que trabajan' },
          { src: '/img/proyectos/cucha/4.webp', alt: 'Cucha — pantallas', caption: 'El mapa de pantallas del proyecto' },
        ],
      },
    },
    {
      slug: 'medialuna-medias',
      name: 'Medialuna Medias',
      lead: 'Catálogo online para un emprendimiento de medias.',
      cover: '/img/medialuna.jpg',
      coverAlt: 'Medialuna Medias',
      detail: {
        kicker: 'CATÁLOGO ONLINE',
        problem: [
          'Medialuna vendía por canales informales: cada consulta se respondía a mano, mandando fotos sueltas. El cliente no podía ver el surtido completo y el emprendimiento no tenía forma de ordenar lo que ofrecía.',
          'Lo que hacía falta era un catálogo que se pudiera recorrer solo, sin perder el tono del emprendimiento: colorido e ilustrado, que es justo lo que lo diferencia de cualquier tienda genérica.',
        ],
        built: [
          { title: 'El catálogo completo', text: 'Todo el surtido en un solo lugar, con su precio y su foto.' },
          { title: 'Búsqueda y categorías', text: 'Filtrado y orden por categoría, para llegar al producto sin scrollear de más.' },
          { title: 'Una identidad que no se diluye', text: 'El diseño colorido e ilustrado del emprendimiento, llevado a la interfaz.' },
          { title: 'El cierre por donde ya vendían', text: 'El contacto directo por WhatsApp e Instagram, que es donde la venta se concreta.' },
        ],
        photos: [
          { src: '/img/proyectos/medialuna/1.webp', alt: 'Medialuna — la tienda', caption: 'La tienda en escritorio y en el teléfono' },
          { src: '/img/proyectos/medialuna/2.webp', alt: 'Medialuna — catálogo', caption: 'El catálogo, con búsqueda y filtros' },
          { src: '/img/proyectos/medialuna/3.webp', alt: 'Medialuna — categorías', caption: 'Las categorías y el contacto directo' },
          { src: '/img/proyectos/medialuna/4.webp', alt: 'Medialuna — pantallas', caption: 'El mapa de pantallas del proyecto' },
        ],
      },
    },
    {
      slug: 'mimpronta',
      name: 'Mimpronta',
      lead: 'La landing de una agencia de impacto ambiental.',
      cover: '/img/mimpronta.jpg',
      coverAlt: 'Mimpronta',
      detail: {
        kicker: 'IMPACTO AMBIENTAL',
        problem: [
          'Mimpronta es una agencia de impacto ambiental y necesitaba un lugar donde explicar qué hace y promover sus servicios. Hasta entonces no tenía dónde mandar a alguien que quisiera entender su propuesta.',
          'La dificultad no era técnica sino de traducción: la agencia ya tenía una identidad visual fuerte, ilustrada, y había que llevarla a la web sin que perdiera fuerza. Trabajamos de la mano de sus diseñadores para que el resultado fuera funcional y además se sostuviera como pieza gráfica.',
        ],
        built: [
          { title: 'La propuesta, en una sola página', text: 'Quiénes son, qué hacen y cómo trabajan, en un recorrido que se lee de una.' },
          { title: 'La identidad llevada a la interfaz', text: 'Las ilustraciones y la paleta de la agencia, trasladadas a la web junto a sus diseñadores.' },
          { title: 'Blog propio', text: 'Un espacio para publicar sus notas sobre innovación social y sostener la presencia.' },
          { title: 'Diseño responsive', text: 'La misma pieza, entera, en cualquier pantalla.' },
        ],
        photos: [
          { src: '/img/proyectos/mimpronta/1.webp', alt: 'Mimpronta — el blog', caption: 'El blog, en la maqueta de diseño' },
          { src: '/img/proyectos/mimpronta/2.webp', alt: 'Mimpronta — portada', caption: 'La portada, con el mensaje de la agencia' },
          { src: '/img/proyectos/mimpronta/3.webp', alt: 'Mimpronta — notas', caption: 'El blog, con el último post destacado' },
          { src: '/img/proyectos/mimpronta/4.webp', alt: 'Mimpronta — pantallas', caption: 'El mapa de pantallas del proyecto' },
        ],
      },
    },

    {
      slug: 'cocina-norte',
      name: 'Cocina Norte',
      lead: 'Comandas, salón y delivery para un grupo gastronómico de cinco locales.',
      cover: '/img/cocina-norte.webp',
      coverAlt: 'Cocina Norte',
      detail: {
        kicker: 'GASTRONOMÍA',
        problem: [
          'Un restaurante con salón lleno y tres apps de delivery en simultáneo tiene el mismo problema todas las noches: el pedido existe en un papel, en una pantalla del delivery y en la cabeza del mozo, pero en ningún lado a la vez. La cocina cocina lo que le llega cuando le llega, y nadie sabe cuánto hace que un plato está esperando.',
          'Con cinco locales el problema se multiplica: cada uno arma su carta, se queda sin un insumo y sigue vendiéndolo igual, y el dueño se entera del resultado de la semana cuando ya pasó. Lo que hacía falta no era un sistema de cajas más, sino que el pedido sea uno solo desde que entra hasta que sale, y que lo que se agota deje de ofrecerse solo.',
        ],
        built: [
          { title: 'Comandas en cocina', text: 'Salón, mostrador y las apps de delivery entran a la misma pantalla, en columnas por estado y con el reloj corriendo en cada pedido.' },
          { title: 'Mapa de salón', text: 'Qué mesa está ocupada, hace cuánto, con qué mozo y cuánto lleva consumido, sin preguntarle a nadie.' },
          { title: 'Carta con disponibilidad real', text: 'Lo que se agota en un local deja de ofrecerse ahí mismo, en el salón y en las apps, sin que nadie tenga que acordarse.' },
          { title: 'Integración con delivery', text: 'Los pedidos de las apps entran como una comanda más y avisan solos cuando se demoran.' },
          { title: 'Cierre por local y consolidado', text: 'Facturación, tickets y tiempos de cocina por día y por sucursal, comparables entre sí.' },
        ],
        photos: [
          { src: '/img/proyectos/cocina-norte/1.webp', alt: 'Cocina Norte — comandas', caption: 'La pantalla de cocina: cada pedido avanza por columnas y el reloj no se detiene' },
          { src: '/img/proyectos/cocina-norte/2.webp', alt: 'Cocina Norte — salón', caption: 'El mapa de salón, con el consumo y el tiempo de cada mesa' },
          { src: '/img/proyectos/cocina-norte/3.webp', alt: 'Cocina Norte — carta', caption: 'La carta por local: lo que se agota deja de ofrecerse solo' },
          { src: '/img/proyectos/cocina-norte/4.webp', alt: 'Cocina Norte — reportes', caption: 'El cierre de la semana, con los cinco locales comparables' },
        ],
      },
    },
    {
      slug: 'raiz-distribuciones',
      name: 'Raíz Distribuciones',
      lead: 'Control de stock en tres depósitos, con lectura de códigos y alertas de quiebre.',
      cover: '/img/raiz-distribuciones.webp',
      coverAlt: 'Raíz Distribuciones',
      detail: {
        kicker: 'STOCK Y DEPÓSITO',
        problem: [
          'Una distribuidora con tres depósitos tiene tres stocks distintos y ninguno confiable. El sistema dice que hay mercadería, el depósito dice que no, y la diferencia recién aparece cuando un pedido se arma incompleto y el cliente reclama. Cada control manual se hace con una planilla que queda vieja el mismo día que se llena.',
          'El costo no es el faltante en sí: es que nadie lo ve venir. Se compra de más lo que sobra, se compra tarde lo que falta, y el que arma los pedidos camina el depósito dos veces porque no sabe dónde está lo que busca. La idea fue que el stock se actualice cuando la mercadería se mueve, no cuando alguien se acuerda de cargarlo.',
        ],
        built: [
          { title: 'Stock consolidado', text: 'Los tres depósitos en una sola vista, con mínimos por producto y cuántos días de cobertura quedan.' },
          { title: 'Ingreso con lector', text: 'La mercadería entra leyendo el código con el celular y el sistema compara contra el remito: qué falta, qué sobra, en qué renglón.' },
          { title: 'Picking ordenado por recorrido', text: 'El pedido se arma en el orden en que está la mercadería en el depósito, no en el orden en que lo escribió el cliente.' },
          { title: 'Alertas de reposición', text: 'Cruza el consumo de las últimas ocho semanas con el stock y arma la orden de compra sugerida por proveedor.' },
          { title: 'Trazabilidad de movimientos', text: 'Cada unidad tiene su historia: quién la recibió, a qué depósito fue y en qué pedido salió.' },
        ],
        photos: [
          { src: '/img/proyectos/raiz-distribuciones/1.webp', alt: 'Raíz — stock', caption: 'El stock de los tres depósitos, ordenado por lo que está por faltar' },
          { src: '/img/proyectos/raiz-distribuciones/2.webp', alt: 'Raíz — ingreso', caption: 'El ingreso con lector: el sistema compara contra el remito mientras se lee' },
          { src: '/img/proyectos/raiz-distribuciones/3.webp', alt: 'Raíz — picking', caption: 'Las hojas de ruta y el avance de cada pedido en preparación' },
          { src: '/img/proyectos/raiz-distribuciones/4.webp', alt: 'Raíz — reposición', caption: 'La reposición sugerida, con la cobertura de cada producto' },
        ],
      },
    },
    {
      slug: 'centro-aconcagua',
      name: 'Centro Médico Aconcagua',
      lead: 'Turnos, historia clínica y receta digital para catorce consultorios.',
      cover: '/img/centro-aconcagua.webp',
      coverAlt: 'Centro Médico Aconcagua',
      detail: {
        kicker: 'SALUD',
        problem: [
          'En un centro con ocho especialidades, el turno se pide por teléfono, se anota en un cuaderno y se confirma por WhatsApp desde tres celulares distintos. Se superponen, se pierden y el paciente se entera cuando ya está en la sala de espera. La historia clínica, mientras tanto, vive en carpetas: cada profesional ve lo suyo y nadie ve el conjunto.',
          'El pedido no era digitalizar papeles sino que las tres cosas se toquen: que el turno sepa a qué profesional y a qué consultorio va, que la consulta escriba en la misma historia que van a leer los demás, y que la receta salga firmada de ahí sin volver a tipear nada.',
        ],
        built: [
          { title: 'Agenda por profesional y consultorio', text: 'La semana completa, con sobreturnos, ausencias y los huecos reales que quedan libres.' },
          { title: 'Historia clínica única', text: 'Una sola línea de tiempo por paciente: consultas, estudios y medicación activa, la escriba quien la escriba.' },
          { title: 'Receta digital firmada', text: 'Sale de la consulta, le llega al paciente al celular y la farmacia la valida con un código. Al dispensarse queda marcada y no se puede usar dos veces.' },
          { title: 'Sala de espera en pantalla', text: 'A quién se está llamando, qué consultorio está libre y cuánta demora hay, en el hall y en recepción.' },
          { title: 'Obras sociales', text: 'Los datos del afiliado y la cobertura se cargan una vez y viajan al turno, a la consulta y a la receta.' },
        ],
        photos: [
          { src: '/img/proyectos/centro-aconcagua/1.webp', alt: 'Aconcagua — agenda', caption: 'La agenda de la semana, con las ocho especialidades en la misma grilla' },
          { src: '/img/proyectos/centro-aconcagua/2.webp', alt: 'Aconcagua — historia clínica', caption: 'La historia clínica: una sola línea de tiempo por paciente' },
          { src: '/img/proyectos/centro-aconcagua/3.webp', alt: 'Aconcagua — receta', caption: 'La receta digital, lista para firmar y enviar al paciente' },
          { src: '/img/proyectos/centro-aconcagua/4.webp', alt: 'Aconcagua — sala de espera', caption: 'La sala de espera: a quién se llama y qué consultorio está libre' },
        ],
      },
    },
    {
      slug: 'instituto-ledesma',
      name: 'Instituto Ledesma',
      lead: 'Cursadas, asistencia por QR y boletín digital para 1.400 alumnos.',
      cover: '/img/instituto-ledesma.webp',
      coverAlt: 'Instituto Ledesma',
      detail: {
        kicker: 'EDUCACIÓN',
        problem: [
          'Tomar asistencia a mano en una comisión de cuarenta alumnos cuesta diez minutos de clase, y después hay que pasarla a una planilla que alguien va a consolidar a fin de mes. Las notas viven en el cuaderno de cada docente y el boletín se arma a mano, materia por materia, cuando el cuatrimestre ya terminó.',
          'Lo grave no es el trabajo administrativo: es que el alumno que se está por perder el cuatrimestre se detecta tarde. Cuando la asistencia y las notas están en dos lugares distintos, nadie cruza las dos cosas hasta que ya no hay margen para hacer algo.',
        ],
        built: [
          { title: 'Asistencia por código', text: 'El docente muestra un código que cambia cada minuto y el alumno lo escanea. No se puede pasar por mensaje, y el registro queda cerrado y firmado.' },
          { title: 'Cursadas del docente', text: 'Cada comisión con su avance del programa, su asistencia y su promedio, en una sola pantalla.' },
          { title: 'Libro de notas', text: 'Parciales, trabajos y recuperatorios se cargan una vez y el boletín se arma solo con esas columnas.' },
          { title: 'Detección de alumnos en riesgo', text: 'Cruza asistencia y notas y marca al que se está por perder el cuatrimestre mientras todavía hay margen.' },
          { title: 'Aulas y horarios', text: 'La grilla de aulas evita las superposiciones antes de que pasen, no después.' },
        ],
        photos: [
          { src: '/img/proyectos/instituto-ledesma/1.webp', alt: 'Ledesma — cursadas', caption: 'Las cursadas del docente, con el avance del programa de cada una' },
          { src: '/img/proyectos/instituto-ledesma/2.webp', alt: 'Ledesma — asistencia', caption: 'La asistencia en curso: el código cambia cada minuto y el registro se actualiza solo' },
          { src: '/img/proyectos/instituto-ledesma/3.webp', alt: 'Ledesma — notas', caption: 'El libro de notas, del que sale el boletín sin volver a cargar nada' },
          { src: '/img/proyectos/instituto-ledesma/4.webp', alt: 'Ledesma — riesgo', caption: 'Los alumnos en riesgo, detectados cruzando asistencia y notas' },
        ],
      },
    },
    {
      slug: 'campo-abierto',
      name: 'Campo Abierto',
      lead: 'Seguimiento de lotes, campañas y aplicaciones para un establecimiento agrícola.',
      cover: '/img/campo-abierto.webp',
      coverAlt: 'Campo Abierto',
      detail: {
        kicker: 'AGRO',
        problem: [
          'Un establecimiento de tres mil hectáreas toma decisiones sobre ochenta lotes que no se parecen entre sí, y el historial de cada uno vive en un cuaderno, en el celular del ingeniero y en la memoria del encargado. Qué se sembró hace tres campañas, con qué se aplicó y cuánto rindió es una pregunta que lleva media hora contestar y termina en una estimación.',
          'Sin ese historial no hay comparación posible: no se sabe qué lote conviene rotar, si el gasto en insumos se justificó o si el rinde bueno fue del manejo o de la lluvia. Lo que hacía falta era que cada labor quede registrada donde se hace, con su costo, y que el resultado se pueda mirar campaña contra campaña.',
        ],
        built: [
          { title: 'Mapa de lotes', text: 'Cada lote con su cultivo, su estado fenológico y su superficie, dibujado sobre el campo real.' },
          { title: 'Registro de aplicaciones', text: 'Producto, dosis, responsable y receta agronómica firmada, cargados desde el celular en el lote.' },
          { title: 'Clima y agua útil', text: 'Los milímetros de la estación propia se cargan solos al lote y alimentan el agua útil de cada suelo.' },
          { title: 'Rinde por lote y por campaña', text: 'Cuatro campañas comparables, con el margen bruto calculado sobre el costo real de cada labor.' },
          { title: 'Trabajo sin señal', text: 'La app guarda lo que se carga en el campo y lo sincroniza cuando vuelve a haber señal.' },
        ],
        photos: [
          { src: '/img/proyectos/campo-abierto/1.webp', alt: 'Campo Abierto — mapa', caption: 'El mapa de lotes, con el cultivo y el estado de cada uno' },
          { src: '/img/proyectos/campo-abierto/2.webp', alt: 'Campo Abierto — aplicaciones', caption: 'Las aplicaciones registradas, con producto, dosis y receta firmada' },
          { src: '/img/proyectos/campo-abierto/3.webp', alt: 'Campo Abierto — clima', caption: 'Clima y agua útil: los milímetros se cargan solos al lote' },
          { src: '/img/proyectos/campo-abierto/4.webp', alt: 'Campo Abierto — rindes', caption: 'El rinde por lote, comparable campaña contra campaña' },
        ],
      },
    },
  ],

  footer: {
    legal: [
      { label: 'Política de privacidad', href: 'https://dutsiland.com/#contacto' },
      { label: 'Términos y condiciones', href: 'https://dutsiland.com/#contacto' },
    ],
  },

  cookies: {
    text: 'Este sitio usa cookies para brindar la funcionalidad necesaria, mejorar tu experiencia y analizar nuestro tráfico. Al usarlo, aceptás nuestra',
    linkLabel: 'Política de privacidad',
    accept: 'Aceptar',
  },
}
