// Textos de la interfaz en los dos idiomas.
// Los textos de los proyectos están en src/data/projects.ts.

export type Lang = 'es' | 'en';
export const langs: Lang[] = ['es', 'en'];

/** Texto bilingüe. */
export type L = { es: string; en: string };

export const ui = {
  es: {
    subtitle: 'Diseñadora de producto · UX/UI & Industrial Design',
    description:
      'Portfolio de Clara Fernández de Araoz Serra, diseñadora de producto especializada en diseño industrial y UX/UI.',
    nav: { work: 'Trabajo', about: 'Sobre mí', contact: 'Contacto' },
    navLabel: 'Navegación principal',
    langLabel: 'Cambiar idioma',
    skip: 'Saltar al contenido',
    index: 'Índice',
    filters: { all: 'Todo', industrial: 'Industrial', 'ux-ui': 'UX-UI' },
    filterLabel: 'Filtrar proyectos',
    comingSoon: 'Próximamente',
    prev: 'Anterior',
    next: 'Siguiente',
    projectNav: 'Otros proyectos',
    about: 'Presentación',
    education: 'Formación',
    educationText: 'Graduada en Diseño de Producto. UDIT, Madrid.',
    focus: 'Enfoque',
    focusText: 'Diseño industrial · UX/UI',
    contact: 'Contacto',
    contactIntro: 'Escríbeme para colaboraciones, prácticas o cualquier consulta.',
    form: {
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      note: 'Al enviar se abrirá tu aplicación de correo.',
      subject: 'Contacto desde el portfolio',
    },
    mail: 'Mail',
    tel: 'Tel',
    thanks: 'Gracias por visitar mi portfolio',
    placeholder: 'Imagen pendiente',
    figmaPending: 'Prototipo de Figma pendiente',
    seeProject: 'Ver proyecto',
    facts: { role: 'Rol', duration: 'Duración', team: 'Equipo', tools: 'Herramientas' },
    steps: {
      reto: 'Reto',
      investigacion: 'Investigación',
      usuario: 'Usuario',
      definicion: 'Definición',
      ideacion: 'Ideación',
      diseno: 'Diseño',
      testing: 'Testing',
      resultado: 'Resultado',
    },
    viewPrototype: 'Ver prototipo',
    newTab: '(se abre en una pestaña nueva)',
    readMedium: 'Leer el case study completo en Medium',
    notFound: 'Página no encontrada',
    backHome: 'Volver a la portada',
  },
  en: {
    subtitle: 'Product Designer · UX/UI & Industrial Design',
    description:
      'Portfolio of Clara Fernández de Araoz Serra, a product designer focused on industrial design and UX/UI.',
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    navLabel: 'Main navigation',
    langLabel: 'Change language',
    skip: 'Skip to content',
    index: 'Index',
    filters: { all: 'All', industrial: 'Industrial', 'ux-ui': 'UX-UI' },
    filterLabel: 'Filter projects',
    comingSoon: 'Coming soon',
    prev: 'Previous',
    next: 'Next',
    projectNav: 'More projects',
    about: 'About me',
    education: 'Education',
    educationText: 'BA in Product Design (graduate). UDIT, Madrid.',
    focus: 'Focus',
    focusText: 'Industrial design · UX/UI',
    contact: 'Contact',
    contactIntro: 'Get in touch for collaborations, internships or any question.',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      note: 'Sending will open your email app.',
      subject: 'Contact from portfolio',
    },
    mail: 'Mail',
    tel: 'Tel',
    thanks: 'Thank you for visiting my portfolio',
    placeholder: 'Image pending',
    figmaPending: 'Figma prototype pending',
    seeProject: 'View project',
    facts: { role: 'Role', duration: 'Duration', team: 'Team', tools: 'Tools' },
    steps: {
      reto: 'Challenge',
      investigacion: 'Research',
      usuario: 'User',
      definicion: 'Definition',
      ideacion: 'Ideation',
      diseno: 'Design',
      testing: 'Testing',
      resultado: 'Outcome',
    },
    viewPrototype: 'View prototype',
    newTab: '(opens in a new tab)',
    readMedium: 'Read the full case study on Medium',
    notFound: 'Page not found',
    backHome: 'Back to the cover',
  },
} as const;

export const about: L = {
  es: '¡Hola! Soy Clara, diseñadora de producto graduada en UDIT. Me apasiona explorar soluciones creativas que fusionen funcionalidad y estilo, con un interés especial en proyectos que desafían y estimulan mi creatividad, tanto en diseño industrial como en UX/UI. Me entusiasma seguir creciendo y contribuir al mundo del diseño. ¡Gracias por visitar mi portfolio!',
  en: "Hi! I'm Clara, a product designer who graduated from UDIT. I love exploring creative solutions that bring function and style together, with a particular interest in projects that challenge and stimulate my creativity, in both industrial design and UX/UI. I'm excited to keep growing and to contribute to the world of design. Thank you for visiting my portfolio!",
};

export const t = (lang: Lang) => ui[lang];

/** Rutas de cada página en cada idioma. */
export const routes = {
  home: { es: '/', en: '/en/' },
  work: { es: '/trabajo/', en: '/en/work/' },
  about: { es: '/sobre-mi/', en: '/en/about/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
} as const;

export type RouteKey = keyof typeof routes;

export const projectUrl = (slug: string, lang: Lang) =>
  lang === 'es' ? `/proyectos/${slug}/` : `/en/projects/${slug}/`;
