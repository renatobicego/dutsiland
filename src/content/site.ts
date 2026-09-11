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

export type ProjectCard = {
  src: string
  alt: string
  /** Se muestra sobre la tarjeta y como título del cursor */
  name: string
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
    cards: ProjectCard[]
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
    title: 'Tres frentes, un mismo equipo',
    intro:
      'No vendemos horas de diseño y horas de código por separado. Definimos cómo se usa el producto y lo construimos nosotros mismos.',
    groups: [
      {
        n: '01',
        title: 'SOFTWARE A MEDIDA',
        lead: 'El sistema que tu operación necesita, escrito desde cero.',
        items: [
          'Sistemas de gestión',
          'Aplicaciones web',
          'Integraciones y APIs',
          'Automatización de procesos',
          'Paneles y reportes',
        ],
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
    // Los seis proyectos publicados en dutsiland.com
    cards: [
      { src: '/img/mimpronta.jpg', alt: 'Mimpronta', name: 'Mimpronta' },
      { src: '/img/wonder.jpg', alt: 'Wonder Ventures', name: 'Wonder Ventures' },
      { src: '/img/mahatu.jpg', alt: 'Mahatu Consultorios', name: 'Mahatu Consultorios' },
      { src: '/img/ama.jpg', alt: 'Asociación Mendocina de Atletismo', name: 'Asociación Mendocina de Atletismo' },
      { src: '/img/medialuna.jpg', alt: 'Medialuna Medias', name: 'Medialuna Medias' },
      { src: '/img/cucha.jpg', alt: 'Cucha Repuestos', name: 'Cucha Repuestos' },
    ],
  },

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
