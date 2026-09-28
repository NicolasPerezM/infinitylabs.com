import type { Locale } from "@/i18n/config";
import type { Stage } from "./operating-model";

export type StepKind = "input" | "deterministic" | "ai" | "agent" | "human" | "output";
export type SolutionDiagramStep = { label: string; kind: StepKind };

export type Solution = {
  slug: string;
  stageEmphasis: Stage;
  capabilities: string[];
  offers: string[];
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  problem: string[];
  build: string[];
  outcomes: string[];
  environments: string[];
  diagram: SolutionDiagramStep[];
};

type Base = { slug: string; stageEmphasis: Stage; capabilities: string[]; offers: string[]; kinds: StepKind[] };
type Text = { name: string; eyebrow: string; headline: string; summary: string; problem: string[]; build: string[]; outcomes: string[]; environments: string[]; steps: string[] };

const base: Base[] = [
  { slug: "knowledge-ai", stageEmphasis: "build", capabilities: ["ai-engineering", "data-ai", "ai-evaluation", "managed-ai"], offers: ["enterprise-knowledge-document-ai", "managed-ai"], kinds: ["input", "deterministic", "ai", "ai", "human", "output"] },
  { slug: "document-intelligence", stageEmphasis: "build", capabilities: ["ai-engineering", "agentic-systems", "ai-evaluation", "managed-ai"], offers: ["enterprise-knowledge-document-ai", "managed-ai"], kinds: ["input", "ai", "deterministic", "human", "deterministic", "output"] },
  { slug: "customer-operations", stageEmphasis: "operate", capabilities: ["agentic-systems", "ai-engineering", "ai-evaluation", "managed-ai"], offers: ["agentic-workflow-systems", "managed-ai"], kinds: ["input", "ai", "deterministic", "agent", "human", "output"] },
  { slug: "revenue-systems", stageEmphasis: "build", capabilities: ["agentic-systems", "data-ai", "ai-evaluation"], offers: ["agentic-workflow-systems", "ai-opportunity-sprint"], kinds: ["input", "agent", "deterministic", "ai", "human", "output"] },
  { slug: "intelligent-operations", stageEmphasis: "operate", capabilities: ["ai-transformation", "agentic-systems", "ai-engineering", "managed-ai"], offers: ["ai-opportunity-sprint", "agentic-workflow-systems", "managed-ai"], kinds: ["input", "deterministic", "ai", "human", "agent", "output"] },
  { slug: "marketing-systems", stageEmphasis: "operate", capabilities: ["growth-engineering", "data-ai", "agentic-systems", "managed-ai"], offers: ["digital-growth-system", "managed-ai"], kinds: ["input", "human", "deterministic", "ai", "agent", "output"] },
];

