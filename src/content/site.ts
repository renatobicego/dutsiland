// Contenido de la landing de Dutsiland.
// Estructura y piezas visuales según el storyboard v2.pdf.
// Proyectos y servicios tomados del sitio actual (https://dutsiland.com).
// Todo el texto visible vive acá para poder ajustarlo sin tocar componentes.

export type Link = {
  label: string;
  href: string;
};

export type ServiceGroup = {
  /** Número que se muestra al costado: '01', '02', '03' */
  n: string;
  title: string;
  /** La línea que diferencia este frente de los otros dos */
  lead: string;
  items: string[];
};

export type ProcessStep = {
  n: string;
  title: string;
  text: string;
};

export type TeamPhoto = {
  src: string;
  alt: string;
  /** Nombre y rol, debajo de la foto */
  name: string;
  role: string;
};

export type ProjectPhoto = {
  src: string;
  alt: string;
  /** Pie de foto: qué se está viendo en esa pantalla */
  caption: string;
  /** Captura vertical (pantalla de celular). La galería la limita en alto para que
   *  no se agrande de más al ocupar el ancho de la columna. */
  tall?: boolean;
};

/** Un bloque de "qué construimos": el titular y la línea que lo explica */
export type BuiltItem = {
  title: string;
  text: string;
};

/** La ficha del proyecto. Los proyectos que todavía no la tienen van sin `detail`:
 *  la tarjeta se muestra igual en la marquesina, pero no linkea a ninguna parte. */
export type ProjectDetail = {
  /** Antetítulo de la ficha: el rubro o el tipo de producto */
  kicker: string;
  /** Logo del cliente, para la portada. Publicité no tiene. */
  logo?: string;
  /** Qué hicimos nosotros */
  role: string;
  /** En qué estado está el producto */
  context: string;
  /** La problemática que resolvemos, en dos o tres párrafos */
  problem: string[];
  built: BuiltItem[];
  links: Link[];
  photos: ProjectPhoto[];
};

export type Project = {
  /** Va en la URL: /proyectos/<slug> */
  slug: string;
  /** Se muestra sobre la tarjeta y como título del cursor */
  name: string;
  /** Una línea: qué es el producto */
  lead: string;
  /** Portada cuadrada de la marquesina */
  cover: string;
  coverAlt: string;
  detail?: ProjectDetail;
  /** ATENCIÓN — Caso INVENTADO, con cliente inventado y capturas armadas por nosotros.
   *  Están para que el sitio se vea completo mientras el estudio junta los casos reales
   *  de cada rubro. Publicarlos tal cual sería presentar experiencia que no existe:
   *  reemplazar el contenido por un caso real, o borrar la entrada, antes de salir a
   *  producción. Se listan todos juntos al final del array. */
  demo?: boolean;
};

export type Site = {
  name: string;
  shortName: string;
  url: string;
  description: string;
  slogan: string;
  /** Palabras clave para <meta keywords> y como insumo del JSON-LD. Ordenadas de
   *  diferencial (software a medida) a captación amplia (web, ecommerce) + geo. */
  keywords: string[];
  /** Título largo del home: gana al `name` para el <title> de la portada. */
  seoTitle: string;
  /** País y región a los que apunta el estudio, para el schema y las señales locales. */
  geo: {
    country: string;
    region: string;
    /** Código ISO 3166-1 alfa-2 para areaServed del schema. */
    countryCode: string;
  };
  /** Año de fundación, para el schema Organization. */
  foundingYear: string;
  /** Imagen social por defecto (Open Graph / Twitter). Ruta bajo /public. */
  ogImage: string;
  email: string;
  social: Link[];
  menu: Link[];
  hero: {
    /** Una línea del titular por elemento */
    headline: string[];
  };
  claim: {
    text: string;
    cta: Link;
  };
  services: {
    kicker: string;
    title: string;
    intro: string;
    groups: ServiceGroup[];
    cta: Link;
  };
  process: {
    kicker: string;
    title: string;
    steps: ProcessStep[];
    cta: Link;
  };
  portfolio: {
    titleLines: string[];
    subtitle: string;
    /** Lo que dice la tarjeta cuando el proyecto sí tiene ficha */
    caseLabel: string;
    /** Botón del home que lleva a /proyectos */
    cta: Link;
  };
  /** Índice de /proyectos */
  projectsIndex: {
    kicker: string;
    title: string;
    intro: string;
    /** Lo que dice una tarjeta que todavía no tiene ficha */
    sinFicha: string;
  };
  /** Página /sobre, y el bloque reducido que la anuncia en el home */
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    /** Botón del home hacia /sobre */
    cta: Link;
    /** Cuerpo de /sobre */
    year: string;
    text: string[];
    /** Qué nos define: le da cuerpo a la página y no depende de tener fotos */
    traitsKicker: string;
    traitsTitle: string;
    traits: { n: string; title: string; text: string }[];
    teamKicker: string;
    teamTitle: string;
    team: TeamPhoto[];
    /** Cierre de /sobre: el botón solo quedaba colgado en una sección vacía */
    finalKicker: string;
    finalTitle: string;
    finalText: string;
    ctaFinal: Link;
  };
  /** Página /contacto */
  contact: {
    kicker: string;
    title: string;
    intro: string;
    fields: { name: string; email: string; message: string };
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  projects: Project[];
  /** Copys fijos de la ficha de proyecto */
  projectView: {
    back: string;
    problemKicker: string;
    problemTitle: string;
    builtKicker: string;
    builtTitle: string;
    photosKicker: string;
    photosTitle: string;
    nextKicker: string;
    cta: Link;
  };
  footer: {
    legal: Link[];
  };
  cookies: {
    text: string;
    linkLabel: string;
    accept: string;
  };
};

