import type { Locale } from "@/i18n/config";

export type Stage = "discover" | "build" | "operate";
export const stageOrder: Stage[] = ["discover", "build", "operate"];
export const stageCode: Record<Stage, string> = { discover: "01", build: "02", operate: "03" };

export type StageDefinition = {
  id: Stage;
  code: string;
  name: string;
  promise: string;
  description: string;
  items: string[];
  method: string[];
  capabilities: string[];
};

const base: Record<Stage, { capabilities: string[] }> = {
  discover: { capabilities: ["ai-transformation"] },
  build: { capabilities: ["ai-engineering", "agentic-systems", "data-ai"] },
  operate: { capabilities: ["ai-evaluation", "managed-ai"] },
};

type Text = Omit<StageDefinition, "id" | "code" | "capabilities">;

const text: Record<Locale, Record<Stage, Text>> = {
  en: {
    discover: {
      name: "Discover",
      promise: "Find where AI creates measurable value in your processes, and where it does not.",
      description:
        "We start from the business process, not the model. Discovery maps how work actually flows and what the manual steps, exceptions and delays cost. Each opportunity is then scored on value, feasibility, data readiness and risk. The output is a prioritized roadmap with architecture sketches and a business case, not a slide about the future.",
      items: ["Opportunity discovery", "Readiness assessment", "Process mapping", "Roadmap and business case"],
      method: ["Discovery", "Architecture"],
    },
    build: {
      name: "Build",
      promise: "Engineer the system with the right mix of software, AI, agents and human approval.",
      description:
        "Build turns a prioritized opportunity into a production system, integrated with your systems of record. Every step gets a type: deterministic logic where rules are known, AI where judgment is needed, agents where autonomy is safe, a person where an error is expensive. Each system ships with an evaluation set and observability from the first release.",
      items: ["Agentic workflow systems", "Knowledge and document intelligence", "Data + AI foundations", "Integration and infrastructure"],
      method: ["Prototype", "Evaluate"],
    },
    operate: {
      name: "Operate",
      promise: "Run it as a living system: evaluated, observed, governed and improved.",
      description:
        "Deployment is the beginning of the operating phase, not the end of the engagement. We monitor quality and cost, and test every change against the same evaluation sets. Exceptions are reviewed with your team, and what we learn goes back into the system and the roadmap.",
      items: ["Managed AI", "Evaluation and quality gates", "Observability and cost control", "Continuous improvement"],
      method: ["Deploy", "Operate"],
    },
  },
  es: {
    discover: {
      name: "Descubrir",
      promise: "Encontrar dónde la IA crea valor medible en tus procesos, y dónde no.",
      description:
        "Partimos del proceso de negocio, no del modelo. El descubrimiento mapea cómo fluye realmente el trabajo y cuánto cuestan los pasos manuales, las excepciones y las demoras. Después puntuamos cada oportunidad por valor, viabilidad, preparación de datos y riesgo. El resultado es una hoja de ruta priorizada con bocetos de arquitectura y un caso de negocio, no una diapositiva sobre el futuro.",
      items: ["Descubrimiento de oportunidades", "Evaluación de preparación", "Mapeo de procesos", "Hoja de ruta y caso de negocio"],
      method: ["Descubrimiento", "Arquitectura"],
    },
    build: {
      name: "Construir",
      promise: "Construir el sistema con la mezcla correcta de software, IA, agentes y aprobación humana.",
      description:
        "Construir convierte una oportunidad priorizada en un sistema en producción, integrado con tus sistemas de registro. Cada paso recibe un tipo: lógica determinista donde las reglas se conocen, IA donde hace falta criterio, agentes donde la autonomía es segura y una persona donde el error cuesta caro. Cada sistema sale con un conjunto de evaluación y observabilidad desde la primera versión.",
      items: ["Sistemas de flujos agénticos", "Conocimiento e inteligencia documental", "Fundaciones de datos + IA", "Integración e infraestructura"],
      method: ["Prototipo", "Evaluación"],
    },
    operate: {
      name: "Operar",
      promise: "Ejecutarlo como un sistema vivo: evaluado, observado, gobernado y mejorado.",
      description:
        "El despliegue es el comienzo de la fase de operación, no el fin del proyecto. Monitoreamos calidad y costo, y probamos cada cambio contra los mismos conjuntos de evaluación. Las excepciones se revisan con tu equipo y lo aprendido vuelve al sistema y a la hoja de ruta.",
      items: ["Managed AI", "Evaluación y controles de calidad", "Observabilidad y control de costos", "Mejora continua"],
      method: ["Despliegue", "Operación"],
    },
  },
  fr: {
    discover: {
      name: "Découvrir",
      promise: "Trouver où l’IA crée une valeur mesurable dans vos processus, et où elle n’en crée pas.",
      description:
        "Nous partons du processus métier, pas du modèle. La découverte cartographie la circulation réelle du travail et le coût des étapes manuelles, des exceptions et des délais. Chaque opportunité est ensuite notée selon la valeur, la faisabilité, la maturité des données et le risque. Le résultat est une feuille de route priorisée avec des esquisses d’architecture et un dossier économique, pas une diapositive sur l’avenir.",
      items: ["Découverte d’opportunités", "Évaluation de maturité", "Cartographie des processus", "Feuille de route et dossier économique"],
      method: ["Découverte", "Architecture"],
    },
    build: {
      name: "Construire",
      promise: "Concevoir le système avec le bon mélange de logiciel, d’IA, d’agents et d’approbation humaine.",
      description:
        "Construire transforme une opportunité priorisée en système de production, intégré à vos systèmes de référence. Chaque étape reçoit un type : logique déterministe là où les règles sont connues, IA là où il faut du jugement, agents là où l’autonomie est sûre, une personne là où l’erreur coûte cher. Chaque système est livré avec un jeu d’évaluation et une observabilité dès la première version.",
      items: ["Systèmes de flux agentiques", "Connaissance et intelligence documentaire", "Fondations données + IA", "Intégration et infrastructure"],
      method: ["Prototype", "Évaluation"],
    },
    operate: {
      name: "Opérer",
      promise: "L’exploiter comme un système vivant : évalué, observé, gouverné et amélioré.",
      description:
        "Le déploiement est le début de la phase d’exploitation, pas la fin de la mission. Nous surveillons la qualité et les coûts, et testons chaque changement sur les mêmes jeux d’évaluation. Les exceptions sont revues avec votre équipe, et ce que nous apprenons revient dans le système et la feuille de route.",
      items: ["Managed AI", "Évaluation et portes de qualité", "Observabilité et maîtrise des coûts", "Amélioration continue"],
      method: ["Déploiement", "Exploitation"],
    },
  },
};

export function getOperatingModel(locale: Locale): StageDefinition[] {
  return stageOrder.map((id) => ({ id, code: stageCode[id], ...text[locale][id], capabilities: base[id].capabilities }));
}

export const stageColor: Record<Stage, { fill: string; soft: string; text: string }> = {
  discover: { fill: "bg-discover", soft: "bg-discover-soft", text: "text-discover-text" },
  build: { fill: "bg-build", soft: "bg-build-soft", text: "text-build-text" },
  operate: { fill: "bg-operate", soft: "bg-operate-soft", text: "text-operate-text" },
};
