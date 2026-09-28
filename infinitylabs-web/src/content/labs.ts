import type { Locale } from "@/i18n/config";

/**
 * Labs content. Nothing here claims results that do not exist (BUSINESS_STRATEGY §33–34).
 * `status` is shown verbatim on the site.
 */
export type LabsInitiative = {
  slug: string;
  kind: "product" | "accelerator" | "research";
  status: string;
  name: string;
  summary: string;
  detail: string;
  verified: boolean;
};

const base: { slug: string; kind: LabsInitiative["kind"]; verified: boolean }[] = [
  { slug: "noit", kind: "product", verified: false },
  { slug: "evaluation-harness", kind: "accelerator", verified: true },
  { slug: "workflow-orchestration-patterns", kind: "accelerator", verified: true },
  { slug: "document-pipelines", kind: "accelerator", verified: true },
  { slug: "mobius", kind: "research", verified: false },
];

type InitiativeText = { status: string; name: string; summary: string; detail: string };

const initiatives: Record<Locale, Record<string, InitiativeText>> = {
  en: {
    noit: { status: "in development", name: "NOIT", summary: "Market, competitive and creative intelligence for marketing and strategy teams.", detail: "NOIT started as an internal system for briefing, competitor tracking and audience analysis across social and advertising channels. It is being rebuilt on the same engineering principles as our client systems: evaluated outputs, traceable sources and human review. Public availability, scope and positioning are being defined." },
    "evaluation-harness": { status: "internal", name: "Evaluation harness", summary: "A reusable way to build test sets from real cases and run them on every change.", detail: "Versioned datasets, automated and human-graded scoring, regression reports in the delivery pipeline. Used on client systems; not offered standalone." },
    "workflow-orchestration-patterns": { status: "internal", name: "Workflow orchestration patterns", summary: "Reference patterns for deterministic / AI / agent / human-approval steps.", detail: "Typed step contracts, approval gates, escalation with context and replayable traces, packaged so a new workflow starts from a proven skeleton." },
    "document-pipelines": { status: "internal", name: "Document pipeline components", summary: "Classification, extraction, validation and reviewer-queue components for document-heavy processes.", detail: "Confidence thresholds, correction capture that feeds evaluation, and traceability from document to posted record." },
    mobius: { status: "exploration", name: "Möbius", summary: "An AI concierge that helps a visitor describe a process and identify where an intelligent system could apply.", detail: "Möbius is a concept under evaluation, not a live product. Its architecture (UX, orchestration, qualification, privacy, human handoff) is documented; it will only appear on this site when it works reliably." },
  },
  es: {
    noit: { status: "en desarrollo", name: "NOIT", summary: "Inteligencia de mercado, competencia y creatividad para equipos de marketing y estrategia.", detail: "NOIT nació como un sistema interno de briefing, seguimiento de competidores y análisis de audiencias en canales sociales y publicitarios. Se está reconstruyendo con los mismos principios de ingeniería que nuestros sistemas para clientes: salidas evaluadas, fuentes trazables y revisión humana. La disponibilidad pública, el alcance y el posicionamiento están en definición." },
    "evaluation-harness": { status: "interno", name: "Arnés de evaluación", summary: "Una forma reutilizable de construir conjuntos de prueba con casos reales y correrlos en cada cambio.", detail: "Datasets versionados, calificación automática y humana, reportes de regresión en el pipeline de entrega. Se usa en sistemas de clientes; no se ofrece por separado." },
    "workflow-orchestration-patterns": { status: "interno", name: "Patrones de orquestación de flujos", summary: "Patrones de referencia para pasos deterministas / IA / agente / aprobación humana.", detail: "Contratos tipados por paso, compuertas de aprobación, escalamiento con contexto y trazas reproducibles, empaquetados para que un flujo nuevo parta de un esqueleto probado." },
    "document-pipelines": { status: "interno", name: "Componentes de pipelines documentales", summary: "Componentes de clasificación, extracción, validación y cola de revisión para procesos intensivos en documentos.", detail: "Umbrales de confianza, captura de correcciones que alimenta la evaluación y trazabilidad del documento al registro contabilizado." },
    mobius: { status: "exploración", name: "Möbius", summary: "Un concierge de IA que ayuda a un visitante a describir un proceso e identificar dónde aplicaría un sistema inteligente.", detail: "Möbius es un concepto en evaluación, no un producto en vivo. Su arquitectura (UX, orquestación, calificación, privacidad, traspaso a humanos) está documentada; solo aparecerá en este sitio cuando funcione de forma confiable." },
  },
  fr: {
    noit: { status: "en développement", name: "NOIT", summary: "Intelligence marché, concurrentielle et créative pour les équipes marketing et stratégie.", detail: "NOIT est né comme un système interne de briefing, de veille concurrentielle et d’analyse d’audience sur les canaux sociaux et publicitaires. Il est reconstruit selon les mêmes principes d’ingénierie que nos systèmes clients : sorties évaluées, sources traçables et revue humaine. Disponibilité publique, périmètre et positionnement sont en cours de définition." },
    "evaluation-harness": { status: "interne", name: "Harnais d’évaluation", summary: "Une façon réutilisable de construire des jeux de tests à partir de cas réels et de les exécuter à chaque changement.", detail: "Jeux de données versionnés, notation automatique et humaine, rapports de régression dans le pipeline de livraison. Utilisé sur les systèmes clients ; non proposé séparément." },
    "workflow-orchestration-patterns": { status: "interne", name: "Patrons d’orchestration de flux", summary: "Patrons de référence pour les étapes déterministes / IA / agent / approbation humaine.", detail: "Contrats d’étape typés, portes d’approbation, escalade avec contexte et traces rejouables, empaquetés pour qu’un nouveau flux parte d’un squelette éprouvé." },
    "document-pipelines": { status: "interne", name: "Composants de pipelines documentaires", summary: "Composants de classification, d’extraction, de validation et de file de revue pour les processus riches en documents.", detail: "Seuils de confiance, capture des corrections qui alimente l’évaluation, et traçabilité du document jusqu’à l’enregistrement comptabilisé." },
    mobius: { status: "exploration", name: "Möbius", summary: "Un concierge IA qui aide un visiteur à décrire un processus et à identifier où un système intelligent pourrait s’appliquer.", detail: "Möbius est un concept en cours d’évaluation, pas un produit en service. Son architecture (UX, orchestration, qualification, confidentialité, passage à l’humain) est documentée ; il n’apparaîtra sur ce site que lorsqu’il fonctionnera de façon fiable." },
  },
};

