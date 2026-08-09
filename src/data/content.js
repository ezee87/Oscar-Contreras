// Fuente única de contenido y assets. No duplicar textos en componentes.
// Copy EXACTO según 03_ESTRUCTURA_Y_COPY_EXACTO.txt — no reescribir ni resumir.

import logo from '../assets/brand/logo.png';
import banner from '../assets/brand/banner.webp';
import oscarPrimary from '../assets/oscar/Oscar.jpg';
import oscarSecondary from '../assets/oscar/oscar2.webp';

import rodrigoImg from '../assets/testimonios/rodrigo_moletto.webp';
import jorgeImg from '../assets/testimonios/jorge_olivares_test.webp';
import claudiaImg from '../assets/testimonios/claudia_yu.webp';
import claudioImg from '../assets/testimonios/claudio_garnham.webp';
import luciaImg from '../assets/testimonios/lucia_chiuminatto.webp';
import alejandroImg from '../assets/testimonios/alejandro_aedo.webp';
import ivanImg from '../assets/testimonios/ivan_flores.webp';
import fabiolaImg from '../assets/testimonios/fabiola_contreras-1.webp';

export const CTA_LABEL = 'QUIERO MI EVALUACIÓN ESTRATÉGICA';
export const CTA_TARGET = '#agenda';

export const brand = { logo, banner, logoAlt: 'Empodera Consulting Group' };

export const oscar = {
  primary: oscarPrimary, // mejor encuadre → hero
  secondary: oscarSecondary, // sección de autoridad
};

export const hero = {
  h1: 'Alcanza tu próximo Cargo Estratégico en la mitad del tiempo',
  subtitle:
    'Impulso Laboral es el programa premium de Empodera para Altos Ejecutivos y Gerentes que buscan un nuevo desafío laboral con un método comprobado.',
};

export const clientLogos = { title: 'Nuestro portafolio de clientes incluye' };

export const evaluation = {
  title: 'Agenda tu evaluación estratégica gratuita',
  text: '30 minutos para analizar tu posicionamiento y definir tu plan de acción profesional',
};

export const painPoints = {
  title: 'Entendemos lo que estás viviendo:',
  items: [
    'La necesidad de actualizarte frente a nuevos procesos de selección',
    'Meses de búsqueda intensiva, pero sin resultados concretos',
    'Ofertas que no cumplen tus expectativas',
    'Dificultad para mostrar tu valor profesional',
    'Cuentas con la experiencia, pero sin estrategia para proyectarla',
  ],
  closing: 'Lo vemos cada día y sabemos cómo revertirlo.',
};

export const proposal = {
  eyebrow: 'Nuestra Propuesta Diferenciadora',
  title: 'IMPULSO LABORAL',

  text1:
    'Un Programa de Empleabilidad exclusivo y personalizado para Altos Ejecutivos, Gerentes y Directivos.',
  text1Highlight: 'exclusivo y personalizado',

  text2:
    'Desarrollamos junto a ti la estrategia para acelerar tu recolocación y acceder a cargos clave donde realmente puedas liderar.',
  text2Highlight: 'cargos clave',
};

export const differentiators = {
  title:
    'Por qué los programas tradicionales de Outplacement fallan (y por qué Empodera funciona)',
  titleHighlight: '(y por qué Empodera funciona)',
  intro:
    'Si estás evaluando opciones, es probable que te encuentres con las mismas promesas de siempre. Esto es lo que nos hace diferentes:',
  introHighlight: 'Esto es lo que nos hace diferentes:',
  items: [
    {
      title: 'No eres un número en un portal online:',
      text: 'Nuestro modelo es híbrido. Tendrás acompañamiento personalizado, cercano y la opción de reuniones presenciales.',
    },
    {
      title: 'Garantía de Recolocación Real:',
      text: 'A diferencia de agencias que han eliminado su bono de recolocación, nosotros te garantizamos acompañamiento hasta tu recolocación y adaptación inicial.',
    },
    {
      title: 'Involucramiento Directo de la Dirección:',
      // El "50%" recibe énfasis tipográfico vía marcado, sin inventar texto.
      text: 'El Director (Oscar Contreras) asume personalmente el 50% de la ejecución de tu programa. No te derivamos a asistentes sin experiencia.',
      emphasis: '50%',
    },
  ],
};

