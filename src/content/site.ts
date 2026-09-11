// Contenido de la landing de Dutsiland.
// Estructura y piezas visuales según el storyboard v2.pdf.
// Proyectos y servicios tomados del sitio actual (https://dutsiland.com).
// Todo el texto visible vive acá para poder ajustarlo sin tocar componentes.

export type Link = {
  label: string
  href: string
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
  /** Qué hicimos nosotros */
  role: string
  /** En qué estado está el producto */
  context: string
  /** La problemática que resolvemos, en dos o tres párrafos */
  problem: string[]
  built: BuiltItem[]
  stack: string[]
  links: Link[]
  photos: ProjectPhoto[]
}

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
  history: {
    kicker: string
    year: string
    title: string
    text: string[]
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
    cta: Link
    /** Lo que dice la tarjeta cuando el proyecto sí tiene ficha */
    caseLabel: string
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
    stackTitle: string
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

  menu: [
    { label: 'Nuestra historia', href: '#historia' },
    { label: 'Qué hacemos', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' },
  ],

  hero: {
    headline: ['DESARROLLO', 'DE SOFTWARE', 'A MEDIDA'],
  },

  claim: {
    text: 'Tu idea merece algo mejor que una plantilla. Nosotros la construimos de cero',
    cta: { label: 'Conocé qué hacemos', href: '#servicios' },
  },

  // ---------- Nuestra historia ----------
  history: {
    kicker: 'NUESTRA HISTORIA',
    // TODO(Dutsiland): confirmar el año exacto de arranque del estudio.
    year: '2023',
    title: 'Empezamos resolviendo un problema concreto, y no paramos.',
    text: [
      'Dutsiland arrancó como un equipo chico de desarrolladores al que le pedían siempre lo mismo: un sistema que las herramientas de siempre no podían dar. En vez de forzar una plantilla, escribimos el software desde cero.',
      // TODO(Dutsiland): sumar la ciudad de origen y algún hito concreto (primer cliente, primer sistema propio).
      'Ese primer sistema se convirtió en la forma de trabajar del estudio. Hoy somos una software factory: diseñamos y desarrollamos productos digitales completos, desde el relevamiento hasta el mantenimiento, para empresas que necesitan que el software se adapte a su operación y no al revés.',
    ],
  },

  // ---------- Qué hacemos (tres frentes diferenciados) ----------
  services: {
    kicker: 'QUÉ HACEMOS',
    title: 'Cuatro frentes, un mismo equipo',
    intro:
      'No vendemos horas de diseño y horas de código por separado. Definimos cómo se usa el producto y lo construimos nosotros mismos.',
    groups: [
      {
        n: '01',
        title: 'SOFTWARE A MEDIDA',
        lead: 'El sistema que tu operación necesita, escrito desde cero.',
        items: ['Sistemas de gestión', 'Aplicaciones web', 'Integraciones y APIs', 'Paneles y reportes'],
      },
      {
        n: '02',
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
        n: '03',
        title: 'WEB Y ECOMMERCE',
        lead: 'Tu presencia online, rápida y hecha a medida.',
        items: ['Diseño y desarrollo web', 'Landing pages', 'Tiendas online', 'Web interactiva 3D · WebGL'],
      },
      {
        n: '04',
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
    ],
    cta: { label: 'Hablá con nosotros', href: '#contacto' },
  },

  // ---------- Cómo trabajamos ----------
  process: {
    kicker: 'CÓMO TRABAJAMOS',
    title: 'Ves el producto antes de invertir en él',
    steps: [
      { n: '01', title: 'Nos reunimos', text: 'Nos sentamos con vos a escuchar el problema, sin fórmulas armadas de antes.' },
      { n: '02', title: 'Entendemos la necesidad', text: 'Analizamos cómo funciona tu operación hoy y dónde el software puede sacarte trabajo.' },
      { n: '03', title: 'Definimos requerimientos', text: 'Documentamos juntos el alcance: qué entra, qué queda para después y con qué prioridad.' },
      { n: '04', title: 'Construimos una demo', text: 'Armamos una versión navegable para que veas y uses el producto antes de decidir.' },
      { n: '05', title: 'Presupuestamos', text: 'Con el alcance validado, pasamos precio y plazos claros. Sin sorpresas a mitad de camino.' },
      { n: '06', title: 'Desarrollamos', text: 'Construimos, entregamos por etapas y acompañamos el sistema una vez en producción.' },
    ],
    cta: { label: 'Empecemos tu proyecto', href: '#contacto' },
  },

  portfolio: {
    titleLines: ['PROYECTOS', 'DESTACADOS'],
    subtitle: 'Una selección de nuestros trabajos más apasionantes',
    cta: { label: 'Conocé nuestro portfolio', href: 'https://dutsiland.com/#trabajos' },
    caseLabel: 'Ver el caso',
  },

  projectView: {
    back: 'Volver a proyectos',
    problemKicker: 'EL PROBLEMA',
    problemTitle: 'Qué había que resolver',
    builtKicker: 'QUÉ CONSTRUIMOS',
    builtTitle: 'Lo que hicimos',
    photosKicker: 'EL PRODUCTO',
    photosTitle: 'Así se ve',
    stackTitle: 'Con qué lo construimos',
    nextKicker: 'SIGUIENTE PROYECTO',
    cta: { label: 'Queremos hacer el tuyo', href: '/#contacto' },
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
        role: 'Backend y arquitectura',
        context: 'Proyecto colaborativo, en producción',
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
            text: 'Un servicio de sockets aparte avisa sin recargar la página, más sorteos para la comunidad.',
          },
          {
            title: 'Un backend que aguanta el crecimiento',
            text: 'Nest.js sobre arquitectura hexagonal, MongoDB para el almacenamiento y Clerk para la autenticación, con tests de integración.',
          },
        ],
        stack: [
          'Nest.js',
          'GraphQL',
          'MongoDB',
          'Next.js',
          'OpenAI Agents SDK',
          'Clerk Auth',
          'Mercado Pago',
          'Firebase',
          'Google Cloud',
          'Jest',
          'SuperTest',
        ],
        links: [
          { label: 'Ver demo', href: 'https://soonpublicite.vercel.app/' },
          { label: 'Ver código', href: 'https://github.com/renatobicego/publicite' },
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
      lead: 'Sistema de gestión de turnos online para una clínica odontológica.',
      cover: '/img/mahatu.jpg',
      coverAlt: 'Mahatu Consultorios',
      detail: {
        kicker: 'SALUD',
        role: 'Backend y arquitectura',
        context: 'En producción para la clínica',
        // TODO(Dutsiland): confirmar con Mahatu cómo era la operación antes del sistema.
        problem: [
          'La clínica coordinaba los turnos por teléfono y a mano. Cada cambio de agenda había que avisarlo, el historial de cada paciente estaba en papel y los ingresos se seguían aparte, así que nadie tenía el panorama completo en un solo lugar.',
          'Lo que hacía falta no era una agenda digital más, sino que el paciente pudiera reservar solo, sobre la disponibilidad real del profesional, y que la clínica viera en el mismo sistema la atención y la facturación.',
        ],
        built: [
          {
            title: 'Turnos online',
            text: 'El paciente reserva según la disponibilidad real del profesional, y el profesional también puede asignar turnos él mismo.',
          },
          {
            title: 'Agenda del profesional',
            text: 'Asignar, reprogramar o eliminar turnos desde un calendario.',
          },
          {
            title: 'Fichas de pacientes',
            text: 'Historial clínico detallado, con la información de cada paciente en un solo lugar.',
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
        stack: ['Node.js', 'MongoDB'],
        links: [{ label: 'Ver demo', href: 'https://mahatu.vercel.app/' }],
        photos: [
          { src: '/img/proyectos/mahatu/mahatu-3.webp', alt: 'Mahatu — turnos', caption: 'La reserva de turnos del paciente' },
          { src: '/img/proyectos/mahatu/mahatu-4.webp', alt: 'Mahatu — calendario', caption: 'El calendario del profesional' },
          { src: '/img/proyectos/mahatu/mahatu-1.webp', alt: 'Mahatu — pacientes', caption: 'La ficha del paciente y su historial' },
          { src: '/img/proyectos/mahatu/mahatu-2.webp', alt: 'Mahatu — facturación', caption: 'El control de pagos e ingresos' },
        ],
      },
    },
    // Estos cinco salen de las fichas del sitio actual (dutsiland.com/#trabajos).
    // TODO(Dutsiland): falta el stack de cada uno; el sitio viejo solo listaba servicios.
    {
      slug: 'ama',
      name: 'Asociación Mendocina de Atletismo',
      lead: 'Noticias, inscripciones y federaciones para la asociación.',
      cover: '/img/ama.jpg',
      coverAlt: 'Asociación Mendocina de Atletismo',
      detail: {
        kicker: 'DEPORTE',
        role: 'Investigación, diseño de interfaz y desarrollo',
        context: 'En producción para la asociación',
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
        stack: [],
        links: [{ label: 'Ver sitio', href: 'https://amamendoza.vercel.app/' }],
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
        role: 'Diseño de interfaz y desarrollo',
        context: 'En producción',
        problem: [
          'Cucha Repuestos vende repuestos importados para camiones Iveco y es referente en la Patagonia, pero toda su operación vivía fuera de línea: para saber si había una pieza, o con qué marcas trabajaban, había que llamar o pasar por el local.',
          'El sitio tenía que hacer dos cosas a la vez: mostrar la línea completa de productos a alguien que no está en Comodoro, y dejar claro por qué comprarles a ellos —envíos a todo el país, garantía, repuestos originales y alternativos—.',
        ],
        built: [
          { title: 'La línea completa de repuestos', text: 'El catálogo de productos Iveco, navegable por categoría.' },
          { title: 'Las tres promesas, arriba de todo', text: 'Comodidad y seguridad, envíos a todo el país, garantía y calidad: lo primero que ve quien entra.' },
          { title: 'La sucursal en el mapa', text: 'Dirección, horarios y contacto directo por WhatsApp desde cualquier pantalla.' },
          { title: 'Las marcas con las que trabajan', text: 'El respaldo de los proveedores, visible para quien no los conoce.' },
        ],
        stack: [],
        links: [{ label: 'Ver sitio', href: 'https://cucharepuestos.com/' }],
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
        role: 'Diseño de interfaz y desarrollo',
        context: 'En producción',
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
        stack: [],
        links: [{ label: 'Ver catálogo', href: 'https://medialunamedias.vercel.app/' }],
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
        role: 'Diseño de interfaz y desarrollo',
        context: 'En producción',
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
        stack: [],
        links: [{ label: 'Ver sitio', href: 'https://mimpronta.com/' }],
        photos: [
          { src: '/img/proyectos/mimpronta/1.webp', alt: 'Mimpronta — el blog', caption: 'El blog, en la maqueta de diseño' },
          { src: '/img/proyectos/mimpronta/2.webp', alt: 'Mimpronta — portada', caption: 'La portada, con el mensaje de la agencia' },
          { src: '/img/proyectos/mimpronta/3.webp', alt: 'Mimpronta — notas', caption: 'El blog, con el último post destacado' },
          { src: '/img/proyectos/mimpronta/4.webp', alt: 'Mimpronta — pantallas', caption: 'El mapa de pantallas del proyecto' },
        ],
      },
    },
    {
      slug: 'wonder-ventures',
      name: 'Wonder Ventures',
      lead: 'Plataforma de reservas de experiencias turísticas.',
      cover: '/img/wonder.jpg',
      coverAlt: 'Wonder Ventures',
      detail: {
        kicker: 'TURISMO',
        role: 'Diseño de interfaz y desarrollo',
        context: 'Proyecto integrador de la carrera Certified Tech Developer (Digital House)',
        problem: [
          'Reservar una experiencia turística obliga a cruzar tres cosas a la vez: dónde, cuándo y con cuántas personas. Cuando eso no está resuelto en la interfaz, el que busca abandona antes de llegar a la reserva.',
          'Del otro lado está el problema menos visible: destinos, actividades y disponibilidad cambian todo el tiempo. Sin una forma cómoda de actualizarlos, el catálogo envejece en semanas y deja de ser confiable.',
        ],
        built: [
          { title: 'Búsqueda por destino y fecha', text: 'El punto de entrada resuelve de una: a dónde vas y cuándo.' },
          { title: 'El detalle de cada experiencia', text: 'Fotos, precio por persona, quién la ofrece y la reserva, en la misma pantalla.' },
          { title: 'Listado con filtros', text: 'Las experiencias por categoría y orden, para recorrer la oferta.' },
          { title: 'Cuentas de usuario', text: 'Registro e inicio de sesión para seguir las reservas.' },
          { title: 'Gestión de contenido', text: 'Un sistema para actualizar destinos, actividades y disponibilidad sin tocar código.' },
        ],
        stack: [],
        links: [{ label: 'Ver demo', href: 'http://wonderventures3.s3-website-us-east-1.amazonaws.com/' }],
        photos: [
          { src: '/img/proyectos/wonder/1.webp', alt: 'Wonder — búsqueda', caption: 'La búsqueda de experiencias por destino y fecha' },
          { src: '/img/proyectos/wonder/2.webp', alt: 'Wonder — detalle', caption: 'El detalle de una experiencia, con su reserva' },
          { src: '/img/proyectos/wonder/3.webp', alt: 'Wonder — registro', caption: 'El registro de usuarios' },
          { src: '/img/proyectos/wonder/4.webp', alt: 'Wonder — listado', caption: 'El listado de experiencias, con filtros' },
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
