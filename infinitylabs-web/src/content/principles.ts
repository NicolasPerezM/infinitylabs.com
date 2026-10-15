import type { Locale } from "@/i18n/config";

export type Principle = { name: string; statement: string; detail: string };

const principlesText: Record<Locale, Principle[]> = {
  en: [
    { name: "Business-first AI", statement: "Start from the process and the outcome.", detail: "Every system begins with a mapped process, a cost of the current way of working and a KPI the system is accountable for." },
    { name: "Minimum sufficient architecture", statement: "The simplest architecture that reliably meets business, scale, security and compliance requirements.", detail: "Fewer moving parts, fewer vendors, fewer surprises. Sophistication is measured in reliability." },
    { name: "Controlled autonomy", statement: "Autonomy is earned, one step at a time.", detail: "Each step is classified as deterministic, AI-assisted, agent-executed or human-approved. Autonomy expands only as evaluation proves it safe." },
    { name: "Evaluation first", statement: "Production AI must have measurable quality.", detail: "Every system ships with an evaluation set built from real cases, and every change is tested against it before release." },
    { name: "Tied to a business KPI", statement: "AI metrics must connect to business outcomes.", detail: "The goal is cycle time, cost per transaction, resolution rate and error rate. Accuracy serves them." },
    { name: "Model agnosticism", statement: "The right models and providers for each task, swappable behind evaluated interfaces.", detail: "Commercial and open-weight models are chosen per workflow on quality, cost, latency and data requirements, and can be replaced without a rebuild." },
    { name: "Production over demo", statement: "Success is a system running in production.", detail: "Integration, permissions, exceptions and operations are designed from the first week." },
    { name: "Continuous improvement", statement: "Deployment begins the operating phase.", detail: "Systems are monitored, evaluated and improved from real usage, with a named owner and a backlog." },
  ],
  es: [
    { name: "IA que parte del negocio", statement: "Partir del proceso y del resultado.", detail: "Cada sistema empieza con un proceso mapeado, un costo de la forma actual de trabajar y un KPI del que el sistema responde." },
    { name: "Arquitectura mínima suficiente", statement: "La arquitectura más simple que cumple con fiabilidad los requisitos de negocio, escala, seguridad y cumplimiento.", detail: "Menos piezas, menos proveedores, menos sorpresas. La sofisticación se mide en fiabilidad." },
    { name: "Autonomía controlada", statement: "La autonomía se gana paso a paso.", detail: "Cada paso se clasifica como determinista, asistido por IA, ejecutado por un agente o aprobado por una persona. La autonomía crece solo cuando la evaluación demuestra que es segura." },
    { name: "Primero, la evaluación", statement: "La IA en producción debe tener una calidad medible.", detail: "Cada sistema sale con un conjunto de evaluación construido con casos reales, y cada cambio se prueba contra él antes de desplegarse." },
    { name: "Atada a un KPI de negocio", statement: "Las métricas de IA deben conectarse con resultados de negocio.", detail: "La meta es el tiempo de ciclo, el costo por transacción, la tasa de resolución y la tasa de error. La exactitud está al servicio de eso." },
    { name: "Agnosticismo de modelo", statement: "Los modelos y proveedores correctos para cada tarea, intercambiables detrás de interfaces evaluadas.", detail: "Los modelos comerciales y de pesos abiertos se eligen por flujo según calidad, costo, latencia y requisitos de datos, y pueden reemplazarse sin reconstruir." },
    { name: "Producción antes que demo", statement: "El éxito es un sistema corriendo en producción.", detail: "Integración, permisos, excepciones y operación se diseñan desde la primera semana." },
    { name: "Mejora continua", statement: "El despliegue inicia la fase de operación.", detail: "Los sistemas se monitorean, evalúan y mejoran a partir del uso real, con un responsable con nombre y un backlog." },
  ],
  fr: [
    { name: "L’IA part du métier", statement: "Partir du processus et du résultat.", detail: "Chaque système commence par un processus cartographié, un coût de la façon actuelle de travailler et un KPI dont le système est responsable." },
    { name: "Architecture minimale suffisante", statement: "L’architecture la plus simple qui répond de façon fiable aux exigences métier, d’échelle, de sécurité et de conformité.", detail: "Moins de pièces, moins de fournisseurs, moins de surprises. La sophistication se mesure en fiabilité." },
    { name: "Autonomie contrôlée", statement: "L’autonomie se gagne, une étape à la fois.", detail: "Chaque étape est classée déterministe, assistée par l’IA, exécutée par un agent ou approuvée par une personne. L’autonomie ne s’étend que lorsque l’évaluation prouve qu’elle est sûre." },
    { name: "L’évaluation d’abord", statement: "L’IA en production doit avoir une qualité mesurable.", detail: "Chaque système est livré avec un jeu d’évaluation construit à partir de cas réels, et chaque changement est testé dessus avant mise en production." },
    { name: "Reliée à un KPI métier", statement: "Les métriques d’IA doivent se relier aux résultats métier.", detail: "L’objectif, ce sont le temps de cycle, le coût par transaction, le taux de résolution et le taux d’erreur. La précision est à leur service." },
    { name: "Agnosticisme des modèles", statement: "Les bons modèles et fournisseurs pour chaque tâche, interchangeables derrière des interfaces évaluées.", detail: "Les modèles commerciaux et à poids ouverts sont choisis par flux, selon la qualité, le coût, la latence et les exigences de données. Ils peuvent être remplacés sans reconstruction." },
    { name: "La production avant la démo", statement: "Le succès, c’est un système qui tourne en production.", detail: "Intégration, permissions, exceptions et exploitation sont conçues dès la première semaine." },
    { name: "Amélioration continue", statement: "Le déploiement ouvre la phase d’exploitation.", detail: "Les systèmes sont surveillés, évalués et améliorés à partir de l’usage réel, avec un responsable désigné et un backlog." },
  ],
};

