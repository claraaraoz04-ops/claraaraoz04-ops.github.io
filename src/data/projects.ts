// ─────────────────────────────────────────────────────────────────────────────
//  TODOS LOS PROYECTOS VIVEN AQUÍ.
//  Para añadir uno nuevo, copia un bloque { ... } del array `projects`,
//  cambia el slug y los textos, y pon sus imágenes en
//  src/assets/images/<slug>/. El orden del array es el orden del índice.
//  Si una imagen no existe, la web muestra un recuadro con su nombre.
// ─────────────────────────────────────────────────────────────────────────────
import type { L } from '../i18n/ui';

export type Category = 'industrial' | 'ux-ui';

export interface Img {
  /** Ruta dentro de src/assets/images/, p. ej. 'ice-gin/boceto-01.jpg' */
  src: string;
  alt: L;
  /** 'sketch' = dibujo sobre papel blanco: se funde con el fondo crema y no se recorta. */
  kind?: 'photo' | 'sketch';
  /** Punto de encuadre cuando la foto se recorta (CSS object-position). */
  position?: string;
  /** 'contain' = se muestra entera, sin recortar (capturas, diagramas). */
  fit?: 'cover' | 'contain';
  /** Pie de imagen opcional (se usa en las galerías). */
  caption?: L;
}

/** Fases del proceso de un case study de UX/UI. */
export type Step = 'reto' | 'investigacion' | 'usuario' | 'definicion' | 'ideacion' | 'diseno' | 'testing' | 'resultado';

/** Bloques de contenido ("spreads") que componen la página de un proyecto. */
export type Spread =
  /** Fase del proceso (UX/UI): título, texto, lista, cita y 1–2 imágenes debajo. */
  | { layout: 'step'; step: Step; title: L; text?: L[]; bullets?: L[]; quote?: L; images?: Img[] }
  /** Galería de pantallas con pie de foto (2–3 columnas). */
  | { layout: 'gallery'; images: Img[]; title?: L }
  /** Vídeo de YouTube incrustado (pon solo el id: youtube.com/watch?v=ESTE_ID). */
  | { layout: 'video'; youtube: string; title: L }
  /** Texto + imagen grande, ~50/50. `reverse` pone la imagen a la izquierda. */
  | { layout: 'text-hero'; text: L[]; image: Img; reverse?: boolean }
  /** Dos imágenes una junto a otra. */
  | { layout: 'two-images'; images: [Img, Img] }
  /** Una imagen a todo el ancho de la pantalla. */
  | { layout: 'full-bleed'; image: Img }
  /** Texto + imagen de referencia + imagen secundaria con pie (3 celdas). */
  | { layout: 'text-ref-secondary'; text: L[]; reference: Img; caption: L[]; secondary: Img; body?: L[] }
  /**
   * Figma incrustado. `url`: enlace del archivo o del prototipo (Share → Copy link).
   * `protoUrl` (opcional): enlace de "Share prototype" para el botón "Ver prototipo";
   * si no hay, el botón abre `url`. El archivo debe estar compartido como "Anyone with the link".
   */
  | { layout: 'figma'; url: string; protoUrl?: string; title: L; text?: L[] }
  /** Secuencia de capturas de pantalla de móvil o escritorio. */
  | { layout: 'screens'; device: 'phone' | 'desktop'; images: Img[]; text?: L[] };

export interface Project {
  slug: string;
  category: Category;
  title: L;
  subtitle?: L;
  /** Las tres palabras de la cascada. */
  keywords: [L, L, L];
  /** Párrafos de la descripción. */
  description: L[];
  /** Imagen grande junto al título. También se usa en el índice y para compartir. */
  hero: Img;
  /** Lado de la imagen principal en la cabecera del proyecto. */
  heroSide?: 'left' | 'right';
  /** Bocetos pequeños opcionales bajo la cascada (máx. 2). */
  introImages?: Img[];
  /** Ficha del proyecto (UX/UI): se muestra bajo la cabecera. */
  facts?: { role: L; duration: L; team: L; tools: L };
  spreads: Spread[];
  /** Enlace al case study completo (Medium); se muestra al final. */
  mediumUrl?: string;
  /** Marca el proyecto como "Próximamente". */
  comingSoon?: boolean;
}

const sketch = (src: string, es: string, en: string): Img => ({ src, kind: 'sketch', alt: { es, en } });
const photo = (src: string, es: string, en: string, position?: string): Img => ({
  src,
  kind: 'photo',
  alt: { es, en },
  position,
});
/** Captura, diagrama o lámina: se muestra entera, sin recortar. */
const screen = (src: string, es: string, en: string, caption?: L): Img => ({
  src,
  kind: 'photo',
  fit: 'contain',
  alt: { es, en },
  caption,
});

