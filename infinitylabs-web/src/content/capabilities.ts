import type { Locale } from "@/i18n/config";
import type { Stage } from "./operating-model";

export type Capability = {
  slug: string;
  stage: Stage;
  solutions: string[];
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  includes: string[];
  approach: string[];
  technical: string[];
};

type Base = { slug: string; stage: Stage; solutions: string[] };
type Text = Omit<Capability, keyof Base>;

const base: Base[] = [
  { slug: "ai-transformation", stage: "discover", solutions: ["intelligent-operations", "revenue-systems"] },
  { slug: "ai-engineering", stage: "build", solutions: ["knowledge-ai", "document-intelligence", "customer-operations"] },
  { slug: "agentic-systems", stage: "build", solutions: ["customer-operations", "revenue-systems", "intelligent-operations"] },
  { slug: "data-ai", stage: "build", solutions: ["knowledge-ai", "document-intelligence", "revenue-systems"] },
  { slug: "ai-evaluation", stage: "operate", solutions: ["knowledge-ai", "document-intelligence", "customer-operations"] },
  { slug: "managed-ai", stage: "operate", solutions: ["knowledge-ai", "document-intelligence", "customer-operations", "intelligent-operations"] },
  { slug: "growth-engineering", stage: "build", solutions: ["marketing-systems", "revenue-systems"] },
];