const intro: Record<Locale, { headline: string; short: string; body: string }> = {
  en: {
    headline: "Labs turns repeated engineering knowledge into reusable technology.",
    short: "Every system teaches us something about evaluation, orchestration, documents or data. Labs turns those lessons into accelerators, experiments and, when they earn it, products.",
    body: "Every system we build teaches us something about evaluation, orchestration, documents or data. Labs is where those lessons become accelerators, experiments and, when they earn it, products. It is also where we test what we are not yet ready to promise to a client.",
  },
  es: {
    headline: "Labs convierte el conocimiento de ingeniería que se repite en tecnología reutilizable.",
    short: "Cada sistema nos enseña algo sobre evaluación, orquestación, documentos o datos. Labs convierte esas lecciones en aceleradores, experimentos y, cuando lo merecen, productos.",
    body: "Cada sistema que construimos nos enseña algo sobre evaluación, orquestación, documentos o datos. Labs es donde esas lecciones se convierten en aceleradores, experimentos y, cuando lo merecen, productos. También es donde probamos lo que aún no estamos listos para prometer a un cliente.",
  },
  fr: {
    headline: "Labs transforme le savoir d’ingénierie qui se répète en technologie réutilisable.",
    short: "Chaque système nous apprend quelque chose sur l’évaluation, l’orchestration, les documents ou les données. Labs transforme ces leçons en accélérateurs, en expériences et, lorsqu’elles le méritent, en produits.",
    body: "Chaque système que nous construisons nous apprend quelque chose sur l’évaluation, l’orchestration, les documents ou les données. Labs est l’endroit où ces leçons deviennent des accélérateurs, des expériences et, lorsqu’elles le méritent, des produits. C’est aussi là que nous testons ce que nous ne sommes pas encore prêts à promettre à un client.",
  },
};

const practices: Record<Locale, { name: string; description: string }[]> = {
  en: [
    { name: "Experiments", description: "Small, measured tests of models, retrieval strategies and agent designs on realistic data before they touch a client system." },
    { name: "Benchmarks", description: "Internal comparisons of providers and approaches on the tasks that matter to our solutions: extraction, grounded answers, tool use." },
    { name: "Reusable IP", description: "Accelerators that shorten the next build without locking clients into a proprietary platform." },
    { name: "Open source", description: "Where a component is generic and useful, we intend to publish it. Nothing is published yet." },
  ],
  es: [
    { name: "Experimentos", description: "Pruebas pequeñas y medidas de modelos, estrategias de recuperación y diseños de agentes con datos realistas antes de tocar un sistema de cliente." },
    { name: "Benchmarks", description: "Comparaciones internas de proveedores y enfoques en las tareas que importan para nuestras soluciones: extracción, respuestas con fuentes, uso de herramientas." },
    { name: "IP reutilizable", description: "Aceleradores que acortan la siguiente construcción sin atar a los clientes a una plataforma propietaria." },
    { name: "Código abierto", description: "Cuando un componente es genérico y útil, pensamos publicarlo. Todavía no hay nada publicado." },
  ],
  fr: [
    { name: "Expériences", description: "Petits tests mesurés de modèles, de stratégies de recherche et de conceptions d’agents sur des données réalistes avant de toucher un système client." },
    { name: "Benchmarks", description: "Comparaisons internes de fournisseurs et d’approches sur les tâches qui comptent pour nos solutions : extraction, réponses sourcées, usage d’outils." },
    { name: "PI réutilisable", description: "Des accélérateurs qui raccourcissent la prochaine construction sans enfermer les clients dans une plateforme propriétaire." },
    { name: "Open source", description: "Lorsqu’un composant est générique et utile, nous comptons le publier. Rien n’est encore publié." },
  ],
};

export function getLabs(locale: Locale) {
  return {
    intro: intro[locale],
    initiatives: base.map((b) => ({ ...b, ...initiatives[locale][b.slug] })) as LabsInitiative[],
    practices: practices[locale],
  };
}