// ── Diseño industrial ──────────────────────────────────────────────────────
const industrial: Project[] = [
  {
    slug: 'ice-gin',
    category: 'industrial',
    title: { es: 'Ice Gin', en: 'Ice Gin' },
    keywords: [
      { es: 'Elegancia', en: 'Elegance' },
      { es: 'Innovación', en: 'Innovation' },
      { es: 'Experiencia', en: 'Experience' },
    ],
    description: [
      {
        es: 'Diseño de botella de ginebra con un relieve de fragmentos de hielo en la base. Una colección en varios colores bajo el lema de su etiqueta: «Taste the freshness».',
        en: 'A gin bottle design with a relief of ice shards around its base. A collection in several colours, carrying the line on its label: “Taste the freshness”.',
      },
    ],
    hero: photo(
      'ice-gin/render-botella-azul.jpg',
      'Render de la botella Ice Gin azul sobre una mesa oscura junto a un cóctel',
      'Render of the blue Ice Gin bottle on a dark table next to a cocktail',
    ),
    heroSide: 'right',
    introImages: [
      sketch('ice-gin/boceto-01.jpg', 'Boceto en perspectiva de la botella con los fragmentos de hielo sombreados en azul', 'Perspective sketch of the bottle with the ice shards shaded in blue'),
      sketch('ice-gin/boceto-02.jpg', 'Bocetos frontales de dos variantes de la botella Ice Gin', 'Front sketches of two variants of the Ice Gin bottle'),
    ],
    spreads: [
      {
        layout: 'full-bleed',
        image: photo(
          'ice-gin/render-colores.webp',
          'Tres botellas Ice Gin en verde, lila y rojo sobre fondo lavanda',
          'Three Ice Gin bottles in green, lilac and red on a lavender background',
        ),
      },
    ],
  },
  {
    slug: 'lamparas-slean',
    category: 'industrial',
    title: { es: 'Lámparas Slean', en: 'Slean Lamps' },
    subtitle: { es: 'Upcycling, de mesa a luminarias', en: 'Upcycling, from table to lights' },
    keywords: [
      { es: 'Materialidad', en: 'Materiality' },
      { es: 'Modularidad', en: 'Modularity' },
      { es: 'Segunda oportunidad', en: 'Second chance' },
    ],
    description: [
      {
        es: 'Colección de lámparas creadas a partir de una mesa reutilizada, con un sistema modular de piezas, pantallas y bases intercambiables.',
        en: 'A collection of lamps made from a repurposed table, built on a modular system of interchangeable parts, shades and bases.',
      },
    ],
    hero: sketch(
      'lamparas-slean/bocetos-ideacion.jpg',
      'Hoja de ideación con decenas de pequeños bocetos de lámparas',
      'Ideation sheet with dozens of small lamp sketches',
    ),
    heroSide: 'right',
    spreads: [
      {
        layout: 'text-hero',
        reverse: true,
        text: [
          {
            es: 'Las piezas de la mesa se convierten en brazos, pies y pantallas. Un sistema de uniones sencillo permite montar, desmontar e intercambiar cada parte.',
            en: 'The pieces of the table become arms, feet and shades. A simple joining system lets each part be assembled, taken apart and swapped.',
          },
        ],
        image: sketch(
          'lamparas-slean/boceto-despiece.jpg',
          'Boceto de despiece que muestra el montaje modular de una lámpara',
          'Exploded sketch showing the modular assembly of a lamp',
        ),
      },
      {
        layout: 'two-images',
        images: [
          photo('lamparas-slean/exposicion-01.jpg', 'Lámparas Slean expuestas en la muestra de la escuela', 'Slean lamps on display at the school exhibition'),
          photo('lamparas-slean/exposicion-02.jpg', 'Detalle de las lámparas Slean encendidas en la exposición', 'Detail of the Slean lamps switched on at the exhibition'),
        ],
      },
    ],
  },
  {
    slug: 'tabu-by-dana',
    category: 'industrial',
    title: { es: 'Tabu by Dana', en: 'Tabu by Dana' },
    subtitle: {
      es: 'Rediseño de perfume. Una reinterpretación contemporánea de un legado familiar.',
      en: 'Perfume redesign. A contemporary reinterpretation of a family legacy.',
    },
    keywords: [
      { es: 'Forma', en: 'Form' },
      { es: 'Reflexión', en: 'Reflection' },
      { es: 'Memoria', en: 'Memory' },
    ],
    description: [
      {
        es: 'Tabu by Dana fue una de las fragancias más icónicas de su época. Como legado familiar, decidí reinterpretar el frasco desde una perspectiva contemporánea. La nueva forma traduce la tradición en una presencia atemporal y escultural.',
        en: 'Tabu by Dana was one of the most iconic fragrances of its time. As a family legacy, I chose to reinterpret the bottle from a contemporary perspective. The new form translates tradition into a timeless, sculptural presence.',
      },
    ],
    hero: photo(
      'tabu-by-dana/render-principal.jpg',
      'Render del nuevo frasco Tabu en cobre cepillado con perfume ámbar',
      'Render of the new Tabu bottle in brushed copper with amber perfume',
    ),
    heroSide: 'left',
    introImages: [
      sketch('tabu-by-dana/bocetos.jpg', 'Dos bocetos a lápiz del frasco de perfume', 'Two pencil sketches of the perfume bottle'),
    ],
    spreads: [
      {
        layout: 'text-ref-secondary',
        text: [
          {
            es: 'El punto de partida: el frasco original y su imaginario publicitario de los años cincuenta.',
            en: 'The starting point: the original bottle and its 1950s advertising imagery.',
          },
        ],
        reference: photo(
          'tabu-by-dana/referencia-anuncio-vintage.jpg',
          'Anuncio vintage en blanco y negro del perfume Tabu by Dana',
          'Black-and-white vintage advert for Tabu by Dana perfume',
        ),
        caption: [
          {
            es: 'La forma del frasco está inspirada en una obra de Anish Kapoor, uno de los artistas contemporáneos más reconocidos del momento.',
            en: 'The shape of the bottle is inspired by a work by Anish Kapoor, one of the most renowned contemporary artists of our time.',
          },
          { es: 'Anish Kapoor, «Turning the World Upside Down».', en: 'Anish Kapoor, “Turning the World Upside Down”.' },
        ],
        secondary: photo(
          'tabu-by-dana/referencia-kapoor.jpg',
          'Escultura de acero pulido de Anish Kapoor con forma de reloj de arena',
          'Polished steel hourglass-shaped sculpture by Anish Kapoor',
        ),
        body: [
          {
            es: 'El frasco ha sido concebido para preservar y realzar el tono ámbar del perfume incluso una vez vacío, dialogando con la luz como parte esencial del diseño. Un objeto pensado tanto desde su exterior como desde su interior.',
            en: 'The bottle is designed to preserve and enhance the amber tone of the perfume even once empty, playing with light as an essential part of the design. An object conceived as much from the inside as from the outside.',
          },
        ],
      },
      {
        layout: 'full-bleed',
        image: photo(
          'tabu-by-dana/render-detalle.jpg',
          'Primer plano del frasco Tabu reflejando la luz sobre una superficie metálica',
          'Close-up of the Tabu bottle catching the light on a metallic surface',
        ),
      },
    ],
  },
  {
    slug: 'alukia',
    category: 'industrial',
    title: { es: 'Alukia', en: 'Alukia' },
    keywords: [
      { es: 'Abstracción', en: 'Abstraction' },
      { es: 'Prototipado', en: 'Prototyping' },
      { es: 'Ergonomía', en: 'Ergonomics' },
    ],
    description: [
      {
        es: 'Silla inspirada en las formas geométricas de Chillida. Su forma asimétrica obliga al usuario a sentarse en un ángulo que invita a la conversación, convirtiéndose así en una silla narcisista.',
        en: 'A chair inspired by the geometric forms of Chillida. Its asymmetric shape makes the user sit at an angle that invites conversation, turning it into a narcissistic chair.',
      },
    ],
    hero: photo('alukia/silla-en-uso.jpg', 'Persona sentada de lado en la silla Alukia de DM', 'A person sitting sideways on the MDF Alukia chair', 'center 60%'),
    heroSide: 'right',
    spreads: [
      {
        layout: 'two-images',
        images: [
          photo('alukia/prototipo-01.jpg', 'Prototipo de la silla Alukia en DM, vista frontal con el arco', 'MDF prototype of the Alukia chair, front view showing the arch'),
          photo('alukia/prototipo-02.jpg', 'Prototipo de la silla Alukia en DM, vista posterior', 'MDF prototype of the Alukia chair, rear view'),
        ],
      },
    ],
  },
  {
    slug: 'bird',
    category: 'industrial',
    title: { es: 'Bird', en: 'Bird' },
    keywords: [
      { es: 'Poético', en: 'Poetic' },
      { es: 'Orgánico', en: 'Organic' },
      { es: 'Escultórico', en: 'Sculptural' },
    ],
    description: [
      {
        es: 'Casa para pájaros inspirada en curvas fluidas y formas orgánicas. Un refugio funcional con una estética ligera que armoniza con el entorno natural y representa la forma abstracta de un pájaro.',
        en: 'A birdhouse inspired by flowing curves and organic forms. A functional shelter with a light aesthetic that blends into its natural surroundings and represents the abstract shape of a bird.',
      },
    ],
    hero: photo('bird/render-casas.jpg', 'Render de dos casas para pájaros de madera curvada', 'Render of two curved wooden birdhouses'),
    heroSide: 'right',
    spreads: [
      {
        layout: 'full-bleed',
        image: sketch('bird/bocetos.jpg', 'Hoja de bocetos con las curvas y el despiece de la casa para pájaros', 'Sketch sheet with the curves and parts of the birdhouse'),
      },
    ],
  },
  {
    slug: 'orbit',
    category: 'industrial',
    title: { es: 'Orbit', en: 'Orbit' },
    keywords: [
      { es: 'Innovación', en: 'Innovation' },
      { es: 'Accesibilidad', en: 'Accessibility' },
      { es: 'Evolución', en: 'Evolution' },
    ],
    description: [
      {
        es: 'Orbit es un nuevo concepto de transporte de palos de golf: un tambor giratorio con ranuras de enganche para colocar los palos. Reduce el tamaño de la bolsa y mantiene los palos ordenados y estáticos en todo momento, mejorando la experiencia del usuario.',
        en: 'Orbit is a new way to carry golf clubs: a rotating drum with clip-in slots that hold each club. It shrinks the size of the bag and keeps the clubs tidy and still at all times, improving the experience for the player.',
      },
    ],
    hero: photo('orbit/render-campo-golf.jpg', 'Render del carro Orbit verde con palos de golf sobre el césped', 'Render of the green Orbit trolley holding golf clubs on the grass'),
    heroSide: 'right',
    spreads: [
      {
        layout: 'two-images',
        images: [
          photo('orbit/render-tambor.jpg', 'Detalle del tambor giratorio de Orbit con las ranuras de enganche', 'Close-up of the Orbit rotating drum and its clip-in slots'),
          photo('orbit/render-producto.jpg', 'Render completo de Orbit sobre fondo oscuro', 'Full render of Orbit on a dark background'),
        ],
      },
    ],
  },
];