export const impact = {
  title: 'Indicadores de Impacto del Programa',
  eyebrow: 'Resultados Comprobados',
  items: [
    {
      value: '+60%',
      full: '+60% logra entrevistas gerenciales en menos de 30 días',
      highlights: ['+60%'],
    },
    {
      value: '7 de cada 10',
      full: '7 de cada 10 negocian mejores sueldos —entre un 20%-30% superior—',
      highlights: ['7 de cada 10', '20%-30% superior'],
    },
    {
      value: null,
      full: 'Proceso de transición laboral más cortos.',
      highlights: ['más cortos.'],
    },
    {
      value: '90 días',
      full: 'En promedio nuestros clientes se reubican en menos de 90 días',
      highlights: ['menos de 90 días'],
    },
    {
      value: '20%',
      full: 'Un 20% de ellos obtiene cargos más altos',
      highlights: ['Un 20%'],
    },
    {
      value: '9 de cada 10',
      full: '9 de cada 10 recomiendan el programa',
      highlights: ['9 de cada 10'],
    },
  ],
};

export const testimonialsSection = {
  title: 'Algunos de nuestros clientes destacan:',
};

// No existe texto completo previo en el proyecto: se usan los extractos
// visibles tal cual (ver regla en 03). No se inventa continuación.
export const testimonials = [
  {
    name: 'Rodrigo Moletto Rossle',
    role: 'Gerente Comercial - Abastecimiento',
    text: 'Realicé el programa de outplacement y fue todo un éxito. Muy profesional y con contenido muy valioso para tomar nuevos desafíos.',
    image: rodrigoImg,
    truncated: false,
  },
  {
    name: 'Jorge Olivares Silva',
    role: 'Gerente General - Consumo Masivo',
    text: 'El acompañamiento de Empodera marcó la diferencia en un momento complejo. Fortalecí mi marca personal y amplié mi red. Obtuve el cargo de Gerente General.',
    image: jorgeImg,
    truncated: false,
  },
  {
    name: 'Claudia Yu Ma',
    role: 'Growth Manager - Tecnología',
    text: 'Gracias a Fórmula Empleo, recibí la orientación y herramientas necesarias. En tan solo dos meses, recibí una carta de oferta en el área que yo quería.',
    image: claudiaImg,
    truncated: false,
  },
  {
    name: 'Claudio Garnham',
    role: 'LATAM Senior Executive - Tecnología',
    text: 'Recomiendo este acompañamiento personalizado. Logré posicionarme efectivamente en un cargo de alto nivel dentro de una empresa multinacional.',
    image: claudioImg,
    truncated: false,
  },
  {
    name: 'Lucia Chiuminatto Tapia',
    role: 'Key Account Manager - Minería',
    text: 'Encontré no solo un nuevo empleo, sino una nueva dirección profesional. La empatía y el compromiso del equipo fueron clave para reubicarme con confianza.',
    image: luciaImg,
    truncated: false,
  },
  {
    name: 'Alejandro Aedo Castillo',
    role: 'Gerente de Ingeniería - Minería',
    text: 'Muy agradecido por la asesoría que recibí. Encontré una excelente posición de gerencia, y los consejos de ambos me dieron la base para hacer esto posible.',
    image: alejandroImg,
    truncated: false,
  },
  {
    name: 'Iván Flores Martínez',
    role: 'Director Financiero - Sector Industrial',
    text: 'En el papel, todos dicen que te acompañan. Pero en el caso de Fórmula Empleo, yo lo sentí desde el inicio: Al reubicarme en menos de 4 meses...',
    image: ivanImg,
    truncated: true,
  },
  {
    name: 'Fabiola Contreras Henríquez',
    role: 'Gerente de proyectos e inversiones',
    text: 'Creo que pocas personas logran leer tan bien a las personas como Oscar, con él aprendí el gran salto que necesitaba en mi carrera, y sin duda alguna, tomar la consultoría con Empodera... fue la mejor inversión que...',
    image: fabiolaImg,
    truncated: true,
  },
];