export const getPrinciples = (locale: Locale) => principlesText[locale];

export type TechnologyArea = { area: string; description: string };

const technologyText: Record<Locale, TechnologyArea[]> = {
  en: [
    { area: "Models", description: "Commercial and open-weight models from multiple providers, selected per workflow and kept swappable." },
    { area: "Orchestration", description: "Workflow and agent orchestration with typed tools, bounded permissions and replayable traces." },
    { area: "Knowledge and documents", description: "Ingestion, retrieval, extraction and validation pipelines with permission propagation." },
    { area: "Evaluation and observability", description: "Versioned test sets, automated and human grading, tracing of cost, latency and quality." },
    { area: "Your systems of record", description: "CRM, ERP, helpdesk, document stores, messaging channels and data platforms, integrated through APIs and events." },
    { area: "Security and governance", description: "Access control, secrets management, audit trails and change management with evaluation gates." },
  ],
  es: [
    { area: "Modelos", description: "Modelos comerciales y de pesos abiertos de múltiples proveedores, elegidos por flujo y siempre intercambiables." },
    { area: "Orquestación", description: "Orquestación de flujos y agentes con herramientas tipadas, permisos acotados y trazas reproducibles." },
    { area: "Conocimiento y documentos", description: "Pipelines de ingesta, recuperación, extracción y validación con propagación de permisos." },
    { area: "Evaluación y observabilidad", description: "Conjuntos de prueba versionados, calificación automática y humana, trazabilidad de costo, latencia y calidad." },
    { area: "Tus sistemas de registro", description: "CRM, ERP, mesa de ayuda, repositorios documentales, canales de mensajería y plataformas de datos, integrados por APIs y eventos." },
    { area: "Seguridad y gobierno", description: "Control de acceso, gestión de secretos, trazas de auditoría y gestión de cambios con controles de evaluación." },
  ],
  fr: [
    { area: "Modèles", description: "Modèles commerciaux et à poids ouverts de plusieurs fournisseurs, choisis par flux et toujours interchangeables." },
    { area: "Orchestration", description: "Orchestration de flux et d’agents avec des outils typés, des permissions bornées et des traces rejouables." },
    { area: "Connaissance et documents", description: "Pipelines d’ingestion, de recherche, d’extraction et de validation avec propagation des permissions." },
    { area: "Évaluation et observabilité", description: "Jeux de tests versionnés, notation automatique et humaine, traçage du coût, de la latence et de la qualité." },
    { area: "Vos systèmes de référence", description: "CRM, ERP, helpdesk, dépôts documentaires, canaux de messagerie et plateformes de données, intégrés par API et événements." },
    { area: "Sécurité et gouvernance", description: "Contrôle d’accès, gestion des secrets, pistes d’audit et gestion des changements avec portes d’évaluation." },
  ],
};

export const getTechnologyPosture = (locale: Locale) => technologyText[locale];
