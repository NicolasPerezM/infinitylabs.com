import type { Locale } from "@/i18n/config";
import type { Stage } from "./operating-model";

export type Offer = {
  slug: string;
  stage: Stage;
  primary?: boolean;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  forWhom: string[];
  phases: { name: string; description: string; short: string }[];
  deliverables: string[];
  format: string;
  faq?: { question: string; answer: string }[];
};

type Base = { slug: string; stage: Stage; primary?: boolean };
type Text = Omit<Offer, keyof Base>;

const base: Base[] = [
  { slug: "ai-opportunity-sprint", stage: "discover", primary: true },
  { slug: "agentic-workflow-systems", stage: "build" },
  { slug: "enterprise-knowledge-document-ai", stage: "build" },
  { slug: "managed-ai", stage: "operate" },
  { slug: "digital-growth-system", stage: "build" },
];

const text: Record<Locale, Record<string, Text>> = {
  en: {
    "ai-opportunity-sprint": {
      name: "AI Opportunity Sprint", eyebrow: "Offer · Discover",
      headline: "A structured engagement to identify, evaluate and prioritize the AI opportunities worth building.",
      summary: "The Sprint replaces open-ended AI exploration with a decision: which processes, in what order, with what architecture, and what business case. It is the entry point to everything else we do.",
      forWhom: ["Leadership teams with executive sponsorship and a mandate to move from experiments to production.", "Organizations with repetitive, document-heavy or multi-system processes and measurable operational cost.", "Teams that want an engineering-grade plan before committing budget to a build."],
      phases: [
        { name: "Map", short: "How work actually flows, where it waits, what it costs.", description: "Interviews with the people who do the work, process walkthroughs, systems and data inventory. We document how work actually flows, where it waits and what it costs." },
        { name: "Score", short: "Value, feasibility, data readiness, risk. Failures documented too.", description: "Each candidate opportunity is scored on business value, feasibility, data readiness, risk and change effort. We show the ones that fail the test as clearly as the ones that pass." },
        { name: "Design", short: "Target workflow, architecture, approval points, business case.", description: "For the prioritized opportunities: target workflow design, architecture sketch, human-approval points, evaluation approach, integration needs and a business case with assumptions stated." },
      ],
      deliverables: ["Process and opportunity map", "Scored and prioritized opportunity portfolio", "Target workflow and architecture sketches for the top opportunities", "Evaluation and governance approach per opportunity", "Roadmap and business case, ready for a build decision"],
      format: "Delivered by a senior team combining process design, AI engineering and data. Scope and duration are sized to the organization and the number of processes in play.",
      faq: [
        { question: "Is the AI Opportunity Sprint a sales exercise for a build project?", answer: "No. The Sprint produces a decision-grade plan you can execute with us or with another team. Opportunities that are not worth building are documented as such." },
        { question: "What do you need from us?", answer: "An executive sponsor and access to the people who run the processes in scope. Plus read access to the relevant systems and sample documents, under an NDA." },
        { question: "How is this different from an AI strategy deck?", answer: "The output includes architecture sketches, integration needs, human-approval points and an evaluation approach per opportunity. It is written so an engineering team can start on Monday." },
        { question: "Which model providers do you use?", answer: "We are model-agnostic. The Sprint recommends providers and models per workflow based on quality, cost, data residency and your existing agreements, and the build keeps them swappable." },
      ],
    },
    "agentic-workflow-systems": {
      name: "Agentic Workflow Systems", eyebrow: "Offer · Build",
      headline: "Redesign a business workflow as a production system that combines automation, AI, agents and human approval.",
      summary: "We take one prioritized workflow end to end: redesign, architecture, build, integration, evaluation and launch, with your team involved at every approval point.",
      forWhom: ["Operations, service or revenue leaders with a specific workflow that is expensive, slow or error-prone.", "Organizations that have completed discovery (ours or theirs) and need an engineering partner to reach production."],
      phases: [
        { name: "Redesign", short: "Explicit states, owners, exceptions, typed steps.", description: "Target workflow with explicit states, owners, exceptions and the deterministic / AI / agent / human classification of every step." },
        { name: "Build", short: "Integration, orchestration, reviewer interfaces, observability.", description: "Integration with systems of record, orchestration, agent tooling with bounded permissions, reviewer interfaces and observability." },
        { name: "Evaluate and launch", short: "Evaluation set, controlled pilot, quality gates, rollout.", description: "Evaluation set from real cases, pilot with a controlled group, quality gates, then production rollout with runbooks." },
      ],
      deliverables: ["Production workflow system integrated with your tools", "Evaluation set and quality dashboard", "Approval and escalation design", "Documentation, runbooks and handover"],
      format: "Fixed-scope build for one workflow, followed by Managed AI or a handover to your team.",
    },
    "enterprise-knowledge-document-ai": {
      name: "Enterprise Knowledge + Document AI", eyebrow: "Offer · Build",
      headline: "Turn fragmented knowledge and document-heavy processes into intelligent operational systems.",
      summary: "Deployment of a governed knowledge system, a document intelligence pipeline, or both, connected to your repositories and systems of record.",
      forWhom: ["Organizations where teams search for answers across many repositories and experts.", "Operations that process large volumes of invoices, claims, contracts, forms or onboarding files."],
      phases: [
        { name: "Foundation", short: "Sources, permissions, taxonomy, first evaluation set.", description: "Source inventory, permissions model, document taxonomy and the first evaluation set from real questions or documents." },
        { name: "Deployment", short: "Ingestion, retrieval or extraction, validation, citations.", description: "Ingestion pipelines, retrieval or extraction, validation against systems of record, reviewer interfaces and citations." },
        { name: "Adoption and quality", short: "Rollout by team, feedback loops, quality reporting.", description: "Rollout by team, feedback loops to content owners, quality reporting and tuning." },
      ],
      deliverables: ["Governed knowledge system and/or document pipeline in production", "Permissions-aware retrieval", "Evaluation set and quality baseline", "Content-owner feedback workflow"],
      format: "Scoped by repositories, document types and volumes. Typically followed by Managed AI.",
    },
    "managed-ai": {
      name: "Managed AI", eyebrow: "Offer · Operate",
      headline: "Operate, monitor, evaluate, optimize and improve production AI systems.",
      summary: "An ongoing service with one accountable team for the AI systems in your operation, whether we built them or not.",
      forWhom: ["Organizations with AI systems in production that need reliability, cost control and continuous improvement.", "Teams that want to expand autonomy safely as evaluation data accumulates."],
      phases: [
        { name: "Onboard", short: "Observability, evaluation sets, runbooks, baselines.", description: "Observability, evaluation sets and runbooks in place for every system in scope; baseline for quality, cost and usage." },
        { name: "Operate", short: "Monitoring, incidents, exception reviews, evaluated updates.", description: "Monitoring, incident response, exception reviews, provider and model updates evaluated before rollout." },
        { name: "Improve", short: "Prioritized improvement backlog delivered in cycles.", description: "A prioritized improvement backlog from real exceptions and feedback, delivered in regular cycles." },
      ],
      deliverables: ["Monthly quality, cost and usage report", "Evaluated change management", "Improvement cycles", "Governance documentation"],
      format: "Monthly service with response commitments agreed per system.",
    },
    "digital-growth-system": {
      name: "Digital Growth System", eyebrow: "Offer · Build",
      headline: "Build or rebuild the digital environment and the demand engine that runs on it.",
      summary: "Brand, site, content, campaigns and measurement delivered as one system, then operated with your team. The AI layer is applied where it shortens cycles: research, creative variants, lead qualification and reporting.",
      forWhom: ["Companies whose brand and digital presence no longer match where the business is going.", "Marketing teams carrying campaign operation and creative production without engineering support.", "Leaders who want spend decisions defensible with data they own."],
      phases: [
        { name: "Diagnose", short: "Brand, presence, channels and data, assessed against the business goal.", description: "Audit of positioning, digital presence, channels, creative and measurement. We document what is working, what is missing and what the data cannot currently answer." },
        { name: "Build", short: "Brand system, digital environment, campaign engine and measurement.", description: "Positioning and brand system, site and landing pages, content plan, campaign structure across channels, creative production process and end-to-end measurement wired to the CRM." },
        { name: "Operate", short: "Campaigns run, creative iterated, budget optimized, results reported.", description: "Campaign operation with budget rules and approval gates, creative iteration informed by performance, and monthly reporting against business KPIs rather than channel vanity metrics." },
      ],
      deliverables: ["Positioning and brand system", "Site and landing pages in production", "Content and campaign engine across channels", "Creative production process with AI assistance", "Measurement and attribution wired to the CRM"],
      format: "Delivered by a senior marketing team working alongside AI engineering. Scoped by the state of the current presence and the channels in play.",
    },
  },
  es: {
    "ai-opportunity-sprint": {
      name: "AI Opportunity Sprint", eyebrow: "Oferta · Descubrir",
      headline: "Un proyecto estructurado para identificar, evaluar y priorizar las oportunidades de IA que vale la pena construir.",
      summary: "El Sprint reemplaza la exploración abierta de IA por una decisión: qué procesos, en qué orden, con qué arquitectura y con qué caso de negocio. Es la puerta de entrada a todo lo demás que hacemos.",
      forWhom: ["Equipos directivos con patrocinio ejecutivo y mandato para pasar de experimentos a producción.", "Organizaciones con procesos repetitivos, intensivos en documentos o multisistema, y costo operativo medible.", "Equipos que quieren un plan de nivel ingeniería antes de comprometer presupuesto en una construcción."],
      phases: [
        { name: "Mapear", short: "Cómo fluye realmente el trabajo, dónde espera, cuánto cuesta.", description: "Entrevistas con las personas que hacen el trabajo, recorridos de proceso, inventario de sistemas y datos. Documentamos cómo fluye realmente el trabajo, dónde espera y cuánto cuesta." },
        { name: "Puntuar", short: "Valor, viabilidad, preparación de datos, riesgo. Los descartes también se documentan.", description: "Cada oportunidad candidata se puntúa por valor de negocio, viabilidad, preparación de datos, riesgo y esfuerzo de cambio. Mostramos las que no pasan la prueba con la misma claridad que las que sí." },
        { name: "Diseñar", short: "Flujo objetivo, arquitectura, puntos de aprobación, caso de negocio.", description: "Para las oportunidades priorizadas: diseño del flujo objetivo, boceto de arquitectura, puntos de aprobación humana, enfoque de evaluación, necesidades de integración y un caso de negocio con supuestos explícitos." },
      ],
      deliverables: ["Mapa de procesos y oportunidades", "Portafolio de oportunidades puntuado y priorizado", "Bocetos de flujo objetivo y arquitectura para las principales oportunidades", "Enfoque de evaluación y gobierno por oportunidad", "Hoja de ruta y caso de negocio, listos para una decisión de construcción"],
      format: "Ejecutado por un equipo senior que combina diseño de procesos, ingeniería de IA y datos. El alcance y la duración se dimensionan según la organización y el número de procesos en juego.",
      faq: [
        { question: "¿El AI Opportunity Sprint es un ejercicio comercial para vender un proyecto de construcción?", answer: "No. El Sprint produce un plan de nivel decisión que puedes ejecutar con nosotros o con otro equipo. Las oportunidades que no vale la pena construir se documentan como tales." },
        { question: "¿Qué necesitan de nosotros?", answer: "Un patrocinador ejecutivo y acceso a las personas que operan los procesos en alcance. También acceso de lectura a los sistemas y documentos de muestra relevantes, bajo acuerdo de confidencialidad." },
        { question: "¿En qué se diferencia de una presentación de estrategia de IA?", answer: "El resultado incluye bocetos de arquitectura, necesidades de integración, puntos de aprobación humana y un enfoque de evaluación por oportunidad. Está escrito para que un equipo de ingeniería pueda empezar el lunes." },
        { question: "¿Qué proveedores de modelos usan?", answer: "Somos agnósticos de modelo. El Sprint recomienda proveedores y modelos por flujo según calidad, costo, residencia de datos y tus acuerdos existentes, y la construcción los mantiene intercambiables." },
      ],
    },
    "agentic-workflow-systems": {
      name: "Sistemas de flujos agénticos", eyebrow: "Oferta · Construir",
      headline: "Rediseñar un flujo de negocio como un sistema en producción que combina automatización, IA, agentes y aprobación humana.",
      summary: "Tomamos un flujo priorizado de punta a punta: rediseño, arquitectura, construcción, integración, evaluación y lanzamiento, con tu equipo involucrado en cada punto de aprobación.",
      forWhom: ["Líderes de operaciones, servicio o ingresos con un flujo específico que es caro, lento o propenso a errores.", "Organizaciones que ya completaron el descubrimiento (el nuestro o el suyo) y necesitan un socio de ingeniería para llegar a producción."],
      phases: [
        { name: "Rediseñar", short: "Estados, responsables, excepciones y pasos tipados explícitos.", description: "Flujo objetivo con estados, responsables y excepciones explícitos, y la clasificación determinista / IA / agente / humano de cada paso." },
        { name: "Construir", short: "Integración, orquestación, interfaces de revisión, observabilidad.", description: "Integración con sistemas de registro, orquestación, herramientas para agentes con permisos acotados, interfaces de revisión y observabilidad." },
        { name: "Evaluar y lanzar", short: "Conjunto de evaluación, piloto controlado, compuertas de calidad, despliegue.", description: "Conjunto de evaluación con casos reales, piloto con un grupo controlado, compuertas de calidad y despliegue a producción con runbooks." },
      ],
      deliverables: ["Sistema de flujo en producción integrado con tus herramientas", "Conjunto de evaluación y tablero de calidad", "Diseño de aprobación y escalamiento", "Documentación, runbooks y entrega"],
      format: "Construcción de alcance fijo para un flujo, seguida de Managed AI o de una entrega a tu equipo.",
    },
    "enterprise-knowledge-document-ai": {
      name: "Conocimiento empresarial + IA documental", eyebrow: "Oferta · Construir",
      headline: "Convertir el conocimiento fragmentado y los procesos intensivos en documentos en sistemas operativos inteligentes.",
      summary: "Despliegue de un sistema de conocimiento gobernado, un pipeline de inteligencia documental, o ambos, conectados a tus repositorios y sistemas de registro.",
      forWhom: ["Organizaciones donde los equipos buscan respuestas en muchos repositorios y expertos.", "Operaciones que procesan grandes volúmenes de facturas, siniestros, contratos, formularios o archivos de vinculación."],
      phases: [
        { name: "Fundación", short: "Fuentes, permisos, taxonomía, primer conjunto de evaluación.", description: "Inventario de fuentes, modelo de permisos, taxonomía documental y el primer conjunto de evaluación a partir de preguntas o documentos reales." },
        { name: "Despliegue", short: "Ingesta, recuperación o extracción, validación, citas.", description: "Pipelines de ingesta, recuperación o extracción, validación contra sistemas de registro, interfaces de revisión y citas." },
        { name: "Adopción y calidad", short: "Despliegue por equipo, ciclos de retroalimentación, reportes de calidad.", description: "Despliegue por equipo, ciclos de retroalimentación con los dueños del contenido, reportes de calidad y ajuste." },
      ],
      deliverables: ["Sistema de conocimiento gobernado y/o pipeline documental en producción", "Recuperación consciente de permisos", "Conjunto de evaluación y línea base de calidad", "Flujo de retroalimentación para dueños de contenido"],
      format: "Dimensionado por repositorios, tipos de documento y volúmenes. Normalmente seguido de Managed AI.",
    },
    "managed-ai": {
      name: "Managed AI", eyebrow: "Oferta · Operar",
      headline: "Operar, monitorear, evaluar, optimizar y mejorar sistemas de IA en producción.",
      summary: "Un servicio continuo con un solo equipo responsable de los sistemas de IA de tu operación, los hayamos construido nosotros o no.",
      forWhom: ["Organizaciones con sistemas de IA en producción que necesitan fiabilidad, control de costos y mejora continua.", "Equipos que quieren ampliar la autonomía con seguridad a medida que se acumulan datos de evaluación."],
      phases: [
        { name: "Incorporar", short: "Observabilidad, conjuntos de evaluación, runbooks, líneas base.", description: "Observabilidad, conjuntos de evaluación y runbooks en su lugar para cada sistema en alcance; línea base de calidad, costo y uso." },
        { name: "Operar", short: "Monitoreo, incidentes, revisión de excepciones, actualizaciones evaluadas.", description: "Monitoreo, respuesta a incidentes, revisión de excepciones, actualizaciones de proveedores y modelos evaluadas antes de desplegar." },
        { name: "Mejorar", short: "Backlog de mejora priorizado, entregado en ciclos.", description: "Un backlog de mejora priorizado a partir de excepciones reales y retroalimentación, entregado en ciclos regulares." },
      ],
      deliverables: ["Reporte mensual de calidad, costo y uso", "Gestión de cambios evaluada", "Ciclos de mejora", "Documentación de gobierno"],
      format: "Servicio mensual con compromisos de respuesta acordados por sistema.",
    },
    "digital-growth-system": {
      name: "Sistema de crecimiento digital", eyebrow: "Oferta · Construir",
      headline: "Construir o reconstruir el entorno digital y el motor de demanda que corre sobre él.",
      summary: "Marca, sitio, contenido, campañas y medición entregados como un solo sistema y luego operados con tu equipo. La capa de IA se aplica donde acorta ciclos: investigación, variantes creativas, calificación de leads y reportes.",
      forWhom: ["Empresas cuya marca y presencia digital ya no coinciden con hacia dónde va el negocio.", "Equipos de marketing que cargan la operación de campañas y la producción creativa sin apoyo de ingeniería.", "Líderes que quieren decisiones de inversión defendibles con datos propios."],
      phases: [
        { name: "Diagnosticar", short: "Marca, presencia, canales y datos, evaluados contra el objetivo de negocio.", description: "Auditoría de posicionamiento, presencia digital, canales, creatividades y medición. Documentamos qué funciona, qué falta y qué preguntas los datos no pueden responder hoy." },
        { name: "Construir", short: "Sistema de marca, entorno digital, motor de campañas y medición.", description: "Posicionamiento y sistema de marca, sitio y landing pages, plan de contenido y estructura de campañas por canal. Se suman el proceso de producción creativa y la medición de punta a punta conectada al CRM." },
        { name: "Operar", short: "Campañas en marcha, creatividades iteradas, presupuesto optimizado, resultados reportados.", description: "Operación de campañas con reglas de presupuesto y puntos de aprobación. La iteración creativa la guía el desempeño, y los reportes mensuales miden KPIs de negocio, no métricas de vanidad por canal." },
      ],
      deliverables: ["Posicionamiento y sistema de marca", "Sitio y landing pages en producción", "Motor de contenido y campañas por canal", "Proceso de producción creativa con asistencia de IA", "Medición y atribución conectadas al CRM"],
      format: "Ejecutado por un equipo senior de marketing junto a ingeniería de IA. Se dimensiona según el estado de la presencia actual y los canales en juego.",
    },
  },
  fr: {
    "ai-opportunity-sprint": {
      name: "AI Opportunity Sprint", eyebrow: "Offre · Découvrir",
      headline: "Une mission structurée pour identifier, évaluer et prioriser les opportunités d’IA qui méritent d’être construites.",
      summary: "Le Sprint remplace l’exploration ouverte de l’IA par une décision : quels processus, dans quel ordre, avec quelle architecture et quel dossier économique. C’est la porte d’entrée de tout ce que nous faisons.",
      forWhom: ["Des équipes dirigeantes avec un sponsor exécutif et un mandat pour passer des expériences à la production.", "Des organisations aux processus répétitifs, riches en documents ou multi-systèmes, avec un coût opérationnel mesurable.", "Des équipes qui veulent un plan de niveau ingénierie avant d’engager un budget de construction."],
      phases: [
        { name: "Cartographier", short: "Comment le travail circule vraiment, où il attend, ce qu’il coûte.", description: "Entretiens avec les personnes qui font le travail, parcours des processus, inventaire des systèmes et des données. Nous documentons comment le travail circule réellement, où il attend et ce qu’il coûte." },
        { name: "Noter", short: "Valeur, faisabilité, maturité des données, risque. Les échecs sont documentés aussi.", description: "Chaque opportunité candidate est notée sur la valeur métier, la faisabilité, la maturité des données, le risque et l’effort de changement. Nous montrons celles qui échouent au test aussi clairement que celles qui le passent." },
        { name: "Concevoir", short: "Flux cible, architecture, points d’approbation, dossier économique.", description: "Pour les opportunités priorisées : conception du flux cible, esquisse d’architecture, points d’approbation humaine, approche d’évaluation, besoins d’intégration et dossier économique avec hypothèses explicites." },
      ],
      deliverables: ["Carte des processus et des opportunités", "Portefeuille d’opportunités noté et priorisé", "Esquisses de flux cible et d’architecture pour les principales opportunités", "Approche d’évaluation et de gouvernance par opportunité", "Feuille de route et dossier économique, prêts pour une décision de construction"],
      format: "Mené par une équipe senior combinant conception de processus, ingénierie IA et données. Le périmètre et la durée sont dimensionnés selon l’organisation et le nombre de processus en jeu.",
      faq: [
        { question: "L’AI Opportunity Sprint est-il un exercice commercial pour vendre un projet de construction ?", answer: "Non. Le Sprint produit un plan de niveau décision que vous pouvez exécuter avec nous ou avec une autre équipe. Les opportunités qui ne méritent pas d’être construites sont documentées comme telles." },
        { question: "De quoi avez-vous besoin de notre part ?", answer: "Un sponsor exécutif et l’accès aux personnes qui opèrent les processus concernés. Plus un accès en lecture aux systèmes et documents d’exemple pertinents, sous accord de confidentialité." },
        { question: "En quoi est-ce différent d’une présentation de stratégie IA ?", answer: "Le résultat inclut des esquisses d’architecture, des besoins d’intégration, des points d’approbation humaine et une approche d’évaluation par opportunité. Il est écrit pour qu’une équipe d’ingénierie puisse démarrer lundi." },
        { question: "Quels fournisseurs de modèles utilisez-vous ?", answer: "Nous sommes agnostiques des modèles. Le Sprint recommande des fournisseurs et des modèles par flux, selon la qualité, le coût, la résidence des données et vos accords existants. La construction les garde interchangeables." },
      ],
    },
    "agentic-workflow-systems": {
      name: "Systèmes de flux agentiques", eyebrow: "Offre · Construire",
      headline: "Repenser un flux métier en système de production qui combine automatisation, IA, agents et approbation humaine.",
      summary: "Nous prenons un flux priorisé de bout en bout : refonte, architecture, construction, intégration, évaluation et lancement, avec votre équipe impliquée à chaque point d’approbation.",
      forWhom: ["Des responsables opérations, service ou revenus avec un flux précis, coûteux, lent ou sujet aux erreurs.", "Des organisations qui ont terminé la découverte (la nôtre ou la leur) et ont besoin d’un partenaire d’ingénierie pour atteindre la production."],
      phases: [
        { name: "Refonte", short: "États, responsables, exceptions et étapes typées explicites.", description: "Flux cible avec états, responsables et exceptions explicites, et classification déterministe / IA / agent / humain de chaque étape." },
        { name: "Construction", short: "Intégration, orchestration, interfaces de revue, observabilité.", description: "Intégration avec les systèmes de référence, orchestration, outillage d’agents avec permissions bornées, interfaces de revue et observabilité." },
        { name: "Évaluation et lancement", short: "Jeu d’évaluation, pilote contrôlé, portes de qualité, déploiement.", description: "Jeu d’évaluation issu de cas réels, pilote avec un groupe contrôlé, portes de qualité, puis déploiement en production avec runbooks." },
      ],
      deliverables: ["Système de flux en production intégré à vos outils", "Jeu d’évaluation et tableau de bord qualité", "Conception de l’approbation et de l’escalade", "Documentation, runbooks et passation"],
      format: "Construction à périmètre fixe pour un flux, suivie de Managed AI ou d’une passation à votre équipe.",
    },
    "enterprise-knowledge-document-ai": {
      name: "Connaissance d’entreprise + IA documentaire", eyebrow: "Offre · Construire",
      headline: "Transformer une connaissance fragmentée et des processus riches en documents en systèmes opérationnels intelligents.",
      summary: "Déploiement d’un système de connaissance gouverné, d’un pipeline d’intelligence documentaire, ou des deux, connectés à vos dépôts et systèmes de référence.",
      forWhom: ["Des organisations où les équipes cherchent des réponses dans de nombreux dépôts et auprès d’experts.", "Des opérations qui traitent de gros volumes de factures, sinistres, contrats, formulaires ou dossiers d’onboarding."],
      phases: [
        { name: "Fondation", short: "Sources, permissions, taxonomie, premier jeu d’évaluation.", description: "Inventaire des sources, modèle de permissions, taxonomie documentaire et premier jeu d’évaluation à partir de questions ou de documents réels." },
        { name: "Déploiement", short: "Ingestion, recherche ou extraction, validation, citations.", description: "Pipelines d’ingestion, recherche ou extraction, validation contre les systèmes de référence, interfaces de revue et citations." },
        { name: "Adoption et qualité", short: "Déploiement par équipe, boucles de retour, reporting qualité.", description: "Déploiement par équipe, boucles de retour vers les propriétaires du contenu, reporting qualité et réglage." },
      ],
      deliverables: ["Système de connaissance gouverné et/ou pipeline documentaire en production", "Recherche respectueuse des permissions", "Jeu d’évaluation et base de qualité", "Flux de retour pour les propriétaires du contenu"],
      format: "Dimensionné par dépôts, types de documents et volumes. Généralement suivi de Managed AI.",
    },
    "managed-ai": {
      name: "Managed AI", eyebrow: "Offre · Opérer",
      headline: "Opérer, surveiller, évaluer, optimiser et améliorer les systèmes d’IA en production.",
      summary: "Un service continu avec une seule équipe responsable des systèmes d’IA de votre opération, que nous les ayons construits ou non.",
      forWhom: ["Des organisations avec des systèmes d’IA en production qui ont besoin de fiabilité, de maîtrise des coûts et d’amélioration continue.", "Des équipes qui veulent étendre l’autonomie en toute sécurité à mesure que les données d’évaluation s’accumulent."],
      phases: [
        { name: "Intégrer", short: "Observabilité, jeux d’évaluation, runbooks, références.", description: "Observabilité, jeux d’évaluation et runbooks en place pour chaque système concerné ; référence de qualité, de coût et d’usage." },
        { name: "Opérer", short: "Surveillance, incidents, revue des exceptions, mises à jour évaluées.", description: "Surveillance, réponse aux incidents, revue des exceptions, mises à jour de fournisseurs et de modèles évaluées avant déploiement." },
        { name: "Améliorer", short: "Backlog d’amélioration priorisé, livré par cycles.", description: "Un backlog d’amélioration priorisé à partir des exceptions réelles et des retours, livré par cycles réguliers." },
      ],
      deliverables: ["Rapport mensuel de qualité, de coût et d’usage", "Gestion des changements évaluée", "Cycles d’amélioration", "Documentation de gouvernance"],
      format: "Service mensuel avec des engagements de réponse convenus par système.",
    },
    "digital-growth-system": {
      name: "Système de croissance digitale", eyebrow: "Offre · Construire",
      headline: "Construire ou reconstruire l’environnement digital et le moteur de demande qui tourne dessus.",
      summary: "Marque, site, contenu, campagnes et mesure livrés comme un seul système, puis opérés avec votre équipe. La couche IA s’applique là où elle raccourcit les cycles : recherche, variantes créatives, qualification des leads et reporting.",
      forWhom: ["Des entreprises dont la marque et la présence digitale ne correspondent plus à la direction prise par l’activité.", "Des équipes marketing qui portent l’exploitation des campagnes et la production créative sans appui d’ingénierie.", "Des dirigeants qui veulent des décisions d’investissement défendables avec leurs propres données."],
      phases: [
        { name: "Diagnostiquer", short: "Marque, présence, canaux et données, évalués face à l’objectif métier.", description: "Audit du positionnement, de la présence digitale, des canaux, des créations et de la mesure. Nous documentons ce qui fonctionne, ce qui manque et les questions auxquelles les données ne répondent pas aujourd’hui." },
        { name: "Construire", short: "Système de marque, environnement digital, moteur de campagnes et mesure.", description: "Positionnement et système de marque, site et landing pages, plan de contenu et structure de campagnes par canal. S’y ajoutent le processus de production créative et la mesure de bout en bout reliée au CRM." },
        { name: "Opérer", short: "Campagnes diffusées, créations itérées, budget optimisé, résultats rapportés.", description: "Exploitation des campagnes avec règles de budget et portes d’approbation. L’itération créative est guidée par la performance, et le reporting mensuel porte sur les KPI métier, pas sur des métriques de vanité par canal." },
      ],
      deliverables: ["Positionnement et système de marque", "Site et landing pages en production", "Moteur de contenu et de campagnes par canal", "Processus de production créative assisté par l’IA", "Mesure et attribution reliées au CRM"],
      format: "Mené par une équipe marketing senior aux côtés de l’ingénierie IA. Dimensionné selon l’état de la présence actuelle et les canaux en jeu.",
    },
  },
};

export function getOffers(locale: Locale): Offer[] {
  return base.map((b) => ({ ...b, ...text[locale][b.slug] }));
}
export const offerSlugs = base.map((b) => b.slug);
export const getOffer = (locale: Locale, slug: string) => getOffers(locale).find((o) => o.slug === slug);
export const getPrimaryOffer = (locale: Locale) => getOffers(locale).find((o) => o.primary)!;