export const empodera = {
  title: 'Empodera Consulting Group',
  subtitle:
    '20 años posicionando carreras ejecutivas en Chile, LATAM y Norteamérica',
  blocks: [
    {
      title: 'Trayectoria en empleabilidad y desarrollo de carrera',
      text: 'Entendemos el mercado y cómo se mueve la búsqueda a tu nivel',
    },
    {
      title: 'Acompañamiento a tu medida',
      text: 'Combinamos la agilidad digital con sesiones estratégicas Face-to-Face.',
    },
    {
      title: 'Un solo Programa con todo incluido',
      text: 'Sin cobros extra. Sin porcentajes sobre tu sueldo',
    },
    {
      title: 'Seguimiento 360°',
      text: 'Si tu transición toma más tiempo, seguimos contigo',
    },
    {
      title: 'Claridad y experiencia real en el mercado',
      text: 'Sabemos lo que funciona y evitamos prácticas que no sirven para ejecutivos',
    },
  ],
};

export const booking = {
  title: '¿Preparado para comenzar tu cambio laboral?',
  emphasis: '¡Agendemos!',
  iframeSrc: 'https://links.iqautomated.io/widget/booking/CUSXuaCRyCHsDYMMm5qf',
  iframeId: 'CUSXuaCRyCHsDYMMm5qf_1783260015446',
  embedScript: 'https://links.iqautomated.io/js/form_embed.js',
};

export const oscarSection = {
  title: '¿Con quiénes te vas a reunir?',
  nameHighlight: 'Oscar Contreras',
  paragraphs: [
    'Oscar Contreras, Fundador y Director de Empodera Consulting Group e impulsor del Programa Impulso Laboral.',
    'Ejecutivo con más de 20 años de experiencia en desarrollo de carrera y posicionamiento ejecutivo. Fue C-Level en Silicon Valley y desarrollador de programas experienciales para ejecutivos en colaboración con Northwestern University / Kellogg School of Business.',
    'Escritor y creador del Framework B2U, modelo de proyección y marketing estratégico para ejecutivos, integrando metodología estructurada, visión de mercado y acompañamiento personalizado para acelerar transiciones profesionales de alto impacto.',
  ],
};

export const media = {
  title: 'Algunas apariciones en medios',
  videos: [
    { title: 'TVN Muy Buenos Días - La Autoestima', id: 'ZbiO5r7cCjQ' },
    { title: 'El Abogado Vive TV - Marketing Personal', id: '7XauvsQL5oc' },
    { title: 'Pre Negociacion - Centro BCI Nace', id: 'JCFewdsdUkE' },
  ],
};

export const social = [
  {
    id: 'linkedin',
    url: 'https://www.linkedin.com/company/empodera/',
    label: 'LinkedIn de Empodera Consulting Group',
  },
  {
    id: 'facebook',
    url: 'https://www.facebook.com/empoderachile',
    label: 'Facebook de Empodera',
  },
  {
    id: 'x',
    url: 'https://x.com/empoderachile',
    label: 'X (Twitter) de Empodera',
  },
  {
    id: 'instagram',
    url: 'https://www.instagram.com/empoderalaboral/',
    label: 'Instagram de Empodera',
  },
  {
    id: 'youtube',
    url: 'https://www.youtube.com/user/empoderachile',
    label: 'Canal de YouTube de Empodera',
  },
];

// Todos los logos de empresa, importados de forma estable (orden alfabético).
const logoModules = import.meta.glob('../assets/logos_empresa/*.webp', {
  eager: true,
  import: 'default',
});

export const companyLogos = Object.keys(logoModules)
  .sort()
  .map((path) => {
    const file = path.split('/').pop().replace(/\.webp$/, '');
    return { src: logoModules[path], name: file };
  });

// ─── THANK-YOU PAGE ────────────────────────────────────────────────────────────

