export interface SpanishSitemapEntry {
  label: string;
  description: string;
  keywords: string[];
}

/** Visible sitemap copy, indexed by its stable internal route. */
export const SPANISH_SITEMAP_ENTRIES: Record<string, SpanishSitemapEntry> = {
  "/": {
    label: "Inicio",
    description: "La plataforma diaria de vocabulario de Lexigenz: palabra del día personalizada, arquetipos basados en la fecha de nacimiento, rachas y juegos de palabras para la generación Z y los millennials.",
    keywords: ["palabra diaria", "aplicación de vocabulario", "palabra del día", "juegos de palabras", "ampliar vocabulario", "vocabulario para la generación Z", "lenguaje millennial", "Sudáfrica"],
  },
  "/about": {
    label: "Acerca de",
    description: "Conoce Lexigenz Trading, una plataforma de vocabulario sudafricana disponible en 19 idiomas en todo el mundo. Descubre nuestra misión, historia, valores y trayectoria.",
    keywords: ["acerca de Lexigenz", "Lexigenz Trading", "vocabulario de Sudáfrica", "plataforma para aprender palabras", "vocabulario multilingüe", "aplicación para aprender idiomas"],
  },
  "/how-it-works": {
    label: "Cómo funciona",
    description: "Descubre cómo funciona Lexigenz en 6 pasos: arquetipo basado en tu fecha de nacimiento, palabra diaria, creación de frases, rachas, juegos de palabras y retos con amigos.",
    keywords: ["cómo funciona Lexigenz", "arquetipo de vocabulario", "crear frases", "rutina diaria de vocabulario", "racha de palabras", "pasos para aprender vocabulario"],
  },
  "/app": {
    label: "Aplicación",
    description: "Tu panel personal de Lexigenz: palabra de hoy, perfil de arquetipo, seguimiento de rachas, colección de insignias, diario y creador de frases.",
    keywords: ["panel de vocabulario", "diario de palabras", "aplicación de palabra diaria", "racha de vocabulario", "insignias de palabras", "vocabulario y arquetipo de nacimiento", "creador de frases"],
  },
  "/play": {
    label: "Jugar",
    description: "Juega a los 6 juegos de palabras de Lexigenz: Wordle, The Lexigenz Game, Scrabble, crucigramas, Spelling Bee y Word Grid. Practica vocabulario jugando.",
    keywords: ["juegos de palabras", "alternativa a Wordle", "juego de vocabulario", "pasatiempo de palabras", "concurso de deletreo", "crucigramas", "cuadrícula de palabras", "Scrabble en línea", "The Lexigenz Game"],
  },
  "/invite": {
    label: "Invitar",
    description: "Reta a un amigo a un duelo de palabras. Comparte Lexigenz y compitan en vocabulario, rachas y juegos de palabras en 19 idiomas.",
    keywords: ["invitar a un amigo a aprender vocabulario", "reto de palabras", "competición de vocabulario", "compartir juego de palabras", "duelo de vocabulario"],
  },
  "/premium": {
    label: "Premium",
    description: "Pásate a Lexigenz Premium: un pago único de $3 para disfrutar de acceso ilimitado. Desbloquea sesiones ilimitadas para crear frases, informes mensuales avanzados y juegos prémium.",
    keywords: ["Lexigenz Premium", "suscripción de vocabulario", "aplicación prémium de palabras", "vocabulario avanzado", "informe mensual de vocabulario", "plan de vocabulario ilimitado"],
  },
  "/faq": {
    label: "Preguntas frecuentes",
    description: "Respuestas a las preguntas frecuentes sobre Lexigenz: cómo funciona el arquetipo de palabras, qué idiomas admite, los planes Premium, las rachas y mucho más.",
    keywords: ["preguntas frecuentes de Lexigenz", "dudas sobre la aplicación de vocabulario", "preguntas sobre el arquetipo de palabras", "ayuda de Lexigenz", "soporte de la plataforma de vocabulario"],
  },
  "/contact": {
    label: "Contacto",
    description: "Ponte en contacto con Lexigenz Trading. Envíanos un mensaje o escribe a hello@lexigenz.com si tienes preguntas, quieres informar de un error o proponer una función.",
    keywords: ["contacto de Lexigenz", "soporte de Lexigenz", "hello@lexigenz.com", "soporte de la aplicación de vocabulario", "contacto de Lexigenz Trading"],
  },
  "/privacy": {
    label: "Política de privacidad",
    description: "Política de privacidad de Lexigenz Trading: cómo recopilamos, utilizamos y protegemos tus datos conforme a POPIA (Sudáfrica) y al GDPR.",
    keywords: ["política de privacidad de Lexigenz", "cumplimiento de POPIA", "protección de datos en aplicaciones de vocabulario", "GDPR y vocabulario"],
  },
  "/terms": {
    label: "Términos y condiciones",
    description: "Términos y condiciones para utilizar Lexigenz.com: propiedad intelectual, exenciones de responsabilidad, límites de responsabilidad y legislación aplicable en Sudáfrica.",
    keywords: ["términos y condiciones de Lexigenz", "términos de la aplicación de vocabulario", "información legal de Lexigenz", "términos digitales de Sudáfrica"],
  },
  "/cookies": {
    label: "Política de cookies",
    description: "Política de cookies de Lexigenz: tipos de cookies utilizadas, Google AdSense, analítica, gestión del consentimiento y tus derechos conforme a POPIA y al GDPR.",
    keywords: ["cookies de Lexigenz", "política de cookies", "cookies de AdSense", "cumplimiento de POPIA sobre cookies"],
  },
  "/legal": {
    label: "Aviso legal",
    description: "Aviso legal de Lexigenz.com: límites de exactitud, ausencia de asesoramiento profesional, avisos sobre generadores y legislación aplicable.",
    keywords: ["aviso legal de Lexigenz", "aviso sobre el generador de palabras", "información legal de la aplicación de vocabulario"],
  },
  "/terms-of-use": {
    label: "Términos de uso",
    description: "Términos de uso de Lexigenz: requisitos de elegibilidad, conducta prohibida, derechos de propiedad intelectual, límites de responsabilidad y resolución de disputas.",
    keywords: ["términos de uso de Lexigenz", "términos de la plataforma de vocabulario", "acuerdo de usuario de Lexigenz"],
  },
};
