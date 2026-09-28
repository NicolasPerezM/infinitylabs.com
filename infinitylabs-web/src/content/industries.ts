import type { Locale } from "@/i18n/config";

/**
 * Industry strategy (BUSINESS_STRATEGY §13). Only "typical environment" language is used
 * until delivery experience per sector is confirmed (GAP-013).
 */
export type Industry = { name: string; where: string };

const text: Record<Locale, { intro: string; items: Industry[] }> = {
  en: {
    intro: "These systems tend to pay off wherever a process is repetitive, document-heavy, spread across several tools and measured in cost or cycle time. The environments below are where we most often find that combination.",
    items: [
      { name: "Retail and e-commerce", where: "customer operations, order and returns workflows, catalog and content operations" },
      { name: "Insurance", where: "claims intake and document processing, policy servicing, underwriting support" },
      { name: "Professional services", where: "knowledge systems, proposal and engagement workflows, delivery operations" },
      { name: "Legal", where: "contract review support, document intelligence, matter intake" },
      { name: "Fintech and financial services", where: "onboarding and KYC documents, customer operations, back-office controls" },
      { name: "Logistics", where: "shipment documents, exception handling, customer communication" },
      { name: "Healthcare", where: "administrative document flows, scheduling and patient communication operations" },
      { name: "Real estate", where: "lead qualification, listing operations, document-heavy transactions" },
      { name: "Manufacturing", where: "procurement and supplier documents, quality and compliance records, internal operations" },
    ],
  },
  es: {
    intro: "Estos sistemas suelen rendir donde un proceso es repetitivo, intensivo en documentos, repartido entre varias herramientas y medido en costo o tiempo de ciclo. Los entornos de abajo son donde más encontramos esa combinación.",
    items: [
      { name: "Retail y comercio electrónico", where: "operaciones de clientes, flujos de pedidos y devoluciones, operaciones de catálogo y contenido" },
      { name: "Seguros", where: "ingreso y procesamiento de documentos de siniestros, servicio de pólizas, apoyo a suscripción" },
      { name: "Servicios profesionales", where: "sistemas de conocimiento, flujos de propuestas y proyectos, operaciones de entrega" },
      { name: "Legal", where: "apoyo a revisión de contratos, inteligencia documental, ingreso de asuntos" },
      { name: "Fintech y servicios financieros", where: "documentos de vinculación y KYC, operaciones de clientes, controles de back-office" },
      { name: "Logística", where: "documentos de envío, gestión de excepciones, comunicación con clientes" },
      { name: "Salud", where: "flujos documentales administrativos, agendamiento y comunicación con pacientes" },
      { name: "Sector inmobiliario", where: "calificación de leads, operaciones de listados, transacciones intensivas en documentos" },
      { name: "Manufactura", where: "documentos de compras y proveedores, registros de calidad y cumplimiento, operaciones internas" },
    ],
  },
  fr: {
    intro: "Ces systèmes sont généralement rentables là où un processus est répétitif, riche en documents, réparti entre plusieurs outils et mesuré en coût ou en temps de cycle. Les environnements ci-dessous sont ceux où nous rencontrons le plus souvent cette combinaison.",
    items: [
      { name: "Retail et e-commerce", where: "opérations client, flux de commandes et de retours, opérations de catalogue et de contenu" },
      { name: "Assurance", where: "réception et traitement des documents de sinistres, gestion des contrats, appui à la souscription" },
      { name: "Services professionnels", where: "systèmes de connaissance, flux de propositions et de missions, opérations de delivery" },
      { name: "Juridique", where: "appui à la revue de contrats, intelligence documentaire, prise en charge des dossiers" },
      { name: "Fintech et services financiers", where: "documents d’onboarding et KYC, opérations client, contrôles back-office" },
      { name: "Logistique", where: "documents d’expédition, gestion des exceptions, communication client" },
      { name: "Santé", where: "flux documentaires administratifs, planification et communication avec les patients" },
      { name: "Immobilier", where: "qualification des leads, opérations d’annonces, transactions riches en documents" },
      { name: "Industrie", where: "documents d’achats et fournisseurs, registres qualité et conformité, opérations internes" },
    ],
  },
};

export const getIndustries = (locale: Locale) => text[locale];