export const thankYouPage = {
  header: {
    // Prefijo en rojo, resto en navy.
    titlePrefix: 'Impulso Laboral:',
    titleRest: '¡Tu reunión ya fue agendada con éxito!',
    subtitle1:
      'Para aprovechar al máximo la instancia, asegúrate de completar los siguientes pasos.',
    subtitle2:
      'Si no los sigues podríamos asignar tu cupo a otra persona interesada.',
    subtitle2Lines: [
      'Si no los sigues podríamos asignar',
      'tu cupo a otra persona interesada.',
    ],
  },
  step1: {
    prefix: 'Paso 1:',
    titleBody: 'Mira este video',
    text: 'Es importante entender de qué se trata Impulso Laboral, sus características y beneficios. No es una reunión más: asegúrate de aprovechar cada minuto.',
    textLines: [
      'Es importante entender de qué se trata Impulso Laboral,',
      'sus características y beneficios.',
    ],
    textBoldPrefix: 'No es una reunión más:',
    textAfterBold: 'asegúrate de aprovechar cada minuto.',
    videoId: 'qt7xf4aWp3k',
  },
  step2: {
    prefix: 'Paso 2:',
    // "Ejecutivos, Gerentes y Directivos" va también en rojo en el JSX.
    titleBody: 'Tener claro que este programa está dirigido a',
    titleLine1: 'Tener claro que este programa está dirigido',
    titleLine2Prefix: 'a',
    titleHighlight: 'Ejecutivos, Gerentes y Directivos',
    titleEnd: 'que:',
    items: [
      'Se encuentran activamente buscando trabajo sin resultados concretos.',
      'Trabajan actualmente y quieren conseguir nuevos desafíos laborales.',
      'Buscan una transición de carrera óptima.',
      'Quieren mejorar su autoconfianza y su marca personal en redes como LinkedIn.',
      'Desean comunicar su ventaja diferenciadora y acceder a mejores oportunidades estratégicas.',
      'Les gustaría ser parte de una comunidad selecta de Ejecutivos de Alto Nivel en distintas Industrias. (Networking Ejecutivo)',
    ],
    closing: 'Una Propuesta Seria: Sin Falsas Promesas ni Métodos Ineficaces',
  },
  step3: {
    prefix: 'Paso 3:',
    titleBody: 'Avisos Importantes',
    items: [
      'Recibirás un mensaje por WhatsApp para confirmar asistencia.',
      'Te vas a reunir con los directores. Esperamos tu puntualidad.',
      'Lleva tus preguntas clave a la reunión.',
      'Si tienes algún inconveniente puedes reagendar, con al menos un día de anticipación.',
    ],
  },
  step4: {
    prefix: 'Paso 4:',
    titleBody: 'Revisa las recomendaciones de nuestros clientes',
    videoId: 'qBCFjgJ0DHc',
  },
  // Usa el array completo de testimonials de la landing; no duplicar.
  testimonialsTitle: 'Lo que nuestros Clientes destacan:',
  closing: {
    headline: '¡Nos vemos en la reunión!',
  },
  legalLines: [
    'B2U® y SPTC® son marcas registradas de Empodera® Consulting Group.',
    'Todas las marcas registradas son propiedad de sus respectivos dueños.',
  ],
  legal:
    'B2U® y SPTC® son marcas registradas de Empodera® Consulting Group. Todas las marcas registradas son propiedad de sus respectivos dueños.',
};

// ─── VIDEO EXPLICATIVO PAGE ────────────────────────────────────────────────────

export const videoExplicativoPage = {
  title: 'Video Explicativo del Programa Impulso Laboral',
  wistiaId: '0u48z5q5z8',
  text: 'Es importante que antes de reunirte con nosotros, veas este video en donde te explicamos, en qué consiste el Programa Impulso Laboral. Esto nos permite aprovechar aún más la Reunión de Evaluación que agendaste, y poder concentrarnos en tu caso particular y en las preguntas que puedas tener.',
  textHighlight: 'antes de reunirte con nosotros, veas este video',
  legalLines: [
    'B2U® y SPTC® son marcas registradas de Empodera® Consulting Group.',
    'Todas las marcas registradas son propiedad de sus respectivos dueños.',
  ],
  legal:
    'B2U® y SPTC® son marcas registradas de Empodera® Consulting Group. Todas las marcas registradas son propiedad de sus respectivos dueños.',
};

// ─── FULL FOOTER ──────────────────────────────────────────────────────────────

export const fullFooter = {
  copyright: 'Copyright © 2013-2026 Empodera® Consulting Group',
  rights: 'Todos los Derechos Reservados',
  address: 'Narvik 6424, Primer Piso Las Condes, Santiago, Chile',
  phone: 'Fono:+56 9 62468977',
};