const text: Record<Locale, Record<string, Text>> = {
  en: {
    "ai-transformation": {
      name: "AI Transformation", eyebrow: "Capability · Discover",
      headline: "Opportunity discovery, readiness and roadmaps grounded in how your processes actually run.",
      summary: "The discipline of deciding where AI belongs in an organization: which processes, in what order, with what architecture and what business case.",
      includes: ["AI opportunity discovery", "AI readiness assessment (data, systems, people, governance)", "Process mapping and cost-of-work analysis", "Prioritized AI roadmap and business case", "Executive alignment and operating-model design"],
      approach: ["We interview the people who do the work, not only the people who manage it.", "Every opportunity is scored on value, feasibility, data readiness and risk, and the ones that fail the test are documented too.", "Roadmaps include the boring parts: integration, data access, governance and who owns the system after launch."],
      technical: ["Architecture sketches for each prioritized opportunity", "Data and integration inventory", "Risk and control assessment per workflow"],
    },
    "ai-engineering": {
      name: "AI Engineering", eyebrow: "Capability · Build",
      headline: "Production systems, not prototypes: integrated, evaluated, observable and owned.",
      summary: "The practice that takes an AI use case from prototype to production. It runs inside your operations, with the reliability your teams expect from any other system.",
      includes: ["System architecture and integration design", "Knowledge and retrieval systems", "Document processing pipelines", "APIs, connectors and event flows to systems of record", "Security, access control and secrets management"],
      approach: ["Minimum sufficient architecture: the simplest design that meets business, scale, security and compliance requirements.", "Deterministic code where the rules are known; models only where judgment is required.", "Model-agnostic by design: providers and models are swappable behind evaluated interfaces."],
      technical: ["Typed contracts between components and models", "Evaluation sets versioned alongside the code", "Tracing of every model call with cost and latency"],
    },
    "agentic-systems": {
      name: "Agentic Systems", eyebrow: "Capability · Build",
      headline: "Controlled autonomy: agents where they are safe, approvals where the cost of error is high.",
      summary: "Workflow systems in which software agents plan and execute multi-step work across your tools, inside boundaries defined by the business.",
      includes: ["Workflow redesign with explicit states and exception paths", "Agent orchestration with tools, memory and guardrails", "Human-in-the-loop approval and escalation design", "Multi-agent coordination where the process requires it", "Operational monitoring of agent behavior"],
      approach: ["Not every problem needs an autonomous agent. We classify each step as deterministic, AI-assisted, agent-executed or human-approved before writing code.", "Agents get least-privilege access to tools and data, and every action is logged.", "Autonomy expands as evaluation data proves the system is reliable, not before."],
      technical: ["Bounded tool permissions per agent", "Replayable execution traces", "Policy checks before side-effecting actions"],
    },
    "data-ai": {
      name: "Data + AI", eyebrow: "Capability · Build",
      headline: "The data foundations that make AI systems trustworthy: access, quality, lineage and governance.",
      summary: "The difference between an impressive demo and a system that is right about your business. It comes down to getting the right data to the model, with the right controls.",
      includes: ["Data access and integration for AI workloads", "Knowledge base and content pipelines", "Structured extraction and enrichment", "Lineage, quality checks and governance", "Analytics on system behavior and business outcomes"],
      approach: ["We treat the knowledge base and the evaluation set as products with owners, not as one-time uploads.", "Permissions and data classification are enforced in the pipeline, not assumed in the prompt."],
      technical: ["Incremental ingestion with change detection", "Metadata and access-control propagation", "Quality metrics reported to business owners"],
    },
    "ai-evaluation": {
      name: "AI Evaluation", eyebrow: "Capability · Operate",
      headline: "No AI without evaluation. Measurable quality, tied to a business KPI, on every change.",
      summary: "The practice of measuring whether an AI system does what the business needs, before launch and after every change.",
      includes: ["Evaluation set design from real cases", "Quality, safety and cost metrics per workflow", "Regression testing for model, prompt and content changes", "Human review programs and calibration", "Business KPI linkage and reporting"],
      approach: ["AI metrics that do not connect to a business outcome are vanity metrics. Each system has both.", "Evaluation runs in the pipeline: a change that lowers quality does not ship."],
      technical: ["Versioned test sets and scoring rubrics", "Automated and human-graded evaluations", "Dashboards for quality drift over time"],
    },
    "managed-ai": {
      name: "Managed AI", eyebrow: "Capability · Operate",
      headline: "We operate what we build: monitoring, evaluation, optimization and governance as an ongoing service.",
      summary: "Deployment begins the operating phase. Managed AI keeps production systems reliable, current and improving, with clear ownership.",
      includes: ["Monitoring of quality, latency, cost and usage", "Incident response and exception review with your team", "Model and provider updates evaluated before rollout", "Cost optimization and capacity planning", "Governance reporting and continuous improvement backlog"],
      approach: ["One accountable team after launch, with defined response commitments agreed per system.", "Improvements are prioritized from real exceptions and user feedback, not from feature lists."],
      technical: ["Observability across the full workflow, not only the model call", "Change management with evaluation gates", "Runbooks and handover documentation"],
    },
    "growth-engineering": {
      name: "Growth Engineering", eyebrow: "Capability · Build",
      headline: "A marketing team and an engineering team building one instrumented growth system.",
      summary: "The discipline that connects brand, digital presence, content, media and measurement into a single system, and applies AI to the steps where it earns its place.",
      includes: ["Positioning, messaging and brand systems", "Websites, landing pages and content operations", "Search, social and programmatic media operation", "AI-assisted creative production inside brand rules", "Market and competitor intelligence", "Measurement, attribution and reporting on business KPIs"],
      approach: ["Marketing decisions are engineering decisions: every campaign is instrumented before it runs.", "AI writes variants and drafts; people own positioning, brand and budget.", "We build the measurement first, so spend can be defended with data the client owns."],
      technical: ["Event and conversion tracking wired to the CRM", "Creative variants generated under brand constraints", "Budget rules with human approval gates"],
    },
  },
  es: {
    "ai-transformation": {
      name: "Transformación con IA", eyebrow: "Capacidad · Descubrir",
      headline: "Descubrimiento de oportunidades, preparación y hojas de ruta basadas en cómo corren realmente tus procesos.",
      summary: "La disciplina de decidir dónde cabe la IA en una organización: qué procesos, en qué orden, con qué arquitectura y con qué caso de negocio.",
      includes: ["Descubrimiento de oportunidades de IA", "Evaluación de preparación para IA (datos, sistemas, personas, gobierno)", "Mapeo de procesos y análisis del costo del trabajo", "Hoja de ruta de IA priorizada y caso de negocio", "Alineación ejecutiva y diseño del modelo operativo"],
      approach: ["Entrevistamos a las personas que hacen el trabajo, no solo a quienes lo gestionan.", "Cada oportunidad se puntúa por valor, viabilidad, preparación de datos y riesgo, y las que no pasan la prueba también se documentan.", "Las hojas de ruta incluyen las partes aburridas: integración, acceso a datos, gobierno y quién es dueño del sistema después del lanzamiento."],
      technical: ["Bocetos de arquitectura para cada oportunidad priorizada", "Inventario de datos e integraciones", "Evaluación de riesgos y controles por flujo"],
    },
    "ai-engineering": {
      name: "Ingeniería de IA", eyebrow: "Capacidad · Construir",
      headline: "Sistemas en producción, no prototipos: integrados, evaluados, observables y con dueño.",
      summary: "La práctica que lleva un caso de uso de IA del prototipo a producción. Corre dentro de tu operación, con la fiabilidad que tus equipos esperan de cualquier otro sistema.",
      includes: ["Arquitectura del sistema y diseño de integraciones", "Sistemas de conocimiento y recuperación", "Pipelines de procesamiento documental", "APIs, conectores y flujos de eventos hacia los sistemas de registro", "Seguridad, control de acceso y gestión de secretos"],
      approach: ["Arquitectura mínima suficiente: el diseño más simple que cumple los requisitos de negocio, escala, seguridad y cumplimiento.", "Código determinista donde las reglas se conocen; modelos solo donde se requiere criterio.", "Agnósticos de modelo por diseño: proveedores y modelos son intercambiables detrás de interfaces evaluadas."],
      technical: ["Contratos tipados entre componentes y modelos", "Conjuntos de evaluación versionados junto al código", "Trazabilidad de cada llamada al modelo con costo y latencia"],
    },
    "agentic-systems": {
      name: "Sistemas agénticos", eyebrow: "Capacidad · Construir",
      headline: "Autonomía controlada: agentes donde son seguros, aprobaciones donde el costo del error es alto.",
      summary: "Sistemas de flujo en los que agentes de software planifican y ejecutan trabajo de varios pasos a través de tus herramientas, dentro de límites definidos por el negocio.",
      includes: ["Rediseño de flujos con estados y rutas de excepción explícitos", "Orquestación de agentes con herramientas, memoria y barandas", "Diseño de aprobación y escalamiento con humanos en el ciclo", "Coordinación multiagente donde el proceso lo requiere", "Monitoreo operativo del comportamiento de los agentes"],
      approach: ["No todo problema necesita un agente autónomo. Clasificamos cada paso como determinista, asistido por IA, ejecutado por agente o aprobado por humano antes de escribir código.", "Los agentes reciben acceso de mínimo privilegio a herramientas y datos, y cada acción queda registrada.", "La autonomía se amplía cuando los datos de evaluación demuestran que el sistema es confiable, no antes."],
      technical: ["Permisos de herramientas acotados por agente", "Trazas de ejecución reproducibles", "Verificaciones de política antes de acciones con efectos"],
    },
    "data-ai": {
      name: "Datos + IA", eyebrow: "Capacidad · Construir",
      headline: "Las bases de datos que hacen confiables a los sistemas de IA: acceso, calidad, linaje y gobierno.",
      summary: "La diferencia entre una demo impresionante y un sistema que acierta sobre tu negocio. Se reduce a llevar los datos correctos al modelo, con los controles correctos.",
      includes: ["Acceso e integración de datos para cargas de IA", "Pipelines de base de conocimiento y contenido", "Extracción estructurada y enriquecimiento", "Linaje, verificaciones de calidad y gobierno", "Analítica del comportamiento del sistema y de los resultados de negocio"],
      approach: ["Tratamos la base de conocimiento y el conjunto de evaluación como productos con dueños, no como cargas de una sola vez.", "Los permisos y la clasificación de datos se aplican en el pipeline, no se asumen en el prompt."],
      technical: ["Ingesta incremental con detección de cambios", "Propagación de metadatos y control de acceso", "Métricas de calidad reportadas a los dueños del negocio"],
    },
    "ai-evaluation": {
      name: "Evaluación de IA", eyebrow: "Capacidad · Operar",
      headline: "Sin evaluación no hay IA. Calidad medible, atada a un KPI de negocio, en cada cambio.",
      summary: "La práctica de medir si un sistema de IA hace lo que el negocio necesita, antes del lanzamiento y después de cada cambio.",
      includes: ["Diseño de conjuntos de evaluación a partir de casos reales", "Métricas de calidad, seguridad y costo por flujo", "Pruebas de regresión ante cambios de modelo, prompt y contenido", "Programas de revisión humana y calibración", "Vínculo con KPIs de negocio y reportes"],
      approach: ["Las métricas de IA que no se conectan con un resultado de negocio son métricas de vanidad. Cada sistema tiene ambas.", "La evaluación corre en el pipeline: un cambio que baja la calidad no se despliega."],
      technical: ["Conjuntos de prueba y rúbricas versionados", "Evaluaciones automáticas y calificadas por personas", "Tableros de deriva de calidad en el tiempo"],
    },
    "managed-ai": {
      name: "Managed AI", eyebrow: "Capacidad · Operar",
      headline: "Operamos lo que construimos: monitoreo, evaluación, optimización y gobierno como servicio continuo.",
      summary: "El despliegue inicia la fase de operación. Managed AI mantiene los sistemas en producción confiables, actualizados y en mejora, con responsabilidad clara.",
      includes: ["Monitoreo de calidad, latencia, costo y uso", "Respuesta a incidentes y revisión de excepciones con tu equipo", "Actualizaciones de modelos y proveedores evaluadas antes de desplegar", "Optimización de costos y planeación de capacidad", "Reportes de gobierno y backlog de mejora continua"],
      approach: ["Un solo equipo responsable después del lanzamiento, con compromisos de respuesta definidos por sistema.", "Las mejoras se priorizan a partir de excepciones reales y retroalimentación de usuarios, no de listas de funcionalidades."],
      technical: ["Observabilidad de todo el flujo, no solo de la llamada al modelo", "Gestión de cambios con compuertas de evaluación", "Runbooks y documentación de entrega"],
    },
    "growth-engineering": {
      name: "Ingeniería de crecimiento", eyebrow: "Capacidad · Construir",
      headline: "Un equipo de marketing y uno de ingeniería construyendo un solo sistema de crecimiento instrumentado.",
      summary: "La disciplina que conecta marca, presencia digital, contenido, medios y medición en un solo sistema, y aplica IA en los pasos donde se gana su lugar.",
      includes: ["Posicionamiento, mensajes y sistemas de marca", "Sitios, landing pages y operación de contenido", "Operación de medios en buscadores, redes y programática", "Producción creativa asistida por IA dentro de las reglas de marca", "Inteligencia de mercado y competencia", "Medición, atribución y reportes sobre KPIs de negocio"],
      approach: ["Las decisiones de marketing son decisiones de ingeniería: cada campaña se instrumenta antes de salir.", "La IA escribe variantes y borradores; las personas son dueñas del posicionamiento, la marca y el presupuesto.", "Construimos primero la medición, para que la inversión se defienda con datos del cliente."],
      technical: ["Seguimiento de eventos y conversiones conectado al CRM", "Variantes creativas generadas bajo restricciones de marca", "Reglas de presupuesto con compuertas de aprobación humana"],
    },
  },
  fr: {
    "ai-transformation": {
      name: "Transformation IA", eyebrow: "Capacité · Découvrir",
      headline: "Découverte d’opportunités, maturité et feuilles de route ancrées dans le fonctionnement réel de vos processus.",
      summary: "La discipline qui consiste à décider où l’IA a sa place dans une organisation : quels processus, dans quel ordre, avec quelle architecture et quel dossier économique.",
      includes: ["Découverte d’opportunités IA", "Évaluation de maturité IA (données, systèmes, personnes, gouvernance)", "Cartographie des processus et analyse du coût du travail", "Feuille de route IA priorisée et dossier économique", "Alignement des dirigeants et conception du modèle opérationnel"],
      approach: ["Nous interrogeons les personnes qui font le travail, pas seulement celles qui le gèrent.", "Chaque opportunité est notée sur la valeur, la faisabilité, la maturité des données et le risque, et celles qui échouent au test sont documentées aussi.", "Les feuilles de route incluent les parties ingrates : intégration, accès aux données, gouvernance et propriétaire du système après le lancement."],
      technical: ["Esquisses d’architecture pour chaque opportunité priorisée", "Inventaire des données et des intégrations", "Évaluation des risques et des contrôles par flux"],
    },
    "ai-engineering": {
      name: "Ingénierie IA", eyebrow: "Capacité · Construire",
      headline: "Des systèmes de production, pas des prototypes : intégrés, évalués, observables et pris en charge.",
      summary: "La pratique qui fait passer un cas d’usage IA du prototype à la production. Il tourne au cœur de vos opérations, avec la fiabilité que vos équipes attendent de tout autre système.",
      includes: ["Architecture système et conception des intégrations", "Systèmes de connaissance et de recherche", "Pipelines de traitement documentaire", "API, connecteurs et flux d’événements vers les systèmes de référence", "Sécurité, contrôle d’accès et gestion des secrets"],
      approach: ["Architecture minimale suffisante : la conception la plus simple qui répond aux exigences métier, d’échelle, de sécurité et de conformité.", "Du code déterministe là où les règles sont connues ; des modèles seulement là où le jugement est requis.", "Agnostique des modèles par conception : fournisseurs et modèles sont interchangeables derrière des interfaces évaluées."],
      technical: ["Contrats typés entre composants et modèles", "Jeux d’évaluation versionnés avec le code", "Traçage de chaque appel de modèle avec coût et latence"],
    },
    "agentic-systems": {
      name: "Systèmes agentiques", eyebrow: "Capacité · Construire",
      headline: "Autonomie contrôlée : des agents là où ils sont sûrs, des approbations là où le coût de l’erreur est élevé.",
      summary: "Des systèmes de flux dans lesquels des agents logiciels planifient et exécutent un travail en plusieurs étapes à travers vos outils, dans des limites définies par le métier.",
      includes: ["Refonte des flux avec états et chemins d’exception explicites", "Orchestration d’agents avec outils, mémoire et garde-fous", "Conception de l’approbation et de l’escalade avec l’humain dans la boucle", "Coordination multi-agents lorsque le processus l’exige", "Suivi opérationnel du comportement des agents"],
      approach: ["Tous les problèmes n’ont pas besoin d’un agent autonome. Nous classons chaque étape comme déterministe, assistée par l’IA, exécutée par un agent ou approuvée par un humain avant d’écrire du code.", "Les agents reçoivent un accès au moindre privilège aux outils et aux données, et chaque action est journalisée.", "L’autonomie s’étend lorsque les données d’évaluation prouvent que le système est fiable, pas avant."],
      technical: ["Permissions d’outils bornées par agent", "Traces d’exécution rejouables", "Vérifications de politique avant les actions à effets"],
    },
    "data-ai": {
      name: "Données + IA", eyebrow: "Capacité · Construire",
      headline: "Les fondations de données qui rendent les systèmes d’IA fiables : accès, qualité, lignage et gouvernance.",
      summary: "La différence entre une démo impressionnante et un système qui a raison sur votre métier. Tout tient à amener les bonnes données au modèle, avec les bons contrôles.",
      includes: ["Accès et intégration des données pour les charges IA", "Pipelines de base de connaissance et de contenu", "Extraction structurée et enrichissement", "Lignage, contrôles qualité et gouvernance", "Analytique du comportement du système et des résultats métier"],
      approach: ["Nous traitons la base de connaissance et le jeu d’évaluation comme des produits avec des propriétaires, pas comme des chargements ponctuels.", "Les permissions et la classification des données sont appliquées dans le pipeline, pas supposées dans le prompt."],
      technical: ["Ingestion incrémentale avec détection des changements", "Propagation des métadonnées et du contrôle d’accès", "Métriques de qualité rapportées aux responsables métier"],
    },
    "ai-evaluation": {
      name: "Évaluation IA", eyebrow: "Capacité · Opérer",
      headline: "Pas d’IA sans évaluation. Une qualité mesurable, reliée à un KPI métier, à chaque changement.",
      summary: "La pratique qui consiste à mesurer si un système d’IA fait ce dont le métier a besoin, avant le lancement et après chaque changement.",
      includes: ["Conception de jeux d’évaluation à partir de cas réels", "Métriques de qualité, de sécurité et de coût par flux", "Tests de régression pour les changements de modèle, de prompt et de contenu", "Programmes de revue humaine et calibration", "Lien avec les KPI métier et reporting"],
      approach: ["Les métriques d’IA qui ne se relient pas à un résultat métier sont des métriques de vanité. Chaque système a les deux.", "L’évaluation tourne dans le pipeline : un changement qui dégrade la qualité n’est pas déployé."],
      technical: ["Jeux de tests et grilles de notation versionnés", "Évaluations automatiques et notées par des humains", "Tableaux de bord de dérive de la qualité dans le temps"],
    },
    "managed-ai": {
      name: "Managed AI", eyebrow: "Capacité · Opérer",
      headline: "Nous opérons ce que nous construisons : surveillance, évaluation, optimisation et gouvernance en service continu.",
      summary: "Le déploiement ouvre la phase d’exploitation. Managed AI maintient les systèmes de production fiables, à jour et en amélioration, avec une responsabilité claire.",
      includes: ["Surveillance de la qualité, de la latence, du coût et de l’usage", "Réponse aux incidents et revue des exceptions avec votre équipe", "Mises à jour de modèles et de fournisseurs évaluées avant déploiement", "Optimisation des coûts et planification de capacité", "Reporting de gouvernance et backlog d’amélioration continue"],
      approach: ["Une seule équipe responsable après le lancement, avec des engagements de réponse définis par système.", "Les améliorations sont priorisées à partir des exceptions réelles et des retours utilisateurs, pas de listes de fonctionnalités."],
      technical: ["Observabilité sur l’ensemble du flux, pas seulement sur l’appel de modèle", "Gestion des changements avec portes d’évaluation", "Runbooks et documentation de passation"],
    },
    "growth-engineering": {
      name: "Ingénierie de croissance", eyebrow: "Capacité · Construire",
      headline: "Une équipe marketing et une équipe d’ingénierie qui construisent un seul système de croissance instrumenté.",
      summary: "La discipline qui relie marque, présence digitale, contenu, médias et mesure en un seul système, et applique l’IA là où elle gagne sa place.",
      includes: ["Positionnement, messages et systèmes de marque", "Sites, landing pages et opérations de contenu", "Exploitation des médias search, social et programmatique", "Production créative assistée par l’IA dans les règles de marque", "Intelligence marché et concurrence", "Mesure, attribution et reporting sur les KPI métier"],
      approach: ["Les décisions marketing sont des décisions d’ingénierie : chaque campagne est instrumentée avant d’être diffusée.", "L’IA écrit des variantes et des brouillons ; les personnes restent maîtresses du positionnement, de la marque et du budget.", "Nous construisons d’abord la mesure, pour que l’investissement se défende avec les données du client."],
      technical: ["Suivi des événements et conversions relié au CRM", "Variantes créatives générées sous contraintes de marque", "Règles de budget avec portes d’approbation humaine"],
    },
  },
};

export function getCapabilities(locale: Locale): Capability[] {
  return base.map((b) => ({ ...b, ...text[locale][b.slug] }));
}
export const capabilitySlugs = base.map((b) => b.slug);
export const getCapability = (locale: Locale, slug: string) => getCapabilities(locale).find((c) => c.slug === slug);