// ── UX/UI ──────────────────────────────────────────────────────────────────
// Case studies del bootcamp de Ironhack. Textos adaptados de los artículos de Medium.
const uxui: Project[] = [
  {
    slug: 'valvinia',
    category: 'ux-ui',
    title: { es: 'Valvinia', en: 'Valvinia' },
    subtitle: {
      es: 'E-commerce responsive para una marca independiente de joyería. Proyecto final de Ironhack.',
      en: 'A responsive e-commerce site for an independent jewellery brand. Ironhack final project.',
    },
    keywords: [
      { es: 'Confianza', en: 'Trust' },
      { es: 'Personalización', en: 'Personalisation' },
      { es: 'Iteración', en: 'Iteration' },
    ],
    description: [
      {
        es: '¿Puedes confiar en una joya que nunca has tocado? Diseñé la web de Valvinia, una marca independiente de collares personalizados, para que comprar online no se sienta como un riesgo.',
        en: 'Can you really trust a piece of jewellery you’ve never touched? I designed the website for Valvinia, an independent brand of personalised necklaces, so that buying online doesn’t feel like a risk.',
      },
    ],
    hero: screen(
      'valvinia/portada.png',
      'La web de Valvinia en portátil y móvil: la Home con el titular «Tu collar, a tu manera» y dos charms',
      'The Valvinia website on laptop and phone: the Home page headed “Your necklace, your way” with two charms',
    ),
    heroSide: 'right',
    facts: {
      role: { es: 'Diseñadora UX/UI · Investigación · Diseño UI · Prototipado', en: 'UX/UI Designer · User Research · UI Design · Prototyping' },
      duration: { es: '2 semanas (noviembre 2026)', en: '2 weeks (November 2026)' },
      team: { es: 'Proyecto individual · Cliente: Valvanuz, fundadora de Valvinia', en: 'Individual project · Client: Valvanuz, founder of Valvinia' },
      tools: { es: 'Figma · FigJam · Google Forms · Claude Code', en: 'Figma · FigJam · Google Forms · Claude Code' },
    },
    spreads: [
      {
        layout: 'step',
        step: 'reto',
        title: { es: 'Una tienda propia para una marca independiente', en: 'A shop of its own for an independent brand' },
        text: [
          {
            es: 'Valvinia, la marca de Valvanuz, crea collares personalizados bajo pedido. El reto era diseñar una web responsive donde descubrir y comprar sus joyas, y sentirse seguro durante toda la compra.',
            en: 'Valvinia, Valvanuz’s brand, creates personalised necklaces on demand. The challenge was to design a responsive website where customers could discover and buy her jewellery, and feel confident throughout the purchase.',
          },
          {
            es: 'En la entrevista con Valvanuz descubrí que Valvinia no vendía por Vinted: lo usaba solo para los envíos, y las ventas se hacían por redes sociales. La marca necesitaba una web propia. Sus requisitos:',
            en: 'In my interview with Valvanuz I discovered that Valvinia didn’t sell through Vinted: it was only used for shipping, while sales happened through social media. The brand needed a website of its own. Her requirements:',
          },
        ],
        bullets: [
          { es: 'Una Home que presente la marca.', en: 'A Home page that introduces the brand.' },
          { es: 'Una sección Sobre nosotras que cuente su identidad.', en: 'An About Us section that communicates its identity.' },
          { es: 'Un personalizador para crear tu collar y ver el resultado final.', en: 'A customiser to create your own necklace and see the final result.' },
          { es: 'Una sección de Inspiración con ideas y posibilidades.', en: 'An Inspiration section with ideas and possibilities.' },
          { es: 'Información clara sobre los envíos.', en: 'Clear information about shipping.' },
        ],
        images: [
          screen('valvinia/entrevista-stakeholder.png', 'Lámina con los cinco requisitos de Valvanuz para su web: Home, Sobre nosotras, collar personalizado, Inspiración y envíos', 'Slide with Valvanuz’s five requirements for her website: Home, About us, personalised necklace, Inspiration and shipping'),
        ],
      },
      {
        layout: 'step',
        step: 'investigacion',
        title: { es: 'Cómo se compran joyas online', en: 'How people buy jewellery online' },
        text: [
          {
            es: 'Analicé los dos competidores directos que me recomendó Valvanuz, Tileta Brand y Trouble Makers. No buscaba comparar estilos, sino entender qué podía aprender Valvinia y dónde podía diferenciarse con su experiencia personalizada.',
            en: 'I analysed the two direct competitors Valvanuz recommended, Tileta Brand and Trouble Makers. I wasn’t comparing visual styles, but looking at what Valvinia could learn and where it could stand out with its personalised experience.',
          },
          {
            es: 'Antes, con investigación secundaria sobre el mercado de joyería online, me centré en tres preguntas:',
            en: 'Before that, through secondary research into the online jewellery market, I focused on three questions:',
          },
        ],
        bullets: [
          { es: 'Confianza: ¿qué hace que alguien se anime a comprar a una marca que no conoce?', en: 'Trust: what makes people comfortable buying from a brand they haven’t tried before?' },
          { es: 'Incertidumbre: ¿qué dificultades aparecen cuando no puedes ver, tocar ni probarte la joya?', en: 'Uncertainty: what difficulties arise when you can’t see, touch or try on the jewellery?' },
          { es: 'Experiencia de compra: ¿qué información y funciones ayudan a decidir?', en: 'Shopping experience: what information and features help people decide?' },
        ],
        images: [
          screen('valvinia/competencia-tileta.png', 'Home de Tileta Brand con la colección «Entre tonos»', 'Tileta Brand home page with the “Entre tonos” collection'),
          screen('valvinia/competencia-trouble-makers.png', 'Home de Trouble Makers Shop con sus notas de estilo, navegación y señales de confianza', 'Trouble Makers Shop home page with notes on style, navigation and trust signals'),
          screen('valvinia/analisis-competencia.png', 'Tabla comparativa de Valvinia, Tileta Brand y Trouble Makers: identidad, navegación, producto, personalización, confianza y checkout', 'Comparison table of Valvinia, Tileta Brand and Trouble Makers: identity, navigation, product, personalisation, trust and checkout'),
        ],
      },
      {
        layout: 'step',
        step: 'usuario',
        title: { es: 'Escuchar a quien compra', en: 'Listening to the people who buy' },
        text: [
          {
            es: 'Con Valvanuz difundí una encuesta de Google Forms en las stories de Instagram de Valvinia y en mi propia red: 35 respuestas. Además hice 4 entrevistas individuales a personas que compran joyas online, centradas en lo que ya hacen, no en evaluar una solución que aún no existía.',
            en: 'With Valvanuz, I shared a Google Forms survey through Valvinia’s Instagram stories and my own network: 35 responses. I also ran 4 one-to-one interviews with people who buy jewellery online, focused on what they already do rather than on evaluating a solution that didn’t exist yet.',
          },
          {
            es: 'Transcribí las entrevistas y organicé las observaciones en un affinity diagram: 38 insights agrupados en 9 temas, para detectar patrones en lugar de comentarios aislados.',
            en: 'I transcribed the interviews and organised the observations in an affinity diagram: 38 insights grouped into 9 themes, to spot patterns rather than isolated comments.',
          },
        ],
        images: [
          screen('valvinia/encuesta-instagram.png', 'La encuesta difundida como story de Instagram de Valvinia, con su traducción al inglés', 'The survey shared as a Valvinia Instagram story, with its English translation'),
          screen('valvinia/entrevistas-usuarios.png', 'Resumen de la investigación: 4 entrevistas, 35 respuestas a la encuesta y 5 marcas analizadas', 'Research overview: 4 interviews, 35 survey responses and 5 brands analysed'),
          screen('valvinia/affinity-diagram.png', 'Affinity diagram con 38 insights agrupados en 9 temas, como contenido visual, confianza o personalización', 'Affinity diagram with 38 insights grouped into 9 themes, such as visual content, trust or customisation'),
        ],
      },
      {
        layout: 'step',
        step: 'definicion',
        title: { es: 'El problema real era la confianza', en: 'The real problem was trust' },
        text: [
          {
            es: 'Al principio el reto parecía «vender mejor online», pero la investigación mostró algo más profundo: sin poder ver ni probarse la joya, la gente necesita confiar en la calidad, el aspecto y la fiabilidad de la marca.',
            en: 'At first the challenge seemed to be “selling better online”, but the research revealed something deeper: without being able to see or try on the jewellery, people need to trust the brand’s quality, appearance and reliability.',
          },
        ],
        quote: {
          es: '«Las personas que compran joyas online necesitan sentirse seguras al comprar en tiendas y marcas que no han probado, porque no pueden ver, tocar ni probarse una pieza antes de que llegue.»',
          en: '“People who buy jewellery online need to find a way to feel confident buying from online shops and brands they haven’t tried before, because they cannot see, touch or try on a piece before it arrives.”',
        },
        bullets: [
          {
            es: 'Persona: Lucía, a quien le gusta descubrir marcas independientes pero necesita garantías antes de comprar.',
            en: 'Persona: Lucía, who enjoys discovering independent brands but needs reassurance before committing to a purchase.',
          },
          {
            es: 'User journey: la confianza cae cuando mira el producto de cerca, así que no podía ser una sola función, sino algo presente en toda la experiencia.',
            en: 'User journey: confidence drops when she looks at the product more closely, so trust couldn’t be a single feature, but something built throughout the experience.',
          },
        ],
        images: [
          screen('valvinia/persona.png', 'Persona Lucía Martín, 26 años, con su relación con la joyería online, motivaciones, frustraciones y necesidades', 'Persona Lucía Martín, 26, with her relationship to online jewellery, motivations, frustrations and needs'),
          screen('valvinia/user-journey.png', 'User journey de Lucía desde que descubre la marca hasta que recibe el collar, con la confianza cayendo en la ficha de producto', 'Lucía’s user journey from discovering the brand to receiving the necklace, with confidence dropping on the product page'),
        ],
      },
      {
        layout: 'step',
        step: 'ideacion',
        title: { es: 'Tres conceptos, una solución combinada', en: 'Three concepts, one combined solution' },
        text: [
          {
            es: 'Prioricé las funciones con MoSCoW para no sobrecargar la web, definí el happy path (descubrir, personalizar y comprar un collar) y un sitemap en el que el personalizador fuera parte natural de la tienda, no una herramienta aparte.',
            en: 'I prioritised features with MoSCoW to avoid an overloaded website, defined the happy path (discover, customise and buy a necklace) and a sitemap where the customiser felt like a natural part of the shop, not a separate tool.',
          },
          {
            es: 'Para el personalizador diseñé tres conceptos en móvil y escritorio, con ayuda de Claude Code, y los llevé a concept testing. El concepto A fue el favorito, pero algunas funciones del C se consideraron muy útiles, y dos participantes propusieron combinarlos. La versión 2 une lo mejor de A y de C.',
            en: 'For the customiser I designed three concepts on mobile and desktop, with help from Claude Code, and took them to concept testing. Concept A was the favourite, but some features from C were considered very useful, and two participants suggested combining them. Version 2 brings together the best of A and C.',
          },
        ],
        quote: {
          es: 'La solución no fue el primer diseño que me gustó, sino el que evolucionó con el feedback.',
          en: 'The solution wasn’t the first design I liked. It was the one that evolved through user feedback.',
        },
        images: [
          screen('valvinia/user-flow.png', 'User flow del happy path: de la Home al personalizador, el carrito y la confirmación', 'Happy path user flow: from the Home page to the customiser, cart and confirmation'),
          screen('valvinia/sitemap.png', 'Sitemap final de la tienda: Tienda, Crea tu collar, Inspiración, Sobre nosotras y Envíos', 'Final store sitemap: Shop, Create your necklace, Inspiration, About us and Shipping'),
          screen('valvinia/conceptos-a-b-c.png', 'Los tres conceptos de baja fidelidad del personalizador: A «Seeing is believing», B «Clear information» y C «Others say so»', 'The three low-fidelity customiser concepts: A “Seeing is believing”, B “Clear information” and C “Others say so”'),
          screen('valvinia/concepto-hibrido.png', 'Concepto final: el A como base con la prueba social del C, en tres pasos de cadena, charms y vista previa', 'Final concept: A at the core with the social proof of C, in three steps for chain, charms and preview'),
        ],
      },
      {
        layout: 'step',
        step: 'diseno',
        title: { es: 'Elegante, cercana y con el producto en el centro', en: 'Elegant, personal and focused on the product' },
        text: [
          {
            es: 'La identidad visual debía reflejar a una marca pequeña e independiente con un trato personal, dejando que los collares fueran los protagonistas. Cuidé especialmente la presentación del producto, el espaciado, la tipografía y la navegación.',
            en: 'The visual identity had to reflect a small, independent brand with a personal approach, letting the necklaces be the main attraction. I paid particular attention to product presentation, spacing, typography and navigation.',
          },
          {
            es: 'El personalizador guía la elección en tres pasos (cadena y largo, charms y vista previa) para que cada decisión se entienda y el resultado se pueda visualizar. Completé las secciones de Inspiración y Sobre nosotras.',
            en: 'The customiser guides the choice in three steps (chain and length, charms and preview) so every decision is clear and the result can be visualised. I also designed the Inspiration and About Us sections.',
          },
          {
            es: 'Conecté Figma con Claude Code para avanzar más rápido en las pantallas de alta fidelidad, pero no todo salía listo para usar: revisé y corregí a mano tarjetas de producto, colores, márgenes e incoherencias de layout.',
            en: 'I connected Figma with Claude Code to move faster on the high-fidelity screens, but not everything came out ready to use: I reviewed and corrected product cards, colours, margins and layout inconsistencies by hand.',
          },
        ],
        quote: {
          es: 'La IA puede apoyar el proceso de diseño, pero no sustituye el criterio de diseño.',
          en: 'AI can support the design process, but it doesn’t replace design judgement.',
        },
        images: [
          screen('valvinia/personalizador-escritorio.png', 'Personalizador en escritorio: elección de cadena y largo sobre una silueta con medidas', 'Desktop customiser: choosing chain and length on a silhouette with measurements'),
          screen('valvinia/personalizador-movil.png', 'Personalizador en móvil en tres pantallas: cadena y largo, charms y vista previa', 'Mobile customiser across three screens: chain and length, charms and preview'),
          screen('valvinia/inspiracion-sobre-nosotras.png', 'Páginas de Inspiración y Sobre nosotras en escritorio', 'Inspiration and About Us pages on desktop'),
        ],
      },
      {
        layout: 'step',
        step: 'testing',
        title: { es: 'Probar, escuchar y pulir', en: 'Testing, listening and polishing' },
        text: [
          {
            es: 'Cuatro personas probaron el prototipo de alta fidelidad. Sus comentarios, sobre todo en móvil, llevaron a tres cambios de la versión 1 a la 2:',
            en: 'Four people tested the high-fidelity prototype. Their feedback, especially on mobile, led to three changes from version 1 to version 2:',
          },
        ],
        bullets: [
          { es: 'Navegación móvil: quité la sección de cuenta, que resultaba confusa.', en: 'Mobile navigation: I removed the account section, which was confusing.' },
          { es: 'Carrito: corregí las animaciones para que la interacción fuera más clara.', en: 'Shopping cart: I corrected the animations to make the interaction clearer.' },
          { es: 'Home móvil: eliminé secciones informativas para una experiencia más limpia y centrada.', en: 'Mobile home page: I removed some information sections for a cleaner, more focused experience.' },
          {
            es: 'Design critique con Sarah: unifiqué las esquinas de botones y tarjetas, ajusté espaciados, diferencié los iconos de la barra de estado de iOS y, a la espera de las fotos de la clienta, exploré imágenes de producto generadas con IA.',
            en: 'Design critique with Sarah: I unified the corners of buttons and cards, adjusted spacing, made the iOS status bar icons distinct from the site’s own and, while waiting for the client’s photos, explored AI-generated product imagery.',
          },
        ],
        images: [
          screen('valvinia/usability-v1.png', 'Versión 1 del prototipo móvil que probaron los usuarios, con los tres puntos de mejora marcados', 'Version 1 of the mobile prototype that users tested, with the three issues marked'),
          screen('valvinia/usability-v2.png', 'Versión 2 tras el usability test: sin cuenta en móvil, animación del carrito corregida y Home más ligera', 'Version 2 after usability testing: no account on mobile, fixed cart animation and a lighter Home page'),
          screen('valvinia/design-critique.png', 'Antes y después del pulido final: botones, campos de formulario y tarjetas de producto con esquinas rectas y fotos reales', 'Before and after the final polish: buttons, form fields and product cards with square corners and real photos'),
        ],
      },
      {
        layout: 'step',
        step: 'resultado',
        title: { es: 'Diseñar para la confianza, no solo para la conversión', en: 'Designing for confidence, not just conversion' },
        text: [
          {
            es: 'La confianza no se crea con un botón ni con una foto bonita: se construye en toda la experiencia, con la información que se da, cómo se presenta el producto y la transparencia del proceso. Si siguiera trabajando en Valvinia, me centraría en:',
            en: 'Trust isn’t created with a single button or a nice photograph: it’s built through the entire experience, with the information provided, the way products are presented and the transparency of the process. If I continued working on Valvinia, I would focus on:',
          },
        ],
        bullets: [
          { es: 'Validar el personalizador con más tests: si se completa sin ayuda y si la vista previa da confianza para comprar.', en: 'Validating the customiser with more testing: whether people complete it on their own and whether the preview gives them confidence to buy.' },
          { es: 'Reforzar la confianza en toda la compra: materiales, medidas, reseñas, fotos reales e información de envío.', en: 'Strengthening trust across the purchase: materials, dimensions, reviews, real photos and shipping information.' },
          { es: 'Probar la experiencia responsive completa en distintos móviles y pantallas, del personalizador al checkout.', en: 'Testing the complete responsive experience on different phones and screens, from the customiser to checkout.' },
        ],
        quote: {
          es: 'Comprar joyas online no debería sentirse como un riesgo, sino como descubrir algo personal sabiendo exactamente lo que eliges.',
          en: 'Buying jewellery online shouldn’t feel like taking a risk. It should feel like discovering something personal, knowing exactly what you’re choosing.',
        },
      },
    ],
    mediumUrl: 'https://medium.com/@claraaraoz04/building-trust-in-online-jewellery-designing-a-personalised-shopping-experience-for-valvinia-b0b05701c4cf',
  },
  {
    slug: 'bitepal',
    category: 'ux-ui',
    title: { es: 'BitePal', en: 'BitePal' },
    subtitle: {
      es: 'Evaluación heurística y rediseño de una app de nutrición en tres días.',
      en: 'A three-day heuristic evaluation and redesign of a nutrition app.',
    },
    keywords: [
      { es: 'Usabilidad', en: 'Usability' },
      { es: 'Claridad', en: 'Clarity' },
      { es: 'Consistencia', en: 'Consistency' },
    ],
    description: [
      {
        es: 'Tres días, una app y diez heurísticos de usabilidad. En lugar de rediseñar todo el producto, busqué dónde pequeños cambios podían hacer la experiencia más fácil de entender.',
        en: 'Three days, one app and ten usability heuristics. Instead of redesigning the whole product, I looked for where small changes could make the experience easier to understand.',
      },
    ],
    hero: screen(
      'bitepal/portada-pantallas.png',
      'Pantallas de BitePal en Figma: inicio, ficha de comida y pantalla de error, antes y después del rediseño',
      'BitePal screens in Figma: home, food detail and error screen, before and after the redesign',
    ),
    heroSide: 'right',
    facts: {
      role: { es: 'Diseñadora UX/UI', en: 'UX/UI Designer' },
      duration: { es: '3 días', en: '3 days' },
      team: { es: 'Proyecto individual · Ironhack', en: 'Individual project · Ironhack' },
      tools: { es: 'Figma', en: 'Figma' },
    },
    spreads: [
      {
        layout: 'step',
        step: 'reto',
        title: { es: 'Mirar una app conocida con ojo crítico', en: 'Looking at a familiar app with a critical eye' },
        text: [
          {
            es: 'Para mi tercer proyecto en Ironhack tenía tres días para analizar una app existente, detectar problemas de usabilidad y rediseñar algunos elementos con los diez heurísticos de usabilidad. Elegí BitePal, una app de dieta y nutrición que ya conocía.',
            en: 'For my third Ironhack project I had three days to analyse an existing app, identify usability problems and redesign selected elements based on the ten usability heuristics. I chose BitePal, a diet and nutrition app I already knew.',
          },
          {
            es: 'El reto era verla no como usuaria, sino como diseñadora que evalúa las decisiones detrás de la interfaz.',
            en: 'The challenge was to see it not as a user, but as a designer evaluating the decisions behind the interface.',
          },
        ],
      },
      {
        layout: 'step',
        step: 'investigacion',
        title: { es: 'Recrear para entender', en: 'Recreating to understand' },
        text: [
          {
            es: 'Recreé la pantalla inicial de BitePal en Figma siguiendo Atomic Design: de iconos y componentes básicos a componentes más grandes y pantallas completas. Esto me permitió analizar la jerarquía, el espaciado, la consistencia y la relación entre elementos.',
            en: 'I recreated BitePal’s initial screen in Figma following Atomic Design: from icons and basic components to larger components and complete screens. This let me inspect the hierarchy, spacing, consistency and relationships between elements.',
          },
          {
            es: 'Con la interfaz original reconstruida, la evalué con los diez heurísticos. Cada cambio debía tener una razón de usabilidad, no ser una preferencia estética.',
            en: 'With the original interface rebuilt, I evaluated it against the ten heuristics. Every change needed a usability reason, not an aesthetic preference.',
          },
        ],
        images: [
          screen('bitepal/recreacion-atomic-design.png', 'Recreación de la pantalla de inicio de BitePal en Figma con sus componentes, botones y secciones', 'Recreation of the BitePal home screen in Figma with its components, buttons and sections'),
        ],
      },
      {
        layout: 'step',
        step: 'definicion',
        title: { es: 'Tres áreas de mejora', en: 'Three areas to improve' },
        text: [
          {
            es: 'Me centré en problemas concretos de la pantalla de inicio, la de estadísticas y una nueva pantalla de error, en lugar de rediseñarlo todo a la vez:',
            en: 'I focused on specific problems across the home screen, the statistics screen and a new error screen, rather than redesigning everything at once:',
          },
        ],
        bullets: [
          { es: 'Consistencia: elementos con la misma función que se ven o se comportan distinto obligan a un esfuerzo extra.', en: 'Consistency: elements that serve similar purposes but look or behave differently demand extra effort.' },
          { es: 'Claridad de la información: los datos deben ayudar a entender, no costar interpretarlos.', en: 'Information clarity: data should help users understand, not make them work harder to interpret it.' },
          { es: 'Errores: un mensaje de error debe explicar qué ha pasado y cómo seguir, sin dejar al usuario adivinando.', en: 'Errors: an error message should explain what happened and how to recover, without leaving users guessing.' },
        ],
      },
      {
        layout: 'step',
        step: 'ideacion',
        title: { es: 'De bocetos de baja fidelidad a componentes', en: 'From low-fidelity sketches to components' },
        text: [
          {
            es: 'Exploré soluciones con bocetos y layouts de baja fidelidad antes de pasar a Figma. Al ser un proyecto corto, priorizar era clave: elegir los cambios con más impacto en el tiempo disponible.',
            en: 'I explored solutions through low-fidelity sketches and layouts before moving to Figma. As it was a short project, prioritisation was key: choosing the changes with the most impact in the time available.',
          },
        ],
        images: [
          screen('bitepal/bocetos-01.jpg', 'Bocetos a lápiz en un cuaderno con ideas para los componentes de calorías y agua', 'Pencil sketches in a notebook exploring the calorie and water components'),
          screen('bitepal/bocetos-02.jpg', 'Bocetos a lápiz de la pantalla de estadísticas y la pantalla de error', 'Pencil sketches of the statistics screen and the error screen'),
        ],
      },
      {
        layout: 'step',
        step: 'diseno',
        title: { es: 'Organizar la información, no decorarla', en: 'Organising information, not decorating it' },
        text: [
          {
            es: 'Desarrollé distintos componentes que comunicaban la misma información que la interfaz original. Me centré en cómo se organiza la información, qué elementos merecen más atención y cómo cada componente comunica su función. En las estadísticas probé visualizaciones más sencillas, como barras verticales.',
            en: 'I developed different components that communicated the same information as the original interface. I focused on how information is organised, which elements deserve more attention and how each component communicates its purpose. For the statistics, I tried simpler visualisations such as vertical bar charts.',
          },
        ],
        quote: { es: 'Mostrar datos y comunicar datos son dos cosas distintas.', en: 'Displaying data and communicating data are two different things.' },
        images: [
          screen('bitepal/componentes-redisenados.png', 'Componentes rediseñados: calorías y macros, consumo de agua, comidas y puntuaciones nutricionales', 'Redesigned components: calories and macros, water intake, meals and nutritional scores'),
        ],
      },
      {
        layout: 'gallery',
        title: { es: 'Antes y después', en: 'Before and after' },
        images: [
          screen('bitepal/inicio-antes-despues.png', 'Pantalla de inicio de BitePal antes y después del rediseño', 'BitePal home screen before and after the redesign', { es: 'Inicio: componentes más consistentes', en: 'Home: more consistent components' }),
          screen('bitepal/estadisticas-antes-despues.png', 'Pantalla de comida y estadísticas antes y después del rediseño', 'Food and statistics screen before and after the redesign', { es: 'Estadísticas: información más fácil de comparar', en: 'Statistics: information that is easier to compare' }),
          screen('bitepal/error-antes-despues.png', 'Pantalla de error antes y después del rediseño', 'Error screen before and after the redesign', { es: 'Error: qué ha pasado y qué hacer después', en: 'Error: what happened and what to do next' }),
        ],
      },
      {
        layout: 'step',
        step: 'testing',
        title: { es: 'Design critique: ver lo que se me había escapado', en: 'Design critique: seeing what I had missed' },
        text: [
          {
            es: 'Presenté el rediseño en una sesión de Design Critique. El feedback señaló problemas que no había detectado mientras trabajaba:',
            en: 'I presented the redesign in a Design Critique session. The feedback pointed out issues I hadn’t noticed while working:',
          },
        ],
        bullets: [
          { es: 'No quedaba claro que la pantalla de error fuera un error: parecía una pantalla para introducir comida.', en: 'It wasn’t clear that the error screen was an error: it looked like a screen for entering food.' },
          { es: 'La pantalla de error tenía problemas de alineación.', en: 'The error screen had alignment issues.' },
          { es: 'El botón «+» podía confundirse con el de añadir agua.', en: 'The plus button could be confused with the one for adding water.' },
          { es: 'La jerarquía visual y la organización de los elementos eran clave.', en: 'Visual hierarchy and element organisation were key.' },
        ],
        quote: {
          es: 'Un diseño puede tener sentido para quien lo ha creado y no para alguien que lo ve por primera vez.',
          en: 'A design can make sense to the person who created it and still not make sense to someone seeing it for the first time.',
        },
      },
      {
        layout: 'step',
        step: 'resultado',
        title: { es: 'Pequeños cambios, mejores experiencias', en: 'Small changes, better experiences' },
        text: [
          {
            es: 'Con más tiempo, haría inconfundible la pantalla de error con un mensaje más claro y un siguiente paso evidente, revisaría la jerarquía, el espaciado y la posición del botón «+», y probaría las pantallas con usuarios.',
            en: 'With more time, I would make the error screen unmistakable with a clearer message and an obvious next step, refine the hierarchy, spacing and placement of the plus button, and test the screens with users.',
          },
          { es: 'Lo que me llevo:', en: 'What I’m taking with me:' },
        ],
        bullets: [
          { es: 'Diseño visual y usabilidad no son lo mismo.', en: 'Visual design and usability are not the same thing.' },
          { es: 'Cada decisión de diseño necesita una razón.', en: 'Every design decision needs a reason.' },
          { es: 'El feedback es parte del proceso de diseño.', en: 'Feedback is part of the design process.' },
          { es: 'Comunicar un diseño es una habilidad en sí misma.', en: 'Communicating a design is a skill of its own.' },
        ],
      },
    ],
    mediumUrl: 'https://medium.com/@claraaraoz04/small-changes-better-experiences-a-ux-ui-redesign-of-bitepal-d7e9e56d8944',
  },
  {
    slug: 'bakey',
    category: 'ux-ui',
    title: { es: 'Bakey', en: 'Bakey' },
    subtitle: {
      es: 'Una app que acompaña paso a paso a quien hace repostería en casa.',
      en: 'An app that guides home bakers step by step.',
    },
    keywords: [
      { es: 'Acompañamiento', en: 'Guidance' },
      { es: 'Aprendizaje', en: 'Learning' },
      { es: 'Disfrute', en: 'Enjoyment' },
    ],
    description: [
      {
        es: 'Convertí una de mis pasiones, la repostería, en un proyecto de UX/UI: ayudar a quien hornea en casa a sentirse seguro en la cocina, porque hornear debería consistir en disfrutar del proceso, no en preocuparse por si sale mal.',
        en: 'I turned one of my passions, baking, into a UX/UI project: helping home bakers feel confident in the kitchen, because baking should be about enjoying the process, not worrying about getting it wrong.',
      },
    ],
    hero: screen(
      'bakey/hifi-pantallas.png',
      'Logo de Bakey, una magdalena rosa sonriente, junto a dos móviles con la Home y las recetas populares de la app',
      'The Bakey logo, a smiling pink cupcake, next to two phones showing the app’s Home and popular recipes',
    ),
    heroSide: 'right',
    facts: {
      role: { es: 'Diseñadora UX/UI · Investigación · Desarrollo de concepto', en: 'UX/UI Designer · User Research · Concept Development' },
      duration: { es: 'Octubre 2026', en: 'October 2026' },
      team: { es: 'Proyecto individual · Passion project de Ironhack', en: 'Individual project · Ironhack passion project' },
      tools: { es: 'Figma · FigJam · Google Forms · TikTok · ChatGPT', en: 'Figma · FigJam · Google Forms · TikTok · ChatGPT' },
    },
    spreads: [
      {
        layout: 'step',
        step: 'reto',
        title: { es: 'Cuando una receta no sale como esperabas', en: 'When a recipe doesn’t turn out as expected' },
        text: [
          {
            es: 'El brief pedía elegir algo que nos apasionara y encontrar una oportunidad de mejora. Elegí la repostería. Para mí es experimentar, aprender técnicas y compartir algo hecho en casa, pero las recetas no siempre funcionan: las medidas confunden, faltan detalles y a mitad de receta dudas si lo estás haciendo bien.',
            en: 'The brief asked us to choose something we were passionate about and find an opportunity for improvement. I chose baking. For me it means experimenting, learning techniques and sharing something homemade, but recipes don’t always work: measurements can be confusing, details are missing and halfway through you wonder whether you’ve done something wrong.',
          },
        ],
        quote: {
          es: '¿Cómo podríamos hacer que hornear en casa sea una experiencia más segura y disfrutable?',
          en: 'How might we make baking a more confident and enjoyable experience for people who do it at home?',
        },
      },
      {
        layout: 'step',
        step: 'investigacion',
        title: { es: 'Escuchar a la comunidad repostera', en: 'Listening to the baking community' },
        text: [
          {
            es: 'La investigación secundaria me dejó cinco observaciones: la consistencia de los resultados, la necesidad de entender por qué importa cada paso, el disfrute del proceso, los recursos que exige cada receta y su valor emocional y social.',
            en: 'Secondary research left me with five observations: consistency of results, the need to understand why each step matters, enjoyment of the process, the resources each recipe requires and its emotional and social value.',
          },
          {
            es: 'Exploré foros y comunidades online y preparé entrevistas y una encuesta. Usé ChatGPT para generar preguntas abiertas, las adapté al formato de encuesta y las afiné con Ana, mi TA. Para llegar más allá de mi entorno, publiqué un TikTok en mi cuenta de repostería (1.351 visualizaciones y 157 me gusta) y reuní 120 respuestas.',
            en: 'I explored online forums and communities and prepared interviews and a survey. I used ChatGPT to brainstorm open questions, adapted them into a survey and refined them with Ana, my TA. To reach beyond my own circle, I posted a TikTok on my baking account (1,351 views and 157 likes) and gathered 120 responses.',
          },
        ],
        quote: {
          es: 'Investigar no es solo escribir preguntas y esperar respuestas: a veces hay que tomar la iniciativa y buscar a la gente donde está.',
          en: 'Research isn’t just about writing questions and waiting for answers: sometimes you need to take the initiative and find people where they are.',
        },
        images: [
          screen('bakey/investigacion-secundaria.png', 'Tablero de FigJam con los hallazgos de la investigación secundaria agrupados en notas', 'FigJam board with the secondary research findings grouped on sticky notes'),
          screen('bakey/tiktok-encuesta.jpg', 'Perfil de TikTok Araoz_cakes con el enlace a la encuesta y fotos de postres caseros', 'The Araoz_cakes TikTok profile with the survey link and photos of homemade desserts'),
          screen('bakey/encuesta.png', 'Resumen de Google Forms con 120 respuestas y la distribución de edades', 'Google Forms summary with 120 responses and the age distribution'),
        ],
      },
      {
        layout: 'step',
        step: 'usuario',
        title: { es: 'Patrones en la experiencia de la gente', en: 'Patterns in people’s experiences' },
        text: [
          { es: 'El affinity diagram de las entrevistas mostró tres temas:', en: 'The affinity diagram of the interviews revealed three themes:' },
        ],
        bullets: [
          { es: 'Falta de confianza en las recetas: no siempre se sabe si son fiables.', en: 'Lack of confidence in recipes: people don’t always know whether they’re reliable.' },
          { es: 'Información que falta e instrucciones poco claras, sobre todo para quien tiene menos experiencia.', en: 'Missing information and unclear instructions, especially for less experienced bakers.' },
          { es: 'Tiempo y esfuerzo: a veces hacen que la gente ni siquiera empiece.', en: 'Time and effort: sometimes they stop people from even starting.' },
          { es: 'Encuesta: el 78,6 % hornea para amigos o familia, el 45,5 % obtiene a veces resultados distintos de lo esperado y el 38,4 % ha abandonado alguna vez un postre que tenía pensado.', en: 'Survey: 78.6% bake for friends or family, 45.5% sometimes get different results than expected and 38.4% have abandoned a planned dessert at least sometimes.' },
        ],
        quote: {
          es: 'La gente empieza a hornear para relajarse, crear o compartir; cuando la receta no sale como esperaba, esa experiencia positiva cambia rápido.',
          en: 'People start baking to relax, create or share; when the recipe doesn’t go as expected, that positive experience can quickly change.',
        },
        images: [
          screen('bakey/affinity-diagram.png', 'Affinity diagram con los hallazgos de las entrevistas agrupados por temas', 'Affinity diagram with the interview findings grouped by theme'),
          screen('bakey/insights-encuesta.png', 'Lámina «Research & evidence» con los datos principales de la encuesta', '“Research & evidence” slide with the main survey figures'),
        ],
      },
      {
        layout: 'step',
        step: 'definicion',
        title: { es: 'Acompañar también cuando algo sale mal', en: 'Supporting people when things go wrong too' },
        text: [
          {
            es: 'Laura, mi persona, no es alguien que no sepa hornear: quiere hacerlo y tiene motivación, pero se desanima cuando el proceso se vuelve impredecible. En su journey (descubrir, informarse, preparar, hornear, resolver problemas y terminar) un pequeño resultado inesperado puede cambiarlo todo.',
            en: 'Laura, my persona, isn’t someone who doesn’t know how to bake: she wants to and she’s motivated, but she gets discouraged when the process becomes unpredictable. In her journey (discover, research, prepare, bake, solve problems and finish) a small unexpected result can change everything.',
          },
        ],
        quote: {
          es: '«Quien hornea en casa necesita sentirse seguro y tranquilo durante todo el proceso, porque la incertidumbre sobre una receta puede llevar a la frustración, la decepción y el enfado.»',
          en: '“Home bakers need to find a way to feel confident and reassured throughout the baking process because uncertainty about a recipe can lead to frustration, disappointment and anger.”',
        },
        images: [
          screen('bakey/persona.png', 'Persona Laura, 24 años, estudiante en Madrid, con su bio, objetivos y frustraciones', 'Persona Laura, 24, a student in Madrid, with her bio, goals and frustrations'),
          screen('bakey/user-journey.png', 'User journey de la repostería en casa: descubrir, evaluar, preparar, hornear, resolver problemas y terminar', 'Home baking user journey: discover, evaluate, get ready, bake, solve problems and finish'),
        ],
      },
      {
        layout: 'step',
        step: 'ideacion',
        title: { es: 'Un compañero de repostería', en: 'A baking companion' },
        text: [
          {
            es: 'Prioricé las funciones con MoSCoW para no sobrecargar la app y centrarme en los momentos en que más ayuda hace falta. El concepto acompaña toda la receta: descubrir, buscar, preparar ingredientes y utensilios, seguir los pasos con vídeos cortos, anticipar los pasos difíciles con consejos antes de que surja el problema y compartir el resultado con la comunidad.',
            en: 'I prioritised features with MoSCoW to avoid an overloaded app and focus on the moments when people need the most support. The concept accompanies the whole recipe: discover, search, prepare ingredients and utensils, follow the steps with short videos, anticipate difficult steps with tips before problems occur and share the result with the community.',
          },
          {
            es: 'Probé un prototipo de baja fidelidad con compañeros de Ironhack por Slack. Pedían botones más grandes, etiquetas más claras, una barra de progreso, una pantalla final y avisos más claros. Thomas preguntó por qué desaparecía la barra de navegación durante la receta: la había quitado para evitar distracciones, y me hizo pensar en el equilibrio entre concentración y navegación familiar.',
            en: 'I tested a low-fidelity prototype with Ironhack students over Slack. They asked for larger buttons, clearer labels, a progress bar, a completion screen and clearer alerts. Thomas asked why the navigation bar disappeared during the recipe: I had removed it to avoid distractions, and it made me think about the balance between focus and familiar navigation.',
          },
        ],
        quote: {
          es: 'No solo decir qué hacer: ayudar a entender cómo hacerlo y qué esperar por el camino.',
          en: 'Don’t just tell people what to do. Help them understand how to do it and what to expect along the way.',
        },
        images: [
          screen('bakey/moscow.png', 'Priorización MoSCoW de funciones en notas: must, should, could y won’t have', 'MoSCoW feature prioritisation on sticky notes: must, should, could and won’t have'),
          screen('bakey/wireframes-01.png', 'Bocetos a mano de las pantallas de la app en un cuaderno', 'Hand-drawn sketches of the app screens in a notebook'),
          screen('bakey/wireframes-02.png', 'Wireframes de baja fidelidad: Home, búsqueda, ficha de receta y pasos', 'Low-fidelity wireframes: Home, search, recipe page and steps'),
        ],
      },
      {
        layout: 'step',
        step: 'diseno',
        title: { es: 'Cálida, acogedora y tranquila', en: 'Warm, welcoming and calm' },
        text: [
          {
            es: 'Una paleta suave inspirada en la repostería: vainilla como fondo, rosa claro como color secundario y rosa intenso para acentos y elementos interactivos, con tipografía e iconografía coherentes con el concepto.',
            en: 'A soft palette inspired by baking: vanilla as the background, light pink as the secondary colour and strong pink for accents and interactive elements, with typography and iconography consistent with the concept.',
          },
          {
            es: 'En alta fidelidad diseñé la Home, la búsqueda y una receta completa de tortitas, con ingredientes, técnicas y pasos variados. La receta va paso a paso con demostraciones visuales, y los avisos anticipan los errores comunes en los momentos difíciles.',
            en: 'In high fidelity I designed the Home, search and a complete pancake recipe, with varied ingredients, techniques and steps. The recipe goes step by step with visual demonstrations, and alerts anticipate common mistakes at the tricky moments.',
          },
        ],
        images: [
          screen('bakey/identidad-visual.png', 'Paleta de color de Bakey: rosa claro, rosa intenso, neutros y colores funcionales', 'Bakey colour palette: light pink, strong pink, neutrals and functional colours'),
          screen('bakey/receta-paso-a-paso.png', 'Receta de tortitas paso a paso en siete pantallas con vídeos y avisos', 'Step-by-step pancake recipe across seven screens with videos and alerts'),
        ],
      },
      {
        layout: 'step',
        step: 'testing',
        title: { es: 'Design critique: tener una función no basta', en: 'Design critique: having a feature isn’t enough' },
        text: [
          { es: 'La crítica de diseño señaló detalles que se me habían pasado:', en: 'The design critique pointed out details I had missed:' },
        ],
        bullets: [
          { es: 'Iconos poco consistentes, mezclando versiones negras y blancas.', en: 'Inconsistent icons, mixing black and white versions.' },
          { es: 'Sombras demasiado marcadas que añadían ruido visual.', en: 'Shadows that were too strong and added visual noise.' },
          { es: 'Accesibilidad: faltaba una opción de audio para seguir la receta con las manos ocupadas.', en: 'Accessibility: there was no audio option for following the recipe with your hands busy.' },
          { es: 'La barra de progreso debía indicar cuántos pasos quedan.', en: 'The progress bar needed to show how many steps remain.' },
        ],
        quote: {
          es: 'La accesibilidad no es algo que se añade al final: hay que tenerla en cuenta durante todo el diseño.',
          en: 'Accessibility shouldn’t be added at the end. It should be considered throughout the design process.',
        },
      },
      {
        layout: 'step',
        step: 'resultado',
        title: { es: 'Más que una receta', en: 'More than a recipe' },
        text: [
          {
            es: 'Una buena receta debería darte más que instrucciones: debería darte confianza para disfrutar haciéndola, y si algo sale mal, herramientas para seguir. En una siguiente iteración:',
            en: 'A good recipe should give you more than instructions: it should give you the confidence to enjoy making it, and if something goes wrong, the tools to keep going. In a future iteration I would:',
          },
        ],
        bullets: [
          { es: 'Añadir instrucciones en audio y revisar contraste, tipografía y legibilidad de los iconos.', en: 'Add audio instructions and review contrast, typography and icon legibility.' },
          { es: 'Unificar la familia de iconos, suavizar las sombras y mejorar el indicador de progreso.', en: 'Standardise the icon family, soften the shadows and improve the progress indicator.' },
          { es: 'Hacer usability tests con personas que hornean en casa para comprobar si los consejos les dan seguridad.', en: 'Run usability tests with home bakers to see whether the tips make them feel more confident.' },
          { es: 'Explorar la parte de comunidad: compartir resultados reales y ayudar a valorar si una receta es fiable.', en: 'Explore the community side: sharing real results and helping people judge whether a recipe is reliable.' },
        ],
        images: [
          screen('bakey/design-critique.png', 'Lámina final «More confidence. More enjoyment» con citas sobre la app y el logo de Bakey', 'Closing slide “More confidence. More enjoyment” with quotes about the app and the Bakey logo'),
        ],
      },
    ],
    mediumUrl: 'https://medium.com/@claraaraoz04/more-than-a-recipe-redesigning-the-baking-experience-dc3978e5a548',
  },
];

/**
 * Orden del índice (y numeración 01, 02…): primero UX/UI, después diseño industrial.
 * Para cambiar el orden, mueve el proyecto dentro de su lista.
 */
export const projects: Project[] = [...uxui, ...industrial];

/** Número de índice con dos cifras: 01, 02… */
export const projectNumber = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, '0');