export const site: Site = {
  name: "Estudio Dutsiland",
  shortName: "Dutsiland",
  url: "https://dutsiland.com",
  description:
    "Software factory argentina para PyMEs: desarrollamos software a medida, sistemas de gestión, aplicaciones web y tiendas online. Tu idea merece algo mejor que una plantilla.",
  slogan: "SOFTWARE A MEDIDA",

  // Diferencial primero (software a medida), captación amplia después (web, ecommerce),
  // y señal geográfica al cierre. Es la estrategia que hablamos: el home reclama lo que
  // el estudio ES, y las páginas amplias capturan las búsquedas de mayor volumen.
  keywords: [
    "software a medida",
    "desarrollo de software a medida",
    "sistemas de gestión a medida",
    "software factory",
    "desarrollo de aplicaciones web",
    "diseño y desarrollo web",
    "páginas web para empresas",
    "tiendas online",
    "automatización de procesos",
    "software a medida Argentina",
    "desarrollo de software Buenos Aires",
    "software a medida CABA",
    "software para PyMEs",
  ],
  seoTitle:
    "Dutsiland — Software a medida y desarrollo web para empresas en Argentina",
  geo: {
    country: "Argentina",
    region: "Ciudad Autónoma de Buenos Aires",
    countryCode: "AR",
  },
  foundingYear: "2023",
  ogImage: "/og-image.png",

  email: "contacto@dutsiland.com",
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/dutsiland.estudio/",
    },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/dutsiland" },
  ],

  // Tres rutas. "Qué hacemos" y "Cómo trabajamos" siguen siendo secciones del home,
  // pero no tienen entrada en el menú ni URL propia.
  menu: [
    { label: "Sobre Dutsiland", href: "/sobre" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Contacto", href: "/contacto" },
  ],

  hero: {
    headline: ["DESARROLLO", "DE SOFTWARE", "A MEDIDA"],
  },

  claim: {
    text: "Tu idea merece algo mejor que una plantilla. Nosotros la construimos de cero",
    cta: { label: "Conocé qué hacemos", href: "#servicios" },
  },

  // ---------- Qué hacemos (tres frentes diferenciados) ----------
  services: {
    kicker: "QUÉ HACEMOS",
    title: "Cuatro frentes, un mismo equipo",
    intro:
      "Trabajamos con empresas que necesitan que el software se adapte a cómo trabajan, y no al revés. Definimos cómo se usa el producto y lo construimos nosotros mismos, de punta a punta.",
    // El orden de este array ES el orden en el que se ven los frentes, en apaisado y en
    // vertical: la secuencia del panel recorre los .service tal como están en el DOM.
    // Software a medida va primero: es lo que la PyME entiende y busca. La IA queda
    // segunda, como diferencial que suma justo después.
    groups: [
      {
        n: "01",
        title: "SOFTWARE A MEDIDA",
        lead: "El sistema que tu operación necesita, escrito desde cero.",
        items: [
          "Sistemas de gestión",
          "Aplicaciones web",
          "Integraciones y APIs",
          "Paneles y reportes",
        ],
      },
      {
        n: "02",
        title: "IA Y AUTOMATIZACIÓN",
        lead: "Que el sistema resuelva solo lo que hoy resuelve alguien a mano.",
        items: [
          "Implementación de IA en procesos",
          "Agentes de IA",
          "Bots y asistentes",
          "Automatización de procesos",
          "Integración con modelos",
        ],
      },
      {
        n: "03",
        title: "DISEÑO DE PRODUCTO",
        lead: "Antes de escribir código, definimos cómo se usa.",
        items: [
          "Arquitectura de la información",
          "Prototipado de aplicación",
          "Interfaz de usuario",
          "Diseño responsive",
        ],
      },
      {
        n: "04",
        title: "WEB Y ECOMMERCE",
        lead: "Tu presencia online, rápida y hecha a medida.",
        items: [
          "Diseño y desarrollo web",
          "Landing pages",
          "Tiendas online",
          "Web interactiva 3D · WebGL",
        ],
      },
    ],
    cta: { label: "Hablá con nosotros", href: "/contacto" },
  },

  // ---------- Cómo trabajamos ----------
  process: {
    kicker: "CÓMO TRABAJAMOS",
    // El título anterior era "Ves el producto antes de invertir en él", y se apoyaba en
    // el paso de la demo, que se eliminó porque no es algo que el estudio haga. Lo que
    // sí pasa antes de presupuestar es que el alcance queda documentado.
    // TODO(Dutsiland): validar este título.
    title: "Sabés qué se construye antes de empezar",
    steps: [
      {
        n: "01",
        title: "Nos reunimos",
        text: "Nos sentamos con vos a escuchar el problema, sin fórmulas armadas de antes.",
      },
      {
        n: "02",
        title: "Entendemos la necesidad",
        text: "Analizamos cómo funciona tu operación hoy y dónde el software puede sacarte trabajo.",
      },
      {
        n: "03",
        title: "Definimos requerimientos",
        text: "Documentamos juntos el alcance: qué entra, qué queda para después y con qué prioridad.",
      },
      {
        n: "04",
        title: "Presupuestamos",
        text: "Con el alcance validado, pasamos precio y plazos claros. Sin sorpresas a mitad de camino.",
      },
      {
        n: "05",
        title: "Desarrollamos",
        text: "Construimos, entregamos por etapas y acompañamos el sistema una vez en producción.",
      },
    ],
    cta: { label: "Empecemos tu proyecto", href: "/contacto" },
  },

  // En el home las tarjetas son decorado: no navegan. El que quiere ver los proyectos
  // va por el botón, a /proyectos.
  portfolio: {
    titleLines: ["PROYECTOS", "DESTACADOS"],
    subtitle:
      "Sistemas, plataformas y sitios que construimos para empresas argentinas",
    caseLabel: "Ver el caso",
    cta: { label: "Ver portfolio", href: "/proyectos" },
  },

  projectsIndex: {
    kicker: "PROYECTOS",
    title: "Nuestro Portfolio",
    intro:
      "Sistemas de gestión, plataformas y sitios para empresas que necesitaban algo que una plantilla no resolvía.",
    sinFicha: "Ficha en preparación",
  },

  // ---------- Sobre Dutsiland ----------
  about: {
    kicker: "SOBRE DUTSILAND",
    title: "Empezamos resolviendo un problema concreto, y no paramos.",
    subtitle:
      "Un equipo chico que escribe software a medida para PyMEs, del relevamiento al mantenimiento.",
    cta: { label: "Conocé más", href: "/sobre" },
    // TODO(Dutsiland): confirmar el año exacto de arranque del estudio.
    year: "2023",
    text: [
      "Dutsiland arrancó como un equipo chico de desarrolladores al que le pedían siempre lo mismo: un sistema que las herramientas de siempre no podían dar. En vez de forzar una plantilla, escribimos el software desde cero.",
      // TODO(Dutsiland): sumar la ciudad de origen y algún hito concreto (primer cliente, primer sistema propio).
      "Ese primer sistema se convirtió en la forma de trabajar del estudio. Hoy somos una software factory: diseñamos y desarrollamos productos digitales completos, desde el relevamiento hasta el mantenimiento, para empresas que necesitan que el software se adapte a su operación y no al revés.",
      // TODO(Dutsiland): este párrafo es un borrador. Contar cómo trabaja el equipo hoy:
      // cuántos son, cómo se reparten diseño y desarrollo, qué los diferencia.
      "Trabajamos de a pocos proyectos por vez y siempre con el mismo equipo de punta a punta: el que releva es el que diseña y el que desarrolla. Esa continuidad es lo que hace que el producto salga parecido a lo que se habló en la primera reunión.",
    ],
    // Este bloque no dice nada nuevo: ordena en tres puntos lo que ya afirman los
    // párrafos de arriba. Le da cuerpo a la página sin depender de las fotos del equipo.
    // TODO(Dutsiland): validar la redacción de los tres puntos.
    traitsKicker: "QUÉ NOS DEFINE",
    traitsTitle: "Pocos proyectos por vez, y el mismo equipo de punta a punta",
    traits: [
      {
        n: "01",
        title: "Escribimos desde cero",
        text: "No adaptamos una plantilla a los tirones: partimos del problema y construimos el sistema que esa operación necesita.",
      },
      {
        n: "02",
        title: "El mismo equipo de principio a fin",
        text: "El que releva es el que diseña y el que desarrolla. Esa continuidad es lo que hace que el producto salga parecido a lo que se habló en la primera reunión.",
      },
      {
        n: "03",
        title: "Del relevamiento al mantenimiento",
        text: "Acompañamos el sistema después de publicarlo. El software se sigue usando, y se sigue cambiando con la operación.",
      },
    ],
    teamKicker: "EL EQUIPO",
    teamTitle: "Quiénes lo hacemos",
    // TODO(Dutsiland): faltan las fotos reales del equipo (van en public/img/equipo/)
    // y los nombres y roles de cada uno.
    team: [],
    // TODO(Dutsiland): validar el copy del cierre.
    finalKicker: "EMPECEMOS",
    finalTitle: "¿Tenés un problema que el software puede resolver?",
    finalText:
      "Contanos cómo funciona tu operación hoy y vemos juntos qué se puede construir.",
    ctaFinal: { label: "Trabajemos juntos", href: "/contacto" },
  },

  // ---------- Contacto ----------
  contact: {
    kicker: "CONTACTO",
    title: "Contanos qué necesitás",
    intro:
      "Escribinos y coordinamos una primera reunión para entender el problema.",
    fields: {
      name: "Nombre y apellido",
      email: "Correo electrónico",
      message: "Mensaje",
    },
    submit: "Enviar",
    sending: "Enviando…",
    success: "¡Solicitud de contacto enviada! Te respondemos a la brevedad.",
    error: "No pudimos enviar el mensaje. Escribinos directo a",
  },

  projectView: {
    back: "Volver a proyectos",
    problemKicker: "EL PROBLEMA",
    problemTitle: "Qué había que resolver",
    builtKicker: "QUÉ CONSTRUIMOS",
    builtTitle: "Lo que hicimos",
    photosKicker: "EL PRODUCTO",
    photosTitle: "Así se ve",
    nextKicker: "SIGUIENTE PROYECTO",
    cta: { label: "Queremos hacer el tuyo", href: "/contacto" },
  },

  // ---------- Proyectos ----------
  // Los que tienen `detail` linkean a /proyectos/<slug>; los demás son solo tarjeta.
  projects: [
    {
      slug: "publicite",
      name: "Publicité",
      lead: "Marketplace y red social para publicar, conectar y vender.",
      cover: "/img/publicite.jpg",
      coverAlt: "Publicité",
      detail: {
        kicker: "MARKETPLACE CON IA",
        role: "Backend y arquitectura",
        context: "Proyecto colaborativo, en producción",
        // TODO(Dutsiland): validar con el cliente cómo contamos el problema.
        // Está redactado a partir de lo que hace el producto, no de un brief.
        problem: [
          "Publicar en un clasificado tradicional es tirar una botella al mar. El que publica no sabe cuánto vale lo que ofrece y le pone un precio a ojo; el que busca tiene que recorrer cientos de avisos para encontrar uno que le sirva. Los dos lados pierden tiempo y la mayoría de las publicaciones no llega a nadie.",
          "La idea no era hacer otra lista de avisos, sino una comunidad: que la publicación encuentre a quien la necesita en lugar de esperar a que alguien la encuentre, y que el precio salga de comparables reales y no de la intuición.",
        ],
        built: [
          {
            title: "Anuncios geolocalizados",
            text: "Bienes, servicios y necesidades, con búsqueda por ubicación y filtros.",
          },
          {
            title: "Cubito, el asistente de IA",
            text: "Valúa publicaciones con informes y comparables reales, cruza necesidades con anuncios y ayuda a armar una publicación conversando.",
          },
          {
            title: "Comunidad",
            text: "Relaciones entre usuarios, grupos y revistas donde guardan publicaciones en conjunto.",
          },
          {
            title: "Suscripciones y pagos",
            text: "Planes con distintos beneficios, integrados con Mercado Pago.",
          },
          {
            title: "Notificaciones en tiempo real",
            text: "Los avisos llegan solos, sin recargar la página, más sorteos para la comunidad.",
          },
          {
            title: "Un backend que aguanta el crecimiento",
            text: "Preparado para crecer sin rehacerse: cada parte se puede cambiar sin tocar el resto, y los cambios entran con tests que los respaldan.",
          },
        ],
        links: [
          {
            label: "Ver código",
            href: "https://github.com/renatobicego/publicite",
          },
        ],
        photos: [
          {
            src: "/img/proyectos/publicite/publicite-1.webp",
            alt: "Publicité — inicio",
            caption: "El inicio, con los anuncios cerca tuyo",
          },
          {
            src: "/img/proyectos/publicite/publicite-2.webp",
            alt: "Publicité — anuncios",
            caption: "Búsqueda por ubicación y filtros",
          },
          {
            src: "/img/proyectos/publicite/publicite-3.webp",
            alt: "Publicité — Cubito",
            caption: "Cubito valuando una publicación",
          },
          {
            src: "/img/proyectos/publicite/publicite-4.webp",
            alt: "Publicité — comunidad",
            caption: "Grupos y revistas de la comunidad",
          },
        ],
      },
    },
    {
      slug: "mahatu-consultorios",
      name: "Mahatu Consultorios",
      lead: "Sistema de gestión de turnos online para una clínica odontológica.",
      cover: "/img/mahatu.jpg",
      coverAlt: "Mahatu Consultorios",
      detail: {
        kicker: "SALUD",
        role: "Backend y arquitectura",
        context: "En producción para la clínica",
        // TODO(Dutsiland): confirmar con Mahatu cómo era la operación antes del sistema.
        problem: [
          "La clínica coordinaba los turnos por teléfono y a mano. Cada cambio de agenda había que avisarlo, el historial de cada paciente estaba en papel y los ingresos se seguían aparte, así que nadie tenía el panorama completo en un solo lugar.",
          "Lo que hacía falta no era una agenda digital más, sino que el paciente pudiera reservar solo, sobre la disponibilidad real del profesional, y que la clínica viera en el mismo sistema la atención y la facturación.",
        ],
        built: [
          {
            title: "Turnos online",
            text: "El paciente reserva según la disponibilidad real del profesional, y el profesional también puede asignar turnos él mismo.",
          },
          {
            title: "Agenda del profesional",
            text: "Asignar, reprogramar o eliminar turnos desde un calendario.",
          },
          {
            title: "Fichas de pacientes",
            text: "Historial clínico detallado, con la información de cada paciente en un solo lugar.",
          },
          {
            title: "Anotaciones por turno",
            text: "Notas específicas de cada atención, para no depender de la memoria.",
          },
          {
            title: "Control de facturación",
            text: "Registro de pagos, medios de pago e información de obras sociales, con una vista para seguir los ingresos.",
          },
        ],
        links: [],
        photos: [
          {
            src: "/img/proyectos/mahatu/mahatu-3.webp",
            alt: "Mahatu — turnos",
            caption: "La reserva de turnos del paciente",
          },
          {
            src: "/img/proyectos/mahatu/mahatu-4.webp",
            alt: "Mahatu — calendario",
            caption: "El calendario del profesional",
          },
          {
            src: "/img/proyectos/mahatu/mahatu-1.webp",
            alt: "Mahatu — pacientes",
            caption: "La ficha del paciente y su historial",
          },
          {
            src: "/img/proyectos/mahatu/mahatu-2.webp",
            alt: "Mahatu — facturación",
            caption: "El control de pagos e ingresos",
          },
        ],
      },
    },
    // Estos cinco salen de las fichas del sitio actual (dutsiland.com/#trabajos).
    {
      slug: "ama",
      name: "Asociación Mendocina de Atletismo",
      lead: "Sistema de torneos de atletismo: inscripciones, jueces y resultados en vivo.",
      cover: "/img/ama.jpg",
      coverAlt: "Asociación Mendocina de Atletismo",
      detail: {
        kicker: "DEPORTE · SISTEMA A MEDIDA",
        role: "Investigación, diseño de producto y desarrollo",
        context: "En producción para la asociación",
        problem: [
          "Organizar un torneo de atletismo tiene muchas partes: inscripciones, categorías por edad, jueces cargando marcas y público esperando los resultados. La asociación lo manejaba con planillas y cálculos a mano, así que los puestos tardaban en salir y los errores eran difíciles de evitar.",
          "Cada disciplina tiene sus propias reglas para las marcas, el viento y las series, y hacerlas cumplir a mano es lento y propenso a errores. La asociación necesitaba un sistema que conociera esas reglas y se encargara de aplicarlas.",
          "Además, los jueces fiscalizan en la pista, a veces sin señal, y muchos usuarios son personas mayores. Por eso arrancamos con una etapa de investigación para entender las necesidades reales antes de diseñar las pantallas.",
        ],
        built: [
          {
            title: "Inscripciones con las reglas puestas",
            text: "El atleta se inscribe por DNI y el sistema valida la categoría contra su edad, controla que quede en una sola categoría por torneo y asigna un número de competidor único. Federados y no federados, desde el celular.",
          },
          {
            title: "Carga de resultados por el juez",
            text: "El juez elige prueba, categoría, sexo y serie, y carga las marcas con auto-formateo según la disciplina: el tiempo, la distancia o la altura se validan automáticamente mientras tipea, sin que tenga que acordarse del formato.",
          },
          {
            title: "Puestos y series automáticos",
            text: "El sistema ordena los puestos según el tipo de prueba —menor tiempo o mayor distancia— y maneja la progresión de series a semis y finales, sin dejar que un atleta caiga dos veces en la misma ronda.",
          },
          {
            title: "Pruebas combinadas con puntaje IAAF",
            text: "El sistema calcula los puntos de cada disciplina según la tabla IAAF y arma el ranking por suma de puntos, sin mezclarse con las mismas pruebas individuales.",
          },
          {
            title: "Trabajo sin conexión en la pista",
            text: "El juez puede cargar una jornada entera sin señal: las marcas se guardan en el dispositivo y se sincronizan solas al recuperar conexión.",
          },
          {
            title: "Resultados en vivo para el público",
            text: "A medida que los jueces cargan, el público sigue las marcas y los puestos en tiempo real, desde cualquier pantalla.",
          },
          {
            title: "Una interfaz sin obstáculos",
            text: "Diseño responsive pensado para que un usuario mayor llegue rápido a lo que busca, con la investigación previa como guía.",
          },
        ],
        links: [{ label: "Ver sitio", href: "https://amamendoza.vercel.app/" }],
        photos: [
          {
            src: "/img/proyectos/ama/resultados-ama.png",
            alt: "AMA — resultados en vivo",
            caption: "Los resultados del torneo, en vivo para el público",
          },
          {
            src: "/img/proyectos/ama/backoffice-juez-resultados-ama.png",
            alt: "AMA — carga del juez",
            caption:
              "La carga del juez: marcas por prueba, categoría, sexo y serie",
          },
          {
            src: "/img/proyectos/ama/backoffice-inscriptos-ama.png",
            alt: "AMA — inscriptos",
            caption: "La gestión de inscriptos, con pagos, números y federados",
          },
          {
            src: "/img/proyectos/ama/inscripcion-mobile-ama.png",
            alt: "AMA — inscripción mobile",
            caption: "La inscripción del atleta por DNI, desde el teléfono",
            tall: true,
          },
          {
            src: "/img/proyectos/ama/resultado-mobile-ama.png",
            alt: "AMA — resultado mobile",
            caption: "El resultado de una prueba, en el teléfono",
            tall: true,
          },
        ],
      },
    },
    {
      slug: "cucha-repuestos",
      name: "Cucha Repuestos",
      lead: "El sitio de una empresa de repuestos para camiones Iveco.",
      cover: "/img/cucha.jpg",
      coverAlt: "Cucha Repuestos",
      detail: {
        kicker: "REPUESTOS",
        role: "Diseño de interfaz y desarrollo",
        context: "En producción",
        problem: [
          "Cucha Repuestos vende repuestos importados para camiones Iveco y es referente en la Patagonia, pero toda su operación vivía fuera de línea: para saber si había una pieza, o con qué marcas trabajaban, había que llamar o pasar por el local.",
          "El sitio tenía que hacer dos cosas a la vez: mostrar la línea completa de productos a alguien que no está en Comodoro, y dejar claro por qué comprarles a ellos —envíos a todo el país, garantía, repuestos originales y alternativos—.",
        ],
        built: [
          {
            title: "La línea completa de repuestos",
            text: "El catálogo de productos Iveco, navegable por categoría.",
          },
          {
            title: "Las tres promesas, arriba de todo",
            text: "Comodidad y seguridad, envíos a todo el país, garantía y calidad: lo primero que ve quien entra.",
          },
          {
            title: "La sucursal en el mapa",
            text: "Dirección, horarios y contacto directo por WhatsApp desde cualquier pantalla.",
          },
          {
            title: "Las marcas con las que trabajan",
            text: "El respaldo de los proveedores, visible para quien no los conoce.",
          },
        ],
        links: [{ label: "Ver sitio", href: "https://cucharepuestos.com/" }],
        photos: [
          {
            src: "/img/proyectos/cucha/1.webp",
            alt: "Cucha — el sitio",
            caption: "El sitio en escritorio y en el teléfono",
          },
          {
            src: "/img/proyectos/cucha/2.webp",
            alt: "Cucha — portada",
            caption: "La portada, con las tres promesas del negocio",
          },
          {
            src: "/img/proyectos/cucha/3.webp",
            alt: "Cucha — sucursal",
            caption: "La sucursal en el mapa y las marcas con las que trabajan",
          },
          {
            src: "/img/proyectos/cucha/4.webp",
            alt: "Cucha — pantallas",
            caption: "El mapa de pantallas del proyecto",
          },
        ],
      },
    },
    {
      slug: "medialuna-medias",
      name: "Medialuna Medias",
      lead: "Catálogo online para un emprendimiento de medias.",
      cover: "/img/medialuna.jpg",
      coverAlt: "Medialuna Medias",
      detail: {
        kicker: "CATÁLOGO ONLINE",
        role: "Diseño de interfaz y desarrollo",
        context: "En producción",
        problem: [
          "Medialuna vendía por canales informales: cada consulta se respondía a mano, mandando fotos sueltas. El cliente no podía ver el surtido completo y el emprendimiento no tenía forma de ordenar lo que ofrecía.",
          "Lo que hacía falta era un catálogo que se pudiera recorrer solo, sin perder el tono del emprendimiento: colorido e ilustrado, que es justo lo que lo diferencia de cualquier tienda genérica.",
        ],
        built: [
          {
            title: "El catálogo completo",
            text: "Todo el surtido en un solo lugar, con su precio y su foto.",
          },
          {
            title: "Búsqueda y categorías",
            text: "Filtrado y orden por categoría, para llegar al producto sin scrollear de más.",
          },
          {
            title: "Una identidad que no se diluye",
            text: "El diseño colorido e ilustrado del emprendimiento, llevado a la interfaz.",
          },
          {
            title: "El cierre por donde ya vendían",
            text: "El contacto directo por WhatsApp e Instagram, que es donde la venta se concreta.",
          },
        ],
        links: [
          {
            label: "Ver catálogo",
            href: "https://medialunamedias.vercel.app/",
          },
        ],
        photos: [
          {
            src: "/img/proyectos/medialuna/1.webp",
            alt: "Medialuna — la tienda",
            caption: "La tienda en escritorio y en el teléfono",
          },
          {
            src: "/img/proyectos/medialuna/2.webp",
            alt: "Medialuna — catálogo",
            caption: "El catálogo, con búsqueda y filtros",
          },
          {
            src: "/img/proyectos/medialuna/3.webp",
            alt: "Medialuna — categorías",
            caption: "Las categorías y el contacto directo",
          },
          {
            src: "/img/proyectos/medialuna/4.webp",
            alt: "Medialuna — pantallas",
            caption: "El mapa de pantallas del proyecto",
          },
        ],
      },
    },
    {
      slug: "mimpronta",
      name: "Mimpronta",
      lead: "La landing de una agencia de consultoría e impacto.",
      cover: "/img/mimpronta.jpg",
      coverAlt: "Mimpronta",
      detail: {
        kicker: "CONSULTORÍA · IMPACTO",
        role: "Diseño de interfaz y desarrollo",
        context: "En producción",
        problem: [
          "Mimpronta es una agencia de consultoría y acompañamiento que ayuda a personas, empresas y organizaciones a desarrollar proyectos con propósito, incorporando sostenibilidad, innovación social y estrategias de impacto. Necesitaba un lugar donde explicar qué hace y promover sus servicios, porque hasta entonces no tenía dónde mandar a alguien que quisiera entender su propuesta.",
          "La dificultad no era técnica sino de traducción: la agencia ya tenía una identidad visual fuerte, ilustrada, y había que llevarla a la web sin que perdiera fuerza. Trabajamos de la mano de sus diseñadores para que el resultado fuera funcional y además se sostuviera como pieza gráfica.",
        ],
        built: [
          {
            title: "La propuesta, en una sola página",
            text: "Quiénes son, qué hacen y cómo trabajan, en un recorrido que se lee de una.",
          },
          {
            title: "La identidad llevada a la interfaz",
            text: "Las ilustraciones y la paleta de la agencia, trasladadas a la web junto a sus diseñadores.",
          },
          {
            title: "Blog propio",
            text: "Un espacio para publicar sus notas sobre innovación social y sostener la presencia.",
          },
          {
            title: "Diseño responsive",
            text: "La misma pieza, entera, en cualquier pantalla.",
          },
        ],
        links: [{ label: "Ver sitio", href: "https://mimpronta.com/" }],
        photos: [
          {
            src: "/img/proyectos/mimpronta/1.webp",
            alt: "Mimpronta — el blog",
            caption: "El blog, en la maqueta de diseño",
          },
          {
            src: "/img/proyectos/mimpronta/2.webp",
            alt: "Mimpronta — portada",
            caption: "La portada, con el mensaje de la agencia",
          },
          {
            src: "/img/proyectos/mimpronta/3.webp",
            alt: "Mimpronta — notas",
            caption: "El blog, con el último post destacado",
          },
          {
            src: "/img/proyectos/mimpronta/4.webp",
            alt: "Mimpronta — pantallas",
            caption: "El mapa de pantallas del proyecto",
          },
        ],
      },
    },
    // Caso real: sitio del centenario del Colegio San Luis Gonzaga (Mendoza),
    // desarrollado por el estudio. Contenido tomado del propio sitio
    // (https://centenario.colegiosanluisgonzaga.edu.ar/).
    // Imágenes reales en public/img/proyectos/slg-centenario/ (portada, inicio, mobile).
    {
      slug: "san-luis-gonzaga-centenario",
      name: "Centenario San Luis Gonzaga",
      lead: "Un mapa colaborativo para celebrar los 100 años del colegio con su comunidad.",
      cover: "/img/proyectos/slg-centenario/portada-slg-centenario.png",
      coverAlt: "Centenario del Colegio San Luis Gonzaga",
      detail: {
        kicker: "EDUCACIÓN · COMUNIDAD",
        role: "Diseño de producto y desarrollo",
        context: "En producción para el centenario",
        // TODO(Dutsiland): validar con el colegio cómo contamos el problema.
        // Redactado a partir de lo que hace el sitio, no de un brief.
        problem: [
          "El Colegio San Luis Gonzaga es uno de los colegios privados más antiguos de Mendoza, con cien años de historia y varias generaciones de egresados repartidas por todos lados. Para el centenario, la efeméride corría el riesgo de quedar en un acto y unas fotos: mucha memoria dispersa, sin un lugar donde juntarla.",
          "La idea no era publicar una página institucional más, sino darle a la comunidad una forma de participar. Que cada exalumno, familia o docente pudiera dejar su marca y su historia, y que esas marcas juntas contaran los cien años mejor que cualquier texto.",
        ],
        built: [
          {
            title: "El Mapa del San Lucho",
            text: "Un mapa donde cada persona de la comunidad agrega su pin y pasa a formar parte de la historia del colegio.",
          },
          {
            title: "Sumar tu pin en dos pasos",
            text: "Cargar la ubicación y el relato es simple y rápido, pensado para que participe cualquiera, sin fricción.",
          },
          {
            title: "La comunidad, en un solo lugar",
            text: "Cien años de egresados y familias, reunidos alrededor de una misma efeméride.",
          },
          {
            title: "Hecho por un desarrollador del estudio",
            text: "El desarrollo estuvo a cargo de Renato, desarrollador de Dutsiland y egresado del colegio, que conocía de adentro lo que el centenario significaba.",
          },
        ],
        links: [
          {
            label: "Ver sitio",
            href: "https://centenario.colegiosanluisgonzaga.edu.ar/",
          },
        ],
        photos: [
          {
            src: "/img/proyectos/slg-centenario/portada-slg-centenario.png",
            alt: "San Luis Gonzaga — portada",
            caption:
              "La portada del centenario, con la invitación a sumar un pin",
          },
          {
            src: "/img/proyectos/slg-centenario/inicio-slg-centenario.png",
            alt: "San Luis Gonzaga — el mapa",
            caption: "El Mapa del San Lucho, con los pines de la comunidad",
          },
          {
            src: "/img/proyectos/slg-centenario/mobile-slg-centenario.png",
            alt: "San Luis Gonzaga — en el teléfono",
            caption: "El mapa colaborativo, en el teléfono",
            tall: true,
          },
        ],
      },
    },
    // Caso real: Uspallata Experience (https://uspallataexperience.com/), sitio de
    // una experiencia de montaña en Uspallata, Mendoza. Ficha redactada a partir del
    // relato de la experiencia (travesía Villavicencio–Uspallata, 4x4 + e-bike,
    // pulpería centenaria y el vino "Quinto Elemento").
    // TODO(Dutsiland): reemplazar `cover` por una imagen cuadrada del proyecto
    //   (public/img/uspallata-experience.webp). Hoy apunta a la captura de inicio.
    {
      slug: "uspallata-experience",
      name: "Uspallata Experience",
      lead: "La web de una experiencia de montaña entre Villavicencio y Uspallata.",
      cover:
        "/img/proyectos/uspallata-experience/inicio-uspallata-experience.png",
      coverAlt: "Uspallata Experience",
      detail: {
        kicker: "TURISMO · EXPERIENCIAS",
        role: "Diseño de interfaz y desarrollo",
        context: "En producción",
        problem: [
          "Uspallata Experience no es una excursión más: es una travesía de alta montaña que recorre los caminos históricos entre Villavicencio y Uspallata, cruza antiguos escenarios mineros y sectores de reserva natural, y combina tramos en 4x4 con sectores exclusivos en e-bike. El cierre es una degustación privada en una pulpería de más de cien años, con un vino —Quinto Elemento— creado solo para esta experiencia.",
          "Contar todo eso en una web es el desafío: hay que transmitir la naturaleza salvaje, el silencio de la cordillera y el confort premium sin que se lea como un folleto. La página tenía que hacer sentir la travesía antes de reservarla, y dejar clarísimo que se trata de una experiencia única, imposible de encontrar en otro lado.",
        ],
        built: [
          {
            title: "El relato de la travesía",
            text: "Los caminos históricos, la reserva natural y la alta montaña, contados en un recorrido que se lee como se vive: naturaleza salvaje y confort premium.",
          },
          {
            title: "4x4 y e-bike, la experiencia distinta",
            text: "La combinación de tramos en 4x4 con sectores exclusivos en e-bike, presentada como lo que diferencia a esta travesía: más auténtica, más silenciosa y más conectada con el entorno.",
          },
          {
            title: "La pulpería centenaria",
            text: 'El sitio de Los Cuatro Elementos: una pulpería de más de cien años, restaurada para las degustaciones privadas y locación de la película "Gregoria".',
          },
          {
            title: "Quinto Elemento",
            text: "El vino creado junto a enólogos de prestigio, pensado exclusivamente para esta experiencia, con su propio espacio dentro del recorrido.",
          },
          {
            title: "Diseño responsive",
            text: "La misma inmensidad de la cordillera, entera, tanto en escritorio como en el teléfono.",
          },
        ],
        links: [
          { label: "Ver sitio", href: "https://uspallataexperience.com/" },
        ],
        photos: [
          {
            src: "/img/proyectos/uspallata-experience/inicio-uspallata-experience.png",
            alt: "Uspallata Experience — inicio",
            caption:
              "La portada: no es una excursión, es una experiencia de montaña",
          },
          {
            src: "/img/proyectos/uspallata-experience/seccion-inicio-uspallata-experience.png",
            alt: "Uspallata Experience — la travesía",
            caption:
              "La travesía: caminos cargados de historia y silencio, entre Villavicencio y Uspallata",
          },
          {
            src: "/img/proyectos/uspallata-experience/seccion-inicio-mobile-uspallata-experience.png",
            alt: "Uspallata Experience — en el teléfono",
            caption: "El relato de la experiencia, en el teléfono",
            tall: true,
          },
          {
            src: "/img/proyectos/uspallata-experience/fotos-mobile-uspallata-experience.png",
            alt: "Uspallata Experience — galería mobile",
            caption: "La galería de la alta montaña, en mobile",
            tall: true,
          },
        ],
      },
    },

    // Caso real: Depto Mendoza (https://... alojamiento turístico), landing de un
    // departamento de alquiler temporario en Godoy Cruz, Mendoza, atendido por su
    // dueña Marcela. Ficha redactada a partir del contenido del sitio (secciones,
    // reputación en Airbnb, ubicación y presentación de la anfitriona).
    // Imágenes reales en public/img/proyectos/depto-mendoza/.
    {
      slug: "depto-mendoza",
      name: "Depto Mendoza",
      lead: "La landing de un departamento de alquiler temporario en Godoy Cruz, Mendoza.",
      cover: "/img/proyectos/depto-mendoza/inicio-depto-mendoza.png",
      coverAlt: "Depto Mendoza",
      detail: {
        kicker: "TURISMO · ALOJAMIENTO",
        role: "Diseño de interfaz y desarrollo",
        context: "En producción",
        problem: [
          "Marcela alquila un departamento amplio y residencial en Gobernador Benegas, Godoy Cruz, y lo atiende ella misma. El problema no era técnico: quien busca dónde hospedarse en Mendoza necesita confiar antes de reservar, y una publicación suelta en una plataforma no alcanza para transmitir cómo es el lugar ni quién lo recibe.",
          "La idea no era armar otra plataforma de alquileres, sino una landing que genere confianza para reservar un alojamiento específico: que muestre los espacios, la ubicación y la reputación en Airbnb, y que ponga la cara de la anfitriona por delante para que la consulta salga con seguridad.",
        ],
        built: [
          {
            title: "El departamento, espacio por espacio",
            text: "Comedor, cocina y patio, baño y las dos habitaciones, mostrados con fotografías para que se entienda cómo es antes de reservar.",
          },
          {
            title: "La anfitriona, por delante",
            text: "El perfil y la experiencia de Marcela como anfitriona de Airbnb, para que la reserva se haga con una persona y no con un aviso.",
          },
          {
            title: "Reputación que respalda",
            text: "La valoración 5/5 y las referencias a Airbnb, visibles para dar confianza a quien todavía no reservó.",
          },
          {
            title: "Ubicación y lugares cercanos",
            text: "En Gobernador Benegas, cerca del Parque San Vicente y Palmares, y a unos 15 minutos en auto del centro de Mendoza.",
          },
          {
            title: "El cierre por consulta directa",
            text: "Los canales de contacto y redes, para consultar o reservar el alojamiento sin fricción.",
          },
        ],
        links: [],
        photos: [
          {
            src: "/img/proyectos/depto-mendoza/inicio-depto-mendoza.png",
            alt: "Depto Mendoza — inicio",
            caption: "La portada: el departamento y su propuesta principal",
          },
          {
            src: "/img/proyectos/depto-mendoza/ubicacion-depto-mendoza.png",
            alt: "Depto Mendoza — ubicación",
            caption:
              "La ubicación en Godoy Cruz y los lugares cercanos al alojamiento",
          },
          {
            src: "/img/proyectos/depto-mendoza/fotos-mobile-depto-mendoza.png",
            alt: "Depto Mendoza — los espacios en el teléfono",
            caption: "Los espacios del departamento, en el teléfono",
            tall: true,
          },
          {
            src: "/img/proyectos/depto-mendoza/resenias-mobile-depto-mendoza.png",
            alt: "Depto Mendoza — reseñas en el teléfono",
            caption: "Las reseñas y la valoración 5/5, en el teléfono",
            tall: true,
          },
        ],
      },
    },

    /* =====================================================================
       DESDE ACÁ, CASOS INVENTADOS (demo: true)
       Cliente, números y capturas son nuestros, no de un trabajo real. Sirven
       para mostrar el sitio completo por rubro mientras el estudio junta los
       casos verdaderos. NO PUBLICAR ASÍ: cada uno se reemplaza por un caso real
       o se borra. Las capturas salen de maquetas en HTML, no de productos que
       existan.
       ===================================================================== */
    {
      slug: "cocina-norte",
      name: "Cocina Norte",
      lead: "Comandas, salón y delivery para un grupo gastronómico de cinco locales.",
      cover: "/img/cocina-norte.webp",
      coverAlt: "Cocina Norte",
      demo: true,
      detail: {
        kicker: "GASTRONOMÍA",
        role: "Diseño de producto y desarrollo",
        context: "Caso de demostración",
        problem: [
          "Un restaurante con salón lleno y tres apps de delivery en simultáneo tiene el mismo problema todas las noches: el pedido existe en un papel, en una pantalla del delivery y en la cabeza del mozo, pero en ningún lado a la vez. La cocina cocina lo que le llega cuando le llega, y nadie sabe cuánto hace que un plato está esperando.",
          "Con cinco locales el problema se multiplica: cada uno arma su carta, se queda sin un insumo y sigue vendiéndolo igual, y el dueño se entera del resultado de la semana cuando ya pasó. Lo que hacía falta no era un sistema de cajas más, sino que el pedido sea uno solo desde que entra hasta que sale, y que lo que se agota deje de ofrecerse solo.",
        ],
        built: [
          {
            title: "Comandas en cocina",
            text: "Salón, mostrador y las apps de delivery entran a la misma pantalla, en columnas por estado y con el reloj corriendo en cada pedido.",
          },
          {
            title: "Mapa de salón",
            text: "Qué mesa está ocupada, hace cuánto, con qué mozo y cuánto lleva consumido, sin preguntarle a nadie.",
          },
          {
            title: "Carta con disponibilidad real",
            text: "Lo que se agota en un local deja de ofrecerse ahí mismo, en el salón y en las apps, sin que nadie tenga que acordarse.",
          },
          {
            title: "Integración con delivery",
            text: "Los pedidos de las apps entran como una comanda más y avisan solos cuando se demoran.",
          },
          {
            title: "Cierre por local y consolidado",
            text: "Facturación, tickets y tiempos de cocina por día y por sucursal, comparables entre sí.",
          },
        ],
        links: [],
        photos: [
          {
            src: "/img/proyectos/cocina-norte/1.webp",
            alt: "Cocina Norte — comandas",
            caption:
              "La pantalla de cocina: cada pedido avanza por columnas y el reloj no se detiene",
          },
          {
            src: "/img/proyectos/cocina-norte/2.webp",
            alt: "Cocina Norte — salón",
            caption:
              "El mapa de salón, con el consumo y el tiempo de cada mesa",
          },
          {
            src: "/img/proyectos/cocina-norte/3.webp",
            alt: "Cocina Norte — carta",
            caption:
              "La carta por local: lo que se agota deja de ofrecerse solo",
          },
          {
            src: "/img/proyectos/cocina-norte/4.webp",
            alt: "Cocina Norte — reportes",
            caption:
              "El cierre de la semana, con los cinco locales comparables",
          },
        ],
      },
    },
    {
      slug: "raiz-distribuciones",
      name: "Raíz Distribuciones",
      lead: "Control de stock en tres depósitos, con lectura de códigos y alertas de quiebre.",
      cover: "/img/raiz-distribuciones.webp",
      coverAlt: "Raíz Distribuciones",
      demo: true,
      detail: {
        kicker: "STOCK Y DEPÓSITO",
        role: "Relevamiento, diseño y desarrollo",
        context: "Caso de demostración",
        problem: [
          "Una distribuidora con tres depósitos tiene tres stocks distintos y ninguno confiable. El sistema dice que hay mercadería, el depósito dice que no, y la diferencia recién aparece cuando un pedido se arma incompleto y el cliente reclama. Cada control manual se hace con una planilla que queda vieja el mismo día que se llena.",
          "El costo no es el faltante en sí: es que nadie lo ve venir. Se compra de más lo que sobra, se compra tarde lo que falta, y el que arma los pedidos camina el depósito dos veces porque no sabe dónde está lo que busca. La idea fue que el stock se actualice cuando la mercadería se mueve, no cuando alguien se acuerda de cargarlo.",
        ],
        built: [
          {
            title: "Stock consolidado",
            text: "Los tres depósitos en una sola vista, con mínimos por producto y cuántos días de cobertura quedan.",
          },
          {
            title: "Ingreso con lector",
            text: "La mercadería entra leyendo el código con el celular y el sistema compara contra el remito: qué falta, qué sobra, en qué renglón.",
          },
          {
            title: "Picking ordenado por recorrido",
            text: "El pedido se arma en el orden en que está la mercadería en el depósito, no en el orden en que lo escribió el cliente.",
          },
          {
            title: "Alertas de reposición",
            text: "Cruza el consumo de las últimas ocho semanas con el stock y arma la orden de compra sugerida por proveedor.",
          },
          {
            title: "Trazabilidad de movimientos",
            text: "Cada unidad tiene su historia: quién la recibió, a qué depósito fue y en qué pedido salió.",
          },
        ],
        links: [],
        photos: [
          {
            src: "/img/proyectos/raiz-distribuciones/1.webp",
            alt: "Raíz — stock",
            caption:
              "El stock de los tres depósitos, ordenado por lo que está por faltar",
          },
          {
            src: "/img/proyectos/raiz-distribuciones/2.webp",
            alt: "Raíz — ingreso",
            caption:
              "El ingreso con lector: el sistema compara contra el remito mientras se lee",
          },
          {
            src: "/img/proyectos/raiz-distribuciones/3.webp",
            alt: "Raíz — picking",
            caption:
              "Las hojas de ruta y el avance de cada pedido en preparación",
          },
          {
            src: "/img/proyectos/raiz-distribuciones/4.webp",
            alt: "Raíz — reposición",
            caption:
              "La reposición sugerida, con la cobertura de cada producto",
          },
        ],
      },
    },
    // {
    //   slug: "centro-aconcagua",
    //   name: "Centro Médico Aconcagua",
    //   lead: "Turnos, historia clínica y receta digital para catorce consultorios.",
    //   cover: "/img/centro-aconcagua.webp",
    //   coverAlt: "Centro Médico Aconcagua",
    //   demo: true,
    //   detail: {
    //     kicker: "SALUD",
    //     role: "Diseño de producto y desarrollo",
    //     context: "Caso de demostración",
    //     problem: [
    //       "En un centro con ocho especialidades, el turno se pide por teléfono, se anota en un cuaderno y se confirma por WhatsApp desde tres celulares distintos. Se superponen, se pierden y el paciente se entera cuando ya está en la sala de espera. La historia clínica, mientras tanto, vive en carpetas: cada profesional ve lo suyo y nadie ve el conjunto.",
    //       "El pedido no era digitalizar papeles sino que las tres cosas se toquen: que el turno sepa a qué profesional y a qué consultorio va, que la consulta escriba en la misma historia que van a leer los demás, y que la receta salga firmada de ahí sin volver a tipear nada.",
    //     ],
    //     built: [
    //       {
    //         title: "Agenda por profesional y consultorio",
    //         text: "La semana completa, con sobreturnos, ausencias y los huecos reales que quedan libres.",
    //       },
    //       {
    //         title: "Historia clínica única",
    //         text: "Una sola línea de tiempo por paciente: consultas, estudios y medicación activa, la escriba quien la escriba.",
    //       },
    //       {
    //         title: "Receta digital firmada",
    //         text: "Sale de la consulta, le llega al paciente al celular y la farmacia la valida con un código. Al dispensarse queda marcada y no se puede usar dos veces.",
    //       },
    //       {
    //         title: "Sala de espera en pantalla",
    //         text: "A quién se está llamando, qué consultorio está libre y cuánta demora hay, en el hall y en recepción.",
    //       },
    //       {
    //         title: "Obras sociales",
    //         text: "Los datos del afiliado y la cobertura se cargan una vez y viajan al turno, a la consulta y a la receta.",
    //       },
    //     ],
    //     links: [],
    //     photos: [
    //       {
    //         src: "/img/proyectos/centro-aconcagua/1.webp",
    //         alt: "Aconcagua — agenda",
    //         caption:
    //           "La agenda de la semana, con las ocho especialidades en la misma grilla",
    //       },
    //       {
    //         src: "/img/proyectos/centro-aconcagua/2.webp",
    //         alt: "Aconcagua — historia clínica",
    //         caption:
    //           "La historia clínica: una sola línea de tiempo por paciente",
    //       },
    //       {
    //         src: "/img/proyectos/centro-aconcagua/3.webp",
    //         alt: "Aconcagua — receta",
    //         caption:
    //           "La receta digital, lista para firmar y enviar al paciente",
    //       },
    //       {
    //         src: "/img/proyectos/centro-aconcagua/4.webp",
    //         alt: "Aconcagua — sala de espera",
    //         caption:
    //           "La sala de espera: a quién se llama y qué consultorio está libre",
    //       },
    //     ],
    //   },
    // },
    // {
    //   slug: "instituto-ledesma",
    //   name: "Instituto Ledesma",
    //   lead: "Cursadas, asistencia por QR y boletín digital para 1.400 alumnos.",
    //   cover: "/img/instituto-ledesma.webp",
    //   coverAlt: "Instituto Ledesma",
    //   demo: true,
    //   detail: {
    //     kicker: "EDUCACIÓN",
    //     role: "Diseño de producto y desarrollo",
    //     context: "Caso de demostración",
    //     problem: [
    //       "Tomar asistencia a mano en una comisión de cuarenta alumnos cuesta diez minutos de clase, y después hay que pasarla a una planilla que alguien va a consolidar a fin de mes. Las notas viven en el cuaderno de cada docente y el boletín se arma a mano, materia por materia, cuando el cuatrimestre ya terminó.",
    //       "Lo grave no es el trabajo administrativo: es que el alumno que se está por perder el cuatrimestre se detecta tarde. Cuando la asistencia y las notas están en dos lugares distintos, nadie cruza las dos cosas hasta que ya no hay margen para hacer algo.",
    //     ],
    //     built: [
    //       {
    //         title: "Asistencia por código",
    //         text: "El docente muestra un código que cambia cada minuto y el alumno lo escanea. No se puede pasar por mensaje, y el registro queda cerrado y firmado.",
    //       },
    //       {
    //         title: "Cursadas del docente",
    //         text: "Cada comisión con su avance del programa, su asistencia y su promedio, en una sola pantalla.",
    //       },
    //       {
    //         title: "Libro de notas",
    //         text: "Parciales, trabajos y recuperatorios se cargan una vez y el boletín se arma solo con esas columnas.",
    //       },
    //       {
    //         title: "Detección de alumnos en riesgo",
    //         text: "Cruza asistencia y notas y marca al que se está por perder el cuatrimestre mientras todavía hay margen.",
    //       },
    //       {
    //         title: "Aulas y horarios",
    //         text: "La grilla de aulas evita las superposiciones antes de que pasen, no después.",
    //       },
    //     ],
    //     links: [],
    //     photos: [
    //       {
    //         src: "/img/proyectos/instituto-ledesma/1.webp",
    //         alt: "Ledesma — cursadas",
    //         caption:
    //           "Las cursadas del docente, con el avance del programa de cada una",
    //       },
    //       {
    //         src: "/img/proyectos/instituto-ledesma/2.webp",
    //         alt: "Ledesma — asistencia",
    //         caption:
    //           "La asistencia en curso: el código cambia cada minuto y el registro se actualiza solo",
    //       },
    //       {
    //         src: "/img/proyectos/instituto-ledesma/3.webp",
    //         alt: "Ledesma — notas",
    //         caption:
    //           "El libro de notas, del que sale el boletín sin volver a cargar nada",
    //       },
    //       {
    //         src: "/img/proyectos/instituto-ledesma/4.webp",
    //         alt: "Ledesma — riesgo",
    //         caption:
    //           "Los alumnos en riesgo, detectados cruzando asistencia y notas",
    //       },
    //     ],
    //   },
    // },
    // {
    //   slug: "campo-abierto",
    //   name: "Campo Abierto",
    //   lead: "Seguimiento de lotes, campañas y aplicaciones para un establecimiento agrícola.",
    //   cover: "/img/campo-abierto.webp",
    //   coverAlt: "Campo Abierto",
    //   demo: true,
    //   detail: {
    //     kicker: "AGRO",
    //     role: "Relevamiento, diseño y desarrollo",
    //     context: "Caso de demostración",
    //     problem: [
    //       "Un establecimiento de tres mil hectáreas toma decisiones sobre ochenta lotes que no se parecen entre sí, y el historial de cada uno vive en un cuaderno, en el celular del ingeniero y en la memoria del encargado. Qué se sembró hace tres campañas, con qué se aplicó y cuánto rindió es una pregunta que lleva media hora contestar y termina en una estimación.",
    //       "Sin ese historial no hay comparación posible: no se sabe qué lote conviene rotar, si el gasto en insumos se justificó o si el rinde bueno fue del manejo o de la lluvia. Lo que hacía falta era que cada labor quede registrada donde se hace, con su costo, y que el resultado se pueda mirar campaña contra campaña.",
    //     ],
    //     built: [
    //       {
    //         title: "Mapa de lotes",
    //         text: "Cada lote con su cultivo, su estado fenológico y su superficie, dibujado sobre el campo real.",
    //       },
    //       {
    //         title: "Registro de aplicaciones",
    //         text: "Producto, dosis, responsable y receta agronómica firmada, cargados desde el celular en el lote.",
    //       },
    //       {
    //         title: "Clima y agua útil",
    //         text: "Los milímetros de la estación propia se cargan solos al lote y alimentan el agua útil de cada suelo.",
    //       },
    //       {
    //         title: "Rinde por lote y por campaña",
    //         text: "Cuatro campañas comparables, con el margen bruto calculado sobre el costo real de cada labor.",
    //       },
    //       {
    //         title: "Trabajo sin señal",
    //         text: "La app guarda lo que se carga en el campo y lo sincroniza cuando vuelve a haber señal.",
    //       },
    //     ],
    //     links: [],
    //     photos: [
    //       {
    //         src: "/img/proyectos/campo-abierto/1.webp",
    //         alt: "Campo Abierto — mapa",
    //         caption: "El mapa de lotes, con el cultivo y el estado de cada uno",
    //       },
    //       {
    //         src: "/img/proyectos/campo-abierto/2.webp",
    //         alt: "Campo Abierto — aplicaciones",
    //         caption:
    //           "Las aplicaciones registradas, con producto, dosis y receta firmada",
    //       },
    //       {
    //         src: "/img/proyectos/campo-abierto/3.webp",
    //         alt: "Campo Abierto — clima",
    //         caption:
    //           "Clima y agua útil: los milímetros se cargan solos al lote",
    //       },
    //       {
    //         src: "/img/proyectos/campo-abierto/4.webp",
    //         alt: "Campo Abierto — rindes",
    //         caption: "El rinde por lote, comparable campaña contra campaña",
    //       },
    //     ],
    //   },
    // },
  ],

  footer: {
    legal: [
      {
        label: "Política de privacidad",
        href: "https://dutsiland.com/#contacto",
      },
      {
        label: "Términos y condiciones",
        href: "https://dutsiland.com/#contacto",
      },
    ],
  },

  cookies: {
    text: "Este sitio usa cookies para brindar la funcionalidad necesaria, mejorar tu experiencia y analizar nuestro tráfico. Al usarlo, aceptás nuestra",
    linkLabel: "Política de privacidad",
    accept: "Aceptar",
  },
};