const text: Record<Locale, Record<string, Text>> = {
  en: {
    "knowledge-ai": {
      name: "Enterprise Knowledge",
      eyebrow: "Solution",
      headline: "Answers with sources, permissions and a quality score. Not a chatbot over a folder.",
      summary: "A governed knowledge system that lets teams ask questions across policies, procedures, contracts and internal expertise, and get answers they can verify and act on.",
      problem: [
        "Knowledge lives in drives, wikis, tickets, inboxes and a few experienced people. The same questions are answered again every week.",
        "Onboarding is slow because nobody can point to a single current version of how things are done.",
        "Decisions get made on outdated policy because the latest one was never found.",
      ],
      build: [
        "Ingestion pipelines that keep the knowledge base current from your document stores and systems.",
        "Retrieval that respects existing permissions: people only get answers from what they are allowed to read.",
        "Answers with citations, confidence handling and an explicit “I don’t know” path.",
        "An evaluation set built from real questions, run on every change to models, prompts or content.",
        "Feedback loops that route wrong or missing answers to the owners of the content.",
      ],
      outcomes: ["Faster resolution of internal and customer questions", "Consistent answers across teams and channels", "Less dependence on a handful of experts", "A measurable quality baseline you can report on"],
      environments: ["SharePoint, Google Drive, Confluence, Notion", "Policy and procedure libraries", "Contracts and legal repositories", "Helpdesk and ticketing history"],
      steps: ["Question", "Permission check", "Retrieve sources", "Compose answer + citations", "Low confidence → expert", "Answer + feedback"],
    },
    "document-intelligence": {
      name: "Document Intelligence",
      eyebrow: "Solution",
      headline: "Turn document-heavy processes into controlled pipelines with human review where it matters.",
      summary: "Extraction, classification, validation and routing for invoices, claims, contracts, forms and onboarding files, with confidence thresholds, exception queues and an audit trail.",
      problem: ["High volumes of documents are read, re-typed and checked by people, one at a time.", "Errors surface late, in the ERP or in front of the customer.", "Peaks create backlogs; hiring for peaks is expensive and slow."],
      build: [
        "Document classification and structured extraction tuned to your document types.",
        "Validation against your systems of record: master data, prices, policies, business rules.",
        "Confidence thresholds that decide what flows automatically and what goes to a review queue.",
        "A reviewer interface that captures corrections and turns them into evaluation data.",
        "End-to-end traceability: which document, which version, which rule, who approved.",
      ],
      outcomes: ["Shorter cycle times from receipt to posting or decision", "Fewer downstream errors and reworks", "Capacity that scales with volume instead of headcount", "A defensible audit trail for every automated decision"],
      environments: ["Invoices, purchase orders, remittances", "Claims, forms, KYC and onboarding files", "Contracts and amendments", "ERP, DMS and workflow tools"],
      steps: ["Inbound document", "Classify + extract", "Validate vs. ERP rules", "Exception review", "Post to system", "Monitor quality"],
    },
    "customer-operations": {
      name: "Customer Operations",
      eyebrow: "Solution",
      headline: "AI-assisted and AI-handled service tiers, with escalation and quality control designed in.",
      summary: "Support and service operations where the system resolves routine requests. Complex ones reach a person with the context already prepared, and every interaction is measured for quality.",
      problem: ["Agents spend most of their time on lookups, drafting and repetitive requests instead of on the cases that need judgment.", "Service quality varies by person, shift and channel.", "Volume grows faster than the team, and SLAs slip during peaks."],
      build: [
        "Intent detection and routing across email, chat, WhatsApp and web forms.",
        "Resolution workflows connected to CRM, helpdesk, order and billing systems.",
        "Assist mode for agents (drafts, summaries, next-best action) and autonomous mode for well-bounded requests.",
        "Escalation rules with full context handover to a person.",
        "Response quality evaluation and monitoring by intent, channel and outcome.",
      ],
      outcomes: ["Faster first response and resolution for routine requests", "More agent capacity for complex, high-value cases", "Consistent tone and policy compliance across channels", "Visibility into what the system handles and what it escalates"],
      environments: ["Helpdesk and CRM platforms", "WhatsApp Business, email, web chat", "Order, billing and logistics systems", "Knowledge bases and policies"],
      steps: ["Customer request", "Classify intent", "Fetch account context", "Resolve or draft", "Escalate with context", "Reply + QA score"],
    },
    "revenue-systems": {
      name: "Revenue Systems",
      eyebrow: "Solution",
      headline: "Research, qualification and proposal workflows that keep the CRM honest and the team selling.",
      summary: "Systems that prepare account research, qualify inbound demand, draft proposals and keep records current. Revenue teams spend their time in conversations, not in tabs.",
      problem: ["Leads wait hours or days for a first qualified response.", "Proposals and account research are rebuilt from scratch by every rep.", "CRM data decays because updating it competes with selling."],
      build: [
        "Inbound qualification workflows with clear handoff rules to people.",
        "Account and contact research assembled from approved sources into a briefing.",
        "Proposal and quote drafting from your templates, pricing rules and past deals, with approval steps.",
        "CRM hygiene automations: enrichment, deduplication, stage and activity updates.",
        "Pipeline analytics that separate system-generated from human-generated activity.",
      ],
      outcomes: ["Shorter time from inquiry to qualified conversation", "More consistent proposals with less rep effort", "A CRM that reflects reality", "Clear measurement of where AI assistance changes conversion"],
      environments: ["CRM platforms and sales engagement tools", "Marketing automation and web forms", "Pricing and CPQ rules", "Email and calendar"],
      steps: ["Inbound lead", "Enrich + research", "Qualify vs. ICP rules", "Draft proposal", "Rep approval", "CRM updated"],
    },
    "intelligent-operations": {
      name: "Intelligent Operations",
      eyebrow: "Solution",
      headline: "Back-office processes redesigned as orchestrated workflows: automation, AI and approvals in one system.",
      summary: "Procurement, finance, HR and compliance processes where manual handoffs are replaced by an orchestrated workflow, with AI applied only to the steps that need judgment.",
      problem: ["Processes span five tools and three teams, held together by email and spreadsheets.", "Nobody can say where a request is, or why it stopped.", "Controls are enforced by memory and by the audit at year end."],
      build: [
        "Process redesign with explicit states, owners and exception paths.",
        "Orchestration that combines deterministic automation, AI steps and approval gates.",
        "Integration with ERP, HRIS, procurement and ticketing systems.",
        "Operational dashboards: throughput, cycle time, exceptions, cost per transaction.",
        "Governance built in: who can approve what, and a record of every decision.",
      ],
      outcomes: ["Predictable cycle times and fewer stalled requests", "Lower cost per transaction as volume grows", "Controls that are enforced by the system, not by reminders", "One place to see the state of the process"],
      environments: ["ERP, HRIS and procurement suites", "Ticketing and workflow tools", "Spreadsheets and email-driven processes", "Reporting and compliance requirements"],
      steps: ["Request", "Validate + enrich", "Assess + recommend", "Approval gate", "Execute in systems", "Dashboard + audit"],
    },
    "marketing-systems": {
      name: "Marketing Systems",
      eyebrow: "Solution",
      headline: "From positioning to qualified lead, run as one measured system.",
      summary: "Brand, digital presence, content and media operated as a single instrumented system. A marketing team works inside the same engineering discipline we apply to operations, so every campaign is measurable and every lead arrives qualified.",
      problem: [
        "Brand, website, content and campaigns are built by different hands and stop matching each other.",
        "Reporting proves that money was spent. It does not show which decision produced which pipeline.",
        "Creative production and campaign operation absorb the team, so testing stops when the calendar gets busy.",
      ],
      build: [
        "Positioning, messaging and a brand system your team can apply without asking permission.",
        "The digital environment: site, landing pages and content, built to rank and to convert.",
        "Campaign operation across search, social and programmatic, with budget rules and approval gates.",
        "AI-assisted creative production: variants generated inside brand rules, reviewed before they run.",
        "Market and competitor research feeding the plan, and lead qualification feeding the CRM.",
        "Measurement wired end to end: from first touch to qualified opportunity, in your own dashboard.",
      ],
      outcomes: [
        "One system from brand to lead instead of disconnected suppliers",
        "Faster creative and campaign cycles without losing brand control",
        "Leads that reach sales already qualified and enriched",
        "Spend decisions defensible with data you own",
      ],
      environments: ["Brand, website and landing pages", "SEO, content and organic channels", "Search, social and programmatic media", "CRM, analytics and attribution"],
      steps: ["Market and competitor signals", "Positioning and brand system", "Site, landings and content", "Creative variants", "Campaigns and bidding", "Qualified lead in CRM"],
    },
  },
  es: {
    "knowledge-ai": {
      name: "Conocimiento empresarial",
      eyebrow: "Solución",
      headline: "Respuestas con fuentes, permisos y una puntuación de calidad. No un chatbot sobre una carpeta.",
      summary: "Un sistema de conocimiento gobernado que permite a los equipos preguntar sobre políticas, procedimientos, contratos y experiencia interna, y obtener respuestas que pueden verificar y usar.",
      problem: [
        "El conocimiento vive en unidades compartidas, wikis, tickets, bandejas de entrada y unas pocas personas con experiencia. Las mismas preguntas se responden de nuevo cada semana.",
        "La incorporación es lenta porque nadie puede señalar una única versión vigente de cómo se hacen las cosas.",
        "Se toman decisiones con políticas desactualizadas porque la última nunca se encontró.",
      ],
      build: [
        "Pipelines de ingesta que mantienen la base de conocimiento al día desde tus repositorios y sistemas.",
        "Recuperación que respeta los permisos existentes: cada persona recibe respuestas solo de lo que puede leer.",
        "Respuestas con citas, manejo de confianza y una ruta explícita de “no lo sé”.",
        "Un conjunto de evaluación construido con preguntas reales, ejecutado en cada cambio de modelos, prompts o contenido.",
        "Ciclos de retroalimentación que envían las respuestas erróneas o faltantes a los dueños del contenido.",
      ],
      outcomes: ["Resolución más rápida de preguntas internas y de clientes", "Respuestas consistentes entre equipos y canales", "Menos dependencia de un puñado de expertos", "Una línea base de calidad medible sobre la que puedes reportar"],
      environments: ["SharePoint, Google Drive, Confluence, Notion", "Bibliotecas de políticas y procedimientos", "Contratos y repositorios legales", "Historial de mesa de ayuda y tickets"],
      steps: ["Pregunta", "Verificar permisos", "Recuperar fuentes", "Redactar respuesta + citas", "Baja confianza → experto", "Respuesta + retroalimentación"],
    },
    "document-intelligence": {
      name: "Inteligencia documental",
      eyebrow: "Solución",
      headline: "Convierte procesos intensivos en documentos en pipelines controlados con revisión humana donde importa.",
      summary: "Extracción, clasificación, validación y enrutamiento de facturas, siniestros, contratos, formularios y archivos de vinculación, con umbrales de confianza, colas de excepciones y trazabilidad de auditoría.",
      problem: ["Grandes volúmenes de documentos se leen, se transcriben y se revisan a mano, uno por uno.", "Los errores aparecen tarde, en el ERP o frente al cliente.", "Los picos generan atrasos; contratar para los picos es caro y lento."],
      build: [
        "Clasificación de documentos y extracción estructurada ajustada a tus tipos de documento.",
        "Validación contra tus sistemas de registro: datos maestros, precios, políticas, reglas de negocio.",
        "Umbrales de confianza que deciden qué fluye automáticamente y qué va a una cola de revisión.",
        "Una interfaz de revisión que captura correcciones y las convierte en datos de evaluación.",
        "Trazabilidad de punta a punta: qué documento, qué versión, qué regla, quién aprobó.",
      ],
      outcomes: ["Tiempos de ciclo más cortos desde la recepción hasta la contabilización o la decisión", "Menos errores y retrabajos aguas abajo", "Capacidad que escala con el volumen y no con la plantilla", "Una traza de auditoría defendible para cada decisión automatizada"],
      environments: ["Facturas, órdenes de compra, remesas", "Siniestros, formularios, KYC y archivos de vinculación", "Contratos y adendas", "ERP, gestores documentales y herramientas de flujo"],
      steps: ["Documento entrante", "Clasificar + extraer", "Validar contra reglas del ERP", "Revisión de excepciones", "Registrar en el sistema", "Monitorear calidad"],
    },
    "customer-operations": {
      name: "Operaciones de clientes",
      eyebrow: "Solución",
      headline: "Niveles de servicio asistidos y atendidos por IA, con escalamiento y control de calidad diseñados desde el inicio.",
      summary: "Operaciones de soporte y servicio donde el sistema resuelve las solicitudes rutinarias. Las complejas llegan a una persona con el contexto ya preparado, y cada interacción se mide en calidad.",
      problem: ["Los agentes dedican la mayor parte del tiempo a búsquedas, redacción y solicitudes repetitivas en lugar de a los casos que requieren criterio.", "La calidad del servicio varía según la persona, el turno y el canal.", "El volumen crece más rápido que el equipo y los SLA se incumplen en los picos."],
      build: [
        "Detección de intención y enrutamiento en correo, chat, WhatsApp y formularios web.",
        "Flujos de resolución conectados a CRM, mesa de ayuda, pedidos y facturación.",
        "Modo asistido para agentes (borradores, resúmenes, siguiente mejor acción) y modo autónomo para solicitudes bien acotadas.",
        "Reglas de escalamiento con traspaso completo del contexto a una persona.",
        "Evaluación y monitoreo de la calidad de las respuestas por intención, canal y resultado.",
      ],
      outcomes: ["Primera respuesta y resolución más rápidas en solicitudes rutinarias", "Más capacidad de los agentes para casos complejos y de alto valor", "Tono consistente y cumplimiento de políticas en todos los canales", "Visibilidad de qué atiende el sistema y qué escala"],
      environments: ["Plataformas de mesa de ayuda y CRM", "WhatsApp Business, correo, chat web", "Sistemas de pedidos, facturación y logística", "Bases de conocimiento y políticas"],
      steps: ["Solicitud del cliente", "Clasificar intención", "Traer contexto de la cuenta", "Resolver o redactar", "Escalar con contexto", "Respuesta + puntuación de calidad"],
    },
    "revenue-systems": {
      name: "Sistemas de ingresos",
      eyebrow: "Solución",
      headline: "Flujos de investigación, calificación y propuestas que mantienen el CRM honesto y al equipo vendiendo.",
      summary: "Sistemas que preparan la investigación de cuentas, califican la demanda entrante, redactan propuestas y mantienen los registros al día. Los equipos comerciales pasan el tiempo en conversaciones, no en pestañas.",
      problem: ["Los leads esperan horas o días por una primera respuesta calificada.", "Cada comercial reconstruye desde cero las propuestas y la investigación de cuentas.", "Los datos del CRM se degradan porque actualizarlos compite con vender."],
      build: [
        "Flujos de calificación de entrada con reglas claras de traspaso a personas.",
        "Investigación de cuentas y contactos ensamblada desde fuentes aprobadas en un briefing.",
        "Redacción de propuestas y cotizaciones a partir de tus plantillas, reglas de precios y negocios anteriores, con pasos de aprobación.",
        "Automatizaciones de higiene del CRM: enriquecimiento, deduplicación, actualización de etapas y actividades.",
        "Analítica de pipeline que separa la actividad generada por el sistema de la generada por personas.",
      ],
      outcomes: ["Menos tiempo entre la consulta y una conversación calificada", "Propuestas más consistentes con menos esfuerzo del comercial", "Un CRM que refleja la realidad", "Medición clara de dónde la asistencia de IA cambia la conversión"],
      environments: ["Plataformas de CRM y herramientas de sales engagement", "Automatización de marketing y formularios web", "Reglas de precios y CPQ", "Correo y calendario"],
      steps: ["Lead entrante", "Enriquecer + investigar", "Calificar contra reglas de ICP", "Redactar propuesta", "Aprobación del comercial", "CRM actualizado"],
    },
    "intelligent-operations": {
      name: "Operaciones inteligentes",
      eyebrow: "Solución",
      headline: "Procesos de back-office rediseñados como flujos orquestados: automatización, IA y aprobaciones en un solo sistema.",
      summary: "Procesos de compras, finanzas, talento y cumplimiento donde un flujo orquestado reemplaza los traspasos manuales. La IA se aplica solo a los pasos que requieren criterio.",
      problem: ["Los procesos atraviesan cinco herramientas y tres equipos, sostenidos por correos y hojas de cálculo.", "Nadie puede decir dónde está una solicitud ni por qué se detuvo.", "Los controles se aplican de memoria y en la auditoría de fin de año."],
      build: [
        "Rediseño de procesos con estados, responsables y rutas de excepción explícitos.",
        "Orquestación que combina automatización determinista, pasos de IA y compuertas de aprobación.",
        "Integración con ERP, sistemas de talento, compras y tickets.",
        "Tableros operativos: rendimiento, tiempo de ciclo, excepciones, costo por transacción.",
        "Gobierno incorporado: quién puede aprobar qué y un registro de cada decisión.",
      ],
      outcomes: ["Tiempos de ciclo predecibles y menos solicitudes estancadas", "Menor costo por transacción a medida que crece el volumen", "Controles aplicados por el sistema, no por recordatorios", "Un solo lugar para ver el estado del proceso"],
      environments: ["Suites de ERP, talento y compras", "Herramientas de tickets y flujos", "Procesos basados en hojas de cálculo y correo", "Requisitos de reporte y cumplimiento"],
      steps: ["Solicitud", "Validar + enriquecer", "Evaluar + recomendar", "Compuerta de aprobación", "Ejecutar en los sistemas", "Tablero + auditoría"],
    },
    "marketing-systems": {
      name: "Sistemas de marketing",
      eyebrow: "Solución",
      headline: "Del posicionamiento al lead calificado, operado como un solo sistema medible.",
      summary: "Marca, presencia digital, contenido y medios operados como un sistema instrumentado. Un equipo de marketing trabaja con la misma disciplina de ingeniería que aplicamos a las operaciones: cada campaña se mide y cada lead llega calificado.",
      problem: [
        "La marca, el sitio, el contenido y las campañas los construyen manos distintas y dejan de coincidir entre sí.",
        "Los reportes demuestran que se gastó el presupuesto. No muestran qué decisión generó qué pipeline.",
        "La producción creativa y la operación de campañas absorben al equipo, así que las pruebas se detienen cuando el calendario aprieta.",
      ],
      build: [
        "Posicionamiento, mensajes y un sistema de marca que tu equipo puede aplicar sin pedir permiso.",
        "El entorno digital: sitio, landing pages y contenido, construidos para posicionar y para convertir.",
        "Operación de campañas en buscadores, redes y programática, con reglas de presupuesto y puntos de aprobación.",
        "Producción creativa asistida por IA: variantes generadas dentro de las reglas de marca y revisadas antes de salir.",
        "Investigación de mercado y competencia que alimenta el plan, y calificación de leads que alimenta el CRM.",
        "Medición conectada de punta a punta: del primer contacto a la oportunidad calificada, en un tablero propio.",
      ],
      outcomes: [
        "Un solo sistema de la marca al lead, en lugar de proveedores desconectados",
        "Ciclos creativos y de campaña más rápidos sin perder control de marca",
        "Leads que llegan a ventas ya calificados y enriquecidos",
        "Decisiones de inversión defendibles con datos propios",
      ],
      environments: ["Marca, sitio y landing pages", "SEO, contenido y canales orgánicos", "Medios en buscadores, redes y programática", "CRM, analítica y atribución"],
      steps: ["Señales de mercado y competencia", "Posicionamiento y marca", "Sitio, landings y contenido", "Variantes creativas", "Campañas y pujas", "Lead calificado en el CRM"],
    },
  },
  fr: {
    "knowledge-ai": {
      name: "Connaissance d’entreprise",
      eyebrow: "Solution",
      headline: "Des réponses sourcées, avec permissions et score de qualité. Pas un chatbot posé sur un dossier.",
      summary: "Un système de connaissance gouverné qui permet aux équipes d’interroger politiques, procédures, contrats et expertise interne, et d’obtenir des réponses vérifiables et exploitables.",
      problem: [
        "La connaissance vit dans des disques partagés, des wikis, des tickets, des boîtes mail et quelques personnes expérimentées. Les mêmes questions reçoivent une réponse chaque semaine.",
        "L’intégration des nouveaux est lente parce que personne ne peut désigner une version unique et à jour de la façon de faire.",
        "Des décisions sont prises sur des politiques obsolètes parce que la dernière version n’a jamais été trouvée.",
      ],
      build: [
        "Des pipelines d’ingestion qui maintiennent la base de connaissance à jour depuis vos dépôts et systèmes.",
        "Une recherche qui respecte les permissions existantes : chacun n’obtient de réponses que sur ce qu’il est autorisé à lire.",
        "Des réponses avec citations, gestion de la confiance et un chemin explicite « je ne sais pas ».",
        "Un jeu d’évaluation construit à partir de vraies questions, exécuté à chaque changement de modèle, de prompt ou de contenu.",
        "Des boucles de retour qui orientent les réponses fausses ou manquantes vers les propriétaires du contenu.",
      ],
      outcomes: ["Résolution plus rapide des questions internes et clients", "Des réponses cohérentes entre équipes et canaux", "Moins de dépendance à une poignée d’experts", "Une base de qualité mesurable sur laquelle rendre compte"],
      environments: ["SharePoint, Google Drive, Confluence, Notion", "Bibliothèques de politiques et de procédures", "Contrats et dépôts juridiques", "Historique helpdesk et tickets"],
      steps: ["Question", "Vérification des permissions", "Recherche des sources", "Rédaction réponse + citations", "Faible confiance → expert", "Réponse + retour"],
    },
    "document-intelligence": {
      name: "Intelligence documentaire",
      eyebrow: "Solution",
      headline: "Transformer les processus riches en documents en pipelines contrôlés, avec revue humaine là où ça compte.",
      summary: "Extraction, classification, validation et routage des factures, sinistres, contrats, formulaires et dossiers d’onboarding, avec seuils de confiance, files d’exceptions et piste d’audit.",
      problem: ["De gros volumes de documents sont lus, ressaisis et vérifiés par des personnes, un par un.", "Les erreurs apparaissent tard, dans l’ERP ou face au client.", "Les pics créent des retards ; recruter pour les pics est coûteux et lent."],
      build: [
        "Classification des documents et extraction structurée adaptées à vos types de documents.",
        "Validation contre vos systèmes de référence : données maîtres, prix, politiques, règles métier.",
        "Des seuils de confiance qui décident de ce qui passe automatiquement et de ce qui va en file de revue.",
        "Une interface de revue qui capture les corrections et les transforme en données d’évaluation.",
        "Traçabilité de bout en bout : quel document, quelle version, quelle règle, qui a approuvé.",
      ],
      outcomes: ["Des temps de cycle plus courts de la réception à la comptabilisation ou à la décision", "Moins d’erreurs et de reprises en aval", "Une capacité qui suit le volume plutôt que les effectifs", "Une piste d’audit défendable pour chaque décision automatisée"],
      environments: ["Factures, bons de commande, avis de paiement", "Sinistres, formulaires, KYC et dossiers d’onboarding", "Contrats et avenants", "ERP, GED et outils de workflow"],
      steps: ["Document entrant", "Classer + extraire", "Valider vs règles ERP", "Revue des exceptions", "Enregistrer dans le système", "Surveiller la qualité"],
    },
    "customer-operations": {
      name: "Opérations client",
      eyebrow: "Solution",
      headline: "Des niveaux de service assistés et pris en charge par l’IA, avec escalade et contrôle qualité intégrés.",
      summary: "Des opérations de support et de service où le système résout les demandes courantes. Les cas complexes arrivent à une personne avec le contexte déjà préparé, et chaque interaction est mesurée en qualité.",
      problem: ["Les agents passent l’essentiel de leur temps en recherches, rédaction et demandes répétitives plutôt que sur les cas qui demandent du jugement.", "La qualité de service varie selon la personne, l’équipe et le canal.", "Le volume croît plus vite que l’équipe et les SLA dérapent lors des pics."],
      build: [
        "Détection d’intention et routage sur e-mail, chat, WhatsApp et formulaires web.",
        "Des flux de résolution connectés au CRM, au helpdesk, aux commandes et à la facturation.",
        "Un mode assisté pour les agents (brouillons, résumés, meilleure action suivante) et un mode autonome pour les demandes bien bornées.",
        "Des règles d’escalade avec passation complète du contexte à une personne.",
        "Évaluation et suivi de la qualité des réponses par intention, canal et résultat.",
      ],
      outcomes: ["Première réponse et résolution plus rapides pour les demandes courantes", "Plus de capacité des agents pour les cas complexes à forte valeur", "Un ton cohérent et le respect des politiques sur tous les canaux", "Une visibilité sur ce que le système traite et ce qu’il escalade"],
      environments: ["Plateformes helpdesk et CRM", "WhatsApp Business, e-mail, chat web", "Systèmes de commandes, de facturation et de logistique", "Bases de connaissance et politiques"],
      steps: ["Demande client", "Classer l’intention", "Récupérer le contexte du compte", "Résoudre ou rédiger", "Escalader avec contexte", "Réponse + score qualité"],
    },
    "revenue-systems": {
      name: "Systèmes de revenus",
      eyebrow: "Solution",
      headline: "Des flux de recherche, de qualification et de propositions qui gardent le CRM honnête et l’équipe en train de vendre.",
      summary: "Des systèmes qui préparent la recherche sur les comptes, qualifient la demande entrante, rédigent des propositions et tiennent les fiches à jour. Les équipes commerciales passent leur temps en conversation, pas dans des onglets.",
      problem: ["Les leads attendent des heures ou des jours une première réponse qualifiée.", "Propositions et recherche sur les comptes sont refaites de zéro par chaque commercial.", "Les données CRM se dégradent parce que les mettre à jour concurrence la vente."],
      build: [
        "Des flux de qualification entrante avec des règles de passation claires vers les personnes.",
        "Une recherche sur les comptes et contacts assemblée depuis des sources approuvées en un briefing.",
        "La rédaction de propositions et de devis à partir de vos modèles, règles tarifaires et affaires passées, avec étapes d’approbation.",
        "Des automatisations d’hygiène CRM : enrichissement, dédoublonnage, mise à jour des étapes et activités.",
        "Une analytique du pipeline qui distingue l’activité générée par le système de celle des humains.",
      ],
      outcomes: ["Moins de temps entre la demande et une conversation qualifiée", "Des propositions plus cohérentes avec moins d’effort commercial", "Un CRM qui reflète la réalité", "Une mesure claire de l’effet de l’assistance IA sur la conversion"],
      environments: ["Plateformes CRM et outils de sales engagement", "Automatisation marketing et formulaires web", "Règles tarifaires et CPQ", "E-mail et agenda"],
      steps: ["Lead entrant", "Enrichir + rechercher", "Qualifier vs règles ICP", "Rédiger la proposition", "Approbation du commercial", "CRM mis à jour"],
    },
    "intelligent-operations": {
      name: "Opérations intelligentes",
      eyebrow: "Solution",
      headline: "Des processus back-office repensés en flux orchestrés : automatisation, IA et approbations dans un seul système.",
      summary: "Des processus achats, finance, RH et conformité où les passations manuelles sont remplacées par un flux orchestré, l’IA n’étant appliquée qu’aux étapes qui demandent du jugement.",
      problem: ["Les processus traversent cinq outils et trois équipes, tenus ensemble par des e-mails et des tableurs.", "Personne ne peut dire où en est une demande, ni pourquoi elle s’est arrêtée.", "Les contrôles reposent sur la mémoire et sur l’audit de fin d’année."],
      build: [
        "Une refonte des processus avec états, responsables et chemins d’exception explicites.",
        "Une orchestration qui combine automatisation déterministe, étapes IA et portes d’approbation.",
        "L’intégration avec l’ERP, le SIRH, les achats et la billetterie.",
        "Des tableaux de bord opérationnels : débit, temps de cycle, exceptions, coût par transaction.",
        "Une gouvernance intégrée : qui peut approuver quoi, et un enregistrement de chaque décision.",
      ],
      outcomes: ["Des temps de cycle prévisibles et moins de demandes bloquées", "Un coût par transaction plus bas à mesure que le volume croît", "Des contrôles appliqués par le système, pas par des rappels", "Un seul endroit pour voir l’état du processus"],
      environments: ["Suites ERP, SIRH et achats", "Outils de tickets et de workflow", "Processus pilotés par tableurs et e-mails", "Exigences de reporting et de conformité"],
      steps: ["Demande", "Valider + enrichir", "Évaluer + recommander", "Porte d’approbation", "Exécuter dans les systèmes", "Tableau de bord + audit"],
    },
    "marketing-systems": {
      name: "Systèmes marketing",
      eyebrow: "Solution",
      headline: "Du positionnement au lead qualifié, opéré comme un seul système mesuré.",
      summary: "Marque, présence digitale, contenu et médias opérés comme un système instrumenté. Une équipe marketing travaille avec la discipline d’ingénierie que nous appliquons aux opérations : chaque campagne se mesure et chaque lead arrive qualifié.",
      problem: [
        "La marque, le site, le contenu et les campagnes sont construits par des mains différentes et finissent par ne plus concorder.",
        "Les rapports prouvent que le budget a été dépensé. Ils ne montrent pas quelle décision a produit quel pipeline.",
        "La production créative et l’exploitation des campagnes absorbent l’équipe : les tests s’arrêtent dès que le calendrier se remplit.",
      ],
      build: [
        "Positionnement, messages et système de marque que votre équipe peut appliquer sans demander la permission.",
        "L’environnement digital : site, landing pages et contenu, construits pour être trouvés et pour convertir.",
        "Exploitation des campagnes en search, social et programmatique, avec règles de budget et portes d’approbation.",
        "Production créative assistée par l’IA : des variantes générées dans les règles de marque, revues avant diffusion.",
        "Recherche marché et concurrence qui alimente le plan, et qualification des leads qui alimente le CRM.",
        "Mesure câblée de bout en bout : du premier contact à l’opportunité qualifiée, dans votre propre tableau de bord.",
      ],
      outcomes: [
        "Un seul système de la marque au lead, au lieu de prestataires déconnectés",
        "Des cycles créatifs et de campagne plus rapides sans perdre le contrôle de la marque",
        "Des leads qui arrivent au commerce déjà qualifiés et enrichis",
        "Des décisions d’investissement défendables avec vos propres données",
      ],
      environments: ["Marque, site et landing pages", "SEO, contenu et canaux organiques", "Médias search, social et programmatique", "CRM, analytique et attribution"],
      steps: ["Signaux marché et concurrence", "Positionnement et marque", "Site, landings et contenu", "Variantes créatives", "Campagnes et enchères", "Lead qualifié dans le CRM"],
    },
  },
};

export function getSolutions(locale: Locale): Solution[] {
  return base.map((b) => {
    const t = text[locale][b.slug];
    return {
      slug: b.slug,
      stageEmphasis: b.stageEmphasis,
      capabilities: b.capabilities,
      offers: b.offers,
      name: t.name,
      eyebrow: t.eyebrow,
      headline: t.headline,
      summary: t.summary,
      problem: t.problem,
      build: t.build,
      outcomes: t.outcomes,
      environments: t.environments,
      diagram: b.kinds.map((kind, i) => ({ kind, label: t.steps[i] })),
    };
  });
}

export const solutionSlugs = base.map((b) => b.slug);
export const getSolution = (locale: Locale, slug: string) => getSolutions(locale).find((s) => s.slug === slug);
