import type { Locale } from "@/i18n/config";

/**
 * Copy for the illustrative product screens (DEC-026). Each solution gets one screen that shows
 * the system doing its job: the "show the product" moment. Every value is generic and every
 * screen is captioned as illustrative; nothing here is a client, a result or a metric.
 */
export type Shots = {
  knowledge: { app: string; status: string; question: string; answer: [string, string]; sources: [string, string]; permission: string; threshold: string };
  documents: { app: string; status: string; doc: string; fields: { name: string; value: string; ok: boolean }[]; validated: string; exception: string };
  customer: { app: string; channel: string; message: string; intents: [string, string]; context: string; resolved: string; escalated: string; quality: string };
  revenue: { app: string; status: string; company: string; size: string; fit: { name: string; state: string; ok: boolean }[]; brief: string; proposal: string; crm: string };
  operations: { app: string; id: string; steps: { name: string; state: "done" | "pending" | "next" }[]; pending: string; log: string };
  marketing: { app: string; chain: [string, string, string, string]; variants: string; approved: string; rule: string; ruleNote: string; lead: string };
};

const shots: Record<Locale, Shots> = {
  en: {
    knowledge: {
      app: "Knowledge · question",
      status: "answered",
      question: "What is the return window for corporate customers?",
      answer: ["30 calendar days from delivery, under the current policy", "Framework contracts follow clause 7.2"],
      sources: ["Returns policy · v4", "Framework contract · clause 7.2"],
      permission: "Permissions checked",
      threshold: "Above the confidence threshold: no expert needed",
    },
    documents: {
      app: "Documents · invoice",
      status: "1 exception",
      doc: "Invoice",
      fields: [
        { name: "Supplier", value: "Supplier A", ok: true },
        { name: "Date", value: "03 / 14", ok: true },
        { name: "Total", value: "matches PO", ok: true },
        { name: "Purchase order", value: "not found in ERP", ok: false },
      ],
      validated: "Validated against ERP rules",
      exception: "Exception → human review",
    },
    customer: {
      app: "Service · conversation",
      channel: "WhatsApp",
      message: "My order hasn’t arrived and I need to change the delivery address.",
      intents: ["Order status", "Address change"],
      context: "Order · in transit",
      resolved: "Status sent to the customer",
      escalated: "Address change → agent, with context",
      quality: "Reply quality scored",
    },
    revenue: {
      app: "Sales · inbound lead",
      status: "qualified",
      company: "Logistics company",
      size: "250–1,000 people",
      fit: [
        { name: "Size", state: "fits", ok: true },
        { name: "Industry", state: "fits", ok: true },
        { name: "Need", state: "fits", ok: true },
        { name: "Budget", state: "to confirm", ok: false },
      ],
      brief: "Account brief ready",
      proposal: "Draft proposal → rep approval",
      crm: "CRM updated",
    },
    operations: {
      app: "Operations · purchase request",
      id: "PR-318",
      steps: [
        { name: "Received", state: "done" },
        { name: "Checked against budget", state: "done" },
        { name: "Classified", state: "done" },
        { name: "Area manager approval", state: "pending" },
        { name: "Order issued", state: "next" },
      ],
      pending: "waiting",
      log: "Every decision is logged",
    },
    marketing: {
      app: "Marketing · campaign",
      chain: ["Brand", "Content", "Campaigns", "Leads"],
      variants: "Creative variants",
      approved: "approved by brand",
      rule: "Budget rule",
      ruleNote: "Shifts above the set limit need a person’s approval",
      lead: "Qualified lead → CRM",
    },
  },
  es: {
    knowledge: {
      app: "Conocimiento · consulta",
      status: "respondida",
      question: "¿Cuál es el plazo de devolución para clientes corporativos?",
      answer: ["30 días calendario desde la entrega, según la política vigente", "Los contratos marco siguen la cláusula 7.2"],
      sources: ["Política de devoluciones · v4", "Contrato marco · cláusula 7.2"],
      permission: "Permisos verificados",
      threshold: "Confianza sobre el umbral: no requiere experto",
    },
    documents: {
      app: "Documentos · factura",
      status: "1 excepción",
      doc: "Factura",
      fields: [
        { name: "Proveedor", value: "Proveedor A", ok: true },
        { name: "Fecha", value: "14 / 03", ok: true },
        { name: "Total", value: "coincide con la OC", ok: true },
        { name: "Orden de compra", value: "no existe en el ERP", ok: false },
      ],
      validated: "Validado contra reglas del ERP",
      exception: "Excepción → revisión humana",
    },
    customer: {
      app: "Atención · conversación",
      channel: "WhatsApp",
      message: "Mi pedido no ha llegado y necesito cambiar la dirección de entrega.",
      intents: ["Estado del pedido", "Cambio de dirección"],
      context: "Pedido · en tránsito",
      resolved: "Estado enviado al cliente",
      escalated: "Cambio de dirección → agente, con contexto",
      quality: "Calidad de la respuesta evaluada",
    },
    revenue: {
      app: "Ventas · lead entrante",
      status: "calificado",
      company: "Empresa de logística",
      size: "250–1.000 personas",
      fit: [
        { name: "Tamaño", state: "encaja", ok: true },
        { name: "Sector", state: "encaja", ok: true },
        { name: "Necesidad", state: "encaja", ok: true },
        { name: "Presupuesto", state: "por confirmar", ok: false },
      ],
      brief: "Resumen de la cuenta listo",
      proposal: "Borrador de propuesta → aprobación del ejecutivo",
      crm: "CRM actualizado",
    },
    operations: {
      app: "Operaciones · solicitud de compra",
      id: "SC-318",
      steps: [
        { name: "Recibida", state: "done" },
        { name: "Validada contra presupuesto", state: "done" },
        { name: "Clasificada", state: "done" },
        { name: "Aprobación del gerente de área", state: "pending" },
        { name: "Orden emitida", state: "next" },
      ],
      pending: "en espera",
      log: "Cada decisión queda registrada",
    },
    marketing: {
      app: "Marketing · campaña",
      chain: ["Marca", "Contenido", "Campañas", "Leads"],
      variants: "Variantes creativas",
      approved: "aprobadas por marca",
      rule: "Regla de presupuesto",
      ruleNote: "Los cambios por encima del límite fijado requieren aprobación humana",
      lead: "Lead calificado → CRM",
    },
  },
  fr: {
    knowledge: {
      app: "Connaissance · question",
      status: "répondue",
      question: "Quel est le délai de retour pour les clients entreprises ?",
      answer: ["30 jours calendaires après la livraison, selon la politique en vigueur", "Les contrats-cadres suivent la clause 7.2"],
      sources: ["Politique de retours · v4", "Contrat-cadre · clause 7.2"],
      permission: "Droits vérifiés",
      threshold: "Au-dessus du seuil de confiance : sans expert",
    },
    documents: {
      app: "Documents · facture",
      status: "1 exception",
      doc: "Facture",
      fields: [
        { name: "Fournisseur", value: "Fournisseur A", ok: true },
        { name: "Date", value: "14 / 03", ok: true },
        { name: "Total", value: "conforme au bon", ok: true },
        { name: "Bon de commande", value: "absent de l’ERP", ok: false },
      ],
      validated: "Validé selon les règles de l’ERP",
      exception: "Exception → revue humaine",
    },
    customer: {
      app: "Service · conversation",
      channel: "WhatsApp",
      message: "Ma commande n’est pas arrivée et je dois changer l’adresse de livraison.",
      intents: ["Suivi de commande", "Changement d’adresse"],
      context: "Commande · en transit",
      resolved: "Statut envoyé au client",
      escalated: "Changement d’adresse → conseiller, avec le contexte",
      quality: "Qualité de la réponse évaluée",
    },
    revenue: {
      app: "Ventes · lead entrant",
      status: "qualifié",
      company: "Entreprise de logistique",
      size: "250 à 1 000 personnes",
      fit: [
        { name: "Taille", state: "conforme", ok: true },
        { name: "Secteur", state: "conforme", ok: true },
        { name: "Besoin", state: "conforme", ok: true },
        { name: "Budget", state: "à confirmer", ok: false },
      ],
      brief: "Synthèse du compte prête",
      proposal: "Projet de proposition → validation du commercial",
      crm: "CRM mis à jour",
    },
    operations: {
      app: "Opérations · demande d’achat",
      id: "DA-318",
      steps: [
        { name: "Reçue", state: "done" },
        { name: "Contrôlée selon le budget", state: "done" },
        { name: "Classée", state: "done" },
        { name: "Approbation du responsable", state: "pending" },
        { name: "Commande émise", state: "next" },
      ],
      pending: "en attente",
      log: "Chaque décision est journalisée",
    },
    marketing: {
      app: "Marketing · campagne",
      chain: ["Marque", "Contenu", "Campagnes", "Leads"],
      variants: "Variantes créatives",
      approved: "validées par la marque",
      rule: "Règle de budget",
      ruleNote: "Au-delà du seuil fixé, une personne doit approuver",
      lead: "Lead qualifié → CRM",
    },
  },
};

export const getShots = (locale: Locale) => shots[locale];
